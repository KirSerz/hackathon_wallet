<template>
    <div class="Stats section">
        <div class="row mt-2">
            <div class="col-6">
                <div class="stat-box">
                    <div class="title">Income</div>
                    <div class="value text-success">{{income}} {{symbol}}</div>
                </div>
            </div>
            <div class="col-6">
                <div class="stat-box">
                    <div class="title">Expenses</div>
                    <div class="value text-danger">{{expenses}} {{symbol}}</div>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-6">
                <div class="stat-box">
                    <div class="title">Transaction count</div>
                    <div class="value text">{{transaction_count}}</div>
                </div>
            </div>
            <div class="col-6">
                <div class="stat-box">
                    <div class="title">?</div>
                    <div class="value text">{{expenses}}</div>
                </div>
            </div>
        </div>
    </div>
</template> 


<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: 'Stats',
  components: {
  },
  props: {
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('page', ['income', 'expenses', 'transaction_count', 'symbol']),
 },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
