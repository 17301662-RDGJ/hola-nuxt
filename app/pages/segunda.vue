<script setup>
const opciones = [
  { nombre: "Formulario", ruta: "/formulario", icono: "📝" },
  { nombre: "Galería", ruta: "/galeria", icono: "🖼️" },
  { nombre: "Operaciones", ruta: "/operaciones", icono: "➗" },
  { nombre: "Usuarios", ruta: "/usuarios", icono: "👤" },
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
/* Fondo profesional tipo "dashboard" */
.contenedor {
  min-height: 100vh;

  /* Fondo igual a otras vistas */
  background: radial-gradient(circle at top left, #0f172a, #1e293b);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 40px 20px;
}

/* HEADER */
.header {
  text-align: center;
  margin-bottom: 50px;
  color: #e2e8f0;
  animation: fadeIn 0.8s ease;
}

.header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #f1f5f9;
}

.header p {
  margin-top: 8px;
  font-size: 1.2rem;
  opacity: 0.8;
}

/* GRID DEL MENÚ */
.menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 28px;
  width: 100%;
  max-width: 900px;
}

/* TARJETAS CON GLASS + NEUMORFISMO */
.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);

  border-radius: 22px;
  padding: 32px;
  text-align: center;
  text-decoration: none;

  /* Texto blanco */
  color: #ffffff !important;

  /* Sombras suaves */
  box-shadow:
    4px 4px 10px rgba(0, 0, 0, 0.25),
    -4px -4px 10px rgba(255, 255, 255, 0.1);

  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Efecto 3D al pasar el ratón */
.card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow:
    6px 6px 16px rgba(0, 0, 0, 0.35),
    -6px -6px 16px rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.12);
}

/* ICONO */
.icono {
  font-size: 3.2rem;
  display: block;
  margin-bottom: 14px;
  transition: transform 0.3s ease;
}

/* Pequeña animación al hover */
.card:hover .icono {
  transform: scale(1.2);
}

/* TEXTO */
.texto {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Animación */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
