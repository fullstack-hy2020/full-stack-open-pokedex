# Exercise 1
## CI setting for a python application

### Lint tools

1. [**Pylint**](https://pypi.org/project/pylint/) : Pylint is a static code analyser for Python 2 or 3. Pylint analyses your code without actually running it. It checks for errors, enforces a coding standard, looks for code smells, and can make suggestions about how the code could be refactored.
2. [**Flake8**](https://flake8.pycqa.org/en/latest/index.html) : Flake8 uses ranges for mccabe, pyflakes, and pycodestyle because each of those projects tend to add new checks in minor releases.


### Test tools

1. [**Pytest**](https://docs.pytest.org/en/stable/) : The pytest framework makes it easy to write small, readable tests, and can scale to support complex functional testing for applications and libraries.
2. [**unittest**](https://docs.python.org/3/library/unittest.html) : The unittest unit testing framework was originally inspired by JUnit and has a similar flavor as major unit testing frameworks in other languages. It supports test automation, sharing of setup and shutdown code for tests, aggregation of tests into collections, and independence of the tests from the reporting framework.


### Build tools

1. [**Setuptools**](https://setuptools.pypa.io/en/latest/index.html) : Setuptools is a fully-featured, actively-maintained, and stable library designed to facilitate packaging Python projects.
2. [**PyBuilder**](https://pybuilder.io/) : PyBuilder is a software build automation tool written in pure Python mainly targeting Python ecosystem. It is based on the concept of dependency-based programming but also comes along with powerful plugin mechanism that allows the construction of build life-cycles similar to those known from other famous build tools like Apache Maven and Gradle.

## CI tools
1. [**Buddy**](https://buddy.works/) : Buddy (also known as Buddy.Works) is a web-based and self-hosted continuous integration and delivery software for Git developers that can be used to build, test, and deploy web sites and applications with code from GitHub, Bitbucket, and GitLab. It employs Docker containers with pre-installed languages and frameworks for builds, alongside DevOps, monitoring and notification actions.
2. [**TeamCity**](https://www.jetbrains.com/teamcity/) : TeamCity enables you to create a highly flexible and scalable CI/CD pipeline. Get comprehensive support for all of your infrastructure requirements, allowing you to run builds on-premises, in the cloud, within Docker containers, or on bare metal.


## Self-Hosted vs. Cloud-Based CI
Deciding between a self-hosted and a cloud-based CI environment depends on several factors:

**Team Size and Expertise**: A small team might prefer cloud-based CI due to ease of setup and maintenance. Larger teams with dedicated DevOps personnel might benefit from the customization of self-hosted solutions.
**Cost**: Cloud-based CI services often have subscription fees, but they save on infrastructure costs and maintenance. Self-hosted CI might reduce recurring costs but involves upfront investments in hardware and ongoing maintenance.
**Scalability**: Cloud-based CI can quickly scale to meet the needs of growing projects without the need for additional hardware.
