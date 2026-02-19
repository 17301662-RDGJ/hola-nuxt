<script setup>
import { ref, watch, onMounted } from "vue";
//import { useSupabase } from "~/plugins/supabase";
const { $supabase } = useNuxtApp();
const supabase = $supabase;
//const supabase = useSupabase();

// 🔹 Campos
const nombre = ref("");
const email = ref("");
const fechaNacimiento = ref("");
const telefono = ref("");
const mensaje = ref("");
//const edad = ref(null);

const registros = ref([]);
const error = ref("");
const editando = ref(false);
const idEditar = ref(null);

// 🔎 Regex
const nombreRegex = /^[a-zA-Z\s]{3,60}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sqlRegex = /(select|insert|delete|drop|update|--|;|'|")/i;

// ✋ Validaciones
const soloLetras = () => {
  nombre.value = nombre.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 30);
};

const soloNumeros = () => {
  telefono.value = telefono.value.replace(/[^0-9]/g, "").slice(0, 10);
};

const limpiarMensaje = () => {
  mensaje.value = mensaje.value.replace(sqlRegex, "");
};

// 🎂 Edad
//const calcularEdad = () => {
// if (!fechaNacimiento.value) {
//  edad.value = null;
// return;
// }

// const hoy = new Date();
//const nacimiento = new Date(fechaNacimiento.value);
//let e = hoy.getFullYear() - nacimiento.getFullYear();
//const m = hoy.getMonth() - nacimiento.getMonth();

// if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) e--;
// edad.value = e;
//};

// 🔎 Watch validaciones
watch([nombre, email, fechaNacimiento, telefono, mensaje], () => {
  error.value = "";

  if (
    !nombre.value ||
    !email.value ||
    !fechaNacimiento.value ||
    !telefono.value ||
    !mensaje.value
  ) {
    error.value = "Todos los campos son obligatorios";
    return;
  }

  if (!nombreRegex.test(nombre.value)) error.value = "Nombre inválido";
  if (!emailRegex.test(email.value)) error.value = "Email inválido";
  if (telefono.value.length !== 10) error.value = "Teléfono inválido";
  if (sqlRegex.test(mensaje.value)) error.value = "Mensaje no permitido";

  //calcularEdad();
});

// 📥 CARGAR REGISTROS
//const cargarRegistros = async () => {
//const { data, error: err } = await supabase
//.from("formulario")
//.select("*")
//.order("id", { ascending: false });

//if (!err) registros.value = data;
//};
// 📥 CARGAR REGISTROS
const cargarRegistros = async () => {
  console.log("Cargando registros...");

  const { data, error } = await supabase
    .from("formulario") // 👈 MISMA TABLA
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error al cargar:", error);
  } else {
    console.log("Datos cargados:", data);
    registros.value = data;
  }
};

// 💾 GUARDAR FORMULARIO
const guardarFormulario = async () => {
  if (error.value) return;

  const datos = {
    nombre: nombre.value,
    email: email.value,
    fecha_nacimiento: fechaNacimiento.value,
    // edad: edad.value,
    telefono: telefono.value,
    mensaje: mensaje.value,
  };

  let response;

  if (editando.value) {
    response = await supabase
      .from("formulario")
      .update(datos)
      .eq("id", idEditar.value);
  } else {
    response = await supabase.from("formulario").insert([datos]);

    // 👉 guardar mensaje también
    await supabase.from("mensajes").insert({
      mensaje: mensaje.value,
    });
  }

  // if (response.error) {
  // alert("❌ Error al guardar");
  //console.error(response.error);
  //} else {
  //limpiar();
  //cargarRegistros();
  //editando.value = false;
  //}
  if (response.error) {
    console.error("ERROR SUPABASE:", response.error);
    alert("❌ Error al guardar: " + response.error.message);
    return;
  }

  // ✅ ÉXITO
  alert("✅ Datos guardados correctamente");

  limpiar();
  cargarRegistros();
  editando.value = false;
};

// ✏️ EDITAR
const editar = (registro) => {
  console.log("✏️ Editando:", registro);
  nombre.value = registro.nombre;
  email.value = registro.email;
  fechaNacimiento.value = registro.fecha_nacimiento;
  telefono.value = registro.telefono;
  mensaje.value = registro.mensaje;
  //edad.value = registro.edad;

  idEditar.value = registro.id;
  editando.value = true;
};

