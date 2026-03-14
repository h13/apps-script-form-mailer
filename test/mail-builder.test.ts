import { buildMailOptions } from "../src/mail-builder.js";

describe("buildMailOptions", () => {
  const input = {
    name: "Taro Yamada",
    email: "taro@example.com",
    body: "This is a test inquiry.",
  };

  it("sets recipient to the admin email", () => {
    const result = buildMailOptions(input, "admin@example.com");
    expect(result.to).toBe("admin@example.com");
  });

  it("includes sender name in subject", () => {
    const result = buildMailOptions(input, "admin@example.com");
    expect(result.subject).toContain("Taro Yamada");
  });

  it("includes all form fields in HTML body", () => {
    const result = buildMailOptions(input, "admin@example.com");
    expect(result.htmlBody).toContain("Taro Yamada");
    expect(result.htmlBody).toContain("taro@example.com");
    expect(result.htmlBody).toContain("This is a test inquiry.");
  });

  it("sets replyTo to sender email", () => {
    const result = buildMailOptions(input, "admin@example.com");
    expect(result.replyTo).toBe("taro@example.com");
  });

  it("converts newlines to <br> in body", () => {
    const multiline = {
      name: "Taro",
      email: "taro@example.com",
      body: "Line 1\nLine 2\nLine 3",
    };
    const result = buildMailOptions(multiline, "admin@example.com");
    expect(result.htmlBody).toContain("Line 1<br>Line 2<br>Line 3");
  });

  it("escapes HTML in user input", () => {
    const malicious = {
      name: '<script>alert("xss")</script>',
      email: "attacker@example.com",
      body: '<img src="x" onerror="alert(1)">',
    };
    const result = buildMailOptions(malicious, "admin@example.com");
    expect(result.htmlBody).not.toContain("<script>");
    expect(result.htmlBody).not.toContain("<img");
    expect(result.htmlBody).toContain("&lt;script&gt;");
  });
});
