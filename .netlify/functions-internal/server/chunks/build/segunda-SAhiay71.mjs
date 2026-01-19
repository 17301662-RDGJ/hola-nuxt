import { _ as _export_sfc, a as __nuxt_component_0 } from './server.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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
import 'vue-router';

const _sfc_main = {
  __name: "segunda",
  __ssrInlineRender: true,
  setup(__props) {
    const texto = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-090fdde0><div class="card" data-v-090fdde0><h1 class="title" data-v-090fdde0>Guardar en SQL Server</h1><p class="subtitle" data-v-090fdde0>Registro de información</p><input${ssrRenderAttr("value", texto.value)} type="text" placeholder="Escribe algo" data-v-090fdde0><div class="buttons" data-v-090fdde0><button class="guardar" data-v-090fdde0>Guardar</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "regresar"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Regresar `);
          } else {
            return [
              createTextVNode(" Regresar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/segunda.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const segunda = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-090fdde0"]]);

export { segunda as default };
//# sourceMappingURL=segunda-SAhiay71.mjs.map
