export type TokenType = string;

export type Token = {
  type: TokenType;
  literal: string;
};

export const token = {
  ILLEGAL: "ILLEGAL",
  EOF: "EOF",
  IDENT: "IDENT",
  INT: "INT",
  ASSIGN: "=",
  PLUS: "+",
  MINUS: "-",
  BANG: "!",
  ASTERISK: "*",
  SLASH: "/",
  LT: "<",
  GT: ">",
  COMMA: ",",
  SEMICOLON: ";",
  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",
  FUNCTION: "FUNCTION",
  LET: "LET",
} satisfies Record<string, TokenType>;

const keywords: Record<string, TokenType> = {
  fn: token.FUNCTION,
  let: token.LET,
};

export const lookupIdent = (ident: string): TokenType => {
  return keywords[ident] ?? token.IDENT;
};
