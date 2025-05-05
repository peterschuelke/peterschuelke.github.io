import { Link, routes } from '@redwoodjs/router'
import styles from './Project.pcss'

import type { Project as ProjectType } from 'types/graphql'

interface Props {
  project: ProjectType
}

const Project = ({ project }: Props) => {
  return (
    <article className={styles.project}>
      <div className={styles.projectContent}>
        <div>
          <img
            src={project.image}
            alt={project.title}
            className={styles.projectImage}
          />
        </div>
        <div className={styles.projectDetails}>
          <h2 className={styles.projectTitle}>
            <Link to={routes.project({ id: project.id })}>{project.title}</Link>
          </h2>
          <p className={styles.projectRole}>Role: {project.role}</p>
          <p className={styles.projectDescription}>{project.description}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              View Project →
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default Project
