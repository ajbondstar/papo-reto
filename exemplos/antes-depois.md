# Exemplos de antes e depois

Exemplos criados para esta skill. Não são citações de sistemas reais.

## Parte 1: regras isoladas

| Regra | Antes | Depois | Por quê |
|---|---|---|---|
| Sujeito explícito | "Apagou os arquivos temporários." | "O script de limpeza apagou os arquivos temporários." | Com 3 atores na conversa, o leitor não sabe quem apagou. |
| Pronome ambíguo | "O agente avisou o usuário que sua sessão expirou." | "O agente avisou o usuário. A sessão do usuário expirou." | "Sua" pode ser do agente, do usuário ou de quem lê. |
| "-se" indeterminado | "Recomenda-se reiniciar o servidor." | "Reinicie o servidor." | "Recomenda-se" esconde quem recomenda e quem age. |
| Gerundismo | "Vou estar verificando o log." | "Vou verificar o log." | Mesmo sentido, 2 palavras a menos. |
| Substantivo no lugar do verbo | "Realize a configuração do ambiente." | "Configure o ambiente." | O substantivo esconde a ação e acrescenta um verbo vazio. |
| Expressão figurada | "Dá uma olhada no deploy." | "Leia o log do deploy." | "Dar uma olhada" não diz o que fazer nem onde. |
| Condição depois da ação | "Apague a branch, caso o merge tenha passado." | "Se o merge passou, apague a branch." | Quem lê rápido executa a ação antes de chegar na condição. |
| Lista aberta | "Instale Node, Git etc." | "Instale Node e Git." | "Etc." obriga o leitor a adivinhar o resto. |

## Parte 2: Modo Reescrita

### Exemplo A: instrução para agente (Rigoroso)

**Antes:**
> Assim que o build tiver terminado e supondo que não tenham ocorrido erros, o agente deverá proceder à publicação do pacote, sendo que vale lembrar que às vezes o build gera artefatos incompletos quando há timeout.

**Quebras:**
- 3 ideias numa frase de 36 palavras.
- Muleta ("vale lembrar").
- Substantivo no lugar do verbo ("proceder à publicação").

**Depois:**
> Espere o build terminar sem erros. Depois publique o pacote. Atenção: um timeout pode gerar um artefato incompleto.

Note o que ficou: "pode gerar". A fonte disse "às vezes". A reescrita não transformou isso em "gera".

Note o que não entrou: a fonte não diz o que fazer com o artefato incompleto. A reescrita não inventou uma ação. Saída com a linha extra:

> `Falta:` o que o agente faz se o artefato estiver incompleto?

### Exemplo B: mensagem de erro (Rigoroso)

**Antes:**
> Ocorreu um possível problema durante o processamento da sua solicitação, que pode ter sido causado por uma incompatibilidade de versão.

**Depois:**
> A solicitação pode ter falhado. A causa pode ser uma versão incompatível. Verifique a versão do cliente.

As duas dúvidas da fonte continuam: "pode ter falhado" e "a causa pode ser".

### Exemplo C: README (Leve)

**Antes:**
> Nossa ferramenta revolucionária se integra perfeitamente ao seu fluxo de trabalho, proporcionando uma experiência extremamente fluida; basicamente, ela automatiza tudo.

**Depois:**
> A ferramenta funciona dentro do seu fluxo de trabalho atual. Ela automatiza `[quais tarefas?]`.

"Automatiza tudo" não diz nada. A reescrita marca o buraco em vez de preencher.

## Parte 3: Modo Pedido

**O Allan ditou:**
> Então, eu queria ver aquele negócio do site, sabe, o formulário de contato que tá dando problema, acho que é o e-mail que não chega, e aproveitando, se der, dá uma melhorada no visual do botão também, mas o principal é o e-mail, tem cliente reclamando.

**Saída:**

```
Objetivo: Corrigir o formulário de contato do site, que não entrega o e-mail.
Contexto: Clientes estão reclamando. Causa provável, segundo o Allan: o e-mail não chega.
Entregável: Formulário que envia e-mail para [qual endereço?].
Limites: [não dito]
Passos:
  1. Enviar um teste pelo formulário e registrar o erro atual.
  2. Ler o log de envio do servidor.
  3. Corrigir a causa encontrada no passo 2.
  4. Validar.
Validação: A IA envia um teste pelo formulário. O log mostra o envio sem erro.
           O Allan abre a caixa de entrada e vê o e-mail de teste (1 minuto).

Para depois: melhorar o visual do botão.

Perguntas:
1. Qual site?
2. Para qual endereço o e-mail deve chegar?
```

Por que a IA parou aqui: as 2 perguntas mudam o trabalho. Sem o site, ela não sabe qual código abrir.

Por que os passos estão nesta ordem:
- O passo 1 mede o antes. Sem o erro atual registrado, a validação não prova a correção.
- O passo 3 depende da causa que o passo 2 encontra.
- O botão saiu do objetivo. O Allan disse "se der" e "o principal é o e-mail".

Por que a validação tem 2 partes: a IA consegue ler o log, mas não consegue ver a caixa de entrada do Allan. A parte do Allan leva 1 minuto.

**Relato no fim do trabalho:**

> O formulário de contato envia e-mail.
>
> ✅ Feito: corrigi a senha do servidor de e-mail no `.env`. **Verificado:** antes, o log mostrava "erro de autenticação". Depois, o log mostra "enviado".
> 🟡 Falta validar: a chegada na caixa de entrada.
>
> Próximo passo: abra contato@... e procure o e-mail "Teste do formulário". Leva 1 minuto.

## Parte 4: Modo Resposta

**Antes:**
> Ótima pergunta! Dei uma olhada no projeto e basicamente o que está acontecendo é que a variável de ambiente não foi configurada, então seria interessante você estar adicionando ela no arquivo .env. Também notei que algumas dependências estão desatualizadas, entre outras coisas. Qualquer coisa me avise!

**Depois:**
> Adicione `API_KEY=...` no arquivo `.env`. Depois execute `npm run dev`.
>
> Causa: o servidor lê a variável `API_KEY` na inicialização. A variável não existe no `.env`. **Verificado:** executei o servidor e li o erro na linha 1 do log.
>
> Separado: 3 dependências estão desatualizadas. Quer que eu atualize?

## Parte 5: Modo Visual

**Antes:**
> Para o deploy, se for na branch main vai para produção, mas antes passa pelos testes, e se os testes falharem para tudo e avisa no Slack, e se for em outra branch vai para o ambiente de teste, também depois dos testes.

**Depois:**

Toda branch passa pelos testes. Só a `main` vai para produção.

| Se... | Então... |
|---|---|
| Os testes falham | ⛔ O deploy para. O Slack recebe um aviso. |
| Os testes passam e a branch é `main` | Deploy em produção. |
| Os testes passam e a branch é outra | Deploy no ambiente de teste. |
