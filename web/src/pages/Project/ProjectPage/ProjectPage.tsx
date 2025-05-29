// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Project from 'src/components/Project/Project/Project'

interface ProjectPageProps {
  slug: string
}

const ProjectPage = ({ slug }: ProjectPageProps) => {
  return (
    <>
      <MetaTags title="Project" description="Project page" />
      <Project slug={slug} />
      {/*
          My default route is named `project`, link to me with:
          `<Link to={routes.project()}>Project</Link>`
      */}
    </>
  )
}

export default ProjectPage
