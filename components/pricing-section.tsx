import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PricingSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Одоогийн төлбөр (энэ сар)</CardTitle>
        <Button variant="outline" size="sm">
          Дэлгэрэнгүй
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Хэрэглэгчийн түвшин:</span>
            <Badge>Basic</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Энэ сарын нийт:</span>
            <span className="text-lg font-bold">55,268.07 ₮</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>• CPU core</span>
              <span>0 ₮</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>• RAM</span>
              <span>0 ₮</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>• Arm CPU</span>
              <span>0 ₮</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>• Arm RAM</span>
              <span>0 ₮</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>• Simplehost CPU</span>
              <span>55,268.07 ₮</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-gray-600">Хэрэглэгчийн</div>
                <div className="text-xs text-gray-600">дүн төлөгч</div>
                <div className="text-sm font-bold">55,268.07 ₮</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
