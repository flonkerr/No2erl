import { Link } from "react-router-dom";
import type { Product } from "../model/types";
import { useAddProductToCartMutation } from "../../../feature/cart/useAddProduct/api/useAddProuct";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [addProductToCart, { isLoading, isError, error }] =
    useAddProductToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addProductToCart(product.id).unwrap();
      console.log("Product added to cart:", product.id);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <div key={product.id} className="border rounded-lg shadow-md overflow-hidden bg-white relative">

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <Link to={`/products/${product.id}`}>
        <h2 className="text-xl font-semibold mt-2 px-4">{product.title}</h2>
      </Link>

      <div className="p-4 flex flex-col gap-1">
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="text-lg font-bold text-green-600">${product.price}</p>

        <button
          onClick={handleAddToCart}
          className="bg-white text-black p-2 rounded mt-2 hover:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add to cart"}
        </button>

        {isError && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}
      </div>
    </div>
  );
}
