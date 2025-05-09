var _a, _b, _c;
import { b as useInView, j as jsxRuntimeExports, r as reactExports, L as Link, n as namedRoutes, a as Metadata } from "./vendor-CCun5YV_.js";
import { a as loadProjects } from "./staticData-DnxBRx36.js";
const ProjectCard = ({
  project
}) => {
  const {
    ref,
    inView
  } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: `project-card ${inView ? "project-card--visible" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/projects/${project.id}`, rel: "noopener noreferrer", className: "project-card__link" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "project-card__image", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.image, alt: project.title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "project-card__content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "project-card__title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: project.link, target: "_blank", rel: "noopener noreferrer", children: project.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "project-card__role", children: project.role }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "project-card__summary", children: project.summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "project-card__link-text", children: "View Project" })
    ] })
  ] });
};
ProjectCard.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "ProjectCard",
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
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Empty = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "projects-list__empty", children: [
    "No projects yet. ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: namedRoutes.newProject(), className: "projects-list__link", children: "Create one?" })
  ] });
};
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "projects-list__error", children: [
  "Error loading projects: ",
  error.message
] });
const Success = ({
  projects
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "projects-list", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "projects-list__grid", children: projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project }, project.id)) }) });
};
const StaticProjectsList = () => {
  const [projects, setProjects] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching static projects...");
        const data = await loadProjects();
        console.log("Static projects data:", data);
        if (data) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Error loading static projects:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  if (error) return /* @__PURE__ */ jsxRuntimeExports.jsx(Failure, { error });
  if (!(projects == null ? void 0 : projects.length)) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Success, { projects });
};
const ProjectsList = () => {
  console.log("Running in production mode");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StaticProjectsList, {});
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
ProjectsList.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "ProjectsList"
};
const LightSource = ({
  className = ""
}) => {
  const [rotation, setRotation] = reactExports.useState(0);
  const lightRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleMouseMove = (event) => {
      if (!lightRef.current) return;
      const rect = lightRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
      setRotation(angle - 90);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { ref: lightRef, className: `light-source ${className}`, src: "/assets/Light_Source.png", alt: "Light", style: {
    transform: `rotate(${rotation}deg)`
  } });
};
LightSource.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "LightSource",
  "props": {
    "className": {
      "required": false,
      "tsType": {
        "name": "string"
      },
      "description": "",
      "defaultValue": {
        "value": "''",
        "computed": false
      }
    }
  }
};
const HeroBackground = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero__background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "hero__background--truss", src: "/assets/Truss.png", alt: "Truss" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "hero__background--truss truss--2", src: "/assets/Truss.png", alt: "Truss" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "hero__background--light-base", src: "/assets/Light_Base.png", alt: "Light Base" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LightSource, { className: "hero__background--light-source" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "hero__background--light-base base--2", src: "/assets/Light_Base.png", alt: "Light Base" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LightSource, { className: "hero__background--light-source source--2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "hero__background--light-base base--3", src: "/assets/Light_Base.png", alt: "Light Base" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LightSource, { className: "hero__background--light-source source--3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "hero__background--light-base base--4", src: "/assets/Light_Base.png", alt: "Light Base" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LightSource, { className: "hero__background--light-source source--4" })
  ] });
};
HeroBackground.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "HeroBackground"
};
const Hero = () => {
  const contentRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleMouseMove = (event) => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width * 100;
      const y = (event.clientY - rect.top) / rect.height * 100;
      contentRef.current.style.setProperty("--mouse-x", `${x}%`);
      contentRef.current.style.setProperty("--mouse-y", `${y}%`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "hero", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: contentRef, className: "hero__content container--normal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "hero__title", "data-text": "Peter Schuelke", children: "Peter Schuelke" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hero__subtitle", "data-text": "Full Stack Developer", children: "Full Stack Developer" })
    ] })
  ] });
};
Hero.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Hero"
};
const HomePage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Metadata, { title: "Home", description: "Home page" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container--normal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "My Work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsList, {})
    ] })
  ] });
};
HomePage.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "HomePage"
};
const meta = {
  component: HomePage
};
const Primary = {};
Primary.parameters = {
  ...Primary.parameters,
  docs: {
    ...(_a = Primary.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{}",
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
//# sourceMappingURL=HomePage.stories-KjkYfYFi.js.map
