<script setup>
defineProps({
  city: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <article class="weather-card" @click="emit('select-card', city)">
    <div class="weather-card__info">
      <p class="weather-card__name">{{ city.city }} ({{ city.condition }})</p>
      <p class="weather-card__temp">현재 기온: {{ city.temperature }}°C</p>

      <span v-if="city.temperature >= 25" class="tag tag--hot">🔥 더움 (25도 이상)</span>
      <span v-else class="tag tag--cool">❄️ 선선함 (25도 미만)</span>
    </div>

    <button type="button" class="weather-card__button" @click.stop="emit('click-detail', city)">
      상세보기
    </button>
  </article>
</template>

<style scoped>
.weather-card {
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

.weather-card:hover {
  border-color: #c3cad1;
}

.weather-card__name {
  margin: 0 0 6px;
  font-size: 19px;
  font-weight: 700;
  color: #1f2933;
}

.weather-card__temp {
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

.weather-card__button {
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

.weather-card__button:hover {
  background: #f3f4f6;
}
</style>