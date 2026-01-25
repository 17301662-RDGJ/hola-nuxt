<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "~/utils/supabase";

const fotos = ref([]);
const index = ref(0);

const obtenerFotos = async () => {
  const { data } = await supabase.from("fotos").select("*").order("created_at");

  fotos.value = data;
};

const siguiente = () => {
  index.value = (index.value + 1) % fotos.value.length;
};

const anterior = () => {
  index.value = (index.value - 1 + fotos.value.length) % fotos.value.length;
};

onMounted(obtenerFotos);
</script>

<template>
  <div v-if="fotos.length" class="carrusel">
    <button @click="anterior">◀</button>

    <img :src="fotos[index].url" class="imagen" />

    <button @click="siguiente">▶</button>
  </div>
</template>

<style scoped>
.carrusel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.imagen {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
button {
  font-size: 20px;
}
</style>
