<template>
  <Breadcrumbs />

  <div class="container">
    <h1>Bienvenido al Registro de Usuarios</h1>

    <!-- BOTÓN NUEVO USUARIO -->
    <button @click="abrirModal" class="btn-toggle">Nuevo usuario</button>

    <!-- MODAL -->
    <div
      v-if="mostrarFormulario"
      class="modal-overlay"
      @click.self="cerrarModal"
    >
      <div class="modal">
        <h2>{{ editando ? "Editar Usuario" : "Nuevo Usuario" }}</h2>

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

            <input type="date" v-model="fecha_inicial" required />
            <input type="date" v-model="fecha_final" required />
          </div>

          <button class="btn-primary">
            {{ editando ? "Actualizar" : "Agregar" }}
          </button>

          <button type="button" class="btn-cancel" @click="cerrarModal">
            Cancelar
          </button>
        </form>
      </div>
    </div>

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
    <table class="tabla-usuarios">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Género</th>
          <th>Estado Civil</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Fecha Inicial</th>
          <th>Fecha Final</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in usuariosPaginados" :key="u.id">
          <td>{{ u.nombre }} {{ u.apellidos }}</td>
          <td>{{ u.edad }}</td>
          <td>{{ u.genero }}</td>
          <td>{{ u.estado_civil }}</td>
          <td>{{ u.telefono }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.fecha_inicial }}</td>
          <td>{{ u.fecha_final }}</td>
          <td class="acciones">
            <button @click="editar(u)" class="btn-edit">Editar</button>
            <button @click="borrar(u.id)" class="btn-delete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- PAGINACIÓN -->
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
import { ref, computed, watch, onMounted } from "vue";
import { useUsuarios } from "~/composables/useUsuarios";

// MODAL CONTROL
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

// CRUD
const { obtenerUsuarios, agregarUsuario, actualizarUsuario, eliminarUsuario } =
  useUsuarios();
const lista = ref([]);

// FILTROS
const filtroTexto = ref("");
const filtroGenero = ref("");
const filtroEstado = ref("");
const fechaInicio = ref("");
const fechaFin = ref("");

// EDITAR
const editando = ref(false);
let idActual = null;

// PAGINACIÓN
const paginaActual = ref(1);
const porPagina = ref(5);

// ------------ MODAL ------------
const abrirModal = () => {
  mostrarFormulario.value = true;
};

const cerrarModal = () => {
  mostrarFormulario.value = false;
  limpiar();
};

// ---------- VALIDACIONES ----------
function validarCampo(campo, valor) {
  switch (campo) {
    case "nombre":
      if (!valor.trim()) return "El nombre es obligatorio.";
      if (valor.length > 25) return "Máximo 25 caracteres.";
      break;
    case "apellidos":
      if (!valor.trim()) return "Los apellidos son obligatorios.";
      if (valor.length > 30) return "Máximo 30 caracteres.";
      break;
    case "edad":
      if (!/^[0-9]{1,2}$/.test(valor)) return "Edad inválida.";
      break;
    case "telefono":
      if (!/^[0-9]{8,10}$/.test(valor)) return "Debe tener 8-10 dígitos.";
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return "Email inválido.";
      break;
  }
  return null;
}

// Validación al guardar
function validarTodo() {
  errores.value = {
    nombre: validarCampo("nombre", nombre.value),
    apellidos: validarCampo("apellidos", apellidos.value),
    edad: validarCampo("edad", edad.value),
    genero: !genero.value ? "Selecciona género." : null,
    estado_civil: !estado_civil.value ? "Selecciona estado civil." : null,
    telefono: validarCampo("telefono", telefono.value),
    email: validarCampo("email", email.value),
  };
  return Object.values(errores.value).every((e) => !e);
}

