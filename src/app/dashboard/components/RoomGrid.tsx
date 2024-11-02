"use client";

interface RoomGridProps {
  propertyId: string;
}

export const RoomGrid = ({ propertyId }: RoomGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Room grid content will go here */}
      <p className="text-muted-foreground">No rooms added yet.</p>
    </div>
  );
};
