import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">Хэрэглэгчийн мэдээзэл</h1>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Төсөл үүдрэх" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх төсөл</SelectItem>
              <SelectItem value="active">Идэвхтэй</SelectItem>
              <SelectItem value="inactive">Идэвхгүй</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Нийт хэрэглээ
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline">Үйлчилгээний нэхцөл</Button>
          <Button variant="outline">Гарын авлага</Button>
          <Button variant="outline">Төлбөр</Button>
          <Button>Хөлбөө өөрөх</Button>
          <Button>Туршин ажуулах</Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded"></div>
            <Badge variant="secondary">Basic</Badge>
          </div>
        </div>
      </div>
    </header>
  )
}
