import { nanoid } from "nanoid";
import { useEffect } from "react";

import { supabase } from "../lib/supabase";

export function usePageView() {
  useEffect(() => {
    const recordPageView = async () => {
      // Obtener o crear un ID de visitante persistente en session storage
      let visitorId = sessionStorage.getItem("portfolio_visitor_id");
      if (!visitorId) {
        visitorId = nanoid();
        sessionStorage.setItem("portfolio_visitor_id", visitorId);
      }

      const path = window.location.pathname;

      await supabase.from("site_analytics").insert({
        page_path: path,
        visitor_id: visitorId,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });
    };

    void recordPageView();
  }, []);
}
