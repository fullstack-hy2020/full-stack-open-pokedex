# Full Stack Open Course Assignments, Part 11

This repository contains a project from **Part 11** of the Full Stack Open course, based on the [full-stack-open-pokedex](https://github.com/fullstack-hy2020/full-stack-open-pokedex) project with a Webpack configuration. The project website features a collection of Pokemon, each with its own page containing detailed information. The project includes a full CI/CD deployment pipeline.

A custom **Blogs** project was implemented based on the full-stack-open-pokedex project at [https://github.com/lemon1964/Blogs.git](https://github.com/lemon1964/Blogs.git). The **blogs_backend** and **blogs_redux** projects from Part 7 of the Full Stack Open course were used as the backend and frontend templates. Both projects were placed in a shared repository under `client` and `server` folders, and the configuration files and `package.json` were refactored. Otherwise, the CI/CD deployment for the **Blogs** project is identical to that of the full-stack-open-pokedex project.

### Project Overview and Steps

**full-stack-open-pokedex**:
- Created a production build of the project.
- Set up a workflow in the `hello.yml` file that displays a "Hello World!" message to the user.
- The main workflows in GitHub Actions are defined in the `pipeline.yml` file, described below.
- Implemented the **Lint** workflow.
- Implemented the **Build** workflow.
- Fixed jest tests and wrote end-to-end tests with Playwright.
- Created the **Test** workflow.
- Created the **Run Playwright Tests** workflow.
- Deployed the app to Render.
- Implemented auto-deployment using Render's deploy hook.
- Set up a health check at the `/health` endpoint.
- Created a new `develop` branch and opened a pull request to the `main` branch.
- Added version control automation with the **Bump version and push tag** feature.
- Configured commit messages with `#skip` to exclude deployments and mark tagged releases.
- Protected the `main` branch, requiring approval for all pull requests and passing all status checks before merging.
- Set up notifications to Discord for successful deployments and error reports in case of build failures.
- Added a **schedule.yml** file to schedule a monthly health check of the deployed app by pinging `/health`.

### How to Use

1. **Clone the repository**:
   ```sh
   git clone https://github.com/lemon1964/full-stack-open-pokedex.git
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the project locally**:
   ```sh
   npm run dev
   ```
   Make sure it works at [http://localhost:8080/](http://localhost:8080/).

4. **Full Check**:
   To fully check the project, you need to:
   - Create a new GitHub repository.
   - Configure it according to the `.yml` files provided in the project.
   - Deploy the project to Render.

5. **Full-stack-open-pokedex on Render**:
   You can check the deployed **Pokedex** project at [https://full-stack-open-pokedex-op08.onrender.com/](https://full-stack-open-pokedex-op08.onrender.com/).

6. **Blogs on Render**:
   You can check the deployed **Blogs** project at [https://blogs-jaml.onrender.com/](https://blogs-jaml.onrender.com/).  
   You can log in using the following credentials:  
   **Username**: `admin`  
   **Password**: `admin`

---

If you have any questions or need additional clarification, feel free to contact us!

