# Rust Project #
***Linting:***  Rust comes with the linting tool clippy. Community is contributing new lints.

***Testing:*** Rust has some support for testing: using features that include the test attribute, a few macros, and the should_panic attribute. While not part of the standard library, the spectral crate also provides a fluent testing API for Rust. Rust code is being very expressive all the time, which is good for maintenance.

***Building:*** Cargo is Rust's build system and package manager. It creates an executable after compilation.
The compiled nature of Rust programs means that they are normally best ran in containers or alternatively a VPS

## Alternatives for CI: ##
Circle Ci is a newcomer and modern Jenkins possible replacment.
Using hosting services, you could go with Gitlab, GitHub, Bitbucket, Azure DevOps, AWS, 
A good option could be to use one of these CI tool and a separate CD tool like Sprinkler, Vercel, Octopus Deploy, Azure or AWS.

## Self-hosted vs Cloud-based: ##
We need to know the size of the project and the way the team is working on it, as well as the language characteristics.

Rust is small, fast and secure: Most of the technologies we have in the cloud are lacking at least one of those characteristics. On the other hand, Rust build times are long, so it may not be money-wise to select a cloud-based solution. However, for a small project, that is what we are going with.

Our team is made of 6 developers working remotely part of the time. Each of those would work on their own branch(es).
We would set a main branch with all the merged code, tested and validated. That branch would be the source of trust for preview in Vercel. After the team and clients check and validate the preview, the branch would be pushed to a release branch.