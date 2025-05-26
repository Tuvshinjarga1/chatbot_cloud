"use client";

import React, { useEffect, useState } from "react";

// Chatwoot SDK-ийн төрлүүдийг тодорхойлох
declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: any) => void;
      toggle: (action: string) => void;
      setCustomAttributes: (data: any) => void;
    };
    $chatwoot?: {
      toggle: (action: string) => void;
      setCustomAttributes: (data: any) => void;
    };
  }
}

interface StatusType {
  message: string;
  type: "info" | "success" | "error";
}

interface ChatbotWidgetProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const ChatwootWidget: React.FC<ChatbotWidgetProps> = ({ isOpen, onToggle }) => {
  const [status, setStatus] = useState<StatusType>({
    message: "Chatwoot SDK ачаалж байна...",
    type: "info",
  });

  const updateStatus = (
    message: string,
    type: "info" | "success" | "error" = "info"
  ) => {
    setStatus({ message, type });
    console.log(`📊 Status: ${message} (${type})`);
  };

  const testChatwootWidget = () => {
    console.log("🔧 Widget нээх оролдлого...");

    if (window.chatwootSDK) {
      try {
        // Өөр өөр арга оролдох
        if (window.$chatwoot && window.$chatwoot.toggle) {
          window.$chatwoot.toggle("open");
          console.log("✅ $chatwoot.toggle() ашиглан нээлээ");
        } else if (window.chatwootSDK.toggle) {
          window.chatwootSDK.toggle("open");
          console.log("✅ chatwootSDK.toggle() ашиглан нээлээ");
        } else {
          console.warn("⚠️ Toggle функц олдсонгүй");
          updateStatus("Widget toggle функц олдсонгүй!", "error");
          return;
        }

        updateStatus("Chatwoot widget нээх команд илгээгдлээ!", "success");
      } catch (error: any) {
        console.error("❌ Widget нээхэд алдаа:", error);
        updateStatus("Widget нээхэд алдаа: " + error.message, "error");
      }
    } else {
      console.error("❌ Chatwoot SDK ачаалагдаагүй байна");
      updateStatus(
        "Chatwoot SDK ачаалагдаагүй байна! Хуудсыг дахин ачаалана уу.",
        "error"
      );
    }
  };

  const testWithCustomData = () => {
    console.log("🔧 Custom data-тай widget нээх оролдлого...");

    if (window.chatwootSDK || window.$chatwoot) {
      try {
        const customData = {
          userId: "test-user-" + Date.now(),
          source: "test-page",
          testMode: true,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        };

        console.log("📝 Custom data:", customData);

        // Custom attributes тохируулах
        if (window.$chatwoot && window.$chatwoot.setCustomAttributes) {
          window.$chatwoot.setCustomAttributes(customData);
        } else if (
          window.chatwootSDK &&
          window.chatwootSDK.setCustomAttributes
        ) {
          window.chatwootSDK.setCustomAttributes(customData);
        }

        // Widget нээх
        if (window.$chatwoot && window.$chatwoot.toggle) {
          window.$chatwoot.toggle("open");
        } else if (window.chatwootSDK && window.chatwootSDK.toggle) {
          window.chatwootSDK.toggle("open");
        }

        updateStatus("Custom data-тай widget нээгдлээ!", "success");
      } catch (error: any) {
        console.error("❌ Custom data тохируулахад алдаа:", error);
        updateStatus(
          "Custom data тохируулахад алдаа: " + error.message,
          "error"
        );
      }
    } else {
      updateStatus("Chatwoot SDK ачаалагдаагүй байна!", "error");
    }
  };

  const checkSDKStatus = () => {
    console.log("🔍 SDK статус шалгаж байна...");

    const checks = {
      "window.chatwootSDK": !!window.chatwootSDK,
      "window.$chatwoot": !!window.$chatwoot,
      "chatwootSDK.toggle": !!(window.chatwootSDK && window.chatwootSDK.toggle),
      "$chatwoot.toggle": !!(window.$chatwoot && window.$chatwoot.toggle),
    };

    console.log("📊 SDK шалгалтын үр дүн:", checks);

    if (window.chatwootSDK || window.$chatwoot) {
      updateStatus(
        "✅ Chatwoot SDK бэлэн байна! Console-г нээж дэлгэрэнгүй мэдээлэл үзнэ үү.",
        "success"
      );

      // Widget элементийг DOM-оос хайх
      const widgetElements = document.querySelectorAll(
        '[data-widget="chatwoot"], .woot-widget-holder, #chatwoot-widget'
      );
      console.log("🔍 Widget элементүүд DOM-д:", widgetElements);

      if (widgetElements.length > 0) {
        console.log("✅ Widget элементүүд DOM-д байна");
      } else {
        console.warn("⚠️ Widget элементүүд DOM-д олдсонгүй");
      }
    } else {
      updateStatus(
        "❌ Chatwoot SDK ачаалагдаагүй байна! Console-г нээж алдааг шалгана уу.",
        "error"
      );
    }
  };

