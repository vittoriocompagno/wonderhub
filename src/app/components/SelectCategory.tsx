"use client"

import { categoryItems } from "@/lib/categoryItems"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface SelectCategoryProps {
  name: string;
  onCategorySelect: (category: string) => void;
}

export function SelectCategory({ name, onCategorySelect }: SelectCategoryProps) {
  const [category, setCategory] = useState<string>('')

  const handleCategorySelect = (categoryName: string) => {
    setCategory(categoryName);
    onCategorySelect(categoryName);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-8">
      <input type="hidden" name={name} value={category} />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {categoryItems.map((item) => (
            <Card 
              key={item.id}
              onClick={() => handleCategorySelect(item.name)}
              className={`overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 rounded-xl cursor-pointer
                ${category === item.name ? 'ring-2 ring-primary ring-offset-2 bg-gray-300' : ''} 
                ${category === item.name ? 'bg-gray-300' : 'bg-white'}
                shadow-md`}
            >
              <CardContent className="p-6 sm:p-8 flex flex-col items-center space-y-4 sm:space-y-6">
                <div className="aspect-square relative w-24 h-24 sm:w-32 sm:h-32">
                  <Image
                    src={String(item.image)}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105 p-2"
                  />
                </div>
                <h2 className="text-center font-medium text-gray-800 text-sm sm:text-base">
                  {item.title}
                </h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}