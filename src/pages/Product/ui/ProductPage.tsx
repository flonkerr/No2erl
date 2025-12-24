import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../entities/product/api/productApi";
import { useAddProductToCartMutation } from "../../../feature/cart/useAddProduct/api/useAddProuct";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ChatMessage {
  id: number;
  from: string;
  text: string;
  date: string;
  imageUrl?: string;
}

interface ChatThread {
  contact: string;
  messages: ChatMessage[];
}

interface InboxItem {
  id: number;
  from: string;
  preview: string;
  date: string;
  unread: boolean;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id!);
  const [addProductToCart, { isLoading: adding }] = useAddProductToCartMutation();
  const [sellerDraft, setSellerDraft] = useState("");
  const [sellerImage, setSellerImage] = useState<string | null>(null);
  const [sellerMessages, setSellerMessages] = useState<
    ChatMessage[]
  >([]);
  const [chatOpen, setChatOpen] = useState(false);

  const logged = localStorage.getItem("loggedInUser");
  const parsed = logged ? JSON.parse(logged) : null;
  const userKey = (parsed?.username || parsed?.email || "guest") as string;
  const contactName = useMemo(
    () => (product?.contact?.name ? product.contact.name : "Seller"),
    [product]
  );

  const handleAddToCart = async () => {
    try {
      if (!product) return;
      await addProductToCart(String(product.id)).unwrap();
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
      console.error("Error adding to cart:", err);
    }
  };

  useEffect(() => {
    if (!product) return;
    const threadsRaw = localStorage.getItem(`chatThreads:${userKey}`);
    const threads: ChatThread[] = threadsRaw ? JSON.parse(threadsRaw) : [];
    const existing = threads.find((t) => t.contact === contactName);
    if (existing) {
      setSellerMessages(existing.messages || []);
    } else {
      const seeded = {
        contact: contactName,
        messages: [],
      };
      const next: ChatThread[] = [seeded, ...threads];
      localStorage.setItem(`chatThreads:${userKey}`, JSON.stringify(next));
      setSellerMessages([]);
      const inboxRaw = localStorage.getItem(`messages:${userKey}`);
      const inbox: InboxItem[] = inboxRaw ? JSON.parse(inboxRaw) : [];
      const inboxItem: InboxItem = {
        id: Date.now(),
        from: contactName,
        preview: "",
        date: new Date().toISOString(),
        unread: false,
      };
      localStorage.setItem(`messages:${userKey}`, JSON.stringify([inboxItem, ...inbox]));
    }
  }, [product, userKey, contactName]);

  if (isLoading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (error || !product) return <div className="text-center mt-20 text-xl">No data</div>;

  const sendToSeller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (!sellerDraft.trim() && !sellerImage) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      from: "You",
      text: sellerDraft.trim(),
      date: new Date().toISOString(),
      imageUrl: sellerImage || undefined,
    };
    const threadsRaw = localStorage.getItem(`chatThreads:${userKey}`);
    const threads: ChatThread[] = threadsRaw ? JSON.parse(threadsRaw) : [];
    const nextThreads: ChatThread[] = threads.map((t) =>
      t.contact === contactName ? { ...t, messages: [...(t.messages || []), newMsg] } : t
    );
    localStorage.setItem(`chatThreads:${userKey}`, JSON.stringify(nextThreads));
    setSellerMessages((prev) => [...prev, newMsg]);
    const inboxRaw = localStorage.getItem(`messages:${userKey}`);
    const inbox: InboxItem[] = inboxRaw ? JSON.parse(inboxRaw) : [];
    const updatedInbox: InboxItem[] = inbox.map((m) =>
      m.from === contactName
        ? {
            ...m,
            preview: newMsg.text || (newMsg.imageUrl ? "Photo" : ""),
            date: newMsg.date,
            unread: false,
          }
        : m
    );
    localStorage.setItem(`messages:${userKey}`, JSON.stringify(updatedInbox));
    setSellerDraft("");
    setSellerImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">

            <Link
              to="/product"
              className="fixed top-25  left-5 flex items-center justify-center
                       w-10 h-10"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </Link>

      <div className=" overflow-hidden bg-white">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      <div className="flex flex-col gap-8 relative">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          {product.description}
        </p>

        <p className="text-3xl font-bold text-gray-900">${product.price}</p>

        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full py-3 mt-4 border border-black bg-gray-50 text-black 
                     hover:bg-black hover:text-white transition-all 
                     disabled:bg-gray-300 disabled:text-gray-700"
        >
          {adding ? "Adding..." : "Add to cart"}
        </button>

        <div className="mt-6 relative flex justify-end">
          <button
            type="button"
            onClick={() => setChatOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800"
          >
            <MessageSquare size={18} />
            <span className="text-sm tracking-widest">CHAT</span>
          </button>
          {chatOpen ? (
            <div className="absolute bottom-0 left-full ml-3 w-[380px] max-w-[90vw] border border-gray-200 rounded bg-white shadow-xl">
              <div className="px-3 py-2 border-b flex items-center justify-between">
                <p className="text-xs tracking-widest text-gray-900">{contactName}</p>
                <div className="flex items-center gap-2">
                  <Link
                    to="/profile/chats"
                    className="px-2 py-1 border rounded text-[11px] tracking-widest hover:bg-gray-50"
                  >
                    OPEN
                  </Link>
                  <button
                    type="button"
                    onClick={() => setChatOpen(false)}
                    className="px-2 py-1 border rounded text-[11px] tracking-widest hover:bg-gray-50"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
              <div className="p-3 max-h-[300px] overflow-y-auto space-y-3">
                {sellerMessages.length === 0 ? (
                  <p className="text-gray-500 text-sm">No messages yet</p>
                ) : (
                  sellerMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[75%] ${m.from === "You" ? "ml-auto" : ""}`}
                    >
                      <div
                        className={`p-2 rounded ${
                          m.from === "You"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{m.text}</p>
                        {m.imageUrl ? (
                          <img
                            src={m.imageUrl}
                            alt="attachment"
                            className="mt-2 max-h-32 rounded border border-gray-300"
                          />
                        ) : null}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">
                        {new Date(m.date).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
              {sellerImage ? (
                <div className="px-3 py-2 border-t flex items-center gap-3">
                  <img
                    src={sellerImage}
                    alt="preview"
                    className="max-h-16 rounded border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setSellerImage(null)}
                    className="px-2 py-1 border rounded tracking-widest text-[11px] hover:bg-gray-50"
                  >
                    REMOVE
                  </button>
                </div>
              ) : null}
              <form onSubmit={sendToSeller} className="p-3 border-t flex gap-2">
                <input
                  type="text"
                  value={sellerDraft}
                  onChange={(e) => setSellerDraft(e.target.value)}
                  placeholder="Write a message"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                <label className="px-3 py-2 border rounded tracking-widest text-[11px] hover:bg-gray-50 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return setSellerImage(null);
                      const reader = new FileReader();
                      reader.onload = () => setSellerImage(reader.result as string);
                      reader.readAsDataURL(file);
                    }}
                  />
                  ATTACH
                </label>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded tracking-widest text-[12px] hover:bg-gray-800"
                >
                  SEND
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
