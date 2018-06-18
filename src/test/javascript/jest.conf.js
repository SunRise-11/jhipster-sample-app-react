module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  rootDir: '../../../',
  testMatch: ['<rootDir>/src/test/javascript/spec/**/+(*.)+(spec.ts)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'app/(.*)': '<rootDir>/src/main/webapp/app/$1'
  },
  reporters: [
    'default',
    [ 'jest-junit', { output: './target/test-results/jest/TESTS-results.xml' } ]
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/test/javascript/spec/app/modules/account/sessions/sessions.reducer.spec.ts'
  ]
};
