import { expect, test } from "vitest";
import { token } from "./token";
import { getNextToken, initLexer, type Lexer } from "./lexer";

test("test getNextToken()", () => {
  const input = `=+(){},;`;

  const tests = [
    [token.ASSIGN, "="],
    [token.PLUS, "+"],
    [token.LPAREN, "("],
    [token.RPAREN, ")"],
    [token.LBRACE, "{"],
    [token.RBRACE, "}"],
    [token.COMMA, ","],
    [token.SEMICOLON, ";"],
    [token.EOF, ""],
  ];

  let lexer = initLexer(input);

  const runTests = (tests: string[][], lexer: Lexer) => {
    const [test, ...rest] = tests;

    if (!test) {
      return;
    }

    const [expectedType, expectedLiteral] = test;
    const [tok, nextLexer] = getNextToken(lexer);

    expect(tok.type).toBe(expectedType);
    expect(tok.literal).toBe(expectedLiteral);

    runTests(rest, nextLexer);
  };

  runTests(tests, lexer);
});
