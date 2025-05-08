export const schema = gql`
  type Skill {
    id: Int!
    title: String!
    image: String
    projects: [Project]!
  }

  type Query {
    skills: [Skill!]! @requireAuth
    skill(id: Int!): Skill @requireAuth
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
    createSkill(input: CreateSkillInput!): Skill! @requireAuth
    updateSkill(id: Int!, input: UpdateSkillInput!): Skill! @requireAuth
    deleteSkill(id: Int!): Skill! @requireAuth
  }
`