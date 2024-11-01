"use client";

import { createDescriptionPage } from "@/app/actions";
import { FormNav } from "@/app/components/FormNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DescriptionPage() {
    const { id: propertyId } = useParams();
    const router = useRouter();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const handleInputChange = useCallback(() => {
        setIsFormValid(!!title && !!description);
    }, [title, description]);

    const handleImageChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    const container = document.getElementById("image-container");
                    if (container) {
                        container.style.backgroundImage = `url(${e.target.result as string})`;
                        setImageLoaded(true);
                    }
                }
            };
            reader.readAsDataURL(file);
            handleInputChange();
        },
        [handleInputChange]
    );

    const handleClearImage = useCallback(() => {
        const container = document.getElementById("image-container");
        if (container) {
            container.style.backgroundImage = "none";
            setImageLoaded(false);
        }
        handleInputChange();
    }, [handleInputChange]);

    const handleFormAction = async (formData: FormData) => {
        const result = await createDescriptionPage(formData);
        
        if (result.error) {
            toast.error(result.error);
            return;
        }
        
        if (result.success) {
            router.push(`/create/${propertyId}/address`);
        }
    };

    return (
        <div className="container mx-auto text-center px-4 sm:px-6 py-6 sm:py-10">
            <div className="w-full sm:w-4/5 lg:w-3/5 mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Add Public Property Information
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">
                    Fill in the details below to create your page
                </p>
            </div>

            <form
                action={handleFormAction}
                encType="multipart/form-data"
                className="mt-6 sm:mt-10 max-w-3xl mx-auto space-y-6 sm:space-y-8"
            >
                <input type="hidden" name="propertyId" value={propertyId} />

                {/* Title Input */}
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <div className="relative">
                        <Input
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                handleInputChange();
                            }}
                            placeholder="Enter a title for your property"
                            className="pr-10"
                            required
                        />
                        {title && (
                            <Button
                                type="button"
                                variant="ghost"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto"
                                onClick={() => {
                                    setTitle("");
                                    handleInputChange();
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <div className="relative">
                        <Textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                handleInputChange();
                            }}
                            placeholder="Describe your property"
                            className="min-h-[150px] pr-10"
                            required
                        />
                        {description && (
                            <Button
                                type="button"
                                variant="ghost"
                                className="absolute right-2 top-2 p-1 h-auto"
                                onClick={() => {
                                    setDescription("");
                                    handleInputChange();
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <Label htmlFor="image">Property Image</Label>
                    <div
                        id="image-container"
                        className="relative w-full h-64 border-2 border-dashed rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat"
                    >
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        {!imageLoaded && (
                            <label
                                htmlFor="image"
                                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                            >
                                <PlusCircle className="w-12 h-12 text-gray-400" />
                                <span className="mt-2 text-sm text-gray-500">
                                    Click to upload image (max 5MB)
                                </span>
                            </label>
                        )}
                        {imageLoaded && (
                            <Button
                                type="button"
                                variant="secondary"
                                className="absolute top-2 right-2"
                                onClick={handleClearImage}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                <FormNav
                    backLink="/"
                    showBackButton={true}
                    propertyId={propertyId as string}
                    isNextDisabled={!isFormValid}
                />
            </form>
        </div>
    );
}