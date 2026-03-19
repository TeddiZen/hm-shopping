import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Cart from '@/views/layout/cart.vue'
import Catgory from '@/views/layout/catgory.vue'
import Home from '@/views/layout/home.vue'
import User from '@/views/layout/user.vue'

import store from '@/store'

const Login = () => import('@/views/login')
const MyOrder = () => import('@/views/myorder')
const Pay = () => import('@/views/pay')
const ProDetail = () => import('@/views/prodetail')
const SearchIndex = () => import('@/views/search/index.vue')
const SearchList = () => import('@/views/search/list.vue')

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
  { path: '/search', component: SearchIndex },
  { path: '/searchlist', component: SearchList }
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
