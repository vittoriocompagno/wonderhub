"use client";

import { FormNavigation } from "@/app/components/FormNavigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
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

  // Create a debounced search function using useMemo
  const debouncedFetchSuggestions = useMemo(
    () => 
      debounce(async (input: string) => {
        if (!input) return;
        try {
          const results = await fetchAddressSuggestions(input);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      }, 300),
    []
  );

  // Custom hook to manage search state
  const useAddressSearch = () => {
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<AddressSuggestion | null>(null);

    // Handle input change with debounced search
    const handleInputChange = useCallback((value: string) => {
      setSearchInput(value);
      if (value) {
        debouncedFetchSuggestions(value);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, []);

    return {
      searchInput,
      suggestions,
      showSuggestions,
      selectedLocation,
      setSearchInput,
      setSuggestions,
      setShowSuggestions,
      setSelectedLocation,
      handleInputChange
    };
  };

  const {
    searchInput,
    suggestions,
    showSuggestions,
    selectedLocation,
    setSearchInput,
    setSuggestions,
    setShowSuggestions,
    setSelectedLocation,
    handleInputChange
  } = useAddressSearch();

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

  const handleFormAction = async (formData: FormData) => {
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

  // Add keyboard navigation support and improve click handling
  const handleKeyDown = (e: React.KeyboardEvent, suggestion?: AddressSuggestion) => {
    if (e.key === 'Enter' && suggestion) {
      handleSuggestionClick(suggestion);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
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
  
      <form 
        action={handleFormAction}
        className="mt-6 sm:mt-10 max-w-3xl mx-auto space-y-6 sm:space-y-8"
      >
        <div className="rounded-xl shadow-sm text-center mb-4 relative" id="address-input-container">
          <div className="relative">
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Enter your address"
              className="w-full p-4 text-lg"
              aria-label="Address search"
              aria-expanded={showSuggestions}
              aria-controls="address-suggestions"
              role="combobox"
            />
            
            {searchInput && (
              <Button
                type="button"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleClearAddress}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {showSuggestions && suggestions.length > 0 && searchInput && !selectedLocation && (
            <div 
              id="address-suggestions"
              role="listbox"
              className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  role="option"
                  aria-selected={false}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                  onKeyDown={(e) => handleKeyDown(e, suggestion)}
                >
                  {suggestion.formatted}
                </button>
              ))}
            </div>
          )}
        </div>

        <MapBox lat={selectedLocation?.lat} lon={selectedLocation?.lon} />
        
        <input type="hidden" name="address" value={searchInput} />
        
        <FormNavigation 
          backLink={`/create/${propertyId}/description`}
          showBackButton={true}
          propertyId={propertyId as string}
          isNextDisabled={!selectedLocation}
          nextButtonText={selectedLocation ? "Confirm Location" : "Next"}
        />
      </form>
    </div>
  );
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}