# Reforma canônica — Lab 06 · Do polígono ao prisma

## Pergunta inevitável

Quando o cerco plano recebe altura, o erro cresce, diminui ou apenas muda de unidade?

## Transformação cognitiva

Antes: “subir” uma figura parece acrescentar uma nova fonte de erro.

Depois: uma extrusão reta multiplica polígono e círculo pela mesma altura. Os erros absolutos crescem linearmente com `h`, mas os erros relativos são preservados exatamente. Parede herda o erro do perímetro; volume herda o erro da área.

## Corrente dedutiva

1. um lado de comprimento `L` varre um retângulo `L·h`;
2. os `n` lados varrem `nLh=P·h`;
3. a base de área `A` é empilhada ao longo de `h`, produzindo `A·h`;
4. cilindro: `S_lat=2πRh` e `V=πR²h`;
5. dividir prisma por cilindro cancela `h`;
6. cobertura lateral = cobertura do perímetro;
7. cobertura volumétrica = cobertura da área;
8. no circunscrito, os excessos lateral e volumétrico empatam exatamente;
9. numa cisalha oblíqua, o volume continua `A·h` por Cavalieri, mas `P·h` deixa de medir a parede.

## Contrato canônico

- seis atos e dez marcos reais;
- aposta protegida;
- SVG espacial calculado e controles de `n`, `h` e cisalha;
- derivação visual em nove passos;
- três Canvas;
- quatro exercícios;
- auditoria de erro absoluto versus relativo;
- caso adversarial do prisma oblíquo;
- quatro curiosidades, Oficina e checker ampliado;
- HTML autocontido, offline e sem dependências remotas.

## Validação final

- materialização autocontida concluída no branch;
- checker próprio ampliado para `n=3…1000`, sete alturas, empate externo e cisalha;
- todos os checkers do repositório e o Atlas executados pelo job produtor;
- JavaScript do HTML validado sintaticamente;
- progresso exige aposta, manipulação, derivação, auditoria, certificado e quatro exercícios.
