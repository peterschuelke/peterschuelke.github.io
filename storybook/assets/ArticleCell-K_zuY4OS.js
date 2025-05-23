import { j as jsxRuntimeExports, r as reactExports } from "./vendor-oeGY3SKp.js";
import { A as Article } from "./Article-Vyn2xJup.js";
import { l as loadArticle } from "./staticData-DnxBRx36.js";
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Empty = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Article not found" });
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-cell-error", children: error == null ? void 0 : error.message });
const Success = ({
  post
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Article, { post });
};
const StaticArticleCell = ({
  id
}) => {
  const [article, setArticle] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await loadArticle(id);
        if (data) {
          setArticle(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Loading, {});
  if (error) return /* @__PURE__ */ jsxRuntimeExports.jsx(Failure, { error });
  if (!article) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Success, { post: article });
};
const ArticleCell = StaticArticleCell;
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
    "post": {
      "required": true,
      "tsType": {
        "name": "signature",
        "type": "object",
        "raw": "{\n  id: number\n  title: string\n  body: string\n  createdAt: string\n}",
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
            "key": "body",
            "value": {
              "name": "string",
              "required": true
            }
          }, {
            "key": "createdAt",
            "value": {
              "name": "string",
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
  ArticleCell as A,
  Empty as E,
  Failure as F,
  Loading as L,
  Success as S
};
//# sourceMappingURL=ArticleCell-K_zuY4OS.js.map
