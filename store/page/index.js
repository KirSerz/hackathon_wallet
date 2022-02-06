import mutations from './mutations';
import actions from './actions';

const store = {
  // namespaced: true, //мб раскоментить
  state() {
    return {
        txid_list: ['21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', '21ds12312sd12312ws12', ],
        account: 'account 1',
        txid: '0x0fqe',
        address: '0x0fqe',
        balance: 0,

        popup: null,
        symbol: 'AQUAS',
        nodes: ['0x123v23f123412412vdwe2323w', '0x123v23f123412412vdwe2323w', '0x123v23f123412412vdwe2323w', ],
        transactions:[
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
      ],
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
