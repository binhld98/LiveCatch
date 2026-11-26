# LiveCatch

LiveCatch records live broadcasts: users add a channel by URL and turn listening on, the app records each of its broadcasts automatically, and users watch or download the recordings later.

This repository holds only the user app, a React + TypeScript SPA built with Vite. The back end, admin console, and landing pages are out of scope.

## Task Tracking

Work is tracked on Trello, with one board and one design canvas per sprint.

| Sprint | Board | Canvas |
| --- | --- | --- |
| `S0` | [Phase 0 - Concept/Requirements](https://trello.com/b/AWtmVjbe/phase-0-concept-requirements) | N/A |
| `S1` | [Sprint 1 - App Shell](https://trello.com/b/4mU9eMMY/sprint-1-app-shell) | [LiveCatch Shell Layout](https://claude.ai/artifact/JaDArZNkSaYorXak31SKQb) |
| `S2` | [Sprint 2 - Channels](https://trello.com/b/lNKyrJkq/sprint-2-channels) | [LiveCatch Channels artboards](https://claude.ai/artifact/Gqe9siuuEATWK1cPq7xhmj) |

- **Lists:** Backlog → Queued → In Progress → In Review → Closed.
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

## Code Comments

Comment only what the code can't say, such as a reason, a constraint, or surprising library or browser behavior. When code needs a comment to say what it does, rename or rewrite it instead.

- **Concise:** keep comments brief and focused on intent, usually one short sentence. Say each reason once, where the code decides it.
- **Doc comments:** use `/** */` for what a caller needs beyond the name and type, and `//` for implementation notes. Skip JSDoc types and `@param` or `@returns` lines that restate the signature.
- **Plans:** describe what the code does now. For unfinished work, name the card that adds it, such as `Does nothing yet: S2-3 adds start and stop listening.` Write no `TODO`, `FIXME` or `XXX`.
- **Suppressions:** cover one line, name the rule and give a reason. Never suppress `react/rules-of-hooks` or `react/exhaustive-deps`.
- **Generated code:** leave the comments in `src/components/ui` as shadcn generated them.

## Git Workflow

`main` is the only long-lived branch and must stay releasable.

1. Do each card in its own `<type>/<slug>` branch from `main`, such as `feat/add-channel`. Small side changes can ride along as their own commits.
2. When the work is done, ask the user to review it before commiting. Repeat for each round of revisions.
3. When the user approves, commit anything left, push the branch and open a PR into `main`.
4. Never merge the PR yourself. The user squash merges it and deletes the remote branch on GitHub.
5. When the user confirms the PR is done, switch to `main`, pull it, and delete the local branch.

Commit messages:

```text
<type>[(<scope>)]: <short description>
```

- Keep the subject to one lowercase line, ideally 50 characters or fewer.
- Branch and commit types come from the same list: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style` and `test`.
- Scope is the feature or `src/` folder changed, such as `channels` or `fake-api`. Omit it if several.
- Add no body or footer except a `Co-Authored-By:` trailer, separated from the subject by a blank line.

Releases happen only when the user asks:

- **Release:** tag `main` with a version, such as `v0.3.0`.
- **Hotfix an old release:** fix on `main`, cherry-pick the fix into a release branch cut from the release's tag, such as `release/v0.3.x`, and tag the next patch, such as `v0.3.1`.
