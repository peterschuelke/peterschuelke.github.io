import { useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'
import { Link, routes } from '@redwoodjs/router'
import { loadProject } from 'src/utils/staticData'
import { MetaTags } from '@redwoodjs/web'

// Only use GraphQL in development
const QUERY = process.env.NODE_ENV === 'development' ? gql`
  query ProjectQuery($slug: String!) {
    projectBySlug(slug: $slug) {
      id
      title
      slug
      description
      summary
      problem
      solution
      execution
      results
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

interface ProjectProps {
  project: {
    id: number
    title: string
    slug: string
    description: string
    summary?: string
    problem?: string
    solution?: string
    execution?: string
    results?: string
    image: string
    link: string
    role: string
    skills: {
      id: number
      title: string
      image?: string
    }[]
  }
}

const Project = ({ project }: ProjectProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="project container--normal">
      <div className="project__header">
        <h2 className="project__title">{project.title}</h2>
        {/* <p className="project__role">{project.role}</p> */}
      </div>

      <div className="project__content">
        {project.image && (
          <div className="project__image-container">
            <img src={project.image} alt={project.title} className="project__image" />
          </div>
        )}

        <div className="project__details">
          <p className="project__description">{project.description}</p>

          <div className="project__case-study">
            {project.problem && (
              <div className="project__section">
                <h3>Problem</h3>
                <p>{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="project__section">
                <h3>Solution</h3>
                <p>{project.solution}</p>
              </div>
            )}

            {project.execution && (
              <div className="project__section">
                <h3>Execution</h3>
                <p>{project.execution}</p>
              </div>
            )}

            {project.results && (
              <div className="project__section">
                <h3>Results</h3>
                <p>{project.results}</p>
              </div>
            )}
          </div>

          <div className="project__skills">
            {project.skills.map((skill) => (
              <span key={skill.id} className="project__skill">
                {skill.title}
              </span>
            ))}
          </div>

          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project__link">
              Visit Project
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

// GraphQL version for development
const ProjectCell = ({ slug }) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { slug },
  })

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!data?.projectBySlug) return <Empty />

  return <Project project={data.projectBySlug} />
}

// Static data version for production
const StaticProjectCell = ({ slug }) => {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await loadProject(slug)
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
  }, [slug])

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!project) return <Empty />

  return <Project project={project} />
}

export default process.env.NODE_ENV === 'development' ? ProjectCell : StaticProjectCell
