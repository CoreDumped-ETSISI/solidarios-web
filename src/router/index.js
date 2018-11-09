import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import UsersPanel from '@/components/UsersPanel'
import VolunteersPanel from '@/components/volunteersPanel'
import EventsPanel from '@/components/EventsPanel'
import CreateUserPanel from '@/components/CreateUserPanel'
import CreateEventPanel from '@/components/CreateEventPanel'

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
      path: '/users',
      name: 'usersPanel',
      component: UsersPanel
    },
    {
      path: '/volunteers',
      name: 'volunteersPanel',
      component: VolunteersPanel
    },
    {
      path: '/events',
      name: 'eventsPanel',
      component: EventsPanel
    },
    {
      path: '/newUser',
      name: 'createNewUser',
      component: CreateUserPanel
    },
    {
      path: '/newEvent',
      name: 'createNewEvent',
      component: CreateEventPanel
    }
  ]
})
