<template>
    <div id="Capsule">
        <div class="section wallet-card-section pt-1">
            <div class="wallet-card">
                <div class="balance">
                    <div class="left">
                        <span class="title">Total Balance</span>
                        
                        <div class="input-group mb-2">
                            <h1 class="total">{{ balance }} {{ symbol }} </h1>
                            <div type = "button" @click="ReloadBalance()">
                                <svg class="w-64 h-64" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="avatar-section">
                            <a href="/settings">
                                <img src="~/assets/img/fluense.png" alt="avatar" class="imaged w100 rounded">
                            </a>
                        </div>
                        <div class="input-group mb-2">
                            {{account}}
                            <div>
                                 ({{address}})
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
                        label="nodes"
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
        <WithdrawModal/>
        <SendModal/>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import WithdrawModal from '~/components/Modals/WithdrawModal'
import SendModal from '~/components/Modals/SendModal'
export default {
  name: 'Capsule',
  components: {
      WithdrawModal,
      SendModal,
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
    ...mapActions('page', ['ReloadBalance']),
  }
}
</script>

<style lang="scss" scoped>

</style>