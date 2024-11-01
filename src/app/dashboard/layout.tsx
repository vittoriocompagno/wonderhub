import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { DashboardNav } from "./components/DashboardNav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import { SiteLoader } from "@/app/components/SiteLoader";
import { Suspense } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database connection timeout')), 5000);
    });

    const dbUserPromise = prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    const dbUser = await Promise.race([dbUserPromise, timeoutPromise]);

    if (!dbUser) {
      return redirect("/");
    }
  } catch (error) {
    console.error("Database connection error:", error);
    
    if (error instanceof Error && error.message.includes('connection')) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Connection Error</h2>
            <p className="text-muted-foreground">Unable to connect to database. Please try again later.</p>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      );
    }

    throw error;
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <Suspense fallback={<SiteLoader scenario="dashboard" />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
