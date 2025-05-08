import { useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'
import { Link, routes } from '@redwoodjs/router'
import { loadProject } from 'src/utils/staticData'
import './Project.pcss'

// Only use GraphQL in development
const QUERY = process.env.NODE_ENV === 'development' ? gql`
  query ProjectQuery($id: Int!) {
    project(id: $id) {
      id
      title
      description
      summary
      image
      link
      role
      skills {
        id
        title
      }
    }
  }
` : null

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Project not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

interface SuccessProps {
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

export const Success = ({ project }: SuccessProps) => {
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
        <p className="project__summary">{project.summary}</p>
        <p className="project__description">{project.description}</p>
        <p className="project__role">Role: {project.role}</p>
        <div className="project__skills">
          {project.skills && project.skills.map((skill) => (
            <span key={skill.id} className="project__skill-tag">
              {skill.title}
            </span>
          ))}
        </div>
        <div className="project__links">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project__link"
          >
            Visit the Project
          </a>
        </div>
      </div>
    </article>
  )
}

// GraphQL version for development
const ProjectCell = ({ id }) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id },
  })

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!data?.project) return <Empty />

  return <Success project={data.project} />
}

// Static data version for production
const StaticProjectCell = ({ id }) => {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await loadProject(id)
        if (data) {
          setProject(data)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!project) return <Empty />

  return <Success project={project} />
}

export default process.env.NODE_ENV === 'development' ? ProjectCell : StaticProjectCell
