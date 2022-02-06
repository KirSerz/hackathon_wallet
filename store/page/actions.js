// import ApiService from '@/services/ApiService';

export default {

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
    } catch (error) {
        console.log(error)
    }
  },
  
  async getTransaction({state, dispatch, commit }, txid) {
    try {

        // TODO CODE
        let transaction = {
            'amount':0,
            'from':'',
            'to':'',
            'sign':'',
            'txid':'',
            'prev_txid':'',
        }
        commit('setTxid', txid)
        commit('setTransaction', transaction)

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

        // TODO CODE


        let transactions =[]
        for (let txid of txid_list)
            transactions.append(getTransaction())

        transactions =[
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
        ]
        let income =0;
        let expenses =0;

        for (let transaction in transactions){
            if (transaction.from == state.txid){
                expenses += transaction.amount
            }else
            income += transaction.amount
        }
        commit('transactions', transactions)

    } catch (error) {
        console.log(error)
    }
  },
};
