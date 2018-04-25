import Vue from 'vue'
import VueRouter from 'vue-router'
import Polls from './components/Polls.vue'
import MyPolls from './components/MyPolls.vue'

// Install the VueRouter plugin to vue.
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'polls', component: Polls},
  { path: '/mypolls', name: 'mypolls', component: MyPolls}

]
