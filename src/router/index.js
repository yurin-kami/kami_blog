import { createRouter, createWebHistory } from 'vue-router'
import MUSIC from '@/views/MUSIC.vue'
import BOOKSHELF from '@/views/BOOKSHELF.vue'
import LOGIN from '@/views/LOGIN.vue'
import WRITEBLOG from '@/views/WRITEBLOG.vue'
import BLOG from '@/views/BLOG.vue'
import HOME from '@/views/HOME.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HOME
    },
    {
      path: '/about',
      name: '',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ''
    },
    {
      path:'/music',
      name:'music',
      component: MUSIC
    },
    {
      path:'/bookshelf',
      name:'bookshelf',
      component: BOOKSHELF
    },
    {
      path:'/admin',
      name:'admin',
      component: LOGIN
    },
    {
      path:'/writeblog',
      name:'writeblog',
      component: WRITEBLOG
    },
    {
      path:'/blog',
      name:'blog',
      component: BLOG
    },
    {
      path:'/blog/:demoTitle',
      name:'blog',
      component: BLOG
    }
  ]
})

export default router
