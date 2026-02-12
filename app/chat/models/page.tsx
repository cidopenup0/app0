'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Model {
  id: string;
  name: string;
  description: string;
  provider: string;
}

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/chat/models');
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const data = await response.json();
        setModels(data.models);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/chat">
            <Button variant="ghost" size="sm" className="mb-6 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chat
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Available Models</h1>
          <p className="text-muted-foreground text-lg">
            Choose from these powerful AI models for your conversations
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <p className="text-red-700 dark:text-red-200">Error: {error}</p>
          </Card>
        )}

        {/* Models Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models.map((model) => (
              <Card
                key={model.id}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer border border-border/50 hover:border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {model.name}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {model.provider}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {model.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {model.id}
                  </code>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                  >
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && models.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No models available</p>
            <Link href="/chat">
              <Button>Back to Chat</Button>
            </Link>
          </Card>
        )}
      </div>
    </main>
  );
}
