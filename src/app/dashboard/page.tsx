import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getDashboardProperties } from "./actions";
import { Suspense } from "react";
import { PropertyGridSkeleton } from "./components/PropertyGridSkeleton";
import { PropertyGrid } from "./components/PropertyGrid";
import { DashboardMetrics } from "./components/DashboardMetrics";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const properties = await getDashboardProperties(user?.id);

  const totalViews = properties.reduce((acc, property) => acc + property.analytics.length, 0);
  const averageViews = properties.length > 0 ? Math.round(totalViews / properties.length) : 0;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Hello, {user?.given_name || 'there'}
        </h2>
      </div>
      
      <Suspense fallback={<PropertyGridSkeleton />}>
        <DashboardMetrics 
          properties={properties}
          totalViews={totalViews}
          averageViews={averageViews}
          forecastData={[]}
        />
      </Suspense>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Properties</h3>
        <Suspense fallback={<PropertyGridSkeleton />}>
          <PropertyGrid properties={properties} />
        </Suspense>
      </div>
    </div>
  );
}
