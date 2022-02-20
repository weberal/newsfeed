import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sample-1',
    name: 'sample1',
    component: () => import('../views/Sample1View.vue')
  },
  {
    path: '/sample-2',
    name: 'sample2',
    component: () => import('../views/Sample2View.vue')
  },
  {
    path: '/imprint',
    name: 'imprint',
    component: () => import('../views/ImprintView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
