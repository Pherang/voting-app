import Vue from 'vue'
import VueRouter from 'vue-router'
import Polls from './components/Polls.vue'
import MyPolls from './components/MyPolls.vue'
import Login from './components/Login.vue'

// Install the VueRouter plugin to vue.
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'polls', component: Polls},
  { path: '/mypolls', name: 'my-polls', component: MyPolls},
  { path: '/login', name: 'login', component: Login}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
