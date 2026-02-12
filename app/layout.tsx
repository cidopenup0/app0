import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "app0 - AI Chat",
  description: "Chat with AI and speech-to-text support",
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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

