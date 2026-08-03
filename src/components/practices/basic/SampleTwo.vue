<script setup>
import { ref, computed, watch} from 'vue'
const count = ref(0)
const dummy = ref(0) // computed와 무관한 변수

// 1. 일반 함수: 화면이 조금이라도 리렌더링되면 무조건 재실행
const getMethodResult = () => {
    console.log('❌ 일반 함수 실행됨!')
    return count.value * 2
}
// 2. Computed: count가 바뀔 때만 재연산 (dummy가 바뀔 땐 이전 값 재사용)
const doubleCount = computed(() => {
    console.log('✅ Computed 연산 실행됨!')
    return count.value * 2
})
const currentCity = ref('서울')
const logMessage = ref('아직 감시 시스템이 작동하지 않았습니다.')
// currentCity 변수를 유심히 감시하는 watch 시스템 가동
watch(currentCity, (newValue, oldValue) => {
// 값이 바뀌는 순간, 바뀐 알맹이(값) 두 개가 자동으로 주입됩니다.
logMessage.value =
`📍 감시자 발동! [${oldValue}]에서 [${newValue}]로 변경됨.`
// 실무 활용처 시뮬레이션
console.log(`🤖 [서버 요청 완료] 기상청 서버에서 ${newValue}의 날씨 API를 다시 조회합니다...`)
})

</script>
    <template>
    <div class="practice-section">
        <h2>computed() 캐싱 동작 비교</h2>
        <p>count: {{ count }} | dummy: {{ dummy }}</p>
        <button @click="count++">count 증가 (의존성 변경)</button>
        <button @click="dummy++">dummy 증가 (무관한 변경)</button>
        <!-- dummy 버튼을 누를 때 콘솔 출력 차이를 확인-->
        <p>일반 함수 결과: {{ getMethodResult() }}</p>
        <p>Computed 결과: {{ doubleCount }}</p>
    </div>
    <div class="practice-section">
        <h2>감시자 watch()의 원리와 실무 활용</h2>
        <h3>🏙️ 지역 선택 제어판</h3>
        <p>현재 선택된 도시: {{ currentCity }}</p>
        <button @click="currentCity =
        '서울'">서울 선택</button> &nbsp;
        <button @click="currentCity =
        '수원'">수원 선택</button> &nbsp;
        <button @click="currentCity =
        '부산'">부산 선택</button>
        <div class="monitor">
        <h3>👁️‍🗨️ 파수꾼(watch) 모니터링 시스템</h3>
        <p>{{ logMessage }}</p>
        <small style="color: gray">(버튼을 누른 후 브라우저 콘솔창 F12를 확인해 보세요)</small>
        </div>
    </div>
</template>