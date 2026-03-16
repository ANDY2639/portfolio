import { useQuery } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";
import type { SiteStats } from "../types";

export function useSiteStats() {
  return useQuery({
    queryKey: ["site-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_site_stats");

      if (error || !data || data.length === 0) {
        console.error("Error fetching site stats:", error);
        return {
          total_visits: 0,
          unique_visitors: 0,
          today_visits: 0,
          this_week_visits: 0,
          this_month_visits: 0,
        } as SiteStats;
      }

      const stats = data[0];

      return {
        total_visits: stats.total_visits,
        unique_visitors: stats.unique_visitors,
        today_visits: stats.today_visits,
        this_week_visits: stats.this_week_visits,
        this_month_visits: stats.this_month_visits,
      } as SiteStats;
    },
    refetchInterval: 60000, // Actualizar cada minuto
  });
}
