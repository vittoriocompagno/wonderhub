"use client";

import { z } from "zod";
import { useFormState } from "react-dom";
import { createListPage } from "@/app/actions";
import { FormNav } from "@/app/components/FormNav";
import { SelectCategory as SelectCategoryComponent } from "@/app/components/SelectCategory";

// Define form validation schema
const formSchema = z.object({
  propertyId: z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

// Define form state type
type FormState = {
  errors?: {
    category?: string[];
  };
  message?: string | null;
};

// Create custom hook to manage form state
const usePropertyForm = (propertyId?: string) => {
  // Initialize form state with server action
  const [state, formAction] = useFormState<FormState, FormData>(
    async (prevState, formData) => {
      const category = formData.get("category") as string;
      
      // Validate form data
      const result = formSchema.safeParse({ propertyId, category });
      if (!result.success) {
        return {
          errors: result.error.flatten().fieldErrors,
          message: "Validation failed"
        };
      }

      // Submit form if validation passes
      return createListPage(formData);
    },
    { errors: {}, message: null }
  );

  return { state, formAction };
};

// Update props type for SelectCategory
type SelectCategoryProps = {
  name: string;
  onCategorySelect: (category: string) => void;
};

// Update the imported SelectCategory component's props
const SelectCategory = ({ name, onCategorySelect }: SelectCategoryProps) => {
  // ... existing SelectCategory implementation ...
};

const PropertyForm = ({ propertyId }: { propertyId?: string }) => {
  const { state, formAction } = usePropertyForm(propertyId);

  return (
    <form 
      action={formAction}
      className="max-w-6xl mx-auto space-y-6 sm:space-y-8 mt-6 sm:mt-8"
    >
      {/* Hidden property ID field for edit mode */}
      {propertyId && (
        <input type="hidden" name="propertyId" value={propertyId} />
      )}

      {/* Category selection with error handling */}
      <div>
        <SelectCategoryComponent name="category" onCategorySelect={() => {}} />
        {state.errors?.category && (
          <p className="text-sm text-red-500 mt-1">
            {state.errors.category[0]}
          </p>
        )}
      </div>

      {/* Form navigation */}
      <div className="flex justify-end">
        <FormNav 
          backLink="/" 
          isNextDisabled={!!state.errors?.category}
        />
      </div>
    </form>
  );
};

export default PropertyForm;