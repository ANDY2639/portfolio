import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { PersonalInfo } from '../types'
import { personalInfo as fallbackData } from '../data/personal'

export function usePersonalInfo() {
  return useQuery({
    queryKey: ['personal-info'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('personal_info')
        .select('*')
        .single()

      if (error) {
        console.error('Error fetching personal info:', error)
        return fallbackData
      }

      return {
        id: data.id,
        name: data.name,
        title: data.title,
        bio: data.bio,
        location: data.location,
        email: data.email,
        avatar_url: data.avatar_url,
        social: {
          github: data.github_url,
          linkedin: data.linkedin_url,
          twitter: data.twitter_url,
        }
      } as PersonalInfo
    },
    initialData: fallbackData,
  })
}
