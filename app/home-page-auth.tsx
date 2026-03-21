"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"
import { useAuth, useClerk } from "@clerk/nextjs"
import { HomePage } from "./page"

function resolveSafeRedirect(rawValue: string | null): string {
  if (!rawValue) return "/chat"
  if (!rawValue.startsWith("/")) return "/chat"
  if (rawValue.startsWith("//")) return "/chat"
  return rawValue
}

export function HomePageWithAuth() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { openSignIn } = useClerk()
  const hasOpenedSignInRef = useRef(false)

  const authIntent = useMemo(() => {
    const shouldOpenSignIn = searchParams.get("signin") === "true"
    const redirectTo = resolveSafeRedirect(searchParams.get("redirect"))

    return { shouldOpenSignIn, redirectTo }
  }, [searchParams])

  useEffect(() => {
    if (!authIntent.shouldOpenSignIn) {
      hasOpenedSignInRef.current = false
      return
    }

    // Always remove auth intent params so refresh/back does not reopen modal unexpectedly.
    router.replace(pathname)

    if (isSignedIn) {
      router.replace(authIntent.redirectTo)
      return
    }

    if (hasOpenedSignInRef.current) {
      return
    }

    hasOpenedSignInRef.current = true
    openSignIn({
      forceRedirectUrl: authIntent.redirectTo,
      fallbackRedirectUrl: authIntent.redirectTo,
    })
  }, [authIntent, isSignedIn, openSignIn, pathname, router])

  return <HomePage />
}
