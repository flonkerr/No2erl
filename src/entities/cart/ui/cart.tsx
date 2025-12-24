import { useGetCartDataQuery } from "../api/cartApi";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


export default function Cart() {
  const { data: cartData, isLoading, isError, error } = useGetCartDataQuery();

  if (isLoading)
    return <div className="text-center py-20 text-xl text-gray-700">Loading cart...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-gray-700">
        Error loading cart: {String(error)}
      </div>
    );

  return (
    <div>
      <div className="p-3">
        <Link
          to="/product"
          className="flex items-center justify-center w-10 h-10"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </Link>
      </div>


      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-4">

          {cartData?.items.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Your cart is empty.
            </div>
          ) : (
            cartData.items.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-gray-50  p-4 gap-4"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-gray-100 flex items-center justify-center rounded-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-gray-600 line-clamp-2">{item.description}</p>
                  <p className="text-gray-900 font-bold">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-4 mt-2 text-gray-700">
                    <span>Qty: {item.quantity}</span>
                    <span>
                      {item.discount ? `${(item.discount * 100).toFixed(0)}% off` : "-"}
                    </span>
                    <button className="hover:underline text-gray-900 text-sm">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right text-lg font-bold text-gray-900">
                  ${item.totalPrice.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {cartData && (
          <div className="bg-gray-50 p-6 h-fit sticky top-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Order Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>${cartData.subtotal.toFixed(2)} {cartData.currency}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Discounts</span>
              <span>-${cartData.discountTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-lg mb-2">
              <span>Total</span>
              <span>${cartData.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Delivery</span>
              <span>${cartData.deliveryPrice.toFixed(2)} {cartData.currency}</span>
            </div>
            {cartData.couponCode && (
              <div className="flex justify-between text-gray-900 font-medium mb-2">
                <span>Coupon</span>
                <span>{cartData.couponCode}</span>
              </div>
            )}
            <br />
            <Link to="/checkout" className=" bg-gray-900 text-white p-3  hover:bg-gray-800 transition-colors font-medium">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
