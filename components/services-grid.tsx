import { Card, CardContent } from "@/components/ui/card"
import { Database, Globe, HardDrive, Settings } from "lucide-react"

export function ServicesGrid() {
  const services = [
    { icon: Database, name: "Дискийн тоо", color: "bg-blue-500" },
    { icon: Globe, name: "Тогтмол хаяг", color: "bg-green-500" },
    { icon: HardDrive, name: "Нөөцлөлт", color: "bg-purple-500" },
    { icon: Settings, name: "Чиглүүлэгч", color: "bg-orange-500" },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <service.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-medium text-sm">{service.name}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
