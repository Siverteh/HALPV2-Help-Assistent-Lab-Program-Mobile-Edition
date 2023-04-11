#!/bin/bash

# Read the input parameters
echo "Enter the branch name (e.g. ticket_number/new_feature): "
read -r branch_name
echo "Enter the sprint number (e.g. 1): "
read -r sprint_number

# Create and checkout the new branch
git pull -p
git checkout Sprint_$sprint_number
git checkout -b CHANV2-$branch_name

# Set the upstream branch to the sprint branch
git branch --set-upstream-to Sprint_$sprint_number

# Push the new branch to the remote repository
git push -u origin CHANV2-$branch_name

echo "Branch created and pushed to the remote repository."

echo "Branch created and pushed to the remote repository."