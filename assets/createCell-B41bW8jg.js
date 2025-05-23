import { K as Kind, R as React, c as useQuery, d as useCellCacheContext, f as fragmentRegistry } from "./index-CdKqxcjc.js";
function getOperationName(document) {
  var _a;
  for (const definition of document.definitions) {
    if (definition.kind === Kind.OPERATION_DEFINITION && ((_a = definition.name) == null ? void 0 : _a.value)) {
      return definition.name.value;
    }
  }
  return "";
}
function isDataEmpty(data) {
  return !data || Object.values(data).every((fieldValue) => {
    return fieldValue === null || isFieldEmptyArray(fieldValue);
  });
}
function isFieldEmptyArray(field) {
  return Array.isArray(field) && field.length === 0;
}
const createCell = createNonSuspendingCell;
function createNonSuspendingCell({
  QUERY,
  beforeQuery = (props) => ({
    // By default, we assume that the props are the gql-variables.
    variables: props,
    /**
     * We're duplicating these props here due to a suspected bug in Apollo Client v3.5.4
     * (it doesn't seem to be respecting `defaultOptions` in `RedwoodApolloProvider`.)
     *
     * @see {@link https://github.com/apollographql/apollo-client/issues/9105}
     */
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  }),
  afterQuery = (data) => data,
  isEmpty = isDataEmpty,
  Loading = () => /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading..."),
  Failure,
  Empty,
  Success,
  displayName = "Cell"
}) {
  function NamedCell(props) {
    var _a, _b, _c;
    const { children: _, ...variables } = props;
    const options = beforeQuery(variables);
    const query = typeof QUERY === "function" ? QUERY(options) : QUERY;
    let {
      // eslint-disable-next-line prefer-const
      error,
      loading,
      data,
      ...queryResult
    } = useQuery(query, options);
    if (globalThis.__REDWOOD__PRERENDERING) {
      const { queryCache } = useCellCacheContext();
      const operationName = getOperationName(query);
      const transformedQuery = fragmentRegistry.transform(query);
      let cacheKey;
      if (operationName) {
        cacheKey = operationName + "_" + JSON.stringify(variables);
      } else {
        const cellName = displayName === "Cell" ? "the cell" : displayName;
        throw new Error(
          `The gql query in ${cellName} is missing an operation name. Something like FindBlogPostQuery in \`query FindBlogPostQuery($id: Int!)\``
        );
      }
      const queryInfo = queryCache[cacheKey];
      if (queryInfo == null ? void 0 : queryInfo.renderLoading) {
        loading = true;
      } else {
        if (queryInfo == null ? void 0 : queryInfo.hasProcessed) {
          loading = false;
          data = queryInfo.data;
          queryResult = { variables };
        } else {
          queryCache[cacheKey] || (queryCache[cacheKey] = {
            query: transformedQuery,
            variables: options.variables,
            hasProcessed: false
          });
        }
      }
    }
    if (error) {
      if (Failure) {
        return /* @__PURE__ */ React.createElement(
          Failure,
          {
            error,
            errorCode: (
              // Use the ad-hoc QueryResultWithErrorCode type to access the errorCode
              queryResult.errorCode ?? ((_c = (_b = (_a = error.graphQLErrors) == null ? void 0 : _a[0]) == null ? void 0 : _b.extensions) == null ? void 0 : _c["code"])
            ),
            ...props,
            updating: loading,
            queryResult
          }
        );
      } else {
        throw error;
      }
    } else if (data) {
      const afterQueryData = afterQuery(data);
      if (isEmpty(data, { isDataEmpty }) && Empty) {
        return /* @__PURE__ */ React.createElement(
          Empty,
          {
            ...props,
            ...afterQueryData,
            updating: loading,
            queryResult
          }
        );
      } else {
        return /* @__PURE__ */ React.createElement(
          Success,
          {
            ...props,
            ...afterQueryData,
            updating: loading,
            queryResult
          }
        );
      }
    } else if (loading) {
      return /* @__PURE__ */ React.createElement(Loading, { ...props, queryResult });
    } else {
      console.warn(
        `If you're using Apollo Client, check for its debug logs here in the console, which may help explain the error.`
      );
      throw new Error(
        "Cannot render Cell: reached an unexpected state where the query succeeded but `data` is `null`. If this happened in Storybook, your query could be missing fields; otherwise this is most likely a GraphQL caching bug. Note that adding an `id` field to all the fields on your query may fix the issue."
      );
    }
  }
  NamedCell.displayName = displayName;
  return (props) => {
    return /* @__PURE__ */ React.createElement(NamedCell, { ...props });
  };
}
export {
  createCell as c
};
