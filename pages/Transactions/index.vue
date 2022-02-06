<template>
  <div>
    <appHeader/>
    <Transactions
    :is_all='true'
    />
  </div>
</template>

<script>

import appHeader from '~/components/Settings/appHeader'

import Transactions from '~/components/Main/Transactions'
// import '~/assets/css/splide.min.css'
import '~/assets/css/style.css'

export default {
  name: 'IndexPage',
  components: {
    appHeader,
    Transactions,
  },
}
</script>
