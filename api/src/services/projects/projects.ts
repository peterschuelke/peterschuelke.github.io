import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const projects: QueryResolvers['projects'] = () => {
  return db.project.findMany({
    include: {
      skills: true,
    },
  })
}

export const project: QueryResolvers['project'] = ({ id }) => {
  return db.project.findUnique({
    where: { id },
    include: {
      skills: true,
    },
  })
}

export const createProject: MutationResolvers['createProject'] = ({
  input,
}) => {
  const { skillIds, ...rest } = input
  return db.project.create({
    data: {
      ...rest,
      skills: {
        connect: skillIds?.map((id) => ({ id })) || [],
      },
    },
    include: {
      skills: true,
    },
  })
}

export const updateProject: MutationResolvers['updateProject'] = ({
  id,
  input,
}) => {
  const { skillIds, ...rest } = input
  return db.project.update({
    data: {
      ...rest,
      skills: {
        set: skillIds?.map((id) => ({ id })) || [],
      },
    },
    where: { id },
    include: {
      skills: true,
    },
  })
}

export const deleteProject: MutationResolvers['deleteProject'] = ({ id }) => {
  return db.project.delete({
    where: { id },
  })
}
