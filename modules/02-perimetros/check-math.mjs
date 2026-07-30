import assert from 'node:assert/strict';

// Lab 02: para um círculo de raio R = 1 cercado por polígonos regulares de n
// lados, o inscrito tem contorno 2n·sen(pi/n) e o circunscrito 2n·tg(pi/n).
// O círculo fica preso entre os dois, os erros encolhem e a razão entre o erro
// externo e o interno desce em direção a 2.

const CIRCLE = 2 * Math.PI;

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

function perimeterIn(n) {
  return 2 * n * Math.sin(Math.PI / n);
}

function perimeterOut(n) {
  return 2 * n * Math.tan(Math.PI / n);
}

let previousIn = 0;
let previousOut = Infinity;
let previousRatio = Infinity;

for (let n = 3; n <= 1000; n += 1) {
  const theta = Math.PI / n;
  const pin = perimeterIn(n);
  const pout = perimeterOut(n);
  const errorIn = CIRCLE - pin;
  const errorOut = pout - CIRCLE;
  const ratio = errorOut / errorIn;

  assert.ok(pin < CIRCLE, `contorno interno deve ficar abaixo do círculo em n=${n}`);
  assert.ok(pout > CIRCLE, `contorno externo deve ficar acima do círculo em n=${n}`);
  assert.ok(pin > previousIn, `contorno interno deve crescer com n; falhou em n=${n}`);
  assert.ok(pout < previousOut, `contorno externo deve decrescer com n; falhou em n=${n}`);
  previousIn = pin;
  previousOut = pout;

  // consistência com o triângulo fundamental do Lab 01: L/2 = sen(θ) e
  // apótema r = cos(θ) fecham Pitágoras com hipotenusa 1
  const halfSide = Math.sin(theta);
  const apothem = Math.cos(theta);
  close(halfSide ** 2 + apothem ** 2, 1, 1e-12, `Pitágoras n=${n}`);

  // lado externo a partir da tangência: L_out/2 = tg(θ) com cateto adjacente 1
  close(pout, 2 * n * (halfSide / apothem), 1e-9, `lado externo via tangente n=${n}`);

  assert.ok(ratio > 2, `a razão dos erros deve ficar acima de 2; falhou em n=${n}`);
  assert.ok(ratio < previousRatio, `a razão dos erros deve decrescer; falhou em n=${n}`);
  previousRatio = ratio;
}

close(previousRatio, 2, 1e-4, 'razão dos erros em n=1000 deve estar colada em 2');

// desafio da página: 12 é o menor n com contorno interno acima de 6,2
assert.ok(perimeterIn(11) < 6.2, '11 lados ainda não passam de 6,2');
assert.ok(perimeterIn(12) > 6.2, '12 lados passam de 6,2');
close(perimeterIn(12), 6.2117, 5e-5, 'valor citado para n=12');
close(perimeterIn(11), 6.1981, 5e-5, 'valor citado para n=11');
close(perimeterIn(8), 6.1229, 5e-5, 'valor citado para n=8');

// medidas iniciais exibidas no painel (n = 6)
close(perimeterIn(6), 6, 1e-12, 'contorno interno do hexágono');
close(perimeterOut(6), 6.9282, 5e-5, 'contorno externo do hexágono');
close(CIRCLE - perimeterIn(6), 0.2832, 5e-5, 'erro interno do hexágono');
close(perimeterOut(6) - CIRCLE, 0.6450, 5e-5, 'erro externo do hexágono');
close((perimeterOut(6) - CIRCLE) / (CIRCLE - perimeterIn(6)), 2.2777, 5e-5, 'razão do hexágono');

// Arquimedes, n = 96: semiperímetros prendem pi entre 3 + 10/71 e 3 + 1/7
const halfIn96 = perimeterIn(96) / 2;
const halfOut96 = perimeterOut(96) / 2;
assert.ok(halfIn96 > 3 + 10 / 71, 'semiperímetro interno deve superar 223/71');
assert.ok(halfOut96 < 3 + 1 / 7, 'semiperímetro externo deve ficar abaixo de 22/7');
assert.ok(halfIn96 < Math.PI && Math.PI < halfOut96, 'pi deve ficar preso entre os dois');
close(halfIn96, 3.14103, 5e-6, 'valor citado para o cerco interno de Arquimedes');
close(halfOut96, 3.14271, 5e-6, 'valor citado para o cerco externo de Arquimedes');

// exercício "encontre o erro": a razão dos LADOS tende a 1 (= R/r do Lab 01),
// bem diferente da razão dos ERROS, que tende a 2.
function sideIn(n) { return 2 * Math.sin(Math.PI / n); }
function sideOut(n) { return 2 * Math.tan(Math.PI / n); }

for (const n of [12, 24]) {
  const theta = Math.PI / n;
  const sideRatio = sideOut(n) / sideIn(n);
  close(sideRatio, 1 / Math.cos(theta), 1e-12, `razão dos lados = R/r em n=${n}`);
}
close(sideOut(12) / sideIn(12), 1.0353, 5e-5, 'razão dos lados citada no exercício (n=12)');
close(sideIn(12), 0.5176, 5e-5, 'lado de dentro citado no exercício (n=12)');
close(sideOut(12), 0.5359, 5e-5, 'lado de fora citado no exercício (n=12)');

let previousSideRatio = Infinity;
for (let n = 3; n <= 5000; n += 1) {
  const r = sideOut(n) / sideIn(n);
  assert.ok(r > 1, `razão dos lados deve ficar acima de 1; falhou em n=${n}`);
  assert.ok(r < previousSideRatio, `razão dos lados deve decrescer; falhou em n=${n}`);
  previousSideRatio = r;
}
close(previousSideRatio, 1, 1e-6, 'razão dos lados em n=5000 deve estar colada em 1 (não em 2)');

console.log('Lab 02: 998 casos de cerco, o desafio de 6,2, as cotas de Arquimedes e o exercício da razão dos lados (→1, não →2) verificados sem divergência.');
