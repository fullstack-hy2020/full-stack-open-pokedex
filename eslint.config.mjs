
export default [
    {
      files: ["**/*.js"],
      languageOptions: {
        sourceType: "commonjs",
        globals: {
          ...globals.node,
        },
        ecmaVersion: "latest",
      },
    },
  ]