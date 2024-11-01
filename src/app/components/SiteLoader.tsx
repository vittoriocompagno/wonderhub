"use client";

import { Loader2 } from "lucide-react";

type LoadingScenario = 
  | "dashboard"
  | "properties"
  | "profile"
  | "default";

interface SiteLoaderProps {
  scenario?: LoadingScenario;
  customMessage?: string;
}

const loadingMessages: Record<LoadingScenario, string> = {
  dashboard: "Loading your dashboard...",
  properties: "Adding a new property...",
  profile: "Loading your profile...",
  default: "Loading..."
};

export const SiteLoader = ({ 
  scenario = "default",
  customMessage
}: SiteLoaderProps) => {
  const message = customMessage ?? loadingMessages[scenario];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-primary">{message}</p>
      </div>
    </div>
  );
} 