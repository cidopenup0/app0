# app0 - Simple AI Chat for Everyday Questions

A clean, focused chat application powered by AI. Ask questions, speak your queries, and get clear answers. Built with Next.js, React, and TypeScript for an optimal experience.

*Built with:*

<div align="center">
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=Next.js&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Groq" src="https://img.shields.io/badge/Groq-000000.svg?style=flat&logo=Groq&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="OpenRouter" src="https://img.shields.io/badge/OpenRouter-000000.svg?style=flat&logo=OpenRouter&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC.svg?style=flat&logo=Tailwind%20CSS&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Radix UI" src="https://img.shields.io/badge/RadixUI-000000.svg?style=flat&logo=Radix%20UI&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
</div>

## ✨ Features

### 🗨️ **Multi-Model AI Chat**
- **8 Powerful Models** via OpenRouter:
  - **Google**: Gemma 3 4B, 12B, 27B
  - **Meta**: Llama 3.2 3B, Llama 3.3 70B
  - **OpenAI**: GPT OSS 20B, GPT OSS 120B (default)
- **Provider Tabs**: Click provider tabs to browse models by company
- **Smooth Model Switching**: Change models mid-conversation
- **Full Conversation Context**: Models get complete chat history for better responses

### 🎙️ **Voice Input**
- **Click-to-Record**: Simple microphone button for hands-free input
- **Real-time Transcription**: Powered by Groq Whisper large-v3-turbo
- **Error Handling**: Clear feedback if transcription fails
- **Seamless Integration**: Transcribed text appears instantly in chat

### 🎨 **Modern Interface**
- **Dark/Light Mode**: Toggle themes with circular theme switcher
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Clean Typography**: Easy-to-read responses with markdown support
- **Code Highlighting**: Beautiful syntax highlighting for code blocks
- **Auto-scrolling**: Chat scrolls to latest messages automatically

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** v18+ ([Get it here](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for cloning

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cidopenup/app0.git
   cd app0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```bash
   # Windows
   echo. > .env.local
   
   # macOS/Linux
   touch .env.local
   ```

4. **Add API Keys**
   
   Open `.env.local` and add:
   ```env
   # OpenRouter API Key (for all chat models)
   # Get it from: https://openrouter.io/keys
   OPENROUTER_API_KEY=your_openrouter_key_here
   
   # Groq API Key (for speech-to-text)
   # Get it from: https://console.groq.com/keys
   GROQ_API_KEY=your_groq_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Chat with AI
1. Go to the chat page at `/chat`
2. Click the bot icon to select a model and provider
3. Type your question in the input box
4. Press `Enter` or click the send button
5. Click the microphone for voice input

### Browse Models
- Visit `/chat/models` to see all available models
- Each model shows its provider, description, and capabilities
- Click "Use Model" to start a conversation with that specific model

## 📂 Project Structure

```
app0/
├── app/
│   ├── api/
│   │   ├── chat/               # Chat API endpoint
│   │   │   ├── route.ts        # Chat completions
│   │   │   └── models/
│   │   │       └── route.ts    # List available models
│   │   └── speech-to-text/     # Whisper transcription endpoint
│   ├── chat/
│   │   ├── page.tsx            # Chat interface
│   │   └── models/
│   │       └── page.tsx        # Models browser page
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── components/
│   ├── chat.tsx                # Main chat component
│   ├── navigation.tsx          # Top navigation bar
│   └── ui/                     # Reusable components (Radix UI based)
│       ├── button.tsx
│       ├── card.tsx
│       ├── select.tsx
│       ├── theme-switch-circular.tsx
│       └── ... (30+ UI components)
├── lib/
│   └── utils.ts                # Utility functions
└── hooks/
    └── use-mobile.tsx          # Mobile detection hook
```

## 🔌 API Endpoints

### `POST /api/chat`
Send a message and get an AI response.

**Request:**
```json
{
  "messages": [{"role": "user", "content": "What is JavaScript?"}],
  "model": "openai/gpt-oss-120b:free"
}
```

**Response:**
```json
{
  "response": "JavaScript is a programming language..."
}
```

### `GET /api/chat/models`
Get list of all available models.

**Response:**
```json
{
  "models": [
    {
      "id": "google/gemma-3-4b-it:free",
      "name": "Gemma 3 4B",
      "description": "Fast and efficient for everyday questions",
      "provider": "Google"
    }
  ],
  "total": 8
}
```

### `POST /api/speech-to-text`
Convert audio to text.

**Request:** FormData with audio file
**Response:** `{ "text": "transcribed text here" }`

## 🎨 Customization

### Change Default Model
Edit `components/chat.tsx`:
```typescript
const [selectedModel, setSelectedModel] = useState('model-id-here');
```

### Add New Models
Update `app/api/chat/models/route.ts` and `components/chat.tsx`:
```typescript
{
  id: 'provider/model-name:free',
  name: 'Display Name',
  description: 'Model description',
  provider: 'Provider Name',
}
```

## 📝 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | Yes | OpenRouter API key for chat models |
| `GROQ_API_KEY` | Yes | Groq API key for speech-to-text |

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Set environment variables in Vercel dashboard:
- `OPENROUTER_API_KEY`
- `GROQ_API_KEY`

### Deploy to Other Platforms

The app is a standard Next.js project. Deploy to:
- Netlify
- Railway
- Render

> Make sure to set environment variables in your hosting platform.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests