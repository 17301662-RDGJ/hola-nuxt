<script setup>
//import Carrusel from "~/components/carrusel.vue";
import { ref } from "vue";

const texto = ref("");

const guardar = async () => {
  await $fetch("/api/guardar", {
    method: "POST",
    body: {
      texto: texto.value,
    },
  });

  alert("Guardado correctamente");
  texto.value = "";
};
</script>

<template>
  <div class="page">
    <div class="card">
      <h1 class="title">Guardar en SQL Server</h1>
      <p class="subtitle">Registro de información</p>

      <input v-model="texto" type="text" placeholder="Escribe algo" />

      <div class="buttons">
        <button class="guardar" @click="guardar">Guardar</button>

        <NuxtLink to="/" class="regresar"> Regresar </NuxtLink>
      </div>
    </div>
  </div>
  <h1>Carrusel de Fotos 📸</h1>
  <Carrusel />
</template>

<style scoped>
/* Fondo general */
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", system-ui, sans-serif;
}

/* Tarjeta */
.card {
  background: white;
  width: 360px;
  padding: 35px 30px;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
}

/* Títulos */
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

/* Input */
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

/* Botones */
.buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
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
