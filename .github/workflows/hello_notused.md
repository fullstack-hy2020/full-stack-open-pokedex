name: Hello World!

on:
  push:
    branches:
      - main

jobs:
  hello_world_job:
    runs-on: ubuntu-24.04
    steps:
      - name: Say hello
        run: |
          echo "Hello World!"

      - name: Print date
        run: |
          date
      
      - name: List directories
        run: |
          pwd
          
      - name: List files in long format
        run: |
          ls -l
