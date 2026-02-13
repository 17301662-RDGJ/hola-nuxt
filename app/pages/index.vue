<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const captchaValido = ref(false);

function renderCaptcha() {
  const id = "recaptcha-container";

  // Limpia el contenedor (importante en SPA)
  document.getElementById(id).innerHTML = "";

  if (window.grecaptcha) {
    window.grecaptcha.render(id, {
      sitekey: "6LcHBE8sAAAAALVWubMRxb5pxhvlv-j83TmnEPXJ",
      callback: () => {
        captchaValido.value = true;
      },
    });
  } else {
    // Espera a que cargue el script
    window.onloadCallback = () => {
      window.grecaptcha.render(id, {
        sitekey: "6LcHBE8sAAAAALVWubMRxb5pxhvlv-j83TmnEPXJ",
        callback: () => {
          captchaValido.value = true;
        },
      });
    };
  }
}

onMounted(() => {
  renderCaptcha();
});

function validarCaptcha() {
  if (captchaValido.value) {
    router.push("/segunda");
  } else {
    router.push("/error");
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">Hola Mundo 🌎✨</h1>
      <h1 class="title">Mi primera app con Nuxt.js</h1>
      <p class="subtitle">Verificación de seguridad</p>

      <div id="recaptcha-container"></div>

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
