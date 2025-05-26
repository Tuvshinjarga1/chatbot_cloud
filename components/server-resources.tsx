import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ServerResources() {
  const resources = [
    { name: "Серверүүд", used: 0, total: 10, percentage: 0 },
    { name: "core CPU", used: 0, total: 20, percentage: 0, unit: "vCPU" },
    { name: "Шуурхай санах ой (RAM)", used: 0, total: 50, percentage: 0, unit: "GB" },
    { name: "Дискийн хэмжээ", used: 0, total: 1000, percentage: 0, unit: "GB" },
  ]

  const services = [
    { name: "Дискийн тоо", used: 0, total: 10, percentage: 0 },
    { name: "Тогтмол хаяг", used: 1, total: 10, percentage: 10 },
    { name: "Нөөцлөлт", used: 0, total: 10, percentage: 0 },
    { name: "Чиглүүлэгч", used: 1, total: 10, percentage: 10 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Серверүүд болон нөөц</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{resource.name}</span>
                  <span className="text-sm text-gray-500">
                    {resource.used} / {resource.total} {resource.unit || ""}
                  </span>
                </div>
                <Progress value={resource.percentage} className="h-2" />
                <div className="text-right">
                  <span className="text-lg font-bold">{resource.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Нэмэлт үйлчилгээ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{service.name}</span>
                  <span className="text-sm text-gray-500">
                    {service.used} / {service.total}
                  </span>
                </div>
                <Progress value={service.percentage} className="h-2" />
                <div className="text-right">
                  <span className="text-lg font-bold">{service.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
