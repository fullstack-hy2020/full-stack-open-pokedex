# Full Stack open CI/CD

This repository is used for the CI/CD module of the Full stack open course

Fork the repository to complete course exercises

## Commands

Start by running `npm install` inside the project folder

`npm start` to run the webpack dev server
`npm test` to run tests
`npm run eslint` to run eslint
`npm run build` to make a production build
`npm run start-prod` to run your production build

## Skip automatic deployment & tagging (manual control using GitHub Secrets)

If you'd like to temporarily prevent automatic deployment and release tagging from running on pushes to `main`, add a repository **Actions secret** named `CHECK_SKIP` with the value `true`.

Steps to add the secret (from the GitHub UI):

1. Go to your repository on github.com → Settings → Secrets and variables → Actions
2. Click **New repository secret**
3. Set **Name** to `CHECK_SKIP` and **Value** to `true`, then save

When `CHECK_SKIP` is set to `true` the workflow will skip both the production deployment and the release tagging job.
