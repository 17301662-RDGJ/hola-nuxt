<template>
  <Breadcrumbs />

  <div class="container">
    <h1>Bienvenido al Registro de Usuarios</h1>

    <!-- BOTÓN NUEVO USUARIO -->
    <button @click="mostrarFormulario = !mostrarFormulario" class="btn-toggle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        />
      </svg>
      {{ mostrarFormulario ? "Cancelar" : "Nuevo usuario" }}
    </button>

    <!-- FORMULARIO MOSTRAR/OCULTAR -->
    <transition name="slide-fade">
      <div v-if="mostrarFormulario" class="card">
        <form @submit.prevent="guardar">
          <div class="form-grid">
            <!-- CAMPOS ORIGINALES + VALIDACIÓN -->
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
            <span v-if="errores.edad" class="msg-error">{{
              errores.edad
            }}</span>

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

            <input
              type="date"
              v-model="fecha_inicial"
              required
              :class="{ 'input-error': errores.fecha_inicial }"
            />
            <span v-if="errores.fecha_inicial" class="msg-error">{{
              errores.fecha_inicial
            }}</span>

            <input
              type="date"
              v-model="fecha_final"
              required
              :class="{ 'input-error': errores.fecha_final }"
            />
            <span v-if="errores.fecha_final" class="msg-error">{{
              errores.fecha_final
            }}</span>
          </div>

          <button class="btn-primary">
            {{ editando ? "Actualizar" : "Agregar" }}
          </button>
        </form>
      </div>
    </transition>

    <hr />

    <!-- 🔍 FILTROS -->
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

      <input type="date" v-model="fechaInicio" />
      <input type="date" v-model="fechaFin" />
    </div>

    <!-- LISTA -->
    <ul id="lista" class="list">
      <li v-for="u in usuariosPaginados" :key="u.id" class="list-item">
        <div class="user-info">
          <strong>{{ u.nombre }} {{ u.apellidos }}</strong>
          <span>Edad: {{ u.edad }}</span>
          <span>Género: {{ u.genero }}</span>
          <span>Estado civil: {{ u.estado_civil }}</span>
          <span>Tel: {{ u.telefono }}</span>
          <span>Email: {{ u.email }}</span>
          <span>Desde: {{ u.fecha_inicial }}</span>
          <span>Hasta: {{ u.fecha_final }}</span>
        </div>

        <div class="actions">
          <button @click="editar(u)" class="btn-edit">Editar</button>
          <button @click="borrar(u.id)" class="btn-delete">Eliminar</button>
        </div>
      </li>
    </ul>

    <!-- PAGINACIÓN MINIMALISTA -->
    <div class="pagination">
      <button @click="paginaActual--" :disabled="paginaActual === 1">
        &lt;
      </button>

      <span class="page-numbers">
        <span
          v-for="n in totalPaginas"
          :key="n"
          class="page"
          :class="{ active: n === paginaActual }"
          @click="paginaActual = n"
        >
          {{ n }}
        </span>
      </span>

      <button @click="paginaActual++" :disabled="paginaActual === totalPaginas">
        &gt;
      </button>
    </div>
  </div>

  <div id="toast" class="toast" v-show="toastVisible">
    {{ toastMessage }}
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useUsuarios } from "~/composables/useUsuarios";

const mostrarFormulario = ref(false);

// CAMPOS
const nombre = ref("");
const apellidos = ref("");
const edad = ref("");
const genero = ref("");
const estado_civil = ref("");
const telefono = ref("");
const email = ref("");
const fecha_inicial = ref("");
const fecha_final = ref("");

// ERRORES
const errores = ref({});

// LISTA
const lista = ref([]);

// FILTROS
const filtroTexto = ref("");
const filtroGenero = ref("");
const filtroEstado = ref("");
const fechaInicio = ref("");
const fechaFin = ref("");

const editando = ref(false);
let idActual = null;

// PAGINACIÓN
const paginaActual = ref(1);
const porPagina = ref(5);

// CRUD
const { obtenerUsuarios, agregarUsuario, actualizarUsuario, eliminarUsuario } =
  useUsuarios();

