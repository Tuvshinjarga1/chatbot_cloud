"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChatbotActions } from "@/components/chatbot-provider";
import { MessageCircle, Phone, Users, Bot, AlertCircle } from "lucide-react";

export function ChatwootTest() {
  const {
    openChatbot,
    openForSupport,
    openForTechnical,
    openForBilling,
    openWithMessage,
  } = useChatbotActions();

  const testScenarios = [
    {
      title: "Ерөнхий дэмжлэг",
      description: "Ерөнхий асуулт асуух",
      action: () =>
        openWithMessage(
          "Сайн байна уу, танай үйлчилгээний талаар асуулт байна."
        ),
      icon: MessageCircle,
      color: "bg-blue-500",
    },
    {
      title: "Техникийн асуудал",
      description: "Техникийн дэмжлэг хүсэх",
      action: openForTechnical,
      icon: AlertCircle,
      color: "bg-red-500",
    },
    {
      title: "Төлбөрийн асуулт",
      description: "Төлбөрийн талаар асуух",
      action: openForBilling,
      icon: Phone,
      color: "bg-green-500",
    },
    {
      title: "Хүний туслагч",
      description: "Шууд хүний ажилтантай холбогдох",
      action: openForSupport,
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  const testChatwootDirect = () => {
    // Chatwoot widget-г шууд нээх
    // @ts-ignore
    if (window.chatwootSDK) {
      // @ts-ignore
      window.chatwootSDK.toggle("open");
    } else {
      alert(
        "Chatwoot SDK ачаалагдаагүй байна. Хэсэг хүлээгээд дахин оролдоно уу."
      );
    }
  };

  const testChatwootWithData = () => {
    // @ts-ignore
    if (window.chatwootSDK) {
      // @ts-ignore
      window.chatwootSDK.setCustomAttributes({
        userId: "test-user-123",
        accountType: "premium",
        source: "dashboard-test",
        testMode: true,
      });
      // @ts-ignore
      window.chatwootSDK.toggle("open");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>Chatwoot Интеграци Тест</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testScenarios.map((scenario, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${scenario.color} text-white`}
                    >
                      <scenario.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{scenario.title}</h3>
                      <p className="text-sm text-gray-600">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={scenario.action}
                    className="w-full mt-3"
                    variant="outline"
                  >
                    Тест хийх
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-medium">Chatwoot Widget шууд тест</h3>
            <div className="flex space-x-3">
              <Button onClick={testChatwootDirect} variant="outline">
                Chatwoot Widget нээх
              </Button>
              <Button onClick={testChatwootWithData} variant="outline">
                Custom Data-тай нээх
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Тест хийх заавар:</h4>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Дээрх товчнуудын аль нэгийг дарна уу</li>
              <li>Chatbot widget нээгдэх эсэхийг шалгана уу</li>
              <li>
                "Chatwoot" товч дарахад Chatwoot widget нээгдэх эсэхийг шалгана
                уу
              </li>
              <li>
                Мессеж илгээж Chatwoot dashboard-д харагдаж байгаа эсэхийг
                шалгана уу
              </li>
            </ol>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-800">
              Одоогийн тохиргоо:
            </h4>
            <div className="text-sm space-y-1">
              <p>
                <strong>Website Token:</strong> atrhYjQJmaBw5vCLzm5yTkHN
              </p>
              <p>
                <strong>Base URL:</strong> https://app.chatwoot.com
              </p>
              <p>
                <strong>SDK Path:</strong> /packs/js/sdk.js
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
