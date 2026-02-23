import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center px-6 relative">
      <div className="max-w-2xl w-full text-center relative z-10">

        <h1 className="text-8xl sm:text-9xl font-bold mb-6">
          <span className="bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-4">
          This Page Got Yeeted Into the Void
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
          Bruh, this page is straight up ghosting us rn. It's giving absolutely nothing. 
          Might've been yeeted into the void or caught lacking fr fr. 
        </p>

        <Button asChild size="lg" className="group px-8 py-6 text-lg">
          <Link href="/" className="flex items-center gap-3">
            <Home size={20} />
            <span>Let's Bounce Back Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
