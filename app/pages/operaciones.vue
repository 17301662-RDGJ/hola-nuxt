<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const num1 = ref("");
const num2 = ref("");
const resultado = ref(null);

const filtrarNumeros = (campo) => {
  if (campo === "num1") {
    num1.value = num1.value.replace(/[^0-9.,]/g, "");
  }
  if (campo === "num2") {
    num2.value = num2.value.replace(/[^0-9.,]/g, "");
  }
};

const calcular = (operacion) => {
  try {
    resultado.value = null;

    if (num1.value === "" || num2.value === "") {
      throw new Error("Campos obligatorios");
    }

    const a = Number(num1.value.replace(",", "."));
    const b = Number(num2.value.replace(",", "."));

    if (isNaN(a) || isNaN(b)) {
      throw new Error("Solo números,puntos o comas");
    }

    if (operacion === "suma") {
      resultado.value = a + b;
    }

    if (operacion === "division") {
      if (b === 0) {
        throw new Error("División entre cero");
      }
      resultado.value = a / b;
    }
  } catch (e) {
    console.error(e.message);
    router.push("/error");
  }
};
</script>

<template>
  <Breadcrumbs />
  <div class="page">
    <div class="card">
      <h1 class="title">Operaciones Matemáticas 🧮</h1>
      <p class="subtitle">Suma y División con Excepciones</p>

      <input
        v-model="num1"
        type="text"
        placeholder="Número 1"
        @input="filtrarNumeros('num1')"
      />

      <input
        v-model="num2"
        type="text"
        placeholder="Número 2"
        @input="filtrarNumeros('num2')"
      />

      <div class="buttons">
        <button class="guardar" @click="calcular('suma')">Sumar</button>
        <button class="guardar" @click="calcular('division')">Dividir</button>
      </div>

      <p v-if="resultado !== null">
        Resultado: <strong>{{ resultado }}</strong>
      </p>
      <NuxtLink to="/" class="regresar">Volver a inicio</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* 🔥 TEXTO GLOBAL EN BLANCO */
* {
  color: white !important;
}

/* Placeholders en blanco */
input::placeholder {
  color: rgba(255, 255, 255, 0.75) !important;
}

/* Página principal */
.page {
  min-height: 100vh;
  background: radial-gradient(
    circle at top left,
    #3b82f6,
    #1e3a8a 40%,
    #0f172a 90%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-family: "Segoe UI", system-ui, sans-serif;
}

/* Tarjeta glass */
.card {
  width: 420px;
  padding: 40px 35px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  text-align: center;
  animation: fadeIn 0.8s ease;
}

/* Fade */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Título */
.title {
  font-size: 28px;
  font-weight: 700;
}

/* Subtítulo */
.subtitle {
  font-size: 15px;
  opacity: 0.9;
}

/* Inputs */
input {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
  font-size: 15px;
  margin-bottom: 20px;
  text-align: center;
  transition: all 0.25s ease;
}

input:focus {
  background: rgba(255, 255, 255, 0.17);
  border-color: #60a5fa;
  outline: none;
}

/* Botones */
.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}

.guardar {
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  background: #1d4ed8;
  font-size: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.25s ease;
}

.guardar:hover {
  background: #1e40af;
  transform: translateY(-2px);
}

/* Botón regresar */
.regresar {
  display: inline-block;
  margin-top: 20px;
  background-color: #1e40af;
  padding: 12px 22px;
  border-radius: 10px;
  font-size: 15px;
  text-decoration: none;
  transition: 0.25s ease;
}

.regresar:hover {
  background: #1e40af;
  transform: translateY(-2px);
}

/* Resultado */
p strong {
  font-size: 18px;
  color: white !important;
}
</style>
