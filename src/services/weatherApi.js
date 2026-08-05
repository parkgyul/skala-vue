import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

function toOpenWeatherUnits(unit) {
  return unit === 'fahrenheit' ? 'imperial' : 'metric'
}

console.log('API_KEY:', API_KEY)

/**
 * 도시 이름으로 실시간 날씨를 조회한다.
 * @param {string} cityName - 검색할 도시 이름 (영문 권장, 예: Seoul, Tokyo)
 * @param {string} unit - configStore.unit 값 ('celsius' | 'fahrenheit')
 * @returns {Promise<object>} 화면에서 바로 쓰기 좋은 형태로 가공된 날씨 정보
 */
export async function fetchLiveWeather(cityName, unit) {
  if (!API_KEY || API_KEY.includes('여기에')) {
    throw new Error('API 키가 설정되지 않았습니다. .env 파일에 VITE_OPENWEATHER_API_KEY를 입력하세요.')
  }

  const response = await axios.get(BASE_URL, {
    params: {
      q: cityName,
      appid: API_KEY,
      units: toOpenWeatherUnits(unit),
      lang: 'kr'
    }
  })

  const data = response.data

  return {
    city: data.name,
    country: data.sys?.country ?? '',
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather?.[0]?.description ?? '',
    humidity: data.main.humidity,
    windSpeed: data.wind.speed
  }
}