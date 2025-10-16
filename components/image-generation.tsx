'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Sparkles, Download, Wand2, Loader2, ImageIcon, Copy, Heart, Bot, Check } from "lucide-react"
import Image from "next/image"

// AI Models configuration
const aiModels = [
  {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    description: 'Fast, high-quality generation'
  },
  {
    id: 'flux-dev', 
    name: 'Flux Dev',
    description: 'Enhanced detail and quality'
  },
  {
    id: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL', 
    description: 'Versatile and creative'
  },
  {
    id: 'imagen-4-fast',
    name: 'Imagen 4 Fast',
    description: 'Google\'s latest fast model'
  },
  {
    id: 'photon',
    name: 'Photon',
    description: 'Luma\'s advanced generation'
  }
]



// Dynamic placeholder texts
const placeholderTexts = [
  "A majestic dragon soaring through a sunset sky, detailed fantasy art style...",
  "A cityscape with neon lights reflecting on wet streets, cyberpunk aesthetic...",
  "A serene mountain lake with snow-capped peaks, golden hour lighting...",
  "A mystical forest with ancient trees and rays of sunlight piercing through...",
  "A steampunk airship floating above Victorian era buildings, copper details...",
  "A cosmic nebula with swirling galaxies and vibrant colors, space art style...",
  "An underwater coral reef teeming with colorful fish, crystal clear water...",
  "A medieval castle perched on a cliff overlooking a stormy sea..."
]

export function ImageGeneration() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string>('flux-schnell')
  const [usedPrompt, setUsedPrompt] = useState<string>('')
  const [usedModel, setUsedModel] = useState<string>('')
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0)
  const [isTextareaFocused, setIsTextareaFocused] = useState(false)

  // Animate placeholder text every 3 seconds with marquee effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    // Only start animation if textarea is not focused and there's no text
    if (!isTextareaFocused && !prompt.trim()) {
      interval = setInterval(() => {
        // Change to next placeholder (CSS animation handles the transitions)
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length)
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTextareaFocused, prompt])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    const currentPrompt = prompt.trim()
    
    setIsLoading(true)
    setError(null)
    setPrompt('') // Clear textarea immediately after submission

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: currentPrompt, 
          model: selectedModel 
        }),
      })

      if (!response.ok) throw new Error('Failed to generate image')

      const data = await response.json()
      setImage(data.image)
      setUsedPrompt(currentPrompt)
      setUsedModel(selectedModel)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to generate image. Please try again.')
      setPrompt(currentPrompt) // Restore prompt if there's an error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadImage = async () => {
    if (!image) return
    
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ai-generated-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Failed to download image:', error)
    }
  }



  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Generation Form */}
        <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Wand2 className="w-5 h-5 text-primary" />
            Describe Your Vision <span className="text-xs text-muted-foreground">
                  ({prompt.length}/500)
                </span>
                {prompt.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyPrompt}
                    className="h-7 w-7 p-0"
                  >
                    {copySuccess ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                )}
          </CardTitle>
          <CardDescription>
                
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={() => setIsTextareaFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                placeholder=""
                className="min-h-[100px] resize-none border-border/50 focus:border-primary/50 transition-colors"
                maxLength={500}
              />
              
              {/* Custom Animated Placeholder with Marquee */}
              {!prompt && !isTextareaFocused && (
                <div className="absolute top-3 left-3 pointer-events-none text-muted-foreground text-sm overflow-hidden h-6 leading-6">
                  <div 
                    className="animate-placeholder-marquee"
                    key={currentPlaceholderIndex}
                  >
                    {placeholderTexts[currentPlaceholderIndex]}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              {/* Model Selector */}
              <div className="flex items-center">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-auto h-8 border-none bg-transparent p-2 hover:bg-muted-foreground/10 rounded-full flex items-center justify-center gap-2">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-primary">{aiModels.find(m => m.id === selectedModel)?.name}</span>
                  </SelectTrigger>
                  <SelectContent align="start" className="w-80">
                    {aiModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex flex-col gap-1 py-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>          
              
              <Button 
                type="submit" 
                disabled={isLoading || !prompt.trim()}
                className="group px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

        {/* Error State */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-destructive">
                <ImageIcon className="w-5 h-5" />
                <p className="font-medium">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Creating Your Image</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Our AI is working its magic. This usually takes 10-30 seconds...
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bot className="w-4 h-4" />
                  <span>{aiModels.find(m => m.id === selectedModel)?.name} processing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generated Image */}
        {image && (
          <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <ImageIcon className="w-5 h-5 text-primary" />
                Generated Image
              </CardTitle>
              <CardDescription>
                Your AI-generated masterpiece is ready!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Image Display */}
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/30">
                    <Image
                      src={image}
                      alt="AI Generated image"
                      width={512}
                      height={512}
                      className="w-full h-auto max-w-2xl mx-auto block transition-transform group-hover:scale-[1.02]"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={downloadImage}
                    className="group px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                    Download Image
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setPrompt('')
                      setImage(null)
                      setError(null)
                      setUsedPrompt('')
                      setUsedModel('')
                    }}
                    className="px-6 py-2"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Create Another
                  </Button>
                </div>

                {/* Generation Details */}
                {usedPrompt && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Used Prompt:</h4>
                          <p className="text-sm leading-relaxed">{usedPrompt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                        <Bot className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <h4 className="text-xs font-medium text-muted-foreground mb-0.5">AI Model:</h4>
                          <span className="text-sm font-medium">{aiModels.find(m => m.id === usedModel)?.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
