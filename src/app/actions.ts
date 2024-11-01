"use server";

import prisma from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { z } from "zod";

// Zod schema for validating form data with preprocessing
const descriptionSchema = z.object({
  description: z.preprocess((val) => (typeof val === "string" ? val : ""), z.string().min(1, "Description is required")),
  title: z.preprocess((val) => (typeof val === "string" ? val : ""), z.string().min(1, "Title is required")),
  propertyId: z.preprocess((val) => (typeof val === "string" ? val : ""), z.string().min(1, "Property ID is required")),
  image: z.preprocess(
    (val) => (val instanceof File ? val : undefined),
    z.instanceof(File).optional()
  ),
});

// Function to create or redirect based on existing data
export async function createList(userId: string) {
  await cleanupIncompleteProperties(userId);

  const data = await prisma.property.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!data) {
    const newProperty = await prisma.property.create({
      data: { userId },
    });
    return redirect(`/create/${newProperty.id}/property`);
  } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
    return redirect(`/create/${data.id}/property`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else {
    const newProperty = await prisma.property.create({
      data: { userId },
    });
    return redirect(`/create/${newProperty.id}/property`);
  }
}

// Function to handle form submission for creating a list page
export async function createListPage(formData: FormData) {
  const propertyId = formData.get("propertyId");
  
  if (!propertyId || typeof propertyId !== "string") {
    throw new Error("Property ID is required");
  }

  const property = await prisma.property.update({
    where: { id: propertyId },
    data: {
      addedCategory: true,
    },
  });

  return redirect(`/create/${property.id}/description`);
}

// Function to handle description page submission with image upload
export async function createDescriptionPage(formData: FormData) {
  try {
    const parsed = descriptionSchema.safeParse({
      description: formData.get("description"),
      title: formData.get("title"),
      propertyId: formData.get("propertyId"),
      image: formData.get("image"),
    });

    if (!parsed.success) {
      return { error: parsed.error.errors.map((e) => e.message).join(", ") };
    }

    const { description, title, propertyId, image } = parsed.data;

    let imageUrl: string | null = null;

    if (image) {
      console.log('File type:', image.type);
      console.log('File size:', image.size);
      const fileName = `${Date.now()}-${image.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const { data: uploadedImage, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, image, {
          cacheControl: "2592000",
          contentType: image.type,
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return { error: "Failed to upload image" };
      }

      if (uploadedImage?.path) {
        const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(uploadedImage.path);
        imageUrl = publicUrl.publicUrl;
      }
    }

    await prisma.property.update({
      where: { id: propertyId },
      data: {
        description,
        title,
        imageUrl,
        addedDescription: true,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

// Function to clean up incomplete properties
export async function cleanupIncompleteProperties(userId: string) {
  await prisma.property.deleteMany({
    where: {
      userId,
      addedCategory: true,
      addedDescription: false,
      addedLocation: false,
    },
  });
}

// Function to fetch address suggestions
export async function fetchAddressSuggestions(text: string) {
  if (text.length < 3) return [];

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        text
      )}&apiKey=${process.env.GEOAPIFY_KEY}`,
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data.features.map((feature: any) => ({
      formatted: feature.properties.formatted,
      lat: feature.properties.lat,
      lon: feature.properties.lon,
    }));
  } catch (error) {
    console.error("Error fetching address suggestions:", error);
    return [];
  }
}

// Function to update property address
export async function updatePropertyAddress(
  propertyId: string,
  address: string,
  lat: number,
  lon: number
) {
  try {
    await prisma.property.update({
      where: { id: propertyId },
      data: { address, addedLocation: true },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating property:", error);
    return { success: false, error: "Failed to update property" };
  }
}