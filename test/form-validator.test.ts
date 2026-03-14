import { validateFormInput } from "../src/form-validator.js";

describe("validateFormInput", () => {
  it("returns valid for correct input", () => {
    const result = validateFormInput({
      name: "Taro Yamada",
      email: "taro@example.com",
      body: "This is a test message.",
    });
    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("returns error when name is empty", () => {
    const result = validateFormInput({
      name: "",
      email: "taro@example.com",
      body: "Message",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("名前は必須です");
  });

  it("returns error when email is empty", () => {
    const result = validateFormInput({
      name: "Taro",
      email: "",
      body: "Message",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("メールアドレスは必須です");
  });

  it("returns error when email format is invalid", () => {
    const result = validateFormInput({
      name: "Taro",
      email: "not-an-email",
      body: "Message",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("メールアドレスの形式が正しくありません");
  });

  it("returns error when body is empty", () => {
    const result = validateFormInput({
      name: "Taro",
      email: "taro@example.com",
      body: "",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("お問い合わせ内容は必須です");
  });

  it("returns multiple errors when multiple fields are invalid", () => {
    const result = validateFormInput({
      name: "",
      email: "",
      body: "",
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);
  });

  it("trims whitespace from inputs", () => {
    const result = validateFormInput({
      name: "  Taro  ",
      email: "  taro@example.com  ",
      body: "  Message  ",
    });
    expect(result.valid).toBe(true);
  });
});
