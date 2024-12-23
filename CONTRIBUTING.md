# Contributing

## How to add a feature or fix a bug

1. [Create an issue](https://github.com/theopenconversationkit/tock-react-kit/issues/new)
2. Create a pull request linked to this issue
    - All commits have to be [signed](https://help.github.com/en/github/authenticating-to-github/managing-commit-signature-verification) 
    - Please squash your commits before submitting the PR
    - Recommended format for the branch : "\[ticketId]-\[ticket title]"
    - Recommended format for the commit message:
        - *"resolves #\[ticketId] \[ticket title]" adds a feature*
        - *"fixes #\[ticketId] \[ticket title]" fixes a bug*       
3. Before merging, the PR should be reviewed by at least two of these developers:
    * [@tiska](https://github.com/Tiska)
    * [@elebescond](https://github.com/elebescond)
    * [@phurytw](https://github.com/phurytw)
    * [@vsct-jburet](https://github.com/vsct-jburet)
    * [@MaximeLeFrancois](https://github.com/MaximeLeFrancois)
    * [@delphes99](https://github.com/delphes99)
    * [@Fabilin](https://github.com/Fabilin)
    
# GITHUB ACTION FOR PUBLISHING

## Build, tag and publish new version

1. Ensure a milestone exists for the new version (https://github.com/theopenconversationkit/tock-react-kit/milestones)
   and that all relevant issues are assigned to it
2. Run the [manual release workflow](https://github.com/theopenconversationkit/tock-react-kit/actions/workflows/manual.yaml)
   with the new version number
3. Create a [GitHub release](https://github.com/theopenconversationkit/tock-react-kit/releases) using the tag created by the workflow

### Versioning

Our versioning is based on [Semantic Versioning](https://semver.org), with some tweaks to tie the version to our release schedule:
- The major and minor components are repurposed to denote respectively the release year and month of the current major version.
  We release two major versions per year, one in March and one in September.
- The patch version component keeps the same meaning as in semver. We release patch versions at any time.
- The additional labels for pre-release and build metadata keep the same meaning as in semver

For example:
- 23.3.0 is the major version released in March 2023. The next major version is 23.9.0, released in September of the same year.
- 23.9.2 is the second patch version for the 23.9 major, and may be released any time between September 2023 and March 2024.
- 24.9.0-beta.1 is the first beta for the upcoming 24.9.0 major version.
