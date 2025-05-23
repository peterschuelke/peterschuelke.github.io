import { r as reactExports, j as jsxRuntimeExports, L as Link, n as namedRoutes } from "./vendor-oeGY3SKp.js";
import { b as loadProject } from "./staticData-DnxBRx36.js";
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Empty = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Project not found" });
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-cell-error", children: error == null ? void 0 : error.message });
const Success = ({
  project
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "project", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project__content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.image, alt: project.title, className: "project__image" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "project__title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: namedRoutes.project({
      id: project.id
    }), children: project.title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "project__summary", children: project.summary }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "project__description", children: project.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "project__role", children: [
      "Role: ",
      project.role
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project__skills", children: project.skills && project.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "project__skill-tag", children: skill.title }, skill.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project__links", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: project.link, target: "_blank", rel: "noopener noreferrer", className: "project__link", children: "Visit the Project" }) })
  ] }) });
};
const StaticProjectCell = ({
  id
}) => {
  const [project, setProject] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await loadProject(id);
        if (data) {
          setProject(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  if (error) return /* @__PURE__ */ jsxRuntimeExports.jsx(Failure, { error });
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Success, { project });
};
const Project = StaticProjectCell;
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
  "displayName": "Success",
  "props": {
    "project": {
      "required": true,
      "tsType": {
        "name": "signature",
        "type": "object",
        "raw": "{\n  id: number\n  title: string\n  description: string\n  summary: string\n  image: string\n  link: string\n  role: string\n  skills: {\n    id: number\n    title: string\n  }[]\n}",
        "signature": {
          "properties": [{
            "key": "id",
            "value": {
              "name": "number",
              "required": true
            }
          }, {
            "key": "title",
            "value": {
              "name": "string",
              "required": true
            }
          }, {
            "key": "description",
            "value": {
              "name": "string",
              "required": true
            }
          }, {
            "key": "summary",
            "value": {
              "name": "string",
              "required": true
            }
          }, {
            "key": "image",
            "value": {
              "name": "string",
              "required": true
            }
          }, {
            "key": "link",
            "value": {
              "name": "string",
              "required": true
            }
          }, {
            "key": "role",
            "value": {
              "name": "string",
              "required": true
            }
          }, {
            "key": "skills",
            "value": {
              "name": "Array",
              "elements": [{
                "name": "signature",
                "type": "object",
                "raw": "{\n  id: number\n  title: string\n}",
                "signature": {
                  "properties": [{
                    "key": "id",
                    "value": {
                      "name": "number",
                      "required": true
                    }
                  }, {
                    "key": "title",
                    "value": {
                      "name": "string",
                      "required": true
                    }
                  }]
                }
              }],
              "raw": "{\n  id: number\n  title: string\n}[]",
              "required": true
            }
          }]
        }
      },
      "description": ""
    }
  }
};
export {
  Project as P
};
//# sourceMappingURL=Project-CgGFkVII.js.map
