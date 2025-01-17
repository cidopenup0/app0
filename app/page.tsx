import Link from 'next/link';
import { SquareArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="bg-primary-background h-[calc(112vh-12rem)] flex flex-col justify-between">
      <div>
        <div className="max-w-3xl mx-auto px-7 sm:px-8">
          <h1 className="text-4xl font-extrabold text-primary-background mb-6 text-center">Welcome to app0</h1>
          <p className='text-lg text-primary-background mb-7 text-center'>Your AI Playground: Experiment and Discover</p>
          <p className="text-lg text-primary-background mb-8 text-center">
          Unlock the power of AI with app0. Whether it's creating captivating stories, analyzing intricate data, or fostering meaningful conversations, our AI tools are crafted to enhance your productivity and simplify your tasks. Every time you engage with the model, it generates unique responses without memory of earlier conversations or questions, ensuring a fresh perspective each time.
          </p>
          <p className='text-lg text-primary-background mb-7 text-center'>
          Keep in mind, the models do not retain any context from previous interactions, even if they were moments ago. Additionally, the models are not tailored to any specific user case, offering versatile solutions for diverse needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link
                href="/chat"
                className="h-full flex items-center justify-center px-4 bg-primary text-primary-foreground"
              >
                <span>Chat with llama-3-70b-instruct </span>
                <SquareArrowUpRight />
              </Link>
            </Button>
            <Button asChild>
              <Link
                href="/image"
                className="h-full flex items-center justify-center px-4 bg-primary text-primary-foreground"
              >
                <span>Generate Image with flux-schnell </span>
                <SquareArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <footer className="text-center py-4">
        <span>Made with ❤️ by </span>
        <Link
          href="https://discord.com/users/1123900774670413856"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          cidopenup0
        </Link>
      </footer>
    </div>
  );
};

export default HomePage;
