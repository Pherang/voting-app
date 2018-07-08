import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import state from './state'
import VueState from './plugins/state'

// state below is an object { user: null } that is passed as an option to install the VueState plugin
// VueState  
Vue.use(VueState, state)

async function main () {

// When reloading page/app try to get user from session
  try {
   let result  = await fetch('https://vabe.herokuapp.com/getUser', {
      headers: {
        'Content-type': 'application/json',
      },
      'credentials': 'include'
    })
    if (result.ok) {
      state.user = await result.json()
    } 
  } catch (err) {
    console.warn(err)
  }
  
new Vue({
  el: '#app',
  data: state,
  render: h => h(AppLayout),
  router
})

}
main()
