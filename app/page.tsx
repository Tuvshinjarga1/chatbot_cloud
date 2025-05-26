"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { DashboardStats } from "@/components/dashboard-stats";
import { ServerResources } from "@/components/server-resources";
import { ServicesGrid } from "@/components/services-grid";
import { PricingSection } from "@/components/pricing-section";
import { ServicesTable } from "@/components/services-table";
import ChatbotWidget from "@/components/chatbot-widget";

export default function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onChatToggle={() => setIsChatOpen(!isChatOpen)} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <DashboardStats />
          <ServerResources />
          <ServicesGrid />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PricingSection />
            <ServicesTable />
          </div>
        </main>
      </div>
      <ChatbotWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}
