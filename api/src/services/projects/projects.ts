import type { QueryResolvers, MutationResolvers, ProjectRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const projects: QueryResolvers['projects'] = async () => {
  return db.project.findMany({
    include: {
      skills: true,
    },
  })
}

export const project: QueryResolvers['project'] = async ({ id }) => {
  return db.project.findUnique({
    where: { id },
    include: {
      skills: true,
    },
  })
}

export const projectBySlug: QueryResolvers['projectBySlug'] = async ({ slug }) => {
  return db.project.findFirst({
    where: { slug },
    include: {
      skills: true,
    },
  })
}

export const createProject: MutationResolvers['createProject'] = async ({ input }) => {
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

export const updateProject: MutationResolvers['updateProject'] = async ({ id, input }) => {
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

export const deleteProject: MutationResolvers['deleteProject'] = async ({ id }) => {
  return db.project.delete({
    where: { id },
    include: {
      skills: true,
    },
  })
}

export const Project: ProjectRelationResolvers = {
  skills: (_obj, { root }) => {
    return db.project.findUnique({ where: { id: root?.id } }).skills()
  },
}
