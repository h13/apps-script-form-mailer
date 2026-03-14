# apps-script-form-mailer

[![CI](https://github.com/h13/apps-script-form-mailer/actions/workflows/ci.yml/badge.svg)](https://github.com/h13/apps-script-form-mailer/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)

Google Apps Script contact form Web App with Gmail notification. Validates user input server-side and sends email via `GmailApp.sendEmail`.

> Generated from [h13/apps-script-fleet](https://github.com/h13/apps-script-fleet) template.

## How It Works

1. `doGet` — Serves `form.html` as a GAS Web App
2. Client submits form data via `google.script.run.submitForm(formData)`
3. `submitForm` — Validates input (`form-validator.ts`), builds mail options (`mail-builder.ts`), and sends via `GmailApp.sendEmail`
4. Returns `{ status: "success" | "error", message: string }` to the client

## Setup

1. Clone or use as template
2. Open [Google Apps Script](https://script.google.com) and create a new project
3. Copy the script ID from the project URL
4. Set the script ID in `.clasp-dev.json` and `.clasp-prod.json`:
   ```json
   { "scriptId": "YOUR_SCRIPT_ID", "rootDir": "dist" }
   ```
5. Change `ADMIN_EMAIL` in `src/index.ts` to the email address that should receive contact form submissions
6. Deploy as a Web App (see below)

## Web App Settings

When deploying via the Apps Script editor or `clasp deploy`:

| Setting     | Value           |
| ----------- | --------------- |
| Execute as  | Me              |
| Who has access | Anyone       |

The script runs as the deploying user's account, so Gmail sends from that account.

## Development Commands

| Command                        | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| `pnpm run check`               | lint + lint:css + lint:html + typecheck + test |
| `pnpm run test`                | Jest with coverage (80% threshold)             |
| `pnpm run test -- --watch`     | Jest watch mode                                |
| `pnpm run build`               | Bundle TypeScript + copy assets to `dist/`     |
| `pnpm run deploy`              | check → build → deploy to dev                  |
| `pnpm run deploy:prod`         | check → build → deploy to production           |

## Project Structure

```
src/
  index.ts           # GAS entry points: doGet, submitForm (no export)
  form-validator.ts  # Pure validation logic
  mail-builder.ts    # HTML email builder with XSS escaping
  form.html          # Contact form UI (google.script.run AJAX pattern)
test/
  form-validator.test.ts
  mail-builder.test.ts
appsscript.json      # GAS manifest (gmail.send scope, USER_DEPLOYING)
```

## License

[MIT](LICENSE)
