import { r as reactExports, c as useQuery, j as jsxRuntimeExports, g as gql, a as useMutation, _ as _t, n as navigate, b as namedRoutes } from "./index-CdKqxcjc.js";
import { c as createCell } from "./createCell-B41bW8jg.js";
import { d as distExports } from "./index-DrOEzEhq.js";
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
const handleImageUpload = async (file) => {
  const extension = file.name.split(".").pop();
  const filename = `${v4()}.${extension}`;
  const reader = new FileReader();
  const base64Promise = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  reader.readAsDataURL(file);
  const base64Data = await base64Promise;
  try {
    const response = await fetch("/.redwood/functions/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file: base64Data,
        filename
      })
    });
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    const result = await response.json();
    return result.path;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
const SKILLS_QUERY = {
  "kind": "Document",
  "definitions": [{
    "kind": "OperationDefinition",
    "operation": "query",
    "name": {
      "kind": "Name",
      "value": "FindSkills"
    },
    "variableDefinitions": [],
    "directives": [],
    "selectionSet": {
      "kind": "SelectionSet",
      "selections": [{
        "kind": "Field",
        "name": {
          "kind": "Name",
          "value": "skills"
        },
        "arguments": [],
        "directives": [],
        "selectionSet": {
          "kind": "SelectionSet",
          "selections": [{
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "id"
            },
            "arguments": [],
            "directives": []
          }, {
            "kind": "Field",
            "name": {
              "kind": "Name",
              "value": "title"
            },
            "arguments": [],
            "directives": []
          }]
        }
      }]
    }
  }],
  "loc": {
    "start": 0,
    "end": 66,
    "source": {
      "body": "\n  query FindSkills {\n    skills {\n      id\n      title\n    }\n  }\n",
      "name": "GraphQL request",
      "locationOffset": {
        "line": 1,
        "column": 1
      }
    }
  }
};
const ProjectForm = (props) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const [imagePreview, setImagePreview] = reactExports.useState((_a = props.project) == null ? void 0 : _a.image);
  const [uploadError, setUploadError] = reactExports.useState(null);
  const [newImagePath, setNewImagePath] = reactExports.useState(null);
  const {
    data: skillsData
  } = useQuery(SKILLS_QUERY);
  const onSubmit = (data) => {
    var _a2, _b2;
    console.log("Form submission data:", data);
    const imagePath = newImagePath || ((_a2 = props.project) == null ? void 0 : _a2.image);
    const skillIds = data.skillIds ? data.skillIds.map((id) => parseInt(id, 10)) : void 0;
    props.onSave({
      ...data,
      image: imagePath,
      skillIds
    }, (_b2 = props == null ? void 0 : props.project) == null ? void 0 : _b2.id);
  };
  const handleImageChange = async (event) => {
    var _a2;
    const file = (_a2 = event.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    try {
      const imagePath = await handleImageUpload(file);
      setNewImagePath(imagePath);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-form-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(distExports.Form, { onSubmit, error: props.error, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FormError, { error: props.error, wrapperClassName: "rw-form-error-wrapper", titleClassName: "rw-form-error-title", listClassName: "rw-form-error-list" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Label, { name: "title", className: "rw-label", errorClassName: "rw-label rw-label-error", children: "Title" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.TextField, { name: "title", defaultValue: (_b = props.project) == null ? void 0 : _b.title, className: "rw-input", errorClassName: "rw-input rw-input-error", validation: {
      required: true
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FieldError, { name: "title", className: "rw-field-error" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Label, { name: "description", className: "rw-label", errorClassName: "rw-label rw-label-error", children: "Description" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.TextAreaField, { name: "description", defaultValue: (_c = props.project) == null ? void 0 : _c.description, className: "rw-input", errorClassName: "rw-input rw-input-error", validation: {
      required: true
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FieldError, { name: "description", className: "rw-field-error" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Label, { name: "image", className: "rw-label", errorClassName: "rw-label rw-label-error", children: "Image" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", onChange: handleImageChange, className: "rw-input" }),
    uploadError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-field-error", children: uploadError }),
    imagePreview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imagePreview, alt: "Project preview", className: "max-w-xs rounded-lg shadow-lg" }) }),
    ((_d = props.project) == null ? void 0 : _d.image) && !imagePreview && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: props.project.image, alt: "Current", className: "max-w-xs rounded shadow-lg" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FieldError, { name: "image", className: "rw-field-error" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Label, { name: "link", className: "rw-label", errorClassName: "rw-label rw-label-error", children: "Link" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.TextField, { name: "link", defaultValue: (_e = props.project) == null ? void 0 : _e.link, className: "rw-input", errorClassName: "rw-input rw-input-error", validation: {
      required: true
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FieldError, { name: "link", className: "rw-field-error" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Label, { name: "role", className: "rw-label", errorClassName: "rw-label rw-label-error", children: "Role" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.TextField, { name: "role", defaultValue: (_f = props.project) == null ? void 0 : _f.role, className: "rw-input", errorClassName: "rw-input rw-input-error", validation: {
      required: true
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FieldError, { name: "role", className: "rw-field-error" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Label, { name: "skillIds", className: "rw-label", errorClassName: "rw-label rw-label-error", children: "Skills" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.SelectField, { name: "skillIds", multiple: true, defaultValue: [], className: "rw-input", errorClassName: "rw-input rw-input-error", children: (_g = skillsData == null ? void 0 : skillsData.skills) == null ? void 0 : _g.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: skill.id, children: skill.title }, skill.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.FieldError, { name: "skillIds", className: "rw-field-error" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-button-group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Submit, { disabled: props.loading, className: "rw-button rw-button-blue", children: "Save" }) })
  ] }) });
};
const QUERY = gql`
  query EditProjectById($id: Int!) {
    project: project(id: $id) {
      id
      title
      description
      image
      link
      role
      createdAt
    }
  }
`;
const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProjectMutation($id: Int!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      title
      description
      image
      link
      role
      createdAt
    }
  }
`;
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-cell-error", children: error == null ? void 0 : error.message });
const Success = ({
  project
}) => {
  const [updateProject, {
    loading,
    error
  }] = useMutation(UPDATE_PROJECT_MUTATION, {
    onCompleted: () => {
      _t.success("Project updated");
      navigate(namedRoutes.projects());
    },
    onError: (error2) => {
      _t.error(error2.message);
    }
  });
  const onSave = (input, id) => {
    updateProject({
      variables: {
        id,
        input
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rw-segment", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "rw-segment-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "rw-heading rw-heading-secondary", children: [
      "Edit Project ",
      project == null ? void 0 : project.id
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-segment-main", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectForm, { project, onSave, error, loading }) })
  ] });
};
const EditProjectCell = createCell({
  QUERY,
  Loading,
  Failure,
  Success,
  displayName: "EditProjectCell"
});
const EditPostPage = ({
  id
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EditProjectCell, { id });
};
export {
  EditPostPage as default
};
