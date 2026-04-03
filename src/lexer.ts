import { token, type Token } from "./token";

export type Lexer = {
  input: string;
  position: number;
  readPosition: number;
  ch: string;
};

function readChar(l: Lexer): Lexer {
  const isEndOfFile = l.readPosition >= l.input.length;

  const ch = isEndOfFile ? "\0" : (l.input[l.readPosition] ?? "\0");
  const position = l.readPosition;
  const readPosition = l.readPosition + 1;

  return {
    ...l,
    ch,
    position,
    readPosition,
  };
}

const newToken = (type: string, literal: string): Token => ({ type, literal });

export function getNextToken(l: Lexer): [Token, Lexer] {
  switch (l.ch) {
    case "=":
      return [newToken(token.ASSIGN, l.ch), readChar(l)];
    case ";":
      return [newToken(token.SEMICOLON, l.ch), readChar(l)];
    case "(":
      return [newToken(token.LPAREN, l.ch), readChar(l)];
    case ")":
      return [newToken(token.RPAREN, l.ch), readChar(l)];
    case ",":
      return [newToken(token.COMMA, l.ch), readChar(l)];
    case "+":
      return [newToken(token.PLUS, l.ch), readChar(l)];
    case "{":
      return [newToken(token.LBRACE, l.ch), readChar(l)];
    case "}":
      return [newToken(token.RBRACE, l.ch), readChar(l)];
    case "\0":
      return [newToken(token.EOF, ""), readChar(l)];
    default:
      return [newToken(token.ILLEGAL, l.ch), readChar(l)];
  }
}

export function initLexer(input: string): Lexer {
  const l: Lexer = {
    input,
    position: 0,
    readPosition: 0,
    ch: "\0",
  };

  return readChar(l);
}
