import { g as gql, j as jsxRuntimeExports, a as useMutation, _ as _t, n as navigate, b as namedRoutes } from "./index-CdKqxcjc.js";
import { c as createCell } from "./createCell-B41bW8jg.js";
import { P as PostForm } from "./PostForm-DvJXXSE-.js";
import "./index-DrOEzEhq.js";
const QUERY = gql`
  query EditPostById($id: Int!) {
    post: post(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;
const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
      createdAt
    }
  }
`;
const Loading = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Loading..." });
const Failure = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-cell-error", children: error == null ? void 0 : error.message });
const Success = ({
  post
}) => {
  const [updatePost, {
    loading,
    error
  }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      _t.success("Post updated");
      navigate(namedRoutes.posts());
    },
    onError: (error2) => {
      _t.error(error2.message);
    }
  });
  const onSave = (input, id) => {
    updatePost({
      variables: {
        id,
        input
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rw-segment", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "rw-segment-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "rw-heading rw-heading-secondary", children: [
      "Edit Post ",
      post == null ? void 0 : post.id
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-segment-main", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostForm, { post, onSave, error, loading }) })
  ] });
};
const EditPostCell = createCell({
  QUERY,
  Loading,
  Failure,
  Success,
  displayName: "EditPostCell"
});
const EditPostPage = ({
  id
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EditPostCell, { id });
};
export {
  EditPostPage as default
};
