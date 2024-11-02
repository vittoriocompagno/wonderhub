"use client";

import { FormNavigation } from "@/app/components/FormNavigation";
import { SelectCategory } from "@/app/components/SelectCategory";
import { createListPage } from "@/app/actions";
import { useState } from "react";
import { useParams } from "next/navigation";

const PropertyPage = () => {
  const { id: propertyId } = useParams();
  const [category, setCategory] = useState("");

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleFormAction = async (formData: FormData) => {
    // Ensure propertyId is added to formData before submission
    formData.append("propertyId", propertyId as string);
    return createListPage(formData);
  };

  return (
    <div className="relative min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Choose Your Property Type
          </h1>
          <p className="text-muted-foreground mt-2">
            Select the category that best describes your property
          </p>
        </div>

        <form action={handleFormAction}>
          <div className="w-full">
            <SelectCategory 
              name="category" 
              onCategorySelect={handleCategorySelect}
            />
          </div>

          <FormNavigation 
            backLink="/" 
            isNextDisabled={!category}
          />
        </form>
      </div>
    </div>
  );
};

export default PropertyPage;