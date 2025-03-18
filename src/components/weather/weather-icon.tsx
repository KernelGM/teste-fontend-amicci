interface WeatherIconProps {
    icon: string
    condition: string
  }
  
  export function WeatherIcon({ icon, condition }: WeatherIconProps) {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={condition}
        className="w-20 h-20 invert dark:invert-0 transition-transform duration-500 hover:scale-110"
      />
    )
  }
  
  