// Import necessary dependencies and types
import type { Metadata } from "next"; // For defining page metadata
import "./globals.css"; // Global styles
import { Navbar } from "./components/NavBar"; // Navigation component
import Footer from "./components/Footer"; // Footer component
import { LoadingProvider } from "./components/LoadingProvider";
import { Toaster } from "sonner";
import { Montserrat } from 'next/font/google';

// Initialize Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

// Define metadata for the application
export const metadata: Metadata = {
  title: "WonderHub",
  description: "Your property management solution",
};

// RootLayout component that wraps the entire application
export default function RootLayout({
  children, // Child components to be rendered within the layout
}: Readonly<{
  children: React.ReactNode; // Type definition for children prop
}>) {
  return (
    // Root HTML element with Italian language and dark theme
    <html lang="en" className={montserrat.className}>
      {/* Body element with background and text colors from theme */}
      <body className="bg-background text-foreground min-h-screen">
        <LoadingProvider>
          <Navbar/> {/* Navigation bar at the top */}
          <main>{children}</main>
          <Footer /> {/* Footer at the bottom */}
          <Toaster />
        </LoadingProvider>
      </body>
    </html>
  );
}
