import { j as jsxRuntimeExports, M as MemoryRouter } from "./vendor-oeGY3SKp.js";
const routes = {
  article: ({
    id
  }) => "/article/{id:Int}",
  home: () => "/",
  about: () => "/about",
  post: ({
    id
  }) => "/posts/{id:Int}",
  posts: () => "/posts",
  newPost: () => "/posts/new",
  editPost: ({
    id
  }) => "/posts/{id:Int}/edit"
};
const preview = {
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*"
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: ["Components", "Pages", "Layouts"]
      }
    },
    layout: "centered"
  },
  decorators: [(Story) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) })],
  globals: {
    routes
  }
};
export {
  preview as default
};
//# sourceMappingURL=preview-Yqm_EsYo.js.map
