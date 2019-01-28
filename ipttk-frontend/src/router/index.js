import Vue from 'vue'
import Router from 'vue-router'
import { USER_TYPES } from '@/consts'
import HelloWorld from '@/components/HelloWorld'
import Denied from '@/components/Denied'
import PointAddView from '@/views/worker/PointAdd'
import SegmentAddView from '@/views/worker/SegmentAdd'
import RouteAddView from '@/views/tourist/RouteAdd'
import RoutesListView from '@/views/tourist/RoutesList'
import VerifyRoutesListView from '@/views/leader/RoutesList'
import VerifyRouteView from '@/views/leader/VerifyRoute'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'

Vue.use(Router)

const logout = (to, from, next) => {
  localStorage.clear()
  return next('/')
}

const router = new Router({
  routes: [
    {
      path: '/denied',
      name: 'denied',
      component: Denied
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: logout
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/add-point',
      name: 'addpoint',
      component: PointAddView,
      meta: {
        requiresAuth: true,
        userType: USER_TYPES.worker
      }
    },
    {
      path: '/add-segment',
      name: 'addsegment',
      component: SegmentAddView,
      meta: {
        requiresAuth: true,
        userType: USER_TYPES.worker
      }
    },
    {
      path: '/add-route',
      name: 'addroute',
      component: RouteAddView,
      meta: {
        requiresAuth: true,
        userType: USER_TYPES.tourist
      }
    },
    {
      path: '/routes',
      name: 'listroutes',
      component: RoutesListView,
      meta: {
        requiresAuth: true,
        userType: USER_TYPES.tourist
      }
    },
    {
      path: '/verify-routes',
      name: 'verifylistroutes',
      component: VerifyRoutesListView,
      meta: {
        requiresAuth: true,
        userType: USER_TYPES.leader
      }
    },
    {
      path: '/verify-routes/:id',
      name: 'verifyroute',
      component: VerifyRouteView,
      meta: {
        requiresAuth: true,
        userType: USER_TYPES.leader
      }
    },
    {
      path: '*',
      name: 'index',
      component: HelloWorld
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      return next({name: 'login'})
    }
    if (to.meta.userType !== user.type) {
      return next({name: 'denied'})
    }
    if (from.name === 'login') {
      return next({name: 'index'})
    }
  }
  return next()
})

export default router
