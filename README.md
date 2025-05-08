# Full Stack Open 2024 - CI/CD Setup for Pokedex App

This project implements a continuous integration and deployment (CI/CD) workflow for a React-based full-stack Pokedex application. The focus is on setting up automated workflows using GitHub Actions, including linting, testing (unit and end-to-end), and building the project for production.

The production version of the application is available at the link: [View Here](https://full-stack-open-pokedex.pages.dev/)

## 📜 Certificate of Completion
With the successful completion of assignments 11.1. through 11.21. of the tenth part of the Full Stack Open course, I received the following certificate from the University of Helsinki:

CI/CD Module Certificate: [View Certificate](https://studies.cs.helsinki.fi/stats/api/certificate/fs-cicd/en/5dda0bc700abcc41219c50eb2fe0f5cf)

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
full-stack-open-pokedex/
├── .github/
│   └── workflows/
│       ├── api-healthcheck.yml
│       ├── ci.yml
│       ├── deploy.yml
│       ├── health-check.yml
│       ├── hello.yml
│       └── pipeline.yml
├── .vscode/
│   └── settings.json
├── e2e-tests/
│   └── pokedex.spec.js
├── public
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── ErrorMessage.jsx
│   ├── index.jsx
│   ├── LoadingSpinner.jsx
│   ├── PokemonAbility.jsx
│   ├── PokemonList.jsx
│   ├── PokemonPage.jsx
│   ├── styles.css
│   └── useApi.js
├── test/
│   ├── App.jest.spec.jsx
│   ├── PokemonList.jest.spec.jsx
│   └── PokemonPage.jest.spec.jsx
├── test-results/
│   └── .last-run.json
├── .babelrc
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── 11.1_warming_up.md
├── app.js
├── package-lock.json
├── package.json
├── playwright.config.js
├── README.md
├── webpack.config.js
└── wrangler.jsonc
```

All course materials for "BMI Calculator" exercises **11.1.–11.21.** are located inside the `full-stack-open-pokedex` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 11.1: Warming up

We considered a team of 6 developers actively working on a Python web application nearing release. A typical CI setup involves:
  - **Linting**: `pylint`, `flake8`, and `black` help ensure consistent style and catch syntax issues.
  - **Testing**: `pytest` is the most commonly used tool, offering powerful testing capabilities and plugin support.
  - **Building**: Tools like `setuptools`, `build`, and `pip` help create installable Python packages.

#### CI Alternatives

Beyond Jenkins and GitHub Actions, other CI services include:
  - **GitLab CI/CD** – deeply integrated into GitLab.
  - **CircleCI** – easy to configure with good parallelism.
  - **Travis CI** – popular in open-source but less common in new projects.
  - **Azure Pipelines** – robust and tightly integrated into the Azure ecosystem.

#### Hosting: Self-hosted vs Cloud

Cloud CI environments like GitHub Actions offer ease of use, scalability, and lower maintenance. However, self-hosted CI is better suited when:
  - Specific internal infrastructure dependencies exist.
  - Cost of CI in the cloud becomes high.
  - Privacy or security mandates require local builds.

### 11.2: The example project

Steps performed:
  - Forked the `fullstack-hy2020/full-stack-open-pokedex` repo.
  - Cloned the fork locally.
  - Used **Node.js v16** (required for compatibility).
  - Installed dependencies via `npm install`.
  - Run the app in development with `npm start`.
  - Executed linting and tests using `npm run lint` and `npm test`.
  - Built the production bundle with `npm run build`.
  - Served production locally using `npm run start-prod`.

**Project structure**: Both frontend and backend code exist in a monorepo. Webpack handles the frontend build. Tests are written in Jest.

### 11.3: Hello world!

Created `.github/workflows/hello.yml` with a basic GitHub Action that outputs:
  ```yaml
  - name: Hello world
    run: echo "Hello World!"
  ```

✅ Validated in the **Actions** tab, confirmed message and runtime environment.

### 11.4: Date and directory contents

Extended `hello.yml` with steps:
  ```yaml
  - name: Show date
    run: date
  - name: List directory
    run: ls -l
  ```

📝 Observed that GitHub Actions run in isolated virtual machines where the working directory has limited contents.

### 11.5: Linting workflow

Added `.github/workflows/pipeline.yml` to run linting via:
  ```yaml
  - name: Run linter
    run: npm run lint
  ```

✅ Workflow correctly failed due to pre-existing lint errors.

### 11.6: Fix the code

Identified and fixed issues:
  - Added appropriate `env` config in `.eslintrc` to handle global variables.
  - Silenced specific `console.log` rule with `// eslint-disable-line no-console`.

🟢 After commit, lint workflow passed successfully.

### 11.7: Building and testing

Extended `pipeline.yml`:
  ```yaml
  - name: Build project
    run: npm run build
  - name: Run tests
    run: npm test
  ```

⚠️ Unit tests initially failed.

### 11.8: Back to green

Investigated failing Jest tests and corrected application logic to align with expectations.

✅ After fixes, all tests passed and CI pipeline was fully green.

### 11.9: 

Chose Playwright for E2E testing.

**Setup**:
  - Installed Playwright: `npm i -D @playwright/test`
  - Added Jest ignore for E2E folder in `package.json`:
    ```json
    "jest": {
      "testEnvironment": "jsdom",
      "testPathIgnorePatterns": ["e2e-tests"]
    }
    ```

**Sample Test**:
  ```js
  const { test, expect } = require('@playwright/test');

  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5000');
    await expect(page.getByText('ivysaur')).toBeVisible();
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible();
  });
  ```

**Dev Server Config**:
  - Added Playwright dev server config to run `npm run start-prod` during tests.
  - Script `test:e2e` added:
    ```json
    "test:e2e": "playwright test"
    ```

✅ Test passed locally.

### 11.10: Deploying your application to Cloudflare Pages

Due to the fact that both Fly.io and Render are paid services I dumped my application on Cloudflare Pages. Here's how I did it:

1. Wrangler installation:
  ```bash
  npm install -g wrangler
  ```

2. Authorization to Cloudflare
  ```bash
  wrangler login
  ```

3. Project configuration: wrangler.jsonc
  - A wrangler.jonc file has been created:
    ```json
    {
	    "name": "full-stack-open-pokedex",
	    "compatibility_date": "2025-04-21",
	    "compatibility_flags": [
		    "nodejs_compat"
	    ],
    	"observability": {
		    "enabled": true
	    },
	    "placement": {
		    "mode": "smart"
	    }
    }
    ```

4. Manual implementation
  ```bash
  npm run build
  wrangler publish
  ```

📦 The application was made available under `https://full-stack-open-pokedex.pages.dev/`

### 11.11: Automatic deployments

1. Added file `.github/workflows/deploy.yml`:
  ```yaml
  name: Deploy to Cloudflare Pages

  on:
    push:
      branches:
        - main

  jobs:
    deploy:
      runs-on: ubuntu-latest

      steps:
        - name: Checkout code
          uses: actions/checkout@v4

        - name: Run tests
          run: npm install && npm test

        - name: Trigger Cloudflare Pages Deploy Hook
          uses: cloudflare/wrangler-action@v3
          with:
            apiToken: ${{ secrets.CF_API_TOKEN }}
  ```

📌 Token `CF_API_TOKEN` must have permissions `Pages:Edit` and Account `Settings:Read`. Add it as a **Repository Secrets**.

✅ When released to main, GitHub Actions will automatically build and publish the application.  

### 11.12: Health check

Cloudflare Pages does not support traditional container-based health-check like Fly.io, but we can **implement a manual** `/health` endpoint and use Cloudflare's **Monitors** or **Alerts**.

1. added health endpoint in `app.js`:
  ```js
  app.get('/health', (req, res) => {
    res.send('ok')
  })
  ```

🔥 Simulated failure
  - Changed code:
    ```js
    app.get('/health', (req, res) => {
      throw new Error('Simulated failure');
    });
    ```

🔍 Effect:
  - Endpoint `/health` returns 500.
  - External monitoring detects failure.

### 11.13: Pull request

1. Update the workflow trigger in `.github/workflows/pipeline.yml`:
    ```yaml
    name: Deployment pipeline

    on:
      push:
        branches:
        - main
      pull_request:
        branches: [main]
        types: [opened, synchronize]
    ```

2. Create a new feature branch:
    ```bash
    git checkout -b workflow-on-pr
    ```

3. Commit your changes and push the branch:
    ```bash
    git push origin workflow-on-pr
    ```

4. Open a pull request (PR) to the `main` branch:
  - Ensure the PR base is your own repository, not the course template repository.
  - In the "Conversation" tab, check that the workflow is triggered.
  - Wait for all checks to pass (status will change from yellow to green).

### 11.14: Run deployment step only for the main branch

Currently, all workflow steps run even on pull requests. This includes the deployment step, which should only run on actual pushes to `main`.

1. Add an `if` condition to your deployment step:
  ```yaml
  if: ${{ github.event_name == 'push' }}
  ```
2. Push changes to the PR branch and verify deployment no longer runs.
3. Merge the PR to `main` and confirm that deployment does run on `main`.

### 11.15: Adding versioning

1. **Add a new job** that bumps the version and creates a tag:
  ```yaml
  jobs:
  simple_deployment_pipeline:
    runs-on: ubuntu-20.04
    steps:
      # your linting, testing, and deployment steps

  tag_release:
    needs: [simple_deployment_pipeline]
    runs-on: ubuntu-20.04

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Bump version and push tag
        uses: anothrNick/github-tag-action@1.64.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          DEFAULT_BUMP: patch
  ```

2. Ensure that:
  - The version bump only happens on pushes to `main`.
  - You use `DEFAULT_BUMP: patch` to increment the patch version (e.g., `1.0.3` → `1.0.4`).

3. If you see permission errors, go to:
  - **Repository** → **Settings** → **Actions** → **General** → Set GITHUB_TOKEN permissions to "Read and Write".

### 11.16: Skipping a commit for tagging and deployment

To skip versioning and deployment for certain commits:

1. Modify the `if` condition for deployment and tagging steps:
  ```yaml
  if: ${{ github.event_name == 'push' && !contains(join(github.event.head_commit.message, ' '), '#skip') }}
  ```

2. This checks:
  - If the event is a `push`.
  - If any commit message does not contain `#skip`.

3. Add #skip in a commit message to skip deployment/tagging:
  ```bash
  git commit -m "Refactor tests #skip"
  ```

### 11.17: Adding protection to your main branch

Protect the `main` branch via GitHub UI:

1. Go to **Settings** → **Branches** → **Add rule**:
  - Branch name pattern: main
  - ✅ Require a pull request before merging.
  - ✅ Require status checks to pass before merging.
  - (Optionally) ✅ Do not allow bypassing by admins.

### 11.18: Build success/failure notification action

1. Pick a Discord notification GitHub Action, e.g., `discord-webhook-notify`.

2. Add webhook secret in GitHub:
  - Go to **Settings** → **Secrets** → **Actions** → **New repository secret**.
  - Name: `DISCORD_WEBHOOK`

3. Update workflow with success/failure notifications:
  ```yaml
  notify_success:
    needs: deploy
    runs-on: ubuntu-latest
    if: ${{ success() }}
    steps:
      - name: Notify Discord about successful deployment
        uses: rjstone/discord-webhook-notify@v1.0.4
        with:
          severity: info
          details: '✅ Deployment to Cloudflare Pages was successful!'
          webhookUrl: ${{ secrets.DISCORD_WEBHOOK }}

  notify_failure:
    needs: deploy
    runs-on: ubuntu-latest
    if: ${{ failure() }}
    steps:
      - name: Notify Discord about failed deployment
        uses: rjstone/discord-webhook-notify@v1.0.4
        with:
          severity: error
          details: '❌ Deployment to Cloudflare Pages failed. Please check the logs.'
          webhookUrl: ${{ secrets.DISCORD_WEBHOOK }}

  notify_cancelled:
    needs: deploy
    runs-on: ubuntu-latest
    if: ${{ cancelled() }}
    steps:
      - name: Notify Discord about cancelled deployment
        uses: rjstone/discord-webhook-notify@v1.0.4
        with:
          severity: warn
          details: '⚠️ Deployment to Cloudflare Pages was cancelled.'
          webhookUrl: ${{ secrets.DISCORD_WEBHOOK }}
  ```

### 11.19: Periodic health check

1. Create a **new workflow file**: `.github/workflows/health-check.yml`.

2. Use `url-health-check` or a similar action:
  ```yaml
  name: Health Check

  on:
    schedule:
      - cron: '0 8 1 * *'
    workflow_dispatch:

  env:
    ENABLED: false

  jobs:
    ping-server:
      runs-on: ubuntu-latest
      steps:
        - name: Check if deployed app is alive
          uses: jtalk/url-health-check-action@v4
          with:
            url: ${{ secrets.APP_URL }}
            follow-redirect: true
            max-attempts: 3
            retry-delay: 10s
  ```

3. Start by triggering with a push. Later remove manual triggers and rely on the schedule.

4. Set frequency to once a day or disable after testing to avoid consuming GitHub Action minutes.

### 11.20: Your own pipeline

1. Create a **new workflow file**: `.github/workflows/api-healthcheck.yml`

2. Paste the following code:
  ```yaml
  name: API Health Check

  on:
    schedule:
      - cron: '0 8 1 * *'
    workflow_dispatch:

  env:
    ENABLED: false

  jobs:
    check-endpoint:
      runs-on: ubuntu-latest
      steps:
        - name: Check if health check is enabled
          run: |
            if [ "$ENABLED" != "true" ]; then
              echo "Health check is disabled. Skipping..."
              exit 0
            fi

        - name: Send HTTP request to PokeAPI
          run: |
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" ${{ secrets.API_URL }})
            echo "Status code: $RESPONSE"
            if [ "$RESPONSE" -ne 200 ]; then
              echo "PokeAPI is not healthy!"
              exit 1
            fi
  ```

3. Add webhook secret in GitHub:
  - Go to **Settings** → **Secrets** → **Actions** → **New repository secret**.
  - Name: `API_URL`

4. Now our GitHub Action will systematically (with the frequency we set) test the API endpoint we specify in GitHub Secrets.

### 11.21: Protect your main branch and ask for pull request

1. Go to the new project repository → **Settings** → **Branches** → **Add rule**:
  - Protect the `main` branch.
  - ✅ Require pull request review before merging.
  - ✅ Require status checks to pass.
  - ✅ Disallow admins from pushing directly.
2. Create a pull request.
3. Invite GitHub user `mluukkai` as a collaborator:
  - Go to **Settings** → **Collaborators** → **Add user**.
  - Copy the invite link and ping the course team on Discord (#fullstack_webhook).

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open-pokedex
```

2. Install the dependencies:

```bash
npm install
```

3. Start test:

```bash
npm run test
```

4. Start eslint:

```bash
npm run eslint
```

5. Start e2e test:

```bash
npm run test:e2e
```
6. Start production build: 

```bash
npm run start-prod
```

## 🧠 Notes

⚙️ CI/CD Pipeline
  - CI/CD implemented using GitHub Actions.
  - Validates pull requests with linting, testing, and building steps.
  - Deploys only on push to main branch.
  - Skips deploy if any commit message includes #skip.

🏷️ Version Tagging
  - Automatically tags new versions using anothrNick/github-tag-action.
  - Increments patch version after each successful deployment.
  - Tags pushed only when commits are merged into main.

🛡️ Branch Protection
  - Protects main branch with required status checks.
  - Enforces pull request approval before merge.
  - Prevents force-pushes and direct commits to main, even for admins.

📣 Notifications
  - Sends success or failure build notifications to a Discord webhook.
  - Includes commit SHA in failure messages for easier debugging.

🩺 Health Checks
  - Scheduled daily health checks for production deployment.
  - Uses url-health-check GitHub Action with cron trigger.
  - Logs status of HTTP response from live app.

🧪 Own Application CI
  - Duplicated pipeline for personal app with separate frontend and backend.
  - Includes independent build and deploy steps per app component.
  - Follows same conventions for skip, tagging, and notifications.
