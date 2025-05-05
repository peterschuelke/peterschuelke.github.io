import { Link, routes } from '@redwoodjs/router'
import './ProjectCard.pcss'

interface Props {
  project: {
    id: number
    title: string
    description: string
    summary: string
    image: string
    link: string
    role: string
    skills: {
      id: number
      title: string
    }[]
  }
}

const ProjectCard = ({ project }: Props) => {
  return (
    <article className="project-card">
      <div className="project-card__content">
        <img
          src={project.image}
          alt={project.title}
          className="project-card__image"
        />
        <h3 className="project-card__title">
          <Link to={routes.project({ id: project.id })}>{project.title}</Link>
        </h3>
        <p className="project-card__summary">{project.summary}</p>
        <p className="project-card__role">Role: {project.role}</p>
        {project.skills && (
          <div className="project-card__skills">
            {project.skills.map((skill) => (
              <span key={skill.id} className="project-card__skill-tag">
                {skill.title}
              </span>
            ))}
          </div>
        )}
        <div className="project-card__links">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
          >
            View Project
          </a>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard