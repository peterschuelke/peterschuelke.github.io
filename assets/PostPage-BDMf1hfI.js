import { a as useMutation, _ as _t, n as navigate, b as namedRoutes, j as jsxRuntimeExports, L as Link, g as gql } from "./index-CdKqxcjc.js";
import { c as createCell } from "./createCell-B41bW8jg.js";
import { t as timeTag } from "./formatters-BLPe4K1Q.js";
const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`;
const Post = ({
  post
}) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      _t.success("Post deleted");
      navigate(namedRoutes.posts());
    },
    onError: (error) => {
      _t.error(error.message);
    }
  });
  const onDeleteClick = (id) => {
    if (confirm("Are you sure you want to delete post " + id + "?")) {
      deletePost({
        variables: {
          id
        }
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rw-segment", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "rw-segment-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "rw-heading rw-heading-secondary", children: [
        "Post ",
        post.id,
        " Detail"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "rw-table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Id" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: post.id })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: post.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Body" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: post.body })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Created at" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: timeTag(post.createdAt) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "rw-button-group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: namedRoutes.editPost({
        id: post.id
      }), className: "rw-button rw-button-blue", children: "Edit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "rw-button rw-button-red", onClick: () => onDeleteClick(post.id), children: "Delete" })
    ] })
  ] });
};
const QUERY = gql`
    query FindPostById($id: Int!) {
      post: post(id: $id) {
        id
        title
        body
        createdAt
      }
    }
  `;
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Empty = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Post not found" });
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-cell-error", children: error == null ? void 0 : error.message });
const Success = ({
  post
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Post, { post });
};
const PostCell = createCell({
  QUERY,
  Loading,
  Empty,
  Failure,
  Success,
  displayName: "PostCell"
});
const PostPage = ({
  id
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PostCell, { id });
};
export {
  PostPage as default
};
