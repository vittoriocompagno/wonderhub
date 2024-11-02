"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./SubmitButton";
import { StepProgress } from "./StepProgress";

interface FormNavProps {
    backLink: string;
    showBackButton?: boolean;
    propertyId?: string;
    isNextDisabled?: boolean;
    isLoading?: boolean;
    nextButtonText?: string;
}

export const FormNav = ({ 
    backLink, 
    showBackButton = false, 
    isNextDisabled = false, 
    isLoading = false, 
    nextButtonText 
}: FormNavProps) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(backLink);
    };

    return (
        <>
            {/* Desktop Layout */}
            <div className="fixed right-8 hidden md:flex md:flex-col md:gap-4">
                <StepProgress />
                <div className="w-[368px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-3xl border shadow-lg">
                    <div className="flex flex-col gap-2">
                        <SubmitButton 
                            disabled={isNextDisabled} 
                            nextButtonText={nextButtonText}
                        />
                        {showBackButton ? (
                            <Button 
                                variant="outline" 
                                className="w-full rounded-full h-12"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        ) : (
                            <Button 
                                variant="outline" 
                                className="w-full rounded-full h-12"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] md:hidden">
                <div className="flex gap-2 justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 rounded-3xl border shadow-lg">
                    {showBackButton ? (
                        <Button 
                            variant="outline" 
                            className="flex-1 rounded-full h-12"
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    ) : (
                        <Button 
                            variant="outline" 
                            className="flex-1 rounded-full h-12"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <div className="flex-1">
                        <SubmitButton 
                            disabled={isNextDisabled} 
                            nextButtonText={nextButtonText}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}; 