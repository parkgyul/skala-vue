<script setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="base-card">
    <h2 class="base-card__title">
      <span v-if="icon" class="base-card__icon">{{ icon }}</span>
      {{ title }}
    </h2>
    <div class="base-card__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.base-card {
  background: #fff;
  border-radius: 16px;
  padding: 26px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06);
}

.base-card__title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  font-size: 19px;
  font-weight: 700;
  color: #1f2933;
}

.base-card__icon {
  font-size: 20px;
}

.base-card__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
