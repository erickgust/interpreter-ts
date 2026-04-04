import { expect, test } from "vitest";
import { token } from "./token";
import { getNextToken, initLexer, type Lexer } from "./lexer";

test("test getNextToken()", () => {
  const input = `
    let five = 5;
    let ten = 10;

    let add = fn(x, y) {
      x + y;
    };

    let result = add(five, ten);
    !-/*5;
    5 < 10 > 5;
`;

  const tests = [
    [token.LET, "let"],
    [token.IDENT, "five"],
    [token.ASSIGN, "="],
    [token.INT, "5"],
    [token.SEMICOLON, ";"],
    [token.LET, "let"],
    [token.IDENT, "ten"],
    [token.ASSIGN, "="],
    [token.INT, "10"],
    [token.SEMICOLON, ";"],
    [token.LET, "let"],
    [token.IDENT, "add"],
    [token.ASSIGN, "="],
    [token.FUNCTION, "fn"],
    [token.LPAREN, "("],
    [token.IDENT, "x"],
    [token.COMMA, ","],
    [token.IDENT, "y"],
    [token.RPAREN, ")"],
    [token.LBRACE, "{"],
    [token.IDENT, "x"],
    [token.PLUS, "+"],
    [token.IDENT, "y"],
    [token.SEMICOLON, ";"],
    [token.RBRACE, "}"],
    [token.SEMICOLON, ";"],
    [token.LET, "let"],
    [token.IDENT, "result"],
    [token.ASSIGN, "="],
    [token.IDENT, "add"],
    [token.LPAREN, "("],
    [token.IDENT, "five"],
    [token.COMMA, ","],
    [token.IDENT, "ten"],
    [token.RPAREN, ")"],
    [token.SEMICOLON, ";"],
    [token.BANG, "!"],
    [token.MINUS, "-"],
    [token.SLASH, "/"],
    [token.ASTERISK, "*"],
    [token.INT, "5"],
    [token.SEMICOLON, ";"],
    [token.INT, "5"],
    [token.LT, "<"],
    [token.INT, "10"],
    [token.GT, ">"],
    [token.INT, "5"],
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
