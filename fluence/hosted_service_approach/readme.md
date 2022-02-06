# IMPORTANT! We have no expirience with Rust, so we pivoted to browser-based service

# cryptocurrency on Fluence
We make cryptocurrency using only Fluence services. 

User can:
- generate eth-like private key -> address
- connect to any of nodes and get information about balance, last tx
- send amount from balance to another address 
Two steps for send:
1) client send signed tx to all nodes and receive sign as approval from each
2) client notifies all nodes that

## state tables
balances:
- address (str) -- eth-like address
- balance (int) 
- lock (str) -- txid of tx that locked

txs:
- txid (str)
- from (str)
- to (str)
- amount (int)
- prev_txid (str)
- sign (str)
- pending (bool)

signs:
- txid (str)
- sign (str)


## functions
- `sendTransaction`(from, to, amount, sign, txid, prev_txid) returns sign or false
```
we check:
- that there is no lock on address (sqlite query)
- that txid is correct (sha256 of object as a string)
- that `from` and `to` are valid ()
- that decrypted `sign`'s address and `from` are equal
- that prev_txid exists in sqlite and it's sender equal this sender
- that balance is enough
- returns sign of txid
- mark lock till some timestamp to prevent double spending
- save this txid as pending tx
```
- `confirmTransaction`(txid, signs[]) returns true/false
```
client sends list of signs from vary nodes, we need to check each sign(address of decrypted sign should have some balance(>10) at that moment of validation)
we sum balances of signers and get txid's info from pending txs.
we check that lock exists for such txid, process txid, delete lock, switch tx from pending to success 

```

scheduled function on each node - `syncing` function

informational functions:
- `getAddressInfo`(address) returns from sqlite - balance and last txid
- `getAddressTransactions`(address) returns from sqlite - list of txids
- `getTransaction`(txid) returns (from, to, amount, sign, txid, prev_txid)
- `getSignsOfTransaction`(txid) returns list of signs
