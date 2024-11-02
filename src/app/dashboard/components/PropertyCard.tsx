"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DeletePropertyButton } from "./DeletePropertyButton";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string;
    userId: string;
    title: string | null;
    description: string | null;
    imageUrl: string | null;
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "overflow-hidden relative",
        isDeleting && "pointer-events-none"
      )}>
        {isDeleting && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        <CardHeader className="p-0">
          {property.imageUrl ? (
            <div className="aspect-square relative">
              <Image
                src={property.imageUrl}
                alt={property.title || 'Property image'}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">
            {property.title || 'Untitled Property'}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {property.description || 'No description available'}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button asChild variant="outline">
            <Link href={`/dashboard/${property.id}`}>
              View Details
            </Link>
          </Button>
          <DeletePropertyButton 
            propertyId={property.id}
            userId={property.userId}
            size="sm"
            onDeleteStart={() => setIsDeleting(true)}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}; 