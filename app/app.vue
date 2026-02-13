<script setup>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
</script>
<template>
  <div>
    <!-- NAVBAR -->
    <nav class="navbar">
      <div class="nav-container">
        <!-- LOGO -->
        <h1 class="nav-logo">Mi Proyecto Nuxt.Js</h1>
        <!-- BOTÓN RESPONSIVE (solo móvil) -->
        <button class="menu-btn" @click="menuOpen = !menuOpen">
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>

        <!-- MENU -->
        <ul class="menu" :class="{ show: menuOpen }">
          <li><NuxtLink to="/">Inicio</NuxtLink></li>
          <li><NuxtLink to="/segunda">Opciones</NuxtLink></li>
          <li><NuxtLink to="/operaciones">Operaciones</NuxtLink></li>
          <li><NuxtLink to="/formulario">Formulario</NuxtLink></li>
          <li><NuxtLink to="/galeria">Galería</NuxtLink></li>
          <li><NuxtLink to="/usuarios">Usuarios</NuxtLink></li>
          <li><NuxtLink to="/error">Página de Error</NuxtLink></li>
        </ul>
      </div>
    </nav>

    <!-- Contenedor del contenido -->
    <main class="content">
      <Breadcrumbs />
      <!-- 👈 Aquí debe aparecer -->
      <NuxtPage />
    </main>
  </div>
</template>

<style>
/* --------------------------- */
/* NAVBAR PROFESIONAL GLASS    */
/* --------------------------- */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(23, 25, 35, 0.55);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  z-index: 1000;
  padding: 12px 0;
}

/* Contenedor interno */
.nav-container {
  max-width: 1200px;
  margin: auto;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* LOGO */
.nav-logo {
  color: #fff;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.8px;
}

/* MENU DESKTOP */
.menu {
  display: flex;
  gap: 28px;
  list-style: none;
}

.menu a {
  color: #dbeafe;
  text-decoration: none;
  font-size: 15px;
  position: relative;
  transition: 0.3s;
}

.menu a:hover {
  color: rgb(250, 247, 247);
}
.card,
.card * {
  color: #1e293b !important; /* azul gris oscuro — se ve profesional LETRAS */
}
/* Efecto línea animada */
.menu a::after {
  content: "";
  position: absolute;
  height: 2px;
  left: 0;
  bottom: -3px;
  width: 0;
  background: white;
  transition: 0.3s;
}

.menu a:hover::after {
  width: 100%;
}

/* --------------------------- */
/* BOTÓN HAMBURGUESA           */
/* --------------------------- */
.menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-btn span {
  width: 26px;
  height: 3px;
  background: white;
  border-radius: 6px;
  transition: 0.3s;
}

.menu-btn span.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-btn span.open:nth-child(2) {
  opacity: 0;
}

.menu-btn span.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* --------------------------- */
/* ESTILO RESPONSIVE           */
/* --------------------------- */
@media (max-width: 830px) {
  .menu-btn {
    display: flex;
  }

  .menu {
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    background: rgba(15, 23, 42, 0.92);
    backdrop-filter: blur(18px);
    padding: 18px 0;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    display: none;
  }

  .menu.show {
    display: flex;
  }
}

/* --------------------------- */
/* CONTENIDO GENERAL           */
/* --------------------------- */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 110px; /* espacio para navbar */
}

body {
  font-family: "Inter", sans-serif;
  background: radial-gradient(
    circle at top left,
    #60a5fa,
    #1e3a8a 40%,
    #0f172a 90%
  );
  min-height: 100vh;
  color: white;
}
</style>
