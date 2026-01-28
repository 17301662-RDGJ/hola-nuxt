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
  nombre.value = nombre.value.replace(/[^a-zA-Z\s]/g, "").slice(0, 60);
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
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", system-ui, sans-serif;
}

.card {
  background: white;
  width: 800px;
  padding: 35px 30px;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.title {
  font-size: 26px;
  font-weight: 600;
  color: #1e3a8a;
}

.subtitle {
  font-size: 14px;
  color: #475569;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  margin-bottom: 10px;
}

.guardar {
  background-color: #1e3a8a;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 20px;
}

.error {
  color: #dc2626;
  font-size: 13px;
  margin-bottom: 10px;
  display: block;
}

.tabla {
  width: 100%;
  border-collapse: collapse;
}

.tabla th,
.tabla td {
  border: 1px solid #cbd5e1;
  padding: 8px;
}

.tabla th {
  background-color: #1e3a8a;
  color: white;
}

.editar {
  background: #facc15;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  margin-right: 5px;
}

.eliminar {
  background: #dc2626;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
}

.regresar {
  display: inline-block;
  margin-top: 15px;
  color: #1e3a8a;
  text-decoration: none;
}
</style>
