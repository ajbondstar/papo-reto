# Histórico de versões

## 0.2.0 (26/11/2026)

- Suporte ao Codex (OpenAI): a skill roda na pasta `.codex/skills`.
- Versão resumida para o ChatGPT, em `chatgpt/instrucoes-personalizadas.md`.
- A skill ficou genérica: as regras falam de "o usuário", não de uma pessoa específica.
- README com perguntas frequentes e resumo em inglês.
- Hook `hooks/carregar-papo-reto.mjs`, que carrega a skill em toda sessão do Claude Code.
- Instalação no claude.ai e na aba Chat do Claude Desktop pelo `.zip` da release.
- Teste automático no GitHub Actions: autoteste do verificador, hook e tamanho da descrição.

## 0.1.0 (26/11/2026)

- Primeira versão.
- 4 modos: Pedido, Reescrita, Resposta e Visual.
- Modo Pedido com 6 campos, ordem dos passos e validação obrigatória.
- Vocabulário fixo de estado (✅ 🟡 ⬜ ⛔ ❌) e de certeza (Verificado, Suposição, Não sei).
- Verificador em Node com 14 regras e 19 casos de teste.
