import { lookupIdent, token, type Token } from "./token";

export type Lexer = {
  input: string;
  position: number;
  readPosition: number;
  ch: string;
};

const asciiA = "a".charCodeAt(0);
const asciiZ = "z".charCodeAt(0);
const asciiCapitalA = "A".charCodeAt(0);
const asciiCapitalZ = "Z".charCodeAt(0);

function isLetter(ch: string): boolean {
  const charCode = ch.charCodeAt(0);

  return (
    (charCode >= asciiA && charCode <= asciiZ) ||
    (charCode >= asciiCapitalA && charCode <= asciiCapitalZ) ||
    ch === "_"
  );
}

function readIdentifier(l: Lexer): [string, Lexer] {
  const { position } = l;

  let currentLexer = l;
  while (isLetter(currentLexer.ch)) {
    currentLexer = readChar(currentLexer);
  }

  return [currentLexer.input.slice(position, currentLexer.position), currentLexer];
}

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
      if (isLetter(l.ch)) {
        const [literal, lexer] = readIdentifier(l);
        const type = lookupIdent(literal);

        return [newToken(type, literal), lexer];
      }

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
