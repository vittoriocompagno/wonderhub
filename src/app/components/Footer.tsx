import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="border-t backdrop-blur-sm bg-background/80"> {/* Footer with border and background styling */}
      <div className="container mx-auto px-4 py-8"> {/* Container for content with padding */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4"> {/* Responsive grid layout */}
          <div className="space-y-4"> {/* First column with spacing */}
            <Link href="/" className="flex items-center space-x-2"> {/* Link to homepage with flex layout */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              > {/* SVG logo */}
                <circle cx="12" cy="12" r="10" /> {/* Outer circle of the logo */}
                <line x1="2" y1="12" x2="22" y2="12" /> {/* Horizontal line */}
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /> {/* Path for logo design */}
              </svg>
              <span className="font-bold">Acme Inc</span> {/* Company name */}
            </Link>
            <p className="text-sm text-muted-foreground">
              Making the world a better place through constructing elegant hierarchies. {/* Company slogan */}
            </p>
          </div>
          <div> {/* Second column for company links */}
            <h3 className="mb-4 font-semibold">Company</h3> {/* Section title */}
            <ul className="space-y-2 text-sm"> {/* List of company links */}
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-foreground">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div> {/* Third column for legal links */}
            <h3 className="mb-4 font-semibold">Legal</h3> {/* Section title */}
            <ul className="space-y-2 text-sm"> {/* List of legal links */}
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div> {/* Fourth column for newsletter subscription */}
            <h3 className="mb-4 font-semibold">Newsletter</h3> {/* Section title */}
            <form className="space-y-2"> {/* Form for email subscription */}
              <Input type="email" placeholder="Enter your email" /> {/* Email input field */}
              <Button type="submit" className="w-full">
                Subscribe {/* Subscribe button */}
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8"> {/* Bottom section with border */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row"> {/* Flex layout for footer bottom */}
            <p className="text-center text-sm text-muted-foreground">
              © 2024 Acme Inc. All rights reserved. {/* Copyright notice */}
            </p>
            <div className="flex space-x-4"> {/* Placeholder for additional links or icons */}

            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}