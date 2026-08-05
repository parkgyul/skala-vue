<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import { weatherList } from '../mock/weatherData'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const configStore = useConfigStore()

const searchQuery = ref('')
const selectedCityInfo = ref('')

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList
  return weatherList.filter(item => item.city.includes(query))
})

watch(selectedCityInfo, (newValue) => {
  console.log(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newValue}"`)
})

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 데이터를 필터링합니다.`)
})

function handleUpdateQuery(value) {
  searchQuery.value = value
}

function handleSelectCard(city) {
  selectedCityInfo.value = `${city.city}이(가) 선택되었습니다.`
}

function handleClickDetail(city) {
  router.push('/weather/' + city.id)
}
</script>

<template>
  <div>
    <BaseDashboardCard icon="🔍" title="도시 검색 (한글 즉시 동기화)">
      <SearchBar :query="searchQuery" @update-query="handleUpdateQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard icon="🗺️" title="지역별 날씨 현황">
      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city="item"
        :unit="configStore.unit"
        :unit-symbol="configStore.unitSymbol"
        @select-card="handleSelectCard"
        @click-detail="handleClickDetail"
      />

      <el-empty
        v-if="filteredWeatherList.length === 0"
        :description="`&quot;${searchQuery}&quot;와 일치하는 도시가 없습니다.`"
      />
    </BaseDashboardCard>

    <p class="notice">
      {{ selectedCityInfo || '카드를 클릭하거나 검색해 보세요.' }}
    </p>
  </div>
</template>

<style scoped>
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
</style>