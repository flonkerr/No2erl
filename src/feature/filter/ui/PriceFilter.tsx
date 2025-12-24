import React from 'react';
import type { PriceRange } from '../model/types';

interface PriceFilterProps {
  priceRange?: PriceRange;
  onPriceChange: (priceRange: PriceRange | undefined) => void;
}

export default function PriceFilter({ priceRange, onPriceChange }: PriceFilterProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = parseFloat(e.target.value) || undefined;
    onPriceChange({
      min: minPrice || 0,
      max: priceRange?.max || 10000 // Default max if not set
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = parseFloat(e.target.value) || undefined;
    onPriceChange({
      min: priceRange?.min || 0,
      max: maxPrice || 10000
    });
  };

  const clearPrice = () => {
    onPriceChange(undefined);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <label className="block text-xs font-bold tracking-[2px] text-gray-900 uppercase">
          Price Range
        </label>
        {(priceRange?.min || priceRange?.max) && (
          <button
            onClick={clearPrice}
            className="text-[10px] text-gray-500 hover:text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-px"
          >
            Reset
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
            <input
            type="number"
            min="0"
            placeholder="MIN"
            value={priceRange?.min || ''}
            onChange={handleMinChange}
            className="block w-full pl-6 pr-2 py-3 border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-300"
            />
        </div>
        <span className="text-gray-400 text-xs">-</span>
        <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
            <input
            type="number"
            min="0"
            placeholder="MAX"
            value={priceRange?.max || ''}
            onChange={handleMaxChange}
            className="block w-full pl-6 pr-2 py-3 border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-300"
            />
        </div>
      </div>
    </div>
  );
}
