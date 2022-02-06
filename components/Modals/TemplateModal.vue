<template>
    <transition class="popup-withdraw">
        <div v-show="isVisible" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Template Modal</h5>
                          <div type="buttom" @click= "hidePopup()" style = "width:11px; height:5px;" >
                            <svg 
                              viewBox="0 0 10 10">
                              <path
                                d="M9.65625 1.28125L5.9375 5L9.65625 8.71875L8.71875 9.65625L5 5.9375L1.28125 9.65625L0.34375 8.71875L4.0625 5L0.34375 1.28125L1.28125 0.34375L5 4.0625L8.71875 0.34375L9.65625 1.28125Z"
                              />
                            </svg>
                          </div>
                    </div>
                    <div class="modal-body">
                        <div class="action-sheet-content">
                            <div class="form-group basic">
                                <div class="input-wrapper">
                                    <label class="label" for="account1">Address</label>
                                    <input type="text" class="form-control" placeholder="Enter Address"  v-model="address">
                                </div>
                            </div>

                            <div class="form-group basic">
                                <label class="label">Enter Amount</label>
                                <div class="input-group mb-2">
                                    <span class="input-group-text" id="basic-addona1">{{symbol}}</span>
                                    <input v-model="amount" type="text" class="form-control" placeholder="Enter an amount">
                                </div>
                            </div>

                            <div class="form-group basic">
                                <button type="button" class="btn btn-primary btn-block btn-lg" data-bs-dismiss="modal">Deposit</button>
                            </div>
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
  name: 'TemplateModal',
  components: {
  },
  props: {
  },
  data () {
    return {
        title: 'popup-withdraw',
        address: null,
        amount: null,
        isVisible: false
    }
  },
  computed: {
    ...mapState('page', ['popup', 'symbol']),
 },
 
  watch: {
    popup() {
      if (this.title == this.popup) {
        this.showPopup();
      }
      if (!this.popup) {
        this.hidePopup();
      }
    }
  },

  methods: {
    ...mapMutations('page', ['setPopup']),

    showPopup() {
      console.log('showPopup')
      document.addEventListener('keyup', this.keyUp);
      this.isVisible = true;
    },

    hidePopup() {
      console.log('hidePopup')
      document.removeEventListener('keyup', this.keyUp);
      this.setPopup(null);
      this.isVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>