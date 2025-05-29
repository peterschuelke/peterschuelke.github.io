import { r as reactExports, j as jsxRuntimeExports } from "./vendor-oeGY3SKp.js";
import { b as loadProject } from "./staticData-CwXKAj_M.js";
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Empty = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Project not found" });
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-cell-error", children: error == null ? void 0 : error.message });
const Project = ({
  project
}) => {
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "project container--normal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project__header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "project__title", children: project.title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project__content", children: [
      project.image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project__image-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.image, alt: project.title, className: "project__image" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project__details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "project__description", children: project.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project__case-study", children: [
          project.problem && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project__section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Problem" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: project.problem })
          ] }),
          project.solution && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project__section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Solution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: project.solution })
          ] }),
          project.execution && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project__section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Execution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: project.execution })
          ] }),
          project.results && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project__section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Results" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: project.results })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project__skills", children: project.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "project__skill", children: skill.title }, skill.id)) }),
        project.link && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: project.link, target: "_blank", rel: "noopener noreferrer", className: "project__link", children: "Visit Project" })
      ] })
    ] })
  ] });
};
const StaticProjectCell = ({
  slug
}) => {
  const [project, setProject] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await loadProject(slug);
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
  }, [slug]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  if (error) return /* @__PURE__ */ jsxRuntimeExports.jsx(Failure, { error });
  if (!project) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Project, { project });
};
const Project$1 = StaticProjectCell;
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
export {
  Project$1 as P
};
//# sourceMappingURL=Project-DmVduAuc.js.map
