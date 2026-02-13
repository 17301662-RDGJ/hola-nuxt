import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const supabase = createClient(
    config.public.supabaseUrl, // <-- CORRECTO
    config.supabaseServiceKey, // <-- CORRECTO
  );

  const { data, error } = await supabase.from("mensajes").select("*").limit(1);

  return { data, error };
});
