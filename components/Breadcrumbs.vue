<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// nombres bonitos para cada ruta
const routeNames = {
  opciones: "Opciones",
  operaciones: "Operaciones",
  formulario: "Formulario",
  galeria: "Galería",
  error: "Error",
};

const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean);

  return paths.map((path, index) => ({
    label: routeNames[path] || path,
    to: "/" + paths.slice(0, index + 1).join("/"),
  }));
});
</script>

<template>
  <nav class="breadcrumbs">
    <NuxtLink to="/">Inicio</NuxtLink>

    <span v-for="(bc, i) in breadcrumbs" :key="i">
      <span class="sep">›</span>
      <NuxtLink v-if="i < breadcrumbs.length - 1" :to="bc.to">
        {{ bc.label }}
      </NuxtLink>
      <span v-else class="current">{{ bc.label }}</span>
    </span>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.breadcrumbs a {
  color: #fcd704;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.sep {
  margin: 0 6px;
}

.current {
  font-weight: 600;
  color: #111827;
}
</style>