  useEffect(() => {
    // Debug мэдээлэл нэмэх
    console.log("🚀 Chatwoot SDK ачаалж эхэлж байна...");

    const BASE_URL = "https://app.chatwoot.com";
    const script = document.createElement("script");
    script.src = BASE_URL + "/packs/js/sdk.js";
    script.defer = true;
    script.async = true;

    script.onload = () => {
      console.log("✅ Chatwoot SDK script ачаалагдлаа");

      // SDK бэлэн эсэхийг шалгах
      if (window.chatwootSDK) {
        console.log("✅ chatwootSDK объект олдлоо");

        try {
          window.chatwootSDK.run({
            websiteToken: "atrhYjQJmaBw5vCLzm5yTkHN",
            baseUrl: BASE_URL,
            locale: "mn",
            // Нэмэлт тохиргоо
            hideMessageBubble: false,
            position: "right",
            launcherTitle: "Бидэнтэй холбогдох",
          });

          console.log("✅ Chatwoot SDK амжилттай эхэллээ");
          updateStatus(
            "Chatwoot SDK амжилттай ачаалагдлаа! Widget товчийг дарж үзнэ үү.",
            "success"
          );

          // Widget бэлэн эсэхийг шалгах
          setTimeout(() => {
            if (window.$chatwoot) {
              console.log("✅ $chatwoot объект бэлэн байна");
              updateStatus(
                "Widget бэлэн байна! Товчийг дарж нээнэ үү.",
                "success"
              );
            } else {
              console.warn("⚠️ $chatwoot объект олдсонгүй");
            }
          }, 2000);
        } catch (error: any) {
          console.error("❌ Chatwoot SDK эхлүүлэхэд алдаа:", error);
          updateStatus("SDK эхлүүлэхэд алдаа: " + error.message, "error");
        }
      } else {
        console.error("❌ chatwootSDK объект олдсонгүй");
        updateStatus("chatwootSDK объект олдсонгүй!", "error");
      }
    };

    script.onerror = (error) => {
      console.error("❌ Chatwoot SDK ачаалахад алдаа:", error);
      updateStatus(
        "Chatwoot SDK ачаалахад алдаа гарлаа! Интернет холболтоо шалгана уу.",
        "error"
      );
    };

    // Timeout нэмэх - 10 секундын дараа ачаалагдаагүй бол алдаа
    const timeout = setTimeout(() => {
      if (!window.chatwootSDK) {
        console.error("❌ Chatwoot SDK 10 секундын дотор ачаалагдсангүй");
        updateStatus(
          "SDK ачаалагдахад хэт удаж байна. Интернет холболтоо шалгана уу.",
          "error"
        );
      }
    }, 10000);

    document.head.appendChild(script);

    // 3 секундын дараа статус шалгах
    const statusCheck1 = setTimeout(checkSDKStatus, 3000);

    // 5 секундын дараа дахин шалгах
    const statusCheck2 = setTimeout(() => {
      console.log("🔄 5 секундын дараах шалгалт...");
      checkSDKStatus();
    }, 5000);

    // Cleanup function
    return () => {
      clearTimeout(timeout);
      clearTimeout(statusCheck1);
      clearTimeout(statusCheck2);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Хэрэв isOpen болон onToggle props дамжуулагдсан бол энгийн toggle товч харуулах
  if (isOpen !== undefined && onToggle) {
    return (
      <div
        className={`fixed bottom-4 right-4 z-50 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="bg-white rounded-lg shadow-xl border max-w-sm">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Chatwoot Тест</h3>
            <button
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-4">
            <div
              className={`p-3 mb-3 rounded text-sm ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : status.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {status.message}
            </div>
            <div className="space-y-2">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                onClick={testChatwootWidget}
              >
                Widget нээх
              </button>
              <button
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
                onClick={checkSDKStatus}
              >
                Статус шалгах
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Анхны бүтэн тест хуудас
  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🤖 Chatwoot Интеграци Тест
        </h1>

        <div
          className={`p-4 mb-4 rounded-lg border-l-4 ${
            status.type === "success"
              ? "border-green-500 bg-green-50 text-green-800"
              : status.type === "error"
              ? "border-red-500 bg-red-50 text-red-800"
              : "border-blue-500 bg-blue-50 text-blue-800"
          }`}
        >
          {status.message}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Тест товчнууд:
        </h2>
        <div className="space-y-3 mb-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            onClick={testChatwootWidget}
          >
            Chatwoot Widget нээх
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors ml-3"
            onClick={testWithCustomData}
          >
            Custom Data-тай нээх
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors ml-3"
            onClick={checkSDKStatus}
          >
            SDK статус шалгах
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Тохиргооны мэдээлэл:
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-600">
          <li>
            <strong>Website Token:</strong> atrhYjQJmaBw5vCLzm5yTkHN
          </li>
          <li>
            <strong>Base URL:</strong> https://app.chatwoot.com
          </li>
          <li>
            <strong>SDK Path:</strong> /packs/js/sdk.js
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Тест хийх заавар:
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>
            Энэ хуудас ачаалагдсаны дараа Chatwoot SDK автоматаар ачаалагдана
          </li>
          <li>
            "Chatwoot Widget нээх" товчийг дарж widget нээгдэх эсэхийг шалгана
            уу
          </li>
          <li>Widget дээр мессеж илгээж үзнэ үү</li>
          <li>Chatwoot dashboard-д орж мессеж ирсэн эсэхийг шалгана уу</li>
        </ol>
      </div>
    </div>
  );
};

// Named export болон default export хоёуланг нь хийх
export { ChatwootWidget };
export default ChatwootWidget;
