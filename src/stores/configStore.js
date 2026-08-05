import { defineStore } from 'pinia'

// 날씨 단위(섭씨/화씨) 설정을 전역으로 관리하는 스토어.
// 메인 대시보드와 상세 페이지가 동일한 단위 상태를 공유해야 하므로 Pinia로 분리했다.
export const useConfigStore = defineStore('config', {
  state: () => ({
    unit: 'celsius' // 초기값: celsius
  }),

  getters: {
    // 현재 단위 상태에 맞는 기호(°C / °F)를 반환
    unitSymbol: (state) => (state.unit === 'celsius' ? '°C' : '°F'),
    unitLabel: (state) => (state.unit === 'celsius' ? '섭씨(°C)' : '화씨(°F)')
  },

  actions: {
    // 'celsius'와 'fahrenheit'를 토글(스위칭)한다
    toggleUnit() {
      this.unit = this.unit === 'celsius' ? 'fahrenheit' : 'celsius'
    }
  }
})
