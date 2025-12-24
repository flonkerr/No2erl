import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCartDataQuery } from "../../../entities/cart/api/cartApi";
import type { CardData, CheckoutFormData, OrderRequest } from "../model/types";
import { useCreateOrderMutation } from "../api/checkoutApi";
import { Link } from "react-router-dom";


export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    city: "",
    country: "",
    region: "",
    address: "",
  });

  const [cardData, setCardData] = useState<CardData>({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const { data: getCartData } = useGetCartDataQuery();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "email",
      "firstName",
      "lastName",
      "city",
      "country",
      "region",
      "address",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof CheckoutFormData]) {
        alert("Пожалуйста, заполните все поля формы доставки.");
        return;
      }
    }

    if (!cardData.cardNumber || !cardData.expiry || !cardData.cvv) {
      alert("Пожалуйста, заполните данные карты.");
      return;
    }

    if (!getCartData?.items?.length) {
      alert("Корзина пуста, добавьте товары перед оплатой.");
      return;
    }

    const order: OrderRequest = {
      customer: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      shippingAddress: {
        country: formData.country,
        region: formData.region,
        city: formData.city,
        address: formData.address,
        company: formData.company,
      },
      items:
        getCartData?.items?.map((item) => ({
          productId: item.id.toString(),
          quantity: item.quantity,
          price: item.price,
        })) || [],
      payment: {
        method: "card",
        cardNumber: cardData.cardNumber,
        expiry: cardData.expiry,
        cvv: cardData.cvv,
      },
    };

    createOrder(order)
      .unwrap()
      .then(() => {
        alert("Оплата прошла успешно!");
        const logged = localStorage.getItem("loggedInUser");
        const parsed = logged ? JSON.parse(logged) : null;
        const key = (parsed?.username || parsed?.email || "guest") as string;
        const existing = localStorage.getItem(`notifications:${key}`);
        const list = existing ? JSON.parse(existing) : [];
        const total = getCartData?.totalPrice ?? 0;
        const count = getCartData?.items?.length ?? 0;
        const entry = {
          id: Date.now(),
          title: `Purchase successful: ${count} item(s) — Total $${total}`,
          date: new Date().toISOString(),
          read: false,
        };
        localStorage.setItem(`notifications:${key}`, JSON.stringify([entry, ...list]));
        navigate("/Product");
      })
      .catch(() => alert("Произошла ошибка при оплате"));
  };

  return (
    <div className="h-180 bg-white p-8 flex justify-center">

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 border border-gray-200">

        <div className="p-10 border-r bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 tracking-wide">
            Shipping Information
          </h2>

          <form className="space-y-4">
            {[
              { name: "email", placeholder: "Email", required: true },
              { name: "firstName", placeholder: "First name", required: true },
              { name: "lastName", placeholder: "Last name", required: true },
              { name: "company", placeholder: "Company (optional)" },
              { name: "city", placeholder: "City", required: true },
              { name: "country", placeholder: "Country", required: true },
              { name: "region", placeholder: "Region / State", required: true },
              { name: "address", placeholder: "Address", required: true },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 outline-none transition"
              />
            ))}
          </form>
        </div>

        <div className="p-10 bg-gray-50 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 tracking-wide">
              Payment
            </h2>

            <div className="mb-8 bg-white p-5 border border-gray-200">
              <p className="text-lg text-gray-600">Total:</p>
              <p className="text-4xl font-bold text-black mt-1">
                {getCartData?.totalPrice}$ 
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number"
                value={cardData.cardNumber}
                onChange={handleCardChange}
                className="w-full border border-gray-300 p-3 outline-none"
                required
              />

              <div className="flex gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={handleCardChange}
                  className="w-1/2 border border-gray-300 p-3 outline-none"
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  className="w-1/2 border border-gray-300 p-3 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full  p-3 text-lg font-medium tracking-wide text-gray-900 bg-white mb-8  hover:text-white hover:bg-black border border-black transition"
              >
                {isLoading ? "Processing..." : "Pay now"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
