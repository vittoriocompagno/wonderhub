"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "it", name: "Italiano", flag: "🇮🇹" }
] as const

export const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  
  const currentLang = pathname.split('/')[1] || 'en'
  
  const handleLanguageChange = (lang: string) => {
    const newPath = pathname === '/' 
      ? `/${lang}` 
      : pathname.replace(/^\/[^\/]+/, `/${lang}`)
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {languages.find(l => l.code === currentLang)?.flag}
          <span className="hidden sm:inline">
            {languages.find(l => l.code === currentLang)?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`gap-2 ${currentLang === lang.code ? "bg-accent" : ""}`}
          >
            {lang.flag} {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 