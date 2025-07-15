For this exercise I will imagine that we are building a Python web application. A friend group of four people are working on it and we are
getting ready to release it soon. 

In Python projects, a CI setup usually has three main steps. First is linting. This checks the style of the code. One tool for this is
flake8. It looks for mistakes in the code and makes sure it follows common style rules. I used lint during the first five parts of Full
Stack MOOC open course. Another tool is pylint which is also popular and checks for more things. 

Second is testing. This step runs the tests to make sure the code works. A good tool for this is pytest. It is simple to use and works
well for both small and large projects. I have used pytest in the past for one of my projects and it was easy to setup.

Third is building. This step prepares the app for use. In Python this can mean creating a package using setuptools, or putting the
app into a Docker image to make it easier to run anywhere. Besides Jenkins and GitHub Actions, there are other CI tools like GitLab CI, Travis CI, and CircleCI. These are used by many teams
and work with different types of projects. 

For this project a cloud based CI system is probably the best choice (Github Actions). It is easier to set up and takes less time to
manage. A self hosted setup could be better if we needed special tools or extra control. To decide this we would need to know
things like how much computer power we need and how important security is for our app
