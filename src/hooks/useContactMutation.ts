import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { ContactMessage } from "../types";

export function useContactMutation() {
  return useMutation({
    mutationFn: async (message: ContactMessage) => {
      const { error } = await supabase.from("contact_messages").insert([message]);

      if (error) throw error;
      return true;
    },
  });
}
