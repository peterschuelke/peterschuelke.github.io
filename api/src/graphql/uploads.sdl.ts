export const schema = gql`
  type UploadResponse {
    path: String!
  }

  type Mutation {
    uploadFile(file: String!, filename: String!): UploadResponse! @requireAuth
  }
`