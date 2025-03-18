"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search } from "lucide-react"
import { useEffect, useState } from "react"

interface WeatherData {
  city: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
}

export default function Home() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getWeatherData = async (cityName: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data")
      }

      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      getWeatherData(city)
    }
  }

  const getUserLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`)
          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message || "Failed to get location data")
          }

          if (data.city) {
            setCity(data.city)
            getWeatherData(data.city)
          } else {
            throw new Error("Could not determine your city")
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "An unknown error occurred")
          setLoading(false)
        }
      },
      (error) => {
        setError(`Error getting location: ${error.message}`)
        setLoading(false)
      },
    )
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <section className="grid place-items-center h-screen">
      <Card className="w-2/3 drop-shadow-lg">
        <CardHeader>
          <CardTitle>WeatherFinder</CardTitle>
          <CardDescription>Um app que exibe a previsão do tempo em tempo real com base na sua localização ou em um local escolhido.</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSearch}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Buscar clima</Label>
              <Input 
                id="name" 
                placeholder="Escolha uma cidade" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
              />
            </div>
          </div>
        </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={loading} variant="outline" onClick={getUserLocation}><MapPin /> Usar localização</Button>
          <Button disabled={loading} type="button" onClick={handleSearch}><Search /> Buscar</Button>
        </CardFooter>
      </Card>
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--primary))]"></div>
        </div>
      )}

      {error && <div className="my-4 p-4 border border-red-300 rounded-md bg-red-50 text-red-800 capitalize">{error}</div>}

      {weatherData && !loading && (
      <Card className="w-2/3 drop-shadow-lg">
        <div className="rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold flex justify-center">{weatherData.city}</h2>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.condition}
                className="w-20 h-20"
              />
              <div className="text-4xl font-bold ml-2">
                {Math.round(weatherData.temperature)}°C
              </div>
            </div>

            <div className="text-xl text-center mb-6 capitalize">{weatherData.condition}</div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center">
                <div className="text-blue-500 mr-2">💧</div>
                <div>
                  <div className="font-bold">Umidade</div>
                  <div>{weatherData.humidity}%</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="text-blue-500 mr-2">💨</div>
                <div>
                  <div className="font-bold">Velocidade do vento</div>
                  <div>{weatherData.windSpeed} m/s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Card>
      )}
    </section>
  )
}
