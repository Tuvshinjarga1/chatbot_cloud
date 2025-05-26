# Chatwoot Hosted Service Холболт

Энэхүү заавар нь Cloud MN chatbot-г Chatwoot-ийн hosted service (app.chatwoot.com)-тэй хэрхэн холбохыг тайлбарлана.

## 🚀 Chatwoot Hosted Service тохиргоо

### 1. Chatwoot бүртгэл үүсгэх

1. [https://app.chatwoot.com](https://app.chatwoot.com) хаягт орох
2. "Sign up" товчийг дарж шинэ бүртгэл үүсгэх
3. Имэйл баталгаажуулах
4. Компанийн мэдээлэл оруулах

### 2. Website Inbox үүсгэх

1. Chatwoot dashboard-д нэвтрэх
2. **Settings** > **Inboxes** хэсэгт орох
3. **"Add Inbox"** товчийг дарах
4. **"Website"** сонгох
5. Дараах мэдээллийг оруулах:
   - **Website Name**: Cloud MN Dashboard
   - **Website URL**: https://dashboard.cloudmn.com
   - **Welcome Heading**: Сайн байна уу!
   - **Welcome Tagline**: Манай дэмжлэгийн багтай холбогдоно уу
   - **Reply Time**: Within a few minutes

### 3. Website Token авах

1. Үүсгэсэн Website inbox-д орох
2. **Settings** tab дээр дарах
3. **Configuration** хэсгээс **Website Token**-г хуулах
4. Энэ token-г `.env.local` файлд хадгалах:

```bash
NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN=your_copied_website_token_here
```

### 4. Widget тохиргоо

1. Website inbox-ийн **Settings** > **Widget Configuration** хэсэгт орох
2. Дараах тохиргоог хийх:

**Appearance:**

- **Widget Color**: #2563eb (Blue)
- **Widget Position**: Right
- **Widget Type**: Standard

**Features:**

- ✅ Enable emoji picker
- ✅ Enable file attachments
- ✅ Enable CSAT
- ✅ Show powered by Chatwoot

**Pre-chat Form:**

- ✅ Enable pre-chat form
- **Pre-chat Message**: "Танд хэрхэн тусалж чадах вэ?"
- **Fields**: Name, Email (optional)

### 5. Agent нэмэх

1. **Settings** > **Agents** хэсэгт орох
2. **"Add Agent"** товчийг дарах
3. Дэмжлэгийн ажилтны мэдээлэл оруулах:
   - **Name**: Support Agent
   - **Email**: support@cloudmn.com
   - **Role**: Agent

### 6. Teams холболт

1. **Settings** > **Integrations** хэсэгт орох
2. **Microsoft Teams** integration идэвхжүүлэх
3. Teams webhook URL оруулах

## 🔧 Код дээр тохиргоо

### 1. Environment Variables

`.env.local` файлд дараах тохиргоог нэмнэ үү:

```bash
# Chatwoot Hosted Service
NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN=your_website_token_from_step_3
NEXT_PUBLIC_CHATWOOT_BASE_URL=https://app.chatwoot.com

# Teams (optional)
TEAMS_WEBHOOK_URL=your_teams_webhook_url
TEAMS_CHANNEL_ID=your_teams_channel_id
```

### 2. Компонент ашиглах

```tsx
// app/layout.tsx файлд
import { ChatbotProvider } from "@/components/chatbot-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>
        <ChatbotProvider>{children}</ChatbotProvider>
      </body>
    </html>
  );
}
```

### 3. Програмчлалаар ашиглах

```tsx
import { useChatbotActions } from "@/components/chatbot-provider";

function SupportButton() {
  const { openForSupport } = useChatbotActions();

  return <button onClick={openForSupport}>Дэмжлэг хүсэх</button>;
}
```

## 🎯 Ажиллах зарчим

### 1. Автомат туслагч

- Хэрэглэгч асуулт асуух
- Бот мэдээллийн сангаас хариулт өгөх
- Хэрэв нарийн асуулт бол хүний туслагч санал болгох

### 2. Хүний туслагчид шилжүүлэх

- "Chatwoot" товчийг дарах
- Эсвэл "хүний туслагч" гэж бичих
- Chatwoot widget автоматаар нээгдэх
- Өмнөх харилцаа Chatwoot руу дамжих

### 3. Teams мэдэгдэл

- "Teams" товчийг дарах
- Яаралтай тохиолдолд Teams-ээр мэдэгдэл илгээх
- Дэмжлэгийн баг шууд мэдэх

## 🔍 Тест хийх

### 1. Widget тест

1. Веб хуудсанд chatbot widget харагдаж байгаа эсэх
2. "Chatwoot" товч дарахад Chatwoot widget нээгдэж байгаа эсэх
3. Мессеж илгээхэд Chatwoot dashboard-д харагдаж байгаа эсэх

### 2. Шилжилт тест

1. Бот руу асуулт асуух
2. "хүний туслагч" гэж бичих
3. Chatwoot widget нээгдэж, өмнөх харилцаа харагдаж байгаа эсэх

### 3. Teams тест

1. "Teams" товч дарах
2. Teams channel-д мэдэгдэл ирж байгаа эсэх

## 🛠️ Troubleshooting

### Widget харагдахгүй байна

1. Website Token зөв эсэхийг шалгах
2. Console-д алдаа байгаа эсэхийг харах
3. Network tab-аас Chatwoot SDK ачаалагдаж байгаа эсэхийг шалгах

### Мессеж Chatwoot-д харагдахгүй байна

1. Website Token зөв inbox-тай холбогдсон эсэхийг шалгах
2. Chatwoot dashboard-ийн inbox хэсгийг шалгах
3. Browser console-д алдаа байгаа эсэхийг харах

### Teams мэдэгдэл ирэхгүй байна

1. Webhook URL зөв эсэхийг шалгах
2. Teams channel permissions шалгах
3. Webhook тест хийх

## 📞 Дэмжлэг

Хэрэв асуудал тулгарвал:

1. [Chatwoot Documentation](https://www.chatwoot.com/docs) уншина уу
2. [Chatwoot Community](https://github.com/chatwoot/chatwoot/discussions) форумд асуух
3. Манай техникийн багтай холбогдох: support@cloudmn.com

## 🔐 Аюулгүй байдал

- Website Token-г аюулгүй хадгална уу
- Environment variables-г git repository-д оруулж болохгүй
- HTTPS ашиглана уу
- CORS тохиргоог зөв хийнэ үү
