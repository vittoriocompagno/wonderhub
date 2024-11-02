"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { DashboardProperties } from "./types";
import { Prisma } from "@prisma/client";

const userIdSchema = z.string().min(1, "User ID is required");
const propertyIdSchema = z.string().min(1, "Property ID is required");

export async function getDashboardProperties(userId: string | undefined): Promise<DashboardProperties> {
  if (!userId) {
    return [];
  }

  const parsedUserId = userIdSchema.parse(userId);
  
  return await prisma.property.findMany({
    where: {
      userId: parsedUserId,
    },
    include: {
      analytics: {
        where: {
          eventType: 'PROPERTY_VIEW'
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getProperty(propertyId: string, userId: string) {
  if (!propertyId || !userId) {
    return null;
  }

  const parsedPropertyId = propertyIdSchema.parse(propertyId);
  const parsedUserId = userIdSchema.parse(userId);

  return await prisma.property.findFirst({
    where: {
      id: parsedPropertyId,
      userId: parsedUserId,
    },
    include: {
      analytics: {
        where: {
          eventType: 'PROPERTY_VIEW'
        }
      }
    }
  });
} 


const updatePropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  reviewLinks: z.array(z.object({
    title: z.string().min(1, "Link title is required"),
    url: z.string().url("Invalid URL"),
  })).optional(),
});

export async function updateProperty(propertyId: string, data: z.infer<typeof updatePropertySchema>) {
  const validated = updatePropertySchema.parse(data);

  return await prisma.property.update({
    where: { id: propertyId },
    data: {
      ...validated,
      reviewLinks: data.reviewLinks ? JSON.stringify(data.reviewLinks) : Prisma.JsonNull,
    },
  });
}

const deletePropertySchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

export async function deleteProperty(propertyId: string, userId: string) {
  try {
    const validated = deletePropertySchema.parse({ propertyId, userId });
    
    // Delete the property and all related data
    await prisma.property.delete({
      where: {
        id: validated.propertyId,
        userId: validated.userId, // Ensure user owns the property
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting property:", error);
    return { error: "Failed to delete property" };
  }
}