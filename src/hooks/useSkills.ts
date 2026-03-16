import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Skill } from '../types'
import { skills as fallbackData } from '../data/skills'

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) {
        console.error('Error fetching skills:', error)
        return fallbackData
      }

      return data as Skill[]
    },
    placeholderData: fallbackData,
  })
}
