// REPL driver for the axora-innovative-solutions Next.js app.
// Drives a headless Chromium (via playwright-core) against the running dev server.
// Designed for agents: wrap in tmux, send-keys commands, capture-pane output.
//
// No browser download needed — this box already has a system Chromium/Chrome.
// Override with CHROME_PATH if /usr/bin/chromium isn't present.
import { chromium } from 'playwright-core';
import * as readline from 'node:readline';
import * as fs from 'node:fs';
import * as path from 'node:path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const SHOT_DIR = process.env.SCREENSHOT_DIR || '/tmp/shots';
fs.mkdirSync(SHOT_DIR, { recursive: true });

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/bin/chromium',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
].filter(Boolean);

let browser = null;
let page = null;
const consoleLog = [];

function findChrome() {
  for (const p of CHROME_CANDIDATES) if (fs.existsSync(p)) return p;
  throw new Error('no system Chromium found, tried: ' + CHROME_CANDIDATES.join(', '));
}

const COMMANDS = {
  async launch() {
    if (browser) return console.log('already launched');
    browser = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox'] });
    page = await browser.newPage();
    page.on('console', (msg) => consoleLog.push(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', (err) => consoleLog.push(`[pageerror] ${err.message}`));
    console.log('launched.');
  },

  async nav(url) {
    if (!page) return console.log('ERROR: launch first');
    const target = url ? new URL(url, BASE_URL).toString() : BASE_URL;
    const resp = await page.goto(target, { waitUntil: 'networkidle', timeout: 30_000 });
    console.log('nav', target, '→ status', resp?.status());
  },

  async ss(name) {
    if (!page) return console.log('ERROR: launch first');
    const f = path.join(SHOT_DIR, (name || `ss-${consoleLog.length}`) + '.png');
    await page.screenshot({ path: f, fullPage: true });
    console.log('screenshot:', f);
  },

  async 'wait-for'(sel) {
    if (!page) return console.log('ERROR: launch first');
    try { await page.waitForSelector(sel, { timeout: 10_000 }); console.log('found:', sel); }
    catch { console.log('TIMEOUT:', sel); }
  },

  async click(sel) {
    if (!page) return console.log('ERROR: launch first');
    try { await page.click(sel, { timeout: 10_000 }); console.log('clicked:', sel); }
    catch (e) { console.log('ERROR:', e.message); }
  },

  async 'click-text'(text) {
    if (!page) return console.log('ERROR: launch first');
    try {
      await page.getByText(text, { exact: false }).first().click({ timeout: 10_000 });
      console.log('clicked text:', text);
    } catch (e) { console.log('ERROR:', e.message); }
  },

  // The default landing page's only interactive elements are target="_blank"
  // links — clicking opens a new tab rather than navigating in place. This
  // switches the active `page` to that popup so ss/text/eval target it.
  async 'click-popup'(text) {
    if (!page) return console.log('ERROR: launch first');
    try {
      const [popup] = await Promise.all([
        page.context().waitForEvent('page', { timeout: 10_000 }),
        page.getByText(text, { exact: false }).first().click(),
      ]);
      await popup.waitForLoadState('domcontentloaded', { timeout: 15_000 });
      page = popup;
      page.on('console', (msg) => consoleLog.push(`[${msg.type()}] ${msg.text()}`));
      page.on('pageerror', (err) => consoleLog.push(`[pageerror] ${err.message}`));
      console.log('popup opened, now active page:', page.url());
    } catch (e) { console.log('ERROR:', e.message); }
  },

  async fill(args) {
    if (!page) return console.log('ERROR: launch first');
    const [sel, ...rest] = args.split(' ');
    const value = rest.join(' ');
    try { await page.fill(sel, value); console.log('filled', sel, 'with', JSON.stringify(value)); }
    catch (e) { console.log('ERROR:', e.message); }
  },

  async type(text) { if (page) await page.keyboard.type(text, { delay: 20 }); },
  async press(key) { if (page) await page.keyboard.press(key); },

  async eval(expr) {
    if (!page) return console.log('ERROR: launch first');
    try { console.log(JSON.stringify(await page.evaluate(expr))); }
    catch (e) { console.log('ERROR:', e.message); }
  },

  async text(sel) {
    if (!page) return console.log('ERROR: launch first');
    console.log(await page.evaluate(
      (s) => (s ? document.querySelector(s) : document.body)?.innerText ?? '(null)',
      sel || null,
    ));
  },

  async title() {
    if (!page) return console.log('ERROR: launch first');
    console.log(await page.title());
  },

  console(filter) {
    const lines = filter === '--errors'
      ? consoleLog.filter((l) => l.startsWith('[error]') || l.startsWith('[pageerror]'))
      : consoleLog;
    console.log(lines.length ? lines.join('\n') : '(none)');
  },

  async quit() { if (browser) await browser.close().catch(() => {}); browser = null; page = null; },
  help() { console.log('commands:', Object.keys(COMMANDS).join(', ')); },
};

const stdin = fs.createReadStream(null, { fd: fs.openSync('/dev/stdin', 'r') });
const rl = readline.createInterface({ input: stdin, output: process.stdout, prompt: 'driver> ' });

rl.on('line', async (line) => {
  const [cmd, ...rest] = line.trim().split(/\s+/);
  if (!cmd) return rl.prompt();
  const fn = COMMANDS[cmd];
  if (!fn) { console.log('unknown:', cmd, '— try: help'); return rl.prompt(); }
  try { await fn(rest.join(' ')); } catch (e) { console.log('ERROR:', e.message); }
  if (cmd === 'quit') { rl.close(); process.exit(0); }
  rl.prompt();
});
rl.on('close', async () => { await COMMANDS.quit(); process.exit(0); });

console.log('axora-innovative-solutions driver — "help" for commands, "launch" then "nav" to start');
rl.prompt();
