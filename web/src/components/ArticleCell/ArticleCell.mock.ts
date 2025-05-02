// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  post: {
    __typename: 'Post' as const,
    id: 42,
    title: 'First Post',
    body: 'This is the first post',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
})
