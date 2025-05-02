export const schema = gql`
  type Project {
    id: Int!
    title: String!
    description: String!
    image: String!
    link: String
    role: String!
    createdAt: DateTime!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: Int!): Project @requireAuth
  }

  input CreateProjectInput {
    title: String!
    description: String!
    image: String!
    link: String
    role: String!
  }

  input UpdateProjectInput {
    title: String
    description: String
    image: String
    link: String
    role: String
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth
  }
`
