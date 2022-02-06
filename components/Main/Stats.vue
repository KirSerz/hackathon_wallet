<template>
    <div class="Stats section">
        <div class="row mt-2">
            <div class="col-6">
                <div class="stat-box">
                    <div class="title">Income</div>
                    <div class="value text-success">{{income}}</div>
                </div>
            </div>
            <div class="col-6">
                <div class="stat-box">
                    <div class="title">Expenses</div>
                    <div class="value text-danger">{{expenses}}</div>
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
    ...mapState('page', ['income', 'expenses']),
 },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>