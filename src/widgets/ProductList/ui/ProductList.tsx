import ProductCard from "../../../entities/product/ui/ProductCard";
import { useGetProductsQuery } from "../../../entities/product/api/productApi";

export default function ProductsList() {
    const {
        data: products,
        isLoading,
        isError,
        error,
        refetch
    } = useGetProductsQuery();

    return (
        <div>
            
            {
                products ? (products.map((product: any) => <ProductCard key={product.key} product={product} />)) : <div>loading</div>
            }
        </div>
    );
}