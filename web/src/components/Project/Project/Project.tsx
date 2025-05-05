import { Link, routes } from '@redwoodjs/router'
import './Project.pcss'

interface Props {
  project: {
    id: number
    title: string
    description: string
    image: string
    link: string
    role: string
  }
}

const Project = ({ project }: Props) => {
  return (
    <article className="project">
      <div className="project__content">
        <img
          src={project.image}
          alt={project.title}
          className="project__image"
        />
        <h3 className="project__title">
          <Link to={routes.project({ id: project.id })}>{project.title}</Link>
        </h3>
        <p className="project__description">{project.description}</p>
        <p className="project__role">Role: {project.role}</p>
        <div className="project__links">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project__link"
          >
            View Project
          </a>
        </div>
      </div>
    </article>
  )
}

export default Project
