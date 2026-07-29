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

console.log('Lab 01: 118 casos geométricos verificados sem divergência.');
