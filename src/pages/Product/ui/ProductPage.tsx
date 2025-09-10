import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../entities/product/api/productApi";

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const { data: product, error, isLoading } = useGetProductByIdQuery(id!);

    return (
        <>
            {product ?
                <div key={product.id} className="border p-4 m-4">
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p>{product.description}</p>
                    <p className="font-bold">${product.price}</p>
                    <img src="" alt={product.title} className="w-32 h-32 object-cover mt-2" />
                    <button>add to cart</button>
                </div>
                : <div>no data</div>
            }

        </>
    )
}