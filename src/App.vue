<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="page">
    <main class="dashboard">
      <header class="dashboard__head">
        <span class="dashboard__icon">🌤️</span>
        <h1>과제 4: 라우터적용</h1>
      </header>

      <nav class="nav-bar">
        <div class="nav-bar__links">
          <RouterLink to="/" class="nav-bar__link" active-class="nav-bar__link--active">
            🌥️ 날씨 대시보드
          </RouterLink>
          <span class="nav-bar__divider">|</span>
          <RouterLink to="/live" class="nav-bar__link" active-class="nav-bar__link--active">
            🌍 실시간 검색
          </RouterLink>
          <span class="nav-bar__divider">|</span>
          <RouterLink to="/about" class="nav-bar__link" active-class="nav-bar__link--active">
            ℹ️ 서비스 소개
          </RouterLink>
        </div>

        <!-- Store 과제: Navigation Bar 옆에 UnitToggler 배치 -->
        <UnitToggler />
      </nav>

      <!-- 라우트에 매칭된 컴포넌트가 이 자리에 렌더링된다 -->
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 20px;
  background: #eaf5e9;
  box-sizing: border-box;
}

.dashboard {
  width: 100%;
  max-width: 760px;
  padding: 36px;
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #1f2933;
  font-size: 18px;
}

.dashboard__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.dashboard__icon {
  font-size: 32px;
}

.dashboard__head h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e7eb;
}

.nav-bar__links {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-bar__link {
  color: #6b7280;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  padding: 6px 4px;
}

.nav-bar__link--active {
  color: #2f6fed;
  border-bottom: 2px solid #2f6fed;
}

.nav-bar__divider {
  color: #d2d6db;
}

@media (max-width: 480px) {
  .page {
    padding: 24px 12px;
  }
  .dashboard {
    padding: 20px;
    font-size: 16px;
  }
  .nav-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
