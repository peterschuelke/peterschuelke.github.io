import { Link, routes } from '@redwoodjs/router'
import type { FindProjectById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import './ProjectCell.pcss'

export const QUERY = gql`
  query FindProjectById($id: Int!) {
    project: project(id: $id) {
      id
      title
      description
      technologies
      imageUrl
      githubUrl
      liveUrl
    }
  }
`

export const Loading = () => <div className="project-cell__loading">Loading...</div>

export const Empty = () => <div className="project-cell__empty">Project not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="project-cell__error">Error loading project: {error.message}</div>
)

export const Success = ({ project }: CellSuccessProps<FindProjectById>) => {
  return (
    <div className="project-cell">
      <article className="project-cell__content">
        <h2 className="project-cell__title">{project.title}</h2>
        <p className="project-cell__description">{project.description}</p>
        <div className="project-cell__technologies">
          {project.technologies.map((tech) => (
            <span key={tech} className="project-cell__tech-tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-cell__links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-cell__link"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-cell__link"
            >
              Live Demo
            </a>
          )}
        </div>
      </article>
    </div>
  )
}