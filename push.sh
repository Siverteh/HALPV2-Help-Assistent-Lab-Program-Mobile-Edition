#!/bin/bash

# Get the current branch name
current_branch=$(git symbolic-ref --short HEAD)

# Check if a branch is detected
if [ -z "$current_branch" ]; then
  echo "Error: No branch detected. Make sure you are in a Git repository."
  exit 1
fi

# Add all changes to the staging area
git add *

# Commit the changes with a message
read -p "Enter commit message: " commit_message
git commit -m "$current_branch $commit_message"

# Push the changes to the remote repository
git push origin "$current_branch"
