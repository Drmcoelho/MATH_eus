import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const EPS = 1e-12;
const R = 1;

function close(actual, expected, tolerance = EPS, label = 'valor') {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: esperado ${expected}, obtido ${actual}`);
}

let previousRatio = 0;
for (let n = 3; n <= 120; n += 1) {
  const theta = Math.PI / n;
  const ratio = Math.cos(theta);
  const r = R * ratio;
  const halfSide = R * Math.sin(theta);
  const side = 2 * halfSide;

  assert.ok(ratio > 0 && ratio < 1, `r/R deve estar entre 0 e 1 para n=${n}`);
  assert.ok(ratio > previousRatio, `r/R deve crescer com n; falhou em n=${n}`);
  previousRatio = ratio;

  close(R ** 2, r ** 2 + halfSide ** 2, 1e-12, `Pitágoras n=${n}`);
  close(Math.sqrt(R ** 2 - (side / 2) ** 2), r, 1e-12, `apótema derivado do lado n=${n}`);
  close(Math.PI / Math.acos(ratio), n, 1e-10, `inferência inversa n=${n}`);

  const a1 = -Math.PI / 2 - theta;
  const a2 = -Math.PI / 2 + theta;
  const v1 = [R * Math.cos(a1), R * Math.sin(a1)];
  const v2 = [R * Math.cos(a2), R * Math.sin(a2)];
  const midpoint = [(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2];
  close(Math.hypot(midpoint[0], midpoint[1]), r, 1e-12, `distância ao ponto médio n=${n}`);
}

const N_MAX = 400;
function gap(n) {
  return Math.cos(Math.PI / (n + 1)) - Math.cos(Math.PI / n);
}
function reach(delta) {
  let last = 2;
  for (let n = 3; n <= N_MAX; n += 1) {
    if (gap(n) > 2 * delta) last = n;
    else break;
  }
  return last;
}
function compatibleRange(measured, delta) {
  let first = 0;
  let last = 0;
  for (let n = 3; n <= N_MAX; n += 1) {
    if (Math.abs(Math.cos(Math.PI / n) - measured) <= delta) {
      if (!first) first = n;
      last = n;
    } else if (first) break;
  }
  return first ? [first, last] : null;
}

let previousGap = Infinity;
for (let n = 3; n <= 200; n += 1) {
  const g = gap(n);
  assert.ok(g > 0, `o espaço entre marcas deve ser positivo em n=${n}`);
  assert.ok(g < previousGap, `o espaço entre marcas deve encolher; falhou em n=${n}`);
  previousGap = g;
}

for (const [delta, expected] of [[0.05, 4], [0.02, 5], [0.01, 7], [0.005, 9], [0.002, 12], [0.0016, 14]]) {
  assert.equal(reach(delta), expected, `alcance para δ=${delta}`);
}

for (const delta of [0.05, 0.02, 0.01, 0.005, 0.002]) {
  for (let n = 3; n <= 60; n += 1) {
    for (const fraction of [-0.99, 0, 0.62, 0.99]) {
      const measured = Math.cos(Math.PI / n) + fraction * delta;
      const range = compatibleRange(measured, delta);
      assert.ok(range, `deve existir intervalo compatível para n=${n}, δ=${delta}`);
      assert.ok(range[0] <= n && n <= range[1], `o n verdadeiro deve permanecer compatível em n=${n}`);
      for (let k = 3; k <= N_MAX; k += 1) {
        const inside = Math.abs(Math.cos(Math.PI / k) - measured) <= delta;
        const inRange = k >= range[0] && k <= range[1];
        assert.equal(inside, inRange, `intervalo exato falhou em k=${k}, n=${n}, δ=${delta}`);
      }
    }
  }
}

for (let n = 3; n <= 30; n += 1) {
  assert.deepEqual(compatibleRange(Math.cos(Math.PI / n), 1e-9), [n, n], `medida perfeita deve denunciar n=${n}`);
}

for (let n = 3; n <= 100000; n += 1) {
  assert.ok(Math.cos(Math.PI / n) < 1, `cos(pi/n) deve ficar abaixo de 1 em n=${n}`);
}
close(Math.cos(Math.PI / 1000000), 0.9999999999951, 5e-13, 'valor para um milhão de lados');
close(Math.cos(Math.PI / 4), Math.SQRT1_2, 1e-12, 'exercício do quadrado');
close(Math.cos(Math.PI / 8), 0.9238795325, 1e-10, 'exercício inverso do octógono');
close(Math.cos(Math.PI / 6), Math.sqrt(3) / 2, 1e-12, 'curiosidade do hexágono');

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const revealTag = html.match(/<button id="reveal"[^>]*>/)?.[0] || '';
assert.ok(revealTag, 'botão principal de revelação deve existir');
assert.ok(!/disabled/.test(revealTag), 'o botão principal não pode nascer desabilitado');
assert.ok(html.includes('Isto não termina depois do primeiro desenho'), 'mapa do percurso deve ser visível');
assert.ok(html.includes('<canvas id="ratio-chart"'), 'gráfico sincronizado deve existir');
assert.ok(html.includes('Sete passos, nenhum salto clandestino'), 'dedução desenhada deve existir');
assert.equal((html.match(/<button\b[^>]*data-ex=/g) || []).length, 12, 'quatro exercícios com três alternativas cada');
assert.equal((html.match(/class="curiosity"/g) || []).length, 4, 'quatro boxes de curiosidade');
assert.ok(html.includes('Agora o laboratório termina de verdade'), 'fechamento explícito deve existir');
assert.ok(html.includes('Sem uma segunda trava escondida'), 'a interface deve explicar a regra de revelação');
assert.ok(!html.includes('predicted && manipulated'), 'manipulação não pode ser uma trava oculta');
assert.ok(html.includes("sections.forEach(s=>s.hidden=false)"), 'uma única revelação deve abrir todos os atos posteriores');
assert.ok(html.includes('role="progressbar"'), 'progresso real deve ser visível');
assert.ok(html.includes('<canvas id="noise-chart"'), 'experimento com ruído deve ter figura própria');

const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] || '';
assert.ok(script.length > 1000, 'script interativo principal deve existir');
assert.doesNotThrow(() => new Function(script), 'JavaScript do laboratório deve ser sintaticamente válido');

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'IDs HTML devem ser únicos');


const chainBlock = html.match(/<ol id="chain" class="chain">([\s\S]*?)<\/ol>/)?.[1] || '';
assert.equal((chainBlock.match(/<li>/g) || []).length, 7, 'Ato 3 deve conter sete passos');
assert.ok(html.indexOf('id="step-dots"') < html.indexOf('<ol id="chain"'), 'navegação deve aparecer antes do cartão ativo');
assert.ok(html.includes('id="deriv-caption"'), 'figura deve explicar visualmente cada passo');
assert.ok(html.includes('id="deriv-conclusion" hidden'), 'fórmula e prova devem nascer ocultas');
assert.ok(html.includes("$('#deriv-conclusion').hidden=derivStep!==6"), 'conclusão só deve abrir no passo 7');
assert.ok(html.includes('li.hidden=i!==derivStep'), 'somente o passo ativo deve permanecer visível');
assert.ok(html.includes('const V1=polar') && html.includes('const V2=polar'), 'ângulo central deve ter dois raios reais');
assert.ok(html.includes('arcPath(72,-Math.PI/2-t,-Math.PI/2+t)'), 'arco 2π/n deve ser desenhado, não apenas rotulado');
assert.ok(html.includes('L/2') && html.includes('hipotenusa = R'), 'ponto médio e triângulo devem ter testemunhas visuais');

console.log('Lab 01: 118 geometrias, inferência inversa, ruído, alcance, 4 exercícios, 4 curiosidades, dois Canvas, sintaxe JS e contrato sem porta falsa verificados.');
