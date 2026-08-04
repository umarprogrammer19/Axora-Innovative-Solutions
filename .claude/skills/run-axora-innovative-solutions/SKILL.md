---
name: run-axora-innovative-solutions
description: Build, run, and drive the axora-innovative-solutions Next.js app. Use when asked to start the app, run its dev server, build it, lint it, take a screenshot of its UI, or click through/interact with the running page.
---

This is a Next.js 16 (App Router, Turbopack) app — currently the
unmodified `create-next-app` starter (one page, no routes, no forms).
For agent/automated use, drive the running dev server with the
headless-Chromium REPL at
`.claude/skills/run-axora-innovative-solutions/driver.mjs`. It uses
`playwright-core` against the **system** Chromium already installed
on this box (`/usr/bin/chromium`) — no browser download required.

All paths below are relative to the repo root (`axora-innovative-solutions/`).

## Prerequisites

Nothing to install at the OS level — this box already has
`/usr/bin/chromium` and `/usr/bin/google-chrome-stable`. The driver
runs headless, so no `xvfb` is needed either.

```bash
npm install            # installs playwright-core (devDependency) + app deps
```

## Build

```bash
npm run build   # next build — compiles, type-checks, prerenders static pages
npm run lint     # eslint
```

## Run (agent path)

Start the dev server, then drive it with the REPL driver.

```bash
npm run dev &
timeout 30 bash -c 'until curl -sf http://localhost:3001 >/dev/null; do sleep 1; done'
```

**Port note:** Next 16 keeps one persistent dev server per project
directory. If one is already running for this repo, `npm run dev`
prints `Another next dev server is already running... at
http://localhost:3001` and exits — that's not a failure, just use that
port. Only start a fresh one if nothing is running yet. Don't assume
port 3000: on a shared machine another project may already hold it,
and this project's own persistent server may be sitting on 3001. The
driver defaults to `BASE_URL=http://localhost:3001` — override with
`BASE_URL=http://localhost:3000 node ...` if your server came up on a
different port. Check `npm run dev`'s own output for the actual port
before assuming.

Wrap the driver in tmux for interactive use — poll for a marker between
`send-keys` and `capture-pane` instead of a fixed sleep:

```bash
tmux new-session -d -s app -x 200 -y 50
tmux send-keys -t app 'node .claude/skills/run-axora-innovative-solutions/driver.mjs' Enter
timeout 20 bash -c 'until tmux capture-pane -t app -p | grep -q "driver> $"; do sleep 0.3; done'

tmux send-keys -t app 'launch' Enter
timeout 20 bash -c 'until tmux capture-pane -t app -p | grep -q "launched\."; do sleep 0.3; done'

tmux send-keys -t app 'nav' Enter
timeout 15 bash -c 'until tmux capture-pane -t app -p | grep -q "status 200"; do sleep 0.3; done'

tmux send-keys -t app 'ss 01-landing' Enter
timeout 10 bash -c 'until tmux capture-pane -t app -p | grep -q "screenshot:"; do sleep 0.3; done'

tmux send-keys -t app 'quit' Enter
tmux kill-session -t app
```

Screenshots land in `/tmp/shots/` (override with `SCREENSHOT_DIR`).

### Commands

| command | what it does |
|---|---|
| `launch` | launch system Chromium headless |
| `nav [path]` | go to `BASE_URL` + path (default `/`), waits for network idle |
| `ss [name]` | screenshot (full page) → `/tmp/shots/<name>.png` |
| `wait-for <css-sel>` | wait for element, 10s timeout |
| `click <css-sel>` | click element |
| `click-text <text>` | click first element containing text |
| `click-popup <text>` | click a link that opens a new tab (`target="_blank"`) and switch the active page to that popup — see Gotchas |
| `fill <css-sel> <value>` | fill a form input |
| `type <text>` / `press <key>` | keyboard input |
| `eval <js>` | evaluate JS in the page, print JSON |
| `text [css-sel]` | print `innerText` (whole body if no selector) |
| `title` | print page title |
| `console [--errors]` | print captured console/page-error log |
| `quit` | close browser, exit |

## Run (human path)

```bash
npm run dev   # opens the persistent dev server; Ctrl-C detaches (server may keep running — see Port note above)
```
Open `http://localhost:3001` (or whatever port it printed) in a real
browser.

## Test

No test suite is configured yet (`npm run lint` is the only check
besides `npm run build`'s type-check pass).

## Gotchas

- **The only interactive elements are `target="_blank"` links**
  ("Deploy Now", "Documentation" on the landing page). Clicking them
  does **not** navigate the current page — it opens a new tab.
  `page.click()`/`click-text` will fire the click but you won't see
  any change on `page` itself. Use `click-popup <text>` instead: it
  waits for the new tab via `context.waitForEvent('page')` and
  reassigns the driver's active `page` to it, so subsequent `ss`/`text`
  target the popup's content (verified against the real
  `nextjs.org/docs` page).
- **Port is not guaranteed to be 3000.** Next 16's persistent
  dev-server-per-directory feature means a stray `npm run dev` in a
  fresh shell can silently attach to an already-running instance on a
  different port instead of starting a new one — always read its
  stdout for the actual `Local: http://localhost:PORT` line rather
  than assuming.
- **`grep` may be shadowed.** In some shells on this box, `grep` is
  aliased to a Claude Code wrapper that fails on certain flag
  combinations (e.g. `-i`) with `Error: claude native binary not
  installed`. If you hit that, use `command grep` explicitly.

## Troubleshooting

- **`page.waitForSelector` times out on `nav`**: you probably navigated
  to the wrong port (see Port note) and landed on an unrelated app
  entirely. Check `page title` / `text` output against what you expect
  before assuming the app is broken.
- **`no system Chromium found` from the driver**: set `CHROME_PATH` to
  a Chromium/Chrome binary on this machine.
