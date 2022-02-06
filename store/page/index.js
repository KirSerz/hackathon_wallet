import mutations from './mutations';
import actions from './actions';

const store = {
  // namespaced: true, //мб раскоментить
  state() {
    return {
        txid_list: ['0xb20ef37e74f703af67bcb7369078e309de46b8bcd71ce9aeb54458828487928b', '0x4163effA99D027BEe32539D1783932F4D20469de',  ],
        account: 'Account 1',
        txid: '0xb20ef37e74f703af67bcb7369078e309de46b8bcd71ce9aeb54458828487928b',
        address: null,
        balance: 1000,
        transaction_count: 3,
        private_key: null,

        popup: null,
        symbol: 'AQUAS',
        nodes: [
            '12D3KooWBecVqhrKqVkJ1ALtVTYRi5vmbqKxQiT2EfnNgNdBWzqS'
        ],

        transactions:[],
        income: 2,
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
