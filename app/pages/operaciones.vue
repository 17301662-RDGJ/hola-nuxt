<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const num1 = ref("");
const num2 = ref("");
const resultado = ref(null);

const calcular = (operacion) => {
  try {
    resultado.value = null;

    if (num1.value === "" || num2.value === "") {
      throw new Error("Campos obligatorios");
    }

    const a = Number(num1.value);
    const b = Number(num2.value);

    if (isNaN(a) || isNaN(b)) {
      throw new Error("Solo números");
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
  <div class="page">
    <div class="card">
      <h1 class="title">Operaciones Matemáticas</h1>
      <p class="subtitle">Suma y División con Excepciones</p>

      <input v-model="num1" type="number" placeholder="Número 1" />
      <input v-model="num2" type="number" placeholder="Número 2" />

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
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.card {
  background: white;
  width: 360px;
  padding: 35px 30px;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.title {
  font-size: 26px;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 6px;
}

.subtitle {
  font-size: 14px;
  color: #475569;
  margin-bottom: 25px;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 15px;
  text-align: center;
  margin-bottom: 20px;
}

input:focus {
  outline: none;
  border-color: #1e3a8a;
}

.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 15px;
}

.guardar {
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

.guardar:hover {
  background-color: #1e40af;
}

.regresar {
  display: inline-block;
  background-color: #dc2626;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 15px;
  text-decoration: none;
}

.regresar:hover {
  background-color: #b91c1c;
}
</style>
