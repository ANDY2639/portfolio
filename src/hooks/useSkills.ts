import { useQuery } from "@tanstack/react-query";
import { skills as fallbackData } from "../data/skills";
import { supabase } from "../lib/supabase";
import type { Skill } from "../types";

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Error fetching skills:", error);
        return fallbackData;
      }

      if (!data) return fallbackData;

      return data.map((skill): Skill => {
        const category = skill.category;
        const validCategory: Skill["category"] =
          category === "frontend" ||
          category === "backend" ||
          category === "tools" ||
          category === "other"
            ? category
            : "other";

        const level = skill.level;
        const validLevel: Skill["level"] =
          level === "beginner" || level === "intermediate" || level === "advanced"
            ? level
            : undefined;

        return {
          id: skill.id,
          name: skill.name,
          category: validCategory,
          level: validLevel,
          icon_url: skill.icon_url || undefined,
        };
      });
    },
    placeholderData: fallbackData,
  });
}
