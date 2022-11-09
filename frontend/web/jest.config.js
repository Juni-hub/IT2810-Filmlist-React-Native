module.exports = {
    "transform": {
        "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
        "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
    ],
    "preset": "jest-expo",
    "testRegex": "(/__tests__/.*|/src/.*\\.(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "ios.ts",
      "ios.tsx",
      "android.ts",
      "android.tsx"
    ],
    "testEnvironment": "jsdom",
  }