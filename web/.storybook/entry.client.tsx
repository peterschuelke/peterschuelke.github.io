import { Preview } from '@storybook/react'
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
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  globals: {
    routes,
  },
}

export default preview