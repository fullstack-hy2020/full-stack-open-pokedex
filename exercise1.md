# CI/CD with Python

### Q1.
Maintaining code quality by linting is important. In Python, quality can be maintained using various tools that analyze code for programming errors and monitor code quality. I personally use the pylint tool, but other tools include, for example, flake8 and mypy. 

Python also offers several frameworks for testing: unittest is a built-in Python module that provides a framework for writing and running tests, pytest is a third-party framework that expands upon unittest-module and coverage is a tool for measuring how much of your code is being exercised by your tests, helping to identify untested parts of your code. There are also several other testing frameworks available such as nose2, robot framwork, doctest and testify

Part of the build process might involve setting up a virtual environment and installing dependencies required by the project. Tools like pip and poetry handle these aspects. setuptools is a widely-used library in Python that facilitates packaging Python projects. Also, a Python wheel file is a common way to package and distribute the files required to run a Python app.

### Q2.
Alternatives for Jenkins and GitHub Actions I was able to find include: TeamCity, Spacelift, GitLab CI, CircleCI, Travis CI, CodeShip, AWS CodePipeline, Azure DevOps and many more.

### Q3.
For a team of 6 working on an application, a cloud deployment is generally more suitable due to its scalability, ease of management, and cost-effectiveness. Cloud platforms minimize the operational burden on a small team likely developing rather small app. Cloud platform allows them to focus on development rather than infrastructure management. This is advantageous for small to medium-sized applications. However, self-hosted environments may be preferable when there are strict security requirements, data sovereignty concerns or the need for complete control over the infrastructure. 
