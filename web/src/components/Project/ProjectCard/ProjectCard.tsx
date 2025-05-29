import { useInView } from 'react-intersection-observer'
import { Link, routes } from '@redwoodjs/router'

interface Props {
  project: {
    id: number
    title: string
    slug: string
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
    <Link to={`/projects/${project.slug}`} className="project-card__link">
      <div
        ref={ref}
        className={`project-card ${inView ? 'project-card--visible' : ''}`}
      >

        <div className="project-card__content">
          <h3 className="project-card__title">
            {project.title}
          </h3>
          <div
            className="project-card__eyebrow gradient-animated"
            style={{
              background: `linear-gradient(90deg, hsla(0, 100%, 50%, 0.4) 0%, hsla(0, 100%, 50%, 0.1) 50%, hsla(0, 100%, 50%, 0.2) 100%), var(--color-bg-hue-default)`
            }}
          />
          <p className="project-card__summary">{project.summary}</p>
          <p className="project-card__link-text">
            Read More
          </p>
        </div>
        <div className="project-card__image">
          <img src={project.image} alt={project.title} />
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard