"use client";

import { FormNav } from "@/app/components/FormNav";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAddressSuggestions, updatePropertyAddress } from "@/app/actions";
import { MapBox } from "@/app/components/MapBox";

interface AddressSuggestion {
  formatted: string;
  lat: number;
  lon: number;
}

export default function AddressPage() {
  const { id: propertyId } = useParams();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<AddressSuggestion | null>(null);

  const handleClearAddress = () => {
    setSearchInput("");
    setSelectedLocation(null);
    setSuggestions([]);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchInput) {
        try {
          const results = await fetchAddressSuggestions(searchInput);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#address-input-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setSearchInput(suggestion.formatted);
    setSelectedLocation(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (formData: FormData) => {
    if (!selectedLocation) return;
    
    try {
      const result = await updatePropertyAddress(
        propertyId as string,
        selectedLocation.formatted,
        selectedLocation.lat,
        selectedLocation.lon
      );
      
      if (result.success) {
        router.push(`/create/${propertyId}/success`);
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <div className="container mx-auto text-center px-4 sm:px-6 py-6 sm:py-10">
      <div className="w-full sm:w-4/5 lg:w-3/5 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Where's your place located?</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Help guests find your place by providing your address
        </p>
      </div>
  
      <form action={handleSubmit} className="mt-6 sm:mt-10 max-w-3xl mx-auto space-y-6 sm:space-y-8">
        <div className="rounded-xl shadow-sm text-center mb-4 relative">
          <Label htmlFor="address-input" className="block mb-2 text-sm sm:text-base">Address</Label>
          <div className="relative" id="address-input-container">
            <div className="relative">
              <Input
                id="address-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Enter your address"
                className="w-full rounded-full text-sm sm:text-base pr-10"
                required
              />
              {searchInput && (
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto"
                  onClick={handleClearAddress}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {showSuggestions && suggestions.length > 0 && searchInput && !selectedLocation && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-left hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.formatted}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        <MapBox lat={selectedLocation?.lat} lon={selectedLocation?.lon} />
  
        <input type="hidden" name="address" value={searchInput} />
        <FormNav 
          backLink="/" 
          showBackButton={true} 
          propertyId={propertyId as string}
          isLoading={false}
          nextButtonText={selectedLocation ? "Confirm Location" : "Next"}
        />
      </form>
    </div>
  );
}