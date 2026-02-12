import Link from 'next/link';
import { ArrowRight, Binary, CheckCircle2, Code2, Mic, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_60%)] opacity-15" />
        <div className="absolute -bottom-24 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,#16a34a_0%,transparent_55%)] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,hsl(var(--background))_60%)]" />
      </div>

      <section className="mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center gap-12 px-6 py-16 sm:px-10 lg:flex-row lg:gap-16">
        <div className="w-full lg:w-1/2">
          <h1 className="text-balance text-4xl font-semibold leading-tight text-primary sm:text-6xl">
            Get clear answers to everyday questions, fast.
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            app0 is a simple chat assistant for normal people. Ask anything, speak your question,
            and get clean, easy-to-read responses.
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
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { label: 'Easy to use', value: 'No setup needed' },
              { label: 'Voice friendly', value: 'Talk or type' },
              { label: 'Clean answers', value: 'Simple language' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border/60 bg-background/70 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-primary">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.value}</p>
              </div>
            ))}
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
                  <p className="text-xs text-muted-foreground">Speak or type</p>
                </div>
              </div>
              <Badge variant="secondary" className="rounded-full">Helpful answers</Badge>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
                What are three easy ways to save money this month?
              </div>
              <div className="rounded-2xl border border-border/50 bg-background p-4 text-sm">
                <p className="font-semibold text-primary">Quick tips</p>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    Set a small weekly spending limit and track it on your phone.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    Pause one subscription you do not use often.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    Plan meals for the week to avoid last-minute takeout.
                  </li>
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
              title: 'Simple questions',
              description: 'Ask about daily life, work, or quick ideas.',
              icon: Zap,
            },
            {
              title: 'Easy reading',
              description: 'Short answers in plain language.',
              icon: Code2,
            },
            {
              title: 'Private by design',
              description: 'No clutter, no confusing steps.',
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
              <h2 className="mt-3 text-3xl font-semibold text-primary">Three simple steps</h2>
              <p className="mt-4 text-muted-foreground">
                Ask your question, get an answer, and move on. It is that simple.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Ask', text: 'Type a question or tap the microphone.' },
                { title: 'Read', text: 'Get a clear answer with no clutter.' },
                { title: 'Use it', text: 'Apply the answer right away.' },
              ].map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-2xl border border-border/60 bg-background/70 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-background/90">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30">
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
          <h3 className="text-3xl font-semibold text-primary">Have a question?</h3>
          <p className="max-w-2xl text-muted-foreground">
            Ask it here and get a simple, helpful answer in seconds.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/chat" className="flex items-center gap-3">
              Ask now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
