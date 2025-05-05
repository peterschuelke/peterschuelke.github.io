import { Link, routes } from '@redwoodjs/router'
import styles from './ProjectCell.module.pcss'

import type { Project as ProjectType } from 'types/graphql'

interface Props {
  project: ProjectType
}

const ProjectCell = ({ project }: Props) => {
  return (
    <article className={styles.cell}>
      <div className={styles.cellContent}>
        <div>
          <img
            src={project.image}
            alt={project.title}
            className={styles.cellImage}
          />
        </div>
        <div className={styles.cellDetails}>
          <h2 className={styles.cellTitle}>
            <Link to={routes.project({ id: project.id })}>{project.title}</Link>
          </h2>
          <p className={styles.cellRole}>Role: {project.role}</p>
          <p className={styles.cellDescription}>{project.description}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cellLink}
            >
              View Project →
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCell