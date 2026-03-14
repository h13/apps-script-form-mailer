export interface FormInput {
  readonly name: string;
  readonly email: string;
  readonly body: string;
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

const EMAIL_PATTERN =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function validateFormInput(input: FormInput): ValidationResult {
  const errors: string[] = [];
  const name = input.name.trim();
  const email = input.email.trim();
  const body = input.body.trim();

  if (name === "") {
    errors.push("名前は必須です");
  }

  if (email === "") {
    errors.push("メールアドレスは必須です");
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push("メールアドレスの形式が正しくありません");
  } else if (/[\r\n]/.test(email)) {
    errors.push("メールアドレスに不正な文字が含まれています");
  }

  if (body === "") {
    errors.push("お問い合わせ内容は必須です");
  }

  if (name.length > 100) {
    errors.push("名前は100文字以内で入力してください");
  }

  if (body.length > 5000) {
    errors.push("お問い合わせ内容は5000文字以内で入力してください");
  }

  return { valid: errors.length === 0, errors };
}
