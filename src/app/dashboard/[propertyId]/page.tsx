import { Suspense } from "react";
import { getProperty } from "../actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PropertyDetails } from "../components/PropertyDetails";
import { notFound } from "next/navigation";

export default async function PropertyPage({ 
  params 
}: { 
  params: { propertyId: string } 
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user?.id) {
    notFound();
  }

  const property = await getProperty(params.propertyId, user.id);
  
  if (!property) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <Suspense>
        <PropertyDetails property={property} />
      </Suspense>
    </div>
  );
}
