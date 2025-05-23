var _a, _b, _c;
import { P as Project } from "./Project-CgGFkVII.js";
import "./vendor-oeGY3SKp.js";
import "./staticData-DnxBRx36.js";
const meta = {
  component: Project,
  tags: ["autodocs"]
};
const SAMPLE_PROJECT = {
  id: 1,
  title: "Sample Project",
  description: "This is a sample project description that explains what the project is about and what technologies were used.",
  image: "/images/projects/sample.jpg",
  role: "Full Stack Developer",
  createdAt: (/* @__PURE__ */ new Date()).toISOString()
};
const Primary = {
  args: {
    project: SAMPLE_PROJECT
  }
};
Primary.parameters = {
  ...Primary.parameters,
  docs: {
    ...(_a = Primary.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    project: SAMPLE_PROJECT\n  }\n}",
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
//# sourceMappingURL=Project.stories-Dc021oN3.js.map
