// import ApiService from '@/services/ApiService';
import {ethers} from 'ethers';
import crypto from 'crypto-js';

export default {
    importAddress({state, dispatch, commit }, privateKey){
        const wallet = new ethers.Wallet(privateKey);
        return wallet.address
    },
      
    saveAddress({state, dispatch, commit }, newAddress, password){
        const address = JSON.parse(localStorage.getItem('address'))
        const addressEncrypt = crypto.AES.encrypt(JSON.stringify(newAddress), password)
        commit('setAddress', JSON.stringify([...address, addressEncrypt]))
    },
      
    generateAddress({state, dispatch, commit }, key) {
        const randomStr = String(Math.random()) + String(Math.random());
        let privateKey;
        if (key)
            privateKey = key
        else
            privateKey= (crypto.SHA256(randomStr)).toString(crypto.enc.Hex);
        
        console.log(privateKey)
        const newAddress = dispatch('importAddress', privateKey)
        const address = state.address
        
        if (address) {
            const newId = JSON.parse(address).at(-1).id + 1;
            const newAddressForSave = {
                id: newId, 
                name: 'Address ' + newId, 
                address: newAddress, 
                privateKey
            };
            saveAddress(newAddressForSave, password)
        }
    },

   ReloadBalance({state, dispatch, commit }, params) {
    console.log('ReloadBalance');
  },

  SendAmount({state, dispatch, commit }, params) {
    console.log('SendAmount');

    console.log(params['ammount'])
    console.log(params['address'])
  },


  Withdrawl({state, dispatch, commit }, params) {
    console.log(params['amount'])
    console.log(params['address'])
  },

  async getAddressInfo({state, dispatch, commit }) {
    try {
        state.address

        // TODO CODE

        txid = '21ds12312sd12312ws12'
        balance = 0
        commit('setTxid', txid)
        commit('setBalance', balance)
    } catch (error) {
        console.log(error)
    }
  },
    
  async getTransaction({state, dispatch, commit }, txid) {
    try {
        // TODO
        // получить транзакцию из сети(txid)

        let new_transaction = {
            'amount':0,
            'from':'new',
            'to':'new',
            'sign':'new',
            'txid':'new',
            'prev_txid':'new',
        }
        console.log(state.transactions)
        let is_has = true
        for (let transaction of state.transactions){
            if (transaction.txid == new_transaction.txid){
                is_has = false
                break
            }
        }
        if (is_has) {
            commit('pushTransaction', new_transaction)
        }

    } catch (error) {
        console.log(error)
    }
  },

  setStoreTransaction({state, dispatch, commit }, txid) {
    try {
        let is_flag = true
        for (let transaction of state.transactions){
            if (transaction.txid == txid){
                commit('setTransaction', transaction)
                is_flag = false
                break
            }
        }

        if (is_flag){
            dispatch('getTransaction', txid)
        }

    } catch (error) {
        console.log(error)
    }
  },

  async getSignsOfTransactions({state, dispatch, commit }) {
    try {
        txid = state.txid

        // TODO CODE

    } catch (error) {
      console.log(error)
    }
  },

  async getAddressTransactions({state, dispatch, commit }) {
    try {
        state.txid
        state.address
        // TODO CODE

        let transactions = [
            {
                'amount':50,
                'from':'jnn12ugsb123x12131',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb1323x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'jnn12ugsb123x12131',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb1123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'jnn12ugsb123x12131',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn112ugsb123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'0x0fqe',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb123x121231',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'0x0fqe',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn112ugsb123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'0x0fqe',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb123x1s2131',
                'prev_txid':'jnn12ugsb123x12131',
            },
        ]
        
        let income = 0;
        let expenses = 0;

        for (let transaction of transactions){
            console.log(transaction)
            if (transaction.from == state.address){
                expenses += transaction.amount
                transaction.type = 0
            }else{
                income += transaction.amount
                transaction.type = 1
            }

        }
        commit('setIncome', income)
        commit('setExpenses', expenses)
        commit('setTransactions', transactions)
        commit('setTransactionCount', transactions.length)

    } catch (error) {
        console.log(error)
    }
  },
};
