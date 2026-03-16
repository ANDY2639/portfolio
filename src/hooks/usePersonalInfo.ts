import { useQuery } from "@tanstack/react-query";

import { personalInfo as fallbackData } from "../data/personal";
import { supabase } from "../lib/supabase";
import type { PersonalInfo } from "../types";

export function usePersonalInfo() {
  return useQuery({
    queryKey: ["personal-info"],
    queryFn: async () => {
      const { data, error } = await supabase.from("personal_info").select("*").single();

      if (error || !data) {
        console.error("Error fetching personal info:", error);
        return fallbackData;
      }

      const personal: PersonalInfo = {
        id: data.id,
        name: data.name,
        title: data.title,
        bio: data.bio || "",
        location: data.location || "",
        email: data.email || "",
        avatar_url: data.avatar_url || undefined,
        social: {
          github: data.github_url || undefined,
          linkedin: data.linkedin_url || undefined,
          twitter: data.twitter_url || undefined,
        },
      };

      return personal;
    },
    initialData: fallbackData,
  });
}
