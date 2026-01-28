import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  const { data, error } = await supabase
    .from("mensajes")
    .insert([{ texto: body.texto }]);

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
});
