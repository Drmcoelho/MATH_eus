import assert from 'node:assert/strict';

const EPS = 1e-12;
const R = 1;

function close(actual, expected, tolerance = EPS, label = 'valor') {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

function vertices(radius, n, start) {
  return Array.from({ length: n }, (_, i) => {
    const angle = start + (2 * Math.PI * i) / n;
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
  });
}

function sideMidpoints(points) {
  const n = points.length;
  return points.map((p, i) => {
    const q = points[(i + 1) % n];
    return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  });
}

// O polígono escondido, construído por coordenadas: os pontos médios dos lados
// (= pontos de tangência) formam um polígono regular de circunraio r = R·cos(pi/n),
// girado pi/n, com lado L' = L·cos(pi/n).

for (let n = 3; n <= 120; n += 1) {
  const theta = Math.PI / n;
  const factor = Math.cos(theta);
  const L = 2 * R * Math.sin(theta);

  const outer = vertices(R, n, -Math.PI / 2 - theta);
  const hidden = sideMidpoints(outer);

  for (const point of hidden) {
    close(Math.hypot(point[0], point[1]), R * factor, 1e-12, `circunraio do escondido n=${n}`);
  }

  for (let i = 0; i < n; i += 1) {
    const p = hidden[i];
    const q = hidden[(i + 1) % n];
    const sideHidden = Math.hypot(p[0] - q[0], p[1] - q[1]);
    close(sideHidden, L * factor, 1e-12, `L' = L·cos(pi/n) n=${n}, lado ${i}`);
  }

  const angleFirst = Math.atan2(hidden[0][1], hidden[0][0]);
  close(angleFirst, -Math.PI / 2, 1e-12, `giro de meio passo n=${n}`);

  // Semelhança dos triângulos gêmeos: L'/L = r/R.
  const sideHidden = Math.hypot(hidden[0][0] - hidden[1][0], hidden[0][1] - hidden[1][1]);
  close(sideHidden / L, factor, 1e-12, `L'/L = r/R n=${n}`);

  // Coroa: pi(R² − r²) = pi(L/2)².
  const ring = Math.PI * (R ** 2 - (R * factor) ** 2);
  close(ring, Math.PI * (L / 2) ** 2, 1e-12, `área da coroa n=${n}`);
}

// Iteração da construção por coordenadas: após k repetições o circunraio é
// R·cos^k(pi/n) e o giro acumulado é k·pi/n.

for (const n of [3, 4, 5, 6, 8, 12, 24]) {
  const theta = Math.PI / n;
  const factor = Math.cos(theta);
  let polygon = vertices(R, n, -Math.PI / 2 - theta);

  for (let k = 1; k <= 12; k += 1) {
    polygon = sideMidpoints(polygon);
    const radius = Math.hypot(polygon[0][0], polygon[0][1]);
    close(radius, R * factor ** k, 1e-10, `raio após k=${k} repetições, n=${n}`);

    const angle = Math.atan2(polygon[0][1], polygon[0][0]);
    const expected = -Math.PI / 2 - theta + k * theta;
    const diff = Math.atan2(Math.sin(angle - expected), Math.cos(angle - expected));
    close(diff, 0, 1e-10, `giro acumulado k=${k}, n=${n}`);
  }

  // Dois meios passos somam um passo inteiro: o nível k+2 tem a orientação do nível k.
  close((2 * theta) % (2 * Math.PI / n), 0, 1e-12, `alinhamento avô–neto n=${n}`);
}

// Quadrado: duas repetições dão exatamente metade do raio.
close(Math.cos(Math.PI / 4) ** 2, 0.5, 1e-12, 'quadrado: cos²(pi/4) = 1/2');

// Repetições até o raio cair à metade (mesma rotina do laboratório).

function halvingSteps(n) {
  const factor = Math.cos(Math.PI / n);
  let radius = 1;
  let k = 0;
  while (radius > 0.5 + 1e-12) {
    radius *= factor;
    k += 1;
  }
  return k;
}

const expectedHalving = [[3, 1], [4, 2], [5, 4], [6, 5], [8, 9], [12, 20], [24, 81], [48, 324]];
for (const [n, expected] of expectedHalving) {
  assert.equal(halvingSteps(n), expected, `repetições até a metade para n=${n}`);
}

for (const [n, expected] of expectedHalving) {
  const k = halvingSteps(n);
  const factor = Math.cos(Math.PI / n);
  assert.ok(factor ** k <= 0.5 + 1e-9, `cos^k deve estar abaixo de 1/2 em n=${n}`);
  if (k > 1) {
    assert.ok(factor ** (k - 1) > 0.5 - 1e-9, `k deve ser mínimo em n=${n}`);
  }
  assert.equal(k, expected, `tabela do laboratório em n=${n}`);
}

let previousSteps = 0;
for (let n = 3; n <= 200; n += 1) {
  const k = halvingSteps(n);
  assert.ok(k >= previousSteps, `repetições até a metade não podem cair; falhou em n=${n}`);
  previousSteps = k;
}

// Dobrar n multiplica as repetições por ~4 e divide a folga por ~4.
for (const n of [6, 12, 24, 48, 96]) {
  const stepRatio = halvingSteps(2 * n) / halvingSteps(n);
  assert.ok(stepRatio > 3.5 && stepRatio < 4.5, `razão de repetições ao dobrar n=${n}: ${stepRatio}`);

  const gap = m => 1 - Math.cos(Math.PI / m);
  const gapRatio = gap(n) / gap(2 * n);
  assert.ok(gapRatio > 3.5 && gapRatio < 4.5, `razão da folga ao dobrar n=${n}: ${gapRatio}`);
}

// Valores da tabela do gráfico (4 casas, R = 1).
const expectedGaps = [[6, 0.1340], [12, 0.0341], [24, 0.0086], [48, 0.0021]];
for (const [n, expected] of expectedGaps) {
  close(1 - Math.cos(Math.PI / n), expected, 5e-5, `folga tabelada n=${n}`);
}

// As três curvas do gráfico: folga e coroa estritamente decrescentes, positivas.
let previousGap = Infinity;
let previousRing = Infinity;
for (let n = 3; n <= 200; n += 1) {
  const gap = 1 - Math.cos(Math.PI / n);
  const ring = Math.PI * (1 - Math.cos(Math.PI / n) ** 2);
  assert.ok(gap > 0 && gap < previousGap, `folga deve decrescer; falhou em n=${n}`);
  assert.ok(ring > 0 && ring < previousRing, `coroa deve decrescer; falhou em n=${n}`);
  previousGap = gap;
  previousRing = ring;
}

// Exemplo do segredo: n = 6 dá coroa pi/4, a área do círculo de raio 1/2.
close(Math.PI * (1 - Math.cos(Math.PI / 6) ** 2), Math.PI / 4, 1e-12, 'coroa do hexágono');

// Exercício 1: hexágono com k = 2 dá raio exato 3/4; os distratores são k = 1 e k = 3.
close(Math.cos(Math.PI / 6) ** 2, 0.75, 1e-12, 'hexágono: cos²(pi/6) = 3/4');
close(Math.cos(Math.PI / 6), 0.8660, 5e-5, 'distrator k=1');
close(Math.cos(Math.PI / 6) ** 3, 0.6495, 5e-5, 'distrator k=3');

// Exercício 2: a meia-vida se repete a partir de qualquer andar, e o raio nunca zera.
const c5 = Math.cos(Math.PI / 6) ** 5;
const c10 = Math.cos(Math.PI / 6) ** 10;
close(c5, 0.4871, 5e-5, 'raio do hexágono em k=5');
close(c10, 0.2373, 5e-5, 'raio do hexágono em k=10');
close(c10, c5 * c5, 1e-12, 'os 5 andares seguintes multiplicam pelo mesmo fator');
assert.ok(Math.abs(c10 / c5 - 0.5) < 0.02, 'de k=5 para k=10 o raio cai a ≈ metade de novo');
for (let n = 3; n <= 60; n += 1) {
  assert.ok(Math.cos(Math.PI / n) ** 1000 > 0, `o raio nunca chega a zero; falhou em n=${n}`);
}

// Exercício 3: só o hexágono tem meio lado 1/2 (coroa = área do círculo de raio 1/2).
close(Math.sin(Math.PI / 6), 0.5, 1e-12, 'hexágono: L/2 = 1/2');
close(Math.sin(Math.PI / 4), 0.7071, 5e-5, 'quadrado: L/2 ≈ 0,7071');
close(Math.sin(Math.PI / 8), 0.3827, 5e-5, 'octógono: L/2 ≈ 0,3827');
for (let n = 3; n <= 200; n += 1) {
  if (n !== 6) {
    assert.ok(Math.abs(Math.sin(Math.PI / n) - 0.5) > 1e-9, `só n=6 pode dar L/2 = 1/2; falhou em n=${n}`);
  }
}

// Espiral com n crescente (3, 4, 5, …): o produto converge para a constante
// de Kepler–Bouwkamp ≈ 0,1149, sem ir a zero.
let product = 1;
let previousProduct = Infinity;
for (let n = 3; n <= 100000; n += 1) {
  product *= Math.cos(Math.PI / n);
  assert.ok(product < previousProduct, `o produto deve decrescer; falhou em n=${n}`);
  previousProduct = product;
}
assert.ok(product > 0.11, 'o produto não pode ir a zero');
close(product, 0.1149420448, 1e-4, 'constante de Kepler–Bouwkamp');

console.log('Lab 01·B: polígono escondido por coordenadas (118 casos), espiral iterada, repetições até a metade, curvas do gráfico, exercícios e produto de Kepler–Bouwkamp verificados sem divergência.');
