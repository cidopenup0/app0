# app0

A clean, focused chat application powered by AI. Ask questions, speak your queries, and get clear answers. Built with Next.js, React, and TypeScript for an optimal experience.

*Built with:*

<div align="center">
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=Next.js&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="OpenRouter" src="https://img.shields.io/badge/OpenRouter-000000.svg?style=flat&logo=OpenRouter&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC.svg?style=flat&logo=Tailwind%20CSS&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Radix UI" src="https://img.shields.io/badge/RadixUI-000000.svg?style=flat&logo=Radix%20UI&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
</div>

## ✨ Features

### **Multi-Model AI Chat**
- **8 Powerful Models** via OpenRouter:
  - **Google**: Gemma 3 4B, 12B, 27B
  - **Meta**: Llama 3.2 3B, Llama 3.3 70B
  - **OpenAI**: GPT OSS 20B, GPT OSS 120B (default)
- **Provider Tabs**: Click provider tabs to browse models by company
- **Smooth Model Switching**: Change models mid-conversation
- **Full Conversation Context**: Models get complete chat history for better responses

### **Voice Input**
- **Click-to-Record**: Simple microphone button for hands-free input
- **Browser-native Speech Recognition**: Uses built-in Web Speech API (no server transcription)
- **Language Selection**: Supports English, Hindi, Kannada, Telugu, and Tamil
- **Error Handling**: Clear feedback if transcription fails
- **Seamless Integration**: Transcribed text appears instantly in chat

### **Modern Interface**
- **Dark/Light Mode**: Toggle themes with circular theme switcher
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Clean Typography**: Easy-to-read responses with markdown support
- **Code Highlighting**: Beautiful syntax highlighting for code blocks
- **Auto-scrolling**: Chat scrolls to latest messages automatically

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([Get it here](https://nodejs.org/))
- **npm** package manager
- **Git** for cloning

### Installation

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

   # Clerk auth in keyless mode works with no auth env vars in development.
   # Optional if you want to connect your own Clerk instance:
   
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
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
5. Choose voice language and click the microphone for voice input

### Browse Models
- Visit `/chat/models` to see all available models
- Each model shows its provider, description, and capabilities
- Click "Use Model" to start a conversation with that specific model

## 📂 Project Structure

```
app0/
├── app/
│   ├── api/
│   │   ├── clerk/              # Clerk auth helpers (middleware/auth)
│   │   ├── chat/               # Chat API endpoint
│   │   │   ├── route.ts        # Chat completions
│   │   │   └── models/
│   │   │       └── route.ts    # List available models
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
├── proxy.ts                    # Clerk middleware entrypoint
└── lib/
    └── utils.ts                # Utility functions
```

## 🔌 API Endpoints

#### `POST /api/chat`
Send a message and get an AI response.

#### `GET /api/chat/models`
Get list of all models being used in this project.