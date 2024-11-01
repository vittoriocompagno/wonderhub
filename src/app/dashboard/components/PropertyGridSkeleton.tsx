import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PropertyGridSkeletonProps {
  count?: number;
  className?: string;
}

export const PropertyGridSkeleton = ({ 
  count = 6,
  className 
}: PropertyGridSkeletonProps) => {
  return (
    <div className={cn(
      "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
      className
    )}>
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="overflow-hidden rounded-lg border border-border/50 shadow-sm transition-colors hover:border-border"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}; 