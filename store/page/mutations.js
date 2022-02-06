export default {
    setPopup(state, value){
        state.popup = value
    },
    setTxidList(state, value){
        state.popup = value
    },
    setTxid(state, value){
        state.popup = value
    },
    setAddress(state, value){
        state.address = value
    },
    setIncome(state, value){
        state.income = value
    },
    setBalance(state, value){
        state.balance = value
    },
    setExpenses(state, value){
        state.expenses = value
    },
    setNodes(state, value){
        state.nodes = value
    },
    setAccount(state, value){
        state.account = value
    },
    setTransactions(state, value){
        state.transactions = value
    },
    setTransaction(state, value){
        state.transaction = value
    },
    setTransactionCount(state, value){
        state.transaction_count = value
    },
    setPrivateKey(state, value){
        state.private_key = value
    },
    pushTransaction(state, value){
        let buff = state.transactions;
        buff.push(value);
        state.transactions = buff;
    },
};
  