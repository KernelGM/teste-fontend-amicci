import { SearchForm } from "@/components/weather/search-form"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock(
  "@/components/theme-toggle",
  () => ({
    ModeToggle: () => <button>Theme Toggle</button>,
  }),
  { virtual: true },
)

describe("SearchForm", () => {
  const mockProps = {
    city: "São Paulo",
    setCity: jest.fn(),
    onSearch: jest.fn(),
    onLocationRequest: jest.fn(),
    loading: false,
  }

  it("renders form elements correctly", () => {
    render(<SearchForm {...mockProps} />)

    expect(screen.getByText("WeatherFinder")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Escolha uma cidade")).toBeInTheDocument()
    expect(screen.getByLabelText("Usar minha localização")).toBeInTheDocument()
    expect(screen.getByLabelText("Buscar clima")).toBeInTheDocument()
  })

  it("calls onSearch when form is submitted", () => {
    render(<SearchForm {...mockProps} />)

    const form = screen.getByRole("form")
    fireEvent.submit(form)

    expect(mockProps.onSearch).toHaveBeenCalled()
  })

  it("calls onLocationRequest when location button is clicked", () => {
    render(<SearchForm {...mockProps} />)

    const locationButton = screen.getByLabelText("Usar minha localização")
    fireEvent.click(locationButton)

    expect(mockProps.onLocationRequest).toHaveBeenCalled()
  })

  it("updates city value when input changes", () => {
    render(<SearchForm {...mockProps} />)

    const input = screen.getByPlaceholderText("Escolha uma cidade")
    fireEvent.change(input, { target: { value: "Rio de Janeiro" } })

    expect(mockProps.setCity).toHaveBeenCalledWith("Rio de Janeiro")
  })
})

