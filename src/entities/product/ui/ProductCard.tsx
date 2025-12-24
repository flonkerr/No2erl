  import { Link } from "react-router-dom";
  import type { Product } from "../model/types";
  import { useAddProductToCartMutation } from "../../../feature/cart/useAddProduct/api/useAddProuct";

    interface ProductCardProps {
      product: Product;
    }

  export default function ProductCard({ product }: ProductCardProps) {
    const [addProductToCart, { isLoading, isError, error }] = useAddProductToCartMutation();
    const logged = localStorage.getItem("loggedInUser");
    const parsed = logged ? JSON.parse(logged) : null;
    const userKey = (parsed?.username || parsed?.email || "guest") as string;

    const handleAddToCart = async () => {
      try {
        await addProductToCart(product.id).unwrap();
        const actRaw = localStorage.getItem(`activity:${userKey}`);
        const acts = actRaw ? JSON.parse(actRaw) : [];
        const activity = {
          title: `Added to cart: ${product.title}`,
          date: new Date().toISOString(),
          kind: "cart",
        };
        const nextActs = [activity, ...acts].slice(0, 5);
        localStorage.setItem(`activity:${userKey}`, JSON.stringify(nextActs));
      } catch (err) {
        console.error("Failed to add product:", err);
      }
    };

    return (
      <div className=" overflow-hidden bg-white relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-52 object-cover"
        />

        <Link to={`/products/${product.id}`}>
          <h2 className="text-xl font-semibold mt-3 px-4 text-gray-900 hover:text-gray-700 transition-colors">
            {product.title}
          </h2>
        </Link>

        <div className="p-4 flex flex-col gap-3">
          <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>

          <p className="text-lg font-bold text-gray-900">${product.price}</p>

          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-white border border-black text-black py-2 hover:bg-black hover:text-white transition-colors disabled:bg-gray-300"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add to cart"}
          </button>

          {isError && (
            <p className="text-red-500 text-sm mt-2">Error: {JSON.stringify(error)}</p>
          )}
        </div>
      </div>
    );
  }
