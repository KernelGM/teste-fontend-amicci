import { Card } from "@/components/ui/card"
import type { WeatherData } from "@/types/weather"
import { WeatherDetails } from "./weather-details"
import { WeatherIcon } from "./weather-icon"

interface WeatherCardProps {
  weatherData: WeatherData
}

export function WeatherCard({ weatherData }: WeatherCardProps) {
  return (
    <Card className="w-2/3 drop-shadow-lg my-2 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold flex justify-center">{weatherData.city}</h2>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-4">
              <WeatherIcon icon={weatherData.icon} condition={weatherData.condition} />
              <div className="text-4xl font-bold ml-2">{Math.round(weatherData.temperature)}°C</div>
            </div>

            <div className="text-xl text-center mb-6 capitalize">{weatherData.condition}</div>

            <WeatherDetails humidity={weatherData.humidity} windSpeed={weatherData.windSpeed} />
          </div>
        </div>
      </div>
    </Card>
  )
}

