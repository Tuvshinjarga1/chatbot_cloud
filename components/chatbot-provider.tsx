"use client";

import React, { useState, createContext, useContext } from "react";
import { ChatbotWidget } from "./chatbot-widget";
import { getChatbotConfig } from "@/lib/chatbot-config";

interface ChatbotContextType {
  isOpen: boolean;
  toggle: () => void;
  openChatbot: () => void;
  closeChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};

interface ChatbotProviderProps {
  children: React.ReactNode;
}

export function ChatbotProvider({ children }: ChatbotProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = getChatbotConfig();

  const toggle = () => setIsOpen(!isOpen);
  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);

  return (
    <ChatbotContext.Provider
      value={{ isOpen, toggle, openChatbot, closeChatbot }}
    >
      {children}
      <ChatbotWidget
        isOpen={isOpen}
        onToggle={toggle}
        chatwootConfig={config.chatwoot}
        teamsConfig={config.teams}
      />
    </ChatbotContext.Provider>
  );
}

// Chatbot-г програмчлалаар нээх hook
export const useChatbotActions = () => {
  const { openChatbot, closeChatbot } = useChatbot();

  const openWithMessage = (message?: string) => {
    openChatbot();
    // Хэрэв мессеж байвал автоматаар бичих
    if (message) {
      setTimeout(() => {
        const event = new CustomEvent("chatbot-auto-message", {
          detail: { message },
        });
        window.dispatchEvent(event);
      }, 500);
    }
  };

  const openForSupport = () => {
    openWithMessage(
      "Надад техникийн дэмжлэг хэрэгтэй байна. Хүний ажилтантай холбогдохыг хүсч байна."
    );
  };

  const openForBilling = () => {
    openWithMessage("Төлбөрийн талаар асуулт байна.");
  };

  const openForTechnical = () => {
    openWithMessage("Техникийн асуудал тулгарч байна. Тусламж хэрэгтэй.");
  };

  return {
    openChatbot,
    closeChatbot,
    openWithMessage,
    openForSupport,
    openForBilling,
    openForTechnical,
  };
};
