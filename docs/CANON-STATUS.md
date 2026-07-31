# Estado da canonização — MATHeu$

Este documento é o placar operacional da reforma visual e dedutiva. Ele não substitui os planos matemáticos das temporadas; registra quais experiências já cumprem o padrão validado pelo leitor primário.

## Gate canônico

Um laboratório só recebe o estado **canônico** quando possui, de modo funcional e não apenas nominal:

- pergunta e aposta antes da resposta;
- mapa visível do percurso;
- manipulação sincronizada entre figura, números e gráfico;
- dedução visual progressiva, com um único passo ativo;
- leitura natural antes da fórmula simbólica;
- unidades, domínio de validade e prova acessível;
- pelo menos quatro exercícios com feedback e pistas;
- curiosidades que ampliam a estrutura sem interromper a descoberta;
- experimento específico sobre erro, escala, ruído ou caso adversarial;
- progresso que só credita ações efetivamente executadas, nunca mera renderização;
- fechamento que explicita a transformação cognitiva e abre a próxima pergunta;
- checker matemático e estrutural;
- ausência de porta falsa, overflow horizontal, erro de console ou dependência remota necessária.

## Estado atual

| Experiência | Estado | Observação |
|---|---|---|
| T01 · Lab 01 — Duas circunferências | canônico | Piloto validado e corrigido no uso real em iPhone. |
| T01 · Lab 02 — Perímetros | canônico | Propagação completa do padrão, com oito passos e dois Canvas. |
| T01 · Lab 03 — Áreas | canônico neste PR | Nove passos, três Canvas, três assimetrias do erro, escala quadrática e quatro exercícios. |
| Interlúdio 01·B | funcional, a reformar | Boa investigação, mas ainda sem o contrato completo. |
| T01 · Labs 04–10 | funcionais, a reformar | Matemática e checkers preservados; arquitetura editorial anterior. |
| T02 · Labs 01–04 | funcionais, a reformar | Interações ricas, porém sem linguagem editorial unificada. |
| Atlas do Resto | canônico como portal | Não é laboratório; cumpre seu próprio contrato de atlas interativo. |

## Ordem de execução

A reforma prossegue em PRs pequenos, cada um terminando um laboratório antes de tocar o seguinte:

```text
04 → 05 → 01·B → 06 → 07 → 08 → 09 → 10
→ T02·01 → T02·02 → T02·03 → T02·04
```

O Lab 04 vem primeiro porque deve explicar, sem duplicar o Lab 03, por que aparecem simultaneamente:

- espaçamento de inferência em ordem `n⁻³`;
- erros geométricos de perímetro e área em ordem `n⁻²`;
- fatores aproximados `1/8` e `1/4` quando `n` dobra;
- constantes assintóticas diferentes para falta e sobra.

## Acabamento transversal já aplicado

- favicon local declarado em todas as páginas HTML;
- espaçamento estrutural entre descrição e link nos cartões do Atlas;
- rótulos `M` e `ℓin/2` separados na figura principal do Lab 02;
- funcionamento offline preservado.

## Regra de governança

A canonização não será executada em um PR monolítico. Cada laboratório terá:

1. branch próprio;
2. reconstrução completa;
3. checker ampliado;
4. auditoria móvel e desktop;
5. revisão do diff;
6. merge somente após validação verde.

Isso impede que uniformidade visual seja comprada ao custo de regressões matemáticas, conteúdo perdido ou vinte páginas reformadas apenas por aparência.
