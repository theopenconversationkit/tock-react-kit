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
    
# GITHUB ACTION FOR PUBLISHING

## Build, tag and publish new version

Warning: "Require signed commits" on master branch must be unchecked (https://github.com/theopenconversationkit/tock-react-kit/settings/branch_protection_rules/11667069)

    curl \
      -H "Accept: application/vnd.github.everest-preview+json" \
      -H "Authorization: token xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
      --request POST \
      --data '{"event_type": "publish", "client_payload": {"version": "X.Y.Z"} }'
      https://api.github.com/repos/theopenconversationkit/tock-react-kit/dispatches

You can also build a beta version using "prerelease" keyword

    curl \
      -H "Accept: application/vnd.github.everest-preview+json" \
      -H "Authorization: token xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
      --request POST \
      --data '{"event_type": "publish", "client_payload": {"version": "prerelease"} }'
      https://api.github.com/repos/theopenconversationkit/tock-react-kit/dispatches
      
