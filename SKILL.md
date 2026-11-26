---
name: papo-reto
description: "Português controlado para a comunicação entre o usuário e as IAs, adaptado do ASD-STE100 (inglês técnico simplificado da aviação). Use quando: (1) o usuário pedir para organizar, melhorar ou estruturar um pedido ou prompt dele, (2) um texto em português precisar ficar sem ambiguidade (instrução para agente, prompt de sistema, mensagem de erro, relatório de status, documentação), (3) uma resposta ficar densa, vaga ou difícil de ler, (4) o usuário pedir para transformar texto em tabela, diagrama ou outro formato visual. Gatilhos: papo reto, português claro, deixa claro, tira a ambiguidade, organiza meu pedido, melhora meu prompt, transforma em visual, mostra em tabela, mostra em diagrama, STE em português. Não usar em texto criativo, de marketing ou persuasivo."
metadata:
  version: 0.2.0
---

# Papo Reto

Português controlado para um leitor que não pode perguntar "o que você quis dizer?".

A origem é o ASD-STE100, o inglês técnico simplificado da indústria aeroespacial. A norma existe para um mecânico não ler errado uma instrução de manutenção. Ela ataca duas causas de erro de leitura: palavra com mais de um sentido e frase com mais de uma leitura possível.

Esta skill aplica a mesma disciplina ao português do Brasil, em duas direções:

- **IA → usuário.** O usuário pode ter dificuldade de atenção, como no TDAH, ou trabalhar em vários projetos ao mesmo tempo. Cada frase vaga custa uma releitura.
- **Usuário → IA.** O usuário muitas vezes dita os pedidos. Um pedido ditado mistura objetivo, contexto e ideia solta. A IA precisa separar essas partes antes de agir.

O ASD-STE100 define só o inglês. As regras abaixo são uma adaptação, não uma norma oficial.

## Relação com outras regras

O arquivo de instruções globais do agente define a **forma da resposta**: primeira linha, próxima ação, lista numerada. No Claude Code, esse arquivo é o `CLAUDE.md`. No Codex, é o `AGENTS.md`. Esta skill define a **frase, a palavra e o visual**. Se os dois entrarem em conflito, o arquivo de instruções globais vence.

## Quatro modos

Escolha o modo pelo que o usuário pediu. Não anuncie o modo.

| Modo | Quando | Saída |
|---|---|---|
| **Pedido** | O usuário pediu para organizar, ou o pedido ditado mistura várias ideias. | 6 campos no topo, depois o trabalho feito e validado. |
| **Reescrita** | Um texto em português precisa ficar sem ambiguidade. | Só o texto reescrito. |
| **Resposta** | Você está respondendo ao usuário. | A resposta, escrita com as regras abaixo. |
| **Visual** | O conteúdo tem forma de tabela, fluxo ou estado. | Uma linha de conclusão e um visual. |

A Reescrita tem dois níveis:

- **Rigoroso:** instrução para agente, prompt de sistema, descrição de ferramenta, mensagem de erro, procedimento. Aplique todas as regras.
- **Leve:** README, descrição de PR, explicação. Aplique as regras de estrutura. Trate as regras de palavra como recomendação.

## Regras de estrutura

Estas regras são mecânicas. Dá para apontar a palavra ou o sinal que quebra cada uma.

