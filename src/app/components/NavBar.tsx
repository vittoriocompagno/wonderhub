import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/vercel.svg";
import { UserNav } from "./UserNav";

// Function component for the navigation bar
export function Navbar() {
  return (
    // Main navigation element with styling for full width, border, and background
    <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Container for the navigation content, centered and spaced */}
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-2 sm:px-4">
        {/* Link to the homepage with logo and text */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Logo image with specified dimensions and priority loading */}
          <Image
            src={Logo}
            alt="WonderHub Logo"
            className="w-6 h-6 sm:w-8 sm:h-8"
            width={32}
            height={32}
            priority
          />
          {/* Brand name, hidden on small screens */}
          <span className="text-sm sm:text-base font-bold">WonderHub</span>
        </Link>

        {/* User navigation component */}
        <UserNav />
      </div>
    </nav>
  );
}