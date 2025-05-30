import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TopicList from '../views/TopicList.vue'
import TopicDetail from '../views/TopicDetail.vue'
import SearchPage from '../views/SearchPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearchPage
    },
    {
      path: '/topics',
      name: 'topics',
      component: TopicList
    },
    {
      path: '/topics/:id',
      name: 'topic-detail',
      component: TopicDetail
    }
  ]
})

export default router 