<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

// Convertimos la ruta en partes
const breadcrumbs = route.path
  .split("/")
  .filter(Boolean)
  .map((segment, index, array) => {
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: "/" + array.slice(0, index + 1).join("/"),
    };
  });
</script>

<template>
  <nav class="breadcrumbs">
    <NuxtLink to="/">Inicio</NuxtLink>

    <span v-for="(bc, index) in breadcrumbs" :key="index">
      <span class="separator"> / </span>
      <NuxtLink :to="bc.path">{{ bc.name }}</NuxtLink>
    </span>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumbs a {
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.separator {
  color: #64748b;
}
</style>
