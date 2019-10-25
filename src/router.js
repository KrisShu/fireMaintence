import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
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
const addPatrol = ()=>import ("../src/views/patrolDuty/addPatrol.vue")
const patrolDetails = ()=>import ("../src/views/patrolDuty/patrolDetails.vue")
const addPatrolTrajectory = ()=>import ("../src/views/patrolDuty/addPatrolTrajectory.vue")
const patrolTrajectroy = ()=>import ("../src/views/patrolDuty/patrolTrajectroy.vue")
const support = ()=>import ("../src/views/set/support.vue")
const changePw = ()=>import ("../src/views/set/changePw.vue")
const addadvice = ()=>import ("../src/views/set/addadvice.vue")
const myFireUnits = ()=>import ("../src/views/set/myFireUnits.vue")
const allFireUnits = ()=>import ("../src/views/set/allFireUnits.vue")
const editCode = ()=>import ("../src/views/facilityCode/editCode.vue")



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'indexHome',
      component: indexHome,
      redirect:'/fireUnitList',
      meta:{
        auth:true//设置当前路由需要校验
      },
      children:[
        {
           path:'fireUnitList',
           name:'fireUnitList',
           component:fireUnitList,
           meta:{
            active:1 //1为真，控制active为true,选中维保事物
          }
        },
        {
          path:'set',
          name:'set',
          component:set,
          meta:{
            active:0 //0为假，控制active为false 选中我的设置
          }
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
    },
    {
      path: '/support',
      name: 'support',
      component: support
    },
    {
      path: '/changePw',
      name: 'changePw',
      component: changePw
    },
    {
      path: '/addadvice',
      name: 'addadvice',
      component: addadvice
    },
    {
      path: '/myFireUnits',
      name: 'myFireUnits',
      component: myFireUnits
    },
    {
      path: '/allFireUnits',
      name: 'allFireUnits',
      component: allFireUnits
    },
    {
      path: '/editCode',
      name: 'editCode',
      component: editCode
    }
  ]
})

router.beforeEach(function(to,from,next){
  if(to.matched.some( m => m.meta.auth)){  // 对路由进行验证       
    if(store.state.isLogin=='1') { // 已经登陆      
      next()   // 正常跳转到你设置好的页面     
    }
    else{       
      // 未登录则跳转到登陆界面
      next({path:'/login'})
    } 
  }else{ 
    next() 
  } 
})

export default router;