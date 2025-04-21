import type { ArticlesQuery, ArticlesQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Article from 'src/components/Article'

// Fallback data in case the database is not available
const fallbackData = [
  {
    id: 1,
    title: "Welcome to the Blog",
    body: "This is a sample article. The database is not available in this environment.",
    createdAt: new Date().toISOString()
  }
]

// Only use GraphQL in development
const QUERY: TypedDocumentNode<ArticlesQuery, ArticlesQueryVariables> | null =
  process.env.NODE_ENV === 'development'
    ? gql`
        query ArticlesQuery {
          articles: posts {
            id
            title
            body
            createdAt
          }
        }
      `
    : null

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<ArticlesQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  articles,
}: CellSuccessProps<ArticlesQuery, ArticlesQueryVariables>) => {
  // In production, use the fallback data
  // In development, use the GraphQL data
  const data = process.env.NODE_ENV === 'development' ? articles : fallbackData

  return (
    <>
      {data.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </>
  )
}