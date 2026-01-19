import { _ as _export_sfc, a as __nuxt_component_0 } from './server.mjs';
import { ref, watch, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = {
  __name: "formulario",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const nombre = ref("");
    const email = ref("");
    const edad = ref("");
    const registros = ref([]);
    const error = ref("");
    const editando = ref(false);
    ref(null);
    const nombreRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const edadRegex = /^[0-9]{1,3}$/;
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = resolveComponent("Breadcrumbs");
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-21ccb70e><div class="card" data-v-21ccb70e>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, null, null, _parent));
      _push(`<h1 class="title" data-v-21ccb70e>Formulario</h1><p class="subtitle" data-v-21ccb70e>Validación de Datos (sin BD)</p><input${ssrRenderAttr("value", nombre.value)} placeholder="Nombre completo" data-v-21ccb70e><input${ssrRenderAttr("value", email.value)} placeholder="Correo electrónico" data-v-21ccb70e><input${ssrRenderAttr("value", edad.value)} placeholder="Edad" data-v-21ccb70e>`);
      if (error.value) {
        _push(`<span class="error" data-v-21ccb70e>${ssrInterpolate(error.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="guardar" data-v-21ccb70e>${ssrInterpolate(editando.value ? "Actualizar" : "Agregar")}</button>`);
      if (registros.value.length) {
        _push(`<table class="tabla" data-v-21ccb70e><thead data-v-21ccb70e><tr data-v-21ccb70e><th data-v-21ccb70e>Nombre</th><th data-v-21ccb70e>Email</th><th data-v-21ccb70e>Edad</th><th data-v-21ccb70e>Acciones</th></tr></thead><tbody data-v-21ccb70e><!--[-->`);
        ssrRenderList(registros.value, (r, index) => {
          _push(`<tr data-v-21ccb70e><td data-v-21ccb70e>${ssrInterpolate(r.nombre)}</td><td data-v-21ccb70e>${ssrInterpolate(r.email)}</td><td data-v-21ccb70e>${ssrInterpolate(r.edad)}</td><td data-v-21ccb70e><button class="editar" data-v-21ccb70e>Editar</button><button class="eliminar" data-v-21ccb70e>Eliminar</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "regresar"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Volver a inicio`);
          } else {
            return [
              createTextVNode("Volver a inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/formulario.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const formulario = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-21ccb70e"]]);

export { formulario as default };
//# sourceMappingURL=formulario-CLFDAFdP.mjs.map
