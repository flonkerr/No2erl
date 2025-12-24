import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ContactAnimated() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      <div
        className="absolute top-0 left-0 w-32 h-32 bg-gray-300 opacity-40 rotate-12 rounded-sm
                   animate-[float_8s_ease-in-out_infinite]"
        style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }}
      />

      <div
        className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent 
                   border-b-[100px] border-b-gray-300 opacity-30
                   animate-[float2_10s_ease-in-out_infinite]"
        style={{ transform: `translate(${-mouse.x}px, ${mouse.y}px)` }}
      />

      <div
        className="absolute bottom-0 left-0 w-40 h-40 bg-gray-200 opacity-40 rounded-full
                   animate-[float3_12s_ease-in-out_infinite]"
        style={{ transform: `translate(${mouse.x}px, ${-mouse.y}px)` }}
      />

      <div
        className="absolute bottom-0 right-0 w-36 h-20 bg-gray-300 opacity-35 rotate-6 rounded-md
                   animate-[float4_9s_ease-in-out_infinite]"
        style={{ transform: `translate(${-mouse.x}px, ${-mouse.y}px)` }}
      />

      {/* KEYFRAMES */}
      <style>
        {`
          @keyframes float {
            0%,100% { transform: translate(0px, 0px); }
            50% { transform: translate(10px, -10px); }
          }
          @keyframes float2 {
            0%,100% { transform: translate(0px, 0px); }
            50% { transform: translate(-8px, 6px); }
          }
          @keyframes float3 {
            0%,100% { transform: translate(0px, 0px); }
            50% { transform: translate(6px, -6px); }
          }
          @keyframes float4 {
            0%,100% { transform: translate(0px, 0px); }
            50% { transform: translate(-5px, 5px); }
          }
        `}
      </style>

      {/* CONTENT */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-3xl border border-gray-200 bg-white rounded-lg shadow-sm p-8">

          <div className="flex justify-between mb-8">
            <div>
              <p className="text-gray-400 tracking-widest text-sm">CONTACT</p>
              <h1 className="text-3xl font-bold">Get In Touch</h1>
            </div>
            <Link
              to="/"
              className="text-sm tracking-widest text-gray-500 hover:text-gray-900"
            >
              HOME →
            </Link>
          </div>

          {submitted && (
            <div className="mb-6 p-4 border border-green-200 bg-green-50 text-green-700 text-sm">
              Message sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-4 py-2 w-full focus:ring-2 focus:ring-gray-800 outline-none"
              />
              <input
                required
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-4 py-2 w-full focus:ring-2 focus:ring-gray-800 outline-none"
              />
            </div>

            <textarea
              required
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border px-4 py-2 w-full min-h-[120px] focus:ring-2 focus:ring-gray-800 outline-none"
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 tracking-widest text-sm
                         hover:bg-gray-800 transition"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
