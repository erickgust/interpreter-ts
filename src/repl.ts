import { getNextToken, initLexer, type Lexer } from "./lexer";

const prompt = ">> ";
process.stdout.write(prompt);

for await (const line of console) {
  const l = initLexer(line);

  const run = (l: Lexer) => {
    const [token, lexer] = getNextToken(l);

    if (token.type === "EOF") return;

    process.stdout.write(`{Type: ${token.type}, Literal: ${token.literal}}\n`);

    run(lexer);
  };

  run(l);
}
