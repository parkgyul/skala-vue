<script setup>
import { computed } from 'vue'

const props = defineProps({
  city: {
    type: Object,
    required: true
  },
  unit: {
    type: String,
    default: 'celsius'
  },
  unitSymbol: {
    type: String,
    default: '°C'
  }
})

const emit = defineEmits(['select-card', 'click-detail'])

const displayTemp = computed(() => {
  const rawTemp = props.city.temperature
  if (props.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const isHot = computed(() => props.city.temperature >= 25)
</script>

<template>
  <article class="weather-card" @click="emit('select-card', city)">
    <div class="weather-card__info">
      <p class="weather-card__name">{{ city.city }} ({{ city.condition }})</p>
      <p class="weather-card__temp">현재 기온: {{ displayTemp }}{{ unitSymbol }}</p>

      <el-tag v-if="isHot" type="danger" round effect="light">🔥 더움</el-tag>
      <el-tag v-else type="primary" round effect="light">❄️ 선선함</el-tag>
    </div>

    <el-button class="weather-card__button" @click.stop="emit('click-detail', city)">
      상세보기
    </el-button>
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

.weather-card__button {
  flex-shrink: 0;
}
</style>