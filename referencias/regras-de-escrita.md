# Regras de escrita: origem e adaptação

Este arquivo explica de onde vem cada regra da skill e por que ela mudou no português.

## O que é o ASD-STE100

O ASD-STE100 (Simplified Technical English) é uma linguagem controlada. A primeira versão saiu em 1986. Companhias aéreas europeias pediram a norma, porque muitos mecânicos não tinham o inglês como língua materna. Uma instrução lida errado num avião pode matar.

A edição atual é a Issue 9, de janeiro de 2025. Ela tem 53 regras de escrita em 9 seções e um dicionário de cerca de 900 palavras aprovadas. Cada palavra aprovada tem um só sentido e uma só classe gramatical.

A norma é gratuita, mas a redistribuição exige autorização da ASD. Por isso esta skill não copia o texto da norma nem o dicionário. Ela aplica as categorias de regra.

## Por que adaptar, e não traduzir

O ASD-STE100 define só o inglês. Algumas regras passam direto para o português. Outras atacam um problema que o português não tem. E o português tem fontes de ambiguidade que o inglês não tem.

## Regras que passam direto

| Regra do STE | No português |
|---|---|
| Voz ativa em instrução | Igual. |
| Uma instrução por frase | Igual. |
| Até 20 palavras na instrução, até 25 na descrição | Igual. O limite é escolha desta skill: o português usa mais artigos e preposições, então o limite aqui é um pouco mais apertado que no inglês. |
| Sem ponto e vírgula (regra 8.1) | Igual. |
| Não omitir partes da frase | Igual. Vale para artigo, verbo e sujeito. |
| Um assunto por parágrafo, até 6 frases | Igual. |
| Lista vertical para sequência | Igual. |
| Verbo em vez de substantivo (regra 3.7) | Igual. "Instale", não "faça a instalação". |
| Uma palavra, um sentido | Igual no princípio. Não existe dicionário aprovado em português. A skill cobra só a consistência dentro do texto. |
| Condição ou comando no início da instrução de segurança | Virou a regra "condição antes da ação", para toda instrução. |

## Regras trocadas por um equivalente

| Regra do STE | Problema no inglês | Equivalente no português |
|---|---|---|
| Sem phrasal verbs (regra 9.3) | "Take off" tem sentido que as partes não explicam. | Sem expressão figurada: "dar uma olhada", "subir o servidor", "bater o martelo". O problema é o mesmo: o sentido não sai das palavras. |
| Grupo nominal de até 3 palavras | "high pressure fuel pump inlet valve" | Cadeia de "de" com até 3 substantivos. O português empilha com preposição, não por justaposição. |
| Só tempos simples | O present perfect cria uma segunda leitura. | O português não tem esse problema com o pretérito perfeito. A regra virou: sem mesóclise, sem mais-que-perfeito simples, sem gerundismo. |
| Uma classe gramatical por palavra | "Oil" é substantivo e verbo. | Pouco relevante. O português marca a classe na terminação. A regra saiu. |

## Regras novas, só do português

**Sujeito explícito.** O português permite esconder o sujeito. "Apagou o arquivo" não diz quem apagou. Num relatório com vários atores (o script, o agente, o usuário), o leitor precisa adivinhar. Regra: escreva o sujeito sempre que a frase não for uma ordem direta ao leitor.

**Pronome com um só antecedente.** "Seu" e "sua" servem para "dele", "dela" e "de você". "O agente avisou o usuário que seu arquivo falhou" tem três leituras. Regra: se o pronome tem mais de um antecedente possível, repita o substantivo. Não use "o mesmo" como pronome.

**Sem "-se" de sujeito indeterminado.** "Deve-se abrir", "verifica-se", "recomenda-se" escondem quem age. É a voz passiva disfarçada. Regra: nomeie quem faz.

**Sem gerundismo.** "Vou estar enviando" tem o mesmo sentido de "vou enviar", com 2 palavras a mais e um tom de compromisso fraco.

**Afirmação direta.** A dupla negação é correta no português ("não vi nada"). Mas uma condição negativa sobre outra ("não continue se o teste não passar") obriga o leitor a inverter duas vezes. Regra: escreva a condição na forma positiva.

**Termo técnico em inglês.** Desenvolvimento de software usa termos em inglês: "commit", "deploy", "branch". Traduzir cria um segundo nome para a mesma coisa. Regra: mantenha o termo consagrado, com a mesma grafia do começo ao fim.

## Regras que vêm de outras práticas da aviação

Estas três não estão no ASD-STE100. Elas vêm da comunicação por rádio entre piloto e controle de tráfego.

| Prática | Na aviação | Na skill |
|---|---|---|
| Fraseologia padrão | Cada palavra de rádio tem um único sentido combinado. | Vocabulário fixo de estado (✅ 🟡 ⬜ ⛔ ❌) e de certeza (Verificado, Suposição, Não sei). |
| Cotejamento | O piloto repete a instrução antes de executar. | A IA repete o objetivo em 1 linha antes de um trabalho caro de errar. |
| Lista de verificação | A tripulação verifica item por item, sem depender da memória. | Estado de tarefas em lista, 1 item por linha. |

## A regra que não vem de norma nenhuma

"Certeza é conteúdo" vem do repositório original, não da norma. O autor notou que o limite de palavras empurra o escritor a cortar "pode" e "talvez". O corte muda a afirmação. Por isso o verificador automático nunca marca uma dúvida como erro.

## O que o verificador automático cobre

`scripts/pts-lint.mjs` é um conjunto de expressões regulares. Ele não entende a frase.

| Verifica | Não verifica |
|---|---|
| Ponto e vírgula | Sujeito escondido |
| Frase com mais de 25 palavras | Pronome ambíguo |
| Gerundismo | Cadeia de "de" |
| Mesóclise | Condição depois da ação |
| Substantivo no lugar do verbo | Troca de nome da mesma coisa |
| Adjetivo de venda | Fato inventado na reescrita |
| Muleta | Dúvida trocada por certeza |
| Expressão figurada (lista curta) | |
| Troca de sinônimo entre verbos | |
| Item de lista que termina em "e" ou "ou" | |

Resultado sem achados quer dizer: as verificações configuradas não encontraram problema. Não quer dizer que o texto está claro.

## Fontes

- [Site oficial do ASD-STE100](https://www.asd-ste100.org/)
- [Repositório original da skill, em inglês](https://github.com/danyuchn/asd-ste100-skill)
- [Simplified Technical English na Wikipedia](https://en.wikipedia.org/wiki/Simplified_Technical_English)
