import { a as useMutation, j as jsxRuntimeExports, _ as _t, n as navigate, b as namedRoutes, g as gql } from "./index-CdKqxcjc.js";
import { P as PostForm } from "./PostForm-DvJXXSE-.js";
const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`;
const NewPost = () => {
  const [createPost, {
    loading,
    error
  }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      _t.success("Post created");
      navigate(namedRoutes.posts());
    },
    onError: (error2) => {
      _t.error(error2.message);
    }
  });
  const onSave = (input) => {
    createPost({
      variables: {
        input
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rw-segment", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "rw-segment-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "rw-heading rw-heading-secondary", children: "New Post" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rw-segment-main", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostForm, { onSave, loading, error }) })
  ] });
};
export {
  NewPost as N
};
