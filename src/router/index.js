import Parent from '@/views/Parent.vue'
import TestView from '@/views/TestView.vue'
import ToeicWordView from '@/views/ToeicWordView.vue'
import Spabase from '@/views/Spabase.vue'
import WordView from '@/views/WordView.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WordView',
      component: WordView,
    },
    {
      path: '/parent',
      name: 'parent',
      component: Parent,
    },
    {
      path: '/TestView',
      name: 'TestView',
      component: TestView,
    },
    {
      path: '/Spabase',
      name: 'Spabase',
      component: Spabase,
    },
  ],
})

export default router
