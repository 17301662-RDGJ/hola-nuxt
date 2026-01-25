// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  nitro: {
    preset: "netlify",
  },

  runtimeConfig: {
    public: {
      supabaseUrl: "https://ghehmklxrcanlxsqilpf.supabase.co",
      supabaseAnonKey: "sb_publishable_Nmk-_w6ALvBw54tEJ7yyzQ_x47I5qAa",

      // 👇 CLAVE PÚBLICA reCAPTCHA
      recaptchaSiteKey: "T6LdHPlYsAAAAALdtalwZ00NBtvSbfqYXWx14ZQ6-",
    },

    // 👇 CLAVE PRIVADA reCAPTCHA (NO va en public)
    recaptchaSecretKey: "6LdHPlYsAAAAAIcB4mFc80wIb9dnp6QxWqJVw11m",
  },

  app: {
    head: {
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js",
          async: true,
          defer: true,
        },
      ],
    },
  },
});
