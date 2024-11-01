"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Home,
  Settings,
  PlusCircle,
  LayoutGrid,
  BarChart,
  type LucideIcon
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: LayoutGrid,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart,
  },
  {
    title: "Add Property",
    href: "/dashboard/add",
    icon: PlusCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface DashboardNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[]
}

export const DashboardNav = ({ 
  className, 
  items = navItems, 
  ...props 
}: DashboardNavProps) => {
  const pathname = usePathname()

  return (
    <nav 
      className={cn("px-4 py-6", className)} 
      {...props}
    >
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="flex flex-col space-y-2">
          {items.map((item) => (
            <NavItem key={item.href} item={item} isActive={pathname === item.href} />
          ))}
        </div>
      </ScrollArea>
    </nav>
  )
}

interface NavItemProps {
  item: NavItem
  isActive?: boolean
}

const NavItem = React.memo(({ item, isActive }: NavItemProps) => (
  <Button
    asChild
    variant={isActive ? "secondary" : "ghost"}
    className={cn(
      "w-full justify-start",
      isActive ? "bg-secondary text-secondary-foreground" : "hover:bg-transparent hover:underline"
    )}
  >
    <Link href={item.href}>
      <item.icon className="mr-3 h-5 w-5" />
      {item.title}
    </Link>
  </Button>
))

NavItem.displayName = "NavItem"