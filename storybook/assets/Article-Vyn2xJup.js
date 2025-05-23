import { j as jsxRuntimeExports, L as Link } from "./vendor-oeGY3SKp.js";
const truncate = (text, length) => {
  return text.substring(0, length) + "...";
};
const Article = ({
  post,
  summary = false
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl text-blue-700 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/article/${post.id}`, children: post.title }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-gray-900 font-light", children: summary ? truncate(post.body, 100) : post.body })
  ] });
};
Article.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Article",
  "props": {
    "post": {
      "required": true,
      "tsType": {
        "name": "Omit",
        "elements": [{
          "name": "Post"
        }, {
          "name": "literal",
          "value": "'createdAt'"
        }],
        "raw": "Omit<Post, 'createdAt'>"
      },
      "description": ""
    },
    "summary": {
      "required": false,
      "tsType": {
        "name": "boolean"
      },
      "description": "",
      "defaultValue": {
        "value": "false",
        "computed": false
      }
    }
  }
};
export {
  Article as A
};
//# sourceMappingURL=Article-Vyn2xJup.js.map
