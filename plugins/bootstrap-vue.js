// Place all imports from 'bootstrap-vue' in a single import
// statement for optimal bundle sizes
import Vue from 'vue';
import { BModal, VBModal } from 'bootstrap-vue'

Vue.component('BModal', BModal)
// Note that Vue automatically prefixes directive names with `v-`
Vue.directive('b-modal', VBModal)