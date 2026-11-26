<div align="center">

<img src="assets/papo-reto.jpg" alt="Um ratel de óculos escuros com o texto papo-reto" width="320">

# Papo Reto

**A IA fala com você do jeito que um piloto fala com a torre: curto, claro e sem duplo sentido.**

![Claude Code](https://img.shields.io/badge/Claude_Code-skill-D97757)
![Idioma](https://img.shields.io/badge/idioma-pt--BR-009C3B)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)
![Dependências](https://img.shields.io/badge/depend%C3%AAncias-zero-brightgreen)

</div>

---

## O problema

A IA responde com parágrafos longos, termina com "deve estar funcionando" e mistura o que testou com o que supôs. Você relê três vezes e ainda não sabe o que fazer.

**O Papo Reto corrige isso.** Ele é uma skill do Claude Code com regras de português controlado. A base vem da aviação, onde uma frase lida errado pode derrubar um avião.

## Antes e depois

| ❌ Sem o Papo Reto | ✅ Com o Papo Reto |
|---|---|
| "Ótima pergunta! Dei uma otimizada geral e deve estar bem melhor agora!" | "A página carrega em 1,8 s. Antes: 6,2 s." |
| "Vale ressaltar que talvez seja interessante você estar verificando o .env." | "Adicione `API_KEY` no `.env`. Depois rode `npm run dev`." |
| "Já está tudo pronto!" | "✅ Feito e testado: o formulário envia. 🟡 Falta testar: a chegada na caixa de entrada." |
| A IA supõe a causa e já sai mexendo. | **Suposição:** a imagem está pesada. A IA mede antes de mexer. |

## Os 4 modos

| Modo | Quando entra | O que você recebe |
|---|---|---|
| 🎯 **Pedido** | Você dita um pedido com várias ideias misturadas. | 6 campos (Objetivo, Contexto, Entregável, Limites, Passos e Validação) e o trabalho já feito. |
| ✂️ **Reescrita** | Um prompt, erro ou instrução está confuso. | O mesmo texto, sem ambiguidade. |
| 💬 **Resposta** | Sempre. | Frases curtas, sujeito explícito, sem enrolação. |
| 📊 **Visual** | O conteúdo tem 3 ou mais partes ligadas. | Uma tabela, lista ou diagrama no lugar do parágrafo. |

## O que veio da aviação

| Na aviação | No Papo Reto |
|---|---|
| **Fraseologia padrão:** cada palavra de rádio tem um só sentido. | Símbolos fixos de estado: ✅ Feito · 🟡 Não verificado · ⬜ Pendente · ⛔ Bloqueado · ❌ Falhou |
| **Cotejamento:** o piloto repete a instrução antes de agir. | A IA repete o objetivo em 1 linha antes de um trabalho grande. |
| **Lista de verificação:** nada depende da memória. | Todo trabalho termina com uma validação. Sem teste, o estado é 🟡, nunca ✅. |
| **ASD-STE100:** uma palavra, um sentido. Voz ativa. Uma instrução por frase. | As mesmas regras, adaptadas ao português do Brasil. |

## Regras só do português

O inglês técnico não tem estes problemas. O português tem:

- **Sujeito escondido:** "Apagou o arquivo." Quem apagou?
- **"Seu" com dois donos:** "O agente avisou o usuário que seu arquivo falhou." De quem é o arquivo?
- **"-se" que esconde quem faz:** "Deve-se reiniciar." Quem deve?
- **Gerundismo:** "Vou estar enviando" vira "Vou enviar".
- **Certeza inventada:** "Pode ter falhado" nunca vira "Falhou".

## Instalar

**Claude Code (app, terminal ou VS Code):**

```powershell
git clone https://github.com/ajbondstar/papo-reto.git "$env:USERPROFILE\.claude\skills\papo-reto"
```

Abra uma conversa nova. Para ativar numa conversa já aberta, digite `/papo-reto`.

**claude.ai:** compacte a pasta `papo-reto` em `.zip` e envie em **Configurações → Capacidades → Skills**.

## Usar

```
Organiza meu pedido: <texto ditado>
Deixa claro este prompt: <texto>
Tira a ambiguidade desta mensagem de erro
Mostra isso em tabela
```

## Verificador automático

Um verificador em Node, sem dependências, aponta 14 tipos de problema: ponto e vírgula, frase longa, gerundismo, mesóclise, muleta, adjetivo de venda e outros.

```powershell
node scripts/pts-lint.mjs SEU-ARQUIVO.md
node scripts/pts-lint.mjs --selftest
```

| Opção | Faz |
|---|---|
| `--json` | Saída estruturada. |
| `--baseline N` | Tolera N achados graves. |
| `--disable regra1,regra2` | Desliga regras. |
| `--selftest` | Executa os 19 casos de teste. |

O verificador nunca marca dúvida ("pode", "talvez") como erro. A dúvida faz parte da informação.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `SKILL.md` | As regras. |
| `referencias/regras-de-escrita.md` | A origem de cada regra e o motivo da adaptação. |
| `referencias/guia-visual.md` | Quando usar tabela, lista, diagrama ou gráfico. |
| `exemplos/antes-depois.md` | Exemplos dos 4 modos. |
| `scripts/pts-lint.mjs` | O verificador. |

## Limites

- O ASD-STE100 define só o inglês. Estas regras são uma adaptação, não uma norma oficial.
- A skill não reproduz o dicionário oficial da ASD.
- A skill corrige a forma do texto, não o conteúdo. Um texto vazio sai curto, claro e ainda vazio.

## Autor

**Allan Mendonça** · [@ajbondstar](https://github.com/ajbondstar)

## Licença

MIT. Veja [LICENSE](LICENSE). Inspirado no [asd-ste100-skill](https://github.com/danyuchn/asd-ste100-skill), também MIT.
