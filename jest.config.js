module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{js,ts, jsx, tsx}"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
};
