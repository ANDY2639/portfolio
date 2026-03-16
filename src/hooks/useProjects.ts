import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Project } from '../types'
import { projects as fallbackData } from '../data/projects'

export function useProjects(category?: string) {
  return useQuery({
    queryKey: ['projects', category],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching projects:', error)
        return fallbackData
      }

      return data.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        image: p.image_url,
        technologies: p.technologies,
        category: p.category,
        links: {
          github: p.github_url,
          live: p.live_url,
          demo: p.demo_url,
        },
        views_count: p.views_count,
        is_featured: p.is_featured
      })) as Project[]
    },
    placeholderData: fallbackData,
  })
}
