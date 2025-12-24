export interface FilterParams {
  category?: string;
  brand?: string;
  minRating?: number;
  maxRating?: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface RatingRange {
  min: number;
  max: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  selectedCategory?: string;
  selectedBrand?: string;
  ratingRange?: RatingRange;
  priceRange?: PriceRange;
}
