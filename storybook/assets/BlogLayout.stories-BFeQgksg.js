var _a, _b, _c;
import { j as jsxRuntimeExports, M as MemoryRouter } from "./vendor-oeGY3SKp.js";
const BlogLayout = ({
  children
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blog-layout", children: /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "blog-layout__main", children }) });
};
BlogLayout.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "BlogLayout",
  "props": {
    "children": {
      "required": false,
      "tsType": {
        "name": "ReactReactNode",
        "raw": "React.ReactNode"
      },
      "description": ""
    }
  }
};
const meta = {
  component: BlogLayout,
  decorators: [(Story) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) })]
};
const Primary = {
  args: {
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: "Main content goes here" })
  }
};
Primary.parameters = {
  ...Primary.parameters,
  docs: {
    ...(_a = Primary.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    children: <div className="p-4">Main content goes here</div>\n  }\n}',
      ...(_c = (_b = Primary.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
const __namedExportsOrder = ["Primary"];
export {
  Primary,
  __namedExportsOrder,
  meta as default
};
//# sourceMappingURL=BlogLayout.stories-BFeQgksg.js.map
