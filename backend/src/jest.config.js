module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    clearMocks: true,
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    setupFilesAfterEnv: ['./jest.setup.ts'],
  };
  