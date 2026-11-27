// Hook SessionStart: coloca a skill Papo Reto no contexto de toda sessão.
// Lê o SKILL.md instalado, tira o cabeçalho YAML e devolve como additionalContext.
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const arquivo = join(homedir(), ".claude", "skills", "papo-reto", "SKILL.md");

try {
  const texto = readFileSync(arquivo, "utf8").replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const contexto =
    "Skill papo-reto carregada automaticamente pelo hook SessionStart. " +
    "Aplique estas regras em toda resposta desta sessão. " +
    "Os arquivos de apoio (exemplos, referencias, scripts) ficam em " +
    join(homedir(), ".claude", "skills", "papo-reto") + ".\n\n" + texto;
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: contexto },
  }));
} catch {
  // Sem a skill instalada, a sessão começa normalmente.
  process.stdout.write("{}");
}
