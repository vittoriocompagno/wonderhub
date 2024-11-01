"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PropertyFormSkeleton() {
    return (
        <div className="min-h-screen mt-10 p-4">
            <div className="max-w-5xl justify-center text-center mx-auto">
                <Skeleton className="h-8 w-64 mx-auto mb-2" />
                <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-20rem)] mt-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center space-y-4">
                            <Skeleton className="h-24 w-24 rounded-lg" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 