# app0 - AI-Powered Chat & Image Generation

A sleek, modern web application that brings together the power of AI chat and image generation in one seamless experience. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and user experience.

*Built with the tools and technologies:*

<div align="center">
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&amp;logo=React&amp;logoColor=black" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&amp;logo=TypeScript&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="Replicate" src="https://img.shields.io/badge/Replicate-000000.svg?style=flat&amp;logo=Replicate&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<br>
<img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&amp;logo=npm&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
<img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&amp;logo=ESLint&amp;logoColor=white" class="inline-block mx-1" style="margin: 0px 2px;">
</div>

## ✨ Features

### 🗨️ **Multi-Model AI Chat**
- **Model Selection**: Choose from multiple AI models including Llama 3 70B, GPT-5 Nano, DeepSeek R1, and Kimi K2 Instruct
- **Real-time Conversations**: Engage in natural, flowing conversations with advanced AI models
- **Markdown Support**: Rich text formatting with full markdown rendering support
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🎨 **AI Image Generation**
- **One-Click Generation**: Create stunning AI-generated images with simple prompts
- **High-Quality Output**: Powered by state-of-the-art image generation models
- **Instant Results**: Fast processing and display of generated images

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
   REPLICATE_API_TOKEN=your_replicate_api_key_here
   # Add other API keys as needed for different models
   ```
   
   > 🔑 **Getting API Keys:**
   > - **Replicate**: Sign up at [replicate.com](https://replicate.com) and get your API token
   > - Replace `your_replicate_api_key_here` with your actual API key

### 🏃‍♂️ Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) in your browser to start using App0.

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
