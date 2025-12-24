import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Error404Animated() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  return (
    <div
      className={`relative bg-white min-h-screen flex flex-col overflow-hidden transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="absolute top-0 left-0 w-32 h-32 bg-gray-300 opacity-40 rotate-12 rounded-sm animate-[float_8s_ease-in-out_infinite]"></div>

      <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-b-[100px] border-b-gray-300 opacity-30 animate-[float2_10s_ease-in-out_infinite]"></div>

      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gray-200 opacity-40 rounded-full animate-[float3_12s_ease-in-out_infinite]"></div>

      <div className="absolute bottom-0 right-0 w-36 h-20 bg-gray-300 opacity-35 rotate-6 rounded-md animate-[float4_9s_ease-in-out_infinite]"></div>

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

      <main className="flex flex-col items-center justify-center flex-grow text-center px-6 md:px-16 py-24 relative z-10">
        <h1 className="text-gray-200 text-[150px] font-bold leading-none mb-8">
          404
        </h1>

        <h2 className="text-gray-400 text-4xl mb-4 tracking-widest">
          PAGE NOT FOUND
        </h2>

        <p className="text-gray-600 max-w-xl leading-relaxed mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>

        <Link
          to="/"
          className="group bg-white border px-6 py-3 text-sm tracking-widest font-medium flex items-center gap-2
               transition duration-300 ease-in-out hover:bg-gray-50 hover:shadow-lg hover:scale-105"
        >
          GO BACK HOME
        </Link>
      </main>

    </div>
  );
}
