import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

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
      }

    ],
    
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import( '@/views/admin/AdminView'),
    beforeEnter: async (to, from, next) => {
      const store = useAuthStore()

      const {user} = storeToRefs(store)
 
      if (user.value.isAdmin) {

        next();
      } else {

        next('/');
      }
    },


    children:[
      {
        path: 'users',
        name: 'users',
        component:() => import( '@/views/admin/UserView'),
      }
    ],
  
  },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router