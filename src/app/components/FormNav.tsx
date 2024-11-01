"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./SubmitButton";

interface FormNavProps {
    backLink: string;
    showBackButton?: boolean;
    propertyId?: string;
    isNextDisabled?: boolean;
    isLoading?: boolean;
    nextButtonText?: string;
}

export function FormNav({ backLink, showBackButton = false, propertyId, isNextDisabled = false, isLoading = false, nextButtonText }: FormNavProps) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(backLink);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm shadow-[0_-1px_3px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4 justify-center items-center w-full sm:w-1/2 mx-auto">
                    {showBackButton ? (
                        <Button 
                            variant="outline" 
                            size="default"
                            className="w-full text-sm sm:text-base"
                            onClick={handleBack}
                        >
                            Go Back
                        </Button>
                    ) : (
                        <Button 
                            variant="outline" 
                            size="default" 
                            className="w-full text-sm sm:text-base"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <div className="w-full">
                        <SubmitButton disabled={isNextDisabled} nextButtonText={nextButtonText} />
                    </div>
                </div>
            </div>
        </div>
    );
} 