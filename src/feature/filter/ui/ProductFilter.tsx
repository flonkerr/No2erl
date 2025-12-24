import React from 'react';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import type { FilterState } from '../model/types';

interface ProductFiltersProps {
  filterState: FilterState;
  onFilterChange: (newFilterState: FilterState) => void;
}

export default function ProductFilters({ filterState, onFilterChange }: ProductFiltersProps) {
  const handleCategoryChange = (category: string | undefined) => {
    onFilterChange({
      ...filterState,
      selectedCategory: category
    });
  };

  const handleBrandChange = (brand: string | undefined) => {
    onFilterChange({
      ...filterState,
      selectedBrand: brand
    });
  };

  const handlePriceChange = (priceRange: { min: number; max: number } | undefined) => {
    onFilterChange({
      ...filterState,
      priceRange: priceRange
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      selectedCategory: undefined,
      selectedBrand: undefined,
      ratingRange: undefined,
      priceRange: undefined
    });
  };

  const hasActiveFilters = filterState.selectedCategory || filterState.selectedBrand || 
    (filterState.priceRange?.min || filterState.priceRange?.max);

  return (
    <div className="bg-white p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold tracking-[2px] text-gray-900 uppercase">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-gray-500 hover:text-gray-900 tracking-wider uppercase border-b border-gray-400 pb-0.5 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        <CategoryFilter
          selectedCategory={filterState.selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <BrandFilter
          selectedBrand={filterState.selectedBrand}
          onBrandChange={handleBrandChange}
        />

        <PriceFilter
          priceRange={filterState.priceRange}
          onPriceChange={handlePriceChange}
        />
      </div>
    </div>
  );
}
