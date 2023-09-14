import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

import setActiveOwner from '@/composables/setActiveOwners'


const routes = [
  {
    path: '/',
    name: 'main',
    component: ()=>import( '@/views/MainView'),
    children:[
      {
        path: '/home',
        name: 'home',
        component:Home,
      },
      {
        path: '/settings',
        name : 'settings',
        component : () => import('@/views/components/SettingsView.vue'), 
      
      },
      {
        path: '/error', 
        name: 'error',
        component: () => import('@/views/components/ErrorView.vue'), 
      },

    ],
    
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import( '@/views/admin/AdminView'),
    beforeEnter: async (to, from, next) => {
      const store = useAuthStore()

      const {user} = storeToRefs(store)
      if(!user.value){
       await store.getUser()
      }
    
      if (user.value && user.value.enable) {
        

        next();
      } else {

        next('/');
      }
    },


    children:[
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: { owner: 'dashboard' } ,
        component:() => import( '@/views/admin/DashboardView'),
        beforeEnter:  setActiveOwner
      },
      {
        path: 'users',
        name: 'user',
        meta: { owner: 'user' } ,
        component:() => import( '@/views/admin/UserView'),
        beforeEnter: async (to, from, next) => {
          const store = useAuthStore()
          console.log(from.path)
          console.log(to.path)
    
          const {user} = storeToRefs(store)
          if(!user.value){
           await store.getUser()
          }
        
          if (user.value && user.value.admin) {
            setActiveOwner(to, from, next)
           
          } else {
    
            next(from.path);
          }
        }
      },
      {
        path: 'employee',
        name: 'employee',
        meta: { owner: 'employee' } ,
        component:() => import( '@/views/admin/EmployeeView'),
        beforeEnter: setActiveOwner
      },
      {
        path: 'employee/:id',
        name: 'employeeDetails',
        meta: { owner: 'employee' } ,
        component:() => import( '@/views/admin/components/EmployeeDetails'),
      },
     
      

    ],
  
  },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }  router.push()


{
  path: '/:catchAll(.*)', // Catch-all route
  redirect: '/error', // Redirect to the error page
},
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router