import { WeatherCard } from "@/components/weather/weather-card"
import { render, screen } from "@testing-library/react"

describe("WeatherCard", () => {
  const mockWeatherData = {
    city: "São Paulo",
    temperature: 25,
    condition: "clear sky",
    humidity: 70,
    windSpeed: 5,
    icon: "01d",
  }

  it("renders weather information correctly", () => {
    render(<WeatherCard weatherData={mockWeatherData} />)

    expect(screen.getByText("São Paulo")).toBeInTheDocument()
    expect(screen.getByText("25°C")).toBeInTheDocument()
    expect(screen.getByText("clear sky")).toBeInTheDocument()
    expect(screen.getByText("70%")).toBeInTheDocument()
    expect(screen.getByText("5 m/s")).toBeInTheDocument()
    expect(screen.getByAltText("clear sky")).toBeInTheDocument()
  })
})

