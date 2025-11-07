import Link from 'next/link';
import { SquareArrowUpRight, MessageSquare, Image, Zap, Binary, Sparkles, Heart, MessageSquareText, Mic, Bot, Wand2, Rocket} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DotScreenShader } from '@/components/ui/dot-shader-background'; 

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-16 sm:px-10 relative">
        {/* Background decoration */}
        <div className= "absolute inset-0">
          <DotScreenShader />
        </div>
        
        <div className="max-w-3xl w-full text-center relative z-10">
          {/* Hero Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <Binary className="w-4 h-4 mr-2 animate-pulse" />
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
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 font-light animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            Your AI Playground: Chat Smart, Create Instantly
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
            Unlock the power of AI with app0. Engage with cutting-edge language models, generate 
            stunning visuals, and experience seamless AI interactions. Built for creators, 
            developers, and AI enthusiasts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-700">
            <Button asChild variant="outline" size="lg" className="group relative overflow-hidden transition-colors duration-200">
              <Link href="/chat" className="flex items-center gap-3 px-8 py-4 text-lg text-foreground transition-colors duration-200">
                <MessageSquareText size={20} className="transition-all duration-1000 group-hover:scale-110" />
                <span className="transition-colors duration-1000">Start Chatting</span>
                <SquareArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group relative overflow-hidden transition-colors duration-200">
              <Link href="/image" className="flex items-center gap-3 px-8 py-4 text-lg text-foreground transition-colors duration-200">
                <Image size={20} className="transition-all duration-1000 group-hover:scale-110" />
                <span className="transition-colors duration-1000">Generate Images</span>
                <SquareArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </Button>
          </div>

          {/* Floating Icons Animation - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block">
            <div className="absolute top-20 left-10 animate-bounce delay-1000">
              <Bot className="w-8 h-8 text-primary/40" />
            </div>
            <div className="absolute top-32 right-10 animate-bounce delay-1500">
              <Wand2 className="w-6 h-6 text-purple-400/40" />
            </div>
            <div className="absolute bottom-20 left-20 animate-bounce delay-2000">
              <Sparkles className="w-7 h-7 text-blue-400/40" />
            </div>
            <div className="absolute bottom-32 right-20 animate-bounce delay-2500">
              <Rocket className="w-6 h-6 text-green-400/40" />
            </div>
          </div>        
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-10 sm:px-10 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 animate-in fade-in slide-in-from-left duration-1000">
              Powerful AI Features
            </h2>
            <p className="text-muted-foreground text-lg animate-in fade-in slide-in-from-right duration-1000 delay-200">
              Experience cutting-edge AI capabilities designed for modern workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Chat Feature */}
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <MessageSquare className="w-8 h-8 text-primary group-hover:animate-pulse" />
                </div>
                <CardTitle className="text-2xl mb-2">Smart AI Conversations</CardTitle>
                <CardDescription className="text-base">
                  Engage with 4 powerful AI models including GPT-OSS 120B, Llama 3.3 70B, and more
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Multiple AI models with instant switching
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200" />
                    Rich markdown & syntax highlighting
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-400" />
                    Voice input for hands-free interaction
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-600" />
                    Persistent conversation history
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image Generation Feature */}
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="w-8 h-8 text-purple-500 group-hover:animate-spin" />
                </div>
                <CardTitle className="text-2xl mb-2">AI Image Generation</CardTitle>
                <CardDescription className="text-base">
                  Create stunning visuals with state-of-the-art AI models powered by Replicate
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                    Multiple generation models available
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-200" />
                    High-quality, professional outputs
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-400" />
                    Instant preview and download
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-600" />
                    Creative prompt flexibility
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section className="px-6 py-16 sm:px-10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4 animate-in fade-in slide-in-from-bottom duration-1000">
              Built for Performance
            </h2>
            <p className="text-muted-foreground text-xl animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              Modern architecture powered by cutting-edge APIs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border-primary/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                  <Zap className="w-8 h-8 text-primary group-hover:animate-bounce" />
                </div>
                <CardTitle className="text-2xl mb-2">Lightning Fast</CardTitle>
                <CardDescription className="text-base">
                  Groq API delivers ultra-low latency for real-time AI interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group-hover:bg-primary/5 transition-colors">
                    <span className="text-sm">Response Time</span>
                    <Badge variant="secondary" className="group-hover:animate-pulse">
                      ~200ms
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group-hover:bg-primary/5 transition-colors">
                    <span className="text-sm">Models Available</span>
                    <Badge variant="secondary" className="group-hover:animate-pulse">
                      4 Models
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border-purple-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                  <Binary className="w-8 h-8 text-purple-500 group-hover:animate-spin" />
                </div>
                <CardTitle className="text-2xl mb-2">Modern Stack</CardTitle>
                <CardDescription className="text-base">
                  Built with Next.js 15, TypeScript, and cutting-edge web technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-muted/50 rounded text-center text-xs font-medium group-hover:bg-purple-500/10 transition-colors">
                    Next.js 15
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-center text-xs font-medium group-hover:bg-purple-500/10 transition-colors">
                    TypeScript
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-center text-xs font-medium group-hover:bg-purple-500/10 transition-colors">
                    Tailwind CSS
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-center text-xs font-medium group-hover:bg-purple-500/10 transition-colors">
                    Radix UI
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-6 py-12 sm:px-10 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-background/80 backdrop-blur rounded-lg p-6 border border-border/50 shadow-sm">
            <h3 className="text-lg font-semibold text-primary mb-3">
              Privacy & Performance
            </h3>
            <p className="text-muted-foreground">
              Each conversation is independent and stateless, ensuring your privacy and providing
              fresh perspectives every session. Our optimized infrastructure delivers fast responses
              while maintaining the highest security standards.
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
