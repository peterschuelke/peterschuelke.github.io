import { a as useMutation, _ as _t, j as jsxRuntimeExports, L as Link, b as namedRoutes, g as gql } from "./index-CdKqxcjc.js";
import { c as createCell } from "./createCell-B41bW8jg.js";
import { a as truncate, t as timeTag } from "./formatters-BLPe4K1Q.js";
const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`;
const PostsList = ({
  posts
}) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      _t.success("Post deleted");
    },
    onError: (error) => {
      _t.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{
      query: QUERY
    }],
    awaitRefetchQueries: true
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-segment rw-table-wrapper-responsive", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "rw-table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Id" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Body" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Created at" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: " " })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: truncate(post.id) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: truncate(post.title) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: truncate(post.body) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: timeTag(post.createdAt) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "rw-table-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: namedRoutes.post({
          id: post.id
        }), title: "Show post " + post.id + " detail", className: "rw-button rw-button-small", children: "Show" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: namedRoutes.editPost({
          id: post.id
        }), title: "Edit post " + post.id, className: "rw-button rw-button-small rw-button-blue", children: "Edit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Delete post " + post.id, className: "rw-button rw-button-small rw-button-red", onClick: () => onDeleteClick(post.id), children: "Delete" })
      ] }) })
    ] }, post.id)) })
  ] }) });
};
const QUERY = gql`
  query FindPosts {
    posts {
      id
      title
      body
      createdAt
    }
  }
`;
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Empty = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rw-text-center", children: [
    "No posts yet.",
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: namedRoutes.newPost(), className: "rw-link", children: "Create one?" })
  ] });
};
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-cell-error", children: error == null ? void 0 : error.message });
const Success = ({
  posts
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PostsList, { posts });
};
const PostsCell = createCell({
  QUERY,
  Loading,
  Empty,
  Failure,
  Success,
  displayName: "PostsCell"
});
const PostsPage = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PostsCell, {});
};
export {
  PostsPage as default
};
