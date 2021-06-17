import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [{
  path: '',
  redirect: '/homePage'
},{
  path: '/homePage',
  name: 'HomePage',
  component: () => import('@/views/homePage')
},{
  path: '/rrweb',
  name: 'Rrweb',
  component: () => import('@/views/rrweb')
}]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
