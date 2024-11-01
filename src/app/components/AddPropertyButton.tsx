"use client";

import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { useLoading } from "./LoadingProvider";
import { useRouter } from "next/navigation";

interface AddPropertyButtonProps {
    createListId: () => Promise<void>;
}

export function AddPropertyButton({ createListId }: AddPropertyButtonProps) {
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const { setIsLoading } = useLoading();
    const router = useRouter();

    const handleAddProperty = async () => {
        setIsButtonLoading(true);
        setIsLoading(true);
        try {
            await createListId();
        } catch (error) {
            console.error("Error creating property:", error);
        } finally {
            setIsButtonLoading(false);
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenuItem asChild>
            <button 
                onClick={handleAddProperty}
                className="w-full text-left cursor-pointer flex items-center gap-2 px-2 py-1.5" 
                disabled={isButtonLoading}
            >
                {isButtonLoading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                    </>
                ) : (
                    "Add a Property"
                )}
            </button>
        </DropdownMenuItem>
    );
} 