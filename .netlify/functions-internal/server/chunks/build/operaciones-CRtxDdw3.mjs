import { _ as _export_sfc, a as __nuxt_component_0 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "operaciones",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const num1 = ref("");
    const num2 = ref("");
    const resultado = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-3b623108><div class="card" data-v-3b623108><h1 class="title" data-v-3b623108>Operaciones Matemáticas</h1><p class="subtitle" data-v-3b623108>Suma y División con Excepciones</p><input${ssrRenderAttr("value", num1.value)} type="number" placeholder="Número 1" data-v-3b623108><input${ssrRenderAttr("value", num2.value)} type="number" placeholder="Número 2" data-v-3b623108><div class="buttons" data-v-3b623108><button class="guardar" data-v-3b623108>Sumar</button><button class="guardar" data-v-3b623108>Dividir</button></div>`);
      if (resultado.value !== null) {
        _push(`<p data-v-3b623108> Resultado: <strong data-v-3b623108>${ssrInterpolate(resultado.value)}</strong></p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/operaciones.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const operaciones = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b623108"]]);

export { operaciones as default };
//# sourceMappingURL=operaciones-CRtxDdw3.mjs.map
