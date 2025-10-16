import Link from 'next/link';
import { SquareArrowUpRight, MessageSquare, Image, Zap, Binary, Sparkles, Heart, MessageSquareText} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DotScreenShader } from '@/components/ui/dot-shader-background'; 

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-16 sm:px-10 relative">
        <div className= "absolute inset-0">
          <DotScreenShader />
        </div>
        {/* Background decoration */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" /> */}
        
        <div className="max-w-3xl w-full text-center relative z-10">
          {/* Hero Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            <Binary className="w-4 h-4 mr-2" />
            AI-Powered Tools
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold text-primary mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
              app0
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 font-light">
            Your AI Playground: Experiment and Discover
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Unlock the power of AI with app0. Whether it's creating captivating stories,
            analyzing intricate data, or fostering meaningful conversations, our AI tools
            enhance productivity and simplify your tasks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button asChild size="lg" className="group">
              <Link href="/chat" className="flex items-center gap-3 px-8 py-4 text-lg">
                <MessageSquareText size={20} />
                <span>Start Chatting</span>
                <SquareArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/image" className="flex items-center gap-3 px-8 py-4 text-lg">
                <Image size={20} />
                <span>Generate Images</span>
                <SquareArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-10 sm:px-10 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Powerful AI Features
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience cutting-edge AI capabilities designed for creators and innovators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chat Feature */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">AI Chat Interface</CardTitle>
                <CardDescription>
                  Choose from multiple AI models including GPT-5 Nano, DeepSeek R1, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Multiple AI model options</li>
                  <li>• Natural conversation flow</li>
                  <li>• Instant AI responses</li>
                  <li>• Clean, distraction-free UI</li>
                </ul>
              </CardContent>
            </Card>

            {/* Image Generation Feature */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Image Generation</CardTitle>
                <CardDescription>
                  Create stunning visuals with flux-schnell AI model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• High-quality image generation</li>
                  <li>• Fast processing with flux-schnell</li>
                  <li>• Creative freedom unleashed</li>
                </ul>
              </CardContent>
            </Card>

            {/* Performance Feature */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Stateless & Fast</CardTitle>
                <CardDescription>
                  Fresh insights every session with lightning-fast performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• No context retention between sessions</li>
                  <li>• Fresh perspective every time</li>
                  <li>• Optimized for speed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-6 py-12 sm:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
            <h3 className="text-lg font-semibold text-primary mb-3">
              Important Note
            </h3>
            <p className="text-muted-foreground">
              The AI models do not retain previous context. Each session is stateless,
              offering fresh, versatile insights for every interaction. This ensures
              privacy and provides you with unbiased responses every time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-border text-sm text-muted-foreground bg-muted/20">
        Made with <span className="text-red-500"><Heart fill="red" className='inline w-4 h-4' /></span> by{' '}
        <Link
          href="https://discord.com/users/1123900774670413856"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium transition-colors"
        >
          cidopenup0
        </Link>
      </footer>
    </div>
  );
}

export default HomePage;
