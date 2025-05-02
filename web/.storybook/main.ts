import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: './vite.config.ts',
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  staticDirs: [],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [nodePolyfills()],
      resolve: {
        alias: {
          '/entry.client.tsx': './.storybook/entry.client.tsx',
        },
      },
      build: {
        sourcemap: true,
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                return 'vendor'
              }
            },
          },
        },
      },
      base: './',
    })
  },
}

export default config
