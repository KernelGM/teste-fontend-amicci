"use client"
import { useWeather } from "@/hooks/use-weather"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"
import { SearchForm } from "./search-form"
import { WeatherCard } from "./weather-card"

export function WeatherApp() {
  const { city, setCity, weatherData, loading, error, getWeatherData, getUserLocation } = useWeather()

  useEffect(() => {
    getUserLocation()
  }, [getUserLocation])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <section className="grid place-items-center h-screen">
      <SearchForm
        city={city}
        setCity={setCity}
        onSearch={() => getWeatherData(city)}
        onLocationRequest={getUserLocation}
        loading={loading}
      />

      {loading && (
        <div className="flex justify-center items-center my-8">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
      )}

      {weatherData && !loading && <WeatherCard weatherData={weatherData} />}
    </section>
  )
}

