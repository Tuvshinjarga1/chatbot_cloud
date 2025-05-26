import { Cloud, Server, Database, Settings, Users, BarChart3, Shield, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: Server, label: "Виртуал сервер", active: false },
  { icon: Database, label: "Хаваалтын самбар", active: true },
  { icon: Shield, label: "Managed Kubernetes", active: false },
  { icon: Settings, label: "Объект агуулах", active: false },
  { icon: Cpu, label: "Simplehost", active: false },
  { icon: BarChart3, label: "App платформ", active: false },
  { icon: Users, label: "Дэлгүүр", active: false },
  { icon: Settings, label: "Миний хэсэг", active: false },
]

export function Sidebar() {
  return (
    <div className="w-64 bg-blue-600 text-white flex flex-col">
      <div className="p-4 border-b border-blue-500">
        <div className="flex items-center space-x-2">
          <Cloud className="h-8 w-8" />
          <span className="text-xl font-bold">CLOUD MN</span>
        </div>
      </div>

      <div className="p-4 border-b border-blue-500">
        <div className="bg-blue-700 rounded-lg p-3">
          <div className="text-sm opacity-90">Төслийн эрх</div>
          <div className="text-xs bg-blue-800 rounded px-2 py-1 mt-1 inline-block">Эзэмшигч</div>
        </div>
        <div className="mt-2 text-sm">itsoftware027@gmail.com</div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  item.active
                    ? "bg-blue-700 text-white hover:bg-blue-700"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
