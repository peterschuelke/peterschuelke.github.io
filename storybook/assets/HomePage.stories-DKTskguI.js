var _a, _b, _c;
import { b as useInView, j as jsxRuntimeExports, r as reactExports, L as Link, n as namedRoutes, C as Canvas, O as OrbitControls, c as useLoader, G as Group, d as Mesh, e as MeshStandardMaterial, f as useFrame, g as MeshTransmissionMaterial, D as DoubleSide, h as Color, i as GLTFLoader, S as SpotLight, k as Object3D, a as Metadata } from "./vendor-CzJ9a2W6.js";
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
function LightModel({
  mousePosition,
  positions,
  containerRef
}) {
  const gltf = useLoader(GLTFLoader, "/assets/MultiStageLights.glb");
  const modelRefs = reactExports.useRef([]);
  const [spotLight, setSpotLight] = reactExports.useState(null);
  const [nameMesh, setNameMesh] = reactExports.useState(null);
  const getLensColor = (lensNumber) => {
    const colors = {
      1: "#00ffff",
      // cyan
      2: "#ff00ff",
      // magenta
      3: "#bfff00",
      // lime
      4: "#00ffff"
      // cyan
    };
    return colors[lensNumber] || "#ffffff";
  };
  const createSpotLight = (color, lensNumber) => {
    const newSpotLight = new SpotLight(color, 50, 10, Math.PI / 6, 0.5, 1);
    newSpotLight.position.set(0, 0, 0);
    newSpotLight.rotation.x = Math.PI / 4;
    const target = new Object3D();
    target.position.set(0, 14, -1);
    newSpotLight.target = target;
    return {
      newSpotLight,
      target
    };
  };
  reactExports.useEffect(() => {
    if (!gltf.scene) return;
    modelRefs.current = positions.map(() => new Group());
    gltf.scene.traverse((child) => {
      var _a2;
      if (child instanceof Mesh) {
        const name = child.name.toLowerCase();
        if (name.includes("lens")) {
          const lensNumber = parseInt(((_a2 = name.match(/\d+/)) == null ? void 0 : _a2[0]) || "0");
          const color = getLensColor(lensNumber);
          child.material = new MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: lensNumber > 0 ? 2 : 10,
            metalness: 0.8,
            roughness: 0.2,
            envMapIntensity: 1
          });
          if (lensNumber > 0) {
            const {
              newSpotLight,
              target
            } = createSpotLight(color);
            child.add(newSpotLight);
            child.add(target);
            if (lensNumber === 2) {
              setSpotLight(newSpotLight);
            }
          }
        } else if (name.includes("name") || name.includes("title")) {
          setNameMesh(child);
        } else if (name.includes("truss") || name.includes("chain")) {
          child.material = new MeshStandardMaterial({
            color: "#e0e0e0",
            metalness: 0.8,
            roughness: 0.3,
            envMapIntensity: 1.6
          });
        } else {
          child.material = new MeshStandardMaterial({
            color: "#ffffff",
            metalness: 0.9,
            roughness: 0.2,
            envMapIntensity: 1
          });
        }
      }
    });
  }, [gltf, positions]);
  useFrame(() => {
    if (!gltf.scene || !modelRefs.current.length || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    modelRefs.current.forEach((group, index) => {
      const position = positions[index];
      const lightNumber = index + 1;
      gltf.scene.traverse((child) => {
        const name = child.name.toLowerCase();
        if (name.includes(`lens_${lightNumber}`) || name.includes(`head_${lightNumber}`)) {
          const lightScreenX = centerX + position[0] * rect.width / 2;
          const lightScreenY = centerY - position[1] * rect.height / 2;
          const dx = lightScreenX - mousePosition.x;
          const dy = lightScreenY - mousePosition.y;
          let baseAngle = Math.atan2(dy, dx) + Math.PI / 2;
          if (lightNumber === 1) {
            baseAngle += Math.PI / 18;
          } else if (lightNumber === 4) {
            baseAngle -= Math.PI / 18;
          }
          child.rotation.z = baseAngle;
          child.rotation.x = 0;
          child.rotation.y = 0;
          const screenDy = lightScreenY - mousePosition.y;
          const maxScreenDistance = rect.height / 2;
          let yPosForXRot = Math.min(1, Math.max(-1, -screenDy / maxScreenDistance));
          const targetXRotation = (yPosForXRot + 1) * (Math.PI / 2);
          child.rotation.x = targetXRotation;
        } else if (name.includes(`arms_${lightNumber}`)) {
          const lightScreenX = centerX + position[0] * rect.width / 2;
          const lightScreenY = centerY - position[1] * rect.height / 2;
          const dx = lightScreenX - mousePosition.x;
          const dy = lightScreenY - mousePosition.y;
          let baseAngle = Math.atan2(dy, dx) + Math.PI / 2;
          if (lightNumber === 1) {
            baseAngle += Math.PI / 18;
          } else if (lightNumber === 4) {
            baseAngle -= Math.PI / 18;
          }
          child.rotation.z = -baseAngle;
        }
      });
    });
  });
  if (!gltf.scene) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("group", { position: [0, 0, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx("primitive", { ref: (el) => {
      if (el) modelRefs.current[0] = el;
    }, object: gltf.scene, scale: 0.02 }) }),
    nameMesh && /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: nameMesh.geometry, position: nameMesh.position, rotation: nameMesh.rotation, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeshTransmissionMaterial, { color: "#ffffff", attenuationColor: "#ffffff", background: new Color("#000000"), transmissionSampler: true, backside: true, attenuationDistance: 0.5, roughness: 0.1, transmission: 0.95, ior: 1.5, side: DoubleSide }) })
  ] });
}
const MultiLightSource = ({
  className = "",
  lightPositions
}) => {
  const [mousePosition, setMousePosition] = reactExports.useState({
    x: 0,
    y: 0
  });
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: `multi-light-source-container ${className}`, style: {
    width: "100%",
    height: "100%"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Canvas, { camera: {
    position: [1.2, -1.25, 4],
    fov: 20
  }, gl: {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  }, dpr: [1, 2], performance: {
    min: 0.5
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitControls, { enableRotate: false, enableZoom: false, enablePan: false, target: [1.2, -0.25, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.3 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [1.2, 0, 1], intensity: 0.6, color: "#e0e0e0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hemisphereLight", { intensity: 0.1, groundColor: "#000000", color: "#ffffff" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LightModel, { mousePosition, positions: lightPositions, containerRef })
  ] }) });
};
MultiLightSource.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "MultiLightSource",
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
    },
    "lightPositions": {
      "required": true,
      "tsType": {
        "name": "Array",
        "elements": [{
          "name": "tuple",
          "raw": "[number, number, number]",
          "elements": [{
            "name": "number"
          }, {
            "name": "number"
          }, {
            "name": "number"
          }]
        }],
        "raw": "Array<[number, number, number]>"
      },
      "description": ""
    }
  }
};
const HeroBackground = () => {
  const lightPositions = [
    [-0.55, 0.45, 0],
    // Left light
    [-0.275, 0.45, 0],
    // Left-center light
    [0.275, 0.45, 0],
    // Right-center light
    [0.55, 0.45, 0]
    // Right light
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero__background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MultiLightSource, { className: "hero__background--light-source", lightPositions }) });
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: contentRef, className: "hero__content container--normal" })
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
//# sourceMappingURL=HomePage.stories-DKTskguI.js.map
