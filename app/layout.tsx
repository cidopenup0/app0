import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import "highlight.js/styles/github-dark.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "app0 - AI Chat & Image Generation",
  description: "Chat with AI and generate images using Replicate",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-[100dvh] flex flex-col">
            <Navigation />
            <main className="flex-1 relative">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

