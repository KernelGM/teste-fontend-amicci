"use client"
import { ModeToggle } from "@/components/theme-toggle"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Search } from "lucide-react"

interface SearchFormProps {
  city: string
  setCity: (city: string) => void
  onSearch: () => void
  onLocationRequest: () => void
  loading: boolean
}

export function SearchForm({ city, setCity, onSearch, onLocationRequest, loading }: SearchFormProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch()
    }
  }

  return (
    <Card className="w-2/3 drop-shadow-lg my-2 animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="flex flex-col justify-between items-center">
        <ModeToggle />
        <CardTitle className="my-2">WeatherFinder</CardTitle>
        <CardDescription>
          Um app que exibe a previsão do tempo em tempo real com base na sua localização ou em um local escolhido.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} role="form">
          <div className="grid w-full items-center gap-4 justify-center">
            <div className="flex space-y-1.5">
              <Input
                id="name"
                placeholder="Escolha uma cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="focus:ring-2 focus:ring-primary transition-all duration-300"
                aria-label="Nome da cidade"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center space-x-8">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onLocationRequest}
          className="transition-transform duration-300 hover:scale-105"
          aria-label="Usar minha localização"
        >
          <MapPin className="mr-2" />
          <span className="hidden md:inline">Minha cidade</span>
        </Button>
        <Button
          disabled={loading}
          type="button"
          onClick={handleSearch}
          className="transition-transform duration-300 hover:scale-105"
          aria-label="Buscar clima"
        >
          <Search className="mr-2" />
          <span className="hidden md:inline">Buscar</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

