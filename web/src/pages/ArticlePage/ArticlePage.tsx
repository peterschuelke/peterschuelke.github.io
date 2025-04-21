import { Metadata } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'

import { Success as ArticleSuccess } from 'src/components/ArticleCell/ArticleCell'

interface Props {
  id: number
}

const ArticlePage = ({ id }: Props) => {
  const { data, loading, error } = useQuery(gql`
    query FindArticleQuery($id: Int!) {
      article: post(id: $id) {
        id
        title
        body
        createdAt
      }
    }
  `, {
    variables: { id }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="article-page">
      <Metadata title="Article" description="Article page" />
      <ArticleSuccess article={data?.article} />
    </div>
  )
}

export default ArticlePage

