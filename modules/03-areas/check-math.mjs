import assert from 'node:assert/strict';

// Lab 03: para um círculo de raio R = 1, o polígono inscrito tem área
// (n/2)·sen(2pi/n) e o circunscrito n·tg(pi/n). A fórmula do leque,
// área = perímetro × apótema / 2, vale exatamente para os dois; do lado de
// fora o apótema é o próprio R, então o excesso percentual da área é
// idêntico ao do contorno. Do lado de dentro a razão entre o erro relativo
// da área e o do contorno sobe em direção a 4.

const CIRCLE_AREA = Math.PI;
const CIRCLE_LENGTH = 2 * Math.PI;

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

function areaIn(n) {
  return (n / 2) * Math.sin(2 * Math.PI / n);
}

function areaOut(n) {
  return n * Math.tan(Math.PI / n);
}

function perimeterIn(n) {
  return 2 * n * Math.sin(Math.PI / n);
}

function perimeterOut(n) {
  return 2 * n * Math.tan(Math.PI / n);
}

let previousIn = 0;
let previousOut = Infinity;
let previousRatio = 0;

for (let n = 3; n <= 1000; n += 1) {
  const theta = Math.PI / n;
  const ain = areaIn(n);
  const aout = areaOut(n);

  assert.ok(ain < CIRCLE_AREA, `área interna deve ficar abaixo do círculo em n=${n}`);
  assert.ok(aout > CIRCLE_AREA, `área externa deve ficar acima do círculo em n=${n}`);
  assert.ok(ain > previousIn, `área interna deve crescer com n; falhou em n=${n}`);
  assert.ok(aout < previousOut, `área externa deve decrescer com n; falhou em n=${n}`);
  previousIn = ain;
  previousOut = aout;

  // fórmula do leque, exata para os dois polígonos
  close(ain, perimeterIn(n) * Math.cos(theta) / 2, 1e-12, `leque interno n=${n}`);
  close(aout, perimeterOut(n) * 1 / 2, 1e-12, `leque externo n=${n}`);

  // fora: excesso relativo da área é idêntico ao do contorno (igualdade exata)
  close(aout / CIRCLE_AREA, perimeterOut(n) / CIRCLE_LENGTH, 1e-14, `empate externo n=${n}`);

  // dentro: erro relativo da área ÷ erro relativo do contorno sobe rumo a 4
  const ratio = (1 - ain / CIRCLE_AREA) / (1 - perimeterIn(n) / CIRCLE_LENGTH);
  assert.ok(ratio > previousRatio, `a razão dos erros relativos deve crescer; falhou em n=${n}`);
  assert.ok(ratio < 4, `a razão dos erros relativos deve ficar abaixo de 4; falhou em n=${n}`);
  previousRatio = ratio;
}

close(previousRatio, 4, 1e-3, 'razão dos erros relativos em n=1000 deve estar colada em 4');

// círculo como caso-limite do leque: área = contorno × raio / 2
close(CIRCLE_LENGTH * 1 / 2, CIRCLE_AREA, 1e-15, 'leque aplicado ao círculo');

// valores citados na página (n = 12)
close(areaIn(12), 3, 1e-12, 'área interna do dodecágono é exatamente 3');
close(areaOut(12), 3.2154, 5e-5, 'área externa citada para n=12');
close(Math.cos(Math.PI / 12), 0.9659, 5e-5, 'apótema citado para n=12');
close(perimeterIn(12) / CIRCLE_LENGTH, 0.9886, 5e-5, 'cobertura do contorno citada para n=12');
close(areaIn(12) / CIRCLE_AREA, 0.9549, 5e-5, 'cobertura da área citada para n=12');
close(areaOut(12) / CIRCLE_AREA - 1, 0.0235, 5e-5, 'excesso citado para n=12');

// aposta: a área de dentro erra bem mais que o contorno
assert.ok(areaIn(12) / CIRCLE_AREA < perimeterIn(12) / CIRCLE_LENGTH, 'cobertura da área deve ficar abaixo da do contorno');

// desafio: hexágono de perímetro 12 e apótema raiz de 3
const hexSide = 2;
const hexApothem = Math.sqrt(3);
const hexAreaByFormula = 12 * hexApothem / 2;
const hexAreaByFan = 6 * (hexSide * hexApothem / 2);
close(6 * hexSide, 12, 1e-12, 'perímetro do hexágono do desafio');
close(hexAreaByFormula, 10.3923, 5e-5, 'área do hexágono do desafio');
close(hexAreaByFormula, hexAreaByFan, 1e-12, 'leque do hexágono do desafio');

// exercício "agora use a ideia": erro do contorno vs. erro da área em n=12 e n=24
const errPerim12 = 1 - perimeterIn(12) / CIRCLE_LENGTH;
const errArea12 = 1 - areaIn(12) / CIRCLE_AREA;
close(errPerim12, 0.01138, 5e-5, 'erro do contorno citado no exercício (n=12)');
close(errArea12, 0.04507, 5e-5, 'erro da área citado no exercício (n=12)');
const ratioAreaPerim12 = errArea12 / errPerim12;
assert.ok(ratioAreaPerim12 < 4, 'a razão em n=12 deve estar abaixo do limite 4');

const errPerim24 = 1 - perimeterIn(24) / CIRCLE_LENGTH;
const errArea24 = 1 - areaIn(24) / CIRCLE_AREA;
close(errPerim24, 0.00285, 5e-5, 'erro do contorno citado no exercício (n=24)');
close(errArea24, 0.01138, 5e-5, 'erro da área citado no exercício (n=24)');
const ratioAreaPerim24 = errArea24 / errPerim24;
assert.ok(ratioAreaPerim24 < 4, 'a razão em n=24 deve estar abaixo do limite 4');
assert.ok(ratioAreaPerim24 > ratioAreaPerim12, 'a razão deve se aproximar de 4 quando n aumenta');
assert.ok(4 - ratioAreaPerim24 < 4 - ratioAreaPerim12, 'n=24 deve estar mais perto de 4 que n=12');

console.log('Lab 03: 998 casos de área, o leque exato, o empate externo, a razão rumo a 4, o hexágono do desafio e o exercício da razão em n=12/24 verificados sem divergência.');
