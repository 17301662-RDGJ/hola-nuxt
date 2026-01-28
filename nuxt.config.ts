// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  nitro: {
    preset: "netlify",
  },
  runtimeConfig: {
    public: {
      supabaseUrl: "https://ghehmklxrcanlxsqilpf.supabase.co",
      supabaseAnonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZWhta2x4cmNhbmx4c3FpbHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyOTI4MjksImV4cCI6MjA4NDg2ODgyOX0.uR7DPF8F2S9lVPOFfIqY6q-V43q9aGM0-u74gIhdr8I",

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
