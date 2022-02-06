import crypto from 'crypto-js';
import {ethers} from 'ethers';

const ALL_BALANCES = 10000;
const NODE_MIN_BALANCE_TO_BE_VALIDATOR = 10;

export function hash256(str:string) {
  const hash = crypto.SHA256(str);
  return hash.toString();
};

export function createNodePk() {
    const randomStr = String(Math.random()) + String(Math.random());
    const privateKey = (crypto.SHA256(randomStr)).toString(crypto.enc.Hex);
    return privateKey;
}

export async function createTx(from:string, to:string, amount:number, prev_tx:string, private_key: string ) {
    let tx = {
        from: from,
        to: to,
        amount: amount,
        prev_tx: prev_tx
    };
    const txid = '0x' + hash256(JSON.stringify(tx));
    const wallet = new ethers.Wallet(private_key);
    const sign = await wallet.signMessage(txid);
    return {...tx, txid, sign};
}

export function verifyState(state:any) {
    let lookup_tx = '0x0';
    let previous_tx = '';
    while (lookup_tx !== '-') {
        if (lookup_tx in state['txs']) {
            let tx = state['txs'][lookup_tx];
            console.log(tx);
            if (lookup_tx == '0x0') {
                // we don't need to validate too much genesis tx
                if (tx['to'] in state['balances']) {
                    state['balances'][tx['to']] += tx['amount'];
                } else {
                    state['balances'][tx['to']] = tx['amount'];
                }
            } else {
                // here is user's tx, let's validate
                // check that they are chained
                if (tx['prev_tx'] !== previous_tx) {
                    throw 'bad prev_tx ' + tx['prev_tx'] + ' ' + previous_tx;
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

                if (tx['from'] in state['address_latest_txids_and_locks']) {
                    state['address_latest_txids_and_locks'][tx['from']]['latest_txid'] = tx['txid'];
                    state['address_latest_txids_and_locks'][tx['from']]['locked_by'] = 0;
                } else {
                    state['address_latest_txids_and_locks'][tx['from']] = {
                        'latest_txid': tx['txid'],
                        'locked_by': 0
                    };
                }
            }
            previous_tx = lookup_tx;
            if (lookup_tx in state['tx_linking']) {
                lookup_tx = state['tx_linking'][lookup_tx];
            } else {
                lookup_tx = '-';
            }
        } else {
            lookup_tx = '-';
        }
    }
}

export async function validateNewTx(str:string, pk:string, state: any) {
    let tx = JSON.parse(str);
    if (state['address_latest_txids_and_locks'][tx['from']]['locked_by'] != 0) {
        throw 'address already locked by txid ' + state['address_latest_txids_and_locks'][tx['from']]['locked_by'];
    }
    // checks
    if (tx['prev_tx'] !== state['address_latest_txids_and_locks'][tx['from']]['latest_txid']) {
        throw 'bad prev_tx ' + tx['prev_tx'] + ' ' + state['address_latest_txids_and_locks'][tx['from']]['latest_txid'];
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
    // check balance
    if (tx['from'] in state['balances'] && state['balances'][tx['from']] < tx['amount']) {
        throw 'not enough balance';
    }
    // everything looks ok
    state['address_latest_txids_and_locks'][tx['from']]['locked_by'] = tx['txid'];
    state['tx_pending'][tx['txid']] = tx;
    const wallet = new ethers.Wallet(pk);
    return await wallet.signMessage(tx['txid']);
}

export function validatePending(str: string, state: any) {
    let data = JSON.parse(str);
    if (data['txid'] in state['tx_pending']) {
        // if tx in pending it means that we've already confirmed it and waiting for unlock sender(from)
        let tx = state['tx_pending'][data['txid']];
        if (state['address_latest_txids_and_locks'][tx['from']]['locked_by'] !== data['txid'] ) {
            throw 'address not locked by ' + data['txid'];
        }
        // check signs of nodes
        state['tx_validate_signs'][data['txid']] = [];
        let consensus_sum = 0
        data['signs'].forEach((element:string) => {
            let signer_address = ethers.utils.verifyMessage(data['txid'], ethers.utils.arrayify(element));
            if (signer_address in state['balances']) {
                if (state['balances'][signer_address] >= NODE_MIN_BALANCE_TO_BE_VALIDATOR) {
                    consensus_sum += state['balances'][signer_address];
                    state['tx_validate_signs'][data['txid']].append(element);
                }
            } else {
                console.log('wrong sign');
            }
        });
        if (consensus_sum <= (ALL_BALANCES / 2)) {
            throw 'not enough for consensus';
        }
        state['txs'][data['txid']] = tx;
        state['address_latest_txids_and_locks'][tx['from']]['locked_by'] = 0;
        state['address_latest_txids_and_locks'][tx['from']]['latest_txid'] = data['txid'];
        delete state['tx_pending'][data['txid']];
        return '1';
    } else {
        return '0';
    }
}