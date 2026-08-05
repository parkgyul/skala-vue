// WeatherHomeView와 WeatherDetailView가 함께 참조하는 Mock 데이터.
// 실제 API 연동 전까지 임시로 사용한다 (요구사항 4: Mock Data 임시 활용).
export const weatherList = [
  {
    id: 'city_01',
    city: '서울',
    region: '대한민국 서울특별시',
    apiQuery: 'Seoul,KR', // OpenWeatherMap 조회용 영문 도시명 (한글명은 인식률이 낮음)
    temperature: 28, // 섭씨 기준 원본값
    condition: '맑음',
    humidity: 55,
    windSpeed: 2.5
  },
  {
    id: 'city_02',
    city: '수원',
    region: '대한민국 경기도 수원시',
    apiQuery: 'Suwon,KR',
    temperature: 24,
    condition: '비',
    humidity: 78,
    windSpeed: 3.1
  },
  {
    id: 'city_03',
    city: '부산',
    region: '대한민국 부산광역시',
    apiQuery: 'Busan,KR',
    temperature: 26,
    condition: '구름',
    humidity: 63,
    windSpeed: 4.0
  }
]

export function findCityById(cityId) {
  return weatherList.find(item => item.id === cityId) ?? null
}