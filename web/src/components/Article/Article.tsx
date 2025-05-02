import { Link } from '@redwoodjs/router'

import type { Post } from 'types/graphql'

const truncate = (text: string, length: number) => {
  return text.substring(0, length) + '...'
}

interface Props {
  post: Omit<Post, 'createdAt'>
  summary?: boolean
}

const Article = ({ post, summary = false }: Props) => {
  return (
    <article className="mt-10">
      <header>
        <h2 className="text-xl text-blue-700 font-semibold">
          <Link to={`/article/${post.id}`}>{post.title}</Link>
        </h2>
      </header>
      <div className="mt-2 text-gray-900 font-light">
        {summary ? truncate(post.body, 100) : post.body}
      </div>
    </article>
  )
}

export default Article