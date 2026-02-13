import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  // USA LA VERSION CORRECTA DE LAS VARIABLES
  const supabase = createClient(
    config.public.supabaseUrl, // ✔️ CORRECTO
    config.supabaseServiceKey, // <--- ESTA ES PRIVADA Y SE USA AQUÍ
  );

  const { data, error } = await supabase
    .from("mensajes")
    .insert([{ texto: body.texto }]);

  if (error) return { ok: false, error: error.message };

  return { ok: true, data };
});
