"use client"

import { StepProgress } from "./StepProgress"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { SubmitButton } from "./SubmitButton"

interface FormNavigationProps {
  backLink: string
  showBackButton?: boolean
  propertyId?: string
  isNextDisabled?: boolean
  isLoading?: boolean
  nextButtonText?: string
}

export const FormNavigation = ({
  backLink,
  showBackButton = false,
  isNextDisabled = false,
  isLoading = false,
  nextButtonText
}: FormNavigationProps) => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(backLink)
  }

  return (
    <>
      {/* Desktop navigation - hidden on mobile */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-8 hidden md:flex">
        <StepProgress />
        <div className="flex gap-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-full border shadow-sm">
          {showBackButton ? (
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full"
              onClick={handleBack}
            >
              ←
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full"
              onClick={handleCancel}
            >
              ×
            </Button>
          )}
          <SubmitButton 
            disabled={isNextDisabled} 
            nextButtonText={nextButtonText}
            variant="pill"
          />
        </div>
      </div>

      {/* Mobile navigation - fixed at bottom center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden">
        <div className="flex gap-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-full border shadow-sm">
          {showBackButton ? (
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full"
              onClick={handleBack}
            >
              ←
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full"
              onClick={handleCancel}
            >
              ×
            </Button>
          )}
          <SubmitButton 
            disabled={isNextDisabled} 
            nextButtonText={nextButtonText}
            variant="pill"
          />
        </div>
      </div>
    </>
  )
}