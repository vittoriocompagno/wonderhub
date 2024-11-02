"use client"

import { usePathname } from "next/navigation"
import { Check, Home, FileText, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { path: "property", icon: Home },
  { path: "description", icon: FileText },
  { path: "address", icon: MapPin },
]

export function StepProgress() {
  const pathname = usePathname()
  const currentStep = steps.findIndex(step => pathname.includes(step.path)) + 1
  const progress = (currentStep / steps.length) * 100

  return (
    <div className="flex items-center gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-3xl border shadow-lg">
      {/* Progress bar */}
      <div className="h-[300px] w-1 bg-muted rounded-full relative">
        <div 
          className="absolute top-0 left-0 right-0 bg-primary rounded-full transition-all duration-500 ease-in-out"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex flex-col justify-between h-[300px]">
        {steps.map((step, index) => {
          const StepIcon = step.icon
          const isCompleted = index + 1 < currentStep
          const isCurrent = index + 1 === currentStep

          return (
            <div 
              key={step.path}
              className={cn(
                "relative flex items-center transition-colors",
                isCompleted || isCurrent ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
                isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                isCurrent ? "border-primary" : "border-muted-foreground"
              )}>
                {isCompleted ? (
                  <Check className="w-4 w-4" />
                ) : (
                  <StepIcon className="w-4 h-4" />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}