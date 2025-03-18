interface WeatherDetailsProps {
    humidity: number
    windSpeed: number
  }
  
  export function WeatherDetails({ humidity, windSpeed }: WeatherDetailsProps) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="flex items-center">
          <div className="text-blue-500 mr-2">💧</div>
          <div>
            <div className="font-bold">Umidade</div>
            <div>{humidity}%</div>
          </div>
        </div>
  
        <div className="flex items-center">
          <div className="text-blue-500 mr-2">💨</div>
          <div>
            <div className="font-bold">Vento</div>
            <div>{windSpeed} m/s</div>
          </div>
        </div>
      </div>
    )
  }
  
  