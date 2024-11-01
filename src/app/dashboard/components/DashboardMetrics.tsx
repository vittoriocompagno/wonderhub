"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Property } from "@prisma/client"
import { BarChart, Home, Eye, TrendingUp } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis } from "recharts"

interface DashboardMetricsProps {
  properties: Property[]
  totalViews: number
  averageViews: number
  forecastData: number[]
}

const useMetricsData = (props: DashboardMetricsProps) => {
  const { properties, totalViews, averageViews, forecastData } = props

  const propertyCount = React.useMemo(() => properties.length, [properties])

  const chartData = React.useMemo(() => 
    forecastData.map((value, index) => ({
      day: `Day ${index + 1}`,
      views: value
    })),
    [forecastData]
  )

  const forecastTrend = React.useMemo(() => {
    if (chartData.length === 0) {
      return "No Data";
    }
    return chartData[chartData.length - 1].views > chartData[0].views ? "Upward" : "Downward";
  }, [chartData]);

  return { propertyCount, totalViews, averageViews, chartData, forecastTrend }
}

const MetricCard: React.FC<{
  title: string
  value: number | string
  icon: React.ReactNode
}> = ({ title, value, icon }) => (
  <Card className="flex flex-col justify-between">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

export const DashboardMetrics: React.FC<DashboardMetricsProps> = (props) => {
  const { propertyCount, totalViews, averageViews, chartData, forecastTrend } = useMetricsData(props)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Properties"
          value={propertyCount}
          icon={<Home className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Total Views"
          value={totalViews}
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Average Views"
          value={averageViews.toFixed(2)}
          icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Forecast Trend"
          value={forecastTrend}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Forecasted Views</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              views: {
                label: "Views",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[200px]"
          >
            <LineChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Line type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}