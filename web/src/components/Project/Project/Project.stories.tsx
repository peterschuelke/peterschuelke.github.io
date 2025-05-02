// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/7/writing-stories/args

import type { Meta, StoryObj } from '@storybook/react'

import Project from './Project'

const meta: Meta<typeof Project> = {
  component: Project,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Project>

const SAMPLE_PROJECT = {
  id: 1,
  title: 'Sample Project',
  description: 'This is a sample project description that explains what the project is about and what technologies were used.',
  image: '/images/projects/sample.jpg',
  role: 'Full Stack Developer',
  createdAt: new Date().toISOString(),
}

export const Primary: Story = {
  args: {
    project: SAMPLE_PROJECT,
  },
}
