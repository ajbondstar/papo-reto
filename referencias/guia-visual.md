# Guia visual

Este guia diz quando trocar texto por visual e como montar o visual.

## Quando usar

Faça estas 3 perguntas, na ordem:

1. O conteúdo tem 3 ou mais elementos? Se não, escreva uma frase.
2. Os elementos têm relação entre si (ordem, comparação, dependência, hierarquia)? Se não, use uma lista simples.
3. O leitor precisa ver a relação para decidir ou agir? Se sim, use o visual.

## Qual visual

| Pergunta que o leitor faz | Forma do conteúdo | Visual |
|---|---|---|
| "O que eu faço, em que ordem?" | Passos em sequência | Lista numerada |
| "Qual eu escolho?" | Opções com critérios | Tabela. Opções nas linhas, critérios nas colunas. Recomendação na primeira linha. |
| "O que acontece em cada caso?" | Regras "se... então..." | Tabela de decisão. Condição na 1ª coluna, ação na 2ª. |
| "Como isso funciona?" | Processo com desvio | Diagrama de fluxo |
| "Quem conversa com quem?" | Partes de um sistema | Diagrama de caixas e setas |
| "Onde estamos?" | Tarefas com estado | Lista com símbolos de estado e a linha "Etapa X de Y" |
| "O que mudou?" | Antes e depois | Tabela de 2 colunas |
| "O que fica dentro de quê?" | Hierarquia | Árvore indentada |
| "Quanto? Subiu ou caiu?" | 5 ou mais números | Gráfico. Com menos de 5 números, use tabela. |

## Regras de montagem

1. **Conclusão antes.** Escreva 1 linha com a resposta. O visual é a prova.
2. **Um visual por resposta.** Dois visuais disputam a atenção.
3. **Limite de tamanho.** Até 7 caixas no diagrama. Até 5 linhas visíveis na tabela. Até 4 colunas. Se passar, agrupe ou divida em duas respostas.
4. **Mesmos nomes.** A caixa "Servidor" do diagrama é "o servidor" no texto. Nunca "o backend".
5. **Sem repetição.** Depois do visual, não reconte o visual em prosa.
6. **Rótulo curto.** Até 4 palavras por caixa ou célula.
7. **Uma direção.** O fluxo vai de cima para baixo, ou da esquerda para a direita. Nunca os dois.
8. **Seta com verbo.** Se a seta não é óbvia, escreva o verbo nela: "envia", "lê", "aprova".
9. **Cor com reforço.** Todo estado tem símbolo ou texto, além da cor.
10. **Destaque único.** Marque só 1 elemento como o mais importante.

## Ferramenta

Use nesta ordem, conforme o que o ambiente oferece:

1. Ferramenta de visual embutida no chat (widget, diagrama, gráfico).
2. Skill de diagrama instalada, como a `archify`, quando o Allan pedir uma página para guardar ou compartilhar.
3. Tabela Markdown, para comparação e decisão.
4. Caixas e setas em texto, dentro de um bloco de código.

Exemplo do item 4:

```
[Pedido ditado] --> [Modo Pedido] --> [5 campos]
                                          |
                                          v
                                   [Até 3 perguntas]
```

## Quando não usar visual

- A resposta é 1 fato, 1 comando ou 1 caminho de arquivo.
- O visual teria só 2 elementos.
- O conteúdo é um raciocínio em que a ordem dos argumentos importa. Nesse caso use frases curtas e numeradas.
- O Allan pediu texto para copiar e colar em outro lugar.
