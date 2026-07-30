import assert from 'node:assert/strict';

// T02 Lab 03: o problema inverso. Dado n, as ternas com n como cateto vêm das
// fatorações n² = d·e com d < e e mesma paridade; a contagem fecha com
// (divisores(n²) − 1)/2 para n ímpar e (divisores((n/2)²) − 1)/2 para n par.
// Todo inteiro a partir de 3 mora em alguma terna; 1 e 2 ficam de fora.

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function divisors(x) {
  let tau = 0;
  for (let d = 1; d * d <= x; d += 1) {
    if (x % d === 0) tau += d * d === x ? 1 : 2;
  }
  return tau;
}

function countByFormula(n) {
  if (n < 3) return 0;
  const sq = n % 2 === 1 ? n * n : (n / 2) * (n / 2);
  return (divisors(sq) - 1) / 2;
}

function findByFactoring(n) {
  const sq = n * n;
  const list = [];
  for (let d = 1; d * d < sq; d += 1) {
    if (sq % d !== 0) continue;
    const e = sq / d;
    if (d % 2 !== e % 2) continue;
    const b = (e - d) / 2;
    const c = (e + d) / 2;
    if (b < 1) continue;
    list.push({ b, c });
  }
  return list.sort((p, q) => p.b - q.b);
}

function countByBruteForce(n) {
  let count = 0;
  const limit = (n * n) / 2 + 2;
  for (let b = 1; b <= limit; b += 1) {
    const c2 = n * n + b * b;
    const c = Math.round(Math.sqrt(c2));
    if (c * c === c2) count += 1;
  }
  return count;
}

// 1. Fórmula, fatoração e força bruta coincidem para todo n de 3 a 300 —
//    e nenhum número devolve zero.
for (let n = 3; n <= 300; n += 1) {
  const formula = countByFormula(n);
  const factored = findByFactoring(n).length;
  const brute = countByBruteForce(n);
  assert.equal(formula, factored, `fórmula × fatoração divergem em n=${n}`);
  assert.equal(formula, brute, `fórmula × força bruta divergem em n=${n}`);
  assert.ok(formula >= 1, `n=${n} deveria morar em alguma terna`);
}

// 2. Os únicos excluídos: 1 e 2 (como cateto e como hipotenusa).
assert.equal(findByFactoring(1).length, 0, '1 não mora em terna como cateto');
assert.equal(findByFactoring(2).length, 0, '2 não mora em terna como cateto');
assert.ok(1 * 1 < 2 && 2 * 2 < 1 + 4, 'hipotenusas 1 e 2 não comportam dois quadrados positivos');

// 3. Cada fatoração devolve terna de verdade; e a mais esticada é sempre
//    a fábrica do ímpar (n ímpar) ou a família do par (n par).
for (let n = 3; n <= 300; n += 1) {
  const triples = findByFactoring(n);
  for (const { b, c } of triples) {
    assert.equal(n * n + b * b, c * c, `fatoração não fecha Pitágoras em n=${n}, b=${b}`);
  }
  const stretched = triples[triples.length - 1];
  if (n % 2 === 1) {
    assert.equal(stretched.b, (n * n - 1) / 2, `terna mais esticada de n=${n} deveria ser a fábrica do ímpar`);
    assert.equal(stretched.c, (n * n + 1) / 2, `hipotenusa esticada errada em n=${n}`);
  } else {
    assert.equal(stretched.b, (n * n) / 4 - 1, `terna mais esticada de n=${n} deveria ser a família do par`);
    assert.equal(stretched.c, (n * n) / 4 + 1, `hipotenusa esticada errada em n=${n}`);
  }
}

// 4. Critério de primitiva: para n ímpar, d e e coprimos; para n par,
//    as metades d/2 e e/2 coprimas e de paridades opostas.
for (let n = 3; n <= 120; n += 1) {
  const sq = n * n;
  for (let d = 1; d * d < sq; d += 1) {
    if (sq % d !== 0) continue;
    const e = sq / d;
    if (d % 2 !== e % 2) continue;
    const b = (e - d) / 2;
    const c = (e + d) / 2;
    if (b < 1) continue;
    const isPrimitive = gcd(n, gcd(b, c)) === 1;
    const expected = n % 2 === 1
      ? gcd(d, e) === 1
      : gcd(d / 2, e / 2) === 1 && (d / 2 + e / 2) % 2 === 1;
    assert.equal(isPrimitive, expected, `critério de primitiva falhou em n=${n}, d=${d}`);
  }
}

