import Link from 'next/link';
import { SquareArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="bg-primary-background min-h-screen flex flex-col justify-between">
      <main className="flex-grow flex flex-col justify-center items-center px-6 py-12 sm:px-10">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6">
            Welcome to app0
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6">
            Your AI Playground: Experiment and Discover
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mb-6">
            Unlock the power of AI with app0. Whether it’s creating captivating stories,
            analyzing intricate data, or fostering meaningful conversations, our AI tools
            enhance productivity and simplify your tasks.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground mb-10">
            Note: The models do not retain previous context. Each session is stateless,
            offering fresh, versatile insights for every use.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/chat" className="flex items-center gap-2 px-6 py-3">
                <span>Chat with llama-3-70b-instruct</span>
                <SquareArrowUpRight size={18} />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/image" className="flex items-center gap-2 px-6 py-3">
                <span>Generate Image with flux-schnell</span>
                <SquareArrowUpRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="text-center py-6 border-t border-border text-sm text-muted-foreground">
        Made with <span className="text-red-500">♥</span> by{' '}
        <Link
          href="https://discord.com/users/1123900774670413856"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          cidopenup0
        </Link>
      </footer>
    </div>
  );
}

export default HomePage;
