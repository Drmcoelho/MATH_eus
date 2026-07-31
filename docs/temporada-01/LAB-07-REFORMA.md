# Reforma canônica — Lab 07 · Girar cria espaço

## Pergunta inevitável

Quando um perfil plano gira em torno de um eixo, de onde nasce o volume — e por que triângulo, retângulo e semicírculo produzem fatores tão diferentes?

## Transformação cognitiva

Antes: cilindro, cone e esfera parecem exigir três fórmulas independentes.

Depois: os três são volumes de revolução governados pela mesma máquina. Em cada altura `z`, o perfil fornece um raio `r(z)`; a rotação cria um disco de área `πr(z)²`, e a soma das fatias aproxima o volume.

## Corrente dedutiva

1. escolher um perfil e um eixo de rotação;
2. uma faixa horizontal de comprimento `r(z)` gira;
3. essa faixa produz um disco de área `πr(z)²`;
4. uma espessura `Δz` produz o pequeno volume `πr(z)²Δz`;
5. a soma `Σπr(zᵢ)²Δz` aproxima o sólido;
6. no retângulo, todos os discos são iguais e a soma já é exata;
7. no triângulo, os raios variam linearmente e surge o fator `1/3`;
8. no semicírculo, `r(z)²=R²-z²` produz `4πR³/3`;
9. cone, esfera e cilindro na mesma caixa obedecem à razão `1:2:3`, enquanto os erros das somas de ponto médio caem como `N⁻²`.

## Contrato canônico

- seis atos e dez marcos reais;
- aposta antes de revelar números;
- três perfis sincronizados e pilha visual de discos;
- dedução em nove passos, com um único passo ativo;
- três Canvas calculados;
- quatro exercícios com pistas e feedback;
- auditoria do erro, normalização e tolerância;
- caso adversarial da mudança do eixo de rotação;
- quatro curiosidades, Oficina formal e fechamento para o Lab 08;
- HTML autocontido, offline e sem dependências remotas.

## Honestidade da validação

- matemática, estrutura e sintaxe JavaScript validadas localmente;
- o ambiente bloqueou a navegação automatizada do Chromium por política administrativa;
- portanto, este PR não declara auditoria renderizada em Safari/iPhone;
- o CI oficial executa todos os checkers antes do merge.
