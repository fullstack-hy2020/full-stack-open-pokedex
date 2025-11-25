I chose C++ as the language. C++, aswell as basic C, needs to be compiled into executable binary before it can be run. GCC by GNU and clang are two popular compilers, but there are others which are better optimized for specific hardware.

For the sake of linting, there are lot of different tools, so it is more about having the same configurations and project/company specific standards in configurations. Vscode has many plugins such as eslint, and clang has a clang-tidy linter whic has gone popular.

Like other popular languages, C++ has many third-party test frameworks like boost, Google test.

Build tools makes compiling automated. Make is a popular tool for compiling the right files as desired. Make build paths are system specific, but that problem can be solved by using CMake which generates a system specific Makefile (instructions for make) from a text file.

Some alternatives to Github Actions and Jenkins include, Gitlab CI/CD and Azure pipelines.

As of what I understand, the choice between a hosted server or a cloud service as a pipeline depends on the project and team size. Team of 6 persons is still fairly compact, so it all comes down to how resource hungry the application itself is, or does it require some conditions specifically produced by custom hardware. The team size also suggests low budget, which initially favours the cloud services
