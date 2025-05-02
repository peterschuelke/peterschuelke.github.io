import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import BlogLayout from './BlogLayout'

const meta: Meta<typeof BlogLayout> = {
  component: BlogLayout,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof BlogLayout>

export const Primary: Story = {
  args: {
    children: <div className="p-4">Main content goes here</div>,
  },
}
