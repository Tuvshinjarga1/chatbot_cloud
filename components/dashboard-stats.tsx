import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DashboardStats() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">БАЯРМӨНХ</h2>
            <p className="text-sm text-gray-600">Дугаар: 8590</p>
            <p className="text-sm text-gray-600">Бүртгүүлсэн: 2023-07-03</p>
          </div>
          <Button variant="outline" size="sm">
            Дэлгэрэнгүй
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">0%</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">0%</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">0%</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">0%</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded"></div>
            </div>
            <p className="text-sm font-medium">Гэрээ хийгдсэн</p>
            <Badge variant="secondary" className="mt-1">
              Түүх
            </Badge>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded"></div>
            </div>
            <p className="text-sm font-medium">Төлбөрийн нэхцөл</p>
            <Badge variant="secondary" className="mt-1">
              Дараа төлбөрт
            </Badge>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded"></div>
            </div>
            <p className="text-sm font-medium">Хэрэглэгчийн түвшин</p>
            <Badge className="mt-1">Basic</Badge>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Утас:</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">97167703</span>
              <Badge variant="outline" className="text-green-600">
                Батлагдсан
              </Badge>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Байгууллага:</span>
            <span className="text-sm text-gray-500">/0/</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Нууц үг:</span>
            <span className="text-sm">••••••••••••••</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Google Authenticator (2FA):</span>
            <Button variant="outline" size="sm">
              Идэвхгүй
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
