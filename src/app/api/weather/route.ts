import { NextResponse } from "next/server"

interface OpenWeatherResponse {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    description: string
    icon: string
    main: string
    id: number
  }>
  wind: {
    speed: number
    deg: number
  }
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  visibility: number
  coord: {
    lat: number
    lon: number
  }
  dt: number
  timezone: number
  id: number
  cod: number
}

interface WeatherApiResponse {
  city: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
  feelsLike: number
  pressure: number
  windDirection: number
  sunrise: number
  sunset: number
  visibility: number
  country: string
}

interface ErrorResponse {
  message: string
}

export async function GET(request: Request): Promise<NextResponse<WeatherApiResponse | ErrorResponse>> {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ message: "A cidade é obrigatória!" }, { status: 400 })
  }

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ message: "A chave da API OpenWeather não está configurada!" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`,
    )

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json()
      return NextResponse.json(
        { message: errorData.message || "Falha ao buscar dados meteorológicos" },
        { status: response.status },
      )
    }

    const data: OpenWeatherResponse = await response.json()

    const weatherData: WeatherApiResponse = {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
      feelsLike: data.main.feels_like,
      pressure: data.main.pressure,
      windDirection: data.wind.deg,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      visibility: data.visibility,
      country: data.sys.country,
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    return NextResponse.json({ message: "Falha ao buscar dados meteorológicos!" }, { status: 500 })
  }
}