// 5. O painel inicial (n = 12): 4 ternas, 2 primitivas, hipotenusas 13 e 37,
//    e a tabela de fatorações citada na página.
const twelve = findByFactoring(12);
assert.deepEqual(twelve.map(t => [t.b, t.c]), [[5, 13], [9, 15], [16, 20], [35, 37]], 'moradas do 12');
assert.equal(twelve.filter(t => gcd(12, gcd(t.b, t.c)) === 1).length, 2, 'primitivas do 12');
const table12 = [[2, 72, 35, 37], [4, 36, 16, 20], [6, 24, 9, 15], [8, 18, 5, 13]];
for (const [d, e, b, c] of table12) {
  assert.equal(d * e, 144, `fatoração ${d}·${e} deve dar 144`);
  assert.equal((e - d) / 2, b, `b da fatoração ${d}·${e}`);
  assert.equal((e + d) / 2, c, `c da fatoração ${d}·${e}`);
}

// 6. O desafio (n = 15): 225 tem 9 divisores → 4 ternas, as quatro citadas.
assert.equal(divisors(225), 9, '225 deve ter 9 divisores');
assert.equal(countByFormula(15), 4, '15 deve morar em 4 ternas');
assert.deepEqual(findByFactoring(15).map(t => [t.b, t.c]), [[8, 17], [20, 25], [36, 39], [112, 113]], 'moradas do 15');

// 7. Campeões: empate triplo 60, 84 e 96 (13 ternas) até 100; 240 lidera
//    com 31 ternas até 300; o primo 97 mora numa única terna.
let best = 0;
let champions = [];
for (let n = 3; n <= 100; n += 1) {
  const c = countByFormula(n);
  if (c > best) { best = c; champions = [n]; } else if (c === best) champions.push(n);
}
assert.equal(best, 13, 'o recorde até 100 deve ser 13 ternas');
assert.deepEqual(champions, [60, 84, 96], 'o empate triplo até 100');

let best300 = 0;
let champion300 = 0;
for (let n = 3; n <= 300; n += 1) {
  const c = countByFormula(n);
  if (c > best300) { best300 = c; champion300 = n; }
}
assert.equal(champion300, 240, 'o campeão até 300 deve ser o 240');
assert.equal(best300, 31, 'o 240 deve morar em 31 ternas');

assert.equal(countByFormula(97), 1, 'o primo 97 mora numa única terna');
assert.deepEqual(findByFactoring(97).map(t => [t.b, t.c]), [[4704, 4705]], 'a terna do 97');

// 8. A porta da hipotenusa: 5, 13 e 17 entram; 3, 4 e 6 nunca.
function isHypotenuse(c) {
  for (let a = 1; a * a * 2 <= c * c; a += 1) {
    const b2 = c * c - a * a;
    const b = Math.round(Math.sqrt(b2));
    if (b >= a && b * b === b2) return true;
  }
  return false;
}
for (const yes of [5, 13, 17]) assert.ok(isHypotenuse(yes), `${yes} deve entrar como hipotenusa`);
for (const no of [3, 4, 6]) assert.ok(!isHypotenuse(no), `${no} nunca entra como hipotenusa`);

// 9. Exercício "agora use a fórmula": n = 20 (par) usa (n/2)² = 100, não n² = 400.
assert.equal(divisors(100), 9, '100 deve ter 9 divisores');
assert.equal(countByFormula(20), 4, '20 deve morar em 4 ternas (via (n/2)²)');
assert.deepEqual(findByFactoring(20).map(t => [t.b, t.c]), [[15, 25], [21, 29], [48, 52], [99, 101]], 'moradas do 20');
assert.equal(divisors(400), 15, '400 (n² em vez de (n/2)²) tem 15 divisores — o distrator errado');
assert.equal((15 - 1) / 2, 7, 'o distrator errado do exercício dá 7 ternas');

console.log('T02 Lab 03: fórmula × fatoração × força bruta idênticas de 3 a 300, exclusão de 1 e 2, famílias na ponta do leque, moradas de 12/15/20/97, campeões 60-84-96 e 240/31 verificados sem divergência.');
