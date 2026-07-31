import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const PI = Math.PI;
const areaIn = (n, r = 1) => (n * r * r / 2) * Math.sin(2 * PI / n);
const areaOut = (n, r = 1) => n * r * r * Math.tan(PI / n);
const perimeterIn = (n, r = 1) => 2 * n * r * Math.sin(PI / n);
const perimeterOut = (n, r = 1) => 2 * n * r * Math.tan(PI / n);
const close = (actual, expected, tolerance, label) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: esperado ${expected}, obtido ${actual}`);

let previousIn = 0;
let previousOut = Infinity;
let previousCrossRatio = 0;
let previousAreaRatio = 0;

for (let n = 3; n <= 1000; n += 1) {
  const theta = PI / n;
  const ain = areaIn(n);
  const aout = areaOut(n);
  const circle = PI;
  const errorIn = circle - ain;
  const errorOut = aout - circle;

  assert.ok(ain < circle, `área interna deve ficar abaixo do círculo em n=${n}`);
  assert.ok(aout > circle, `área externa deve ficar acima do círculo em n=${n}`);
  assert.ok(ain > previousIn, `área interna deve crescer em n=${n}`);
  assert.ok(aout < previousOut, `área externa deve decrescer em n=${n}`);
  previousIn = ain;
  previousOut = aout;

  close(ain, perimeterIn(n) * Math.cos(theta) / 2, 1e-12, `leque interno n=${n}`);
  close(aout, perimeterOut(n) / 2, 1e-12, `leque externo n=${n}`);
  close(aout / circle, perimeterOut(n) / (2 * PI), 1e-14, `igualdade relativa externa n=${n}`);

  const relativeAreaIn = errorIn / circle;
  const relativePerimeterIn = (2 * PI - perimeterIn(n)) / (2 * PI);
  const crossRatio = relativeAreaIn / relativePerimeterIn;
  assert.ok(crossRatio > previousCrossRatio, `razão área/perímetro interna deve crescer em n=${n}`);
  assert.ok(crossRatio < 4, `razão área/perímetro interna deve ficar abaixo de 4 em n=${n}`);
  previousCrossRatio = crossRatio;

  const areaRatio = errorIn / errorOut;
  assert.ok(areaRatio > previousAreaRatio, `razão falta/sobra deve crescer em n=${n}`);
  assert.ok(areaRatio < 2, `razão falta/sobra deve ficar abaixo de 2 em n=${n}`);
  previousAreaRatio = areaRatio;
}

close(previousCrossRatio, 4, 1e-3, 'razão dos erros relativos internos em n=1000');
close(previousAreaRatio, 2, 2e-5, 'razão falta interna/sobra externa em n=1000');
close(2 * PI * 1 / 2, PI, 1e-15, 'círculo como leque-limite');

close(areaIn(12), 3, 1e-12, 'área interna do dodecágono');
close(areaOut(12), 3.2154, 5e-5, 'área externa do dodecágono');
close(Math.cos(PI / 12), 0.9659, 5e-5, 'apótema do dodecágono');
close(areaIn(12) / PI, 0.9549, 5e-5, 'cobertura da área interna');
close((PI - areaIn(12)) / (areaOut(12) - PI), 1.9187, 5e-5, 'razão falta/sobra em n=12');

const hexArea = 12 * Math.sqrt(3) / 2;
close(hexArea, 10.3923, 5e-5, 'hexágono por perímetro e apótema');

for (const n of [6, 12, 24, 48, 96]) {
  for (const r of [0.5, 1, 1.3, 2]) {
    close(areaIn(n, 2 * r), 4 * areaIn(n, r), 1e-11, `escala interna n=${n}, r=${r}`);
    close(areaOut(n, 2 * r), 4 * areaOut(n, r), 1e-11, `escala externa n=${n}, r=${r}`);
    close(PI * (2 * r) ** 2 - areaIn(n, 2 * r), 4 * (PI * r ** 2 - areaIn(n, r)), 1e-11, `erro interno escala n=${n}`);
  }
}

const e12 = PI - areaIn(12);
const e24 = PI - areaIn(24);
assert.ok(Math.abs(e24 / e12 - 0.25) < 0.01, 'dobrar n deve reduzir o erro interno para perto de 1/4');

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const js = await readFile(new URL('./lab.js', import.meta.url), 'utf8');
assert.ok(html.includes('Uma figura, três comparações, seis atos'), 'mapa do percurso deve existir');
assert.ok(html.includes('role="progressbar"'), 'progresso real deve existir');
assert.equal((html.match(/<li data-step=/g) || []).length, 9, 'Ato 3 deve ter nove passos');
assert.equal((html.match(/data-ex="/g) || []).length, 12, 'quatro exercícios com três alternativas');
assert.equal((html.match(/class="curiosity"/g) || []).length, 4, 'quatro curiosidades');
assert.equal((html.match(/<canvas /g) || []).length, 3, 'três Canvas calculados');
assert.ok(html.includes('Ato 5 · anatomia do erro'), 'anatomia do erro deve existir');
assert.ok(html.includes('Oficina — constantes assintóticas'), 'Oficina assintótica deve existir');
assert.ok(html.includes('link rel="icon"'), 'favicon explícito deve existir');
assert.ok(!html.includes('disabled>1. Faça uma aposta'), 'botão principal não pode nascer desabilitado');
assert.ok(js.includes("sections.forEach(s=>s.hidden=false)"), 'uma revelação deve abrir todos os atos');
assert.ok(js.includes("chain.forEach((li,i)=>li.hidden=i!==derivStep)"), 'somente um passo deve ficar ativo');
assert.ok(js.includes("$('#deriv-result').hidden=derivStep!==8"), 'fórmulas devem nascer apenas no passo 9');
assert.ok(html.includes('id="compare-scale"'), 'escala deve exigir uma ação explícita');
assert.ok(js.includes("$('#error-n').oninput=()=>{checkpoints.audited=true"), 'auditoria só deve contar após manipulação');
assert.ok(js.includes("$('#compare-scale').onclick=()=>{checkpoints.scaled=true"), 'escala só deve contar após execução explícita');
assert.ok(!js.includes('checkpoints.audited=true;progress()}'), 'renderização inicial não pode creditar auditoria');
assert.ok(!js.includes("x.textAlign='start';checkpoints.scaled=true"), 'renderização inicial não pode creditar escala');
assert.doesNotThrow(() => new Function(js), 'JavaScript deve ser sintaticamente válido');

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs HTML devem ser únicos');

console.log('Lab 03: 998 cercos de área, leques exatos, três assimetrias, escala quadrática, 4 exercícios, 4 curiosidades, 3 Canvas e contrato canônico verificados.');
