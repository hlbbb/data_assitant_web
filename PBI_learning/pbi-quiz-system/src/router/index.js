import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import QuestionList from '../views/QuestionList.vue'
import Practice from '../views/Practice.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list',
    name: 'QuestionList',
    component: QuestionList
  },
  {
    path: '/practice',
    name: 'Practice',
    component: Practice
  },
  {
    path: '/practice/:id',
    name: 'PracticeDetail',
    component: Practice
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
