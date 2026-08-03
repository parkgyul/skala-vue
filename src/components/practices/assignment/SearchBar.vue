<script setup>
defineProps({
  query: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update-query'])

function handleInput(event) {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search">
    <input
      type="text"
      class="search__input"
      placeholder="검색할 도시 이름 입력"
      :value="query"
      @input="handleInput"
    />
    <p class="search__echo">
      검색 중인 도시: <strong>{{ query }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search__input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #d2d6db;
  border-radius: 10px;
  font-size: 18px;
  font-family: inherit;
  box-sizing: border-box;
}

.search__input:focus {
  outline: 2px solid #2f6fed;
  outline-offset: 1px;
  border-color: transparent;
}

.search__echo {
  margin: 12px 0 0;
  font-size: 16px;
  color: #6b7280;
}
</style>