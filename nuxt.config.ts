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
      recaptchaSiteKey: "6LcHBE8sAAAAALVWubMRxb5pxhvlv-j83TmnEPXJ",
    },

    // 👇 CLAVE PRIVADA reCAPTCHA (NO va en public)
    recaptchaSecretKey: "6LcHBE8sAAAAADnSWiOZV0X2afRBQ4mX6QpfBNB3",
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
