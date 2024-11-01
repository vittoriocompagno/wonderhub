import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ListingCardProps {
    title: string;
    imageUrl?: string;
    href: string;
}

export function ListingCard({ title, imageUrl, href }: ListingCardProps) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-0">
                <div className="aspect-square relative w-full">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No image</span>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-sm font-medium truncate">{title}</h3>
                </div>
            </CardContent>
        </Card>
    );
}   