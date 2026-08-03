<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const searchQuery = ref('')
const selectedCityInfo = ref('')

const weatherList = ref([
  { id: 'city_01', city: '서울', temperature: 28, condition: '맑음' },
  { id: 'city_02', city: '수원', temperature: 24, condition: '비' },
  { id: 'city_03', city: '부산', temperature: 26, condition: '구름' },
])

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter(item => item.city.includes(query))
})

watch(selectedCityInfo, (newValue) => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newValue}"`)
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.`)
})

// SearchBar -> update-query 이벤트 수신
function handleUpdateQuery(value) {
  searchQuery.value = value
}

// WeatherCard -> select-card 이벤트 수신 (카드 클릭)
function handleSelectCard(city) {
  console.log(`[카드 클릭] ${city.city}`)
}

// WeatherCard -> click-detail 이벤트 수신 (상세보기 클릭)
function handleClickDetail(city) {
  selectedCityInfo.value = `${city.city}이(가) 선택되었습니다.`
  alert(`${city.city} · ${city.condition} · 현재 기온 ${city.temperature}°C`)
}
</script>

<template>
  <div class="page">
    <main class="dashboard">
      <header class="dashboard__head">
        <span class="dashboard__icon">🌤️</span>
        <h1>과제 3: 날씨 (컴포넌트)</h1>
      </header>

      <BaseDashboardCard icon="🔍" title="도시 검색 (한글 즉시 동기화)">
        <SearchBar
          :query="searchQuery"
          @update-query="handleUpdateQuery"
        />
      </BaseDashboardCard>

      <BaseDashboardCard icon="🗺️" title="지역별 날씨 현황">
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city="item"
          @select-card="handleSelectCard"
          @click-detail="handleClickDetail"
        />

        <p v-if="filteredWeatherList.length === 0" class="empty">
          "{{ searchQuery }}"와 일치하는 도시가 없습니다.
        </p>
      </BaseDashboardCard>

      <p class="notice">
        {{ selectedCityInfo || '카드를 클릭하거나 검색해 보세요.' }}
      </p>
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
  max-width: 720px;
  padding: 36px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
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

.empty {
  margin: 8px 0 0;
  padding: 26px;
  border: 1px dashed #d2d6db;
  border-radius: 12px;
  text-align: center;
  color: #6b7280;
  font-size: 16px;
}

.notice {
  margin: 0;
  padding: 18px;
  border-radius: 12px;
  background: #dcf5df;
  color: #1a7f37;
  text-align: center;
  font-weight: 700;
  font-size: 17px;
}

@media (max-width: 480px) {
  .page { padding: 24px 12px; }
  .dashboard { padding: 20px; font-size: 16px; }
}
</style>