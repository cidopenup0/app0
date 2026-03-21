"use client"

import { useAuth } from "@clerk/nextjs"
import { Chat } from "@/components/chat"
import { Suspense, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  )
}

function ChatPageContent() {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (isLoaded && !userId) {
      const query = searchParams.toString()
      const returnTo = `${pathname}${query ? `?${query}` : ""}`
      const redirectQuery = new URLSearchParams({
        signin: "true",
        redirect: returnTo,
      })

      // Replace to avoid stacking history entries while we gate access.
      router.replace(`/?${redirectQuery.toString()}`)
    }
  }, [isLoaded, userId, router, pathname, searchParams])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)] px-4">
        <p className="text-sm text-muted-foreground">Redirecting to sign in...</p>
      </div>
    )
  }

  return <Chat />
}

