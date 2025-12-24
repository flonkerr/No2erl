import { useState } from "react";
import ProductsList from "../../../widgets/ProductList/ui/ProductList";
import { ProductFilters } from "../../../feature/filter";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; 
import type { FilterState } from "../../../feature/filter";
import { Link } from "react-router-dom";


export default function Product() {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedCategory: undefined,
    selectedBrand: undefined,
    ratingRange: undefined,
    priceRange: undefined,
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Link to="/cart" className="fixed bottom-40 right-6 z-50 flex items-center justify-center w-12 h-12 bg-white rounded-2xl  ">
        <ShoppingCartIcon className="w-10 h-10" />
      </Link>
      <h1 className="text-3xl font-bold mb-6">Shop Page</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 flex-shrink-0">
          <ProductFilters filterState={filterState} onFilterChange={setFilterState} />
        </div>

        <div className="md:w-3/4">
          <ProductsList filterState={filterState} />
        </div>
      </div>
    </div>
  );
}
