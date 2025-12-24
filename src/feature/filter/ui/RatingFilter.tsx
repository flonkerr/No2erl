import React from 'react';
import type { RatingRange } from '../model/types';

interface RatingFilterProps {
  ratingRange?: RatingRange;
  onRatingChange: (ratingRange: RatingRange | undefined) => void;
}

export default function RatingFilter({ ratingRange, onRatingChange }: RatingFilterProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minRating = parseFloat(e.target.value) || undefined;
    onRatingChange({
      min: minRating || 0,
      max: ratingRange?.max || 5
    });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxRating = parseFloat(e.target.value) || undefined;
    onRatingChange({
      min: ratingRange?.min || 0,
      max: maxRating || 5
    });
  };

  const clearRating = () => {
    onRatingChange(undefined);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Rating:
        </label>
        {(ratingRange?.min || ratingRange?.max) && (
          <button
            onClick={clearRating}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Min"
          value={ratingRange?.min || ''}
          onChange={handleMinChange}
          className="block w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-500 text-sm">to</span>
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Max"
          value={ratingRange?.max || ''}
          onChange={handleMaxChange}
          className="block w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}
