import { Analytics, Property } from "@prisma/client";

export type DashboardProperties = (Property & { 
  analytics: Analytics[] 
})[];

export interface DashboardMetricsProps {
  properties: DashboardProperties;
  totalViews: number;
  averageViews: number;
  forecastData: any;
} 