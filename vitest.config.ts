import {
  defineConfig
} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: [
      './src/configTest/setup.ts',
      './src/configTest/globalAli.js',
    ],
    coverage: {
      provider: 'istanbul',
      include: ['./src/app/components/**/*',
        'src/app/pages/**/*'
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
      watermarks: {
        lines: [70, 80],
        functions: [70, 80],
        branches: [70, 80],
        statements: [70, 80],
      },
    },
  },
})