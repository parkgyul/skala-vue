<script setup>
import { ref, watch } from 'vue'
import { useConfigStore } from '../stores/configStore'
import { fetchLiveWeather } from '../services/weatherApi'

const configStore = useConfigStore()

const cityInput = ref('')
const result = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

async function handleSearch() {
  const query = cityInput.value.trim()
  if (!query) return

  isLoading.value = true
  errorMessage.value = ''
  result.value = null

  try {
    result.value = await fetchLiveWeather(query, configStore.unit)
  } catch (err) {
    if (err.response?.status === 404) {
      errorMessage.value = `"${query}"에 해당하는 도시를 찾을 수 없습니다.`
    } else {
      errorMessage.value = err.message || '날씨 정보를 불러오는 중 오류가 발생했습니다.'
    }
  } finally {
    isLoading.value = false
  }
}

watch(() => configStore.unit, () => {
  if (result.value) {
    cityInput.value = result.value.city
    handleSearch()
  }
})
</script>

<template>
  <section class="live-card">
    <h2 class="live-card__title">🌍 실시간 날씨 검색</h2>
    <p class="live-card__desc">
      Mock 데이터가 아닌 OpenWeatherMap 실시간 API로 전 세계 도시를 검색합니다. (영문 도시명 권장)
    </p>

    <div class="live-card__search">
      <el-input
        v-model="cityInput"
        placeholder="예: Seoul, Tokyo, Paris"
        size="large"
        clearable
        @keyup.enter="handleSearch"
      >
        <template #prefix>🔍</template>
      </el-input>
      <el-button type="primary" size="large" :loading="isLoading" @click="handleSearch">
        검색
      </el-button>
    </div>

    <!-- 로딩 상태 -->
    <el-skeleton v-if="isLoading" :rows="3" animated style="margin-top: 20px" />

    <el-alert
      v-else-if="errorMessage"
      :title="errorMessage"
      type="error"
      show-icon
      :closable="false"
      style="margin-top: 20px"
    />

    <div v-else-if="result" class="result">
      <p class="result__name">{{ result.city }}<span v-if="result.country">, {{ result.country }}</span></p>
      <p class="result__temp">{{ result.temperature }}{{ configStore.unitSymbol }}</p>
      <p class="result__meta">체감 {{ result.feelsLike }}{{ configStore.unitSymbol }} · {{ result.condition }}</p>
      <div class="result__extra">
        <span>습도 {{ result.humidity }}%</span>
        <span>풍속 {{ result.windSpeed }}m/s</span>
      </div>
    </div>

    <!-- 초기 상태 -->
    <el-empty v-else description="도시 이름을 검색해 보세요." style="margin-top: 20px" />
  </section>
</template>

<style scoped>
.live-card {
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
}

.live-card__title {
  margin: 0 0 8px;
  font-size: 19px;
  font-weight: 700;
}

.live-card__desc {
  margin: 0 0 18px;
  font-size: 14px;
  color: #6b7280;
}

.live-card__search {
  display: flex;
  gap: 10px;
}

.result {
  margin-top: 20px;
  padding: 24px;
  background: #f5f7fa;
  border-radius: 12px;
  text-align: center;
}

.result__name {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 700;
  color: #1f2933;
}

.result__temp {
  margin: 0;
  font-size: 44px;
  font-weight: 700;
  color: #2f6fed;
}

.result__meta {
  margin: 4px 0 14px;
  font-size: 14px;
  color: #6b7280;
}

.result__extra {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 14px;
  color: #3e4c59;
}
</style>