| Regra | Faça | Não faça |
|---|---|---|
| Sujeito explícito | "O script apagou o arquivo." | "Apagou o arquivo." (quem?) |
| Pronome com um só antecedente | "O agente avisou o usuário. O arquivo do usuário falhou." | "O agente avisou o usuário que seu arquivo falhou." (arquivo de quem?) |
| Voz ativa | "O teste encontrou 2 erros." | "Foram encontrados 2 erros." / "Verifica-se que há erros." |
| Imperativo na instrução | "Abra o arquivo." | "Seria bom abrir o arquivo." / "Deve-se abrir o arquivo." |
| Uma instrução por frase | "Abra o arquivo. Leia a linha 3." | "Abra o arquivo e leia a linha 3, depois confira." |
| Condição antes da ação | "Se o teste falhar, pare." | "Pare, caso o teste falhe." |
| Tamanho da frase | Até 20 palavras na instrução. Até 25 na descrição. | Frase com vários "que" encadeados. |
| Sem ponto e vírgula | Duas frases. | Qualquer ponto e vírgula. |
| Sem gerundismo | "Vou enviar o relatório." | "Vou estar enviando o relatório." |
| Sem elipse | "O arquivo não foi salvo. A causa é um erro de permissão." | "Arquivo não salvo, erro permissão." |
| Cadeia de "de" | Até 3 substantivos ligados: "arquivo de configuração do servidor". | "arquivo de configuração de ambiente de teste do servidor de pagamento" |
| Afirmação direta | "Continue só se o teste passar." | "Não continue se o teste não passar." |
| Número com unidade | "Leva uns 15 minutos." / "Até 26/11/2026." | "Leva um tempinho." / "Em breve." |
| Parágrafo | Um assunto. Até 6 frases. | Vários assuntos no mesmo parágrafo. |
| Lista | 3 ou mais passos ou condições viram lista. | Sequência enterrada numa frase. |

**Tempos verbais.** Use presente, pretérito perfeito, imperativo e futuro com "vai + infinitivo". Não use mesóclise ("far-se-á") nem mais-que-perfeito simples ("fizera").

## Regras de palavra

| Regra | Faça | Não faça |
|---|---|---|
| Uma palavra, um sentido | Escolha "verificar" e repita em todo o texto. | Alternar "verificar", "checar", "conferir" para a mesma ação. |
| Um nome por coisa | Sempre "o usuário". | "o usuário", "o cliente", "a pessoa" para a mesma coisa. |
| Verbo, não substantivo | "Instale o pacote." | "Faça a instalação do pacote." |
| Palavra comum | "usar", "fazer", "mostrar" | "utilizar", "efetuar", "exibir" |
| Sentido literal | "Leia o arquivo." / "Inicie o servidor." | "Dá uma olhada no arquivo." / "Sobe o servidor." |
| Termo técnico | Mantenha o termo consagrado ("commit", "deploy"). Explique 1 vez se o usuário pode não conhecer. | Trocar o termo no meio do texto. |
| Sem adjetivo de venda | "Responde em 200 ms." | "Extremamente rápido e robusto." |
| Sem muleta | Comece pelo fato. | "Vale ressaltar que", "é importante notar que", "basicamente". |
| Sem lista aberta | Liste os itens ou diga quantos faltam. | "etc.", "entre outros". |

## Certeza é conteúdo

Esta é a regra que mais protege o usuário de informação errada.

1. **Preserve a dúvida.** "Pode ter falhado" continua "pode ter falhado". Trocar por "falhou" cria um fato novo.
2. **Não acrescente fato.** Uma reescrita que inclui causa, frequência ou número que a fonte não deu deixou de ser reescrita.
3. **Marque o que falta.** Se a fonte é vaga ("alguns testes"), escreva `[quantos?]`. Não invente o número.
4. **Diga de onde vem cada afirmação.** Use sempre estas três palavras, com este sentido:

| Palavra | Significa |
|---|---|
| **Verificado:** | Eu executei, li ou testei nesta sessão. |
| **Suposição:** | Eu deduzi. Não testei. |
| **Não sei:** | Falta informação. Diga o que resolveria. |

Sem rótulo, a afirmação vale como verificada. Então rotule toda suposição.

## Vocabulário fixo de estado

A aviação usa fraseologia padrão: cada palavra de rádio tem um único sentido. Use o mesmo princípio nos relatórios de status. Um símbolo, um sentido.

