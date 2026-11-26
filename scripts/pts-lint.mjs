#!/usr/bin/env node
// Verificador das regras de estrutura do Papo Reto.
// Expressões regulares, não um analisador. Nunca marca dúvida ("pode", "talvez"):
// certeza é conteúdo, e um verificador que empurra a dúvida para fora muda a afirmação.
//
// Uso:
//   node scripts/pts-lint.mjs ARQUIVO [ARQUIVO ...]
//   echo "texto" | node scripts/pts-lint.mjs
//   node scripts/pts-lint.mjs --json ARQUIVO
//   node scripts/pts-lint.mjs --baseline 5 ARQUIVO
//   node scripts/pts-lint.mjs --disable voz-passiva,se-indeterminado ARQUIVO
//   node scripts/pts-lint.mjs --selftest
//
// Saída 0: achados graves <= baseline. Saída 1: achados graves > baseline.
// Saída 2: erro de uso. Achados de aviso nunca mudam a saída.

import { readFileSync } from "node:fs";

const MAX_PALAVRAS = 25;
const L = "[\\p{L}\\p{N}]"; // letra ou número
const B = `(?<!${L})`; // início de palavra (\b não funciona com acento)
const E = `(?!${L})`; // fim de palavra
const rx = (s) => new RegExp(s, "giu");

const REGRAS = [
  {
    id: "ponto-e-virgula", grave: true,
    re: /;/g,
    msg: "Sem ponto e vírgula. Divida em duas frases.",
  },
  {
    id: "gerundismo", grave: true,
    re: rx(`${B}(vou|vais|vai|vamos|vão|irei|irá|iremos|irão|posso|pode|podemos|podem|devo|deve|devemos|devem)\\s+estar\\s+\\p{L}+ndo${E}`),
    msg: "Gerundismo. Use \"vou enviar\", não \"vou estar enviando\".",
  },
  {
    id: "mesoclise", grave: true,
    re: rx(`${B}\\p{L}+-(se|me|te|lhe|lhes|nos|vos|o|a|os|as|lo|la|los|las)-(á|ão|ia|iam|ei|emos|íamos|ás|eis|ás)${E}`),
    msg: "Mesóclise. Reescreva com \"vai + infinitivo\".",
  },
  {
    id: "substantivo-no-lugar-do-verbo", grave: true,
    re: rx(`${B}(fazer|faça|façam|faz|fazem|fez|fizeram|realizar|realize|realizem|realiza|realizam|realizou|efetuar|efetue|efetua|efetuou|proceder|proceda|procede|procedeu)\\s+(a|o|as|os|à|ao|uma|um)\\s+\\p{L}+(ção|ções|são|sões|mento|mentos|ância|ência|agem|agens)${E}`),
    msg: "Ação escondida num substantivo. Use o verbo: \"instale\", não \"faça a instalação\".",
  },
  {
    id: "adjetivo-de-venda", grave: true,
    re: rx(`${B}(robust[oa]s?|revolucionári[oa]s?|inovador(a|es|as)?|incríve(l|is)|poderos[oa]s?|de ponta|de última geração|sem esforço|sem complicaç(ão|ões)|perfeitamente|extremamente|transformador(a|es|as)?|impressionante(s)?|fantástic[oa]s?)${E}`),
    msg: "Adjetivo de venda. Apague, ou troque pela medida que prova a qualidade.",
  },
  {
    id: "muleta", grave: true,
    re: rx(`${B}(vale (ressaltar|lembrar|destacar|notar|mencionar)|é importante (notar|ressaltar|destacar|lembrar|mencionar)|cabe (destacar|ressaltar|lembrar)|basicamente|a nível de|em nível de|no que diz respeito a|no que tange a|de certa forma|de alguma forma)${E}`),
    msg: "Muleta. Comece pelo fato.",
  },
  {
    id: "expressao-figurada", grave: true,
    re: rx(`${B}(d(ar|á|ê|ei|eu) uma olhada|bat(er|e|i|eu) o martelo|d(ar|á|ê|ei|eu) um jeito|toc(ar|a|ou) o barco|(botar|colocar|pôr) (pra|para) rodar|(colocar|pôr|botar) no ar|de cabo a rabo|sub(ir|a|o|iu|indo) (o|a|os|as) (servidor|servidores|app|aplicação|site|ambiente|container|contêiner|banco)|derrub(ar|a|ou|e) (o|a) (servidor|processo|app|aplicação|site))${E}`),
    msg: "Expressão figurada. Use o verbo literal: \"leia\", \"decida\", \"inicie\", \"pare\".",
  },
  {
    id: "lista-aberta", grave: true,
    re: rx(`${B}(etc\\.?|entre outr[oa]s|e assim por diante)${E}`),
    msg: "Lista aberta. Liste os itens ou diga quantos faltam.",
  },
  {
    id: "se-indeterminado", grave: false,
    re: rx(`${B}(deve|devem|pode|podem|recomenda|sugere|verifica|nota|observa|espera|precisa|faz|fazem|usa|utiliza|sabe|percebe|considera|entende)-se${E}`),
    msg: "Sujeito escondido no \"-se\". Diga quem faz.",
  },
  {
    id: "voz-passiva", grave: false,
    re: rx(`${B}(é|são|foi|foram|será|serão|era|eram|seria|seriam|sendo|sido|ser)\\s+(\\p{L}+(ado|ada|ados|adas|ido|ida|idos|idas)|feit[oa]s?|escrit[oa]s?|abert[oa]s?|post[oa]s?|vist[oa]s?|dit[oa]s?)${E}`),
    msg: "Possível voz passiva. Diga quem faz, a não ser que o ator não importe.",
  },
  {
    id: "condicao-negativa", grave: false,
    re: rx(`${B}não${E}[^.!?\\n]{0,40}${B}se${E}[^.!?\\n]{0,30}${B}não${E}`),
    msg: "Duas negações. Escreva a condição na forma positiva.",
  },
];

