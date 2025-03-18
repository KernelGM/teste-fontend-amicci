import Image from 'next/image'

interface WeatherIconProps {
  icon: string
  condition: string
}

export function WeatherIcon({ icon, condition }: WeatherIconProps) {
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={condition}
      width={80}
      height={80}
      unoptimized
      className="invert dark:invert-0 transition-transform duration-500 hover:scale-110"
    />
  )
}
