# Form Mailer

[![CI](https://github.com/h13/apps-script-form-mailer/actions/workflows/ci.yml/badge.svg)](https://github.com/h13/apps-script-form-mailer/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/h13/apps-script-form-mailer/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4.svg)](https://developers.google.com/apps-script)

[日本語](README.ja.md)

**Contact form Web App with Gmail notification.** Validates user input server-side and sends email via `GmailApp.sendEmail`.

Built from [apps-script-fleet](https://github.com/h13/apps-script-fleet) template.

## How It Works

```
doGet → Serve form.html as Web App
          → User submits form via google.script.run
          → submitForm validates input (form-validator.ts)
          → Build email (mail-builder.ts)
          → Send via GmailApp.sendEmail
          → Return { status, message } to client
```

## Apps Script Projects

| Environment | Link |
|-------------|------|
| dev | [form-mailer-dev](https://script.google.com/d/13ENqQo2MQrb8HE9ndNykhAhx80jnOyZs7Piz6iugloVNqzUcuyIY3Yn3/edit) |
| prod | [form-mailer-prod](https://script.google.com/d/1FzOLej8FsTw7TYpvWqSuxtB4jYy8TivAjDe0sbAsmANf9LPP2hS6Hw2O/edit) |

## Quick Start

### 1. Create a Google Apps Script Project

Open [Google Apps Script](https://script.google.com) → create a new project → copy the `scriptId` from the project URL.

### 2. Configure clasp

Set the `scriptId` in `.clasp-dev.json` and `.clasp-prod.json`:

```json
{ "scriptId": "YOUR_SCRIPT_ID", "rootDir": "dist" }
```

### 3. Set Admin Email

Change `ADMIN_EMAIL` in `src/index.ts` to the email address that should receive contact form submissions.

### 4. Deploy as Web App

Deploy via the Apps Script editor or `clasp deploy` with the following settings:

| Setting | Value |
|---------|-------|
| Execute as | Me |
| Who has access | Anyone |

The script runs as the deploying user's account, so Gmail sends from that account.

## Project Structure

```
src/
├── index.ts           # GAS entry points: doGet, submitForm (no export keyword)
├── form-validator.ts  # Pure validation logic
├── mail-builder.ts    # HTML email builder with XSS escaping
└── form.html          # Contact form UI (google.script.run AJAX pattern)
test/
├── form-validator.test.ts
└── mail-builder.test.ts
```

## Development

| Command | Description |
|---------|-------------|
| `pnpm run check` | lint + lint:css + lint:html + typecheck + test (all checks) |
| `pnpm run build` | Bundle TypeScript + copy assets to `dist/` |
| `pnpm run test` | Jest with coverage |
| `pnpm run test -- --watch` | Jest watch mode |
| `pnpm run deploy` | check → build → deploy to dev |
| `pnpm run deploy:prod` | check → build → deploy to production |

## CI/CD

CI runs on every push and PR. CD deploys on merge to `dev` or `main` — configured via GitHub Actions secrets/variables per environment. See [apps-script-fleet docs](https://github.com/h13/apps-script-fleet#cicd-pipeline) for details.

## Notes

- Functions in `src/index.ts` must not have the `export` keyword — the GAS runtime does not support ES module syntax
- `src/index.ts` is excluded from test coverage (GAS globals cannot run in Node.js)
- Coverage threshold: 80% for all metrics (configurable in `jest.config.json`)

## License

[MIT](LICENSE)
