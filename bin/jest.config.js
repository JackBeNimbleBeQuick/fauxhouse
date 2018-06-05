module.exports = {
  "roots": [
    "<rootDir>/ts/tests",
    "<rootDir>/ts"
  ],
  "collectCoverage": true,
  // commented because I like the default coverage block better for command line test
  // "coverageReporters": ["json", "html"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleDirectories": [
    "node_modules",
    "ts"
  ],
  "testRegex":"((ts|tests?)\/).+(test|spec)\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
