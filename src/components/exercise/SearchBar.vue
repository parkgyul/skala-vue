<script setup>
defineProps({
  query: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update-query'])

function handleInput(value) {
  emit('update-query', value)
}
</script>

<template>
  <div class="search">
    <el-input
      :model-value="query"
      placeholder="검색할 도시 이름 입력"
      size="large"
      clearable
      @input="handleInput"
    >
      <template #prefix> 🔍 </template>
    </el-input>
    <p class="search__echo">
      검색 중인 도시: <strong>{{ query }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search__echo {
  margin: 12px 0 0;
  font-size: 16px;
  color: #6b7280;
}
</style>
