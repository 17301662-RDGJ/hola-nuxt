export default defineEventHandler(() => {
  return {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    anon: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
  };
});
