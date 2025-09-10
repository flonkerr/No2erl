import { useEffect, useState } from "react";
import api from "../api/api"; 

const Forum = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        setProducts(api);
    }, []);

    return (
        <div>
            <h1>Forum</h1>
            {
                products.map((product, index) => (
                    <div key={index}>
                        <h2>{product.name}</h2>
                        <p>{product.author}</p>
                        <p>{product.description}</p>
                        <img src={product.img} alt={product.name} />
                        <button>Join</button>
                    </div>
                ))
            }
        </div>
    )
}

export default Forum;
