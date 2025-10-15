import { ImageGeneration } from "@/components/image-generation"

export default function GeneratePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-muted/20 via-background to-background">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-muted/50 rounded-full border border-border/50">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">AI Image Generation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 leading-tight">
              Create Stunning{' '}
              <span className="bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
                Images
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your imagination into reality with our powerful AI image generation.
              Powered by flux-schnell for lightning-fast, high-quality results.
            </p>
          </div>

          {/* Main Content */}
          <ImageGeneration />
        </div>
      </div>
    </div>
  )
}

