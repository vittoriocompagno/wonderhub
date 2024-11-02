"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { DashboardProperties } from "./types";

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
          eventType: 'pageView'
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
          eventType: 'pageView'
        }
      }
    }
  });
} 


const updatePropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
});

export async function updateProperty(propertyId: string, data: z.infer<typeof updatePropertySchema>) {
  const validated = updatePropertySchema.parse(data);

  return await prisma.property.update({
    where: { id: propertyId },
    data: validated,
  });
}