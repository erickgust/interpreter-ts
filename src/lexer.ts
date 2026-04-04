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

function isDigit(ch: string): boolean {
  const charCode = ch.charCodeAt(0);
  return charCode >= "0".charCodeAt(0) && charCode <= "9".charCodeAt(0);
}

function readIdentifier(l: Lexer): [string, Lexer] {
  const { position } = l;

  let currentLexer = l;
  while (isLetter(currentLexer.ch)) {
    currentLexer = readChar(currentLexer);
  }

  return [currentLexer.input.slice(position, currentLexer.position), currentLexer];
}

function peekChar(l: Lexer) {
  if (l.readPosition >= l.input.length) {
    return "\0";
  }

  return l.input[l.readPosition]!;
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

function readNumber(l: Lexer): [string, Lexer] {
  const { position } = l;

  let currentLexer = l;

  while (isDigit(currentLexer.ch)) {
    currentLexer = readChar(currentLexer);
  }

  return [currentLexer.input.slice(position, currentLexer.position), currentLexer];
}

const skipWhitespace = (l: Lexer): Lexer => {
  let currentLexer = l;
  while (
    currentLexer.ch === " " ||
    currentLexer.ch === "\t" ||
    currentLexer.ch === "\n" ||
    currentLexer.ch === "\r"
  ) {
    currentLexer = readChar(currentLexer);
  }

  return currentLexer;
};

const newToken = (type: string, literal: string): Token => ({ type, literal });

export function getNextToken(l: Lexer): [Token, Lexer] {
  const currLexer = skipWhitespace(l);
  switch (currLexer.ch) {
    case "=":
      if (peekChar(currLexer) === "=") {
        const nextLexer = readChar(currLexer);
        const literal = currLexer.ch + nextLexer.ch;
        const tok = newToken(token.EQ, literal);

        return [tok, readChar(nextLexer)];
      }
      return [newToken(token.ASSIGN, currLexer.ch), readChar(currLexer)];
    case ";":
      return [newToken(token.SEMICOLON, currLexer.ch), readChar(currLexer)];
    case "(":
      return [newToken(token.LPAREN, currLexer.ch), readChar(currLexer)];
    case ")":
      return [newToken(token.RPAREN, currLexer.ch), readChar(currLexer)];
    case ",":
      return [newToken(token.COMMA, currLexer.ch), readChar(currLexer)];
    case "+":
      return [newToken(token.PLUS, currLexer.ch), readChar(currLexer)];
    case "-":
      return [newToken(token.MINUS, currLexer.ch), readChar(currLexer)];
    case "!":
      if (peekChar(currLexer) === "=") {
        const nextLexer = readChar(currLexer);
        const literal = currLexer.ch + nextLexer.ch;
        const tok = newToken(token.NOT_EQ, literal);

        return [tok, readChar(nextLexer)];
      }
      return [newToken(token.BANG, currLexer.ch), readChar(currLexer)];
    case "/":
      return [newToken(token.SLASH, currLexer.ch), readChar(currLexer)];
    case "*":
      return [newToken(token.ASTERISK, currLexer.ch), readChar(currLexer)];
    case "<":
      return [newToken(token.LT, currLexer.ch), readChar(currLexer)];
    case ">":
      return [newToken(token.GT, currLexer.ch), readChar(currLexer)];
    case "{":
      return [newToken(token.LBRACE, currLexer.ch), readChar(currLexer)];
    case "}":
      return [newToken(token.RBRACE, currLexer.ch), readChar(currLexer)];
    case "\0":
      return [newToken(token.EOF, ""), readChar(currLexer)];
    default:
      if (isLetter(currLexer.ch)) {
        const [literal, lexer] = readIdentifier(currLexer);
        const type = lookupIdent(literal);

        return [newToken(type, literal), lexer];
      } else if (isDigit(currLexer.ch)) {
        const [literal, lexer] = readNumber(currLexer);

        return [newToken(token.INT, literal), lexer];
      }

      return [newToken(token.ILLEGAL, currLexer.ch), readChar(currLexer)];
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
