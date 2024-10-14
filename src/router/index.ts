import { createRouter, createWebHistory } from 'vue-router'
import WebsiteContent from '../components/WebsiteContent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WebsiteContent
    }
  ]
})

export default router
