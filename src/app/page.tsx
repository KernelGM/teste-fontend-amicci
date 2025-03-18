
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <section className="grid place-items-center h-screen">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>WeatherFinder</CardTitle>
          <CardDescription>Um app que exibe a previsão do tempo em tempo real com base na sua localização ou em um local escolhido.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Buscar clima</Label>
                <Input id="name" placeholder="Escolha uma cidade" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Usar localização</Button>
          <Button>Buscar</Button>
        </CardFooter>
      </Card>
    </section>
  )
}
