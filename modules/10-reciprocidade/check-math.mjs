import assert from 'node:assert/strict';

// Lab 10: a máquina de ida e volta. A volta (acumular a curva das taxas por
// retângulos finos, algoritmo idêntico ao da página) reconstrói a função com
// erro máximo que cai pela metade a cada dobra de cortes — n·erro estabiliza,
// primeira ordem — e o ponto médio melhora para segunda ordem — n²·erro
// estabiliza. A ida (derivada numérica) devolve o integrando. Onde há fórmula,
// a reciprocidade é conferida contra ela: 2πr → πR², 4πr² → 4πR³/3, πr² → πR³/3.
// Os três exercícios e o caso da constante (+5) fecham o gabarito.

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

const R = 2;

const PAIRS = {
  'círculo (A = πr², taxa 2πr)': {
    F: r => Math.PI * r * r,
    f: r => 2 * Math.PI * r,
    exato: r => Math.PI * r * r
  },
  'esfera (V = 4πr³/3, taxa 4πr²)': {
    F: r => 4 * Math.PI * r ** 3 / 3,
    f: r => 4 * Math.PI * r * r,
    exato: r => 4 * Math.PI * r ** 3 / 3
  },
  'cone h = r (V = πr³/3, taxa πr²)': {
    F: r => Math.PI * r ** 3 / 3,
    f: r => Math.PI * r * r,
    exato: r => Math.PI * r ** 3 / 3
  }
};

// mesmo algoritmo da página: retângulos apoiados no ponto esquerdo
function accumulate(f, cuts) {
  const dr = R / cuts;
  const points = [0];
  let acc = 0;
  for (let i = 0; i < cuts; i += 1) {
    acc += f(i * dr) * dr;
    points.push(acc);
  }
  return points;
}

function maxReconstructionError(pair, cuts) {
  const dr = R / cuts;
  const acc = accumulate(pair.f, cuts);
  let worst = 0;
  for (let k = 0; k <= cuts; k += 1) {
    worst = Math.max(worst, Math.abs(acc[k] - pair.F(k * dr)));
  }
  return worst;
}

// acumulação pelo ponto médio, para a ordem quadrática da Oficina
function maxMidpointError(pair, cuts) {
  const dr = R / cuts;
  let acc = 0;
  let worst = 0;
  for (let i = 0; i < cuts; i += 1) {
    acc += pair.f((i + 0.5) * dr) * dr;
    worst = Math.max(worst, Math.abs(acc - pair.F((i + 1) * dr)));
  }
  return worst;
}

// ida: derivada numérica por casca fina (diferença adiantada, como na página)
function maxDerivativeError(pair, cuts) {
  const dr = R / cuts;
  let worst = 0;
  for (let i = 0; i < cuts; i += 1) {
    const r = i * dr;
    const measured = (pair.F(r + dr) - pair.F(r)) / dr;
    worst = Math.max(worst, Math.abs(measured - pair.f(r)));
  }
  return worst;
}

for (const [name, pair] of Object.entries(PAIRS)) {
  // volta: erro máximo decresce ao dobrar e fica abaixo da tolerância
  let previous = Infinity;
  for (let cuts = 8; cuts <= 4096; cuts *= 2) {
    const err = maxReconstructionError(pair, cuts);
    assert.ok(err < previous, `${name}: erro da volta deveria cair ao dobrar (cortes=${cuts})`);
    previous = err;
  }
  assert.ok(
    maxReconstructionError(pair, 4096) / pair.F(R) < 1e-3,
    `${name}: erro relativo da volta deveria ficar abaixo de 0,1% com 4096 cortes`
  );

  // ida: derivada numérica devolve o integrando, com erro pequeno e decrescente
  previous = Infinity;
  for (let cuts = 8; cuts <= 4096; cuts *= 2) {
    const err = maxDerivativeError(pair, cuts);
    assert.ok(err < previous, `${name}: erro da ida deveria cair ao dobrar (cortes=${cuts})`);
    previous = err;
  }
  assert.ok(
    maxDerivativeError(pair, 4096) / pair.f(R) < 1e-3,
    `${name}: erro relativo da ida deveria ficar abaixo de 0,1% com 4096 cortes`
  );

  // reciprocidade exata onde há fórmula: acumulado no fim → F(R), erro → 0
  for (let cuts = 8; cuts <= 4096; cuts *= 2) {
    const acc = accumulate(pair.f, cuts);
    const gap = Math.abs(acc[cuts] - pair.exato(R));
    assert.ok(gap <= pair.f(R) * (R / cuts), `${name}: o acumulado deveria cercar a fórmula (cortes=${cuts})`);
  }

  // segunda direção, exata por construção: a taxa da acumulação é o integrando
  const cuts = 256;
  const dr = R / cuts;
  const acc = accumulate(pair.f, cuts);
  for (let k = 0; k < cuts; k += 1) {
    close((acc[k + 1] - acc[k]) / dr, pair.f(k * dr), 1e-9, `${name}: taxa da acumulação no corte ${k}`);
  }

  // ordem do erro, no estilo do Lab 04: n·erro (retângulo) estabiliza
  const scaledFirst = [];
  for (let c = 256; c <= 4096; c *= 2) scaledFirst.push(c * maxReconstructionError(pair, c));
  for (let i = 1; i < scaledFirst.length; i += 1) {
    close(scaledFirst[i] / scaledFirst[i - 1], 1, 0.02, `${name}: n·erro deveria estabilizar`);
  }
  // e coincide com a previsão da Oficina: [f(R) − f(0)]·R/2
  close(scaledFirst.at(-1), (pair.f(R) - pair.f(0)) * R / 2, 0.05 * pair.F(R), `${name}: constante de n·erro`);
}

