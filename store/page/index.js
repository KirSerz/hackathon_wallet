import mutations from './mutations';
import actions from './actions';

const store = {
  // namespaced: true, //мб раскоментить
  state() {
    return {
        txid_list: ['21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', ],
        account: 'account 1',
        txid: '0x123v23f123412412vdwe2323w',
        address: '0x0fqe',
        balance: 0,
        transaction_count: 0,

        popup: null,
        symbol: 'AQUAS',
        nodes: [
            '0x123v23f123412412vdwe2323w', 
            '0x123v23f123412412vdwe2323w', 
            '0x123v23f123412412vdwe2323w', 
        ],

        transactions:[],
    //     transactions:[
    //       {
    //           'amount':50,
    //           'from':'jnn12ugsb123x12131',
    //           'to':'jnn12ugsb123x12131',
    //           'sign':'jnn12ugsb123x12131',
    //           'txid':'1234',
    //           'prev_txid':'jnn12ugsb123x12131',
    //       },
    //       {
    //           'amount':50,
    //           'from':'jnn12ugsb123x12131',
    //           'to':'jnn12ugsb123x12131',
    //           'sign':'jnn12ugsb123x12131',
    //           'txid':'123',
    //           'prev_txid':'jnn12ugsb123x12131',
    //       },
    //       {
    //           'amount':50,
    //           'from':'jnn12ugsb123x12131',
    //           'to':'jnn12ugsb123x12131',
    //           'sign':'jnn12ugsb123x12131',
    //           'txid':'124s',
    //           'prev_txid':'jnn12ugsb123x12131',
    //       },
    //       {
    //           'amount':50,
    //           'from':'jnn12ugsb123x12131',
    //           'to':'jnn12ugsb123x12131',
    //           'sign':'jnn12ugsb123x12131',
    //           'txid':'214d12',
    //           'prev_txid':'jnn12ugsb123x12131',
    //       },
    //       {
    //           'amount':50,
    //           'from':'jnn12ugsb123x12131',
    //           'to':'jnn12ugsb123x12131',
    //           'sign':'jnn12ugsb123x12131',
    //           'txid':'124231',
    //           'prev_txid':'jnn12ugsb123x12131',
    //       },
    //       {
    //           'amount':50,
    //           'from':'jnn12ugsb123x12131',
    //           'to':'jnn12ugsb123x12131',
    //           'sign':'jnn12ugsb123x12131',
    //           'txid':'1r12d312',
    //           'prev_txid':'jnn12ugsb123x12131',
    //       },
    //   ],
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
