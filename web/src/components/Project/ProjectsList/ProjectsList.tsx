import { useState, useEffect } from 'react'
import type { FindProjects } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'
import { loadProjects } from 'src/utils/staticData'
import { Link, routes } from '@redwoodjs/router'
import ProjectCard from '../ProjectCard/ProjectCard'

// Only use GraphQL in development
const QUERY = process.env.NODE_ENV === 'development' ? gql`
  query FindProjects {
    projects {
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

export const Empty = () => {
  return (
    <div className="projects-list__empty">
      {'No projects yet. '}
      <Link to={routes.newProject()} className="projects-list__link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="projects-list__error">
    Error loading projects: {error.message}
  </div>
)

export const Success = ({ projects }: CellSuccessProps<FindProjects>) => {
  return (
    <div className="projects-list">
      <div className="projects-list__grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

// Static data version for production
const StaticProjectsList = () => {
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

const ProjectsList = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Running in development mode')
    const { loading, error, data } = useQuery(QUERY)

    if (loading) return <Loading />
    if (error) return <Failure error={error} />
    if (!data?.projects?.length) return <Empty />

    return <Success projects={data.projects} />
  }

  console.log('Running in production mode')
  return <StaticProjectsList />
}

export default ProjectsList