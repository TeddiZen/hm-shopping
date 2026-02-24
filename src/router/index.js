import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Login from '@/views/login'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import ProDetail from '@/views/prodetail'
import SerchIndex from '@/views/search/index.vue'
import SerchList from '@/views/search/list.vue'
import Cart from '@/views/layout/cart.vue'
import Catgory from '@/views/layout/catgory.vue'
import Home from '@/views/layout/home.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/cart', component: Cart },
      { path: '/catgory', component: Catgory },
      { path: '/home', component: Home },
      { path: '/user', component: User }
    ]
  },
  { path: '/myorder', component: MyOrder },
  { path: '/pay', component: Pay },
  { path: '/prodetail/:id', component: ProDetail },
  { path: '/serchindex', component: SerchIndex },
  { path: '/serchlist', component: SerchList }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!['/pay', '/myorder'].includes(to.path)) {
    next()
    return 0
  }

  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
