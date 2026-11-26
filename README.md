# Papo Reto

Skill do Claude Code para a comunicação entre uma pessoa e as IAs, em português do Brasil, sem ambiguidade.

Adaptação do [asd-ste100-skill](https://github.com/danyuchn/asd-ste100-skill), que aplica o ASD-STE100 (o inglês técnico simplificado da aviação) a textos para agentes de IA.

## O que muda em relação ao original

| Original (inglês) | Papo Reto |
|---|---|
| Só reescreve texto. | 4 modos: Pedido, Reescrita, Resposta e Visual. |
| Leitor: outro agente de IA. | Leitor: uma pessoa com dificuldade de atenção, e também os agentes. |
| Regras do inglês (phrasal verbs, present perfect). | Regras do português: sujeito escondido, pronome "seu" ambíguo, "-se" indeterminado, gerundismo, mesóclise. |
| Sem padrão de estado. | Vocabulário fixo de estado e de certeza, inspirado na fraseologia de rádio da aviação. |
| Sem visual. | Guia para escolher entre tabela, lista, diagrama e gráfico. |
| Verificador em Python. | Verificador em Node, sem dependências. |

## Instalar

Clone o repositório na pasta de skills do usuário:

```powershell
git clone https://github.com/ajbondstar/papo-reto.git "$env:USERPROFILE\.claude\skills\papo-reto"
```

Ou copie uma pasta local:

```powershell
Copy-Item -Recurse "D:\Projetos\skill ASD-STE100" "$env:USERPROFILE\.claude\skills\papo-reto"
```

## Usar

Exemplos de pedido:

```
Organiza meu pedido: <texto ditado>
Deixa claro este prompt: <texto>
Tira a ambiguidade desta mensagem de erro
Mostra isso em tabela
```

## Verificador automático

```powershell
node scripts/pts-lint.mjs SKILL.md
```

Opções:

| Opção | Faz |
|---|---|
| `--json` | Saída estruturada. |
| `--baseline N` | Tolera N achados graves. |
| `--disable regra1,regra2` | Desliga regras. |
| `--selftest` | Executa os 19 casos de teste. |

Os arquivos desta skill não passam limpos no verificador. As colunas "Não faça" citam os erros de propósito.

## Arquivos

- `SKILL.md`: as regras.
- `referencias/regras-de-escrita.md`: origem de cada regra no STE e motivo da adaptação.
- `referencias/guia-visual.md`: quando e como usar visual.
- `exemplos/antes-depois.md`: exemplos dos 4 modos.
- `scripts/pts-lint.mjs`: verificador.

## Limites

O ASD-STE100 define só o inglês. Estas regras são uma adaptação, não uma norma oficial. A skill não reproduz o dicionário oficial da ASD.

## Licença

MIT. Veja [LICENSE](LICENSE).
