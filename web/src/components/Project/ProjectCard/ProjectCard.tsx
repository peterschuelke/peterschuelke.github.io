import { useInView } from 'react-intersection-observer'

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
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={`project-card ${inView ? 'project-card--visible' : ''}`}
    >
      <a
        href={`/projects/${project.id}`}
        rel="noopener noreferrer"
        className="project-card__link"
      >
      </a>
      <div className="project-card__image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.title}
          </a>
        </h3>
        <p className="project-card__role">{project.role}</p>
        <p className="project-card__summary">{project.summary}</p>
        <p className="project-card__link-text">
          View Project
        </p>

      </div>
    </div>
  )
}

export default ProjectCard