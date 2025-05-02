import { useState, useEffect } from 'react'
import type { FindProjects } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'
import { loadProjects } from 'src/utils/staticData'

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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ projects }: CellSuccessProps<FindProjects>) => {
  console.log(projects);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={project.image.startsWith('http') ? project.image : project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <p className="text-sm text-gray-500">Role: {project.role}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
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
        const data = await loadProjects()
        if (data) {
          setProjects(data)
        }
      } catch (err) {
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
    const { loading, error, data } = useQuery(QUERY)

    if (loading) return <Loading />
    if (error) return <Failure error={error} />
    if (!data?.projects?.length) return <Empty />

    return <Success projects={data.projects} />
  }

  return <StaticProjectsCell />
}

export default ProjectsCell