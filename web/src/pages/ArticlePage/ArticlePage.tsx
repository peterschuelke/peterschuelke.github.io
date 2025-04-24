import { useParams } from '@redwoodjs/router'
import ArticleCell from 'src/components/ArticleCell/ArticleCell'

const ArticlePage = () => {
  const { id } = useParams()
  return <ArticleCell id={Number(id)} />
}

export default ArticlePage

