<script setup>
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-toggler__label">날씨단위: {{ configStore.unitLabel }}</span>
    <el-button size="small" type="primary" plain @click="configStore.toggleUnit()">
      단위변경
    </el-button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #3e4c59;
  white-space: nowrap;
}

.unit-toggler__label {
  font-weight: 600;
}
</style>