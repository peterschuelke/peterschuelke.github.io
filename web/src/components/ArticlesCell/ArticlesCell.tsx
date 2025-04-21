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

export const QUERY: TypedDocumentNode<ArticlesQuery, ArticlesQueryVariables> =
  gql`
    query ArticlesQuery {
      articles: posts {
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
}: CellFailureProps<ArticlesQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  articles,
}: CellSuccessProps<ArticlesQuery, ArticlesQueryVariables>) => {
  // In production, use the articles from props (which will be pre-rendered)
  // In development, use the GraphQL data
  const data = articles || fallbackData

  return (
    <>
      {data.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </>
  )
}