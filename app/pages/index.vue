<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const captchaValido = ref(false);

onMounted(() => {
  // 👇 el callback DEBE estar en window
  window.onCaptchaSuccess = function () {
    captchaValido.value = true;
    console.log("Captcha validado correctamente");
  };
});

function validarCaptcha() {
  if (captchaValido.value) {
    router.push("/segunda");
  } else {
    router.push("/error"); // 👉 página con imagen de error
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">Hola Mundo</h1>
      <h1 class="title">Mi primera app con Nuxt.js</h1>
      <p class="subtitle">Verificación de seguridad</p>

      <!-- ✅ reCAPTCHA OFICIAL -->
      <div
        class="g-recaptcha"
        data-sitekey="6Ldn_0ksAAAAAItUy3Kgj1r__sJ8hxv5q91l-riD"
        data-callback="onCaptchaSuccess"
      ></div>

      <!-- ✅ BOTÓN FUNCIONAL -->
      <button @click="validarCaptcha">Continuar</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: white;
  padding: 35px;
  border-radius: 14px;
  text-align: center;
  width: 350px;
}

button {
  margin-top: 20px;
  background: #dc2626;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  width: 100%;
  cursor: pointer;
}
</style>
