import Link from 'next/link';
import { MessageSquareText, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-accent/20 blur-2xl" />
        <div className="absolute left-12 top-1/2 h-28 w-28 rounded-full bg-muted blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">

        <h1 className="mb-2 text-8xl font-black tracking-tight sm:text-9xl">
          <span className="bg-gradient-to-r from-primary via-foreground to-muted-foreground bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <p className="mb-4 text-xl font-semibold text-foreground sm:text-3xl">
          This page wandered off the map.
        </p>

        <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          We looked everywhere, but this URL is either outdated, moved, or typed with extra wizard energy.
          No worries, your next stop is one click away.
        </p>

        <div className="flex flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="group px-7 py-6 text-base">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="px-7 py-6 text-base">
            <Link href="/chat" className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5" />
              <span>Open Chat</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
