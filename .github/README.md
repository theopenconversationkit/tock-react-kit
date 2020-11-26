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
      
