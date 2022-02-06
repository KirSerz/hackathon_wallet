<template>
        <!-- App Header -->
    <div class="appHeader bg-primary text-light">
        <div class="left">
            <a href="/" class="headerButton goBack">
                <i name="chevron-back-outline" role="img" class="md hydrated" aria-label="chevron back outline"></i>
            </a>
        </div>
        <div class="pageTitle">
            {{title}}
        </div>
    </div>
</template>

<script>export default {
  name: 'appHeader',
  components: {
  },
  props: {
    title: {
      type: String,
      default: null
    },
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
