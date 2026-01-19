import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-9b9f1380><div class="card" data-v-9b9f1380><h1 class="title" data-v-9b9f1380>Hola Mundo</h1><h1 class="title" data-v-9b9f1380>Mi primera app con Nuxt.js</h1><p class="subtitle" data-v-9b9f1380>Verificación de seguridad</p><div class="g-recaptcha" data-sitekey="6Ldn_0ksAAAAAItUy3Kgj1r__sJ8hxv5q91l-riD" data-callback="onCaptchaSuccess" data-v-9b9f1380></div><button data-v-9b9f1380>Continuar</button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9b9f1380"]]);

export { index as default };
//# sourceMappingURL=index-DbqMojxu.mjs.map
