import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/entry',
      name: 'entry',
      component: require('@/components/Entry').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
