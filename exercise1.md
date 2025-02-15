### 11.1 warming up
Our imaginary application is being built with Python by team of 6 people. Specific tools of linting, testing and building could  
in this case be Pylint for the linter. There are atleast two ways to use pylint. One, install it with pip and run the pylint against your scripts or you can install a vscode extension if you are using vscode. The vscode extension will automatically
complain about the errors and your possible deviations from the coding standards. But because we are setting the tools for
CI pipeline we need both of them. The pip installation for the linting to be checked in the pipeline and the vscode extension to notify the developers about the errors automatically. 

For the testing part, atleast for the unit tests, I would choose the default unit testing library that comes with the python
installation, the unittest library. There are other popular libraries, like pytest, but in that case you are adding additional
dependencies. Whether using additional dependencies matters, depends on the project. Pytest would also get the job done, if
the team would prefer using it. Because the python is interpreted language, there would be no need for a separate build tools.  

CI could be setup besides using Jenkins and Github actions, with Gitlab CI, Azure pipelines and Circle CI. If you are not planning to do anything special, it might be more straightforward to use cloud based solutions. If you need something special
it might be better to handle in self-hosted setups like Jenkins. The pricing might also be friendlier in self hosted setups if extensive tests are run in the pipeline, as those will then cost only the operation cost of the server.