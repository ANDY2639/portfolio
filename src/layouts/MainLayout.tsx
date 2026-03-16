import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useScrollToHash } from "../hooks/useScrollToHash";
import { usePageView } from "../hooks/usePageView";

export function MainLayout() {
  // Registrar visitas automáticamente en cada navegación
  usePageView();
  // Manejar scroll a anclas (#projects, etc)
  useScrollToHash();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
