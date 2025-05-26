import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ServicesTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Төслийн гишүүд</CardTitle>
        <Button variant="outline" size="sm">
          Гишүүн урих
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium">Гишүүн</th>
                <th className="text-left py-2 text-sm font-medium">Цахим шуудан</th>
                <th className="text-left py-2 text-sm font-medium">Эрх</th>
                <th className="text-left py-2 text-sm font-medium">Утас</th>
                <th className="text-left py-2 text-sm font-medium">Төлөв байдал</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-sm">БАЯРМӨНХ</td>
                <td className="py-3 text-sm">itsoftware027@gmail.com</td>
                <td className="py-3">
                  <Badge variant="secondary">Эзэмшигч</Badge>
                </td>
                <td className="py-3 text-sm">97167703</td>
                <td className="py-3">
                  <Badge className="bg-green-500">Зөвшөөрсөн</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
