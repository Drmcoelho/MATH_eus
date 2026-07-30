import assert from 'node:assert/strict';

const EPS = 1e-12;
const R = 1;

function close(actual, expected, tolerance = EPS, label = 'valor') {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
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

  const rFromSide = Math.sqrt(R ** 2 - (side / 2) ** 2);
  close(rFromSide, r, 1e-12, `apótema derivado do lado n=${n}`);

  const recoveredN = Math.PI / Math.acos(ratio);
  close(recoveredN, n, 1e-10, `inferência inversa n=${n}`);

  const a1 = -Math.PI / 2 - theta;
  const a2 = -Math.PI / 2 + theta;
  const v1 = [R * Math.cos(a1), R * Math.sin(a1)];
  const v2 = [R * Math.cos(a2), R * Math.sin(a2)];
  const midpoint = [(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2];
  const midpointDistance = Math.hypot(midpoint[0], midpoint[1]);
  close(midpointDistance, r, 1e-12, `distância ao ponto médio n=${n}`);
}

// Ruído de medição: uma medida m com erro máximo delta é compatível com todo n
// tal que |cos(pi/n) - m| <= delta. Como cos(pi/n) é estritamente crescente,
// o conjunto compatível é um intervalo contíguo de valores de n.

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
    } else if (first) {
      break;
    }
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

const expectedReach = [[0.05, 4], [0.02, 5], [0.01, 7], [0.005, 9], [0.002, 12], [0.0016, 14]];
for (const [delta, expected] of expectedReach) {
  assert.equal(reach(delta), expected, `alcance para δ=${delta}`);
}

for (const delta of [0.05, 0.02, 0.01, 0.005, 0.002]) {
  for (let n = 3; n <= 60; n += 1) {
    for (const fraction of [-0.99, 0, 0.62, 0.99]) {
      const measured = Math.cos(Math.PI / n) + fraction * delta;
      const range = compatibleRange(measured, delta);
      assert.ok(range, `deve existir intervalo compatível para n=${n}, δ=${delta}`);
      assert.ok(
        range[0] <= n && n <= range[1],
        `o n verdadeiro deve estar no intervalo; falhou em n=${n}, δ=${delta}, fração=${fraction}`
      );
      for (let k = 3; k <= N_MAX; k += 1) {
        const inside = Math.abs(Math.cos(Math.PI / k) - measured) <= delta;
        const inRange = k >= range[0] && k <= range[1];
        assert.equal(
          inside,
          inRange,
          `intervalo deve ser exatamente o conjunto compatível; falhou em k=${k}, n=${n}, δ=${delta}`
        );
      }
    }
  }
}

for (let n = 3; n <= 30; n += 1) {
  const range = compatibleRange(Math.cos(Math.PI / n), 1e-9);
  assert.deepEqual(range, [n, n], `medida perfeita deve denunciar n=${n} sem ambiguidade`);
}

// exercício "quebre a regra": r/R = cos(pi/n) nunca atinge 1 para n finito,
// mas se aproxima arbitrariamente — inclusive em n=1.000.000.
for (let n = 3; n <= 100000; n += 1) {
  assert.ok(Math.cos(Math.PI / n) < 1, `cos(pi/n) deve ficar estritamente abaixo de 1 em n=${n}`);
}
close(Math.cos(Math.PI / 1000000), 0.9999999999951, 5e-13, 'valor citado no exercício para n=1.000.000');
assert.ok(1 - Math.cos(Math.PI / 1000000) > 0, 'a folga nunca fecha, mesmo em n=1.000.000');

console.log('Lab 01: geometria (118 casos), alcances por tolerância, intervalos de compatibilidade e o exercício de r/R nunca atingir 1 verificados sem divergência.');
