import { useQuery } from "@tanstack/react-query";

import { projects as fallbackData } from "../data/projects";
import { supabase } from "../lib/supabase";
import type { Project } from "../types";

export function useProjects(category?: string) {
  return useQuery({
    queryKey: ["projects", category],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error || !data) {
        console.error("Error fetching projects:", error);
        return fallbackData;
      }

      return data.map((p): Project => {
        const projectCategory = p.category;
        const validCategory: Project["category"] =
          projectCategory === "frontend" ||
          projectCategory === "fullstack" ||
          projectCategory === "backend" ||
          projectCategory === "mobile"
            ? projectCategory
            : "frontend";

        return {
          id: p.id,
          title: p.title,
          description: p.description || "",
          image: p.image_url || "",
          technologies: p.technologies || [],
          category: validCategory,
          links: {
            github: p.github_url || undefined,
            live: p.live_url || undefined,
            demo: p.demo_url || undefined,
          },
          views_count: p.views_count || 0,
          is_featured: !!p.is_featured,
        };
      });
    },
    placeholderData: fallbackData,
  });
}
