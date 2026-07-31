<script setup>
import { ref, computed } from 'vue'

const weatherList = ref([
  { id: 'city_01', city: '서울', temperature: 28, condition: '맑음' },
  { id: 'city_02', city: '수원', temperature: 24, condition: '비' },
  { id: 'city_03', city: '부산', temperature: 26, condition: '구름' },
])

const keyword = ref('')

function handleInput(event) {
  keyword.value = event.target.value
}

const filteredList = computed(() => {
  const query = keyword.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter(item => item.city.includes(query))
})

const selectedMessage = ref('')

function showDetail(item) {
  selectedMessage.value = `${item.city}이 선택되었습니다.`
  alert(`${item.city} · ${item.condition} · 현재 기온 ${item.temperature}°C`)
}

function handleCardClick(item) {
  console.log(`[카드 클릭] ${item.city}`)
}
</script>

<template>
  <div class="page">
  <main class="dashboard">
    <header class="dashboard__head">
      <span class="dashboard__icon">🌤️</span>
      <h1>1일차 과제: 날씨 대시보드 Mockup</h1>
    </header>

    <section class="panel">
      <label class="search">
        <span class="search__label">🔍 도시 검색 (한글 즉시 동기화)</span>
        <input
          type="text"
          placeholder="예: 서울"
          :value="keyword"
          @input="handleInput"
        />
      </label>
      <p class="search__echo">
        검색 중인 도시: <strong>{{ keyword || '전체' }}</strong>
      </p>
    </section>

    <section class="panel">
      <h2 class="panel__title">🗺️ 지역별 날씨 현황</h2>

      <ul class="cards">
        <li
          v-for="item in filteredList"
          :key="item.id"
          class="card"
          @click="handleCardClick(item)"
        >
          <div class="card__info">
            <p class="card__name">{{ item.city }} ({{ item.condition }})</p>
            <p class="card__temp">현재 기온: {{ item.temperature }}°C</p>

            <span v-if="item.temperature >= 25" class="tag tag--hot">
              🔥 더움 (25도 이상)
            </span>
            <span v-else class="tag tag--cool">
              ❄️ 선선함 (25도 미만)
            </span>
          </div>

          <button type="button" class="card__button" @click.stop="showDetail(item)">
            상세보기 (팝업)
          </button>
        </li>
      </ul>

      <p v-if="filteredList.length === 0" class="empty">
        "{{ keyword }}"와 일치하는 도시가 없습니다.
      </p>
    </section>

    <p v-if="selectedMessage" class="notice">{{ selectedMessage }}</p>
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
  margin-bottom: 16px;
}

.dashboard__icon {
  font-size: 32px;
}

.dashboard__head h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.panel {
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
}

.search__label {
  display: block;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 600;
  color: #3e4c59;
}

.search input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d2d6db;
  border-radius: 10px;
  font-size: 18px;
  font-family: inherit;
  box-sizing: border-box;
}

.search input:focus {
  outline: 2px solid #2f6fed;
  outline-offset: 1px;
  border-color: transparent;
}

.search__echo {
  margin: 12px 0 0;
  font-size: 16px;
  color: #6b7280;
}

.panel__title {
  margin: 0 0 18px;
  font-size: 19px;
  font-weight: 700;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px;
  border: 1px solid #e4e7eb;
  border-radius: 14px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.card:hover {
  border-color: #c3cad1;
}

.card__name {
  margin: 0 0 6px;
  font-size: 19px;
  font-weight: 700;
}

.card__temp {
  margin: 0 0 12px;
  font-size: 16px;
  color: #6b7280;
}

.tag {
  display: inline-block;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
}

.tag--hot {
  background: #fde2e1;
  color: #d9483f;
}

.tag--cool {
  background: #dceafd;
  color: #2f6fed;
}

.card__button {
  flex-shrink: 0;
  padding: 12px 18px;
  border: 1px solid #d2d6db;
  border-radius: 10px;
  background: #fff;
  font-size: 16px;
  font-family: inherit;
  font-weight: 600;
  color: #3e4c59;
  cursor: pointer;
  white-space: nowrap;
}

.card__button:hover {
  background: #f3f4f6;
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
  .card { flex-direction: column; align-items: flex-start; }
  .card__button { width: 100%; }
}
</style>