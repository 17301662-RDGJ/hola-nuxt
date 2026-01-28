import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  const { data, error } = await supabase.from("mensajes").select("*").limit(1);

  return { data, error };
});
