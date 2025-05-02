import { render } from '@redwoodjs/testing/web'

import Project from './Project'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Project', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Project />)
    }).not.toThrow()
  })
})
