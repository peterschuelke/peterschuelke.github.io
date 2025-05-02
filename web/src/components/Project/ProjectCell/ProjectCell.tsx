import { useState, useEffect } from 'react'
import type { FindProjectById } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'
import { loadProject } from 'src/utils/staticData'

// Only use GraphQL in development
const QUERY = process.env.NODE_ENV === 'development' ? gql`
  query FindProjectById($id: Int!) {
    project(id: $id) {
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

export const Empty = () => <div>Project not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-600">Error: {error.message}</div>
)

export const Success = ({ project }: CellSuccessProps<FindProjectById>) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <p className="text-sm text-gray-500 mb-4">Role: {project.role}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 inline-block"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  )
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

const ProjectCell = ({ id }: { id: number }) => {
  if (process.env.NODE_ENV === 'development') {
    const { loading, error, data } = useQuery(QUERY, {
      variables: { id },
    })

    if (loading) return <Loading />
    if (error) return <Failure error={error} />
    if (!data?.project) return <Empty />

    return <Success project={data.project} />
  }

  return <StaticProjectCell id={id} />
}

export default ProjectCell