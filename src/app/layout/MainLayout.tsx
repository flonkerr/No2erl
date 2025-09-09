import { Outlet } from "react-router-dom";
import Navbar from "@/widgets/Navbar/ui/Navbar";
import Footer from "@/widgets/Footer/ui/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen border">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
