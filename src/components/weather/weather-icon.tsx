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
      width={80}  // largura da imagem (ajustável)
      height={80} // altura da imagem (ajustável)
      className="invert dark:invert-0 transition-transform duration-500 hover:scale-110"
    />
  )
}
