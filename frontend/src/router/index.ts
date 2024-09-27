import { createRouter, createWebHistory, type Router } from 'vue-router'

import Home from '@/views/Home.vue'
import TransactionDetail from '@/views/TransactionDetail.vue'
import SelectFriends from '@/views/SelectFriends.vue'
import SplitBill from '@/views/SplitBill.vue'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/transaction/:id',
      name: 'transaction-detail',
      component: TransactionDetail,
      props: true
    },
    {
      path: '/split-bill/:id/friends',
      name: 'select-friends',
      component: SelectFriends,
      props: true
    },
    {
      path: '/split-bill/:id/request',
      name: 'split-bill',
      component: SplitBill,
      props: true
    }
  ]
})

export default router
