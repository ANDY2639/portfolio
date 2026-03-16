import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { BlogPost } from '../types'

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Error fetching blog posts:', error)
        return []
      }

      return data as BlogPost[]
    },
  })
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

      if (error) {
        console.error('Error fetching blog post:', error)
        throw error
      }

      // Incrementar vistas de forma asíncrona (no bloqueante)
      supabase.rpc('increment_post_views', { post_id: data.id }).then()

      return data as BlogPost
    },
    enabled: !!slug,
  })
}
