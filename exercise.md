# Exercise 1

## Linting, Testing, and Building in Python

### Linting
In Python, we have many linting tools. Pylint is very known one. It checks Python code for errors, helps to follow coding standards, and finds bad code. Another tool i found is flake8.

### Testing
Python has different frameworks for testing. Unittest is in standard library of Python. Another one many people use is pytest, its simple to write and understand. Pytest also can run unittest tests and you can add more features with plugins.

### Building
Python apps dont need building like other languages that need to be compiled. We use pip to install packages and virtualenv to make separate Python environments. Setuptools is used for making Python projects ready to share.

## Alternatives for CI Setup
Besides Jenkins and GitHub Actions, I found these CI/CD tools for Python projects.

### GitLab CI
It is part of GitLab platform, and has strong CI/CD features. Good choice if your code is already on GitLab.

### Travis CI
Many open-source projects use Travis CI. And it works good with GitHub.

### CircleCI
CircleCI is flexible and not hard to set up. It supports Docker and can be set for many different workflows.

## Choosing between self-hosted and cloud-based CI/CD
These are the main points to think about when choosing between self-hosted and cloud-based platforms.

### Resource and Infrastructure
For self-hosting, you need own infrastructure and people to take care of it, which can be hard for small teams. Cloud solutions give easy scaling and less worrying about managing infrastructure.

### Security
If your project needs strict security, then self-hosted can give you more control. However cloud providers are also considered very secure.

### Cost
Cloud services have different plans, some even free for small teams. Might be cheaper than running own servers.

Overall teams need to look at what skills they have, resources, security needs, and budget. For small startup team, cloud solutions like GitHub Actions or GitLab CI might be better.