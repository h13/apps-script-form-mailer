# Form Mailer

[![CI](https://github.com/h13/apps-script-form-mailer/actions/workflows/ci.yml/badge.svg)](https://github.com/h13/apps-script-form-mailer/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/h13/apps-script-form-mailer/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4.svg)](https://developers.google.com/apps-script)

[English](README.md)

**Gmail 通知付きのコンタクトフォーム Web アプリ。** サーバーサイドでユーザー入力を検証し、`GmailApp.sendEmail` でメールを送信。

[apps-script-fleet](https://github.com/h13/apps-script-fleet) テンプレートから生成。

## 仕組み

```
doGet → form.html を Web アプリとして配信
          → ユーザーが google.script.run でフォーム送信
          → submitForm が入力を検証（form-validator.ts）
          → メール構築（mail-builder.ts）
          → GmailApp.sendEmail で送信
          → { status, message } をクライアントに返却
```

## Apps Script プロジェクト

| 環境 | リンク |
|------|--------|
| dev | [form-mailer-dev](https://script.google.com/d/13ENqQo2MQrb8HE9ndNykhAhx80jnOyZs7Piz6iugloVNqzUcuyIY3Yn3/edit) |
| prod | [form-mailer-prod](https://script.google.com/d/1FzOLej8FsTw7TYpvWqSuxtB4jYy8TivAjDe0sbAsmANf9LPP2hS6Hw2O/edit) |

## クイックスタート

### 1. Google Apps Script プロジェクトの作成

[Google Apps Script](https://script.google.com) を開く → 新しいプロジェクトを作成 → プロジェクト URL から `scriptId` をコピー。

### 2. clasp の設定

`.clasp-dev.json` と `.clasp-prod.json` に `scriptId` を設定:

```json
{ "scriptId": "YOUR_SCRIPT_ID", "rootDir": "dist" }
```

### 3. 管理者メールアドレスの設定

`src/index.ts` の `ADMIN_EMAIL` をコンタクトフォームの送信先メールアドレスに変更。

### 4. Web アプリとしてデプロイ

Apps Script エディタまたは `clasp deploy` で以下の設定でデプロイ:

| 設定 | 値 |
|------|-----|
| 実行者 | 自分 |
| アクセスできるユーザー | 全員 |

スクリプトはデプロイしたユーザーのアカウントとして実行されるため、Gmail もそのアカウントから送信される。

## プロジェクト構成

```
src/
├── index.ts           # GAS エントリポイント: doGet, submitForm（export キーワードなし）
├── form-validator.ts  # 純粋な検証ロジック
├── mail-builder.ts    # XSS エスケープ付き HTML メールビルダー
└── form.html          # コンタクトフォーム UI（google.script.run AJAX パターン）
test/
├── form-validator.test.ts
└── mail-builder.test.ts
```

## 開発

| コマンド | 説明 |
|---------|------|
| `pnpm run check` | lint + lint:css + lint:html + typecheck + test（全チェック） |
| `pnpm run build` | TypeScript をバンドルしてアセットを `dist/` にコピー |
| `pnpm run test` | Jest（カバレッジ付き） |
| `pnpm run test -- --watch` | Jest ウォッチモード |
| `pnpm run deploy` | check → build → dev にデプロイ |
| `pnpm run deploy:prod` | check → build → 本番にデプロイ |

## CI/CD

CI は全 push と PR で実行。CD は `dev` または `main` へのマージで自動デプロイ — GitHub Actions の environment 別 secrets/variables で設定済み。詳細は [apps-script-fleet のドキュメント](https://github.com/h13/apps-script-fleet#cicd-パイプライン)を参照。

## 注意事項

- `src/index.ts` の関数に `export` キーワードは付けない（GAS ランタイムは ES モジュール構文を認識できない）
- `src/index.ts` はテストカバレッジ対象外（GAS グローバルが Node.js で実行不可のため）
- カバレッジ閾値: 全メトリクス 80%（`jest.config.json` で変更可）

## ライセンス

[MIT](LICENSE)
