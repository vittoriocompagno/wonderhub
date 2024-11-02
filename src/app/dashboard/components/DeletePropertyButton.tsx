"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProperty } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DeletePropertyButtonProps {
  propertyId: string;
  userId: string;
  variant?: "outline" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  onDeleteStart?: () => void;
  isPropertyPage?: boolean;
}

export const DeletePropertyButton = ({ 
  propertyId, 
  userId,
  variant = "outline",
  size = "default",
  onDeleteStart,
  isPropertyPage = false
}: DeletePropertyButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    onDeleteStart?.();
    
    try {
      if (isPropertyPage) {
        // Start fade-out animation
        setShowContent(false);
        // Wait for animation to complete
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      await deleteProperty(propertyId, userId);
      toast.success("Property deleted successfully");
      
      if (isPropertyPage) {
        router.push('/dashboard');
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete property");
      console.error(error);
      setIsDeleting(false);
      if (isPropertyPage) {
        setShowContent(true);
      }
    }
  };

  // Wrap the parent component with AnimatePresence if it's the property page
  const content = (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Delete"
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your property.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  if (isPropertyPage) {
    return (
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return content;
}; 