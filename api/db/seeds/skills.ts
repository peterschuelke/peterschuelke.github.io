export default async function ({ db }) {
  const skills = [
    { title: 'React' },
    { title: 'TypeScript' },
    { title: 'Node.js' },
    { title: 'GraphQL' },
    { title: 'RedwoodJS' },
    { title: 'Prisma' },
    { title: 'PostgreSQL' },
    { title: 'CSS' },
    { title: 'HTML' },
    { title: 'JavaScript' },
    { title: 'Git' },
    { title: 'Docker' },
    { title: 'AWS' },
    { title: 'CI/CD' },
    { title: 'Testing' },
  ]

  for (const skill of skills) {
    await db.skill.create({
      data: skill,
    })
  }
}