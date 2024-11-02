"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateProperty } from "../actions";
import { toast } from "sonner";
import { Property } from "@prisma/client";

interface ExtendedProperty extends Property {
  customLinks?: Array<{ title: string; url: string }>;
  reviewLinks: Array<{ title: string; url: string }> | null;
}

const linkSchema = z.object({
  title: z.string().min(1, "Link title is required"),
  url: z.string().url("Invalid URL"),
});

const propertyFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  customLinks: z.array(linkSchema).optional(),
  reviewLinks: z.array(linkSchema).optional(),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface PropertyFormProps {
  property: ExtendedProperty;
  onSuccess: () => void;
  mode: 'details' | 'links';
}

export const PropertyForm = ({ property, onSuccess, mode }: PropertyFormProps) => {
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: property.title ?? '',
      description: property.description ?? '',
      category: property.category ?? '',
      customLinks: property.customLinks || [],
      reviewLinks: property.reviewLinks || [],
    },
  });

  const { fields: customLinkFields, append: appendCustomLink } = useFieldArray({
    control: form.control,
    name: "customLinks",
  });

  const { fields: reviewLinkFields, append: appendReviewLink } = useFieldArray({
    control: form.control,
    name: "reviewLinks",
  });

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      const updateData = {
        title: mode === 'details' ? data.title : property.title ?? '',
        ...(mode === 'details' 
          ? {
              description: data.description,
              category: data.category,
            }
          : {
              reviewLinks: data.reviewLinks,
              customLinks: data.customLinks,
            }),
      };

      await updateProperty(property.id, updateData);
      toast.success("Property updated successfully");
      onSuccess();
    } catch (error) {
      toast.error("Failed to update property");
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {mode === 'details' ? (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <div>
              <h3 className="font-semibold">Custom Links</h3>
              {customLinkFields.map((field, index) => (
                <div key={field.id} className="flex space-x-2">
                  <FormField
                    control={form.control}
                    name={`customLinks.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`customLinks.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button type="button" onClick={() => appendCustomLink({ title: "", url: "" })}>
                Add Custom Link
              </Button>
            </div>
            <div>
              <h3 className="font-semibold">Review Links</h3>
              {reviewLinkFields.map((field, index) => (
                <div key={field.id} className="flex space-x-2">
                  <FormField
                    control={form.control}
                    name={`reviewLinks.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`reviewLinks.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button type="button" onClick={() => appendReviewLink({ title: "", url: "" })}>
                Add Review Link
              </Button>
            </div>
          </>
        )}
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};