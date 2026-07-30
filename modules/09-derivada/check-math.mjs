import assert from 'node:assert/strict';

// Lab 09: a coroa fina entre r e r + Δr diz quanto a área muda. O círculo
// permite verificação EXATA: coroa ÷ Δr = 2πr + π·Δr, então a diferença para
// o contorno é exatamente π·Δr e cai pela metade a cada encolhida de Δr.
// A esfera repete com casca: quociente = 4πr² + 4πr·Δr + (4π/3)·Δr².
// Também conferem: painel inicial, aposta (coroa quase 2× ao dobrar r),
// cordão da Terra/laranja, e os três exercícios A, B e C.

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

const circleArea = r => Math.PI * r * r;
const ringArea = (r, dr) => circleArea(r + dr) - circleArea(r);
const sphereVolume = r => (4 / 3) * Math.PI * r ** 3;
const shellVolume = (r, dr) => sphereVolume(r + dr) - sphereVolume(r);

const RADII = [0.6, 1, 1.5, 1.8, 3];
const DRS = [0.4, 0.2, 0.1, 0.05, 0.025, 0.0125]; // a máquina de encolher

// 1) círculo: quociente − 2πr == π·Δr, EXATO até 1e-12, para todos r e Δr
for (const r of RADII) {
  const contour = 2 * Math.PI * r;
  let previousQuotient = Infinity;
  for (const dr of DRS) {
    const quotient = ringArea(r, dr) / dr;
    close(quotient - contour, Math.PI * dr, 1e-12, `sobra exata π·Δr em r=${r}, Δr=${dr}`);
    close(ringArea(r, dr), contour * dr + Math.PI * dr * dr, 1e-12, `coroa = 2πr·Δr + π·Δr² em r=${r}, Δr=${dr}`);
    assert.ok(quotient > contour, `coroa ÷ Δr fica acima do contorno em r=${r}, Δr=${dr}`);
    assert.ok(quotient < previousQuotient, `coroa ÷ Δr desce rumo a 2πr em r=${r}, Δr=${dr}`);
    previousQuotient = quotient;
  }
}

// 2) máquina de encolher: a diferença para 2πr cai EXATAMENTE pela metade
for (const r of RADII) {
  const contour = 2 * Math.PI * r;
  for (let i = 1; i < DRS.length; i += 1) {
    const gapBefore = ringArea(r, DRS[i - 1]) / DRS[i - 1] - contour;
    const gapAfter = ringArea(r, DRS[i]) / DRS[i] - contour;
    close(gapAfter / gapBefore, 0.5, 1e-9, `meia-vida da diferença em r=${r}, passo ${i}`);
    // e a quina de área cai para um quarto (Erro fértil)
    const cornerBefore = ringArea(r, DRS[i - 1]) - contour * DRS[i - 1];
    const cornerAfter = ringArea(r, DRS[i]) - contour * DRS[i];
    close(cornerAfter / cornerBefore, 0.25, 1e-9, `quina cai por 4 em r=${r}, passo ${i}`);
  }
}

// 3) esfera: quociente = 4πr² + 4πr·Δr + (4π/3)·Δr², com sobra dominante 4πr·Δr
for (const r of RADII) {
  const surface = 4 * Math.PI * r * r;
  for (const dr of DRS) {
    const quotient = shellVolume(r, dr) / dr;
    close(
      quotient,
      surface + 4 * Math.PI * r * dr + (4 * Math.PI / 3) * dr * dr,
      1e-9,
      `expansão da casca em r=${r}, Δr=${dr}`
    );
    close(
      quotient - surface - 4 * Math.PI * r * dr,
      (4 * Math.PI / 3) * dr * dr,
      1e-9,
      `sobra dominante 4πr·Δr conferida em r=${r}, Δr=${dr}`
    );
  }
  const tight = shellVolume(r, 1e-5) / 1e-5;
  close(tight, surface, 1e-3, `quociente da esfera encosta em 4πr² em r=${r}`);
}

// 4) painel inicial (r = 1, Δr = 0,4) — os seis tiles exibidos
close(circleArea(1), 3.1416, 5e-5, 'área do círculo inicial');
close(ringArea(1, 0.4), 3.0159, 5e-5, 'coroa inicial');
close(ringArea(1, 0.4) / 0.4, 7.5398, 5e-5, 'coroa ÷ Δr inicial');
close(2 * Math.PI, 6.2832, 5e-5, 'contorno inicial');
close(ringArea(1, 0.4) / 0.4 - 2 * Math.PI, 1.2566, 5e-5, 'diferença inicial');
close(ringArea(1, 0.4) - 2 * Math.PI * 0.4, 0.5027, 5e-5, 'quina inicial');

// 5) aposta: dobrar o raio deixa a coroa fina QUASE 2× maior (a quina não liga para r)
for (const dr of [0.1, 0.05, 0.01]) {
  const growth = ringArea(1.8, dr) / ringArea(0.9, dr);
  assert.ok(growth > 1.9 && growth < 2, `coroa quase dobra (Δr=${dr}): ${growth}`);
  close(ringArea(1.8, dr) - ringArea(0.9, dr), 2 * Math.PI * 0.9 * dr, 1e-12, `a quina π·Δr² é a mesma nos dois círculos (Δr=${dr})`);
}
assert.ok(
  Math.abs(ringArea(1.8, 0.01) / ringArea(0.9, 0.01) - 2) < Math.abs(ringArea(1.8, 0.1) / ringArea(0.9, 0.1) - 2),
  'quanto mais fina a coroa, mais perto de 2× exato'
);

