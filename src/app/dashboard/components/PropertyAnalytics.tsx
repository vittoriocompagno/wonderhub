import { Analytics } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Clock, MapPin } from "lucide-react";
import { useMemo } from "react";

interface PropertyAnalyticsProps {
  analytics: Analytics[];
}

interface AnalyticMetric {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export const PropertyAnalytics = ({ analytics }: PropertyAnalyticsProps) => {
  const metrics = useMemo(() => {
    const totalViews = analytics.length;
    const uniqueVisitors = new Set(analytics.map(a => a.ipHash)).size;
    const uniqueLocations = new Set(analytics.map(a => `${a.city}-${a.country}`)).size;

    const analyticMetrics: AnalyticMetric[] = [
      {
        title: "Total Views",
        value: totalViews,
        icon: <Eye className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Unique Visitors",
        value: uniqueVisitors,
        icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      },
      {
        title: "Unique Locations",
        value: uniqueLocations,
        icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
      },
    ];

    return analyticMetrics;
  }, [analytics]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};