// ponto médio: n²·erro estabiliza para as taxas curvas (esfera e cone)...
for (const name of ['esfera (V = 4πr³/3, taxa 4πr²)', 'cone h = r (V = πr³/3, taxa πr²)']) {
  const pair = PAIRS[name];
  const scaledSecond = [];
  for (let c = 64; c <= 1024; c *= 2) scaledSecond.push(c * c * maxMidpointError(pair, c));
  for (let i = 1; i < scaledSecond.length; i += 1) {
    close(scaledSecond[i] / scaledSecond[i - 1], 1, 0.02, `${name}: n²·erro (ponto médio) deveria estabilizar`);
  }
}
// ...e no círculo a taxa é reta (f″ = 0): o ponto médio acerta em cheio
assert.ok(
  maxMidpointError(PAIRS['círculo (A = πr², taxa 2πr)'], 512) < 1e-10,
  'círculo: ponto médio deveria ser exato para taxa linear'
);

// valores exibidos no painel inicial e no smoke test (círculo, 8 cortes)
close(PAIRS['círculo (A = πr², taxa 2πr)'].F(2), 12.5664, 5e-5, 'área verdadeira em R = 2');
close(accumulate(PAIRS['círculo (A = πr², taxa 2πr)'].f, 8).at(-1), 10.9956, 5e-5, 'reconstrução inicial com 8 cortes');
close(maxReconstructionError(PAIRS['círculo (A = πr², taxa 2πr)'], 8), Math.PI / 2, 1e-12, 'erro máximo inicial = π/2');
close(PAIRS['esfera (V = 4πr³/3, taxa 4πr²)'].F(2), 33.5103, 5e-5, 'volume da esfera em R = 2');
close(PAIRS['cone h = r (V = πr³/3, taxa πr²)'].F(2), 8.3776, 5e-5, 'volume do cone em R = 2');

// exercício A: acumular 4πr² até R = 2 dá 4π·2³/3 ≈ 33,510
close(4 * Math.PI * 8 / 3, 33.510, 5e-4, 'gabarito do exercício A');
close(4 * Math.PI * 4, 50.265, 5e-4, 'distrator 50,27 (taxa no final)');
close(4 * Math.PI * 4 * 2, 100.531, 5e-4, 'distrator 100,53 (retângulo grosso único)');
const sphereRec1024 = accumulate(PAIRS['esfera (V = 4πr³/3, taxa 4πr²)'].f, 1024).at(-1);
close(sphereRec1024, 33.46, 5e-3, 'reconstrução da esfera com 1024 cortes citada no gabarito');

// exercício B: a taxa da acumulação t³ é 3t², em pontos-teste
for (const t of [0.5, 1, 2, 3]) {
  const h = 1e-6;
  const numeric = ((t + h) ** 3 - (t - h) ** 3) / (2 * h);
  close(numeric, 3 * t * t, 1e-6, `derivada de t³ em t = ${t}`);
}
close((2.001 ** 3 - 2 ** 3) / 0.001, 12.006, 5e-3, 'conta 12,006 citada no gabarito do B');
// e o erro da diferença cai junto com Δt
{
  let previous = Infinity;
  for (const h of [1e-1, 1e-2, 1e-3, 1e-4]) {
    const err = Math.abs(((2 + h) ** 3 - 2 ** 3) / h - 12);
    assert.ok(err < previous, `erro da derivada de t³ deveria cair com Δt = ${h}`);
    previous = err;
  }
}

// exercício C e Erro fértil: a função deslocada G(r) = πr² + 5 tem a mesma
// taxa; a acumulação devolve a variação G(2) − G(0) = π·4, nunca o valor G(2)
{
  const G = r => Math.PI * r * r + 5;
  const rate = r => 2 * Math.PI * r; // idêntica à da área comum
  const acc = accumulate(rate, 4096).at(-1);
  close(acc, G(2) - G(0), 0.01, 'a acumulação devolve a variação da função deslocada');
  close(G(2) - acc, 5, 0.01, 'os 5 iniciais se perdem na ida');
  close(G(2), 17.5664, 5e-5, 'valor 17,57 citado no exercício C');
  close(G(2) - G(0), 12.5664, 5e-5, 'variação 12,57 citada no exercício C');
}

// exemplo pequeno do card de fórmulas: R = 1 no círculo
close(accumulate(r => 2 * Math.PI * r, 4096)[4096 / 2], Math.PI, 0.01, 'acumular 2πr até 1 dá π');

console.log('Lab 10: ida e volta conferidas nos três pares (erro caindo e abaixo de 0,1% com 4096 cortes), n·erro e n²·erro estabilizados, reciprocidade exata contra as fórmulas, exercícios A/B/C e o caso da constante verificados sem divergência.');
