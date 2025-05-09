import type { Preview } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { routes } from './mocks/routes'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Components', 'Pages', 'Layouts'],
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  globals: {
    routes,
  },
}

export default preview