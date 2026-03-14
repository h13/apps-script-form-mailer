import { validateFormInput } from "./form-validator.js";
import { buildMailOptions } from "./mail-builder.js";

interface SubmitResult {
  readonly status: "success" | "error";
  readonly message: string;
}

const ADMIN_EMAIL = "admin@example.com";

function doGet(): GoogleAppsScript.HTML.HtmlOutput {
  return HtmlService.createHtmlOutputFromFile("form")
    .setTitle("お問い合わせ")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function submitForm(formData: {
  name: string;
  email: string;
  body: string;
}): SubmitResult {
  const validation = validateFormInput(formData);

  if (!validation.valid) {
    return { status: "error", message: validation.errors.join("、") };
  }

  const mailOptions = buildMailOptions(formData, ADMIN_EMAIL);
  try {
    GmailApp.sendEmail(mailOptions.to, mailOptions.subject, "", {
      htmlBody: mailOptions.htmlBody,
      replyTo: mailOptions.replyTo,
    });
  } catch {
    return {
      status: "error" as const,
      message: "送信に失敗しました。しばらくしてから再度お試しください。",
    };
  }

  return {
    status: "success",
    message: "お問い合わせを送信しました。ありがとうございます。",
  };
}
