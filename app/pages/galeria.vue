<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const fotos = ref([]);
const archivo = ref(null);
const cargando = ref(false);

// índice del carrusel
const index = ref(0);

let supabase;

// 👉 AUTOPLAY
let autoplayInterval = null;

// 👉 SWIPE
const startX = ref(0);

onMounted(async () => {
  supabase = useNuxtApp().$supabase;
  await cargarFotos();

  // autoplay cada 4 segundos
  autoplayInterval = setInterval(() => {
    if (fotos.value.length > 1) {
      next();
    }
  }, 4000);
});

onUnmounted(() => {
  clearInterval(autoplayInterval);
});

// cambiar imagen
const next = () => {
  index.value = (index.value + 1) % fotos.value.length;
};

const prev = () => {
  index.value = (index.value - 1 + fotos.value.length) % fotos.value.length;
};

// 👉 SWIPE handlers
const onTouchStart = (e) => {
  startX.value = e.touches ? e.touches[0].clientX : e.clientX;
};

const onTouchEnd = (e) => {
  const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

  const diff = endX - startX.value;

  if (diff > 50) prev(); // derecha
  if (diff < -50) next(); // izquierda
};

// seleccionar archivo (VALIDADO)
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("❌ Solo se permiten imágenes");
    e.target.value = "";
    archivo.value = null;
    return;
  }

  const MAX_SIZE_MB = 5;
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    alert("❌ La imagen no debe pesar más de 5MB");
    e.target.value = "";
    archivo.value = null;
    return;
  }

  archivo.value = file;
};

// subir imagen
const subirImagen = async () => {
  if (!archivo.value) return alert("Selecciona una imagen");
  if (!archivo.value.type.startsWith("image/")) {
    return alert("❌ Archivo no permitido");
  }

  cargando.value = true;
  const nombre = `${Date.now()}_${archivo.value.name}`;

  const { error } = await supabase.storage
    .from("imagenes")
    .upload(nombre, archivo.value);

  if (error) {
    cargando.value = false;
    return alert(error.message);
  }

  const { data } = supabase.storage.from("imagenes").getPublicUrl(nombre);
  await supabase.from("fotos").insert([{ url: data.publicUrl }]);

  archivo.value = null;
  cargando.value = false;
  cargarFotos();
};

// cargar fotos
const cargarFotos = async () => {
  const { data } = await supabase
    .from("fotos")
    .select("*")
    .order("created_at", { ascending: false });

  fotos.value = data || [];
};
</script>

<template>
  <Breadcrumbs />
  <div class="page">
    <div class="card">
      <h2 class="title">Galería de Imágenes 🖼️</h2>
      <p class="subtitle">Subir y visualizar imágenes</p>

      <input type="file" accept="image/*" @change="handleFileChange" />

      <button class="subir" @click="subirImagen" :disabled="cargando">
        {{ cargando ? "Subiendo..." : "Subir imagen" }}
      </button>

      <div
        v-if="fotos.length"
        class="carousel"
        @mousedown="onTouchStart"
        @mouseup="onTouchEnd"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <button class="nav" @click="prev">‹</button>

        <img :src="fotos[index].url" draggable="false" />

        <button class="nav" @click="next">›</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🌟 Estilo general */
* {
  color: white !important;
}
/* 🌌 Fondo estilo dashboard */
.page {
  min-height: 100vh;
  background: radial-gradient(circle at top left, #0f172a, #1e3a8a);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-family: "Segoe UI", system-ui, sans-serif;
  color: white;
}

/* 🌟 Tarjeta tipo glass + sombra */
.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 40px 35px;
  width: 800px;
  text-align: center;
  box-shadow: 0 25px 55px rgba(0, 0, 0, 0.35);
  animation: fadeIn 0.8s ease;
}

/* ✨ Animación */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 🎨 TITULOS */
.title {
  font-size: 30px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 25px;
}

/* 📁 INPUT file con estilo */
input[type="file"] {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  transition: 0.3s ease;
  text-align: center;
}

input[type="file"]::file-selector-button {
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 8px 14px;
  margin-right: 10px;
  border-radius: 8px;
  cursor: pointer;
}

/* ⭐ Botón principal */
.subir {
  background: #1d4ed8;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 12px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 12px;
  transition: 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.subir:hover {
  background: #1e40af;
  transform: translateY(-2px);
}

.subir:disabled {
  background: #64748b;
  cursor: not-allowed;
  transform: none;
}

/* 🖼 CARRUSEL */
.carousel {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

/* Imagen del carrusel */
.carousel img {
  max-width: 550px;
  max-height: 360px;
  border-radius: 15px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
  user-select: none;
}

/* 🔵 Botones de navegación */
.nav {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: 0.25s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.nav:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}
</style>
