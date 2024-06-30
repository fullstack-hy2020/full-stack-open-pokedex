#### Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked?

The programming language I chose was Python.
As for the specific tools for taking care of linting, testing and building in a CI setup, regarding linting the most commonly used tool is pylint, this tool allows developers to make sure that the code that is written for a python project is clean and organized and meets certain standards, as for ensuring a more consistent coding style and in general better code quality; as for testing, one of the most commonly used tool is Pytest which supports unit testing, functional testing and API tests along with the fact that it has a large community support. Finally as for building tools PyBuilder is has a focus on simplicity and extensibility, which allows developers to maintain organized, effective and repeatable project builds.

#### What alternatives are there to set up the CI besides Jenkins and GitHub Actions?

Among alternatives to Jenkins and Github Actions, AWSCodePipeline is a CI service that is used to model, visualize, and automate the steps required to release the software application. On the other hand, GitLab is also a common alternative, which is cloud based and highly scalable and offers an excellent UI, making it easy to implement CI/CD to the project.

#### Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

The setup mainly depends on the size of the project. In this case since there are 6 developers working on the project, the setup would be better in a cloud-based environment, specially because the project is between a small and medium sized project.
