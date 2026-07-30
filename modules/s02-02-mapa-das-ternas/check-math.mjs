import assert from 'node:assert/strict';

// T02 Lab 02: a grade (m, k) é o endereço único de cada terna primitiva.
// Casas válidas (coprimos, paridades opostas) fabricam primitivas sem
// repetição; casas inválidas fabricam cópias; e a volta
// m² = (c + cateto ímpar)/2, k² = (c − cateto ímpar)/2 recupera o endereço
// de qualquer primitiva.

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function cell(m, k) {
  const legA = m * m - k * k;
  const legB = 2 * m * k;
  const c = m * m + k * k;
  const small = Math.min(legA, legB);
  const big = Math.max(legA, legB);
  return {
    small, big, c,
    gap: c - big,
    valid: gcd(m, k) === 1 && (m + k) % 2 === 1,
    g: gcd(small, gcd(big, c))
  };
}

// 1. Casas válidas fabricam primitivas; inválidas fabricam cópias (m ≤ 50).
for (let m = 2; m <= 50; m += 1) {
  for (let k = 1; k < m; k += 1) {
    const t = cell(m, k);
    assert.equal(t.small ** 2 + t.big ** 2, t.c ** 2, `Pitágoras falhou em (${m}, ${k})`);
    if (t.valid) {
      assert.equal(t.g, 1, `casa válida (${m}, ${k}) deveria fabricar primitiva`);
    } else {
      assert.ok(t.g > 1, `casa inválida (${m}, ${k}) deveria fabricar cópia`);
    }
  }
}

// 2. Nenhuma primitiva aparece duas vezes (m ≤ 60).
const seen = new Set();
for (let m = 2; m <= 60; m += 1) {
  for (let k = 1; k < m; k += 1) {
    const t = cell(m, k);
    if (!t.valid) continue;
    const key = `${t.small},${t.big},${t.c}`;
    assert.ok(!seen.has(key), `terna repetida no mapa: ${key} em (${m}, ${k})`);
    seen.add(key);
  }
}

// 3. A volta recupera o endereço de toda primitiva com c ≤ 1.000.
function volta(a, b, c) {
  const oddLeg = a % 2 === 1 ? a : b;
  const m2 = (c + oddLeg) / 2;
  const k2 = (c - oddLeg) / 2;
  const m = Math.round(Math.sqrt(m2));
  const k = Math.round(Math.sqrt(k2));
  return { m, k, m2, k2 };
}

let primitives = 0;
for (let a = 3; a <= 1000; a += 1) {
  for (let b = a; b <= 1000; b += 1) {
    const c2 = a * a + b * b;
    const c = Math.round(Math.sqrt(c2));
    if (c * c !== c2 || c > 1000) continue;
    if (gcd(a, gcd(b, c)) !== 1) continue;
    primitives += 1;
    const { m, k, m2, k2 } = volta(a, b, c);
    assert.equal(m * m, m2, `metade da soma não é quadrado em (${a}, ${b}, ${c})`);
    assert.equal(k * k, k2, `metade da diferença não é quadrado em (${a}, ${b}, ${c})`);
    assert.ok(m > k && k >= 1, `botões fora de ordem em (${a}, ${b}, ${c})`);
    const t = cell(m, k);
    assert.ok(t.valid, `endereço recuperado inválido em (${a}, ${b}, ${c})`);
    assert.equal(t.small, a, `ida e volta divergem no cateto menor de (${a}, ${b}, ${c})`);
    assert.equal(t.big, b, `ida e volta divergem no cateto maior de (${a}, ${b}, ${c})`);
    assert.equal(t.c, c, `ida e volta divergem na hipotenusa de (${a}, ${b}, ${c})`);
  }
}
assert.equal(primitives, 158, 'devem existir 158 primitivas com hipotenusa até 1.000');

