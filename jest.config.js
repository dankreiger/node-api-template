const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/test-db-setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist/', '<rootDir>/src/test-db-setup.ts'],
  testURL: 'http://localhost/',
  verbose: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
