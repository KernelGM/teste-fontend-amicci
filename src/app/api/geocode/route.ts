import { NextResponse } from "next/server"

interface GoogleGeocodingResponse {
  status: string
  error_message?: string
  results: Array<{
    address_components: Array<{
      long_name: string
      short_name: string
      types: string[]
    }>
  }>
}

interface GeocodeApiResponse {
  city: string
}

interface ErrorResponse {
  message: string
}

export async function GET(request: Request): Promise<NextResponse<GeocodeApiResponse | ErrorResponse>> {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!lat || !lon) {
    return NextResponse.json({ message: "Os parâmetros de latitude e longitude são necessários!" }, { status: 400 })
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ message: "A chave da API do Google Maps não está configurada!" }, { status: 500 })
  }

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`)

    const data: GoogleGeocodingResponse = await response.json()

    if (data.status !== "OK") {
      return NextResponse.json({ message: data.error_message || "Falha ao geocodificar a localização!" }, { status: 400 })
    }

    let city = ""

    const findComponentByType = (type: string): string => {
      for (const result of data.results) {
        for (const component of result.address_components) {
          if (component.types.includes(type)) {
            return component.long_name
          }
        }
      }
      return ""
    }

    city = findComponentByType("locality")

    if (!city) {
      city = findComponentByType("administrative_area_level_1")
    }

    if (!city) {
      return NextResponse.json({ message: "Não foi possível determinar a cidade a partir das coordenadas" }, { status: 404 })
    }

    return NextResponse.json({ city })
  } catch {
    return NextResponse.json({ message: "Falha ao geocodificar a localização" }, { status: 500 })
  }
}
