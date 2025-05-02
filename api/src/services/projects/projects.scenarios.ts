import type { Prisma, Project } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProjectCreateArgs>({
  project: {
    one: {
      data: {
        title: 'String',
        description: 'String',
        image: 'String',
        link: 'String',
        role: 'String',
      },
    },
    two: {
      data: {
        title: 'String',
        description: 'String',
        image: 'String',
        link: 'String',
        role: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Project, 'project'>