// 🗑️ ELIMINAR
const eliminar = async (id) => {
  await supabase.from("formulario").delete().eq("id", id);
  cargarRegistros();
};

// 🧹 LIMPIAR
const limpiar = () => {
  nombre.value = "";
  email.value = "";
  fechaNacimiento.value = "";
  telefono.value = "";
  mensaje.value = "";
  //edad.value = null;
  editando.value = false;
  idEditar.value = null;
};

onMounted(() => {
  cargarRegistros();
});
</script>

<template>
  <Breadcrumbs />
  <div class="page">
    <div class="card">
      <h1 class="title">Formulario 📝</h1>
      <p class="subtitle">Registro de Usuarios</p>

      <!-- FORMULARIO -->
      <input
        v-model="nombre"
        placeholder="Nombre completo"
        @input="soloLetras"
      />

      <input v-model="email" placeholder="Correo electrónico" />

      <input type="date" v-model="fechaNacimiento" />

      <input v-model="telefono" placeholder="Teléfono" @input="soloNumeros" />

      <textarea
        v-model="mensaje"
        placeholder="Mensaje"
        @input="limpiarMensaje"
      ></textarea>

      <span v-if="error" class="error">{{ error }}</span>

      <button class="guardar" @click="guardarFormulario">
        {{ editando ? "Actualizar" : "Enviar" }}
      </button>

      <!-- TABLA -->
      <table class="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha Nac.</th>
            <th>Teléfono</th>
            <th>Mensaje</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in registros" :key="r.id">
            <td>{{ r.nombre }}</td>
            <td>{{ r.email }}</td>
            <td>{{ r.fecha_nacimiento }}</td>
            <td>{{ r.telefono }}</td>
            <td>{{ r.mensaje }}</td>
            <td>
              <button class="eliminar" @click="eliminar(r.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* --- LAYOUT GENERAL --- */
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
  font-family: "Inter", "Segoe UI", system-ui, sans-serif;
  color: white;
}

/* --- CARD TRANSPARENTE MODERNA --- */
.card {
  width: 900px;
  padding: 35px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
  animation: fadeIn 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

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

.title {
  font-size: 32px;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 5px;
  text-align: center;
}

.subtitle {
  font-size: 16px;
  color: #e2e8f0;
  margin-bottom: 25px;
  text-align: center;
}

/* --- INPUTS ESTILO MODERNO OSCURO --- */
input,
textarea {
  width: 100%;
  padding: 13px;
  margin-bottom: 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.12);
  font-size: 15px;
  color: white;
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;
}

input::placeholder,
textarea::placeholder {
  color: #d1d5db;
}

input:focus,
textarea:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
  outline: none;
}

/* TEXTAREA */
textarea {
  height: 110px;
  resize: none;
}

/* --- BOTÓN GUARDAR --- */
.guardar {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 14px;
  font-size: 16px;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  font-weight: 600;
  transition: 0.25s ease;
}

.guardar:hover {
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
  transform: translateY(-2px);
}

/* --- ERROR --- */
.error {
  color: #f87171;
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
  font-weight: 500;
}

/* --- TABLA MODO OSCURO --- */
.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  color: white;
  backdrop-filter: blur(10px);
}

.tabla th {
  background: rgba(30, 58, 138, 0.7);
  color: #ffffff;
  padding: 14px;
  font-size: 15px;
}

.tabla td {
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 14px;
  color: #e2e8f0;
}

.tabla tr:hover td {
  background: rgba(255, 255, 255, 0.12);
}

.tabla tr:last-child td {
  border-bottom: none;
}

/* --- BOTÓN ELIMINAR --- */
.eliminar {
  background: #dc2626;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.25s;
}

.eliminar:hover {
  background: #b91c1c;
  transform: scale(1.05);
}
/* --- COLOR GLOBAL DEL TEXTO EN ESTA VISTA --- */
* {
  color: white !important;
}

/* Placeholders blancos */
input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.75) !important;
}

/* Inputs con texto blanco */
input,
textarea {
  color: white !important;
}

/* Tabla texto blanco */
.tabla td,
.tabla th {
  color: white !important;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .card {
    width: 100%;
    padding: 25px;
  }

  .tabla th,
  .tabla td {
    padding: 10px;
    font-size: 12px;
  }
}
</style>
