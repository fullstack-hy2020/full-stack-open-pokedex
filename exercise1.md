Team is Building application with Python. Team is using pre-commit framework, which allows to select hooks for many linters. Ruff is one choice for linting. For code spell checking
team uses typos. One more linting tool is mdformat. For testing team is using pytest framework. Team is using Poetry to develope Python packages. 

For self-hosted CI tools besides Jenkins there are bamboo, GoCD, Buildkite, TeamCity and Drone CI. For cloud-based CI tools besides GitHub Actions there are Travis CI, CircleCI, GitLab CI/CD,
Bitbucket Pipelines and Azure Pipelines. There is many more options but these are one of the most popular choices from google search.

Application that is made with python and has 6 developers to build it, would benefit more from cloud-based environment. Cloud-based solution is often better for smaller applications. 
It is just more simple to setup and is cheaper option. With this information i would think that the application is not very big and need self-hosted option. If this application
has some special usage, cloud-based environment could be limited and you have to do it with self-hosted option. But because i dont have the information that this application has special
cases, i would recommend cloud-based solution and more specifically GitHub Actions.
