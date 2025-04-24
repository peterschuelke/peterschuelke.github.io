import { useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'
import type { ArticleQuery } from 'types/graphql'
import Article from 'src/components/Article/Article'
import { loadArticle } from 'src/utils/staticData'

// Only use GraphQL in development
const QUERY = process.env.NODE_ENV === 'development' ? gql`
  query ArticleQuery($id: Int!) {
    article: post(id: $id) {
      id
      title
      body
      createdAt
    }
  }
` : null

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Article not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ article }) => {
  return <Article article={article} />
}

// GraphQL version for development
const ArticleCell = ({ id }) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id },
  })

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!data?.article) return <Empty />

  return <Success article={data.article} />
}

// Static data version for production
const StaticArticleCell = ({ id }) => {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await loadArticle(id)
        if (data) {
          setArticle(data)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!article) return <Empty />

  return <Success article={article} />
}

export default process.env.NODE_ENV === 'development' ? ArticleCell : StaticArticleCell