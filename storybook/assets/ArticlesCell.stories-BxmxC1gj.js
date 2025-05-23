var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
import { j as jsxRuntimeExports } from "./vendor-oeGY3SKp.js";
import { A as Article } from "./Article-Vyn2xJup.js";
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Empty = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "No articles yet!" });
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-cell-error", children: error == null ? void 0 : error.message });
const Success = ({
  articles
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "articles", children: articles.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(Article, { post: article, summary: true }, article.id)) });
};
Loading.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Loading"
};
Empty.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Empty"
};
Failure.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Failure"
};
Success.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Success"
};
const standard = () => ({
  articles: [{
    __typename: "Post",
    id: 42,
    title: "First Post",
    body: "This is the first post",
    createdAt: "2024-01-01T00:00:00.000Z"
  }, {
    __typename: "Post",
    id: 43,
    title: "Second Post",
    body: "This is the second post",
    createdAt: "2024-01-02T00:00:00.000Z"
  }, {
    __typename: "Post",
    id: 44,
    title: "Third Post",
    body: "This is the third post",
    createdAt: "2024-01-03T00:00:00.000Z"
  }]
});
const meta = {
  title: "Cells/ArticlesCell",
  tags: ["autodocs"],
  decorators: [(Story) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    margin: "2em"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) })]
};
const loading = {
  render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {})
};
const empty = {
  render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {})
};
const failure = {
  render: (args) => /* @__PURE__ */ jsxRuntimeExports.jsx(Failure, { error: new Error("Oh no"), ...args })
};
const success = {
  render: (args) => /* @__PURE__ */ jsxRuntimeExports.jsx(Success, { ...standard(), ...args })
};
loading.parameters = {
  ...loading.parameters,
  docs: {
    ...(_a = loading.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  render: () => <Loading />\n}",
      ...(_c = (_b = loading.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
empty.parameters = {
  ...empty.parameters,
  docs: {
    ...(_d = empty.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  render: () => <Empty />\n}",
      ...(_f = (_e = empty.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
failure.parameters = {
  ...failure.parameters,
  docs: {
    ...(_g = failure.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: "{\n  render: args => <Failure error={new Error('Oh no')} {...args} />\n}",
      ...(_i = (_h = failure.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
success.parameters = {
  ...success.parameters,
  docs: {
    ...(_j = success.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: "{\n  render: args => <Success {...standard()} {...args} />\n}",
      ...(_l = (_k = success.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
const __namedExportsOrder = ["loading", "empty", "failure", "success"];
export {
  __namedExportsOrder,
  meta as default,
  empty,
  failure,
  loading,
  success
};
//# sourceMappingURL=ArticlesCell.stories-BxmxC1gj.js.map
