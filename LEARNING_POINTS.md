# Learning Points — Exercise 11.2: The Example Project

## Overview
This exercise introduces the CI/CD module by forking, cloning, and running an existing full-stack React + Express project locally. The project combines frontend and backend code in a single repository, uses Webpack for bundling, Jest for testing, ESLint for linting, and Express for production serving.

---

## 1. Forking a Repository

- **Forking** creates a copy of someone else's repository under your own GitHub account.
- The fork is independent — changes you push go to your fork, not the original.
- GitHub automatically sets the original repo as the `upstream` remote.
- Forking is the standard way to contribute to open-source projects or start exercises based on a template.

## 2. Cloning a Repository

- `git clone <repo-url>` downloads the repository to your local machine.
- The cloned repo retains the full Git history and branches.
- After cloning, always check `package.json` first — it contains the entry point, scripts, dependencies, and project metadata.

## 3. Understanding `package.json`

- **`name` / `version`** — Project identity.
- **`scripts`** — Custom command aliases (e.g., `"start"`, `"test"`, `"build"`). These abstract away complex CLI commands.
- **`dependencies`** — Packages required at runtime (React, Express, Axios).
- **`devDependencies`** — Packages needed only during development/testing (Webpack, Jest, ESLint, Babel).
- **`jest` config** — Inline Jest configuration (e.g., `testEnvironment: "jsdom"`).
- Key scripts in this project:
  - `npm start` — runs `webpack-dev-server` (development mode with HMR)
  - `npm run build` — creates a production bundle via Webpack
  - `npm test` — runs Jest test runner
  - `npm run eslint` — runs ESLint across JS/JSX files
  - `npm run start-prod` — runs the Express production server (`node app.js`)

## 4. Node Version Compatibility

- The project specifies **Node 16** as the minimum requirement.
- Newer Node versions (e.g., 26.x) may still work but can introduce subtle issues (e.g., OpenSSL errors with older Webpack 4, changed crypto defaults).
- **Always check the README or `.nvmrc`** for version requirements before starting.

## 5. Installing Dependencies

- `npm install` reads `package.json` and `package-lock.json` to install the exact dependency tree.
- The lock file ensures **reproducible builds** across environments.
- On Windows, PowerShell glob syntax differs from bash — be mindful of command patterns in scripts (e.g., single-quoted globs might fail).

## 6. Development Mode vs Production Mode

| Aspect | Development (`npm start`) | Production (`npm run build` + `npm run start-prod`) |
|---|---|---|
| Bundling | On-the-fly, served by Webpack Dev Server | Pre-built static files in `dist/` |
| Source Maps | Full, inline | Minimal or none |
| Hot Module Replacement | ✅ Yes | ❌ No |
| Performance | Slower (unoptimized) | Faster (minified, tree-shaken) |
| Server | `webpack-dev-server` (port 8080) | Express serving `dist/` (port 5000) |

- **Never run development mode in production** — it's heavier, exposes source code, and has poorer performance.
- The same React codebase can run in both modes using different build pipelines.

## 7. Running and Interpreting Tests (Jest)

- Jest was configured with `testEnvironment: "jsdom"` to simulate a browser DOM.
- Tests use `@testing-library/react` for rendering components and making assertions.
- Async operations in tests must be wrapped in `act()` to flush state updates.
- **Mocking external APIs** — `jest.mock('axios')` replaces real HTTP calls with controlled mock responses.
- **Test results observed:**
  - `PokemonList` — ✅ passed (renders list items)
  - `App` — ✅ passed (fetches data, shows error state)
  - `PokemonPage` — ❌ 1/4 tests failed (`should render previous and next urls if they exist` expected `href="/pokemon/vaporeon"` but got `href="/pokemon/ditto"` — a logic bug in the component)
- **Not all tests pass in real projects** — broken tests are learning opportunities and are deliberately left for subsequent exercises.

## 8. Linting with ESLint

- ESLint enforces **coding style and quality rules** defined in `.eslintrc.js`.
- Common rule categories observed:
  - **`linebreak-style`** — requires `LF` (Unix) line endings; Windows uses `CRLF`, causing hundreds of "errors"
  - **`no-undef`** — prevents use of undefined variables; caught missing `node` env in config file
  - **`no-console`** — forbids `console.log` in production code
  - **`no-unused-vars`** — catches imports that are never used (e.g., `Router` in `App.jsx`)
  - **`quotes`**, **`semi`**, **`indent`** — stylistic consistency rules
