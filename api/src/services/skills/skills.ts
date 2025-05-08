import type { QueryResolvers, MutationResolvers, SkillRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const skills: QueryResolvers['skills'] = () => {
  return db.skill.findMany()
}

export const skill: QueryResolvers['skill'] = ({ id }) => {
  return db.skill.findUnique({
    where: { id },
  })
}

export const createSkill: MutationResolvers['createSkill'] = ({ input }) => {
  return db.skill.create({
    data: input,
  })
}

export const updateSkill: MutationResolvers['updateSkill'] = ({ id, input }) => {
  return db.skill.update({
    data: input,
    where: { id },
  })
}

export const deleteSkill: MutationResolvers['deleteSkill'] = ({ id }) => {
  return db.skill.delete({
    where: { id },
  })
}

export const Skill: SkillRelationResolvers = {
  projects: (_obj, { root }) => {
    return db.skill.findUnique({ where: { id: root?.id } }).projects()
  },
}