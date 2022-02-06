// import ApiService from '@/services/ApiService';

export default {


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
    
  async getAddressTransactions({state, dispatch, commit }) {
    try {
        state.address

        // TODO CODE

        txid_list = ['21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', ]
        commit('setTxidList', txid_list)
        commit('setTransactionCount', txid_list.lenght())
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

  // USSLESS
  async getTransactionsInfo({state, dispatch, commit }) {
    try {
        state.txid_list
        state.txid
        state.address
        // TODO CODE

        let transactions =[
            {
                'amount':50,
                'from':'jnn12ugsb123x12131',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'jnn12ugsb123x12131',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'jnn12ugsb123x12131',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'0x0fqe',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'0x0fqe',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
            {
                'amount':50,
                'from':'0x0fqe',
                'to':'jnn12ugsb123x12131',
                'sign':'jnn12ugsb123x12131',
                'txid':'jnn12ugsb123x12131',
                'prev_txid':'jnn12ugsb123x12131',
            },
        ]
        
        let income = 0;
        let expenses =0;

        for (let transaction of transactions){
            console.log(transaction)
            console.log(state.address)
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
