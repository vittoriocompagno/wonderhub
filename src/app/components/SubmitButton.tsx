"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    disabled?: boolean;
    isLoading?: boolean;
    nextButtonText?: string;
    variant?: 'default' | 'pill';
}

// Define the SubmitButton component
export function SubmitButton({ 
    disabled = false, 
    isLoading = false, 
    nextButtonText = "Next",
    variant = 'default'
}: SubmitButtonProps) {
    // Destructure the 'pending' state from useFormStatus hook
    const { pending } = useFormStatus();

    if (variant === 'pill') {
        return (
            <Button 
                type="submit" 
                size="icon"
                className="rounded-full" 
                disabled={disabled || pending}
            >
                {pending ? (
                    <Loader2 className="h-4 w-4 animate-spin"/>
                ) : (
                    "→"
                )}
            </Button>
        );
    }

    return (
        <Button 
            type="submit" 
            size="lg" 
            className="w-full" 
            disabled={disabled || pending}
        >
            {pending ? (
                <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                    Processing
                </>
            ) : (
                <>
                    {nextButtonText}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                    </svg>
                </>
            )}
        </Button>
    );
}