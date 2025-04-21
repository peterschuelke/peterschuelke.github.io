import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { getPaths, importStatementPath } from '@redwoodjs/project-config'

const redwoodProjectPaths = getPaths()

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: [
    `${importStatementPath(
      redwoodProjectPaths.web.src
    )}/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  ],
  addons: ['@storybook/addon-essentials'],
  core: {
    disableTelemetry: true,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        dedupe: ['@storybook/blocks'],
      },
    })
  },
}

export default config
