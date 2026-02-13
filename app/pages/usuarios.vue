<template>
  <Breadcrumbs />

  <div class="container">
    <h1>Bienvenido al Registro de Usuarios</h1>

    <div class="card">
      <form @submit.prevent="guardar">
        <div class="form-grid">
          <input
            v-model="nombre"
            placeholder="Nombre"
            required
            :class="{ 'input-error': errores.nombre }"
          />
          <span v-if="errores.nombre" class="msg-error">{{
            errores.nombre
          }}</span>
          <input
            v-model="apellidos"
            placeholder="Apellidos"
            required
            :class="{ 'input-error': errores.apellidos }"
          />
          <span v-if="errores.apellidos" class="msg-error">{{
            errores.apellidos
          }}</span>
          <input
            v-model="edad"
            placeholder="Edad"
            required
            :class="{ 'input-error': errores.edad }"
          />
          <span v-if="errores.edad" class="msg-error">{{ errores.edad }}</span>

          <select
            v-model="genero"
            required
            :class="{ 'input-error': errores.genero }"
          >
            <option value="">Seleccione un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
          <span v-if="errores.genero" class="msg-error">{{
            errores.genero
          }}</span>

          <select
            v-model="estado_civil"
            required
            :class="{ 'input-error': errores.estado_civil }"
          >
            <option value="">Seleccione estado civil</option>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viudo">Viudo</option>
          </select>
          <span v-if="errores.estado_civil" class="msg-error">{{
            errores.estado_civil
          }}</span>

          <input
            v-model="telefono"
            placeholder="Teléfono"
            required
            :class="{ 'input-error': errores.telefono }"
          />
          <span v-if="errores.telefono" class="msg-error">{{
            errores.telefono
          }}</span>
          <input
            v-model="email"
            placeholder="Email"
            required
            :class="{ 'input-error': errores.email }"
          />
          <span v-if="errores.email" class="msg-error">{{
            errores.email
          }}</span>
        </div>

        <button class="btn-primary">
          {{ editando ? "Actualizar" : "Agregar" }}
        </button>
      </form>
    </div>

    <hr />
    <div class="filtros">
      <input
        v-model="filtroTexto"
        placeholder="Buscar por nombre, apellidos, email o teléfono..."
      />

      <select v-model="filtroGenero">
        <option value="">Todos los géneros</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
      </select>

      <select v-model="filtroEstado">
        <option value="">Todos los estados civiles</option>
        <option value="Soltero">Soltero</option>
        <option value="Casado">Casado</option>
        <option value="Divorciado">Divorciado</option>
        <option value="Viudo">Viudo</option>
      </select>
    </div>

    <ul id="lista" class="list">
      <li v-for="u in listaFiltrada" :key="u.id" class="list-item">
        <div class="user-info">
          <strong>{{ u.nombre }} {{ u.apellidos }}</strong>
          <span>Edad: {{ u.edad }}</span>
          <span>Género: {{ u.genero }}</span>
          <span>Estado civil: {{ u.estado_civil }}</span>
          <span>Tel: {{ u.telefono }}</span>
          <span>Email: {{ u.email }}</span>
        </div>

        <div class="actions">
          <button @click="editar(u)" class="btn-edit">Editar</button>
          <button @click="borrar(u.id)" class="btn-delete">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useUsuarios } from "~/composables/useUsuarios";

// Campos
const nombre = ref("");
const apellidos = ref("");
const edad = ref("");
const genero = ref("");
const estado_civil = ref("");
const telefono = ref("");
const email = ref("");

const errores = ref({});
const lista = ref([]);

const filtroTexto = ref("");
const filtroGenero = ref("");
const filtroEstado = ref("");

const editando = ref(false);
let idActual = null;

const { obtenerUsuarios, agregarUsuario, actualizarUsuario, eliminarUsuario } =
  useUsuarios();

// ========== VALIDACIONES ==========
function validarCampo(campo, valor) {
  switch (campo) {
    case "nombre":
      if (!valor.trim()) return "El nombre es obligatorio.";
      if (!/^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$/.test(valor))
        return "El nombre solo puede contener letras.";
      break;

    case "apellidos":
      if (!valor.trim()) return "Los apellidos son obligatorios.";
      if (!/^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$/.test(valor))
        return "Los apellidos solo pueden contener letras.";
      break;

    case "edad":
      if (!valor) return "La edad es obligatoria.";
      if (isNaN(valor) || valor <= 0) return "La edad debe ser válida.";
      break;

    case "genero":
      if (!valor.trim()) return "Selecciona un género.";
      break;

    case "estado_civil":
      if (!valor.trim()) return "Selecciona un estado civil.";
      break;

    case "telefono":
      if (!valor.trim()) return "El teléfono es obligatorio.";
      if (!/^[0-9]{8,10}$/.test(valor))
        return "Debe tener entre 8 y 15 dígitos.";
      break;

    case "email":
      if (!valor.trim()) return "El email es obligatorio.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))
        return "El email no es válido.";
      break;
  }

  return null;
}

function validarTodo() {
  errores.value = {
    nombre: validarCampo("nombre", nombre.value),
    apellidos: validarCampo("apellidos", apellidos.value),
    edad: validarCampo("edad", edad.value),
    genero: validarCampo("genero", genero.value),
    estado_civil: validarCampo("estado_civil", estado_civil.value),
    telefono: validarCampo("telefono", telefono.value),
    email: validarCampo("email", email.value),
  };

  return Object.values(errores.value).every((e) => !e);
}

