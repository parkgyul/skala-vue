<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import { findCityById } from '../mock/weatherData'
import { fetchForecast } from '../services/weatherApi'

const props = defineProps({
  cityId: {
    type: String,
    required: true
  }
})

const router = useRouter()
const configStore = useConfigStore()

const cityItem = ref(null)
const forecast = ref([])
const isForecastLoading = ref(false)

onMounted(() => {
  cityItem.value = findCityById(props.cityId)
  if (cityItem.value) {
    loadForecast()
  }
})

watch(
  () => configStore.unit,
  () => {
    if (cityItem.value) loadForecast()
  }
)

async function loadForecast() {
  isForecastLoading.value = true
  try {
    forecast.value = await fetchForecast(cityItem.value.apiQuery, configStore.unit)
  } catch {
    forecast.value = []
  } finally {
    isForecastLoading.value = false
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

const displayTemp = computed(() => {
  if (!cityItem.value) return null
  const rawTemp = cityItem.value.temperature
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

function goHome() {
  router.push('/')
}
</script>

<template>
  <div v-if="cityItem" class="detail">
    <section class="detail-card">
      <h2 class="detail-card__title">📊 지역별 상세 기상 관측 정보</h2>

      <ul class="detail-card__list">
        <li>📍 지정 지역: {{ cityItem.region }}</li>
        <li>실시간 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</li>
        <li>기상 현황: {{ cityItem.condition }}</li>
        <li>대기 습도: {{ cityItem.humidity }}%</li>
        <li>현재 풍속: {{ cityItem.windSpeed }}m/s</li>
      </ul>

      <el-button type="primary" @click="goHome"> ← 메인 대시보드로 돌아가기 </el-button>
    </section>

    <section class="forecast-card">
      <p class="forecast-card__title">📅 5일 예보</p>
      <el-skeleton v-if="isForecastLoading" :rows="1" animated />
      <div v-else-if="forecast.length > 0" class="forecast-card__list">
        <div v-for="day in forecast" :key="day.date" class="forecast-card__item">
          <p class="forecast-card__date">
            {{ formatDate(day.date) }}
          </p>
          <p class="forecast-card__temp">{{ day.temperature }}{{ configStore.unitSymbol }}</p>
          <p class="forecast-card__condition">
            {{ day.condition }}
          </p>
        </div>
      </div>
      <p v-else class="forecast-card__empty">
        예보 정보를 불러오지 못했습니다. (API 키 설정을 확인하세요)
      </p>
    </section>
  </div>

  <el-empty v-else description="해당 도시 정보를 찾을 수 없습니다.">
    <el-button type="primary" @click="goHome"> 메인 대시보드로 이동 </el-button>
  </el-empty>
</template>

<style scoped>
.detail-card {
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
}

.detail-card__title {
  margin: 0 0 18px;
  font-size: 19px;
  font-weight: 700;
}

.detail-card__list {
  list-style: none;
  margin: 0 0 24px;
  padding: 18px;
  background: #f5f7fa;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
  color: #3e4c59;
}

.forecast-card {
  margin-top: 20px;
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
}

.forecast-card__title {
  margin: 0 0 16px;
  font-size: 17px;
  font-weight: 700;
}

.forecast-card__list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.forecast-card__item {
  padding: 12px 6px;
  background: #f5f7fa;
  border-radius: 10px;
  text-align: center;
}

.forecast-card__date {
  margin: 0 0 6px;
  font-size: 12px;
  color: #6b7280;
}

.forecast-card__temp {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 700;
  color: #1f2933;
}

.forecast-card__condition {
  margin: 0;
  font-size: 11px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.forecast-card__empty {
  margin: 0;
  font-size: 13px;
  color: #9aa5b1;
}

@media (max-width: 480px) {
  .forecast-card__list {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 8px;
  }
}
</style>
