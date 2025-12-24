import React from 'react';
import { useGetCategoriesQuery } from '../api/filterApi';

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onCategoryChange(value === '' ? undefined : value);
  };

  const categoriesSafe = categories && categories.length > 0 ? categories : ['Default Category'];

  return (
    <div className="mb-4">
      <label htmlFor="category-filter" className="block text-xs font-bold tracking-[2px] text-gray-900 uppercase mb-4">
        Category
      </label>
      <select
        id="category-filter"
        value={selectedCategory || ''}
        onChange={handleChange}
        className="block w-full px-4 py-3 border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-gray-900 focus:ring-0 transition-colors rounded-none appearance-none"
      >
        <option value="">ALL CATEGORIES</option>
        {categoriesSafe.map((category) => (
          <option key={category} value={category}>
            {category.toUpperCase()}
          </option>
        ))}
      </select>
      {isLoading && <div className="text-gray-500 text-xs mt-2 tracking-wide">LOADING...</div>}
      {isError && <div className="text-red-500 text-xs mt-2 tracking-wide">FAILED TO LOAD</div>}
    </div>
  );
}