// 6) cordão da Terra e da laranja: folga de 1 m sobe 1/(2π) para qualquer raio
const lift = 1 / (2 * Math.PI);
close(lift, 0.159, 5e-4, 'subida do cordão ≈ 15,9 cm');
for (const r of [0.03, 6371000]) {
  close(2 * Math.PI * (r + lift) - 2 * Math.PI * r, 1, 1e-6, `folga de 1 m no raio ${r}`);
}

// 7) exercício A: ganho de r = 3 para r = 3,01 vs régua 2π·3·0,01
const gainA = ringArea(3, 0.01);
const rulerA = 2 * Math.PI * 3 * 0.01;
close(gainA, 0.1888, 5e-5, 'ganho real do exercício A');
close(gainA, 0.0601 * Math.PI, 1e-12, 'ganho = 0,0601π');
close(rulerA, 0.1885, 5e-5, 'régua linear do exercício A');
close(gainA - rulerA, Math.PI * 0.01 * 0.01, 1e-9, 'diferença para a régua é a quina π·Δr²');
close(gainA - rulerA, 0.0003, 5e-5, 'quina citada ≈ 0,0003');
close(3.01 ** 2 - 3 ** 2, 0.0601, 1e-12, 'distrator 0,0601 (esqueceu o π)');
close(Math.PI * 0.01 ** 2, 0.000314, 5e-7, 'distrator 0,0003 (quadrado da diferença)');

// 8) exercício B: taxa 12π ⇒ raio 6; distratores 12 e 2√3
close(2 * Math.PI * 6, 12 * Math.PI, 1e-12, 'r = 6 devolve taxa 12π');
close(Math.PI * (2 * Math.sqrt(3)) ** 2, 12 * Math.PI, 1e-12, 'distrator 3,46 vem de tratar 12π como área');
close(2 * Math.sqrt(3), 3.46, 5e-3, 'valor citado do distrator');
close(ringArea(6, 0.001), 12 * Math.PI * 0.001, 5e-6, 'verificação da coroa fina em r = 6');
close(ringArea(6, 0.001), 0.0377, 5e-5, 'valor citado 0,03770');

// 9) exercício C: o quadrado — dA/dL = 2L ≠ 4L, mas dA/da = 8a = perímetro
for (const L of [0.5, 1, 2, 7]) {
  for (const h of [0.1, 0.01, 0.001]) {
    close(((L + h) ** 2 - L ** 2) / h - 2 * L, h, 1e-9, `quociente do quadrado = 2L + ΔL em L=${L}, ΔL=${h}`);
  }
  assert.notEqual(2 * L, 4 * L, `2L não é o perímetro em L=${L}`);
  const a = L / 2;
  close(4 * a * a, L * L, 1e-12, `A = 4a² reescreve L² em L=${L}`);
  close(8 * a, 4 * L, 1e-12, `dA/da = 8a é o perímetro em L=${L}`);
  for (const h of [0.01, 0.001]) {
    close((4 * (a + h) ** 2 - 4 * a * a) / h - 8 * a, 4 * h, 1e-9, `sobra do quadrado pelo apótema em L=${L}`);
  }
  // bônus do gabarito: o cubo medido do centro repete taxa = fronteira
  close(24 * a * a, 6 * (2 * a) ** 2, 1e-12, `dV/da = 24a² é a superfície do cubo em L=${L}`);
}

// 10) exemplos pequenos do protocolo de fórmulas
close(ringArea(1, 0.01), 0.0631, 5e-5, 'exemplo pequeno de dA/dr: A(1,01) − A(1)');
close(ringArea(1, 0.01) / 0.01, 6.31, 5e-3, 'exemplo pequeno: quociente ≈ 6,31');
close(shellVolume(1, 0.01), 0.1269, 5e-5, 'exemplo pequeno de dV/dr: casca entre 1 e 1,01');
close(shellVolume(1, 0.01) / 0.01, 12.69, 5e-3, 'exemplo pequeno: quociente ≈ 12,69');
close(4 * Math.PI, 12.566, 5e-4, 'superfície citada 4π');

// 11) Segredo de mestre: derivar desfaz acumular (limites numéricos apertados)
for (const r of RADII) {
  const h = 1e-7;
  close((circleArea(r + h) - circleArea(r - h)) / (2 * h), 2 * Math.PI * r, 1e-6, `derivada de πr² devolve o contorno em r=${r}`);
  close((sphereVolume(r + h) - sphereVolume(r - h)) / (2 * h), 4 * Math.PI * r * r, 1e-5, `derivada de 4πr³/3 devolve a superfície em r=${r}`);
}

console.log('Lab 09: sobra exata π·Δr (5 raios × 6 espessuras), meia-vida exata da diferença, casca da esfera expandida, cordão da Terra, aposta da coroa quase-dupla e os três exercícios conferidos sem divergência.');
