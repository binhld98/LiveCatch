# LiveCatch

LiveCatch records live streams: users follow a host or channel by URL, the app records each broadcast automatically when it goes live, and users watch or download the recordings later.

This repository holds only the user app, a React + TypeScript SPA built with Vite. The back end, admin console, and landing pages are out of scope.

## Task Tracking

Work is tracked on Trello, with one board per sprint.

| Sprint | Board |
| --- | --- |
| `S0` | [Phase 0 - Concept/Requirements](https://trello.com/b/AWtmVjbe/phase-0-concept-requirements) |
| `S1` | [Sprint 1 - App Shell](https://trello.com/b/4mU9eMMY/sprint-1-app-shell) |
| `S2` | [Sprint 2 - Channels](https://trello.com/b/lNKyrJkq/sprint-2-channels) |

Rules for every board:

- **Lists:** Backlog → Queued → In Progress → In Review → Closed.
- **Titles:** `<sprint>-<n>: <short description>`, such as `S0-4: Write product vision`. Number cards in order on each board. Never reuse or renumber one.
- **Labels:** at least one per card, naming its [commit type](#commit-messages), such as `feat` or `docs`.
- **Access:** agents can read, edit and move cards, including comments and labels. Never create or delete a card.

## Code Structure

Code in `src/` is grouped by feature. Create a folder when you have a file to put in it.

| Folder | Holds |
| --- | --- |
| `app/` | Routes, layouts, and the app shell |
| `features/<feature>/` | Pages for an area of the app, such as Channels |
| `features/<feature>/api/` | API types and hooks that fetch or change data |
| `features/<feature>/components/` | Components used only by this feature |
| `features/<feature>/hooks/` | Other hooks used only by this feature |
| `features/<feature>/lib/` | Logic without React, and its unit tests |
| `fake-api/` | The fake back end, deleted once the real API exists |
| `components/`, `hooks/`, `lib/` | Code that isn't specific to one feature |

A feature can import from another feature's `api/` but from nothing else in it.

## Git Workflow

`main` is the only long-lived branch and must stay releasable.

1. Do each piece of work in its own `<type>/<slug>` branch from `main`, such as `feat/add-channel`.
2. When the user approves the work, commit it, push the branch, and open a PR into `main`.
3. Never merge the PR yourself. The user squash merges it and deletes the remote branch on GitHub.
4. When the user confirms the PR is done, switch to `main`, pull it, and delete the local branch.

Releases happen only when the user asks:

- **Release:** tag `main` with a version, such as `v0.3.0`.
- **Hotfix an old release:** fix on `main`, cherry-pick the fix into a release branch cut from the release's tag, such as `release/v0.3.x`, and tag the next patch, such as `v0.3.1`.

## Commit Messages

```text
<type>[optional scope]: <short description>
```

- Keep the subject to one lowercase line, ideally 50 characters or fewer.
- Add no body or footer. The one exception is a `Co-Authored-By:` trailer, separated from the subject by a blank line.

| Type | Use for |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation updates |
| `chore` | Non-production maintenance, such as tooling or dependency updates |
| `refactor` | Code changes that neither add a feature nor fix a bug |
| `test` | Adding or updating tests |
| `style` | Formatting or whitespace changes with no behavior impact |
| `ci` | Continuous integration changes |
| `build` | Build system or external dependency changes |
| `perf` | Performance improvement |
| `arch` | Big architecture decision |
| `revert` | Reverting a previous commit |
