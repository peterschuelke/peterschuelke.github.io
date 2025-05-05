import { useState, useEffect } from 'react'
import type { FindProjects } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'
import { loadProjects } from 'src/utils/staticData'
import styles from './ProjectsCell.module.pcss'

// Only use GraphQL in development
const QUERY = process.env.NODE_ENV === 'development' ? gql`
  query FindProjects {
    projects {
      id
      title
      description
      image
      link
      role
      createdAt
    }
  }
` : null

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No projects found</div>

export const Failure = ({ error }: CellFailureProps) => {
  console.error('ProjectsCell error:', error)
  return <div className="rw-cell-error">Error: {error?.message}</div>
}

export const Success = ({ projects }: CellSuccessProps<FindProjects>) => {
  console.log('ProjectsCell success:', projects)
  if (!projects || projects.length === 0) {
    return <Empty />
  }
  return (
    <div className={styles.projectsGrid}>
      {projects.map((project) => (
        <div key={project.id} className={styles.projectCard}>
          <img
            src={project.image.startsWith('http') ? project.image : project.image}
            alt={project.title}
            className={styles.projectImage}
          />
          <div className={styles.projectContent}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
            <p className={styles.projectRole}>Role: {project.role}</p>
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
      ))}
    </div>
  )
}

// Static data version for production
const StaticProjectsCell = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching static projects...')
        const data = await loadProjects()
        console.log('Static projects data:', data)
        if (data) {
          setProjects(data)
        }
      } catch (err) {
        console.error('Error loading static projects:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <Loading />
  if (error) return <Failure error={error} />
  if (!projects?.length) return <Empty />

  return <Success projects={projects} />
}

const ProjectsCell = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode')
    const { loading, error, data } = useQuery(QUERY)

    if (loading) return <Loading />
    if (error) return <Failure error={error} />
    if (!data?.projects?.length) return <Empty />

    return <Success projects={data.projects} />
  }

  console.log('Running in production mode')
  return <StaticProjectsCell />
}

export default ProjectsCell