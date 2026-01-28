<template>
  <div>
    <!-- Navbar fijo -->
    <nav class="navbar">
      <h1 class="logo">Mi Proyecto Nuxt.Js</h1>
      <ul class="menu">
        <li><NuxtLink to="/">Inicio</NuxtLink></li>
        <li><NuxtLink to="/segunda">Opciones</NuxtLink></li>
        <li><NuxtLink to="/operaciones">Operaciones</NuxtLink></li>
        <li><NuxtLink to="/formulario">Formulario</NuxtLink></li>
        <li><NuxtLink to="/galeria">Galería</NuxtLink></li>
        <li><NuxtLink to="/error">Página de Error</NuxtLink></li>
      </ul>
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
/* Navbar */
.navbar {
  position: fixed;
  top: 10;
  left: 10;
  width: 100%;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background-color: #1e3a8a;
  color: white;
  box-sizing: border-box;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.menu {
  list-style: none;
  display: flex;
  gap: 20px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.menu a:hover {
  text-decoration: underline;
}

/* Contenido */
.content {
  padding-top: 120px; /* 🔑 espacio suficiente para navbar + breadcrumbs */
  max-width: 1200px;
  margin: 0 auto;
}
</style>
