import { j as jsxRuntimeExports, L as Link, r as reactExports, l as loadArticle, u as useParams } from "./index-CdKqxcjc.js";
const truncate = (text, length) => {
  return text.substring(0, length) + "...";
};
const Article = ({
  post,
  summary = false
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl text-blue-700 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/article/${post.id}`, children: post.title }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-gray-900 font-light", children: summary ? truncate(post.body, 100) : post.body })
  ] });
};
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
const ArticlePage = () => {
  const {
    id
  } = useParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleCell, { id: Number(id) });
};
export {
  ArticlePage as default
};
