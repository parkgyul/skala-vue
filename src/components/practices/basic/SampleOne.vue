<script setup>

import {ref} from 'vue'
const inputValue = ref('')
const message = ref('')
const content = '안녕하세요! <strong>Vue3</strong> 입니다.'
function showMessage() {
  message.value = inputValue.value
}
const dynamicUrl = 'https://www.naver.com'
const logoImgSrc = 'https://vuejs.org/images/logo.png'
const isButtonDisabled = ref(true)

const isWarning = ref(false) 
const themeClass = ref('bg-dark')

const comment = ref('')
const isAgreed = ref(false) // 단일 체크박스는 Boolean
const favoriteFruits = ref([]) // 다중 체크박스는 반드시 배열([])로 시작!
const gender = ref('')
const selectedCar = ref('')

const text1 = ref('')
const text2 = ref('')
</script>

<template>
  <div style = "padding: 20px">
    <SampleOne />
  </div>
  <div>
    <input v-model="inputValue" placeholder="메세지를 입력하세요" />
    <button @click="showMessage">메세지 출력</button>
    <div v-html = "message"></div>
  </div>
  <div style = "padding: 20px">
    <h1>v-html 예제</h1>
    <div v-html = "content"></div>
    <h1>2. v-text 디렉티브 학습</h1>
    <hr/>
    <h3>1. 일간 보간법 {{  }}결과 : </h3>
    <p>출력: {{ content }}</p>
    <h3>2. v-text 디렉티브 결과 : </h3>
    <p v-text = "'출력 : ' + content"></p>
    <h3>3. v-html 결과 비교:</h3>
    <p v-html = "content"></p>
    </div>

    <div style="padding: 20px">
    <h1>3. v-bind 디렉티브 학습 (축약형: 콜론)</h1>
    <hr />
    <h3>1) 동적 링크 연결</h3>
    <a :href="dynamicUrl">여기를 클릭하면 네이버로 이동합니다</a>
    <br />
    <h3>2) 동적 이미지 연결</h3>
    <img :src="logoImgSrc" alt="Vue 로고" style="width: 100px" />
    <br />
    <h3>3) 버튼 비활성화 제어</h3>
    <p>현재 버튼 사용 불가능 상태: {{ isButtonDisabled }}</p>
    <button :disabled="isButtonDisabled">동의해야 클릭할 수 있는 버튼</button>
    <br />
    <button @click="isButtonDisabled = !isButtonDisabled">위 버튼 잠금 해제/토글하기</button>
    </div>

    <div style="padding: 20px">
    <h2>3-1. v-bind 고급 (클래스 바인딩)</h2>
    <hr />
    <h3>클래스 바인딩 (객체 형식)</h3>
    <p :class="{ 'text-danger': isWarning }">현재 경고 상태: {{ isWarning }}</p>
    <button @click="isWarning = !isWarning">경고 상태 토글</button>
    <br /><br />
    <h3>클래스 바인딩 (배열 형식)</h3>
    <div :class="[themeClass, isWarning ? 'border-red' : 'border-gray']">
    다중 클래스가 조립된 박스 구역입니다.
    </div>
    </div>
    <div style="padding: 20px">
    <h2>2. 모든 HTML Form 요소와 v-model 매핑</h2>
    <hr />
    <div>
    <h3>1) Textarea (장문 텍스트)</h3>
    <textarea v-model="comment" placeholder=
    "의견을 남겨주세요"></textarea>
    <p>
    데이터 상태: <span>{{ comment }}</span>
    </p>
    </div>
    <div>
    <h3>2) 단일 Checkbox (동의 여부)</h3>
    <label> <input type="checkbox" v-model="isAgreed" /> 약관에 동의합니다. </label>
    <p>
    데이터 상태: <span>{{ isAgreed }}</span>
    </p>
    </div>

    <div>
    <h3>3) 다중 Checkbox (복수 선택-> 배열에 저장)</h3>
    <label><input type="checkbox" value=
    "사과" v-model="favoriteFruits" /> 사과</label> &nbsp;
    <label><input type="checkbox" value=
    "바나나" v-model="favoriteFruits" /> 바나나</label> &nbsp;
    <label><input type="checkbox" value=
    "딸기" v-model="favoriteFruits" /> 딸기</label>
    <p> 데이터 상태 (배열): <span>{{ favoriteFruits }}</span> </p>
    </div>
    <div>
    <h3>4) Radio (단일 선택)</h3>
    <label><input type="radio" value=
    "남성" v-model="gender" /> 남성</label> &nbsp;
    <label><input type="radio" value=
    "여성" v-model="gender" /> 여성</label>
    <p> 데이터 상태: <span>{{ gender }}</span> </p>
    </div>
    <div>
    <h3>5) Select (드롭다운 선택)</h3>
    <select v-model="selectedCar">
    <option value=
    "">-- 선택하세요--</option>
    <option value="tesla">테슬라</option>
    <option value=
    "hyundai">현대자동차</option>
    <option value=
    "bmw">BMW</option>
    </select>
    <p>
    데이터 상태: <span>{{ selectedCar }}</span>
    </p>
    </div>
    <div class="style-container">
      <h2>
        16. Scoped 스타일 및 외부 CSS 활용
      </h2>
      <hr/>
      <p class="title">이 글자는 이 컴포넌트 내부에서만 빨간색이 됩니다. </p>
      <button class = "btn-external">외부 CSS 버튼</button>
    </div>

    
    </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
.text-danger {color: red; font-weight: bold;}
.bg-dark {background-color: #333; color: white; padding: 15px;}
.border-red {border: 3px solid red;}
.border-gray {border: 3px solid #ccc;}
@import '@/assets/base.css';
/* 내 방 전용 타이틀 디자인 */
.title {
color: #ff7675;
font-weight: bold;
font-size: 18px;
}
</style>
