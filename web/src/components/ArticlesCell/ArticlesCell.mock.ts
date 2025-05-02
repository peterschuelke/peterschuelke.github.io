// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  articles: [
    {
      __typename: 'Post' as const,
      id: 42,
      title: 'First Post',
      body: 'This is the first post',
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    {
      __typename: 'Post' as const,
      id: 43,
      title: 'Second Post',
      body: 'This is the second post',
      createdAt: '2024-01-02T00:00:00.000Z',
    },
    {
      __typename: 'Post' as const,
      id: 44,
      title: 'Third Post',
      body: 'This is the third post',
      createdAt: '2024-01-03T00:00:00.000Z',
    },
  ],
})
