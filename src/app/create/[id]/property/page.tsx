"use client";

import { createListPage } from "@/app/actions";
import { FormNav } from "@/app/components/FormNav";
import { SelectCategory } from "@/app/components/SelectCategory";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function PropertyPage() {
    const { id: propertyId } = useParams();
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSubmit = async (formData: FormData) => {
        if (!selectedCategory) return;
        return createListPage(formData);
    };

    return (
        <div className="min-h-screen p-4 sm:mt-10">
            <div className="max-w-5xl justify-center text-center mx-auto px-2 sm:px-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Add a Page</h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">Fill in the details below to create your page</p>
            </div>
            <form action={handleSubmit} className="max-w-6xl mx-auto space-y-6 sm:space-y-8 mt-6 sm:mt-8">
                {propertyId && (
                    <input type="hidden" name="propertyId" value={propertyId} />
                )}
                <SelectCategory onCategorySelect={setSelectedCategory} />
                <div className="flex justify-end">
                    <FormNav backLink="/" isNextDisabled={!selectedCategory} />
                </div>
            </form>
        </div>
    );
}