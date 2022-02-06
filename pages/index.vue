<template>
  <div>
    <div id="loader" style="display: none;">
        <img src="assets/img/loading-icon.png" alt="icon" class="loading-icon">
    </div>
    <appHeader/>
    <Capsule/>
    <Stats/>
    <TransactionModal/>
    <Transactions/>
  </div>
</template>

<script>

import Capsule from '~/components/Main/Capsule'
import appHeader from '~/components/Main/appHeader'
import Stats from '~/components/Main/Stats'
import Transactions from '~/components/Main/Transactions'
import TransactionModal from '~/components/Modals/TransactionModal'
// import '~/assets/css/splide.min.css'
import '~/assets/css/style.css'

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'IndexPage',
  components: {
    Capsule,
    appHeader,
    Stats,
    Transactions,
    TransactionModal,
  },
  computed: {
    ...mapState('page', [
      'address',])
  },
  watch: {
    address(){
      this.getTransactionsInfo()
    }
  },
  mounted() {
    this.getTransactionsInfo()
  },
  methods: {
    ...mapActions('page', ['getTransactionsInfo']),
  }
}
</script>

<style scoped>
</style>