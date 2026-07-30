# Reforma da Temporada 01 — profundidade dupla

## Diagnóstico do leitor primário (2026-07-30)

> "Está muito raso pra quem entende alguma coisa, e muito superficial pra quem não entende nada. Falta mais explicação — focada, desenhada, passo a passo. Lembrando sempre do raciocínio inverso: de chegar na equação, e não de simplesmente usar a equação. Provar."

O meio-termo atual não serve a nenhum dos dois leitores. A reforma ataca as duas pontas ao mesmo tempo, no mesmo card.

## O padrão novo (piloto no Lab 01)

Todo resultado central passa a ter, no lugar do antigo bloco de três cartões:

1. **Derivação desenhada passo a passo.** Uma corrente de 5 a 8 elos; a figura anda junto com cada elo (o SVG redesenha por passo, destacando só o que aquele elo constrói); cada elo carrega um "por quê?" expansível com a justificativa nomeada (definição, congruência, semelhança, simetria — nunca "é assim"). A dedução usa o estado atual do laboratório (o n do leitor), para deixar claro que nenhum passo depende do exemplo. O último elo é a chegada: a fórmula aparece como conclusão da corrente, não como ferramenta importada.
2. **Prova completa.** Um bloco `details.proof` com teoremas de verdade: hipóteses explícitas, passos justificados, ∎. Sempre que possível, as duas direções — a ida (a fórmula) e a volta (o que autoriza a inferência/o uso que o laboratório faz dela). Fecha declarando o que ficou apoiado em resultado externo, nomeando-o.
3. O que era raso sai: cartões de "derivação" em três frases soltas não voltam.

## Regras de propagação

- Um lab por vez, começando pelos resultados centrais de cada um (Lab 02: lado = 2R·sen; Lab 03: leque; Lab 04: as constantes; Lab 05: já tem ε–N, ganha corrente; Labs 06–10: desenrolamento, discos, anéis, coroa, TFC).
- O verificador continua obrigatório, mas prova numérica não substitui demonstração: as duas convivem e o texto distingue uma da outra.
- Gate de aprovação: o leitor primário percorre o piloto renderizado ANTES de o padrão se espalhar (critério §18 da constituição, desta vez cumprido).

## Estado

- [x] Piloto: Lab 01 — corrente de 7 elos para r/R = cos(π/n) + prova completa (ida e volta, com a ponte para o ruído).
- [ ] Validação do leitor primário no piloto.
- [ ] Propagação aos demais labs, um a um.
