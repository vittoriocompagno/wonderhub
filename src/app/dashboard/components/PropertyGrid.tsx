"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "./PropertyCard";
import { DashboardProperties } from "../types";

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
      <AnimatePresence>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </AnimatePresence>
    </div>
  );
}; 