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

export const QUERY: TypedDocumentNode<
  FindArticleQuery,
  FindArticleQueryVariables
> = gql`
  query FindArticleQuery($id: Int!) {
    article: post(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  article,
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  // In production, use the article from props (which will be pre-rendered)
  // In development, use the GraphQL data
  const data = article || fallbackData

  return <Article article={data} />
}