# Histórico de versões

## 0.2.0 (26/11/2026)

- Suporte ao Codex (OpenAI): a skill roda na pasta `.codex/skills`.
- Versão resumida para o ChatGPT, em `chatgpt/instrucoes-personalizadas.md`.
- A skill ficou genérica: as regras falam de "o usuário", não de uma pessoa específica.
- README com perguntas frequentes e resumo em inglês.

## 0.1.0 (26/11/2026)

- Primeira versão.
- 4 modos: Pedido, Reescrita, Resposta e Visual.
- Modo Pedido com 6 campos, ordem dos passos e validação obrigatória.
- Vocabulário fixo de estado (✅ 🟡 ⬜ ⛔ ❌) e de certeza (Verificado, Suposição, Não sei).
- Verificador em Node com 14 regras e 19 casos de teste.
