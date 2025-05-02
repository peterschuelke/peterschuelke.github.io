// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ProjectCell from 'src/components/Project/ProjectCell/ProjectCell'

const ProjectPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Project" description="Project page" />
      <ProjectCell id={id} />
      {/*
          My default route is named `project`, link to me with:
          `<Link to={routes.project()}>Project</Link>`
      */}
    </>
  )
}

export default ProjectPage
