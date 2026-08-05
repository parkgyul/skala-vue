import { createRouter, createWebHistory } from 'vue-router'

// 요구사항 1: Lazy Loading — 각 라우트가 실제로 방문될 때만 해당 청크를 로드한다.
// () => import('...') 형태는 정적 import와 달리 빌드 시 별도 chunk로 분리된다.
const routes = [
  {
    path: '/',
    name: 'weather-home',
    component: () => import('../views/WeatherHomeView.vue')
  },
  {
    path: '/about',
    name: 'weather-about',
    component: () => import('../views/WeatherAboutView.vue')
  },
  {
    path: '/live',
    name: 'weather-live',
    component: () => import('../views/WeatherLiveView.vue')
  },
  {
    path: '/weather/:cityId',
    name: 'weather-detail',
    component: () => import('../views/WeatherDetailView.vue'),
    props: true 
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router