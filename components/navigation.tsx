import Link from "next/link"
import { MessageSquare, Image } from 'lucide-react'
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">AI Platform</div>
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </Link>
            <Link 
              href="/generate" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Image className="w-4 h-4" />
              Generate Image
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

