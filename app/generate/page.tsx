import { ImageGeneration } from "@/components/image-generation"

export default function GeneratePage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Generate Images</h1>
      <ImageGeneration />
    </div>
  )
}

