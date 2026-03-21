"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: "class" | `data-${string}`
  enableSystem?: boolean
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTheme(theme: Theme, enableSystem: boolean): ResolvedTheme {
  if (theme === "system") {
    return enableSystem ? getSystemTheme() : "light"
  }

  return theme
}

function applyThemeToDocument(theme: ResolvedTheme, attribute: ThemeProviderProps["attribute"]) {
  const root = document.documentElement

  if (attribute === "class") {
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  } else {
    root.setAttribute(attribute ?? "data-theme", theme)
  }

  root.style.colorScheme = theme
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  attribute = "class",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>("light")

  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey) as Theme | null
    const initialTheme = savedTheme ?? defaultTheme
    const initialResolved = resolveTheme(initialTheme, enableSystem)

    setThemeState(initialTheme)
    setResolvedTheme(initialResolved)
    applyThemeToDocument(initialResolved, attribute)
  }, [attribute, defaultTheme, enableSystem, storageKey])

  React.useEffect(() => {
    if (!enableSystem || theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleSystemThemeChange = () => {
      const nextResolvedTheme = getSystemTheme()
      setResolvedTheme(nextResolvedTheme)
      applyThemeToDocument(nextResolvedTheme, attribute)
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
  }, [attribute, enableSystem, theme])

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme)
      window.localStorage.setItem(storageKey, nextTheme)

      const nextResolvedTheme = resolveTheme(nextTheme, enableSystem)
      setResolvedTheme(nextResolvedTheme)
      applyThemeToDocument(nextResolvedTheme, attribute)
    },
    [attribute, enableSystem, storageKey]
  )

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [resolvedTheme, setTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}

