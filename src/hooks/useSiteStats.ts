import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { SiteStats } from '../types'

export function useSiteStats() {
  return useQuery({
    queryKey: ['site-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_site_stats')

      if (error) {
        console.error('Error fetching site stats:', error)
        return {
          total_visits: 0,
          unique_visitors: 0,
          today_visits: 0,
          this_week_visits: 0,
          this_month_visits: 0
        } as SiteStats
      }

      return data[0] as SiteStats
    },
    refetchInterval: 60000, // Actualizar cada minuto
  })
}
