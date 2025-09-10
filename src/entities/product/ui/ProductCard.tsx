import { Link } from "react-router-dom";
import type { Product } from "../model/types";

interface ProductCardProps {
    product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div key={product.id} className="">
            <Link to={`/products/${product.id}`}>
                <h2 className="">{product.title}</h2>
            </Link>
            <p>{product.description}</p>
            <p className="">{product.price}</p>
            <img src="" alt={product.title} className="" />
            <button>add to cart</button>
        </div>
    )
}