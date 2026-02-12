import Link from "next/link";
import { MessageSquareText, Binary, HomeIcon, Zap } from 'lucide-react';
// import { FaDiscord } from 'react-icons/fa';
import ThemeSwitchCircular from "./ui/theme-switch-circular";

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          {/* Brand Section */}
          <Link
            href="https://github.com/cidopenup/app0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xl font-bold gap-2 hover:text-primary transition-all duration-200 hover:scale-105 group"
          >
            <div className="p-1.5 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200">
              <Binary className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
              app0
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 group"
            >
              <HomeIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>
            
            <Link 
              href="/chat" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 group"
            >
              <MessageSquareText className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline font-medium">Chat</span>
            </Link>
            
            <Link 
              href="/chat/models" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 group"
            >
              <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden sm:inline font-medium">Models</span>
            </Link>
            
            {/* Theme toggle */}
            <div className="ml-1">
              <ThemeSwitchCircular />
            </div>

            {/* <a 
              href="https://discord.com/users/1123900774670413856"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105"
              title="Dev's Discord profile"
            >
              <FaDiscord className="w-5 h-5" /> 
            </a> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
