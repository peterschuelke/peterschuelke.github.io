var _a, _b, _c, _d, _e, _f;
import { A as Article } from "./Article-Vyn2xJup.js";
import "./vendor-oeGY3SKp.js";
const meta = {
  component: Article,
  title: "Components/Article"
};
const ARTICLE = {
  id: 1,
  title: "First Post",
  body: `Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Street art next level umami squid. Hammock hexagon glossier 8-bit banjo. Neutra la croix mixtape echo park four loko semiotics kitsch forage chambray. Semiotics salvia selfies jianbing hella shaman. Letterpress helvetica vaporware cronut, shaman butcher YOLO poke fixie hoodie gentrify woke heirloom.`
};
const Full = {
  args: {
    post: ARTICLE
  }
};
const Summary = {
  args: {
    post: ARTICLE,
    summary: true
  }
};
Full.parameters = {
  ...Full.parameters,
  docs: {
    ...(_a = Full.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: "{\n  args: {\n    post: ARTICLE\n  }\n}",
      ...(_c = (_b = Full.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Summary.parameters = {
  ...Summary.parameters,
  docs: {
    ...(_d = Summary.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: "{\n  args: {\n    post: ARTICLE,\n    summary: true\n  }\n}",
      ...(_f = (_e = Summary.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
const __namedExportsOrder = ["Full", "Summary"];
export {
  Full,
  Summary,
  __namedExportsOrder,
  meta as default
};
//# sourceMappingURL=Article.stories-Bnucw0Zz.js.map
