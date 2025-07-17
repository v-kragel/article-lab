import type { Config } from "jest";

const config: Config = {
  rootDir: ".",
  moduleFileExtensions: ["js", "json", "ts"],
  testMatch: ["**/__tests__/**/*.spec.ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  testEnvironment: "node",
  coverageDirectory: "../coverage",
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
  },
  moduleDirectories: ['<rootDir>/../', 'node_modules'],
};

export default config;
