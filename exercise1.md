# Exercise 1 – CI Setup Example (Python)

Imagine a team of six developers building a web application using **Python**. Since the project is close to release, setting up a **Continuous Integration (CI)** pipeline is important to ensure code quality, catch bugs early, and produce reliable builds.

A typical CI pipeline includes **linting, testing, and building**. In the Python ecosystem, several tools are commonly used for these tasks. For linting, tools like **Flake8** or **Pylint** help detect style issues, unused variables, and potential bugs. These tools enforce consistent coding standards across the team. For testing, **Pytest** is one of the most widely used frameworks. It allows developers to write simple but powerful unit and integration tests, and it integrates well with CI systems. For building and packaging the application, tools such as **Poetry** or **setuptools** can be used. They manage dependencies and create distributable packages of the application. In a CI pipeline, these tools would typically run automatically whenever code is pushed to the repository.

Besides Jenkins and GitHub Actions, there are several other CI platforms available. Examples include **GitLab CI/CD**, **CircleCI**, **Travis CI**, **Bitbucket Pipelines**, and **Azure DevOps Pipelines**. These platforms provide similar features such as automated workflows, containerized builds, and integration with version control systems.

Whether the CI system should be **self-hosted** or **cloud-based** depends on several factors. A cloud-based CI system is usually easier to set up and maintain, making it a good choice for small teams that want to move quickly. It also scales automatically when more build resources are needed. On the other hand, a self-hosted CI solution might be preferred if the company has strict security requirements, sensitive code, or existing internal infrastructure.

To make this decision, the team would need information about the project’s **security requirements, budget, infrastructure availability, scalability needs, and maintenance capacity**.
