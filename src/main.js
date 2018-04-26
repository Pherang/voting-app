import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import state from './state'
import VueState from './plugins/state'

// state below is an object { user: null } that is passed as an option to install the VueState plugin
// VueState  
Vue.use(VueState, state)

new Vue({
  el: '#app',
  data: state,
  render: h => h(AppLayout),
  router
})
