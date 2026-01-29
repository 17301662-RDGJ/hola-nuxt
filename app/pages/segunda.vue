<script setup>
const opciones = [
  { nombre: "Formulario", ruta: "/formulario", icono: "📝" },
  { nombre: "Galería", ruta: "/galeria", icono: "🖼️" },
  { nombre: "Operaciones", ruta: "/operaciones", icono: "➗" },
  { nombre: "Error", ruta: "/error", icono: "❌" },
];
</script>

<template>
  <Breadcrumbs />
  <div class="contenedor">
    <!-- TÍTULO -->
    <div class="header">
      <h1>Hola Mundo🌎✨</h1>
      <p>Mi primera app con Nuxt.js</p>
    </div>

    <!-- MENÚ CENTRAL -->
    <div class="menu">
      <NuxtLink
        v-for="item in opciones"
        :key="item.ruta"
        :to="item.ruta"
        class="card"
      >
        <span class="icono">{{ item.icono }}</span>
        <span class="texto">{{ item.nombre }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* CONTENEDOR GENERAL */
.contenedor {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

/* HEADER */
.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #0f172a;
}

.header p {
  margin-top: 8px;
  font-size: 1.1rem;
  color: #475569;
}

/* GRID DEL MENÚ */
.menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 900px;
}

/* TARJETAS */
.card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  text-decoration: none;
  color: #0f172a;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
}

/* ICONO */
.icono {
  font-size: 3rem;
  display: block;
  margin-bottom: 12px;
}

/* TEXTO */
.texto {
  font-size: 1.1rem;
  font-weight: 600;
}
</style>
