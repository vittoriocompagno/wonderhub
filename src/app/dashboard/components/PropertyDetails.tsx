"use client";

import { useState } from "react";
import { Property } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit2, Save, X, Link2, Star } from "lucide-react";
import { PropertyForm } from "./PropertyForm";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomGrid } from "./RoomGrid";
import { PropertyAnalytics } from "./PropertyAnalytics";
import { DeletePropertyButton } from "./DeletePropertyButton";

interface PropertyDetailsProps {
  property: Property & {
    analytics: any[];
    customLinks?: { title: string; url: string }[];
    reviewLinks?: { title: string; url: string }[];
  };
}

export const PropertyDetails = ({ property }: PropertyDetailsProps) => {
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

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
        <DeletePropertyButton 
          propertyId={property.id} 
          userId={property.userId}
          variant="destructive"
          size="sm"
          isPropertyPage
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <h3 className="font-semibold">Property Details</h3>
            <Button
              variant={isEditingDetails ? "ghost" : "outline"}
              size="sm"
              onClick={() => setIsEditingDetails(!isEditingDetails)}
            >
              {isEditingDetails ? (
                <>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" /> Edit Details
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {isEditingDetails ? (
              <PropertyForm 
                property={property} 
                onSuccess={() => setIsEditingDetails(false)}
                mode="details"
              />
            ) : (
              <div className="space-y-4">
                <div className="aspect-video relative">
                  {property.imageUrl ? (
                    <Image
                      src={property.imageUrl}
                      alt={property.title || "Property image"}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <h3 className="font-semibold">Property Links</h3>
            <Button
              variant={isEditingLinks ? "ghost" : "outline"}
              size="sm"
              onClick={() => setIsEditingLinks(!isEditingLinks)}
            >
              {isEditingLinks ? (
                <>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" /> Edit Links
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {isEditingLinks ? (
              <PropertyForm 
                property={property} 
                onSuccess={() => setIsEditingLinks(false)}
                mode="links"
              />
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Custom Links</h4>
                  <ul className="space-y-2">
                    {(property.customLinks ?? []).map((link, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                    {(property.customLinks ?? []).length === 0 && (
                      <p className="text-sm text-muted-foreground">No custom links added</p>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">Review Links</h4>
                  <ul className="space-y-2">
                    {(property.reviewLinks ?? []).map((link, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                    {(property.reviewLinks ?? []).length === 0 && (
                      <p className="text-sm text-muted-foreground">No review links added</p>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};