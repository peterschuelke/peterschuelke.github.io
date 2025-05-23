import { j as jsxRuntimeExports } from "./index-CdKqxcjc.js";
import { d as distExports } from "./index-DrOEzEhq.js";
const PostForm = (props) => {
  var _a, _b;
  const onSubmit = (data) => {
    var _a2;
    props.onSave(data, (_a2 = props == null ? void 0 : props.post) == null ? void 0 : _a2.id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-form-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Form, { onSubmit, error: props.error, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FormError, { error: props.error, wrapperClassName: "rw-form-error-wrapper", titleClassName: "rw-form-error-title", listClassName: "rw-form-error-list" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Label, { name: "title", className: "rw-label", errorClassName: "rw-label rw-label-error", children: "Title" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.TextField, { name: "title", defaultValue: (_a = props.post) == null ? void 0 : _a.title, className: "rw-input", errorClassName: "rw-input rw-input-error", validation: {
      required: true
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FieldError, { name: "title", className: "rw-field-error" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Label, { name: "body", className: "rw-label", errorClassName: "rw-label rw-label-error", children: "Body" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.TextField, { name: "body", defaultValue: (_b = props.post) == null ? void 0 : _b.body, className: "rw-input", errorClassName: "rw-input rw-input-error", validation: {
      required: true
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FieldError, { name: "body", className: "rw-field-error" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-button-group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Submit, { disabled: props.loading, className: "rw-button rw-button-blue", children: "Save" }) })
  ] }) });
};
export {
  PostForm as P
};
