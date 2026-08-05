<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <el-result icon="warning" title="페이지를 찾을 수 없습니다.">
    <template #icon>
      <div class="not-found__emoji">🌤️❓</div>
    </template>
    <template #sub-title>
      <p class="not-found__sub">
        요청하신 주소가 존재하지 않거나,<br />
        아직 개발되지 않았습니다.
      </p>
    </template>
    <template #extra>
      <el-button type="primary" @click="goHome"> 날씨 메인으로 이동 </el-button>
    </template>
  </el-result>
</template>

<style scoped>
.not-found__emoji {
  font-size: 56px;
  line-height: 1;
}

.not-found__sub {
  color: #6b7280;
  font-size: 15px;
  line-height: 1.6;
}
</style>
