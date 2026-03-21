import Link from 'next/link';
import { ArrowRight, Languages, Mic, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HomePageWithAuth } from './home-page-auth';

export function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center gap-12 px-6 py-16 sm:px-10 lg:flex-row lg:gap-16">
        <div className="w-full lg:w-1/2">
          <h1 className="text-balance text-4xl font-semibold leading-tight text-primary sm:text-6xl">
            Get clear answers to everyday questions, fast.
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            Ask by voice or text, switch across leading models, and get practical responses you can
            use immediately.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group w-full sm:w-auto">
              <Link href="/chat" className="flex items-center gap-3">
                Open chat
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/chat/models" className="flex items-center gap-3">
                See available models
              </Link>
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Ask a question</p>
                  <p className="text-xs text-muted-foreground">Type your question or speak it aloud (select a language first)</p>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
                How can I manage my monthly expenses better?
              </div>
              <div className="rounded-2xl border border-border/50 bg-background p-4 text-sm">
                <p className="font-semibold text-primary">Assistant response</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-muted-foreground marker:text-muted-foreground">
                  <li>Track every expense for 30 days to see where money is actually going.</li>
                  <li>Split your budget into needs, wants, and savings, then set limits for each.</li>
                  <li>Review your spending weekly and cut one unnecessary recurring cost.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Smarter Responses',
              description: 'Clear, direct answers with better formatting for code and instructions.',
              icon: Sparkles,
            },
            {
              title: 'Multilingual Voice Input',
              description: 'Choose your preferred language first, then use built-in browser speech recognition.',
              icon: Languages,
            },
            {
              title: 'Seamless Sign-In Flow',
              description: 'Authentication takes users to intended pages.',
              icon: Shield,
            },
          ].map((feature) => (
            <Card key={feature.title} className="border-border/60 bg-background/70 backdrop-blur">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/60 p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold text-primary">Three fast steps</h2>
              <p className="mt-4 text-muted-foreground">
                Open chat, ask your question, and act on the response with confidence.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Start', text: 'Sign in once and continue from where you started.' },
                { title: 'Ask', text: 'Select your preferred language, then type or use the mic.' },
                { title: 'Decide', text: 'See which model responded and use the answer immediately.' },
              ].map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-2xl border border-border/60 bg-background/70 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-background/90">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-primary">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-border/60 bg-primary/5 p-10 text-center">
          <h3 className="text-3xl font-semibold text-primary">Ready to try the new experience?</h3>
          <p className="max-w-2xl text-muted-foreground">
            Voice input, model visibility, and smoother auth flow are all live.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/chat" className="flex items-center gap-3">
              Open chat
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default HomePageWithAuth;
