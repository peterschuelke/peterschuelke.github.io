import { useState, useEffect } from 'react'
import Article from 'src/components/Article/Article'
import { loadArticles } from 'src/utils/staticData'
import { useQuery } from '@redwoodjs/web'

// Only use GraphQL in development
const QUERY = process.env.NODE_ENV === 'development' ? gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
` : null

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No articles yet!</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ articles }) => {
  return (
    <div className="articles">
      {articles.map((article) => (
        <Article post={article} key={article.id} summary={true} />
      ))}
    </div>
  )
}

// GraphQL version for development
const ArticlesCell = () => {
  const { loading, error, data } = useQuery(QUERY)

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!data?.articles?.length) return <Empty />

  return <Success articles={data.articles} />
}

// Static data version for production
const StaticArticlesCell = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await loadArticles()
        if (data) {
          setArticles(data)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!articles.length) return <Empty />

  return <Success articles={articles} />
}

export default process.env.NODE_ENV === 'development' ? ArticlesCell : StaticArticlesCell