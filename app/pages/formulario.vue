<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const nombre = ref("");
const email = ref("");
const edad = ref("");

const registros = ref([]);
const error = ref("");
const editando = ref(false);
const indiceEditar = ref(null);

// 🔎 Expresiones regulares
const nombreRegex = /^[a-zA-Z\s]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const edadRegex = /^[0-9]{1,3}$/;

// ✅ Validación en tiempo real
watch([nombre, email, edad], () => {
  error.value = "";

  if (nombre.value && !nombreRegex.test(nombre.value)) {
    error.value = "Nombre inválido";
  } else if (email.value && !emailRegex.test(email.value)) {
    error.value = "Email inválido";
  } else if (edad.value && !edadRegex.test(edad.value)) {
    error.value = "Edad inválida";
  }
});

// ➕ Agregar / Editar
const agregar = () => {
  if (!nombre.value || !email.value || !edad.value) {
    router.push("/error");
    return;
  }

  if (
    !nombreRegex.test(nombre.value) ||
    !emailRegex.test(email.value) ||
    !edadRegex.test(edad.value)
  ) {
    router.push("/error");
    return;
  }

  if (editando.value) {
    registros.value[indiceEditar.value] = {
      nombre: nombre.value,
      email: email.value,
      edad: edad.value,
    };
    editando.value = false;
    indiceEditar.value = null;
  } else {
    registros.value.push({
      nombre: nombre.value,
      email: email.value,
      edad: edad.value,
    });
  }

  limpiar();
};

// ✏️ Editar fila
const editar = (index) => {
  const r = registros.value[index];
  nombre.value = r.nombre;
  email.value = r.email;
  edad.value = r.edad;

  editando.value = true;
  indiceEditar.value = index;
};

// 🗑️ Eliminar fila
const eliminar = (index) => {
  registros.value.splice(index, 1);
};

// 🧹 Limpiar formulario
const limpiar = () => {
  nombre.value = "";
  email.value = "";
  edad.value = "";
};
</script>

 <template>
  <div class="page">
    <div class="card">

      <!-- Breadcrumbs -->
      <Breadcrumbs />

      <h1 class="title">Formulario</h1>
      <p class="subtitle">Validación de Datos (sin BD)</p>

      <input v-model="nombre" placeholder="Nombre completo" />
      <input v-model="email" placeholder="Correo electrónico" />
      <input v-model="edad" placeholder="Edad" />

      <span v-if="error" class="error">{{ error }}</span>

      <button class="guardar" @click="agregar">
        {{ editando ? "Actualizar" : "Agregar" }}
      </button>

      <!-- Tabla -->
      <table v-if="registros.length" class="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in registros" :key="index">
            <td>{{ r.nombre }}</td>
            <td>{{ r.email }}</td>
            <td>{{ r.edad }}</td>
            <td>
              <button class="editar" @click="editar(index)">Editar</button>
              <button class="eliminar" @click="eliminar(index)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <NuxtLink to="/" class="regresar">Volver a inicio</NuxtLink>
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
  width: 600px;
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