// VALIDACIONES ORIGINALES
function validarCampo(campo, valor) {
  switch (campo) {
    case "nombre":
      if (!valor || valor.trim().length === 0)
        return "El nombre es obligatorio.";
      if (valor.trim().length > 25)
        return "El nombre no puede exceder 25 caracteres.";
      if (!/^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$/.test(valor))
        return "Solo se permiten letras.";
      break;

    case "apellidos":
      if (!valor || valor.trim().length === 0)
        return "Los apellidos son obligatorios.";
      if (valor.trim().length > 30) return "No puede exceder 30 caracteres.";
      if (!/^[a-zA-ZÁÉÍÓÚÑáéíóúñ ]+$/.test(valor))
        return "Solo se permiten letras.";
      break;

    case "edad":
      if (!valor) return "La edad es obligatoria.";
      if (!/^[0-9]{1,2}$/.test(valor)) return "Edad inválida.";
      break;

    case "genero":
      if (!valor) return "Selecciona género.";
      break;

    case "estado_civil":
      if (!valor) return "Selecciona estado civil.";
      break;

    case "telefono":
      if (!valor.trim()) return "El teléfono es obligatorio.";
      if (!/^[0-9]{8,10}$/.test(valor))
        return "Debe tener entre 8 y 10 dígitos.";
      break;

    case "email":
      if (!valor || valor.trim().length === 0)
        return "El email es obligatorio.";
      if (valor.length > 40) return "No puede exceder 40 caracteres.";
      if (valor.includes(" ")) return "No debe contener espacios.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Email inválido.";
      break;

    case "fecha_inicial":
      if (!valor) return "La fecha inicial es obligatoria.";
      break;

    case "fecha_final":
      if (!valor) return "La fecha final es obligatoria.";
      if (fecha_inicial.value && valor < fecha_inicial.value)
        return "La fecha final no puede ser menor que la inicial.";
      break;
  }
  return null;
}

// VALIDACIÓN COMPLETA
function validarTodo() {
  errores.value = {
    nombre: validarCampo("nombre", nombre.value),
    apellidos: validarCampo("apellidos", apellidos.value),
    edad: validarCampo("edad", edad.value),
    genero: validarCampo("genero", genero.value),
    estado_civil: validarCampo("estado_civil", estado_civil.value),
    telefono: validarCampo("telefono", telefono.value),
    email: validarCampo("email", email.value),
    fecha_inicial: validarCampo("fecha_inicial", fecha_inicial.value),
    fecha_final: validarCampo("fecha_final", fecha_final.value),
  };
  return Object.values(errores.value).every((e) => !e);
}

// WATCHERS
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
watch(
  fecha_inicial,
  (v) => (errores.value.fecha_inicial = validarCampo("fecha_inicial", v)),
);
watch(
  fecha_final,
  (v) => (errores.value.fecha_final = validarCampo("fecha_final", v)),
);

// CRUD FUNCIONES
const guardar = async () => {
  if (!validarTodo()) {
    showToast("Corrige los campos marcados antes de continuar.");
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
    fecha_inicial: fecha_inicial.value,
    fecha_final: fecha_final.value,
  };

  if (!editando.value) {
    await agregarUsuario(user);
    showToast("Usuario agregado ✔");
  } else {
    await actualizarUsuario(idActual, user);
    editando.value = false;
    showToast("Usuario actualizado ✔");
  }

  limpiar();
  mostrarFormulario.value = false;
  cargar();
};

const limpiar = () => {
  nombre.value = "";
  apellidos.value = "";
  edad.value = "";
  genero.value = "";
  estado_civil.value = "";
  telefono.value = "";
  email.value = "";
  fecha_inicial.value = "";
  fecha_final.value = "";
  errores.value = {};
};

const cargar = async () => (lista.value = await obtenerUsuarios());

const borrar = async (id) => {
  await eliminarUsuario(id);
  cargar();
};

const editar = (u) => {
  mostrarFormulario.value = true;

  nombre.value = u.nombre;
  apellidos.value = u.apellidos;
  edad.value = u.edad;
  genero.value = u.genero;
  estado_civil.value = u.estado_civil;
  telefono.value = u.telefono;
  email.value = u.email;
  fecha_inicial.value = u.fecha_inicial;
  fecha_final.value = u.fecha_final;

  idActual = u.id;
  editando.value = true;
};

