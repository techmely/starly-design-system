import type { StorybookConfig } from '@storybook/types';


const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  docs: {
    autodocs: 'tag',
  },
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  // @ts-expect-error I don't know how to fix this
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');
 
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
    });
  },
  typescript: {
    check: false,
  },
};

export default config