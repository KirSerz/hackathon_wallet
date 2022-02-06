<template>
    <div class="section mt-4">
        <div class="section-heading">
            <h2 class="title">Last Transactions</h2>
            <a href="/transactions" class="link">All</a>
        </div>
        <div class="transactions" >
            
            <Transaction
                v-for="(item, index) in ten_transactions"
                :key="index"
                :to="item.to"
                :amount="item.amount"
                :from="item.from"
                :sign="item.sign"
                :prev_txid="item.prev_txid"
            />
            <!-- * item -->
        </div>
    </div>
</template> 

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import Transaction from '~/components/Main/Transaction'

export default {
  name: 'Transactions',
  components: {
      Transaction,
  },
  props: {
    is_all: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('page', ['popup', 'transactions']),
    ten_transactions(){
        if (this.is_all)
            return this.transactions
        return this.transactions.slice(0, 10)
    }
 },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>