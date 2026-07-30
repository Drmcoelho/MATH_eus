import assert from 'node:assert/strict';

// Lab 05: a largura do cerco, 2n·(tg(pi/n) - sen(pi/n)), é positiva,
// estritamente decrescente e vence qualquer tolerância: para cada epsilon
// existe um menor N com largura < epsilon, sem recaída depois dele. A forma
// do Lab 04 prevê N ≈ raiz(pi³/epsilon).

const CIRCLE = 2 * Math.PI;

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

function width(n) {
  return 2 * n * (Math.tan(Math.PI / n) - Math.sin(Math.PI / n));
}

function findN(eps) {
  let n = 3;
  while (width(n) >= eps) n += 1;
  return n;
}

// positividade, cerco contendo 2π e as três monotonias até n = 5000
let previousIn = 0;
let previousOut = Infinity;
let previousWidth = Infinity;
for (let n = 3; n <= 5000; n += 1) {
  const pin = 2 * n * Math.sin(Math.PI / n);
  const pout = 2 * n * Math.tan(Math.PI / n);
  const w = width(n);

  assert.ok(pin < CIRCLE && CIRCLE < pout, `o cerco deve conter 2π em n=${n}`);
  assert.ok(pin > previousIn, `contorno interno deve crescer; falhou em n=${n}`);
  assert.ok(pout < previousOut, `contorno externo deve decrescer; falhou em n=${n}`);
  assert.ok(w > 0, `largura deve ser positiva em n=${n}`);
  assert.ok(w < previousWidth, `largura deve decrescer; falhou em n=${n}`);
  previousIn = pin;
  previousOut = pout;
  previousWidth = w;
}

// n²·largura tende a π³
close(3072 * 3072 * width(3072), Math.PI ** 3, 1e-2, 'n²·largura em n=3072 colado em π³');

// a máquina de garantias: valores exibidos na página
const expected = [
  [0.1, 18],
  [0.01, 56],
  [0.001, 177],
  [0.0001, 557],
  [0.00001, 1761]
];

for (const [eps, expectedN] of expected) {
  const N = findN(eps);
  assert.equal(N, expectedN, `menor N para ε=${eps}`);
  assert.ok(width(N) < eps, `largura em N deve vencer ε=${eps}`);
  assert.ok(width(N - 1) >= eps, `largura em N-1 ainda deve falhar para ε=${eps}`);

  // sem recaída: varredura além do que a página confere
  for (let n = N; n <= N + 3000; n += 1) {
    assert.ok(width(n) < eps, `recaída em n=${n} para ε=${eps}`);
  }

  // a previsão pela forma do Lab 04 acerta o N exato nessas tolerâncias
  const estimate = Math.ceil(Math.sqrt(Math.PI ** 3 / eps));
  assert.equal(estimate, N, `previsão √(π³/ε) para ε=${eps}`);
}

// valores citados no painel inicial (ε = 0,01)
close(width(56), 0.0098950, 5e-8, 'largura citada em N=56');
close(width(55), 0.0102584, 5e-8, 'largura citada em N=55');

// desafio: 31 milionésimos
assert.equal(findN(0.000031), 1001, 'N exato do desafio');
close(Math.sqrt(Math.PI ** 3 / 0.000031), 1000.1, 0.2, 'conta de cabeça do desafio');
assert.ok(width(1001) < 0.000031 && width(1000) >= 0.000031, 'fronteira do desafio');

// distratores: n=100 falha por ~100×, n=31000 sobra por ~1000×
close(width(100) / 0.000031, 100, 5, 'distrator n=100');
assert.ok(width(31000) < 0.000031 / 900, 'distrator n=31000 é desperdício');

// exercício "encontre o erro": N escala com 1/√ε, não linearmente com ε
close(findN(0.01), 56, 0, 'N citado no exercício para ε=0,01');
close(findN(0.001), 177, 0, 'N citado no exercício para ε=0,001 (10× menor, N não decuplica)');
close(findN(0.0001), 557, 0, 'N citado no exercício para ε=0,0001 (100× menor, N decuplica)');
const ratio10x = findN(0.001) / findN(0.01);
const ratio100x = findN(0.0001) / findN(0.01);
assert.ok(ratio10x < 4, 'reduzir ε por 10× não deve nem quadruplicar N');
assert.ok(ratio100x > 9 && ratio100x < 11, 'reduzir ε por 100× deve tornar N aproximadamente 10× maior');
assert.notEqual(findN(0.0001), 10 * findN(0.01), 'o menor N inteiro não obedece proporcionalidade exata');

console.log('Lab 05: monotonias até n=5000, a máquina de garantias em cinco tolerâncias, a previsão assintótica pela forma, o desafio dos 31 milionésimos e o exercício da escala 1/√ε verificados sem divergência.');
