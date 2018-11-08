import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import VolunteerPanel from '@/components/VolunteerPanel'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/panel',
      name: 'volunteerPanel',
      component: VolunteerPanel
    }
  ]
})
