export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./src/tests/setup.ts"],
  setupFilesAfterFramework: ["./src/tests/teardown.ts"],
  testMatch: ["**/*.test.ts"],
  verbose: true,
};
