<template>
  <div>
    <div id="loader" style="display: none;">
        <img src="assets/img/loading-icon.png" alt="icon" class="loading-icon">
    </div>
    <appHeader
        title='Settings'
    />
    <Capsule/>
  </div>
</template>

<script>
import appHeader from '~/components/Settings/appHeader'
import Capsule from '~/components/Settings/Capsule'
import '~/assets/css/splide.min.css'
import '~/assets/css/style.css'

export default {
    name: 'Settings',
    components: {
      appHeader,
      Capsule,
    },
  }
</script>
