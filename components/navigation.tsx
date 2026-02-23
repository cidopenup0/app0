import Link from "next/link";
import { MessageSquareText, Binary, HomeIcon, Zap } from 'lucide-react';
import ThemeSwitchCircular from "./ui/theme-switch-circular";

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <Link
            href="https://github.com/cidopenup/app0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xl font-bold gap-2 hover:text-primary transition-all duration-200"
          >
            <div className="p-1.5 rounded-lg bg-primary/10 transition-colors duration-200">
              <Binary className="w-5 h-5 transition-transform duration-200" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              app0
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 "
            >
              <HomeIcon className="w-4 h-4 transition-transform duration-200" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>
            
            <Link 
              href="/chat" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 "
            >
              <MessageSquareText className="w-4 h-4 transition-transform duration-200" />
              <span className="hidden sm:inline font-medium">Chat</span>
            </Link>
            
            <Link 
              href="/chat/models" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 "
            >
              <Zap className="w-4 h-4 transition-transform duration-200" />
              <span className="hidden sm:inline font-medium">Models</span>
            </Link>
            
            <div className="ml-1">
              <ThemeSwitchCircular />
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