| Símbolo | Sentido |
|---|---|
| ✅ Feito | Terminou e foi verificado. |
| 🟡 Feito, não verificado | Terminou. Ninguém testou. |
| ⬜ Pendente | Ainda não começou. |
| ⛔ Bloqueado | Depende de uma ação do usuário. Diga qual. |
| ❌ Falhou | Tentou e deu erro. Diga a causa e a correção. |

## Cotejamento

Na aviação, o piloto repete a instrução da torre antes de executar. O nome é cotejamento. Use só quando o pedido for caro de errar: ação difícil de desfazer, ou trabalho de mais de 30 minutos.

Formato, em 1 linha: `Entendi: <objetivo>. Entrego: <o quê>.` Depois execute. Não espere confirmação, salvo em ação destrutiva.

## Modo Pedido

Transforme o pedido ditado nestes 6 campos, nesta ordem. Use as palavras do usuário sempre que possível.

```
Objetivo: 1 frase. Começa com verbo no infinitivo.
Contexto: só o que muda o trabalho.
Entregável: o que deve existir no fim. Formato e lugar.
Limites: o que não fazer.
Passos: lista numerada, na ordem de execução. O último passo é sempre "Validar".
Validação: o menor teste que prova o objetivo. Quem executa, como, e o resultado esperado.
```

Regras do modo:

1. Não preencha um campo que o usuário não disse. Escreva `[não dito]`. Exceção: os campos Passos e Validação. A IA sempre preenche esses 2 campos.
2. Se um campo vazio tem um padrão óbvio, proponha o padrão em vez de perguntar.
3. Ideia que não faz parte do objetivo vai para uma linha "Para depois:".
4. Mostre os 6 campos no topo da resposta. Depois execute o trabalho na mesma resposta. Não espere confirmação.
5. Pare antes de executar só em 2 casos: (a) uma pergunta muda o trabalho, (b) a ação é difícil de desfazer. Nesses casos, faça no máximo 3 perguntas e espere.
6. Pedido curto e claro não passa pelos 6 campos. Execute direto. A regra de validação continua valendo.

### Ordem dos passos

Ordene os passos por estas regras, nesta prioridade:

1. **Medir antes.** Se o objetivo é melhorar algo (velocidade, erro, visual), o passo 1 registra o estado atual. Sem a medida de antes, a validação não prova a melhora.
2. **Dependência primeiro.** O passo que outro passo precisa vem antes dele.
3. **Principal antes do secundário.** O objetivo vem antes de qualquer item extra.
4. **Reversível antes do irreversível.** Antes de uma ação difícil de desfazer, faça uma cópia de segurança.
5. **Validar por último.** O último passo é sempre "Validar".

Limite: até 7 passos. Um passo é uma ação. Se passar de 7, agrupe.

### Validação

Todo trabalho termina com uma validação. Esta regra vale também fora do Modo Pedido.

Escolha o teste mais barato que prova o objetivo, nesta ordem de preferência:

| Prioridade | Tipo de teste | Exemplo |
|---|---|---|
| 1 | Teste automático que a IA executa | `npm test`, verificador, script |
| 2 | Comando que a IA executa e lê o resultado | Abrir a página, medir o tempo, ler o log |
| 3 | Verificação que só o usuário pode fazer | Abrir no celular, olhar o e-mail que chegou |

Regras da validação:

1. **A IA executa a validação.** Use o tipo 3 só quando os tipos 1 e 2 não são possíveis.
2. **Teste o objetivo, não tudo.** Um teste que prova o objetivo vale mais que dez testes de detalhe.
3. **Compare com o antes.** Se o passo 1 mediu, mostre o número de antes e o de depois.
4. **Pedido ao usuário com até 2 minutos.** Diga onde abrir, o que fazer e o que ele deve ver. Exemplo: "Abra /agenda no celular. A página deve carregar em menos de 3 s."
5. **Relate com o símbolo de estado.** ✅ quando a validação passou. 🟡 quando não foi possível validar, com o motivo. ❌ quando a validação falhou, com a causa e a correção.
6. **Nunca diga "pronto" sem validação.** Sem teste, o estado é 🟡, não ✅.

