import Vue from 'vue'
import VueRouter from 'vue-router'
import Polls from './components/Polls.vue'
import MyPolls from './components/MyPolls.vue'
import Login from './components/Login.vue'
import state from './state'

// Install the VueRouter plugin to vue.
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'polls', component: Polls},
  { path: '/login', name: 'login', component: Login},
  { path: '/mypolls', name: 'my-polls', component: MyPolls, 
    meta: { requireAuth : true } }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach( (to, from, next) => {

  if (to.matched.some( record => record.meta.requireAuth )){

    if (!state.user) {
      next ({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }

  } else {
    next() // this next needs to be called or routing stops.
  }
})

export default router
