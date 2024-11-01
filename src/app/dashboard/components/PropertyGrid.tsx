import Link from "next/link";
import { DashboardProperties } from "../types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PropertyGridProps {
  properties: DashboardProperties;
}

export const PropertyGrid = ({ properties }: PropertyGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg">
        <h3 className="text-lg font-medium">No properties found</h3>
        <p className="text-muted-foreground mt-2">Get started by adding your first property.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/add">Add Property</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
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
          <CardFooter className="p-4 pt-0">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/dashboard/${property.id}`}>
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}; 