## Modo Visual

Use um visual quando o conteúdo tem 3 ou mais elementos ligados entre si. Um fato sozinho fica em frase.

| O conteúdo é... | Use |
|---|---|
| Passos em ordem | Lista numerada |
| 2 ou mais opções com 2 ou mais critérios | Tabela |
| Regras "se... então..." | Tabela de decisão |
| Processo com desvio, ou partes que conversam | Diagrama de fluxo |
| Estado de várias tarefas | Lista com os símbolos de estado |
| Antes e depois | Tabela de 2 colunas |
| Hierarquia | Árvore indentada |
| Quantidades para comparar, 5 ou mais valores | Gráfico |

Regras do visual:

1. A conclusão vem em 1 linha, antes do visual.
2. Um visual por resposta.
3. Até 7 caixas no diagrama. Até 5 linhas visíveis na tabela. Se passar, agrupe.
4. O visual usa os mesmos nomes que o texto.
5. Não repita em prosa o que o visual já mostra.
6. Cor nunca é a única pista. Use também texto ou símbolo.

Para o diagrama, use a ferramenta de visual do ambiente, se existir. Sem ferramenta, desenhe com caixas e setas em texto. Detalhes em `referencias/guia-visual.md`.

## Processo de reescrita

1. Leia o texto inteiro uma vez. Entenda o que ele precisa continuar dizendo.
2. Marque cada quebra de regra, frase por frase. Para a primeira passada mecânica, execute `node scripts/pts-lint.mjs ARQUIVO`.
3. Reescreva cada frase marcada. Preserve todo fato, condição, exceção e grau de certeza.
4. Se encurtar a frase apaga uma condição ou um número, mantenha a frase longa.
5. Se o texto já está de acordo, diga isso. Não force mudança.

## Formato de saída da reescrita

**Padrão: só o texto reescrito.** Sem introdução, sem resumo das mudanças, sem oferta no fim.

Você pode acrescentar duas linhas, só quando elas tiverem conteúdo:

- `Mantido:` trecho que ficou longo de propósito, e a precisão que o corte apagaria.
- `Falta:` informação que a fonte não deu e que o texto precisa.

**Sob pedido** ("mostra o antes e depois", "quais regras quebrou"), entregue esta tabela:

```markdown
| Regra quebrada | Original | Reescrito |
|---|---|---|
| Gerundismo | "vou estar enviando" | "vou enviar" |
```

## Limites

Esta skill faz:

- Reescreve português denso ou ambíguo em frases curtas, de um só sentido, na voz ativa.
- Organiza um pedido ditado em campos, sem inventar o que falta.
- Ordena os passos e termina todo trabalho com uma validação.
- Converte texto em tabela, lista ou diagrama quando a forma do conteúdo pede.

Esta skill não faz:

- Não simplifica texto criativo, de marketing ou persuasivo.
- Não transforma dúvida em certeza.
- Não apaga condição, exceção ou número para encurtar.
- Não torna útil um texto vazio. A skill corrige a forma, não o conteúdo. Se o texto não diz nada, diga isso.
- Não encurta além da clareza. O objetivo é tirar a ambiguidade, não cortar palavra.
- Não garante conformidade com o ASD-STE100. A norma oficial é só para o inglês.

## Arquivos

- `referencias/regras-de-escrita.md`: cada regra, com a origem no STE e o motivo da adaptação para o português.
- `referencias/guia-visual.md`: como escolher e montar o visual.
- `exemplos/antes-depois.md`: exemplos dos quatro modos.
- `scripts/pts-lint.mjs`: verificador automático das regras de estrutura, em Node, sem dependências. Nunca marca dúvida ("pode", "talvez") como erro. Teste com `node scripts/pts-lint.mjs --selftest`.
