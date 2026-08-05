import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather'
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'

function toOpenWeatherUnits(unit) {
  return unit === 'fahrenheit' ? 'imperial' : 'metric'
}

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

  const response = await axios.get(CURRENT_URL, {
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

function summarizeToDaily(list) {
  const byDate = new Map()

  for (const entry of list) {
    const [date, time] = entry.dt_txt.split(' ')
    const isNoon = time === '12:00:00'
    if (!byDate.has(date) || isNoon) {
      byDate.set(date, entry)
    }
  }

  return Array.from(byDate.entries())
    .slice(0, 5)
    .map(([date, entry]) => ({
      date,
      temperature: Math.round(entry.main.temp),
      condition: entry.weather?.[0]?.description ?? '',
      icon: entry.weather?.[0]?.icon ?? ''
    }))
}

/**
 * 도시 이름으로 5일치 일별 예보를 조회한다.
 * @param {string} cityName - 검색할 도시 이름
 * @param {string} unit - configStore.unit 값 ('celsius' | 'fahrenheit')
 * @returns {Promise<Array>} 날짜별 요약 예보 배열 (최대 5개)
 */
export async function fetchForecast(cityName, unit) {
  if (!API_KEY || API_KEY.includes('여기에')) {
    throw new Error('API 키가 설정되지 않았습니다. .env 파일에 VITE_OPENWEATHER_API_KEY를 입력하세요.')
  }

  const response = await axios.get(FORECAST_URL, {
    params: {
      q: cityName,
      appid: API_KEY,
      units: toOpenWeatherUnits(unit),
      lang: 'kr'
    }
  })

  return summarizeToDaily(response.data.list)
}