- 495 of 501 errors were **auto-fixable** with `--fix`, particularly line-ending and quote style issues.
- Linting issues can be real (bugs) or cosmetic (style). Both need to be addressed for a clean CI pipeline.
- Many **false positives** occur when the ESLint config does not match the environment (e.g., Node.js globals need `env: { node: true }`).

## 9. Production Build with Webpack

- `webpack --mode production` creates an optimized bundle in the `dist/` directory.
- The Webpack config (`webpack.config.js`):
  - Entry point: `src/index.jsx`
  - Output: `dist/bundle.js`
  - Loaders: `babel-loader` (JSX/JS transpilation), `html-loader`, `css-loader`/`style-loader`
  - Plugin: `HtmlWebpackPlugin` (generates `index.html` with the script tag injected)
  - Dev server: configured with `historyApiFallback: true` for client-side routing
- The production build is **minified** and **tree-shaken** for optimal loading performance.

## 10. Express as Production Server

- `app.js` is a minimal Express server:
  - Serves the `dist/` folder as static files
  - Listens on `PORT` env variable or defaults to 5000
- This is a standard pattern: React handles routing client-side, Express just serves the built files.
- No SSR (Server-Side Rendering) — the Express server is purely a static file host.

## 11. Monorepo Structure (Frontend + Backend Together)

- Unlike earlier course parts (separate repos for frontend and backend), this project combines both in a single repository.
- **Benefits for CI/CD:**
  - Single repository to clone, build, and deploy
  - Atomic changes across frontend/backend in one commit
  - Simplified pipeline configuration
- **Trade-off:** Shared dependencies and build tooling can be more complex to manage.

## 12. Working with Pre-existing Issues

- Real-world projects often have **known broken tests** and **linting errors**.
- It's important to:
  - Assess the severity of each issue
  - Decide whether to fix immediately or defer
  - Track issues for later resolution
- CI pipelines should be configured to **fail on errors** but allow the team to incrementally improve quality.

## 13. Project Structure Summary

```
full-stack-open-pokedex/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── index.jsx           # App entry point
│   ├── App.jsx             # Main component with routing
│   ├── PokemonPage.jsx     # Single pokemon detail page
│   ├── PokemonList.jsx     # List of pokemon
│   ├── PokemonAbility.jsx  # Ability display component
│   ├── ErrorMessage.jsx    # Error state component
│   ├── LoadingSpinner.jsx  # Loading state component
│   ├── useApi.js           # Custom hook for API calls
│   └── styles.css          # Global styles
├── test/
│   ├── App.jest.spec.jsx           # App-level tests
│   ├── PokemonList.jest.spec.jsx    # List component tests
│   └── PokemonPage.jest.spec.jsx   # Page component tests
├── app.js                 # Express production server
├── webpack.config.js      # Webpack configuration
├── .eslintrc.js           # ESLint configuration
├── .babelrc               # Babel configuration
└── package.json           # Project manifest & scripts
```

---

## 14. GitHub Actions Workflow Fundamentals (Exercises 11.3 & 11.4)

- Workflow files live in `.github/workflows/` and are YAML files (e.g. `hello.yml`).
- Basic anatomy of a workflow:
  - `name` — the workflow's display name in the Actions tab.
  - `on` — the trigger event (e.g. `push` to the `main` branch).
  - `jobs` — one or more jobs (jobs run in parallel by default).
  - `runs-on` — the runner operating system/image (e.g. `ubuntu-latest`).
  - `steps` — the ordered list of actions/commands inside a job.
  - `run:` — executes shell commands on the runner.
- `echo "Hello World!"` as a step command prints the message to the job log.
- **Runner images get retired:** `ubuntu-20.04` was decommissioned and jobs requesting it stayed stuck in "queued"/"pending" forever. Always use current images such as `ubuntu-latest`.
- Every workflow run happens on a **brand-new virtual machine**:
  - `date` shows the runner's clock/timezone (UTC by default).
  - `ls -l` shows the working directory is **EMPTY** — the runner does not automatically contain your code.
  - That is exactly why a `checkout` step is required before you can use your files.
- The Actions tab also reveals the exact environment of the run (OS version, tools), which makes debugging reproducible.

## 15. Linting in the Pipeline (Exercise 11.5)

- The lint workflow ("Pipeline") adds these steps:
  - `actions/checkout@v4` — downloads the repository code onto the runner.
  - `actions/setup-node@v4` with `node-version` — installs the required Node.js runtime.
  - `npm install` — installs dependencies.
  - `npm run eslint` — runs the linter.
