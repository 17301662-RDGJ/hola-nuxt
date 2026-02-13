export default defineEventHandler(() => {
  const config = useRuntimeConfig();

  return {
    fromServer: {
      supabaseUrl: config.public.supabaseUrl,
      supabaseAnonKey: config.public.supabaseAnonKey,
      serviceKey: config.supabaseServiceKey,
    },
  };
});
