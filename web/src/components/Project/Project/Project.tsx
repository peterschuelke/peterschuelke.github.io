import { Link, routes } from '@redwoodjs/router'

import type { Project as ProjectType } from 'types/graphql'

interface Props {
  project: ProjectType
}

const Project = ({ project }: Props) => {
  return (
    <article className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold text-gray-900">
            <Link to={routes.project({ id: project.id })}>{project.title}</Link>
          </h2>
          <p className="text-sm text-gray-600 mb-2">Role: {project.role}</p>
          <p className="text-gray-700">{project.description}</p>
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
    </article>
  )
}

export default Project
