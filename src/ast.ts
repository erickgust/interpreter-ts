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

function tokenLiteral(p: Program): string {
  if (p.statements.length > 0) {
    return p.statements[0]!.tokenLiteral();
  }

  return "";
}
