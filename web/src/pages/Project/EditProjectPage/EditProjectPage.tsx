import EditProjectCell from 'src/components/Project/EditProjectCell'

type ProjectPageProps = {
  id: number
}

const EditPostPage = ({ id }: ProjectPageProps) => {
  return <EditProjectCell id={id} />
}

export default EditPostPage
