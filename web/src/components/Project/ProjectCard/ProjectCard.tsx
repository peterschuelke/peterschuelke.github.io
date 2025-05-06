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
      <div className="project-card__image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__role">{project.role}</p>
        <p className="project-card__summary">{project.summary}</p>
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
    </div>
  )
}

export default ProjectCard