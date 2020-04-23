import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Table from'../views/Table.vue'
import Chart from'../views/Chart.vue'
import Lost from '@/views/404'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  },
  {
    path: '/chart',
    name: 'chart',
    component: Chart
  },
  {
    path: '/*',
    name: '404',
    component: Lost
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