// FILTROS
const listaFiltrada = computed(() =>
  lista.value.filter((u) => {
    const text =
      `${u.nombre} ${u.apellidos} ${u.email} ${u.telefono}`.toLowerCase();
    const coincideTexto = text.includes(filtroTexto.value.toLowerCase());
    const coincideGenero =
      !filtroGenero.value || u.genero === filtroGenero.value;
    const coincideEstado =
      !filtroEstado.value || u.estado_civil === filtroEstado.value;

    const fechaRegistro = new Date(u.fecha_inicial);
    const inicio = fechaInicio.value ? new Date(fechaInicio.value) : null;
    const fin = fechaFin.value ? new Date(fechaFin.value) : null;

    const coincideFecha =
      (!inicio || fechaRegistro >= inicio) && (!fin || fechaRegistro <= fin);

    return coincideTexto && coincideGenero && coincideEstado && coincideFecha;
  }),
);

// PAGINACIÓN COMPUTED
const totalPaginas = computed(() =>
  Math.ceil(listaFiltrada.value.length / porPagina.value),
);

const usuariosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina.value;
  return listaFiltrada.value.slice(inicio, inicio + porPagina.value);
});

// TOAST
const toastVisible = ref(false);
const toastMessage = ref("");

function showToast(msg) {
  toastMessage.value = msg;
  toastVisible.value = true;
  const toastEl = document.getElementById("toast");
  toastEl.classList.add("show");

  setTimeout(() => {
    toastEl.classList.remove("show");
    toastVisible.value = false;
  }, 2500);
}

onMounted(() => cargar());
</script>

<style scoped>
/* 🔥 TEXTO BLANCO GLOBAL PARA ESTA VISTA */
* {
  color: white !important;
}

/* ESTILOS GENERALES */
.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  text-align: center;
}

/* BOTÓN TOGGLE NUEVO USUARIO */
.btn-toggle {
  background: #2563eb;
  color: white;
  padding: 8px 14px;
  border-radius: 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 15px;
  transition: 0.2s;
}

.btn-toggle:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}

/* BOTÓN AGREGAR/ACTUALIZAR COMO EL DE CANCELAR */
.btn-primary {
  background: #2563eb !important;
  color: white !important;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  margin-top: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-primary:hover {
  background: #1d4ed8 !important;
  transform: scale(1.05);
}

/* TRANSICIÓN FORMULARIO */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* CARD */
.card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 30px;
  border-radius: 18px;
  margin-bottom: 35px;
  backdrop-filter: blur(14px);
}

/* GRID FORM */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 15px;
}

/* INPUTS Y SELECTS */
input,
select {
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: white !important;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* LISTAS DESPLEGABLES AZULES */
select {
  background-color: rgba(30, 58, 138, 0.8) !important;
  color: white !important;
}

select option {
  background-color: #1e40af !important;
  color: white !important;
}

/* ERRORES */
.input-error {
  border: 2px solid #ff4d4d !important;
  background-color: rgba(255, 0, 0, 0.1);
}

.msg-error {
  color: #ff4d4d !important;
  margin-top: -10px;
  margin-bottom: 8px;
}

/* FILTROS */
.filtros input,
.filtros select {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.filtros input::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* LISTA */
.list {
  list-style: none;
  padding: 0;
  margin-top: 25px;
}

.list-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.user-info {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  max-width: 70%;
}

/* BOTONES CRUD */
.btn-edit {
  background: #22c55e;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.btn-edit:hover {
  background: #15803d;
}

.btn-delete {
  background: #ef4444;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.btn-delete:hover {
  background: #b91c1c;
}

/* PAGINACIÓN MINIMALISTA */
.pagination {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.page-numbers {
  display: flex;
  gap: 6px;
}

.page {
  padding: 6px 10px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 6px;
}

.page.active {
  background: #3b82f6;
  font-weight: bold;
}

.page:hover {
  background: rgba(255, 255, 255, 0.22);
}

/* TOAST — AHORA SE VE ENCIMA DEL NAV */
.toast {
  position: fixed;
  top: 95px !important;
  right: 25px;
  background: #16a34a;
  padding: 14px 22px;
  border-radius: 10px;
  z-index: 9999 !important;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.4s ease;
}

.toast.show {
  opacity: 1 !important;
  transform: translateY(0);
}
</style>
