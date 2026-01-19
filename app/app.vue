<template>
  <div>
    <!-- Barra de menú -->
    <nav class="navbar">
      <h1 class="logo">Mi Proyecto</h1>

      <ul class="menu">
        <li><NuxtLink to="/">Inicio</NuxtLink></li>
        <li><NuxtLink to="/operaciones">Operaciones</NuxtLink></li>
        <li><NuxtLink to="/formulario">Formulario</NuxtLink></li>
      </ul>
    </nav>

    <!-- Aquí se cargan las páginas -->
    <NuxtPage />
  </div>
</template>

<style>
.navbar {
  background-color: #1e3a8a;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>

