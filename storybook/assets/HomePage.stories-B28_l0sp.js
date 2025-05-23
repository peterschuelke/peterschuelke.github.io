var _a, _b, _c;
import { b as useInView, j as jsxRuntimeExports, r as reactExports, L as Link, n as namedRoutes, C as Canvas, O as OrbitControls, c as useLoader, G as Group, d as Mesh, e as MeshStandardMaterial, P as PointLight, H as HemisphereLight, A as AmbientLight, f as useFrame, g as MeshTransmissionMaterial, D as DoubleSide, h as Color, i as GLTFLoader, S as SpotLight, k as Object3D, R as React, a as Metadata } from "./vendor-oeGY3SKp.js";
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
  containerRef,
  onAnimationComplete,
  onLensClick
}) {
  const gltf = useLoader(GLTFLoader, "/assets/MultiStageLights.glb");
  const modelRefs = reactExports.useRef([]);
  const [spotLight, setSpotLight] = reactExports.useState(null);
  const [nameMesh, setNameMesh] = reactExports.useState(null);
  const [animationPhase, setAnimationPhase] = reactExports.useState("initial");
  const animationStartTime = reactExports.useRef(Date.now());
  const [hasCursorEntered, setHasCursorEntered] = reactExports.useState(false);
  const [lightIntensity, setLightIntensity] = reactExports.useState(0);
  const lastMouseMoveTime = reactExports.useRef(Date.now());
  const fadeStartTime = reactExports.useRef(Date.now());
  const [isFading, setIsFading] = reactExports.useState(false);
  const [lightColors, setLightColors] = reactExports.useState({
    1: "#00ffff",
    // cyan
    2: "#ff00ff",
    // magenta
    3: "#bfff00",
    // lime
    4: "#00ffff",
    // cyan
    5: "#ff00ff",
    // magenta
    6: "#bfff00"
    // lime
  });
  const colorCycle = ["#00ffff", "#ff00ff", "#bfff00"];
  const colorTransitionRef = reactExports.useRef({});
  const [rotatingLights, setRotatingLights] = reactExports.useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true
  });
  reactExports.useEffect(() => {
    const handleMouseMove = () => {
      lastMouseMoveTime.current = Date.now();
      setIsFading(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const cycleLightColor = (lightNumber) => {
    console.log("Cycling color for light:", lightNumber);
    setLightColors((prev) => {
      const currentColor = prev[lightNumber];
      const currentIndex = colorCycle.indexOf(currentColor);
      const nextIndex = (currentIndex + 1) % colorCycle.length;
      const nextColor = colorCycle[nextIndex];
      gltf.scene.traverse((child) => {
        var _a2;
        const name = child.name.toLowerCase();
        if (name.includes(`lens_${lightNumber}`)) {
          if (child instanceof Mesh) {
            const material = child.material;
            if (material) {
              material.color.set(nextColor);
              material.emissive.set(nextColor);
            }
          }
        } else if (child instanceof SpotLight && ((_a2 = child.parent) == null ? void 0 : _a2.name.toLowerCase().includes(`lens_${lightNumber}`))) {
          child.color.set(nextColor);
        }
      });
      setRotatingLights((prev2) => ({
        ...prev2,
        [lightNumber]: false
      }));
      delete colorTransitionRef.current[lightNumber];
      return {
        ...prev,
        [lightNumber]: nextColor
      };
    });
  };
  const getLensColor = (lensNumber) => {
    return lightColors[lensNumber] || "#ffffff";
  };
  const createSpotLight = (color, lensNumber) => {
    const newSpotLight = new SpotLight(color, 0, 10, Math.PI / 6, 0.5, 1);
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
    const handleMouseMove = (event) => {
      if (!hasCursorEntered) {
        setHasCursorEntered(true);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasCursorEntered]);
  reactExports.useEffect(() => {
    if (!gltf.scene) return;
    modelRefs.current = positions.map(() => new Group());
    const initialRotations = /* @__PURE__ */ new Map();
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        const name = child.name.toLowerCase();
        if (name.includes("lens") || name.includes("head")) {
          initialRotations.set(name, child.rotation.x);
        }
      }
    });
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
            emissiveIntensity: 0,
            // Start with no emission
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
    gltf.scene.traverse((child) => {
      if (child instanceof PointLight) {
        child.intensity = 0;
      } else if (child instanceof HemisphereLight) {
        child.intensity = 0;
      } else if (child instanceof AmbientLight) {
        child.intensity = 0;
      }
    });
  }, [gltf, positions]);
  useFrame(() => {
    if (!gltf.scene || !modelRefs.current.length || !containerRef.current) return;
    const currentTime = Date.now();
    const elapsedTime = (currentTime - animationStartTime.current) / 1e3;
    const timeSinceLastMouseMove = currentTime - lastMouseMoveTime.current;
    if (isFading) {
      const fadeDuration = 2;
      const fadeStep = 1 / (fadeDuration * 60);
      Object.entries(rotatingLights).filter(([_, shouldRotate]) => shouldRotate).forEach(([lightNumber]) => {
        const lensNumber = parseInt(lightNumber);
        const child = gltf.scene.children.find((child2) => child2.name.toLowerCase().includes(`lens_${lensNumber}`));
        if (child instanceof Mesh) {
          const material = child.material;
          if (material) {
            if (!colorTransitionRef.current[lensNumber]) {
              const currentColor2 = lightColors[lensNumber];
              const currentIndex = colorCycle.indexOf(currentColor2);
              const nextIndex = (currentIndex + 1) % colorCycle.length;
              const nextColor2 = colorCycle[nextIndex];
              colorTransitionRef.current[lensNumber] = {
                startColor: currentColor2,
                endColor: nextColor2,
                progress: 0
              };
            }
            const transition = colorTransitionRef.current[lensNumber];
            const currentColor = new Color(transition.startColor);
            const nextColor = new Color(transition.endColor);
            const currentHSL = {
              h: 0,
              s: 0,
              l: 0
            };
            const nextHSL = {
              h: 0,
              s: 0,
              l: 0
            };
            currentColor.getHSL(currentHSL);
            nextColor.getHSL(nextHSL);
            const h = currentHSL.h + (nextHSL.h - currentHSL.h) * transition.progress;
            const s = currentHSL.s + (nextHSL.s - currentHSL.s) * transition.progress;
            const l = currentHSL.l + (nextHSL.l - currentHSL.l) * transition.progress;
            const interpolatedColor = new Color().setHSL(h, s, l);
            material.color.copy(interpolatedColor);
            material.emissive.copy(interpolatedColor);
            child.children.forEach((spotlight) => {
              if (spotlight instanceof SpotLight) {
                spotlight.color.copy(interpolatedColor);
              }
            });
            transition.progress += fadeStep;
            if (transition.progress >= 1) {
              setLightColors((prev) => ({
                ...prev,
                [lensNumber]: transition.endColor
              }));
              const currentIndex = colorCycle.indexOf(transition.endColor);
              const nextIndex = (currentIndex + 1) % colorCycle.length;
              colorTransitionRef.current[lensNumber] = {
                startColor: transition.endColor,
                endColor: colorCycle[nextIndex],
                progress: 0
              };
            }
          }
        }
      });
    }
    if (animationPhase === "initial") {
      if (elapsedTime > 0.3) {
        animationStartTime.current = Date.now();
        setAnimationPhase("turningOn");
      }
    } else if (animationPhase === "turningOn") {
      const intensity = Math.min(1, elapsedTime / 0.7);
      gltf.scene.traverse((child) => {
        if (child instanceof SpotLight) {
          child.intensity = intensity * 50;
          const parent = child.parent;
          if (parent && parent instanceof Mesh) {
            const material = parent.material;
            if (material) {
              material.emissiveIntensity = intensity * 2;
            }
          }
        }
      });
      if (elapsedTime > 0.7) {
        animationStartTime.current = Date.now();
        setAnimationPhase("rotating");
      }
    } else if (animationPhase === "rotating") {
      const rotationProgress = Math.min(1, elapsedTime / 0.7);
      const startRotation = -Math.PI / 2 + Math.PI / 12;
      const targetRotation = startRotation + (Math.PI / 2 - Math.PI / 18) * rotationProgress;
      const intensity = rotationProgress;
      setLightIntensity(intensity);
      gltf.scene.traverse((child) => {
        if (child instanceof PointLight) {
          child.intensity = intensity * 0.6;
        } else if (child instanceof HemisphereLight) {
          child.intensity = intensity * 0.1;
        } else if (child instanceof AmbientLight) {
          child.intensity = intensity * 0.3;
        }
      });
      gltf.scene.traverse((child) => {
        const name = child.name.toLowerCase();
        if (name.includes("lens") || name.includes("head")) {
          const currentZRotation = child.rotation.z;
          child.rotation.set(targetRotation, 0, currentZRotation);
        }
      });
      if (elapsedTime > 0.7) {
        animationStartTime.current = Date.now();
        setAnimationPhase("waiting");
        onAnimationComplete == null ? void 0 : onAnimationComplete();
        setIsFading(true);
        fadeStartTime.current = Date.now();
      }
    } else if (animationPhase === "waiting") {
      if (hasCursorEntered) {
        setAnimationPhase("following");
      }
    } else if (animationPhase === "following") {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      if (timeSinceLastMouseMove > 1e3 && !isFading) {
        setIsFading(true);
        fadeStartTime.current = currentTime;
      }
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
            switch (lightNumber) {
              case 1:
                baseAngle += Math.PI / 12;
                break;
              case 2:
                baseAngle += Math.PI / 24;
                break;
              case 5:
                baseAngle -= Math.PI / 24;
                break;
              case 6:
                baseAngle -= Math.PI / 12;
                break;
            }
            const currentXRotation = child.rotation.x;
            child.rotation.set(currentXRotation, 0, baseAngle);
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
            switch (lightNumber) {
              case 1:
                baseAngle += Math.PI / 12;
                break;
              case 2:
                baseAngle += Math.PI / 24;
                break;
              case 5:
                baseAngle -= Math.PI / 24;
                break;
              case 6:
                baseAngle -= Math.PI / 12;
                break;
            }
            child.rotation.z = -baseAngle;
          }
        });
      });
    } else if (animationPhase === "waiting" || animationPhase === "following") {
      gltf.scene.traverse((child) => {
        if (child instanceof SpotLight) {
          child.intensity = 50;
          const parent = child.parent;
          if (parent && parent instanceof Mesh) {
            const material = parent.material;
            if (material) {
              material.emissiveIntensity = 2;
            }
          }
        } else if (child instanceof PointLight) {
          child.intensity = 0.6;
        } else if (child instanceof HemisphereLight) {
          child.intensity = 0.1;
        } else if (child instanceof AmbientLight) {
          child.intensity = 0.3;
        }
      });
    }
    if (animationPhase !== "initial") {
      gltf.scene.traverse((child) => {
        if (child instanceof SpotLight) {
          child.intensity = 50;
          const parent = child.parent;
          if (parent && parent instanceof Mesh) {
            const material = parent.material;
            if (material) {
              material.emissiveIntensity = 2;
            }
          }
        }
      });
    }
  });
  if (!gltf.scene) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("group", { position: [0, 0, 0], children: /* @__PURE__ */ jsxRuntimeExports.jsx("primitive", { ref: (el) => {
      if (el) modelRefs.current[0] = el;
    }, object: gltf.scene, scale: 0.02, onClick: (e) => {
      e.stopPropagation();
      const name = e.object.name.toLowerCase();
      const lightMatch = name.match(/(?:head|lens)_(\d+)/);
      if (lightMatch) {
        const lightNumber = parseInt(lightMatch[1]);
        console.log("Found light number:", lightNumber);
        cycleLightColor(lightNumber);
      }
    } }) }),
    nameMesh && /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: nameMesh.geometry, position: nameMesh.position, rotation: nameMesh.rotation, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeshTransmissionMaterial, { color: "#ffffff", attenuationColor: "#ffffff", background: new Color("#000000"), transmissionSampler: true, backside: true, attenuationDistance: 0.5, roughness: 0.1, transmission: 0.95, ior: 1.5, side: DoubleSide }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: lightIntensity * 0.3 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [1.5, 0, 1], intensity: lightIntensity * 0.6, color: "#e0e0e0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hemisphereLight", { intensity: lightIntensity * 0.1, groundColor: "#000000", color: "#ffffff" })
  ] });
}
const MultiLightSource = ({
  className = "",
  lightPositions,
  onAnimationComplete,
  onLensClick
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
    position: [1.5, -1.25, 4],
    fov: 20
  }, gl: {
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  }, dpr: [1, 2], performance: {
    min: 0.5
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitControls, { enableRotate: false, enableZoom: false, enablePan: false, target: [1.5, -0.25, 0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LightModel, { mousePosition, positions: lightPositions, containerRef, onAnimationComplete, onLensClick })
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
    },
    "onAnimationComplete": {
      "required": false,
      "tsType": {
        "name": "signature",
        "type": "function",
        "raw": "() => void",
        "signature": {
          "arguments": [],
          "return": {
            "name": "void"
          }
        }
      },
      "description": ""
    },
    "onLensClick": {
      "required": false,
      "tsType": {
        "name": "signature",
        "type": "function",
        "raw": "(lensNumber: number) => void",
        "signature": {
          "arguments": [{
            "type": {
              "name": "number"
            },
            "name": "lensNumber"
          }],
          "return": {
            "name": "void"
          }
        }
      },
      "description": ""
    }
  }
};
const HeroBackground = ({
  onAnimationComplete,
  onLensClick
}) => {
  const lightPositions = [
    [-0.73, 0.45, 0],
    // Far Left light
    [-0.425, 0.45, 0],
    // Left light
    [-0.14, 0.45, 0],
    // Left-center light
    [0.14, 0.45, 0],
    // Right-center light
    [0.425, 0.45, 0],
    // Right light
    [0.73, 0.45, 0]
    // Far Right light
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero__background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero__content", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Peter Schuelke" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Building thoughtful, flexible systems for the web." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MultiLightSource, { className: "hero__background--light-source", lightPositions, onAnimationComplete, onLensClick })
  ] });
};
HeroBackground.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "HeroBackground",
  "props": {
    "onAnimationComplete": {
      "required": false,
      "tsType": {
        "name": "signature",
        "type": "function",
        "raw": "() => void",
        "signature": {
          "arguments": [],
          "return": {
            "name": "void"
          }
        }
      },
      "description": ""
    },
    "onLensClick": {
      "required": false,
      "tsType": {
        "name": "signature",
        "type": "function",
        "raw": "(lensNumber: number) => void",
        "signature": {
          "arguments": [{
            "type": {
              "name": "number"
            },
            "name": "lensNumber"
          }],
          "return": {
            "name": "void"
          }
        }
      },
      "description": ""
    }
  }
};
const Hero = ({
  onAnimationComplete,
  onLensClick
}) => {
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBackground, { onAnimationComplete, onLensClick }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: contentRef, className: "hero__content container--normal" })
  ] });
};
Hero.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Hero",
  "props": {
    "onAnimationComplete": {
      "required": false,
      "tsType": {
        "name": "signature",
        "type": "function",
        "raw": "() => void",
        "signature": {
          "arguments": [],
          "return": {
            "name": "void"
          }
        }
      },
      "description": ""
    },
    "onLensClick": {
      "required": false,
      "tsType": {
        "name": "signature",
        "type": "function",
        "raw": "(lensNumber: number) => void",
        "signature": {
          "arguments": [{
            "type": {
              "name": "number"
            },
            "name": "lensNumber"
          }],
          "return": {
            "name": "void"
          }
        }
      },
      "description": ""
    }
  }
};
const Feature = ({
  background,
  eyebrow,
  title,
  children
}) => {
  const [mousePosition, setMousePosition] = reactExports.useState({
    x: 50,
    y: 50
  });
  reactExports.useEffect(() => {
    const handleMouseMove = (e) => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 100;
      const y = (e.clientY - rect.top) / rect.height * 100;
      setMousePosition({
        x,
        y
      });
    };
    const element = document.querySelector(".feature--lights");
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `feature feature--${background}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature__content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature__header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "feature__eyebrow", children: eyebrow }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "feature__title", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature__body", children })
    ] }),
    background === "lights" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature__gradient gradient-animated", style: {
      background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsla(0, 100%, 50%, 0.15) 0%, hsla(0, 100%, 50%, 0.05) 30%, transparent 70%), var(--color-bg-hue-bolder)`
    } })
  ] });
};
Feature.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "Feature",
  "props": {
    "background": {
      "required": true,
      "tsType": {
        "name": "union",
        "raw": "'lights' | 'black'",
        "elements": [{
          "name": "literal",
          "value": "'lights'"
        }, {
          "name": "literal",
          "value": "'black'"
        }]
      },
      "description": ""
    },
    "eyebrow": {
      "required": true,
      "tsType": {
        "name": "string"
      },
      "description": ""
    },
    "title": {
      "required": true,
      "tsType": {
        "name": "string"
      },
      "description": ""
    },
    "children": {
      "required": true,
      "tsType": {
        "name": "ReactElement",
        "elements": [{
          "name": "signature",
          "type": "object",
          "raw": "{ hue?: number }",
          "signature": {
            "properties": [{
              "key": "hue",
              "value": {
                "name": "number",
                "required": false
              }
            }]
          }
        }],
        "raw": "ReactElement<{ hue?: number }>"
      },
      "description": ""
    }
  }
};
const TwoColumnText = ({
  paragraphs
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "two-column-text", children: paragraphs.map((paragraph, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: paragraph }, index)) });
};
TwoColumnText.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "TwoColumnText",
  "props": {
    "paragraphs": {
      "required": true,
      "tsType": {
        "name": "Array",
        "elements": [{
          "name": "string"
        }],
        "raw": "string[]"
      },
      "description": ""
    }
  }
};
const AccordionList = ({
  children,
  hue = 0
}) => {
  const childrenWithHue = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        hue
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-list", children: childrenWithHue });
};
AccordionList.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "AccordionList",
  "props": {
    "children": {
      "required": true,
      "tsType": {
        "name": "Array",
        "elements": [{
          "name": "ReactElement",
          "elements": [{
            "name": "AccordionItemProps"
          }],
          "raw": "ReactElement<AccordionItemProps>"
        }],
        "raw": "ReactElement<AccordionItemProps>[]"
      },
      "description": ""
    },
    "hue": {
      "required": false,
      "tsType": {
        "name": "number"
      },
      "description": "",
      "defaultValue": {
        "value": "0",
        "computed": false
      }
    }
  }
};
const AccordionItem = ({
  header,
  children
}) => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-item__border gradient-animated", style: {
      background: `linear-gradient(90deg, hsla(0, 100%, 50%, 0.4) 0%, hsla(0, 100%, 50%, 0.1) 50%, hsla(0, 100%, 50%, 0.2) 100%), var(--color-bg-hue-default)`
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "accordion-item__header", onClick: () => setIsOpen(!isOpen), "aria-expanded": isOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: header }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-item__icon", children: isOpen ? "−" : "+" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `accordion-item__body ${isOpen ? "accordion-item__body--open" : ""}`, "aria-hidden": !isOpen, children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-item__border gradient-animated", style: {
      background: `linear-gradient(90deg, hsla(0, 100%, 50%, 0.4) 0%, hsla(0, 100%, 50%, 0.1) 50%, hsla(0, 100%, 50%, 0.2) 100%), var(--color-bg-hue-default)`
    } })
  ] });
};
AccordionItem.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "AccordionItem",
  "props": {
    "header": {
      "required": true,
      "tsType": {
        "name": "string"
      },
      "description": ""
    },
    "children": {
      "required": true,
      "tsType": {
        "name": "ReactReactNode",
        "raw": "React.ReactNode"
      },
      "description": ""
    }
  }
};
const GradientWrapper = ({
  children
}) => {
  const [hue, setHue] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let animationFrame;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
        console.log("Animation started");
      }
      const progress = timestamp - startTime;
      const newHue = progress / 18e3 * 360;
      if (newHue >= 360) {
        startTime = timestamp;
      }
      setHue(newHue % 360);
      document.documentElement.style.setProperty("--hue-rotation", `${newHue % 360}deg`);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => {
      console.log("GradientWrapper unmounted");
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-wrapper", children });
};
GradientWrapper.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "GradientWrapper",
  "props": {
    "children": {
      "required": true,
      "tsType": {
        "name": "ReactReactNode",
        "raw": "React.ReactNode"
      },
      "description": ""
    }
  }
};
const HomePage = () => {
  const [isContentVisible, setIsContentVisible] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GradientWrapper, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "home-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Metadata, { title: "Home", description: "Home page" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { onAnimationComplete: () => setIsContentVisible(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `container--normal content ${isContentVisible ? "content--visible" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { background: "lights", eyebrow: "About", title: "A balance of systems thinking & creative problem solving.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TwoColumnText, { paragraphs: ["I've built digital products for brands like the NBA, CrossFit, and Children's Hospital of Philadelphia. Over the last decade, I've led front-end architecture on multimillion-dollar platforms, developed design systems from scratch, and collaborated with designers, strategists, and stakeholders to ship experiences that scale.", "What keeps me inspired is the blend of creativity and structure. I love taking vague requirements and transforming them into purposeful, extensible interfaces that just feel right. Whether I'm refining performance, integrating AI, or mentoring devs on scalable systems, I aim to bring clarity, craft, and momentum to every project."] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Feature, { background: "black", eyebrow: "Experience", title: "How I can help you", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionItem, { header: "Empathy first", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Before writing code or architecting a system, I start by listening. Whether I'm talking to a product owner, a designer, or another developer, I want to understand their goals, their pain points, and how they define success. I've found that the best solutions come from asking the right questions early, not jumping to answers. Empathy builds trust—and trust makes better products." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionItem, { header: "Systems over shortcuts", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "I love solving problems, but I'm especially drawn to solutions that last. That often means taking a bit more time up front to create clean abstractions, reusable components, or a pattern library that evolves with the product. I've seen firsthand how thoughtful systems can accelerate teams—reducing bugs, onboarding time, and duplicate effort. Good systems let people focus on the fun parts of building." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionItem, { header: "Design-aware engineering", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "I don't believe in pixel-pushing handoffs. I see design and engineering as a conversation—and I enjoy that back-and-forth. Whether I'm working inside Figma or giving real-time feedback in a pairing session, I care deeply about translating design intent into code that's accessible, performant, and flexible. Some of my favorite work has come from collaborating closely with designers to refine flows or prototype tricky edge cases together." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionItem, { header: "Curiosity never stops", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "I'm always exploring new tools, patterns, and ideas. Whether it's integrating LLMs with LangChain, experimenting with design token pipelines, or diving into visual regression testing, I treat each project as a chance to learn and level up. I also love sharing what I've learned—through mentoring, reviewing pull requests, or just talking shop with teammates. Growth is a shared experience." }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "My Work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsList, {})
    ] })
  ] }) });
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
//# sourceMappingURL=HomePage.stories-B28_l0sp.js.map
