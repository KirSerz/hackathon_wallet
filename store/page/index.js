import mutations from './mutations';
import actions from './actions';

const store = {
  // namespaced: true, //мб раскоментить
  state() {
    return {
        txid_list: ['21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', ],
        account: 'account 1',
        txid: '0x123v23f123412412vdwe2323w',
        address: null,
        balance: 0,
        transaction_count: 0,
        private_key: 0,

        popup: null,
        symbol: 'AQUAS',
        nodes: [
            '0x123v23f123412412vdwe2323w', 
            '0x123v23f123412412vdwe2323w', 
            '0x123v23f123412412vdwe2323w', 
        ],

        transactions:[],
        income: 0,
        expenses: 0,
        transaction: {
            'amount':0,
            'from':'',
            'to':'',
            'sign':'',
            'txid':'',
            'prev_txid':'',
        },
    };
  },
  mutations,
  actions
};

export default store;
