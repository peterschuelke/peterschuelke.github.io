import type {
  EditProjectById,
  UpdateProjectInput,
  UpdateProjectMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ProjectForm from 'src/components/Project/ProjectForm'

export const QUERY: TypedDocumentNode<EditProjectById> = gql`
  query EditProjectById($id: Int!) {
    project: project(id: $id) {
      id
      title
      description
      image
      link
      role
      createdAt
    }
  }
`

const UPDATE_PROJECT_MUTATION: TypedDocumentNode<
  EditProjectById,
  UpdateProjectMutationVariables
> = gql`
  mutation UpdateProjectMutation($id: Int!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      title
      description
      image
      link
      role
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ project }: CellSuccessProps<EditProjectById>) => {
  const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT_MUTATION, {
    onCompleted: () => {
      toast.success('Project updated')
      navigate(routes.projects())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateProjectInput, id: EditProjectById['project']['id']) => {
    updateProject({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Project {project?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProjectForm project={project} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
