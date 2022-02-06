import { Fluence, KeyPair } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { registerNodeValidatorService, sendTx } from './_aqua/export';
import crypto from 'crypto-js';
import {ethers} from 'ethers';

const ALL_BALANCES = 10000;
const NODE_MIN_BALANCE_TO_BE_VALIDATOR = 10;
// === INITIAL STATE ===

var state: {[type:string]: {[txid:string]:any}} = {
    'txs': {
        '0x0': {
            to: '0x184f8d267CBD46F94fefE24597f21Aee53F829aa',
            amount: 10000,
        },
        '0x54a552c3de559764470bef82944347fc6e6c69270b149eefede4ac1b55ab3dd9': {
            from: '0x184f8d267CBD46F94fefE24597f21Aee53F829aa',
            to: '0x0000000000000000000000000000000000000000',
            amount: 100,
            prev_tx: '0x0', // genesis
            txid: '0x54a552c3de559764470bef82944347fc6e6c69270b149eefede4ac1b55ab3dd9',
            sign: '0xdc79bbb44de485ffbb27fa354770ca7716e99c79a3d5382a2de68946bdc2344249d70b5b6655ec5c3eb6aa17ad1996bd7f26ab250654b1677a9afe61db72d0bc1c'
        }
    }, 
    'tx_linking': {
        '0x0': '0x54a552c3de559764470bef82944347fc6e6c69270b149eefede4ac1b55ab3dd9'
    },
    'balances': {
        //'0x184f8d267CBD46F94fefE24597f21Aee53F829aa': 10000 // genesis
    }, 
    'tx_validate_signs': {
        '0x54a552c3de559764470bef82944347fc6e6c69270b149eefede4ac1b55ab3dd9': ['0xdc79bbb44de485ffbb27fa354770ca7716e99c79a3d5382a2de68946bdc2344249d70b5b6655ec5c3eb6aa17ad1996bd7f26ab250654b1677a9afe61db72d0bc1c']
    }
};

function hash256(str:string) {
  const hash = crypto.SHA256(str);
  return hash.toString();
};

function createNodePk() {
    const randomStr = String(Math.random()) + String(Math.random());
    const privateKey = (crypto.SHA256(randomStr)).toString(crypto.enc.Hex);
    return privateKey;
}

async function createTx(from:string, to:string, amount:number, prev_tx:string, private_key: string ) {
    let tx = {
        from: from,
        to: to,
        amount: amount,
        prev_tx: prev_tx
    };
    const txid = '0x' + hash256(JSON.stringify(tx));
    const wallet = new ethers.Wallet(private_key);
    const sign = await wallet.signMessage(txid);
    console.log({...tx, txid, sign});
    return {...tx, txid, sign};
}

function verifyState() {
    let lookup_tx = '0x0';
    let previous_tx = '';
    while (lookup_tx !== '-') {
        if (lookup_tx in state['txs']) {
            let tx = state['txs'][lookup_tx];
            if (lookup_tx == '0x0') {
                // we don't need to validate too much genesis tx
                previous_tx = lookup_tx;
                if (tx['to'] in state['balances']) {
                    state['balances'][tx['to']] += tx['amount'];
                } else {
                    state['balances'][tx['to']] = tx['amount'];
                }
                if (lookup_tx in state['tx_linking']) {
                    lookup_tx = state['tx_linking'][lookup_tx];
                } else {
                    lookup_tx = '-';
                }
            } else {
                // here is user's tx, let's validate
                // check that they are chained
                if (tx['prev_tx'] !== previous_tx) {
                    throw 'bad prev_tx';
                }
                // check from and to
                ethers.utils.getAddress(tx['from']);
                ethers.utils.getAddress(tx['to']);
                // check txid
                let temp_txid = '0x' + hash256(JSON.stringify({
                    from: tx['from'],
                    to: tx['to'],
                    amount: tx['amount'],
                    prev_tx: tx['prev_tx']
                    }));
                
                if (temp_txid !== tx['txid']) {
                    throw 'bad txid';
                }
                
                // check sign
                if (ethers.utils.verifyMessage(tx['txid'], ethers.utils.arrayify(tx['sign'])) !== tx['from']) {
                    throw 'bad sign';
                }
                // check node's signs and consensus
                let consensus_sum = 0
                state['tx_validate_signs'][tx['txid']].forEach((element:string) => {
                    let signer_address = ethers.utils.verifyMessage(tx['txid'], ethers.utils.arrayify(element));
                    if (signer_address in state['balances']) {
                        if (state['balances'][signer_address] >= NODE_MIN_BALANCE_TO_BE_VALIDATOR) {
                            consensus_sum += state['balances'][signer_address];
                        }
                    } else {
                        console.log('skip sign');
                        // throw 'bad signed';
                    }
                });
                if (consensus_sum <= (ALL_BALANCES / 2)) {
                    throw 'not enough for consensus';
                }
                // check balance
                if (tx['from'] in state['balances'] && state['balances'][tx['from']] >= tx['amount']) {
                    state['balances'][tx['from']] -= tx['amount'];
                    state['balances'][tx['to']] += tx['amount'];
                } else {
                    throw 'not enough balance';
                }
                
                // finally:
                previous_tx = lookup_tx;
            }
        } else {
            lookup_tx = '-';
        }
    }
}

// a node in Krasnodar network to connect to
const relay = krasnodar[4];

// private key for own peer
// NOTE: please, create a new one with `npx aqua create_keypair` command
// dummy one:
// {
//     "peerId": "12D3KooWBecVqhrKqVkJ1ALtVTYRi5vmbqKxQiT2EfnNgNdBWzqS",
//     "secretKey": "imz+c5kodZw8tCHEPfKzDwixBbQBTdiNC6nqUbbYAgg=",
//     "publicKey": "CAESIBs3xJRa6qbq8oHfmVpxb3zPq0R9uxA/0nCQgvQm2M9l"
// }
const sk = Buffer.from('imz+c5kodZw8tCHEPfKzDwixBbQBTdiNC6nqUbbYAgg=', 'base64');

async function main() {
    // Here is where we create our peer and connect to the network
    await Fluence.start({
        KeyPair: await KeyPair.fromEd25519SK(sk),
        connectTo: relay,
    });
    // use to generate pk: console.log('0x' + createNodePk());
    let node_pk =  '0xc44ff65a154ab349b717dc3836e973800afdf000254dc8e507f9bf5aceffb8fa'; // 0x184f8d267CBD46F94fefE24597f21Aee53F829aa
    let wallet = new ethers.Wallet(node_pk);
    console.log('Loaded node\'s addres: ' + wallet.address);
    
    // console.log(await createTx('0x184f8d267CBD46F94fefE24597f21Aee53F829aa', '0x0000000000000000000000000000000000000000', 100, '0x0', node_pk));

    // first we need to check all state
    verifyState();
    // and syncronize with other nodes

    // Fluence.getStatus() returns useful information about peer and it's connection
    console.log('own peer id: ', Fluence.getStatus().peerId);
    console.log('connected to relay: ', Fluence.getStatus().relayPeerId);
    console.log('---\n');

    registerNodeValidatorService({
        receive_tx: (str) => {
            // somebody sent us tx
            
            console.log(str);
        },
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async () => {
        // Stopping the peer before exiting application \ unit test \ etc is a good practice
        await Fluence.stop();
        process.exit(0);
    });
}

main().catch((err) => console.error(err));
