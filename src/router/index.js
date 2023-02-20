import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import(/* webpackChunkName: "about" */ '@/views/login')
  },
  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    hidden: false,
    redirect: '/home/index',
    component: Layout,
    meta: { title: 'Hardware library' },
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import(/* webpackChunkName: "about" */ '@/views/home'),
        meta: { title: 'Hardware library' }
      },
      {
        path:'detail',
        name:'Detail',
        component: ()=> import('@/views/detail')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    component: Layout,
    redirect: '/components/index',
    hidden: false,
    meta: { title: 'My components' },
    children: [
      {
        path: 'index',
        name: 'ComponentsIndex',
        component: () => import('@/views/components'),
        meta: { title: 'My components' }
      }
    ]
  },
  {
    path: '/proposal',
    name: 'Proposal',
    redirect: '/proposal/index',
    component: Layout,
    hidden: false,
    meta: { title: 'My proposals' },
    children: [
      {
        path: 'index',
        name: 'ProposalIndex',
        component: () => import( '@/views/proposal'),
        meta: { title: 'My proposals' }
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    redirect: '/cart/index',
    hidden: false,
    component: Layout,
    meta: { title: 'My Cart' },
    children: [
      {
        path: 'index',
        name: 'CartIndex',
        component: () => import( '@/views/cart'),
        meta: { title: 'My Cart' }
      }
    ]
  },
  {
    path: '/propose',
    name: 'Propose',
    redirect: '/propose/index',
    hidden: false,
    component: Layout,
    meta: { title: 'Propose Component' },
    children: [
      {
        path: 'index',
        name: 'ProposeIndex',
        component: () => import( '@/views/propose'),
        meta: { title: 'Propose Component' }
      }
    ]
  },
  {
    path: '/faq',
    name: 'Faq',
    redirect: '/faq/index',
    component: Layout,
    hidden: false,
    meta: { title: 'FAQ' },
    children: [
      {
        path: 'index',
        name: 'FaqIndex',
        component: () => import(/* webpackChunkName: "about" */ '@/views/faq'),
        meta: { title: 'FAQ' },
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/views/404')
  },
  {
    path: '/:catchAll(.*)',
    hidden: true,
    redirect: '/404'
  }
]


const router = new VueRouter({
  routes
})

export default router
