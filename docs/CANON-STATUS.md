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
| T01 · Interlúdio 01·B — Polígono escondido | canônico neste PR | Operador de pontos médios, nove passos, três Canvas e confronto entre espiral fixa e produto de Kepler–Bouwkamp. |
| T01 · Lab 02 — Perímetros | canônico | Propagação completa do padrão, com oito passos e dois Canvas. |
| T01 · Lab 03 — Áreas | canônico | HTML autocontido; aposta protegida; nove passos e dez marcos reais de progresso. |
| T01 · Lab 04 — Forma do erro | canônico | Ordens n⁻² e n⁻³ separadas; nove passos, três Canvas e quatro exercícios. |
| T01 · Lab 05 — Garantia e limite | canônico | Busca exata, previsão assintótica e certificado rigoroso separados em nove passos. |
| T01 · Labs 06–10 | funcionais, a reformar | Matemática e checkers preservados; arquitetura editorial anterior. |
| T02 · Labs 01–04 | funcionais, a reformar | Interações ricas, porém sem linguagem editorial unificada. |
| Atlas do Resto | canônico como portal | Não é laboratório; cumpre seu próprio contrato de atlas interativo. |

## Ordem de execução

A reforma prossegue em PRs pequenos, cada um terminando um laboratório antes de tocar o seguinte:

```text
06 → 07 → 08 → 09 → 10
→ T02·01 → T02·02 → T02·03 → T02·04
```

O Interlúdio 01·B acrescenta uma distinção que os cinco primeiros laboratórios ainda não haviam explicitado:

- repetir **o mesmo** fator `cos(π/n)` produz `cᵏ → 0`;
- alterar `n` a cada etapa produz o produto `∏ cos(π/n)`, que converge para uma constante positiva;
- semelhança visual entre processos iterativos não autoriza igualdade de limite;
- a meia-vida da espiral fixa cresce em ordem `n²`.

O Lab 04 explica, sem duplicar o Lab 03, por que aparecem simultaneamente:

- espaçamento de inferência em ordem `n⁻³`;
- erros geométricos de perímetro e área em ordem `n⁻²`;
- fatores aproximados `1/8` e `1/4` quando `n` dobra;
- constantes assintóticas diferentes para falta e sobra.

## Histórico da reforma

- Labs 01 e 02: linguagem canônica validada no uso real;
- PR #25 e hotfix #26: canonização do Lab 03 e acabamento transversal;
- PR #28: canonização do Lab 04;
- PR #29: canonização do Lab 05;
- PR #30: canonização do Interlúdio 01·B e próximo gate no Lab 06.

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
