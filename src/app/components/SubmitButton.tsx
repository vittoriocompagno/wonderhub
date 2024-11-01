"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    disabled?: boolean;
    isLoading?: boolean;
    nextButtonText?: string;
}

// Define the SubmitButton component
export function SubmitButton({ disabled = false, isLoading = false, nextButtonText = "Next" }: SubmitButtonProps) {
    // Destructure the 'pending' state from useFormStatus hook
    const { pending } = useFormStatus();

    // Return the JSX for the button
    return (
        <>
          {pending ? ( // If the form is pending (submitting)
            <Button type="submit" size="lg" className="w-full" disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin"/> {/* Show a spinning loader icon */}
              Processing {/* Display 'Processing' text */}
            </Button>
          ) : ( // If the form is not pending
            <Button type="submit" size="lg" className="w-full" disabled={disabled}>
              {nextButtonText} {/* Display 'Next' text */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/> {/* Draw a horizontal line */}
                <path d="m12 5 7 7-7 7"/> {/* Draw an arrow pointing right */}
              </svg>
            </Button>
          )}

        </>
    )
}