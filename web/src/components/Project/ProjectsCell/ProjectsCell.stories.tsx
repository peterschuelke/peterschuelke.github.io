import type { Meta, StoryObj } from '@storybook/react'

import { Loading, Empty, Failure, Success } from './ProjectsCell'
import { standard } from './ProjectsCell.mock'

const meta: Meta = {
  title: 'Cells/ProjectsCell',
  tags: ['autodocs'],
}

export default meta

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = () => {
  return Success ? <Success projects={standard().projects} /> : null
}
