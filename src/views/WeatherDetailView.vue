<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import { findCityById } from '../mock/weatherData'

const props = defineProps({
  cityId: {
    type: String,
    required: true
  }
})

const router = useRouter()
const configStore = useConfigStore()

const cityItem = ref(null)

onMounted(() => {
  cityItem.value = findCityById(props.cityId)
})

const displayTemp = computed(() => {
  if (!cityItem.value) return null
  const rawTemp = cityItem.value.temperature // 기본 원본 데이터는 섭씨 숫자
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return rawTemp // 'celsius' 일 때는 원본 그대로 반환
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

      <el-button type="primary" @click="goHome">← 메인 대시보드로 돌아가기</el-button>
    </section>
  </div>

  <el-empty v-else description="해당 도시 정보를 찾을 수 없습니다.">
    <el-button type="primary" @click="goHome">메인 대시보드로 이동</el-button>
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
</style>