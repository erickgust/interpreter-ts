import type { Token } from "./token";

type Node = {
  tokenLiteral(): string;
};

type Statement = Node & {
  statementNode(): void;
};

type Expression = Node & {
  expressionNode(): void;
};

type Program = {
  statements: Statement[];
};

type Identifier = {
  token: Token;
  value: string;
};

type LetStatement = {
  token: Token;
  name: Identifier;
  value: Expression;
};

function tokenLiteral(ls: LetStatement): string {
  return ls.token.literal;
}

function statementNode(): void {
  return;
}

function expressionNode(): void {
  return;
}

export type { Node, Statement, Expression, Program, Identifier, LetStatement };
