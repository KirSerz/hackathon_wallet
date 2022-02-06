<template>
  <div>
    <div id="loader" style="display: none;">
        <img src="~/assets/img/loading-icon.png" alt="icon" class="loading-icon">
    </div>
    <appHeader    
        title='Transactions'
      />
    <!-- <Transactions/> -->
    <TransactionModal/>
    <Transactions
      :is_all='true'
    />
  </div>
</template>

<script>

import appHeader from '~/components/Settings/appHeader'
import Transactions from '~/components/Main/Transactions'
import TransactionModal from '~/components/Modals/TransactionModal'
// import '~/assets/css/splide.min.css'
import '~/assets/css/style.css'
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'IndexPage',
  components: {
    appHeader,
    Transactions,
    TransactionModal,
  },
  computed: {
    ...mapState('page', [
      'address',])
  },
  watch: {
    address(){
      this.getAddressTransactions()
    }
  },
  mounted() {
    this.getAddressTransactions()
  },
  methods: {
    ...mapActions('page', ['getAddressTransactions']),
  }
}
</script>
