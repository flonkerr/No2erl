import { BrowserRouter } from "react-router";
import { StoreProvider } from "./StoreProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
      <StoreProvider>
        {children}
      </StoreProvider>
  );
}
