import type { ArticlesQuery, ArticlesQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Article from 'src/components/Article'

// Import static data in production
let staticData = null
if (process.env.NODE_ENV === 'production') {
  import('../../static/data/articles.json')
    .then(module => {
      staticData = module.default
    })
    .catch(error => {
      console.error('Error loading static data:', error)
    })
}

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
  // Use static data in production, GraphQL data in development
  const data = process.env.NODE_ENV === 'production' ? staticData : articles

  if (!data) {
    return <div>Loading articles...</div>
  }

  return (
    <>
      {data.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </>
  )
}