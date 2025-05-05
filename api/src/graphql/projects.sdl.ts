export const schema = gql`
  type Skill {
    id: Int!
    title: String!
    image: String
    projects: [Project]!
  }

  type Project {
    id: Int!
    title: String!
    description: String!
    summary: String
    image: String!
    link: String!
    role: String!
    skills: [Skill!]
    createdAt: DateTime!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: Int!): Project @requireAuth
    skills: [Skill!]! @requireAuth
    skill(id: Int!): Skill @requireAuth
  }

  input CreateProjectInput {
    title: String!
    description: String!
    summary: String
    image: String!
    link: String!
    role: String!
    skillIds: [Int!]
  }

  input UpdateProjectInput {
    title: String
    description: String
    summary: String
    image: String
    link: String
    role: String
    skillIds: [Int!]
  }

  input CreateSkillInput {
    title: String!
    image: String
  }

  input UpdateSkillInput {
    title: String
    image: String
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth
    createSkill(input: CreateSkillInput!): Skill! @requireAuth
    updateSkill(id: Int!, input: UpdateSkillInput!): Skill! @requireAuth
    deleteSkill(id: Int!): Skill! @requireAuth
  }
`