// CRUD
const guardar = async () => {
  if (!validarTodo()) {
    showToast("Corrige los campos marcados.");
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
  cerrarModal();
  cargar();
};

const editar = (u) => {
  abrirModal();

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

const borrar = async (id) => {
  await eliminarUsuario(id);
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

const cargar = async () => {
  lista.value = await obtenerUsuarios();
};

// FILTRO + PAGINACIÓN
const listaFiltrada = computed(() =>
  lista.value.filter((u) => {
    const text =
      `${u.nombre} ${u.apellidos} ${u.email} ${u.telefono}`.toLowerCase();
    return (
      text.includes(filtroTexto.value.toLowerCase()) &&
      (!filtroGenero.value || u.genero === filtroGenero.value) &&
      (!filtroEstado.value || u.estado_civil === filtroEstado.value)
    );
  }),
);

const totalPaginas = computed(() =>
  Math.ceil(listaFiltrada.value.length / porPagina.value),
);

const usuariosPaginados = computed(() => {
  const start = (paginaActual.value - 1) * porPagina.value;
  return listaFiltrada.value.slice(start, start + porPagina.value);
});

// TOAST
const toastVisible = ref(false);
const toastMessage = ref("");

function showToast(msg) {
  toastMessage.value = msg;
  toastVisible.value = true;
  setTimeout(() => (toastVisible.value = false), 2500);
}

onMounted(() => cargar());
</script>

<style scoped>
* {
  color: white !important;
}
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.btn-toggle {
  background: #2563eb;
  padding: 10px 18px;
  border-radius: 12px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
}

.btn-primary {
  background: #2563eb;
  padding: 10px 16px;
  margin-top: 20px;
  border-radius: 12px;
  cursor: pointer;
}

.btn-cancel {
  background: #ef4444;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
  margin-left: 10px;
}

.input-error {
  border: 2px solid #ff4d4d !important;
  background: rgba(255, 0, 0, 0.1);
}

.msg-error {
  color: #ff4d4d !important;
  font-size: 12px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 15px;
}

.list-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.btn-edit {
  background: #22c55e;
  padding: 8px 12px;
  border-radius: 8px;
}
.btn-delete {
  background: #ef4444;
  padding: 8px 12px;
  border-radius: 8px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.toast {
  position: fixed;
  top: 90px;
  right: 25px;
  background: #16a34a;
  padding: 14px 22px;
  border-radius: 10px;
  opacity: 0.9;
}
/* MODAL OVERLAY */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

/* CONTENEDOR DEL MODAL */
.modal {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(14px);
  padding: 30px;
  border-radius: 18px;
  width: 90%;
  max-width: 600px;
  animation: fadeInModal 0.25s ease;
}

/* ANIMACIÓN */
@keyframes fadeInModal {
  from {
    transform: translateY(-12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* BOTÓN CANCELAR */
.btn-cancel {
  background: #ef4444 !important;
  padding: 10px 20px;
  border-radius: 12px;
  border: none;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-cancel:hover {
  background: #b91c1c !important;
  transform: scale(1.05);
}

/* 🔵 FONDO AZUL EN LOS INPUTS Y SELECT */
.modal input,
.modal select {
  background: rgba(37, 99, 235, 0.3) !important; /* azul suave */
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 10px;
  border-radius: 10px;
  color: white !important;
}

/* Cuando hagan focus */
.modal input:focus,
.modal select:focus {
  outline: none;
  border: 2px solid #60a5fa;
  background: rgba(37, 99, 235, 0.45) !important;
}

/* ❗ Mantener los inputs con error */
.input-error {
  background: rgba(255, 0, 0, 0.15) !important;
  border-color: #ff4d4d !important;
}

/* 📌 SEPARACIÓN ENTRE LOS DATOS DE LA LISTA */
.user-info span {
  display: block;
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

/* Último sin línea */
.user-info span:last-child {
  border-bottom: none;
}
/* 🔵 FILTROS CON FONDO AZUL */
.filtros input,
.filtros select {
  background: rgba(37, 99, 235, 0.3) !important; /* azul suave */
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 10px 14px;
  border-radius: 10px;
  color: white !important;
  backdrop-filter: blur(5px);
  transition: 0.2s ease;
}

/* Mejor placeholder */
.filtros input::placeholder {
  color: rgba(255, 255, 255, 0.75) !important;
}

/* Hover suave */
.filtros input:hover,
.filtros select:hover {
  background: rgba(37, 99, 235, 0.45) !important;
}

/* Focus */
.filtros input:focus,
.filtros select:focus {
  background: rgba(37, 99, 235, 0.55) !important;
  border: 2px solid #60a5fa;
  outline: none;
  transform: scale(1.03);
}

/* Opciones del select */
.filtros select option {
  background: #1e40af !important;
  color: white !important;
}
/* 📌 TABLA DE USUARIOS */
.tabla-usuarios {
  width: 100%;
  margin-top: 25px;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  overflow: hidden;
}

/* Encabezados */
.tabla-usuarios th {
  background: rgba(37, 99, 235, 0.35);
  padding: 12px;
  font-weight: bold;
  text-align: left;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

/* Celdas */
.tabla-usuarios td {
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

/* Hover de fila */
.tabla-usuarios tbody tr:hover {
  background: rgba(37, 99, 235, 0.28);
  transition: 0.2s ease;
}

/* Acciones alineadas */
.acciones {
  white-space: nowrap;
  display: flex;
  gap: 8px;
}
</style>
