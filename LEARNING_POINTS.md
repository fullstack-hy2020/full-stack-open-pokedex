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

## Summary

Exercise 11.2 establishes the foundation for the CI/CD module by getting the project running locally in both development and production modes. Understanding each component — roles, configurations, and outputs — is essential before automating them in a CI/CD pipeline. The intentionally broken test and linting errors provide realistic scenarios for pipeline troubleshooting in upcoming exercises.