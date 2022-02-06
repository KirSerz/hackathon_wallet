<template>
    <transition class="popup-transaction">
        <div v-show="isVisible" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Transaction</h5>
                          <div type="button" @click= "hidePopup()" style = "width:11px; height:5px;" >
                            <svg 
                              viewBox="0 0 10 10">
                              <path
                                d="M9.65625 1.28125L5.9375 5L9.65625 8.71875L8.71875 9.65625L5 5.9375L1.28125 9.65625L0.34375 8.71875L4.0625 5L0.34375 1.28125L1.28125 0.34375L5 4.0625L8.71875 0.34375L9.65625 1.28125Z"
                              />
                            </svg>
                          </div>
                    </div>
                    <div class="modal-body">
                        <div class="section mt-2 mb-2">

                          <ul class="listview flush transparent simple-listview no-space mt-3">
                              <li>
                                  <strong>From</strong>
                                  <span class="text-success">{{transaction.from}}</span>
                              </li>
                              <li>
                                  <strong>To</strong>
                                  <span>{{transaction.to}}</span>
                              </li>
                              <li>
                                  <strong>Sign</strong>
                                  <span>{{transaction.sign}}</span>
                              </li>
                              <li>
                                  <strong>Txid</strong>
                                  <span>{{transaction.txid}}</span>
                              </li>
                              <li>
                                  <strong>Prev txid</strong>
                                  <span>{{transaction.prev_txid}}</span>
                              </li>
                              <li>
                                  <strong>Amount</strong>
                                  <h3 class="m-0">{{transaction.amount}} {{symbol}}</h3>
                              </li>
                          </ul>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: 'TransactionModal',
  components: {
  },
  props: {
    txid: {
      type: String,
      default: null
    },
  },
  data () {
    return {
        title: 'popup-transaction',
        isVisible: false,
    }
  },
  computed: {
    ...mapState('page', ['popup', 'transaction', 'symbol']),
 },
 
  watch: {
    popup() {
      console.log(this.title+this.transaction.txid);
      console.log(this.popup);
      if (this.title+this.transaction.txid == this.popup) {
        console.log('!!!');
        this.showPopup();
      }
      else  this.isVisible = false;
      if (!this.popup) {
        this.hidePopup();
      }
    }
  },

  methods: {
    ...mapMutations('page', ['setPopup', 'setTransaction']),
    
    keyUp(e) {
      if (e.keyCode == 27) {
        this.hidePopup();
      }
    },

    showPopup() {
      document.addEventListener('keyup', this.keyUp);
      this.isVisible = true;
    },

    hidePopup() {
      document.removeEventListener('keyup', this.keyUp);
      this.setPopup(null);
      this.isVisible = false;        
      this.setTransaction = {
        'amount':0,
        'from':'',
        'to':'',
        'sign':'',
        'txid':'',
        'prev_txid':'',
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>