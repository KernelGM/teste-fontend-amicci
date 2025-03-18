"use client"
import { WeatherApp } from "@/components/weather/weather-app"
import { Toaster } from "sonner"

export default function Home() {
  return (
    <>
      <Toaster />
      <WeatherApp />
    </>
  )
}
