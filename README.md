# Operation CHAN

To get started after cloning, create new branch by running `git checkout -b NEW-BRANCH-NAME main` & `git pull origin main`

Rebase is shit, and we refuse to use it

After making changes, stage the changes by running `git add .` or `git add SPECIFIC-FILE`, and then commit and push: `git commit -m"MESSAGE"` and then `git push`

## :rocket: Branching Strategy

## `main`

- Must **always** be production ready
- Can **not** be deleted
- Merges to main must pass peer review 
- All changes to main must be trough a merge from a branch (due to the above requirement)

## Branching strategy

- For each sprint there will be created a sprint branch 
- This is the branch that will be used for merging during this sprint
- At the end of each sprint, the sprint branch will be merged into `main`

## Branch naming convention

- Branches should include task id in the branch name, exampel: `CHANV2-1/initial-start`
- Limited lifetime:
  - **Must** be deleted once the work contained within the branch is done, and the branch is merged to `main`
- Rewriting git history is allowed (rebasing and `push --force`) as long as commits in the rebase exists *only* in the branch


## :raised_hand: Project report

Remember to update [project report](https://www.overleaf.com/project/63e0febc9b65f665e3588064)
