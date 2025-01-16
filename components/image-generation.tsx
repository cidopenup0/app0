'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export function ImageGeneration() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) throw new Error('Failed to generate image')

      const data = await response.json()
      setImage(data.image)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt..."
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          Generate
        </Button>
      </form>

      {error && (
        <div className="text-red-500">{error}</div>
      )}

      {isLoading && (
        <Card className="p-4 text-center">
          Generating your image...
        </Card>
      )}

      {image && (
        <Card className="p-4">
          <Image
            src={image || "/placeholder.svg"}
            alt="Generated image"
            width={512}
            height={512}
            className="rounded-lg mx-auto"
          />
        </Card>
      )}
    </div>
  )
}

