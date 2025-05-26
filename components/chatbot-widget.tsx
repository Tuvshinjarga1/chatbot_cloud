"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Phone,
  Users,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  role: "user" | "assistant" | "agent";
  content: string;
  timestamp: Date;
  type?: "info" | "warning" | "success" | "transfer";
}

interface ChatbotWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  chatwootConfig?: {
    websiteToken: string;
    baseUrl: string;
  };
  teamsConfig?: {
    webhookUrl: string;
    channelId: string;
  };
}

// Cloud-ийн ерөнхий мэдээллийн сан
const KNOWLEDGE_BASE = {
  keywords: {
    сервер: "Серверийн үйлчилгээний талаар",
    төлбөр: "Төлбөрийн мэдээллийн талаар",
    kubernetes: "Kubernetes кластерийн талаар",
    docker: "Docker контейнерийн талаар",
    backup: "Нөөцлөлтийн талаар",
    ssl: "SSL сертификатын талаар",
    domain: "Домайн нэрийн талаар",
    database: "Өгөгдлийн сангийн талаар",
    monitoring: "Мониторингийн талаар",
    security: "Аюулгүй байдлын талаар",
  },
  responses: {
    сервер: [
      "Таны серверийн статус: Бүх үйлчилгээ хэвийн ажиллаж байна.",
      "Серверийн нөөц: CPU 15%, RAM 45%, диск 25% ашиглагдаж байна.",
      "Серверийн тохиргоо өөрчлөх бол Settings > Server Management хэсэгт орно уу.",
    ],
    төлбөр: [
      "Таны дараагийн төлбөр 2024-01-15-нд төлөгдөх ёстой.",
      "Төлбөрийн түүх харахын тулд Billing хэсэгт орно уу.",
      "Автомат төлбөр тохируулахыг хүсвэл Payment Methods-д карт нэмнэ үү.",
    ],
    kubernetes: [
      "Kubernetes кластер үүсгэхийн тулд: Dashboard > Kubernetes > Create Cluster дарна уу.",
      "Кластерийн статус харахын тулд kubectl get nodes командыг ашиглана уу.",
      "Helm chart суулгахын тулд манай Marketplace-г ашиглана уу.",
    ],
    docker: [
      "Docker image push хийхийн тулд: docker push registry.cloudmn.com/your-image",
      "Container registry-д нэвтрэхийн тулд API key шаардлагатай.",
      "Docker compose файл ашиглан олон контейнер удирдаж болно.",
    ],
    backup: [
      "Автомат нөөцлөлт тохируулахын тулд Backup Settings хэсэгт орно уу.",
      "Нөөцлөлтийг сэргээхийн тулд Restore хэсгээс сонгоно уу.",
      "Өдөр тутмын нөөцлөлт 30 хоног хадгалагдана.",
    ],
  },
};

