<template>
    <div id="Capsule">
        <div class="section wallet-card-section pt-1">
            <div class="wallet-card">
                <div class="balance">
                    <div class="left">
                        <span class="title">Total Balance</span>
                        <h1 class="total">{{ balance }} {{ symbol }}</h1>
                    </div>
                    <div class="right">
                        <div class="sc-1thzqxv-1 dIqKdC">
                            <div>
                                {{account}}
                            </div>
                            <div data-testid="home.account-info.address" class="sc-1thzqxv-3 bflBii">
                                {{address}}
                            <a href="https://dash.fluence.dev/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                                </svg>
                            </a>    
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input-wrapper">
                <b-form-group label-for="type">
                    <b-form-select
                        label="Тип блока"
                        v-model="node"
                        :options="nodes"
                        required
                        class="form-control custom-select"
                    >
                    </b-form-select>
                </b-form-group>
                </div>
                <div class="wallet-footer">
                    <div class="item">
                        <div type="button"  @click= "setPopup('popup-withdraw')">
                            <div class="icon-wrapper bg-info">
                                <i name="arrow-down-outline" role="img" class="md hydrated" aria-label="arrow down outline"></i>
                            </div>
                            <strong>Withdraw</strong>
                        </div>
                    </div>
                    <div class="item">
                        <div type="button"  @click = "setPopup('popup-send')">
                            <div class="icon-wrapper bg-danger">
                                <i name="arrow-forward-outline" role="img" class="md hydrated" aria-label="arrow forward outline"></i>
                            </div>
                            <strong>Send</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TemplateModal/>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import TemplateModal from '~/components/Modals/TemplateModal'
export default {
  name: 'Capsule',
  components: {
      TemplateModal
  },
  props: {
  },
  data () {
    return {
        node:null
    }
  },
  computed: {
    ...mapState('page', ['popup', 'symbol', 'account', 'address', 'balance', 'nodes']),
 },
  methods: {
    ...mapMutations('page', ['setPopup']),
  }
}
</script>

<style lang="scss" scoped>

</style>