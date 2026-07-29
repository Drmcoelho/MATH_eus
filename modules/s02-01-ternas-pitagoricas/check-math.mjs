import assert from 'node:assert/strict';

// T02 Lab 01: a fábrica dos ímpares (n, (n²−1)/2, (n²+1)/2) gera exatamente as
// ternas com hipotenusa − cateto maior = 1; o censo por força bruta e a fábrica
// completa de Euclides d·(m²−k², 2mk, m²+k²) devem produzir as mesmas ternas; e
// as contagens citadas na página (52/6 até 100, 881/21 até 1.000, 12.471/70 até
// 10.000) precisam bater.

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function key(a, b, c) {
  return `${a},${b},${c}`;
}

// 1. A fábrica dos ímpares: identidade, diferença 1 e primitividade.
for (let n = 3; n <= 201; n += 2) {
  const b = (n * n - 1) / 2;
  const c = (n * n + 1) / 2;
  assert.ok(Number.isInteger(b) && Number.isInteger(c), `metades inteiras em n=${n}`);
  assert.equal(n * n + b * b, c * c, `identidade pitagórica falhou em n=${n}`);
  assert.equal(c - b, 1, `a diferença deve ser 1 em n=${n}`);
  assert.ok(b > n, `o cateto fabricado deve superar o ímpar em n=${n}`);
  assert.equal(gcd(n, gcd(b, c)), 1, `a terna do ímpar deve ser primitiva em n=${n}`);
}

// 2. A família do par (n par ≥ 6): diferença travada em 2.
for (let n = 6; n <= 100; n += 2) {
  const b = (n * n) / 4 - 1;
  const c = (n * n) / 4 + 1;
  assert.equal(n * n + b * b, c * c, `família do par falhou em n=${n}`);
  assert.equal(c - b, 2, `a diferença da família do par deve ser 2 em n=${n}`);
  assert.ok(b > n, `o cateto fabricado deve ser o maior em n=${n}`);
}

// 3. Censo por força bruta: todas as ternas a ≤ b < c ≤ N.
function bruteForce(N) {
  const list = [];
  for (let a = 3; a <= N; a += 1) {
    for (let b = a; b <= N; b += 1) {
      const c2 = a * a + b * b;
      const c = Math.round(Math.sqrt(c2));
      if (c * c === c2 && c <= N) list.push({ a, b, c });
    }
  }
  return list;
}

function countRule(list) {
  return list.filter(t => t.c - t.b === 1).length;
}

const upTo1000 = bruteForce(1000);
const upTo100 = upTo1000.filter(t => t.c <= 100);

assert.equal(upTo100.length, 52, 'devem existir 52 ternas com hipotenusa até 100');
assert.equal(countRule(upTo100), 6, '6 delas devem sair da fábrica dos ímpares');
assert.equal(upTo100.filter(t => gcd(t.a, gcd(t.b, t.c)) === 1).length, 16, '16 primitivas até 100');
assert.equal(upTo1000.length, 881, 'devem existir 881 ternas com hipotenusa até 1.000');
assert.equal(countRule(upTo1000), 21, '21 delas devem sair da fábrica dos ímpares');

// A fração fabricada citada na página: 11,5% até 100 e 2,4% até 1.000.
assert.equal(((countRule(upTo100) / upTo100.length) * 100).toFixed(1), '11.5', 'fração até 100');
assert.equal(((countRule(upTo1000) / upTo1000.length) * 100).toFixed(1), '2.4', 'fração até 1.000');

// 4. "Diferem de 1" é a assinatura exata da fábrica: toda terna com c − b = 1
// tem cateto menor ímpar e vem de (a, (a²−1)/2, (a²+1)/2).
for (const t of upTo1000) {
  if (t.c - t.b === 1) {
    assert.equal(t.a % 2, 1, `cateto menor deve ser ímpar em ${key(t.a, t.b, t.c)}`);
    assert.equal(t.b, (t.a * t.a - 1) / 2, `cateto maior fora da fábrica em ${key(t.a, t.b, t.c)}`);
    assert.equal(gcd(t.a, gcd(t.b, t.c)), 1, `terna da fábrica deve ser primitiva em ${key(t.a, t.b, t.c)}`);
  }
}

// 5. A fábrica completa de Euclides reproduz o censo inteiro (até 500).
function euclid(N) {
  const set = new Set();
  for (let m = 2; m * m + 1 <= N; m += 1) {
    for (let k = 1; k < m; k += 1) {
      if (gcd(m, k) !== 1 || (m + k) % 2 === 0) continue;
      const legA = m * m - k * k;
      const legB = 2 * m * k;
      const c = m * m + k * k;
      if (c > N) continue;
      for (let d = 1; d * c <= N; d += 1) {
        const small = d * Math.min(legA, legB);
        const big = d * Math.max(legA, legB);
        set.add(key(small, big, d * c));
      }
    }
  }
  return set;
}

