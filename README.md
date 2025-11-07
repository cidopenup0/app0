# app0 - AI-Powered Chat & Image Generation

A sleek, modern web application that brings together the power of AI chat, speech-to-text, and image generation in one seamless experience. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and user experience.

*Built with the tools and technologies:*

<div align="center">
<img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=Next.js&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Groq" src="https://img.shields.io/badge/Groq-000000.svg?style=flat&logo=Groq&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Replicate" src="https://img.shields.io/badge/Replicate-000000.svg?style=flat&logo=Replicate&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC.svg?style=flat&logo=Tailwind%20CSS&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
</div>

## ✨ Features

### 🗨️ **Multi-Model AI Chat**
- **Model Selection**: Choose from multiple powerful AI models via Groq API:
  - **GPT-OSS 120B** (Default) - OpenAI's powerful open-source model
  - **Llama 3.3 70B Versatile** - Meta's versatile large language model
  - **Kimi K2 Instruct** - MoonshotAI's instruction-following model
  - **Groq Compound Mini** - Groq's efficient compound model
- **Speech-to-Text**: Voice input support using Whisper large-v3-turbo model
- **Real-time Conversations**: Engage in natural, flowing conversations with advanced AI models
- **Markdown Support**: Rich text formatting with full markdown rendering support
- **Code Highlighting**: Beautiful syntax highlighting for code blocks
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 **AI Image Generation**
- **One-Click Generation**: Create stunning AI-generated images with simple prompts
- **Multiple Models**: Support for various image generation models via Replicate
- **High-Quality Output**: Powered by state-of-the-art image generation models
- **Instant Results**: Fast processing and display of generated images

### 🎙️ **Voice Features**
- **Voice Input**: Click-to-record microphone button for hands-free text input
- **Real-time Transcription**: Powered by Groq's Whisper large-v3-turbo model
- **Seamless Integration**: Transcribed text automatically appears in chat input

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: Seamless theme switching for comfortable viewing
- **Clean Interface**: Minimalist design focusing on functionality and aesthetics
- **Smooth Animations**: Polished interactions and transitions
- **Accessible**: Built with accessibility best practices in mind

## 🖼️ Preview

![app0 Preview](preview.png)

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed on your system:

- **Node.js** v18.0.0 or higher ([Download here](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control

### 🛠️ Installation

1. **Clone the repository**
   ```bash
   ❯ git clone https://github.com/cidopenup/app0.git
   ❯ cd app0
   ```

2. **Install dependencies**
   ```bash
   ❯ npm install
   # or
   ❯ yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # On Windows
   ❯ echo. > .env.local
   
   # On macOS/Linux
   ❯ touch .env.local
   ```

4. **Configure your API keys**
   
   Add the following to your `.env.local` file:
   ```env
   # Groq API Key (for AI Chat and Speech-to-Text)
   # Get your API key from https://console.groq.com/keys
   GROQ_API_KEY=your_groq_api_key_here
   
   # Replicate API Token (for Image Generation)
   # Get your API token from https://replicate.com/account/api-tokens
   REPLICATE_API_TOKEN=your_replicate_api_key_here
   ```
   
   > 🔑 **Getting API Keys:**
   > - **Groq**: Sign up at [console.groq.com](https://console.groq.com) and create an API key
   > - **Replicate**: Sign up at [replicate.com](https://replicate.com) and get your API token
   > - Replace the placeholder values with your actual API keys

### 🏃‍♂️ Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) in your browser to start using App0.

## 🚀 Features in Detail

### 💬 Chat Features
- **Multi-model Support**: Switch between different AI models in real-time
- **Conversation History**: Full conversation context maintained across messages
- **Voice Input**: Click the microphone button to speak your queries
- **Smart Formatting**: Automatic markdown rendering with syntax highlighting
- **Copy Messages**: Easy copy functionality for both user and AI messages

### 🎙️ Voice Input
- **One-Click Recording**: Simple microphone button interface
- **Real-time Processing**: Instant transcription using Whisper large-v3-turbo
- **Visual Feedback**: Clear recording and processing states
- **Seamless Integration**: Transcribed text appears directly in the input field

### 🎨 Image Generation
- **Multiple Models**: Support for Flux, SDXL, and other state-of-the-art models
- **Instant Preview**: Generated images appear immediately
- **High Quality**: Professional-grade image output

## 📂 Project Structure

```
app0/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── chat/              # Chat page
│   ├── image/             # Image generation page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── chat.tsx          # Main chat component
│   └── image-generation.tsx
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
└── styles/               # Global styles
```
