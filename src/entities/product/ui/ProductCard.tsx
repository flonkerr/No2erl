import { Link } from "react-router-dom";
import type { Product } from "../model/types";

interface ProductCardProps {
    product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div key={product.id} className="border p-4 m-4">
            <Link to={`/products/${product.id}`}>
                <h2 className="text-xl font-semibold">{product.title}</h2>
            </Link>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <img src="" alt={product.title} className="w-32 h-32 object-cover mt-2" />
            <button>add to cart</button>
        </div>
    )
}