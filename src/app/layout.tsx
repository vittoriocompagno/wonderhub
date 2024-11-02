import type { Metadata } from "next"
import "./globals.css"
import { LoadingProvider } from "./components/LoadingProvider"
import { Toaster } from "sonner"
import { Montserrat } from 'next/font/google'
import Footer from "./components/Footer"
import { Navbar } from "./components/NavBar"
import { AuthProvider } from "./AuthProvider"
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  adjustFontFallback: true
})

export const metadata: Metadata = {
  title: "WonderHub",
  description: "Your property management solution",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body className="bg-background text-foreground">
        {/* Move Toaster outside of providers */}
        <Toaster />
        {/* Wrap KindeProvider with "use client" */}
        <AuthProvider>
          <LoadingProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}