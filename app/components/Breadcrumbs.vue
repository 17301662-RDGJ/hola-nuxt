<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const nombres = {
  formulario: "Formulario",
  galeria: "Galería",
  segunda: "Opciones",
  operaciones: "Operaciones",
  error: "Error",
};

const crumbs = route.path
  .split("/")
  .filter(Boolean)
  .map((item) => ({
    name: nombres[item] || item,
  }));
</script>

<template>
  <nav class="breadcrumbs" v-if="crumbs.length">
    <NuxtLink to="/" class="home">🏠 Inicio</NuxtLink>
    <span class="sep">/</span>
    <span class="current">{{ crumbs[0].name }}</span>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #fff;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  font-size: 14px;
}

.home {
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;
  cursor: pointer;
}

.home:hover {
  text-decoration: underline;
}

.sep {
  color: #999;
}

.current {
  font-weight: 600;
  color: #111;
}
</style>
