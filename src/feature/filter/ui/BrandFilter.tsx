import React from 'react';
import { useGetBrandsQuery } from '../api/filterApi';

interface BrandFilterProps {
  selectedBrand?: string;
  onBrandChange: (brand: string | undefined) => void;
}

export default function BrandFilter({ selectedBrand, onBrandChange }: BrandFilterProps) {
  const { data: brands, isLoading, isError } = useGetBrandsQuery();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onBrandChange(value === '' ? undefined : value);
  };

  if (isLoading) return <div className="text-sm text-gray-500">Loading brands...</div>;
  if (isError) return <div className="text-sm text-red-500">Error loading brands</div>;

  return (
    <div className="mb-4">
      <label htmlFor="brand-filter" className="block text-xs font-bold tracking-[2px] text-gray-900 uppercase mb-4">
        Brand
      </label>
      <select
        id="brand-filter"
        value={selectedBrand || ''}
        onChange={handleChange}
        className="block w-full px-4 py-3 border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-gray-900 focus:ring-0 transition-colors rounded-none appearance-none"
      >
        <option value="">ALL BRANDS</option>
        {brands?.map((brand) => (
          <option key={brand} value={brand}>
            {brand.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
