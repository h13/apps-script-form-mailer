export interface MailInput {
  readonly name: string;
  readonly email: string;
  readonly body: string;
}

export interface MailOptions {
  readonly to: string;
  readonly subject: string;
  readonly htmlBody: string;
  readonly replyTo: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildMailOptions(
  input: MailInput,
  adminEmail: string,
): MailOptions {
  const name = escapeHtml(input.name.trim());
  const email = input.email.trim().replace(/[\r\n]/g, "");
  const body = escapeHtml(input.body.trim());

  return {
    to: adminEmail,
    subject: `お問い合わせ: ${name}`,
    htmlBody: [
      "<h2>お問い合わせがありました</h2>",
      `<p><strong>名前:</strong> ${name}</p>`,
      `<p><strong>メール:</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>内容:</strong></p>`,
      `<p>${body.replace(/\n/g, "<br>")}</p>`,
    ].join("\n"),
    replyTo: email,
  };
}
