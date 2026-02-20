export default defineNuxtConfig({
  ssr: false,

  // modules: ["@nuxtjs/supabase"],

  runtimeConfig: {
    // VARIABLES PRIVADAS (solo backend)
    //supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,

    // VARIABLES PÚBLICAS (frontend)
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseTable: "formulario",
      recaptchaSiteKey: "6LcHBE8sAAAAALVWubMRxb5pxhvlv-j83TmnEPXJ",
    },

    recaptchaSecretKey: "6LcHBE8sAAAAADnSWiOZV0X2afRBQ4mX6QpfBNB3",
  },

  nitro: {},

  app: {
    head: {
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit",
          async: true,
          defer: true,
        },
      ],
    },
  },
});
