import Link from "next/link";
import { MessageSquare, Image, Binary, HomeIcon } from 'lucide-react';
// import { FaDiscord } from 'react-icons/fa';
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          {/* Brand Section */}
          <Link
            href="https://github.com/cidopenup/app0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xl font-bold gap-2 hover:text-primary transition-colors"
          >
            <Binary className="w-5 h-5" />
            app0
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
            </Link>
            <Link 
              href="/chat" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </Link>
            <Link 
              href="/image" 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Image className="w-4 h-4" />
            </Link>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Optional: Discord Icon */}
            {/* <a 
              href="https://discord.com/users/1123900774670413856"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
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
