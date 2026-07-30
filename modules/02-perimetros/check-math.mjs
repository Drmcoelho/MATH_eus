import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const CIRCLE = 2 * Math.PI;
const close = (actual, expected, tolerance, label) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: esperado ${expected}, obtido ${actual}`);

const perimeterIn = n => 2 * n * Math.sin(Math.PI / n);
const perimeterOut = n => 2 * n * Math.tan(Math.PI / n);
const sideIn = n => 2 * Math.sin(Math.PI / n);
const sideOut = n => 2 * Math.tan(Math.PI / n);

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

  assert.ok(pin < CIRCLE, `contorno interno abaixo do círculo em n=${n}`);
  assert.ok(pout > CIRCLE, `contorno externo acima do círculo em n=${n}`);
  assert.ok(pin > previousIn, `contorno interno crescente em n=${n}`);
  assert.ok(pout < previousOut, `contorno externo decrescente em n=${n}`);
  assert.ok(ratio > 2, `razão dos erros acima de 2 em n=${n}`);
  assert.ok(ratio < previousRatio, `razão dos erros decrescente em n=${n}`);

  close(Math.sin(theta) ** 2 + Math.cos(theta) ** 2, 1, 1e-12, `Pitágoras n=${n}`);
  close(pout, 2 * n * (Math.sin(theta) / Math.cos(theta)), 1e-9, `tangente n=${n}`);

  previousIn = pin;
  previousOut = pout;
  previousRatio = ratio;
}

close(previousRatio, 2, 1e-4, 'razão dos erros em n=1000');
assert.ok(perimeterIn(11) < 6.2, '11 lados ainda não passam 6,2');
assert.ok(perimeterIn(12) > 6.2, '12 lados passam 6,2');
close(perimeterIn(12), 6.2117, 5e-5, 'n=12');
close(perimeterIn(11), 6.1981, 5e-5, 'n=11');
close(perimeterIn(6), 6, 1e-12, 'hexágono interno');
close(perimeterOut(6), 6.9282, 5e-5, 'hexágono externo');
close((perimeterOut(6)-CIRCLE)/(CIRCLE-perimeterIn(6)), 2.2777, 5e-5, 'razão inicial');
close(sideOut(12)/sideIn(12), 1/Math.cos(Math.PI/12), 1e-12, 'razão dos lados');
close(sideOut(12)/sideIn(12), 1.0353, 5e-5, 'razão dos lados em n=12');

const halfIn96 = perimeterIn(96)/2;
const halfOut96 = perimeterOut(96)/2;
assert.ok(halfIn96 < Math.PI && Math.PI < halfOut96, 'π cercado em n=96');
close(halfIn96, 3.14103, 5e-6, 'cota interna de Arquimedes');
close(halfOut96, 3.14271, 5e-6, 'cota externa de Arquimedes');

for (const n of [12, 24, 48, 96]) {
  const eIn = CIRCLE - perimeterIn(n);
  const eIn2 = CIRCLE - perimeterIn(2*n);
  const eOut = perimeterOut(n) - CIRCLE;
  const eOut2 = perimeterOut(2*n) - CIRCLE;
  assert.ok(eIn2/eIn > 0.24 && eIn2/eIn < 0.26, `erro interno ~1/4 ao dobrar n=${n}`);
  assert.ok(eOut2/eOut > 0.24 && eOut2/eOut < 0.26, `erro externo ~1/4 ao dobrar n=${n}`);
}

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const revealTag = html.match(/<button id="reveal"[^>]*>/)?.[0] || '';
assert.ok(revealTag && !/disabled/.test(revealTag), 'botão principal não nasce desabilitado');
assert.ok(html.includes('O segundo laboratório continua a mesma linguagem'), 'mapa canônico visível');
assert.ok(html.includes('<canvas id="perimeter-chart"'), 'gráfico dos três contornos');
assert.ok(html.includes('<canvas id="error-chart"'), 'gráfico dos erros');
assert.equal((html.match(/<button data-ex="/g) || []).length, 12, 'quatro exercícios com três alternativas');
assert.equal((html.match(/class="curiosity"/g) || []).length, 4, 'quatro curiosidades');
assert.equal((html.match(/<li data-step="/g) || []).length, 8, 'dedução em oito passos');
assert.ok(html.includes('(2π/n)/2 = 2π/(2n) = π/n'), 'meia-fatia explicada sem salto');
assert.ok(html.includes('triângulo isósceles'), 'fundamento isósceles explícito');
assert.ok(html.includes('chain.forEach((li,i)=>li.hidden=i!==derivStep)'), 'um único passo ativo');
assert.ok(html.includes("$('#deriv-result').hidden=derivStep!==7"), 'fórmulas só após fechar a corrente');
assert.ok(html.includes('role="progressbar"'), 'progresso real');
assert.ok(html.includes('Agora o Lab 02 termina no mesmo idioma'), 'fechamento explícito');
assert.ok(!html.includes('predicted && manipulated'), 'sem trava invisível');
assert.ok(html.includes('sections.forEach(s=>s.hidden=false)'), 'uma revelação abre os atos');

console.log('Lab 02: 998 cercos, assimetria dos erros, Arquimedes, quatro exercícios, dois Canvas e contrato canônico verificados.');