// Uma palavra, um sentido: grupos de verbos que costumam se alternar para a mesma ação.
const SINONIMOS = [
  { nomes: ["verificar", "checar", "conferir", "validar"], res: [`verifi(c|qu)\\p{L}*`, `chec\\p{L}*|cheq\\p{L}*`, `confer(ir|e|em|i|iu|indo|ido|ira)|confir(a|o|am)`, `valid(ar|a|e|am|em|ou|ando|ado|ada)`] },
  { nomes: ["apagar", "excluir", "deletar", "remover"], res: [`apag\\p{L}*`, `exclu\\p{L}*`, `delet\\p{L}*`, `remov\\p{L}*`] },
  { nomes: ["mostrar", "exibir"], res: [`mostr\\p{L}*`, `exib\\p{L}*`] },
  { nomes: ["usar", "utilizar", "empregar"], res: [`us(ar|a|e|am|em|ou|ando|ado|ada|o)`, `utiliz\\p{L}*`, `empreg(ar|a|ue|am|uem|ou|ando)`] },
  { nomes: ["corrigir", "consertar", "arrumar"], res: [`corrig\\p{L}*|corrij\\p{L}*`, `consert\\p{L}*`, `arrum\\p{L}*`] },
  { nomes: ["enviar", "mandar"], res: [`envi(ar|a|e|am|em|ou|ando|ado|o)`, `mand(ar|a|e|am|em|ou|ando|ado|o)`] },
  { nomes: ["alterar", "mudar", "modificar"], res: [`alter(ar|a|e|am|em|ou|ando|ado|ada|ação|ações)`, `mud(ar|a|e|am|em|ou|ando|o|ança|anças)`, `modific\\p{L}*`] },
  { nomes: ["iniciar", "começar"], res: [`inici(ar|a|e|am|em|ou|ando|o)`, `come(çar|ça|ce|çam|cem|çou|çando|ço)`] },
];

// ---------- preparação do texto ----------

