"use client";

import React from "react";
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container mx-auto text-center px-4 sm:px-6 py-6 sm:py-10">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          Property Added Successfully!
        </h1>
        <p className="text-muted-foreground mb-8">
          Your property has been successfully added to our platform.
        </p>
        <Link href="/dashboard">
          <Button className="w-full">Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
} 