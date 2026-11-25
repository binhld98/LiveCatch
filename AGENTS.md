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

Comment only what the code can't say: a reason, a constraint, a rejected alternative, code that looks removable but isn't, or library or browser behavior a reader wouldn't expect. When code needs a comment to say what it does, rename or rewrite it instead.

- **Doc comments:** write `/** */` above an export, prop or API type field only when a caller needs more than its name and type, such as what `null` means. Editors show it on hover. Leave out JSDoc types (`{string}`) and `@param` or `@returns` lines that restate the signature. Use `//` (`{/* */}` in JSX) for implementation notes.
- **Numbers:** leave sizes and limits to the code, and say why a number is what it is or how it adds up. A comment that repeats a Tailwind class's number goes stale when the class changes.
- **Plans:** describe what the code does now. For unfinished work, say what's missing and name the card that adds it, such as `Does nothing yet: S2-3 adds start and stop listening.`, or a specific event when there's no card. Write no `TODO`, `FIXME` or `XXX`.
- **Outside facts:** name the source precisely enough to recheck it: the library and component (`Base UI's Close`), the card, the doc and its repo (`livecatch.md in LiveCatchHome`), or the URL of copied code or a spec.
- **Suppressions:** fix the error instead. If you can't, cover one line, name the rule and give a reason: `// @ts-expect-error -- <reason>` or `// oxlint-disable-next-line <rule> -- <reason>`. Never suppress `react/rules-of-hooks` or `react/exhaustive-deps`: change the code.
- **Generated code:** leave the comments in `src/components/ui` as shadcn generated them, and put notes in the app's own wrapper.

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
