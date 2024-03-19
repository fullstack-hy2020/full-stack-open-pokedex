Assuming a development team of six people working on a back-end server written on ASP.NET in C#, the choice of CI/CD pipeline can be either:

1: A cloud-hosted solution.
This would be best set up using a cloud-hosted platform such as GitHub Actions, Travis CI, Google Cloud, or Gitlab’s CI/CD functionality. This allows for most CI/CD functionality to be run on a cloud system which is already configured to suit the needs of the development team. If no one on the team has much experience with DevOps or has not worked with CI/CD before, then the increased ease of setting up a cloud-hosted solution would allow for this to be the more sensible option.

2: A self-hosted solution.
Using a self-hosted platform such as Jenkins or Concourse CI allows for greater flexibility for the CI/CD pipeline. This would definitely be best suited for a project with a much more demanding resource requirement, such as testing a machine-learning system, where the local machine’s GPU can be customised to fit the needs. Self-hosted CI/CD could be employed for this project as long as someone on the team was able to commit to learning the intricacies of hosting such a setup, given its increased difficulty in configuration when compared to a cloud-based setup.

Either of these software options are sensible and should be left to the team themselves to decide on which approach works best for their specific requirements. If the team was any smaller, then the ease of setup of a cloud-hosted solution would make it more appealing since there would be less development resources to allocate to setting up and maintaining a self-hosted server.

It appears that Visual Studio has its own integrated linters/testing framework. Luckily, Microsoft has its own documentation on DevOps found here: https://learn.microsoft.com/en-us/dotnet/devops/github-actions-overview. Using this information, we can come up with a rough workflow of this CI/CD pipeline using the .Net CLI, which allows for integration with any choice of CI/CD software:

1: Restore the dependencies of the project using the dotnet restore command. This seems to be the equivalent of using npm install and ensures that all required packages are installed in the environment before the code is tested.

2: Lint and format the code using the dotnet format command. This enforces a specific styling to the code laid out in a custom .editorconfig file in the root directory of the project.

3: Test using the dotnet test command. This runs all tests in one of the supported testing frameworks such as MSTest (integrated testing framework) or NUnit.

4: Compile and build using the dotnet build command with the ContinuousIntegrationBuild variable set to true. This will build the project using, for example, MSBuild using the correct configuration. After this step, deployment can proceed.
