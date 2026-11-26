# Como contribuir

Contribuições são bem-vindas: regras novas, exemplos, correções e casos de teste.

## Antes de abrir um pull request

1. Escreva em português do Brasil, seguindo as regras do próprio `SKILL.md`.
2. Rode o verificador nos arquivos que você mudou:
   ```
   node scripts/pts-lint.mjs ARQUIVO.md
   ```
3. Se mudou o verificador, rode o autoteste. Os 19 casos precisam passar:
   ```
   node scripts/pts-lint.mjs --selftest
   ```
4. Registre a mudança no `CHANGELOG.md`.

## Regra nova

Uma regra nova precisa de 3 coisas:

1. Um exemplo de **Faça** e um de **Não faça**.
2. O motivo: que ambiguidade a regra evita.
3. Se a regra for mecânica, um caso de teste no verificador.

## O que não entra

- Regras que transformam dúvida em certeza. "Pode ter falhado" nunca vira "falhou".
- Texto do dicionário oficial do ASD-STE100. A norma não permite redistribuição.

## Problemas e ideias

Abra uma issue com um exemplo real: o texto original, o que ficou confuso e o resultado que você esperava.
