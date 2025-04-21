import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Article from 'src/components/Article'

// Import static data in production
const getStaticData = (id: number) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      return require(`../../static/data/article-${id}.json`)
    } catch (e) {
      console.error('Error loading static data:', e)
      return null
    }
  }
  return null
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
  // Use static data in production, GraphQL data in development
  const data = process.env.NODE_ENV === 'production'
    ? getStaticData(article.id)
    : article

  if (!data) {
    return <div>Article not found</div>
  }

  return <Article article={data} />
}