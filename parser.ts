import type { Program } from "./src/ast";
import { getNextToken, type Lexer } from "./src/lexer";
import type { Token } from "./src/token";

type Parser = {
  l: Lexer;
  curToken: Token | null;
  peekToken: Token | null;
};

export function newParser(l: Lexer): Parser {
  const p: Parser = {
    l,
    curToken: null,
    peekToken: null,
  };

  nextToken(p);
  nextToken(p);

  return p;
}

function nextToken(p: Parser) {
  p.curToken = p.peekToken;
  [p.peekToken, p.l] = getNextToken(p.l);
}

function parseProgram(p: Parser): Program | null {
  return null;
}
