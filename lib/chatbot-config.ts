// Chatbot интеграцийн тохиргоо
export interface ChatbotConfig {
  chatwoot?: {
    websiteToken: string;
    baseUrl: string;
    enableAutoAssignment?: boolean;
    defaultAgentId?: string;
  };
  teams?: {
    webhookUrl: string;
    channelId: string;
    mentionUsers?: string[];
  };
  features?: {
    enableSmartRouting?: boolean;
    enableKnowledgeBase?: boolean;
    enableFileUpload?: boolean;
    maxMessageLength?: number;
  };
}

// Үйлдвэрлэлийн тохиргоо
export const PRODUCTION_CONFIG: ChatbotConfig = {
  chatwoot: {
    websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN || "",
    baseUrl:
      process.env.NEXT_PUBLIC_CHATWOOT_BASE_URL || "https://app.chatwoot.com",
    enableAutoAssignment: true,
  },
  teams: {
    webhookUrl: process.env.TEAMS_WEBHOOK_URL || "",
    channelId: process.env.TEAMS_CHANNEL_ID || "",
    mentionUsers: ["support@cloudmn.com"],
  },
  features: {
    enableSmartRouting: true,
    enableKnowledgeBase: true,
    enableFileUpload: true,
    maxMessageLength: 1000,
  },
};

// Хөгжүүлэлтийн тохиргоо
export const DEVELOPMENT_CONFIG: ChatbotConfig = {
  chatwoot: {
    websiteToken: "your-dev-website-token",
    baseUrl: "https://your-dev-chatwoot.com",
    enableAutoAssignment: false,
  },
  teams: {
    webhookUrl: "https://your-dev-teams-webhook",
    channelId: "dev-support-channel",
  },
  features: {
    enableSmartRouting: true,
    enableKnowledgeBase: true,
    enableFileUpload: false,
    maxMessageLength: 500,
  },
};

// Тохиргоо сонгох
export const getChatbotConfig = (): ChatbotConfig => {
  return process.env.NODE_ENV === "production"
    ? PRODUCTION_CONFIG
    : DEVELOPMENT_CONFIG;
};

// Chatwoot API функцууд
export class ChatwootAPI {
  private baseUrl: string;
  private accountId: string;
  private accessToken: string;

  constructor(baseUrl: string, accountId: string, accessToken: string) {
    this.baseUrl = baseUrl;
    this.accountId = accountId;
    this.accessToken = accessToken;
  }

  // Шинэ харилцагч үүсгэх
  async createContact(email: string, name?: string, phone?: string) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/accounts/${this.accountId}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_access_token: this.accessToken,
        },
        body: JSON.stringify({
          email,
          name: name || email,
          phone_number: phone,
        }),
      }
    );
    return response.json();
  }

  // Шинэ харилцаа үүсгэх
  async createConversation(
    contactId: string,
    inboxId: string,
    message: string
  ) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/accounts/${this.accountId}/conversations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_access_token: this.accessToken,
        },
        body: JSON.stringify({
          contact_id: contactId,
          inbox_id: inboxId,
          message: {
            content: message,
            message_type: "incoming",
          },
        }),
      }
    );
    return response.json();
  }

  // Мессеж илгээх
  async sendMessage(
    conversationId: string,
    content: string,
    messageType: "outgoing" | "incoming" = "outgoing"
  ) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/accounts/${this.accountId}/conversations/${conversationId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_access_token: this.accessToken,
        },
        body: JSON.stringify({
          content,
          message_type: messageType,
        }),
      }
    );
    return response.json();
  }
}

// Teams мэдэгдлийн функц
export const sendTeamsNotification = async (
  webhookUrl: string,
  title: string,
  message: string,
  userEmail?: string,
  chatwootUrl?: string
) => {
  const card = {
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    themeColor: "0076D7",
    summary: title,
    sections: [
      {
        activityTitle: title,
        activitySubtitle: message,
        activityImage: "https://cloudmn.com/assets/logo.png",
        facts: [
          {
            name: "Хэрэглэгч:",
            value: userEmail || "Тодорхойгүй",
          },
          {
            name: "Цаг:",
            value: new Date().toLocaleString("mn-MN"),
          },
          {
            name: "Платформ:",
            value: "Cloud MN Dashboard",
          },
        ],
        markdown: true,
      },
    ],
    potentialAction: chatwootUrl
      ? [
          {
            "@type": "OpenUri",
            name: "Chatwoot-д харах",
            targets: [
              {
                os: "default",
                uri: chatwootUrl,
              },
            ],
          },
        ]
      : [],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });

    return response.ok;
  } catch (error) {
    console.error("Teams notification failed:", error);
    return false;
  }
};

// Chatwoot Hosted Service API функцууд
export class ChatwootHostedAPI {
  private websiteToken: string;
  private baseUrl: string = "https://app.chatwoot.com";

  constructor(websiteToken: string) {
    this.websiteToken = websiteToken;
  }

  // Chatwoot hosted service-ээр харилцагч үүсгэх
  async createContact(identifier: string, name?: string, email?: string) {
    try {
      // Chatwoot hosted service-ийн public API ашиглах
      const response = await fetch(
        `${this.baseUrl}/public/api/v1/inboxes/${this.websiteToken}/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier,
            name: name || identifier,
            email: email,
            custom_attributes: {
              source: "Cloud MN Dashboard",
              created_at: new Date().toISOString(),
            },
          }),
        }
      );
      return response.json();
    } catch (error) {
      console.error("Chatwoot contact creation failed:", error);
      return null;
    }
  }

  // Chatwoot hosted service-ээр мессеж илгээх
  async sendMessage(contactIdentifier: string, content: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/public/api/v1/inboxes/${this.websiteToken}/contacts/${contactIdentifier}/conversations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: {
              content,
              message_type: "incoming",
            },
          }),
        }
      );
      return response.json();
    } catch (error) {
      console.error("Chatwoot message sending failed:", error);
      return null;
    }
  }

  // Widget тохиргоо авах
  getWidgetConfig() {
    return {
      websiteToken: this.websiteToken,
      baseUrl: this.baseUrl,
      locale: "mn",
      type: "standard",
      launcherTitle: "Cloud MN Дэмжлэг",
      showPopoutButton: true,
      enabledFeatures: ["emoji_picker", "attachments", "end_conversation"],
      customAttributes: {
        platform: "Cloud MN Dashboard",
        version: "1.0.0",
      },
    };
  }
}
