import assert from 'node:assert/strict';

// T02 Lab 04: a falta (hipotenusa − cateto maior) de uma terna primitiva é
// sempre (m − k)² — quadrado ímpar — ou 2k² — dobro de quadrado. Nenhum outro
// valor ocorre em primitivas; as cópias preenchem todos os valores, porque
// d × (3, 4, 5) tem falta d. Catetos gêmeos (diferença 1 entre catetos)
// correspondem à equação de Pell (m − k)² − 2k² = ±1.

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function primitives(maxC) {
  const list = [];
  for (let m = 2; m * m + 1 <= maxC; m += 1) {
    for (let k = 1; k < m; k += 1) {
      if (gcd(m, k) !== 1 || (m + k) % 2 === 0) continue;
      const c = m * m + k * k;
      if (c > maxC) continue;
      const legs = [m * m - k * k, 2 * m * k].sort((p, q) => p - q);
      list.push({ a: legs[0], b: legs[1], c, m, k, diff: c - legs[1] });
    }
  }
  return list.sort((p, q) => p.c - q.c);
}

function isAllowed(v) {
  const s = Math.round(Math.sqrt(v));
  if (s * s === v && s % 2 === 1) return true;
  if (v % 2 === 0) {
    const h = v / 2;
    const r = Math.round(Math.sqrt(h));
    if (r * r === h) return true;
  }
  return false;
}

const prims5000 = primitives(5000);

// 1. Toda falta de primitiva segue a regra das duas vias — e a fórmula
//    lida do endereço bate com a falta observada.
for (const t of prims5000) {
  assert.ok(isAllowed(t.diff), `falta proibida ${t.diff} em (${t.a}, ${t.b}, ${t.c})`);
  const expected = 2 * t.m * t.k > t.m * t.m - t.k * t.k
    ? (t.m - t.k) ** 2
    : 2 * t.k * t.k;
  assert.equal(t.diff, expected, `fórmula da falta falhou em (${t.m}, ${t.k})`);
  assert.equal((t.m - t.k) % 2, 1, `m − k deve ser ímpar em (${t.m}, ${t.k})`);
}

// 2. As nove presentes até 50 aparecem já com teto 500 — e a lista não muda
//    com teto 2.000. Nenhuma proibida aparece nunca.
const expectedPresent = [1, 2, 8, 9, 18, 25, 32, 49, 50];
for (const ceiling of [500, 2000]) {
  const present = [...new Set(
    prims5000.filter(t => t.c <= ceiling && t.diff <= 50).map(t => t.diff)
  )].sort((p, q) => p - q);
  assert.deepEqual(present, expectedPresent, `presentes até 50 com teto ${ceiling}`);
}
for (let v = 1; v <= 50; v += 1) {
  const occurs = prims5000.some(t => t.diff === v);
  assert.equal(occurs, isAllowed(v), `ocorrência da falta ${v} diverge da regra`);
}

// 3. Contagens citadas no painel: 80 primitivas com teto 500, 319 com 2.000;
//    a menor ausente entre primitivas é 3.
assert.equal(prims5000.filter(t => t.c <= 500).length, 80, '80 primitivas até 500');
assert.equal(prims5000.filter(t => t.c <= 2000).length, 319, '319 primitivas até 2.000');
assert.ok(!isAllowed(3) && !isAllowed(4) && !isAllowed(12) && !isAllowed(27), '3, 4, 12 e 27 são proibidas');

// 4. Primeiras ocorrências citadas na página.
const firstByDiff = new Map();
for (const t of prims5000) {
  if (!firstByDiff.has(t.diff)) firstByDiff.set(t.diff, t);
}
const citedFirsts = [
  [1, [3, 4, 5], [2, 1]],
  [2, [8, 15, 17], [4, 1]],
  [8, [20, 21, 29], [5, 2]],
  [18, [48, 55, 73], [8, 3]],
  [25, [65, 72, 97], [9, 4]],
  [49, [119, 120, 169], [12, 5]]
];
for (const [v, [a, b, c], [m, k]] of citedFirsts) {
  const t = firstByDiff.get(v);
  assert.deepEqual([t.a, t.b, t.c], [a, b, c], `primeira primitiva com falta ${v}`);
  assert.deepEqual([t.m, t.k], [m, k], `endereço da primeira falta ${v}`);
}

// 5. As cópias preenchem tudo: (3v, 4v, 5v) tem falta v; com teto 500,
//    todas as faltas de 1 a 50 aparecem quando as cópias entram.
for (let v = 1; v <= 60; v += 1) {
  assert.equal(5 * v - 4 * v, v, `cópia (3v, 4v, 5v) deve ter falta ${v}`);
  assert.equal((3 * v) ** 2 + (4 * v) ** 2, (5 * v) ** 2, `cópia de fator ${v} fecha Pitágoras`);
}
{
  const seen = new Set();
  for (const t of prims5000) {
    for (let d = 1; d * t.c <= 500; d += 1) {
      const diff = d * t.diff;
      if (diff <= 50) seen.add(diff);
    }
  }
  assert.equal(seen.size, 50, 'com cópias e teto 500, as 50 faltas devem aparecer');
}

// 6. O exemplo por inspeção do Entenda: (5, 12, 13) em (3, 2) com falta 1;
//    (20, 21, 29) em (5, 2) com falta 8 = 2 · 2².
{
  const t1 = prims5000.find(t => t.c === 13);
  assert.deepEqual([t1.m, t1.k, t1.diff], [3, 2, 1], 'exemplo (5, 12, 13)');
  const t2 = prims5000.find(t => t.c === 29);
  assert.deepEqual([t2.m, t2.k, t2.diff], [5, 2, 8], 'exemplo (20, 21, 29)');
  assert.equal(2 * 2 * 2, 8, 'falta 8 é 2 · 2²');
}

// 7. Catetos quase gêmeos: exatamente quatro até 5.000; a quinta é
//    (4059, 4060, 5741); os endereços resolvem Pell (m − k)² − 2k² = ±1;
//    e a razão entre hipotenusas cola em 3 + 2√2 ≈ 5,83.
const twins = prims5000.filter(t => t.b - t.a === 1);
assert.deepEqual(
  twins.map(t => [t.a, t.b, t.c]),
  [[3, 4, 5], [20, 21, 29], [119, 120, 169], [696, 697, 985]],
  'catetos gêmeos até 5.000'
);
assert.equal(4059 ** 2 + 4060 ** 2, 5741 ** 2, 'a quinta terna gêmea fecha Pitágoras');
for (const t of twins) {
  const pell = (t.m - t.k) ** 2 - 2 * t.k * t.k;
  assert.ok(pell === 1 || pell === -1, `Pell falhou no endereço (${t.m}, ${t.k})`);
}
const unit = 3 + 2 * Math.sqrt(2);
assert.ok(Math.abs(985 / 169 - unit) < 0.01, 'razão 985/169 deve colar em 3 + 2√2');
assert.ok(Math.abs(5741 / 985 - unit) < 0.01, 'razão 5741/985 deve colar em 3 + 2√2');

console.log('T02 Lab 04: regra das duas vias em todas as primitivas até 5.000, nove presentes estáveis (teto 500 e 2.000), proibidas ausentes, primeiras ocorrências, cópias preenchendo 1–50 e os gêmeos de Pell verificados sem divergência.');
