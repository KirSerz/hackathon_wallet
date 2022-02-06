<template>
    <div type ="button" class="item" @click="pageGetTransaction()">
        <div class="detail">
            <div>
                <strong>{{from}}</strong>
            </div>
        </div>
        <div class="right">
            <div  v-if="type === 1" class="price text-danger">
                - {{amount}}
            </div>
            <div v-else class="price text-success">
                {{amount}}
            </div>
        </div>
    </div>
</template> 


<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'ItemTransaction',
  components: {
  },
  props: {
    txid: {
      type: String,
      default: null
    },
    type: {
      type: Number,
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
    ...mapState('page', ['popup']),
  },
  methods: {
    ...mapActions('page', ['setStoreTransaction']),
    ...mapMutations('page', ['setPopup', 'setTransaction', 'getTransaction']),

    pageGetTransaction(){
      this.setStoreTransaction(this.txid)
      this.setPopup('popup-transaction' + this.txid)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>