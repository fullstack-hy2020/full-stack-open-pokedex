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

## My comments

The pipeline will run on a push to the main branch. It will 
- set up the environment Ubuntu with node and get the repo inside the environement with a checkout.
- Check style with eslint.
- Run unit tests.
- Run e2e tests.
- Trigger a deployment to Render. 

The e2e tests with Playwright are configured (in playwright.config.js) to spin up its own web server and start the app for its test so we don't have to manually do that, when `npm run test:e2e` is run (locally or in pipeline). 

Render settings on the website are configured with Auto-Deploy OFF. We trigger a deploy from our pipeline with a call to the Render Deploy Hook. The variables `secrets.RENDER_SERVICE_ID, secrets.RENDER_API_KEY` are set in Github under Secrets and variables under settings for the repo. When a deploy is triggered Render will 
- fetch the latest commit from main branch from the Github repo.
- Run the build script `build_step.sh`.
- Run the command `npm run start-prod`.