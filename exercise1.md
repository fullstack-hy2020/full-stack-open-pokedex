# Warming up

Common steps in CI setup would be the following: 
- Linting:  Common tools being used for linting would be eslint and prettier, these can be configured to any code structure or style that you desire. There are also some tools that have this forced code structure tool included, such as using Co-Pilot or languages like GO.

- Testing: For Javascript / typescript testing, a commonly used too is Jest, which is built on top of the Jasmine testing framework. Other possibilites are Mocha. For GO, there are testing libraries included in the stlib package.

- Building: Webpack is a module bulder that has been a staple of th front end ecosystem, but does come with some drawbacks like slow build times and has a steep learnign curve. Vite is a newer system built to be a faster and simpler alternative to webpack. 

Some tools outside of the most widely used CI tools are Bitbucket Pipelines, from Atlassian (who are also the suppliers of JIRA, which could also be a handy tool for ticket integration in this CI/CD pipeline), AWS CodePipeline, and Microsoft's Azure Pipelines. It's possible that all of these companies offer you everything you may need with regard to tooling, so the overall cost may be the largest factor in our descision here. 

For a small project, using the tools above, we believe it would be better in hosted in a cloud based environment, as it will tackle any scaling needs without any hardware requirements from us, hopefully bypassing any possible downtime should the application gain popularity. 