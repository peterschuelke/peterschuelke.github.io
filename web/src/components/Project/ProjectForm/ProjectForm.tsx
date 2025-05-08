import type { EditProjectById, UpdateProjectInput } from 'types/graphql'
import { useState } from 'react'
import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  TextAreaField,
  SelectField,
} from '@redwoodjs/forms'
import { handleImageUpload } from 'src/utils/imageUtils'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@apollo/client'

const SKILLS_QUERY = gql`
  query FindSkills {
    skills {
      id
      title
    }
  }
`

type FormProject = NonNullable<EditProjectById['project']> & {
  skillIds?: string[]
}

interface ProjectFormProps {
  project?: EditProjectById['project']
  onSave: (data: UpdateProjectInput, id?: FormProject['id']) => void
  error: RWGqlError
  loading: boolean
}

const ProjectForm = (props: ProjectFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(props.project?.image)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [newImagePath, setNewImagePath] = useState<string | null>(null)
  const { data: skillsData } = useQuery(SKILLS_QUERY)

  const onSubmit = (data: FormProject) => {
    console.log('Form submission data:', data)
    // Use the new image path if it exists, otherwise use the current project image
    const imagePath = newImagePath || props.project?.image

    // Convert skillIds to integers if they exist
    const skillIds = data.skillIds ? data.skillIds.map(id => parseInt(id, 10)) : undefined

    props.onSave({ ...data, image: imagePath, skillIds }, props?.project?.id)
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)

    try {
      const imagePath = await handleImageUpload(file)
      setNewImagePath(imagePath)
    } catch (error) {
      console.error('Error uploading image:', error)
      setUploadError('Failed to upload image')
    }
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormProject> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.project?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextAreaField
          name="description"
          defaultValue={props.project?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="rw-input"
        />

        {uploadError && <div className="rw-field-error">{uploadError}</div>}

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Project preview"
              className="max-w-xs rounded-lg shadow-lg"
            />
          </div>
        )}

        {props.project?.image && !imagePreview && (
          <div className="mt-4">
            <img
              src={props.project.image}
              alt="Current"
              className="max-w-xs rounded shadow-lg"
            />
          </div>
        )}

        <FieldError name="image" className="rw-field-error" />

        <Label
          name="link"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Link
        </Label>

        <TextField
          name="link"
          defaultValue={props.project?.link}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="link" className="rw-field-error" />

        <Label
          name="role"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Role
        </Label>

        <TextField
          name="role"
          defaultValue={props.project?.role}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="role" className="rw-field-error" />

        <Label
          name="skillIds"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Skills
        </Label>

        <SelectField
          name="skillIds"
          multiple
          defaultValue={[]}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        >
          {skillsData?.skills?.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.title}
            </option>
          ))}
        </SelectField>

        <FieldError name="skillIds" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProjectForm
