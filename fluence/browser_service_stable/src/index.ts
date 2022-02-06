import { Fluence, KeyPair } from '@fluencelabs/fluence';
import { krasnodar } from '@fluencelabs/fluence-network-environment';
import { registerNodeValidatorService, sendTx } from './_aqua/export';
import {ethers} from 'ethers';
import {verifyState, createNodePk, createTx, validateNewTx, validatePending} from './logic';


// === INITIAL STATE ===

var state: {[type:string]: {[txid:string]:any}} = {
    'txs': {
        '0x0': { // genesis
            to: '0x184f8d267CBD46F94fefE24597f21Aee53F829aa',
            amount: 10000,
        },
        '0xb20ef37e74f703af67bcb7369078e309de46b8bcd71ce9aeb54458828487928b': { // test
            from: '0x184f8d267CBD46F94fefE24597f21Aee53F829aa',
            to: '0x4163effA99D027BEe32539D1783932F4D20469de',
            amount: 100,
            prev_tx: '0x0', 
            txid: '0xb20ef37e74f703af67bcb7369078e309de46b8bcd71ce9aeb54458828487928b',
            sign: '0x7f62ffbb30bbff51b6bf6c10b1549fc7df2e09cc4c6431bf9dd8c6f4cdbeb5c85cfc15eb34fa9630961f299a4061f27d4e27be2801ae95175bb3ce5f87df100f1b'
        }
    }, 
    'tx_linking': {
        '0x0': '0xb20ef37e74f703af67bcb7369078e309de46b8bcd71ce9aeb54458828487928b'
    },
    'tx_pending': {
    },
    'balances': {
        //'0x184f8d267CBD46F94fefE24597f21Aee53F829aa': 10000 // genesis
    }, 
    'address_latest_txids_and_locks': {
        //'0x184f8d267CBD46F94fefE24597f21Aee53F829aa': {'latest_txid': '', 'locked_by': ''}
    },
    'tx_validate_signs': { // signes of validators
        '0xb20ef37e74f703af67bcb7369078e309de46b8bcd71ce9aeb54458828487928b': ['0x7f62ffbb30bbff51b6bf6c10b1549fc7df2e09cc4c6431bf9dd8c6f4cdbeb5c85cfc15eb34fa9630961f299a4061f27d4e27be2801ae95175bb3ce5f87df100f1b']
    }
};


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
    
    
    // Fluence.getStatus() returns useful information about peer and it's connection
    console.log('own peer id: ', Fluence.getStatus().peerId);
    console.log('connected to relay: ', Fluence.getStatus().relayPeerId);
    console.log('---\n');


    // =====
    // first we need to check all state
    verifyState(state);
    // console.log(state);
    // and syncronize with other nodes
    // TODO: here
    // =====
    registerNodeValidatorService({
        async receive_tx(str) {
            // somebody sent us tx
            let sign = await validateNewTx(str, node_pk, state);
            if (sign) {
                return sign; 
            } else {
                return '0';
            }
        },
        receive_signs(str) {
            // somebody sent us tx
            let sign = validatePending(str, state);
            if (sign) {
                return sign; 
            } else {
                return '0';
            }
        },
        get_latest_tx_for_address(address) {
            console.log(address);
            if (address in state['address_latest_txids_and_locks']) {
                console.log('respond = ' + state['address_latest_txids_and_locks'][address]['latest_txid']);
                return state['address_latest_txids_and_locks'][address]['latest_txid'];
            } else {
                console.log('respond = 0');
                return '0x0';
            }
        },
        get_address_info(address) {
            return 'wip'; //JSON.stringify(state['tx_validate_signs'][tx]);
        },
        get_transaction(tx) {
            return JSON.stringify(state['txs'][tx]);
        }, 
        get_signs_of_transaction(tx) {
            return JSON.stringify(state['tx_validate_signs'][tx]);
        }

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