export function ChatbotWidget({
  isOpen,
  onToggle,
  chatwootConfig,
  teamsConfig,
}: ChatbotWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Сайн байна уу! Би таны Cloud MN туслах бот байна. Танд хэрхэн тусалж чадах вэ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<"auto" | "human" | "chatwoot">("auto");
  const [chatwootSession, setChatwootSession] = useState<string | null>(null);

  // Chatwoot интеграци
  useEffect(() => {
    if (chatwootConfig && mode === "chatwoot") {
      // Chatwoot hosted service-ийн SDK ачаалах (хэрэглэгчийн inbox кодын дагуу)
      const BASE_URL = chatwootConfig.baseUrl || "https://app.chatwoot.com";
      const script = document.createElement("script");
      script.src = `${BASE_URL}/packs/js/sdk.js`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        // @ts-ignore
        window.chatwootSDK.run({
          websiteToken: chatwootConfig.websiteToken,
          baseUrl: BASE_URL,
          locale: "mn", // Монгол хэл
          type: "standard",
          launcherTitle: "Манай багтай ярилцах",
          showPopoutButton: true,
        });
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup хийх
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        // @ts-ignore
        if (window.chatwootSDK) {
          // @ts-ignore
          window.chatwootSDK.reset();
        }
      };
    }
  }, [chatwootConfig, mode]);

  // Автомат мессеж сонсох
  useEffect(() => {
    const handleAutoMessage = (event: CustomEvent) => {
      const { message } = event.detail;
      if (message) {
        setInput(message);
        // Автоматаар илгээх
        setTimeout(() => {
          handleSend();
        }, 100);
      }
    };

    // @ts-ignore
    window.addEventListener("chatbot-auto-message", handleAutoMessage);

    return () => {
      // @ts-ignore
      window.removeEventListener("chatbot-auto-message", handleAutoMessage);
    };
  }, []);

  // Асуултын төрлийг тодорхойлох
  const analyzeQuery = (query: string): "auto" | "human" => {
    const lowerQuery = query.toLowerCase();

    // Хүний туслагч шаардах тохиолдлууд
    const humanKeywords = [
      "асуудал",
      "алдаа",
      "ажиллахгүй",
      "тусламж",
      "яаралтай",
      "холбогдох",
      "ярилцах",
      "дэмжлэг",
      "шийдэх",
      "засах",
    ];

    // Автомат хариулж болох тохиолдлууд
    const autoKeywords = Object.keys(KNOWLEDGE_BASE.keywords);

    const hasHumanKeywords = humanKeywords.some((keyword) =>
      lowerQuery.includes(keyword)
    );
    const hasAutoKeywords = autoKeywords.some((keyword) =>
      lowerQuery.includes(keyword)
    );

    if (hasHumanKeywords && !hasAutoKeywords) {
      return "human";
    }

    return "auto";
  };

  // Автомат хариулт үүсгэх
  const generateAutoResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    for (const [keyword, responses] of Object.entries(
      KNOWLEDGE_BASE.responses
    )) {
      if (lowerQuery.includes(keyword)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Ерөнхий хариулт
    const generalResponses = [
      "Танд илүү дэлгэрэнгүй тусламж хэрэгтэй бол хүний ажилтантай холбогдоно уу.",
      "Энэ асуултын талаар илүү мэдээлэл авахын тулд манай баг руу шилжүүлэх үү?",
      "Cloud MN-ийн документацийг https://docs.cloudmn.com хаягаас үзэж болно.",
      "Техникийн дэмжлэгийн багтай холбогдохыг хүсвэл 'хүний туслагч' гэж бичнэ үү.",
    ];

    return generalResponses[
      Math.floor(Math.random() * generalResponses.length)
    ];
  };

  // Teams-ээр холбох
  const connectToTeams = async () => {
    if (!teamsConfig) return;

    try {
      const response = await fetch(teamsConfig.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "@type": "MessageCard",
          "@context": "http://schema.org/extensions",
          themeColor: "0076D7",
          summary: "Cloud MN - Шинэ дэмжлэгийн хүсэлт",
          sections: [
            {
              activityTitle: "Cloud MN Дэмжлэг",
              activitySubtitle: "Шинэ хэрэглэгч тусламж хүсч байна",
              activityImage: "https://cloudmn.com/logo.png",
              facts: [
                {
                  name: "Хэрэглэгч:",
                  value: "Dashboard User",
                },
                {
                  name: "Цаг:",
                  value: new Date().toLocaleString("mn-MN"),
                },
              ],
              markdown: true,
            },
          ],
          potentialAction: [
            {
              "@type": "OpenUri",
              name: "Chatwoot-д харах",
              targets: [
                {
                  os: "default",
                  uri: chatwootConfig?.baseUrl || "#",
                },
              ],
            },
          ],
        }),
      });

      if (response.ok) {
        const notificationMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "✅ Манай баг Teams-ээр мэдэгдэл авлаа. Тэд удахгүй танд хариулах болно.",
          timestamp: new Date(),
          type: "success",
        };
        setMessages((prev) => [...prev, notificationMessage]);
      }
    } catch (error) {
      console.error("Teams notification failed:", error);
    }
  };

  // Chatwoot руу шилжүүлэх
  const transferToChatwoot = () => {
    setMode("chatwoot");
    const transferMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "🔄 Таныг манай дэмжлэгийн багийн ажилтан руу шилжүүлж байна. Chatwoot цонх нээгдэх болно.",
      timestamp: new Date(),
      type: "transfer",
    };
    setMessages((prev) => [...prev, transferMessage]);

    // Chatwoot widget-г нээх (hosted service)
    setTimeout(() => {
      // @ts-ignore
      if (window.chatwootSDK) {
        // @ts-ignore
        window.chatwootSDK.toggle("open");

        // Одоогийн харилцааг Chatwoot руу дамжуулах
        const conversationHistory = messages
          .map(
            (msg) =>
              `${msg.role === "user" ? "Хэрэглэгч" : "Бот"}: ${msg.content}`
          )
          .join("\n");

        // @ts-ignore
        window.chatwootSDK.setCustomAttributes({
          previousConversation: conversationHistory,
          transferredFromBot: true,
          transferTime: new Date().toISOString(),
        });
      }
    }, 1000);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Асуултын төрлийг шинжлэх
    const queryType = analyzeQuery(currentInput);

    setTimeout(() => {
      let responseContent: string;
      let messageType: Message["type"] = "info";

      if (
        queryType === "human" ||
        currentInput.toLowerCase().includes("хүний туслагч")
      ) {
        responseContent =
          "Би танд хүний ажилтантай холбогдохыг санал болгож байна. Та дараах сонголтуудаас сонгоно уу:";
        messageType = "warning";
      } else {
        responseContent = generateAutoResponse(currentInput);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
        type: messageType,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Хүний туслагч шаардах тохиолдолд сонголт харуулах
      if (
        queryType === "human" ||
        currentInput.toLowerCase().includes("хүний туслагч")
      ) {
        setTimeout(() => {
          const optionsMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content:
              "🔹 Chatwoot-ээр дэлгэрэнгүй ярилцах\n🔹 Teams-ээр яаралтай холбогдох\n🔹 Автомат туслагчаар үргэлжлүүлэх",
            timestamp: new Date(),
            type: "info",
          };
          setMessages((prev) => [...prev, optionsMessage]);
        }, 500);
      }

      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 min-h-[500px] shadow-xl z-40 flex flex-col">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>Cloud MN Туслах</span>
              <Badge variant="secondary" className="ml-auto">
                {mode === "auto"
                  ? "Автомат"
                  : mode === "chatwoot"
                  ? "Chatwoot"
                  : "Хүний туслагч"}
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Action Buttons */}
            <div className="p-2 border-b bg-gray-50 flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={transferToChatwoot}
                className="flex-1 text-xs"
                disabled={!chatwootConfig}
              >
                <HelpCircle className="h-3 w-3 mr-1" />
                Chatwoot
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={connectToTeams}
                className="flex-1 text-xs"
                disabled={!teamsConfig}
              >
                <Phone className="h-3 w-3 mr-1" />
                Teams
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : message.type === "warning"
                          ? "bg-orange-100 text-orange-900 border border-orange-200"
                          : message.type === "success"
                          ? "bg-green-100 text-green-900 border border-green-200"
                          : message.type === "transfer"
                          ? "bg-purple-100 text-purple-900 border border-purple-200"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.role === "assistant" && (
                          <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        {message.role === "user" && (
                          <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        {message.role === "agent" && (
                          <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="text-sm whitespace-pre-line">
                          {message.content}
                        </div>
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString("mn-MN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Асуулт бичнэ үү..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Enter дарж илгээх, Shift+Enter шинэ мөр
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
