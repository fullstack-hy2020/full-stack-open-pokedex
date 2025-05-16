name: Testing stuff

env: 
  CONDITION: ${{ contains(join(github.event.commits.*.message), '#skip') }}

on:
  push:
    branches:
      - main

jobs:
  a_test_job:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v4
      - name: github context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      - name: commits
        env:
          COMMITS: ${{ toJson(github.event.commits) }}
        run: echo "$COMMITS"
      - name: commit messages
        env:
          COMMIT_MESSAGES: ${{ toJson(github.event.commits.*.message) }}
        run: echo "$COMMIT_MESSAGES"

      # - name: contains
      #   env:
      #     CONTAINS: ${{ contains(github.event.commits.*.message, '#skip') }}
      #   run: echo "$CONTAINS"

      - name: condition
        env:
          CONDITION: ${{ env.CONDITION }}
        run: echo "$CONDITION"

      - name: test1 
        if: ${{ env.CONDITION == 'true' }}
        run: echo "found skip"
      - name: test2
        if: ${{ env.CONDITION == 'false' }}
        run: echo "did not found skip"

  another_job:
    # Can't access env variables here. It says in the course it should work.
    # if: ${{ github.env.CONDITION == 'false' }}
    if: ${{ !contains(join(github.event.commits.*.message), '#skip') }}
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v4
      - name: echo
        run: echo "another_job"