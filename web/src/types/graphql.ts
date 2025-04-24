export type ArticlesQuery = {
  articles: Array<{
    id: number
    title: string
    body: string
    createdAt: string
  }>
}

export type ArticlesQueryVariables = Record<string, never>

export type ArticleQuery = {
  article: {
    id: number
    title: string
    body: string
    createdAt: string
  } | null
}

export type ArticleQueryVariables = {
  id: number
}