// ========== VALIDACIÓN EN TIEMPO REAL ==========
watch(nombre, (v) => (errores.value.nombre = validarCampo("nombre", v)));
watch(
  apellidos,
  (v) => (errores.value.apellidos = validarCampo("apellidos", v)),
);
watch(edad, (v) => (errores.value.edad = validarCampo("edad", v)));
watch(genero, (v) => (errores.value.genero = validarCampo("genero", v)));
watch(
  estado_civil,
  (v) => (errores.value.estado_civil = validarCampo("estado_civil", v)),
);
watch(telefono, (v) => (errores.value.telefono = validarCampo("telefono", v)));
watch(email, (v) => (errores.value.email = validarCampo("email", v)));

// ========== GUARDAR ==========
const guardar = async () => {
  if (!validarTodo()) {
    alert("Corrige los campos en rojo antes de continuar.");
    return;
  }

  const user = {
    nombre: nombre.value,
    apellidos: apellidos.value,
    edad: edad.value,
    genero: genero.value,
    estado_civil: estado_civil.value,
    telefono: telefono.value,
    email: email.value,
  };

  if (!editando.value) {
    await agregarUsuario(user);
  } else {
    await actualizarUsuario(idActual, user);
    editando.value = false;
  }

  limpiar();
  cargar();
};

// ========== LIMPIAR ==========
function limpiar() {
  nombre.value = "";
  apellidos.value = "";
  edad.value = "";
  genero.value = "";
  estado_civil.value = "";
  telefono.value = "";
  email.value = "";
  errores.value = {};
}

// ========== CRUD ==========
const cargar = async () => (lista.value = await obtenerUsuarios());
const borrar = async (id) => {
  await eliminarUsuario(id);
  cargar();
};

const editar = (u) => {
  nombre.value = u.nombre;
  apellidos.value = u.apellidos;
  edad.value = u.edad;
  genero.value = u.genero;
  estado_civil.value = u.estado_civil;
  telefono.value = u.telefono;
  email.value = u.email;

  idActual = u.id;
  editando.value = true;
};

// ========== FILTRO ==========
const listaFiltrada = computed(() =>
  lista.value.filter((u) => {
    const text = (
      u.nombre +
      " " +
      u.apellidos +
      " " +
      u.email +
      " " +
      u.telefono
    ).toLowerCase();

    return (
      text.includes(filtroTexto.value.toLowerCase()) &&
      (filtroGenero.value === "" || u.genero === filtroGenero.value) &&
      (filtroEstado.value === "" || u.estado_civil === filtroEstado.value)
    );
  }),
);

onMounted(() => cargar());
</script>

<style scoped>
/* 🔥 TEXTO BLANCO GLOBAL PARA ESTA VISTA */
* {
  color: white !important;
}

/* 🌌 Contenedor principal estilo dashboard */
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: "Segoe UI", system-ui, sans-serif;
  text-align: center;
}

/* 📝 Título principal */
h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 25px;
  color: white;
}

/* 🌟 Tarjeta tipo glass */
.card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);
  padding: 30px;
  border-radius: 18px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4);
  margin-bottom: 35px;
}

/* 🧩 Grid del formulario */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 15px;
}

/* ✏ Inputs estilo glass */
input,
select {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  outline: none;
  font-size: 14px;
  transition: 0.25s ease;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

input:focus,
select:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 8px rgba(96, 165, 250, 0.5);
}

/* 🔵 Botón principal */
.btn-primary {
  margin-top: 18px;
  padding: 14px;
  background: #1d4ed8;
  border: none;
  color: white !important;
  font-size: 16px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  transition: 0.3s ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
}

.btn-primary:hover {
  background: #1e40af;
  transform: translateY(-2px);
}

/* 🔎 Filtros */
.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin: 30px 0;
}

/* 📋 Lista glass */
.list {
  list-style: none;
  padding: 0;
  margin-top: 25px;
}

.list-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 18px;
  margin-bottom: 12px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  transition: 0.3s ease;
}

.list-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* ℹ Info del usuario */
.user-info {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  max-width: 70%;
  color: white !important;
}

/* 🟢 Botón editar */
.btn-edit {
  background: #22c55e;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-edit:hover {
  background: #15803d;
  transform: translateY(-2px);
}

/* 🔴 Botón eliminar */
.btn-delete {
  background: #ef4444;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn-delete:hover {
  background: #b91c1c;
  transform: translateY(-2px);
}
.input-error {
  border: 2px solid #ff4d4d !important;
  background: rgba(255, 0, 0, 0.08);
}

.msg-error {
  color: #ff4d4d;
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 8px;
}
s/* === SELECTS DEL FORMULARIO === */
select {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08); /* mismo fondo translúcido azul */
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: white;
  font-size: 15px;
}

/* Opciones con fondo oscuro y texto blanco */
select option {
  background-color: #0a2a6b; /* mismo tono azul del fondo */
  color: white;
}

/* Mostrar opción seleccionada sobre azul */
select option:checked {
  background-color: #103a8c;
}

/* Error */
select.input-error {
  border: 2px solid #ff4d4d !important;
  background: rgba(255, 0, 0, 0.08);
}

/* === SELECTS DE FILTROS (Género - Estado civil) === */
.filtros select {
  width: 260px; /* mismo tamaño que el input de texto de búsqueda */
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: white;
}

.filtros input {
  width: 260px; /* igualar tamaños */
}
</style>
