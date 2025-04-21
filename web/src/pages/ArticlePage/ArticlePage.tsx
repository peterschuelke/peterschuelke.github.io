import { Metadata } from '@redwoodjs/web'
import ArticleCell from 'src/components/ArticleCell'

interface Props {
  id: number
}

const ArticlePage = ({ id }: Props) => {
  return (
    <>
      <Metadata title="Article" description="Article page" />

      {process.env.NODE_ENV === 'production' ? (
        // In production, we'll use the static data
        <ArticleCell id={id} />
      ) : (
        // In development, use the GraphQL data
        <ArticleCell id={id} />
      )}
    </>
  )
}

export default ArticlePage

