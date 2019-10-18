import Vue from 'vue'
import Router from 'vue-router'
const login = () =>import ('../src/views/loginRegister/login.vue')
const registerInvation = () =>import ('../src/views/loginRegister/registerInvation.vue')
const register = () =>import ('../src/views/loginRegister/register.vue')
const indexHome = () =>import ('../src/views/first/index.vue')
const fireUnitList = () =>import ('../src/views/first/fireUnitList.vue')
const set = () =>import ('../src/views/first/set.vue')
const fault =() =>import ('../src/views/fault/index.vue')
const faultHandle =()=>import('../src/views/fault/faultHandle.vue')
const firePatrol =()=>import('../src/views/fault/firePatrol.vue')
const facilityCode =()=>import('../src/views/fault/facilityCode.vue')
const handle =() => import ("../src/views/faultHandle/handle.vue")
const handling =() => import ("../src/views/faultHandle/handling.vue")
const handled =() => import ("../src/views/faultHandle/handled.vue")
const addDuty =() => import ("../src/views/patrolDuty/addDuty.vue")
const dutyDetails =()=> import ("../src/views/patrolDuty/dutyDetails.vue")
const addPatrol = ()=>import ("../src/views/patrolDuty/addPatrol.vue")
const patrolDetails = ()=>import ("../src/views/patrolDuty/patrolDetails.vue")
const addPatrolTrajectory = ()=>import ("../src/views/patrolDuty/addPatrolTrajectory.vue")
const patrolTrajectroy = ()=>import ("../src/views/patrolDuty/patrolTrajectroy.vue")


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexHome',
      component: indexHome,
      redirect:'/fireUnitList',
      children:[
        {
           path:'fireUnitList',
           name:'fireUnitList',
           component:fireUnitList
        },
        {
          path:'set',
          name:'set',
          component:set
       }
       

      ]
    },
    {
      path:'/fault',
      name:'fault',
      component:fault,
      redirect:'/fault/faultHandle',
      children:[
        {
          path:'faultHandle',
          name:'faultHandle',
          component:faultHandle,
          meta:{
            active:0
          }
        },
        {
          path:'firePatrol',
          name:'firePatrol',
          component:firePatrol,
          meta:{
            active:1
          }
        },
        {
          path:'facilityCode',
          name:'facilityCode',
          component:facilityCode,
          meta:{
            active:2
          }
        }
      ]
    },
    {
      path:'/handle',
      name:'handle',
      component:handle
    },
    {
      path:'/handling',
      name:'handling',
      component:handling
    },
    {
      path:'/handled',
      name:'handled',
      component:handled
    },
    {
      path:"/addDuty",
      name:'addDuty',
      component:addDuty
    },
    {
      path:"/dutyDetails",
      name:'dutyDetails',
      component:dutyDetails
    },
    {
      path:"/addPatrol",
      name:'addPatrol',
      component:addPatrol
    },
    {
      path:"/patrolDetails",
      name:'patrolDetails',
      component:patrolDetails
    },
    {
      path:"/addPatrolTrajectory",
      name:'addPatrolTrajectory',
      component:addPatrolTrajectory
    },
    {
      path:"/patrolTrajectroy",
      name:'patrolTrajectroy',
      component:patrolTrajectroy
    },
    {
      path: '/registerInvation',
      name: 'registerInvation',
      component: registerInvation
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
