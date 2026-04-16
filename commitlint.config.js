/** @type {import('@commitlint/types').UserConfig} */
const config = {
  // 자동 생성되는 Merge 커밋은 검사 제외
  ignores: [(commit) => commit.startsWith("Merge")],

  rules: {
    // 허용 타입 — CONVENTION.md 기준
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "init",
        "build",
        "ci",
        "merge",
        "schema",
        "migration",
        "release",
      ],
    ],
    // 타입은 소문자만
    "type-case": [2, "always", "lower-case"],
    // 타입 필수
    "type-empty": [2, "never"],
    // 제목 필수
    "subject-empty": [2, "never"],
    // 제목 70자 이내
    "subject-max-length": [2, "always", 70],
    // 제목 끝에 . 금지
    "subject-full-stop": [2, "never", "."],
    // scope 사용 안 함
    "scope-empty": [2, "always"],
  },
};

module.exports = config;
