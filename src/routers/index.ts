import { createRouter, createWebHistory } from 'vue-router'
import ChatLayout from '@/modules/chat/layout/Chat.layout.vue'
import LoginPage from '@/modules/auth/layout/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChatLayout
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})

export { router }
