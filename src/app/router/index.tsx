import { Suspense } from "react";
import { routes } from "./routes.tsx";
import { useRoutes } from "react-router-dom";

export function AppRouter() {
  const routing = useRoutes(routes);

  const LoadingDots = () => (
    <div className="flex items-center justify-center h-screen space-x-2">
      <div className="w-3 h-3 bg-black/30 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-3 h-3 bg-black/30 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-3 h-3 bg-black/30 rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <Suspense fallback={<LoadingDots />}>
      {routing}
    </Suspense>
  );
}
