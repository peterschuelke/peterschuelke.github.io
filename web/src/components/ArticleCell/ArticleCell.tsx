import { useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'
import type { ArticleQuery } from 'types/graphql'
import Article from 'src/components/Article/Article'
import { loadArticle } from 'src/utils/staticData'

// Only use GraphQL in development
const QUERY = process.env.NODE_ENV === 'development' ? gql`
  query ArticleQuery($id: Int!) {
    post(id: $id) {
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

interface SuccessProps {
  post: {
    id: number
    title: string
    body: string
    createdAt: string
  }
}

export const Success = ({ post }: SuccessProps) => {
  return <Article post={post} />
}

// GraphQL version for development
const ArticleCell = ({ id }) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id },
  })

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!data?.post) return <Empty />

  return <Success post={data.post} />
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

  return <Success post={article} />
}

export default process.env.NODE_ENV === 'development' ? ArticleCell : StaticArticleCell