import type { Meta, StoryObj } from '@storybook/react'

import { Loading, Empty, Failure, Success } from './ArticlesCell'
import { standard } from './ArticlesCell.mock'

const meta: Meta = {
  title: 'Cells/ArticlesCell',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ margin: '2em' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

export const loading: StoryObj<typeof Loading> = {
  render: () => <Loading />,
}

export const empty: StoryObj<typeof Empty> = {
  render: () => <Empty />,
}

export const failure: StoryObj<typeof Failure> = {
  render: (args) => <Failure error={new Error('Oh no')} {...args} />,
}

export const success: StoryObj<typeof Success> = {
  render: (args) => <Success {...standard()} {...args} />,
}
