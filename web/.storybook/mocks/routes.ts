import type { AvailableRoutes } from '@redwoodjs/router'

export const routes: AvailableRoutes = {
  article: ({ id }: { id: number }) => '/article/{id:Int}',
  home: () => '/',
  about: () => '/about',
  post: ({ id }: { id: number }) => '/posts/{id:Int}',
  posts: () => '/posts',
  newPost: () => '/posts/new',
  editPost: ({ id }: { id: number }) => '/posts/{id:Int}/edit',
}