- A step that exits with a **non-zero exit code fails the whole run** → the workflow goes red.
- The project started with **501 lint errors**, so the lint workflow failed — correctly proving the code quality was not up to standard.
- ESLint can also lint config files: `module.exports`, `require`, `process` trigger `no-undef` errors unless the Node.js environment is declared.

## 16. Fixing the Lint Errors (Exercise 11.6)

- `no-undef` for Node globals → add `"node": true` to the `env` block in `.eslintrc.js`. This tells ESLint that `require`, `module`, `process` are valid globals of the Node runtime.
- `no-console` → either remove the log, or silence the rule for just that line:
  ```js
  // eslint-disable-next-line no-console
  console.log(...)
  ```
- `no-unused-vars` → remove unused imports (e.g. an imported-but-unused `Router` component).
- `quotes` / `semi` / `indent` rules → keep the style consistent (single quotes, no semicolons, 2-space indentation).
- `linebreak-style: unix` → the project expects LF line endings. On Windows the working tree uses CRLF (causing hundreds of local errors), but Git normally normalizes to LF in the repository and on the Linux runner.
- Focus on the errors shown in the **runner's build logs** — those are the ones that actually break the pipeline.

## 17. Building and Testing in the Pipeline (Exercises 11.7 & 11.8)

- Extend the same workflow with `npm run build` (production bundle) and `npm test` (Jest unit tests), following the same pattern as the lint step.
- Full pipeline order: **install → lint → build → test**.
- The test step failed because of a real bug in `src/PokemonPage.jsx`: the "Next" link used `previous.name` instead of `next.name`, so it pointed to the wrong Pokémon. The failing test exposed the bug.
- **Fix the code, not the tests** — tests encode the expected behavior.
- After the fix, the pipeline went "back to green" — CI caught a real bug that manual testing had missed.

## 18. End-to-End Testing with Playwright (Exercise 11.9)

- Component tests (Jest + jsdom) verify pieces in isolation; **e2e tests verify the whole application** the way a real user interacts with it.
- Keep e2e tests out of Jest by extending `package.json`:
  ```json
  "jest": {
    "testEnvironment": "jsdom",
    "testPathIgnorePatterns": ["e2e-tests"]
  }
  ```
- Install `@playwright/test` as a **devDependency in the same project**.
- Playwright config (`playwright.config.js`):
  - `testDir` — where the `*.spec.js` tests live (the `e2e-tests/` directory).
  - `use.baseURL` — the base address so `page.goto('')` opens the app root.
  - `webServer` — automatically starts the app before the tests run:
    ```js
    command: 'npm run build && npm run start-prod',
    port: 5000,
    reuseExistingServer: !process.env.CI
    ```
- npm script: `"test:e2e": "playwright test"`.
- Test API highlights: `page.goto('')`, `page.getByText(...)`, `expect(...).toBeVisible()`, `page.getByText(...).click()`.
- Pokémon names are **lowercase in the source** (capitalization is done with CSS only), so match `ivysaur` and `chlorophyll` — never `Ivysaur`/`Chlorophyll`.
- Browsers are not bundled with npm — run `npx playwright install` once locally before running tests.
- Current Playwright versions require **Node ≥ 20**, so the pipeline's `node-version` was bumped from 16 to 20.
- In CI, add `npx playwright install --with-deps` before the `npm run test:e2e` step.
- Trade-off: e2e tests give real end-user confidence, but run **much slower** → slower feedback.

## 19. Deploying the Application (Exercise 11.10)

