# apps-script-form-mailer

[![CI](https://github.com/h13/apps-script-form-mailer/actions/workflows/ci.yml/badge.svg)](https://github.com/h13/apps-script-form-mailer/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/h13/apps-script-form-mailer/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-Web%20App-4285F4.svg)](https://developers.google.com/apps-script)

[English](README.md)

Gmail 通知付きの Google Apps Script コンタクトフォーム Web アプリ。サーバーサイドでユーザー入力を検証し、`GmailApp.sendEmail` でメールを送信する。

> [h13/apps-script-fleet](https://github.com/h13/apps-script-fleet) テンプレートから生成。

## 動作の仕組み

1. `doGet` — `form.html` を GAS Web アプリとして配信する
2. クライアントが `google.script.run.submitForm(formData)` でフォームデータを送信する
3. `submitForm` — 入力を検証（`form-validator.ts`）し、メールオプションを構築（`mail-builder.ts`）して、`GmailApp.sendEmail` で送信する
4. `{ status: "success" | "error", message: string }` をクライアントに返す

## セットアップ

1. リポジトリをクローンするか、テンプレートとして使用する
2. [Google Apps Script](https://script.google.com) を開き、新しいプロジェクトを作成する
3. プロジェクト URL からスクリプト ID をコピーする
4. `.clasp-dev.json` と `.clasp-prod.json` にスクリプト ID を設定する:
   ```json
   { "scriptId": "YOUR_SCRIPT_ID", "rootDir": "dist" }
   ```
5. `src/index.ts` の `ADMIN_EMAIL` をコンタクトフォームの送信先メールアドレスに変更する
6. Web アプリとしてデプロイする（以下参照）

## Web アプリの設定

Apps Script エディタまたは `clasp deploy` でデプロイする際の設定:

| 設定                     | 値   |
| ------------------------ | ---- |
| 実行者                   | 自分 |
| アクセスできるユーザー   | 全員 |

スクリプトはデプロイしたユーザーのアカウントとして実行されるため、Gmail もそのアカウントから送信される。

## 開発コマンド

| コマンド                        | 説明                                                  |
| ------------------------------- | ----------------------------------------------------- |
| `pnpm run check`                | lint + lint:css + lint:html + typecheck + test        |
| `pnpm run test`                 | Jest（カバレッジ付き、閾値 80%）                      |
| `pnpm run test -- --watch`      | Jest ウォッチモード                                   |
| `pnpm run build`                | TypeScript をバンドルしてアセットを `dist/` にコピー  |
| `pnpm run deploy`               | check → build → dev 環境へデプロイ                    |
| `pnpm run deploy:prod`          | check → build → 本番環境へデプロイ                    |

## プロジェクト構成

```
src/
  index.ts           # GAS エントリポイント: doGet, submitForm (export なし)
  form-validator.ts  # 純粋な検証ロジック
  mail-builder.ts    # XSS エスケープ付き HTML メールビルダー
  form.html          # コンタクトフォーム UI (google.script.run AJAX パターン)
test/
  form-validator.test.ts
  mail-builder.test.ts
appsscript.json      # GAS マニフェスト (gmail.send スコープ、USER_DEPLOYING)
```

## Apps Script プロジェクト

これらのプロジェクトは閲覧可能です:

| 環境 | リンク |
|------|--------|
| Development | [Apps Script で開く](https://script.google.com/d/13ENqQo2MQrb8HE9ndNykhAhx80jnOyZs7Piz6iugloVNqzUcuyIY3Yn3/edit) |
| Production  | [Apps Script で開く](https://script.google.com/d/1FzOLej8FsTw7TYpvWqSuxtB4jYy8TivAjDe0sbAsmANf9LPP2hS6Hw2O/edit) |

## ライセンス

[MIT](LICENSE)
