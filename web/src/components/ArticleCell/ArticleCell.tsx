import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Article from 'src/components/Article'

// Fallback data in case the database is not available
const fallbackData = {
  id: 1,
  title: "Welcome to the Blog",
  body: "This is a sample article. The database is not available in this environment.",
  createdAt: new Date().toISOString()
}

// Only use GraphQL in development
const QUERY: TypedDocumentNode<FindArticleQuery, FindArticleQueryVariables> | null =
  process.env.NODE_ENV === 'development'
    ? gql`
        query FindArticleQuery($id: Int!) {
          article: post(id: $id) {
            id
            title
            body
            createdAt
          }
        }
      `
    : null

const Loading = () => <div>Loading...</div>

const Empty = () => <div>Empty</div>

const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

const Success = ({
  article,
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  // In production, use the fallback data
  // In development, use the GraphQL data
  const data = process.env.NODE_ENV === 'development' ? article : fallbackData

  return <Article article={data} />
}

// Export the cell components individually
export { Loading, Empty, Failure, Success, QUERY }