const brute500 = new Set(bruteForce(500).map(t => key(t.a, t.b, t.c)));
const euclid500 = euclid(500);
assert.equal(euclid500.size, brute500.size, 'fábrica completa e força bruta devem contar igual até 500');
for (const item of brute500) {
  assert.ok(euclid500.has(item), `a fábrica completa não produziu ${item}`);
}

// 6. A diagonal k = m − 1 é a fábrica dos ímpares.
for (let m = 2; m <= 50; m += 1) {
  const k = m - 1;
  assert.equal(gcd(m, k), 1, `consecutivos devem ser coprimos em m=${m}`);
  assert.equal((m + k) % 2, 1, `consecutivos têm paridades opostas em m=${m}`);
  const legs = [m * m - k * k, 2 * m * k].sort((p, q) => p - q);
  const c = m * m + k * k;
  assert.equal(c - legs[1], 1, `a diagonal deve dar diferença 1 em m=${m}`);
  assert.equal(legs[0], 2 * m - 1, `o cateto ímpar da diagonal deve ser 2m − 1 em m=${m}`);
}

// 7. Contagem via fábrica completa até 10.000 (rápida) confere com a página.
const euclid10000 = euclid(10000);
assert.equal(euclid10000.size, 12471, 'devem existir 12.471 ternas com hipotenusa até 10.000');
let rule10000 = 0;
for (const item of euclid10000) {
  const [, b, c] = item.split(',').map(Number);
  if (c - b === 1) rule10000 += 1;
}
assert.equal(rule10000, 70, '70 ternas fabricadas pelos ímpares até 10.000');
// ...e coincide com a contagem direta da família: ímpares n com (n²+1)/2 ≤ 10.000.
let family10000 = 0;
for (let n = 3; (n * n + 1) / 2 <= 10000; n += 2) family10000 += 1;
assert.equal(family10000, 70, 'contagem direta da família dos ímpares até 10.000');
assert.equal(((rule10000 / euclid10000.size) * 100).toFixed(1), '0.6', 'fração até 10.000');

// 8. A fração fabricada desaba conforme o teto sobe.
let previousFraction = Infinity;
for (const N of [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]) {
  const slice = upTo1000.filter(t => t.c <= N);
  const fraction = countRule(slice) / slice.length;
  assert.ok(fraction < previousFraction, `a fração fabricada deve cair; falhou no teto ${N}`);
  previousFraction = fraction;
}

// 9. Exemplos citados na página.
const cited = [
  [2, 1, [3, 4, 5]],
  [3, 2, [5, 12, 13]],
  [4, 3, [7, 24, 25]],
  [4, 1, [8, 15, 17]],
  [5, 2, [20, 21, 29]],
  [12, 5, [119, 120, 169]]
];
for (const [m, k, [a, b, c]] of cited) {
  const legs = [m * m - k * k, 2 * m * k].sort((p, q) => p - q);
  assert.equal(legs[0], a, `cateto menor de (m,k)=(${m},${k})`);
  assert.equal(legs[1], b, `cateto maior de (m,k)=(${m},${k})`);
  assert.equal(m * m + k * k, c, `hipotenusa de (m,k)=(${m},${k})`);
}
assert.equal(169 - 120, 49, 'diferença citada para a terna de Plimpton 322');
assert.equal(119 * 119 + 120 * 120, 169 * 169, 'a terna de Plimpton 322 fecha o quadrado');

// 10. O desafio: (8, 15, 17) é a intrusa; as outras duas saem da fábrica.
assert.equal(17 - 15, 2, 'a intrusa tem diferença 2');
assert.equal(41 - 40, 1, '(9, 40, 41) sai da fábrica');
assert.equal((9 * 9 - 1) / 2, 40, '(9, 40, 41) vem do ímpar n = 9');
assert.equal(85 - 84, 1, '(13, 84, 85) sai da fábrica');
assert.equal((13 * 13 - 1) / 2, 84, '(13, 84, 85) vem do ímpar n = 13');
assert.equal((8 * 8) / 4 - 1, 15, '(8, 15, 17) vem da família do par com n = 8');

// 11. Diferenças possíveis em primitivas citadas na Oficina: 1, 2, 8, 9, 18, 25…
// (são os quadrados (m−k)² e seus dobros; conferimos as primeiras ocorrências)
const primitiveGaps = new Set(
  bruteForce(1000)
    .filter(t => gcd(t.a, gcd(t.b, t.c)) === 1)
    .map(t => t.c - t.b)
);
for (const expected of [1, 2, 8, 9, 18, 25]) {
  assert.ok(primitiveGaps.has(expected), `deve existir primitiva com diferença ${expected}`);
}
assert.ok(!primitiveGaps.has(3) && !primitiveGaps.has(4), 'diferenças 3 e 4 não ocorrem em primitivas');

console.log('T02 Lab 01: fábrica dos ímpares, censo duplo até 500, contagens 52/6, 881/21 e 12.471/70, diagonal k = m − 1 e exemplos citados verificados sem divergência.');
