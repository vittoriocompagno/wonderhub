"use client";

import { useState } from "react";
import { Property } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit2, Save, X } from "lucide-react";
import { PropertyForm } from "./PropertyForm";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomGrid } from "./RoomGrid";
import { PropertyAnalytics } from "./PropertyAnalytics";

interface PropertyDetailsProps {
  property: Property & {
    analytics: any[];
  };
}

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {property.title || "Untitled Property"}
          </h1>
          <p className="text-muted-foreground">
            {property.address || "No address provided"}
          </p>
        </div>
        <Button
          variant={isEditing ? "ghost" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" /> Cancel
            </>
          ) : (
            <>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Property
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="p-0">
            <div className="aspect-video relative">
              {property.imageUrl ? (
                <Image
                  src={property.imageUrl}
                  alt={property.title || "Property image"}
                  fill
                  className="object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {isEditing ? (
              <PropertyForm 
                property={property} 
                onSuccess={() => setIsEditing(false)} 
              />
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-muted-foreground">
                    {property.description || "No description available"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Category</h3>
                  <Badge variant="secondary" className="mt-1">
                    {property.category || "Uncategorized"}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="rooms" className="flex-1">
          <TabsList>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="rooms" className="mt-6">
            <RoomGrid propertyId={property.id} />
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <PropertyAnalytics analytics={property.analytics} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};