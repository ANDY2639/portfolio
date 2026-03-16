import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Pequeno delay para asegurar que el elemento está renderizado
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      // Si no hay hash y estamos en home, scroll up
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);
}
