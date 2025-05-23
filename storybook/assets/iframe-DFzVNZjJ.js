const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Article.stories-Bnucw0Zz.js","./Article-Vyn2xJup.js","./vendor-oeGY3SKp.js","./ArticleCell.stories-CT1FQ8Js.js","./ArticleCell-K_zuY4OS.js","./staticData-DnxBRx36.js","./ArticlesCell.stories-BxmxC1gj.js","./Project.stories-Dc021oN3.js","./Project-CgGFkVII.js","./Project-CyTw8vI9.css","./BlogLayout.stories-BFeQgksg.js","./BlogLayout-BwRbpJpD.css","./AboutPage.stories-ZgClnSeZ.js","./ArticlePage.stories-7RWDK4O2.js","./HomePage.stories-B28_l0sp.js","./HomePage-Cop32LiM.css","./ProjectPage.stories-BteibeUR.js","./preview-Yqm_EsYo.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload, F as Ff, W } from "./vendor-oeGY3SKp.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const { createBrowserChannel } = __STORYBOOK_MODULE_CHANNELS__;
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const channel = createBrowserChannel({ page: "preview" });
addons.setChannel(channel);
window.__STORYBOOK_ADDONS_CHANNEL__ = channel;
if (window.CONFIG_TYPE === "DEVELOPMENT") {
  window.__STORYBOOK_SERVER_CHANNEL__ = channel;
}
const importers = {
  "./src/components/Article/Article.stories.tsx": () => __vitePreload(() => import("./Article.stories-Bnucw0Zz.js"), true ? __vite__mapDeps([0,1,2]) : void 0, import.meta.url),
  "./src/components/ArticleCell/ArticleCell.stories.tsx": () => __vitePreload(() => import("./ArticleCell.stories-CT1FQ8Js.js"), true ? __vite__mapDeps([3,2,4,1,5]) : void 0, import.meta.url),
  "./src/components/ArticlesCell/ArticlesCell.stories.tsx": () => __vitePreload(() => import("./ArticlesCell.stories-BxmxC1gj.js"), true ? __vite__mapDeps([6,2,1]) : void 0, import.meta.url),
  "./src/components/Project/Project/Project.stories.tsx": () => __vitePreload(() => import("./Project.stories-Dc021oN3.js"), true ? __vite__mapDeps([7,8,2,5,9]) : void 0, import.meta.url),
  "./src/layouts/BlogLayout/BlogLayout.stories.tsx": () => __vitePreload(() => import("./BlogLayout.stories-BFeQgksg.js"), true ? __vite__mapDeps([10,2,11]) : void 0, import.meta.url),
  "./src/pages/AboutPage/AboutPage.stories.tsx": () => __vitePreload(() => import("./AboutPage.stories-ZgClnSeZ.js"), true ? __vite__mapDeps([12,2]) : void 0, import.meta.url),
  "./src/pages/ArticlePage/ArticlePage.stories.tsx": () => __vitePreload(() => import("./ArticlePage.stories-7RWDK4O2.js"), true ? __vite__mapDeps([13,2,4,1,5]) : void 0, import.meta.url),
  "./src/pages/HomePage/HomePage.stories.tsx": () => __vitePreload(() => import("./HomePage.stories-B28_l0sp.js"), true ? __vite__mapDeps([14,2,5,15]) : void 0, import.meta.url),
  "./src/pages/Project/ProjectPage/ProjectPage.stories.tsx": () => __vitePreload(() => import("./ProjectPage.stories-BteibeUR.js"), true ? __vite__mapDeps([16,2,8,5,9]) : void 0, import.meta.url)
};
async function importFn(path) {
  return await importers[path]();
}
Ff();
const { composeConfigs, PreviewWeb } = __STORYBOOK_MODULE_PREVIEW_API__;
const getProjectAnnotations = async (hmrPreviewAnnotationModules = []) => {
  const preview = await __vitePreload(() => import("./preview-Yqm_EsYo.js"), true ? __vite__mapDeps([17,2]) : void 0, import.meta.url);
  if (W(preview.default)) {
    return preview.default.composed;
  }
  const configs = await Promise.all([
    hmrPreviewAnnotationModules[0] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.m), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[1] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.o), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[2] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.p), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[3] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.q), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[4] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.s), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[5] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.t), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[6] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.v), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[7] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.w), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[8] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.x), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[9] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.y), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[10] ?? __vitePreload(() => import("./vendor-oeGY3SKp.js").then((n) => n.z), true ? [] : void 0, import.meta.url)
  ]);
  return composeConfigs([...configs, preview]);
};
window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb(importFn, getProjectAnnotations);
window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
//# sourceMappingURL=iframe-DFzVNZjJ.js.map
