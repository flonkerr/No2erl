import { useGetCartDataQuery } from "../api/cartApi";


export default function Cart() {
        const {
            data: cartData,
            isLoading,
            isError,
            error,
            refetch
        } = useGetCartDataQuery();

console.log(cartData)
  return (
    <div>
      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Image</th>
            <th className="border px-3 py-2">Price</th>
            <th className="border px-3 py-2">Quantity</th>
            <th className="border px-3 py-2">Discount</th>
            <th className="border px-3 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartData?.items && cartData.items.map((cartItem: any) => (
            <tr key={cartItem.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{cartItem.title}</td>
              <td className="border px-3 py-2">
                <img
                  src={cartItem.image}
                  alt={cartItem.title}
                  className="w-24 h-auto"
                />
              </td>
              <td className="border px-3 py-2">{cartItem.price}</td>
              <td className="border px-3 py-2">{cartItem.quantity}</td>
              <td className="border px-3 py-2">
                {cartItem.discount ? `${cartItem.discount * 100}%` : "-"}
              </td>
              <td className="border px-3 py-2">{cartItem.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

       {cartData && <div className="mt-4">
        <p>Subtotal: {cartData.subtotal} {cartData.currency}</p>
        <p>Discounts: -{cartData.discountTotal} {cartData.currency}</p>
        <p>Total: {cartData.totalPrice} {cartData.currency}</p>
        <p>Delivery: {cartData.deliveryPrice} {cartData.currency}</p>
        <p>Coupon: {cartData.couponCode}</p>
      </div> }
      
    </div>
  );
}