// 4. Bordas: diagonal com diferença 1; coluna k = 1 com diferença 2 (m ≥ 3);
//    e a diferença lida do endereço é min((m − k)², 2k²).
for (let m = 2; m <= 50; m += 1) {
  const diag = cell(m, m - 1);
  assert.equal(diag.gap, 1, `diagonal deve ter diferença 1 em m=${m}`);
  if (m >= 3) {
    const col = cell(m, 1);
    assert.equal(col.gap, 2, `coluna k=1 deve ter diferença 2 em m=${m}`);
  }
  for (let k = 1; k < m; k += 1) {
    const t = cell(m, k);
    assert.equal(t.gap, Math.min((m - k) ** 2, 2 * k * k), `fórmula da diferença falhou em (${m}, ${k})`);
  }
}

// 5. Contagens citadas na página: 190 casas com m ≤ 20, 86 válidas;
//    as casas mais vermelhas são (19, 8) e (20, 9), com diferença 121 = 11².
let total = 0;
let valid = 0;
let maxGap = 0;
let maxCells = [];
for (let m = 2; m <= 20; m += 1) {
  for (let k = 1; k < m; k += 1) {
    total += 1;
    const t = cell(m, k);
    if (!t.valid) continue;
    valid += 1;
    if (t.gap > maxGap) {
      maxGap = t.gap;
      maxCells = [`${m},${k}`];
    } else if (t.gap === maxGap) {
      maxCells.push(`${m},${k}`);
    }
  }
}
assert.equal(total, 190, 'devem existir 190 casas com m até 20');
assert.equal(valid, 86, '86 casas válidas com m até 20');
assert.equal(maxGap, 121, 'a maior diferença do mapa deve ser 121');
assert.deepEqual(maxCells, ['19,8', '20,9'], 'as casas mais vermelhas devem ser (19, 8) e (20, 9)');
assert.equal(121, 11 ** 2, '121 é quadrado ímpar');

// 6. Exemplos citados na página.
const cited = [
  [2, 1, [3, 4, 5]],
  [3, 2, [5, 12, 13]],
  [4, 1, [8, 15, 17]],
  [5, 2, [20, 21, 29]],
  [12, 5, [119, 120, 169]],
  [9, 4, [65, 72, 97]],
  [8, 3, [48, 55, 73]],
  [7, 2, [28, 45, 53]]
];
for (const [m, k, [a, b, c]] of cited) {
  const t = cell(m, k);
  assert.equal(t.small, a, `cateto menor de (${m}, ${k})`);
  assert.equal(t.big, b, `cateto maior de (${m}, ${k})`);
  assert.equal(t.c, c, `hipotenusa de (${m}, ${k})`);
  assert.ok(t.valid, `(${m}, ${k}) deve ser casa válida`);
}

// Volta citada no desafio e na curiosidade.
assert.equal((97 + 65) / 2, 81, 'metade da soma do desafio');
assert.equal((97 - 65) / 2, 16, 'metade da diferença do desafio');
assert.equal((169 + 119) / 2, 144, 'metade da soma de Plimpton');
assert.equal((169 - 119) / 2, 25, 'metade da diferença de Plimpton');

// Cópias citadas: (3, 1) → 2 × (3, 4, 5) e (4, 2) → 4 × (3, 4, 5).
const copy31 = cell(3, 1);
assert.ok(!copy31.valid && copy31.g === 2, '(3, 1) deve fabricar cópia dupla');
assert.deepEqual([copy31.small / 2, copy31.big / 2, copy31.c / 2], [3, 4, 5], '(3, 1) reduz a (3, 4, 5)');
const copy42 = cell(4, 2);
assert.ok(!copy42.valid && copy42.g === 4, '(4, 2) deve fabricar cópia quádrupla');
assert.deepEqual([copy42.small / 4, copy42.big / 4, copy42.c / 4], [3, 4, 5], '(4, 2) reduz a (3, 4, 5)');

console.log('T02 Lab 02: casas válidas até m = 50, unicidade até m = 60, a volta nas 158 primitivas até 1.000, bordas, contagens 190/86 e exemplos citados verificados sem divergência.');
