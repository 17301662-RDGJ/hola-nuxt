<template>
  <div class="error-page">
    <div class="overlay">
      <!-- TEXTO ANIMADO -->
      <h1 class="title">❌ Error de verificación</h1>

      <!-- BOTÓN ABAJO A LA DERECHA -->
      <NuxtLink to="/" class="btn"> Volver a intentar </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  background-image: url("/error.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Capa oscura */
.overlay {
  position: relative; /* 👈 necesario para posicionar el botón */
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

/* Animación del título */
.title {
  color: #ffffff;
  font-size: 2.2rem;
  margin-bottom: 10px;
  animation: fadeDown 1.2s ease-out;
}

/* Animación del subtítulo */
.subtitle {
  color: #e5e7eb;
  font-size: 1.1rem;
  margin-bottom: 25px;
  animation: fadeUp 1.4s ease-out;
}

/* Botón abajo a la derecha */
.btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 14px 28px;
  background: #ec8787;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1rem;
  animation: fadeIn 2s ease-out;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.btn:hover {
  background: #ddd6d6;
  transform: scale(1.05);
}

/* Animaciones */
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
