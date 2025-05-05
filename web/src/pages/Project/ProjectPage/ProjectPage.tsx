// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Project from 'src/components/Project/Project/Project'

const ProjectPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Project" description="Project page" />
      <Project id={id} />
      {/*
          My default route is named `project`, link to me with:
          `<Link to={routes.project()}>Project</Link>`
      */}
    </>
  )
}

export default ProjectPage
