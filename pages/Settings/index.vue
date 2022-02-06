<template>
  <div>
    <div id="loader" style="display: none;">
        <img src="~/assets/img/loading-icon.png" alt="icon" class="loading-icon">
    </div>
    
    <appHeader
        title='Settings'
    />
    <Profile/>
  </div>
</template>

<script>
  import appHeader from '~/components/Settings/appHeader'
  import Profile from '~/components/Settings/Profile'
  import '~/assets/css/splide.min.css'
  import '~/assets/css/style.css'

  export default {
    name: 'Settings',
    components: {
      appHeader,
      Profile,
    },
  }
</script>
