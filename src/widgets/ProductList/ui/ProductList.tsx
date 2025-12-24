import ProductCard from "../../../entities/product/ui/ProductCard";
import { useGetProductsQuery } from "../../../entities/product/api/productApi";
import type { FilterState } from "../../../feature/filter";

interface ProductsListProps {
  filterState?: FilterState;
}

export default function ProductsList({ filterState }: ProductsListProps) {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;

  const filteredProducts = products?.filter((product: any) => {
    // Filter by Category
    if (filterState?.selectedCategory && product.category !== filterState.selectedCategory) {
      return false;
    }

    // Filter by Brand
    if (filterState?.selectedBrand && product.brand !== filterState.selectedBrand) {
      return false;
    }

    // Filter by Rating
    if (filterState?.ratingRange) {
      const { min, max } = filterState.ratingRange;
      const rating = product.rating || 0;
      if (rating < min || rating > max) {
        return false;
      }
    }

    // Filter by Price
    if (filterState?.priceRange) {
      const { min, max } = filterState.priceRange;
      const price = product.price || 0;
      if (price < min || price > max) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-16 py-8">
      {filteredProducts?.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 py-10">
          No products found matching your filters.
        </div>
      ) : (
        filteredProducts?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}