function limparLinha(linha) {
  return linha
    .replace(/`[^`]*`/g, " ") // código em linha
    .replace(/https?:\/\/\S+/g, " ") // endereço
    .replace(/\]\([^)]*\)/g, "]") // destino de link
    .replace(/<!--.*?-->/g, " ");
}

// Divide o arquivo em blocos de prosa: [{linha, texto}] por bloco.
function blocos(texto) {
  const linhas = texto.split(/\r?\n/);
  const saida = [];
  let atual = null;
  let cerca = null;
  const fechar = () => { if (atual) saida.push(atual); atual = null; };
  linhas.forEach((bruta, i) => {
    const n = i + 1;
    const cercaMatch = bruta.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (cerca) {
      if (cercaMatch && cercaMatch[1][0] === cerca[0] && cercaMatch[1].length >= cerca.length) cerca = null;
      return;
    }
    if (cercaMatch) { fechar(); cerca = cercaMatch[1]; return; }
    if (n === 1 && bruta.trim() === "---") { cerca = "---"; return; }
    if (cerca === null && /^\s*$/.test(bruta)) { fechar(); return; }
    const linha = limparLinha(bruta);
    if (/^\s*\|/.test(linha)) { // tabela: cada célula é um bloco
      fechar();
      if (/^\s*\|[\s:|-]+\|\s*$/.test(linha)) return;
      linha.split("|").map((c) => c.trim()).filter(Boolean)
        .forEach((c) => saida.push({ linha: n, partes: [{ n, t: c }], tipo: "celula" }));
      return;
    }
    const item = linha.match(/^(\s{0,3})([-*+]|\d{1,9}[.)])\s+(.*)$/);
    const titulo = /^\s{0,3}#{1,6}\s/.test(linha);
    if (item || titulo) {
      fechar();
      atual = { linha: n, partes: [{ n, t: item ? item[3] : linha.replace(/^\s*#+\s*/, "") }], tipo: item ? "item" : "titulo" };
      if (titulo) fechar();
      return;
    }
    if (!atual) atual = { linha: n, partes: [], tipo: "paragrafo" };
    atual.partes.push({ n, t: linha.replace(/^\s*>\s?/, "") });
  });
  fechar();
  return saida;
}

// Corrige o fechamento da cerca "---" do cabeçalho YAML.
function textoSemCabecalho(texto) {
  const m = texto.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  if (!m) return texto;
  const linhas = m[0].split(/\n/).length - 1;
  return "\n".repeat(linhas) + texto.slice(m[0].length);
}

const contarPalavras = (s) => s.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;

// ---------- verificação ----------

function verificar(texto, desligadas) {
  const achados = [];
  const add = (a) => { if (!desligadas.has(a.regra)) achados.push(a); };
  const bs = blocos(textoSemCabecalho(texto));

  for (const b of bs) {
    // Regras por linha.
    for (const p of b.partes) {
      for (const r of REGRAS) {
        for (const m of p.t.matchAll(r.re)) {
          add({ linha: p.n, regra: r.id, grave: r.grave, msg: r.msg, trecho: m[0] });
        }
      }
    }
    // Tamanho de frase.
    const corrido = b.partes.map((p) => p.t).join(" ");
    const frases = corrido.split(/(?<=[.!?])\s+(?=[\p{Lu}\p{N}"“(*`])/u);
    for (const f of frases) {
      const n = contarPalavras(f);
      if (n > MAX_PALAVRAS) {
        const inicio = f.trim().split(/\s+/).slice(0, 6).join(" ");
        const onde = b.partes.find((p) => p.t.includes(inicio.split(" ")[0])) || b.partes[0];
        add({ linha: onde.n, regra: "frase-longa", grave: true, msg: `Frase com ${n} palavras. Limite: ${MAX_PALAVRAS}.`, trecho: inicio + " ..." });
      }
    }
    // Item de lista que termina em "e" ou "ou".
    if (b.tipo === "item") {
      const fim = corrido.trim();
      const m = fim.match(new RegExp(`${B}(e|ou)\\s*$`, "iu"));
      if (m) add({ linha: b.partes[b.partes.length - 1].n, regra: "conjuncao-pendente", grave: true, msg: "Item de lista termina em \"e\" ou \"ou\". Termine a ideia no próprio item.", trecho: fim.slice(-30) });
    }
  }

  // Sinônimos no mesmo arquivo.
  const prosa = bs.flatMap((b) => b.partes).map((p) => ({ n: p.n, t: p.t }));
  for (const g of SINONIMOS) {
    const usados = [];
    g.res.forEach((s, i) => {
      const re = rx(`${B}(${s})${E}`);
      const hit = prosa.find((p) => re.test(p.t));
      if (hit) usados.push({ nome: g.nomes[i], linha: hit.n });
    });
    if (usados.length >= 2) {
      add({ linha: usados[1].linha, regra: "troca-de-sinonimo", grave: true, msg: `Mesma ação com nomes diferentes: ${usados.map((u) => `${u.nome} (linha ${u.linha})`).join(", ")}. Escolha um.`, trecho: usados.map((u) => u.nome).join(" / ") });
    }
  }
  return achados.sort((a, b) => a.linha - b.linha);
}