- Render ended its free tier, so the deployment was done on **Netlify** (free static hosting).
- The Pokedex is effectively a **static site**: Express only serves the `dist/` folder, and all data comes from the public PokeAPI.
- Netlify build settings: build command `npm run build`, publish directory `dist`, plus environment variables `NODE_VERSION=20` (Playwright needs Node ≥ 20 at install time) and `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` (no e2e tests run on the host).
- `netlify.toml` expresses these settings directly in the repository, including an **SPA redirect** so deep links like `/pokemon/ivysaur` serve `index.html`.
- Turn **OFF automatic deploys** so deployments happen only when the CI pipeline passes.
- Use "Trigger deploy" (the equivalent of Render's Manual deploy) the first time and **keep the logs open** — the first deploy almost always fails once before succeeding.

## 20. Automatic Deployments (Exercise 11.11)

- A **Deploy Hook** (Render) / **Build Hook** (Netlify) is a private URL that triggers a deployment when called.
- NEVER commit the hook URL in the repository — store it as a **GitHub Actions secret** and reference it with `${{ secrets.NAME }}`.
- Deployment step (placed LAST in the workflow):
  ```yaml
  - name: Trigger deployment
    run: curl -X POST -d {} '${{ secrets.NETLIFY_BUILD_HOOK_URL }}'
  ```
- Because it is the last step, it runs **only when every previous check passed** → "every commit that passes all the checks results in a new deployment".
- Verify automatically-triggered deploys in the hosting provider's dashboard.

## 21. Application Health Checks (Exercise 11.12)

- Add an **application-level health endpoint** so the app's real functionality is verifiable — a green build alone is not enough:
  ```js
  app.get('/health', (req, res) => {
    res.send('ok')
  })
  ```
- On static hosting there is no running server, so expose `/health` through a **Netlify Function** (`netlify/functions/health.js`) plus a redirect in `netlify.toml` (`/health → /.netlify/functions/health`).
- Zero-downtime deployment guarantees:
  - **Render:** configure a *Health Check Path* — Render stops routing traffic to an unhealthy deploy and keeps the previous version running.
  - **Netlify:** *Atomic Deploys* — a build that fails is never promoted to production, so the previous live version keeps serving.
- Simulation: introduce a broken change, push it, and confirm the **previous version keeps running** — a broken deployment never replaces a working one.
- Always fix the deployment afterwards so the app works as intended again.

## 22. Running Checks on Pull Requests (Exercise 11.13)

- Running the pipeline only on pushes to `main` catches problems **too late** — a broken commit would already be in `main`.
- Extend the workflow trigger so checks also run on pull requests targeting `main`:
  ```yaml
  on:
    push:
      branches:
        - main
    pull_request:
      branches:
        - main
  ```
- Standard Git feature-branch workflow:
  1. `git checkout -b <branch-name>` — create a new branch
  2. commit the changes on the branch
  3. `git push origin <branch-name>`
  4. Open a **Pull Request** to merge the branch into `main`
- ⚠️ **When opening a PR, always check the "base repository" dropdown** — it must be **your own fork** (e.g. `your-username/full-stack-open-pokedex`), NOT the original upstream repository the fork came from.
- The PR's Conversation tab shows the commits and the status checks:
  - 🟡 yellow = checks are in progress
  - 🟢 green = all checks passed
- Now the full pipeline (lint, build, unit tests, e2e tests) runs *before* code reaches `main`.

## 23. Deploying Only from the Main Branch (Exercise 11.14)

- **Problem:** after adding the `pull_request` trigger, ALL steps — including `Trigger deployment` — run for pull requests too. We must NOT deploy from arbitrary branches!
- **Solution:** add a condition to the deployment step using the GitHub context:
  ```yaml
  - name: Trigger deployment
    if: ${{ github.event_name == 'push' }}
    run: curl ...
  ```
- `github.event_name` tells which event triggered the workflow.
- **Paradoxical fact:** when a pull request is *merged*, the event name is `push` — the same event as a normal push! So the condition naturally works:
  - Pushing to a **PR branch** → `event_name` is `pull_request` → deployment step is **skipped**
  - Pushing/merging **to main** → `event_name` is `push` → deployment **runs**
- Expected behavior to verify:
  1. Push more code to the PR branch → all checks green, but the deploy step is **skipped**
  2. Merge the PR into `main` → full pipeline runs → **deployment happens** automatically
- This pattern — "CI on everything, CD only from main" — is the industry-standard release strategy. 🎯

## Summary

Exercises 11.2–11.14 take the project from a local setup to a **fully automated CI/CD pipeline**:

1. **11.2** — Run the project locally in dev & production modes.
2. **11.3–11.4** — First GitHub Actions workflow; understand workflow anatomy and the empty runner environment.
3. **11.5–11.6** — Add a lint step and fix the lint errors (node env, eslint-disable, unused imports, style rules).
4. **11.7–11.8** — Add build & test steps; fix the real "Next link" bug the tests exposed.
5. **11.9** — Add end-to-end tests with Playwright (unit tests alone are not enough).
6. **11.10–11.11** — Deploy automatically to Netlify when all checks pass (deploy hook + secrets).
7. **11.12** — Add a health check so a broken version never replaces a working one (Render health-check path / Netlify atomic deploys).
8. **11.13–11.14** — Run the checks on pull requests and **deploy only when code reaches `main`** (`if: ${{ github.event_name == 'push' }}`).

The result is a pipeline that: installs → lints → builds → runs unit tests → runs e2e tests → deploys only from `main` — and keeps the app healthy and available at all times. 🚀