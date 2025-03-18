"use client"
import type { WeatherData } from "@/types/weather"
import { useCallback, useState } from "react"

export function useWeather() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getWeatherData = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return

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
  }, [])

  const getUserLocation = useCallback(() => {
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
  }, [getWeatherData])

  return {
    city,
    setCity,
    weatherData,
    loading,
    error,
    getWeatherData,
    getUserLocation,
  }
}

