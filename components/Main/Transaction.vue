<template>
    <a href="/" class="item">
        <div class="detail">
            <div>
                <strong>{{from}}</strong>
            </div>
        </div>
        <div class="right">
            <div v-if="type == 'sell'">
                <div class="price text-danger">
                    - {{amount}}
                </div>
            </div>
            <div v-else>
                <div class="price text-success">
                    {{amount}}
                </div>
            </div>
        </div>
    </a>
</template> 


<script>export default {
  name: 'Transaction',
  components: {
  },
  props: {
    type: {
      type: String,
      default: null
    },

    to: {
      type: String,
      default: null
    },

    amount: {
      type: String,
      default: null
    },

    from: {
      type: String,
      default: null
    },
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>