// ---------- teste interno ----------

function autoTeste() {
  const casos = [
    ["Vou estar enviando o relatório.", ["gerundismo"]],
    ["Far-se-á a entrega amanhã.", ["mesoclise"]],
    ["Faça a instalação do pacote.", ["substantivo-no-lugar-do-verbo"]],
    ["Abra o arquivo; leia a linha 3.", ["ponto-e-virgula"]],
    ["Uma solução robusta e inovadora.", ["adjetivo-de-venda"]],
    ["Vale ressaltar que o teste passou.", ["muleta"]],
    ["Dá uma olhada no arquivo.", ["expressao-figurada"]],
    ["Suba o servidor antes do teste.", ["expressao-figurada"]],
    ["Instale Node, Git etc.", ["lista-aberta"]],
    ["Deve-se abrir o arquivo.", ["se-indeterminado"]],
    ["O arquivo foi apagado pelo script.", ["voz-passiva"]],
    ["Verifique o log. Depois confira a saída.", ["troca-de-sinonimo"]],
    ["- Abra o arquivo e", ["conjuncao-pendente"]],
    ["Esta frase tem muitas palavras porque o autor quis testar o limite de tamanho e por isso continuou escrevendo sem parar até passar de vinte e cinco.", ["frase-longa"]],
    // Dúvida é conteúdo: nada disto pode ser marcado.
    ["A requisição pode ter falhado.", []],
    ["Talvez a causa seja o cliente antigo.", []],
    ["O servidor provavelmente caiu.", []],
    ["Instale o pacote. Leia a linha 3.", []],
    ["Use `vou estar enviando; etc` como exemplo.", []],
  ];
  let falhas = 0;
  for (const [txt, esperado] of casos) {
    const obtido = [...new Set(verificar(txt, new Set()).map((a) => a.regra))].sort();
    const ok = JSON.stringify(obtido) === JSON.stringify([...esperado].sort());
    if (!ok) { falhas++; console.log(`FALHOU: "${txt}"\n  esperado: ${esperado.join(", ") || "(nada)"}\n  obtido:   ${obtido.join(", ") || "(nada)"}`); }
  }
  console.log(falhas ? `${falhas} de ${casos.length} casos falharam.` : `Autoteste: ${casos.length} de ${casos.length} casos passaram.`);
  return falhas ? 1 : 0;
}

// ---------- linha de comando ----------

function principal(argv) {
  const ids = new Set([...REGRAS.map((r) => r.id), "frase-longa", "conjuncao-pendente", "troca-de-sinonimo"]);
  let json = false, baseline = 0;
  const desligadas = new Set(), arquivos = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--selftest") return autoTeste();
    else if (a === "--json") json = true;
    else if (a === "--baseline") {
      baseline = Number(argv[++i]);
      if (!Number.isInteger(baseline) || baseline < 0) { console.error("--baseline precisa de um número inteiro >= 0."); return 2; }
    } else if (a === "--disable") {
      for (const r of (argv[++i] || "").split(",").filter(Boolean)) {
        if (!ids.has(r)) { console.error(`Regra desconhecida: ${r}. Regras: ${[...ids].join(", ")}`); return 2; }
        desligadas.add(r);
      }
    } else if (a.startsWith("--")) { console.error(`Opção desconhecida: ${a}`); return 2; }
    else arquivos.push(a);
  }

  const entradas = [];
  if (arquivos.length === 0) entradas.push(["(entrada)", readFileSync(0, "utf8")]);
  for (const f of arquivos) {
    try { entradas.push([f, readFileSync(f, "utf8")]); }
    catch { console.error(`Não consegui ler: ${f}`); return 2; }
  }

  const todos = entradas.flatMap(([f, t]) => verificar(t, desligadas).map((a) => ({ arquivo: f, ...a })));
  const graves = todos.filter((a) => a.grave).length;
  if (json) console.log(JSON.stringify({ graves, avisos: todos.length - graves, achados: todos }, null, 2));
  else {
    for (const a of todos) console.log(`${a.arquivo}:${a.linha}: [${a.regra}]${a.grave ? "" : " (aviso)"} ${a.msg} → "${a.trecho}"`);
    console.log(`${graves} grave(s), ${todos.length - graves} aviso(s). Limite tolerado: ${baseline}.`);
  }
  return graves > baseline ? 1 : 0;
}

process.exitCode = principal(process.argv.slice(2));
