<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <section class="about-card">
    <h2 class="about-card__title">ℹ️ 서비스 소개</h2>

    <p class="about-card__lead">
      본 앱은 Vue 3 및 Vue Router 4 기반 제작된 실습용 기상 관측 대시보드 시스템입니다.
    </p>

    <ul class="about-card__list">
      <li><code>components/exercise/</code> 폴더 내의 독립 부품 컴포넌트 연동</li>
      <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
      <li>Pinia 스토어를 활용한 실시간 단위(°C/°F) 상태 동기화</li>
    </ul>

    <el-button type="primary" style="width: 100%" @click="goHome">대시보드 홈으로 이동</el-button>
  </section>
</template>

<style scoped>
.about-card {
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
}

.about-card__title {
  margin: 0 0 18px;
  font-size: 19px;
  font-weight: 700;
}

.about-card__lead {
  margin: 0 0 14px;
  color: #3e4c59;
  font-size: 16px;
}

.about-card__list {
  margin: 0 0 24px;
  padding-left: 20px;
  color: #3e4c59;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about-card__list code {
  background: #fef3c7;
  color: #92400e;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
}
</style>