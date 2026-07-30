import assert from 'node:assert/strict';

// Lab 04: os quatro erros do cerco (círculo de raio 1) têm forma quadrática —
// n²·erro tende a uma constante e cada dobra de n divide o erro por ~4.
// As quatro séries estabilizam em apenas duas constantes: pi³/3 (contorno de
// dentro e área de fora) e 2pi³/3 (contorno de fora e área de dentro).

const SERIES = {
  perimeterIn: { error: n => 2 * Math.PI - 2 * n * Math.sin(Math.PI / n), constant: Math.PI ** 3 / 3 },
  perimeterOut: { error: n => 2 * n * Math.tan(Math.PI / n) - 2 * Math.PI, constant: 2 * Math.PI ** 3 / 3 },
  areaIn: { error: n => Math.PI - (n / 2) * Math.sin(2 * Math.PI / n), constant: 2 * Math.PI ** 3 / 3 },
  areaOut: { error: n => n * Math.tan(Math.PI / n) - Math.PI, constant: Math.PI ** 3 / 3 }
};

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

for (const [key, { error, constant }] of Object.entries(SERIES)) {
  let previousScaledGap = Infinity;

  // até n=512 o decremento real de |n²·erro - C| domina o ruído de ponto
  // flutuante do cancelamento 2π − P(n); acima disso só cobramos proximidade
  for (let n = 3; n <= 512; n += 1) {
    const err = error(n);
    assert.ok(err > 0, `${key}: erro deve ser positivo em n=${n}`);

    const scaledGap = Math.abs(n * n * err - constant);
    assert.ok(
      scaledGap < previousScaledGap,
      `${key}: |n²·erro - C| deve encolher; falhou em n=${n}`
    );
    previousScaledGap = scaledGap;
  }

  for (const n of [1024, 2048, 3072]) {
    const err = error(n);
    assert.ok(err > 0, `${key}: erro deve ser positivo em n=${n}`);
    const scaledGap = Math.abs(n * n * err - constant);
    assert.ok(
      scaledGap < previousScaledGap,
      `${key}: |n²·erro - C| em n=${n} deve ficar abaixo do valor em n=512`
    );
  }

  close(3072 * 3072 * error(3072), constant, 1e-2, `${key}: n²·erro em n=3072 colado na constante`);

  // contração ao dobrar: erro(2n)/erro(n) converge para 1/4 — por cima nas
  // séries de seno, por baixo nas de tangente; cobramos só a convergência
  let previousDistance = Infinity;
  let lastContraction = 0;
  for (let n = 3; n <= 1536; n *= 2) {
    lastContraction = error(2 * n) / error(n);
    const distance = Math.abs(lastContraction - 0.25);
    assert.ok(distance < previousDistance, `${key}: |contração - 1/4| deve encolher em n=${n}`);
    previousDistance = distance;
  }
  close(lastContraction, 0.25, 1e-6, `${key}: contração em n=1536 colada em 1/4`);
}

// as duas constantes citadas na página
close(Math.PI ** 3 / 3, 10.335, 5e-4, 'constante citada π³/3');
close(2 * Math.PI ** 3 / 3, 20.671, 5e-4, 'constante citada 2π³/3');

// valores citados na página para a série padrão (contorno de dentro)
const errIn = SERIES.perimeterIn.error;
close(errIn(3), 1.0870329, 5e-8, 'erro inicial citado (n=3)');
close(9 * errIn(3), 9.783, 5e-4, 'n²·erro inicial citado (n=3)');
close(errIn(96), 0.00112, 5e-6, 'erro citado para n=96');

// desafio: erro 100× menor pede n 10× maior (forma quadrática)
const shrink = errIn(960) / errIn(96);
assert.ok(shrink > 1 / 105 && shrink < 1 / 95, 'n=960 deve reduzir o erro ~100×');

// distratores do desafio: uma dobra divide por ~4; n=9600 divide ~10000×
const oneDouble = errIn(192) / errIn(96);
assert.ok(oneDouble > 0.24 && oneDouble < 0.26, 'n=192 divide o erro por ~4');
const overkill = errIn(9600) / errIn(96);
assert.ok(overkill > 1 / 10500 && overkill < 1 / 9500, 'n=9600 divide o erro por ~10000');

// exercício "agora use a fórmula": estimar erro da área de fora em n=50 via C/n²
const areaOutErrorAt50 = SERIES.areaOut.error(50);
const estimate50 = (Math.PI ** 3 / 3) / (50 * 50);
close(estimate50, 0.00413, 5e-5, 'estimativa C/n² citada no exercício (n=50)');
close(areaOutErrorAt50, 0.00414, 5e-5, 'valor real citado no exercício (n=50)');
assert.ok(Math.abs(estimate50 - areaOutErrorAt50) < 0.0001, 'estimativa deve ficar próxima do valor real em n=50');

console.log('Lab 04: quatro séries até n=3072, contração rumo a 1/4, constantes π³/3 e 2π³/3, o desafio dos 100× e a estimativa C/n² em n=50 verificados sem divergência.');
