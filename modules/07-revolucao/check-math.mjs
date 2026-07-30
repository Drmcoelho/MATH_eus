import assert from 'node:assert/strict';

// Lab 07: girar cria espaço. A pilha de fatias-disco (raio medido no meio de
// cada fatia, a mesma função da página) é exata no cilindro, converge para
// πR²h/3 no cone (erro relativo −1/(4N²)) e para 4πR³/3 na esfera (+1/(2N²)).
// Cone/cilindro = 1/3 e esfera/cilindro circunscrito = 2/3 são exatos nas
// fórmulas — a proporção 1:2:3 do túmulo de Arquimedes. Todos os números do
// painel, dos gabaritos e dos distratores são conferidos aqui.

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

// ---- a mesma pilha da página -------------------------------------------
const PROFILES = {
  retangulo: { H: 1.5, radiusAt: () => 1, exact: Math.PI * 1.5 },
  triangulo: { H: 1.5, radiusAt: z => 1 - z / 1.5, exact: Math.PI * 1.5 / 3 },
  semicirculo: { H: 2, radiusAt: z => Math.sqrt(Math.max(0, 1 - (z - 1) ** 2)), exact: 4 * Math.PI / 3 }
};

function discSum(profile, n) {
  const dz = profile.H / n;
  let sum = 0;
  for (let i = 0; i < n; i += 1) {
    const r = profile.radiusAt((i + 0.5) * dz);
    sum += Math.PI * r * r * dz;
  }
  return sum;
}

// ---- convergência das três pilhas --------------------------------------
let prevConeErr = Infinity;
let prevSphereErr = Infinity;
for (let n = 2; n <= 400; n += 1) {
  // cilindro: a pilha é exata com qualquer número de fatias
  close(discSum(PROFILES.retangulo, n), Math.PI * 1.5, 1e-12, `pilha do cilindro exata em N=${n}`);

  // cone: erro relativo fechado −1/(4N²), sempre por baixo e decrescente
  const coneSum = discSum(PROFILES.triangulo, n);
  const coneErr = (PROFILES.triangulo.exact - coneSum) / PROFILES.triangulo.exact;
  assert.ok(coneSum < PROFILES.triangulo.exact, `pilha do cone deve ficar abaixo do alvo em N=${n}`);
  close(coneErr, 1 / (4 * n * n), 1e-12, `erro relativo do cone em N=${n}`);
  assert.ok(coneErr < prevConeErr, `erro do cone deve decrescer; falhou em N=${n}`);
  prevConeErr = coneErr;

  // esfera: erro relativo fechado +1/(2N²), sempre por cima e decrescente
  const sphereSum = discSum(PROFILES.semicirculo, n);
  const sphereErr = (sphereSum - PROFILES.semicirculo.exact) / PROFILES.semicirculo.exact;
  assert.ok(sphereSum > PROFILES.semicirculo.exact, `pilha da esfera deve ficar acima do alvo em N=${n}`);
  close(sphereErr, 1 / (2 * n * n), 1e-12, `erro relativo da esfera em N=${n}`);
  assert.ok(sphereErr < prevSphereErr, `erro da esfera deve decrescer; falhou em N=${n}`);
  prevSphereErr = sphereErr;

  // dobrar as fatias divide o erro por 4 (a contração do Lab 04)
  if (n <= 200) {
    const coneErr2 = 1 / (4 * (2 * n) * (2 * n));
    close(coneErr / coneErr2, 4, 1e-9, `contração ao dobrar N no cone, N=${n}`);
  }
}

// qualquer tolerância é vencida com fatias suficientes (o gesto do Lab 05)
for (const eps of [1e-2, 1e-4, 1e-6]) {
  const nCone = Math.ceil(1 / (2 * Math.sqrt(eps))) + 1;
  const nSphere = Math.ceil(1 / Math.sqrt(2 * eps)) + 1;
  assert.ok(
    (PROFILES.triangulo.exact - discSum(PROFILES.triangulo, nCone)) / PROFILES.triangulo.exact < eps,
    `cone: N=${nCone} deveria vencer ε=${eps}`
  );
  assert.ok(
    (discSum(PROFILES.semicirculo, nSphere) - PROFILES.semicirculo.exact) / PROFILES.semicirculo.exact < eps,
    `esfera: N=${nSphere} deveria vencer ε=${eps}`
  );
}

// ---- razões exatas nas fórmulas -----------------------------------------
function vCylinder(R, h) { return Math.PI * R * R * h; }
function vCone(R, h) { return Math.PI * R * R * h / 3; }
function vSphere(R) { return 4 * Math.PI * R ** 3 / 3; }

for (const [R, h] of [[1, 1.5], [3, 4], [0.5, 7], [2, 2]]) {
  close(vCone(R, h) / vCylinder(R, h), 1 / 3, 1e-15, `cone/cilindro = 1/3 em R=${R}, h=${h}`);
}
for (const R of [1, 2, 3.7]) {
  close(vSphere(R) / vCylinder(R, 2 * R), 2 / 3, 1e-15, `esfera/cilindro circunscrito = 2/3 em R=${R}`);
  // o túmulo de Arquimedes: cone : esfera : cilindro = 1 : 2 : 3 na mesma caixa
  close(vSphere(R) / vCone(R, 2 * R), 2, 1e-15, `esfera/cone da caixa = 2 em R=${R}`);
  close(vCylinder(R, 2 * R) / vCone(R, 2 * R), 3, 1e-15, `cilindro/cone da caixa = 3 em R=${R}`);
}

// ---- erro fértil: metade na área, um terço no volume ---------------------
close((1 * 1.5 / 2) / (1 * 1.5), 1 / 2, 1e-15, 'área do triângulo é metade da área do retângulo');
close(vCone(1, 1.5) / vCylinder(1, 1.5), 1 / 3, 1e-15, 'mas o volume do cone é um terço, não metade');

// ---- valores do painel (N = 6, R = 1) ------------------------------------
close(discSum(PROFILES.retangulo, 6), 4.7124, 5e-5, 'painel: soma do cilindro (4,7124)');
close(PROFILES.retangulo.exact, 4.7124, 5e-5, 'painel: volume exato do cilindro (4,7124)');

close(discSum(PROFILES.triangulo, 6), 1.5599, 5e-5, 'painel: soma do cone com 6 fatias (1,5599)');
close(PROFILES.triangulo.exact, 1.5708, 5e-5, 'painel: volume exato do cone (1,5708)');
close((discSum(PROFILES.triangulo, 6) - PROFILES.triangulo.exact) / PROFILES.triangulo.exact, -0.0069, 5e-5, 'painel: erro do cone com 6 fatias (−0,69%)');
close(discSum(PROFILES.triangulo, 6) / (Math.PI * 1.5), 0.3310, 5e-5, 'painel: fração da caixa do cone (33,10%)');

close(discSum(PROFILES.semicirculo, 6), 4.2470, 5e-5, 'painel: soma da esfera com 6 fatias (4,2470)');
close(PROFILES.semicirculo.exact, 4.1888, 5e-5, 'painel: volume exato da esfera (4,1888)');
close((discSum(PROFILES.semicirculo, 6) - PROFILES.semicirculo.exact) / PROFILES.semicirculo.exact, 0.0139, 5e-5, 'painel: erro da esfera com 6 fatias (+1,39%)');
close(discSum(PROFILES.semicirculo, 6) / (Math.PI * 2), 0.6759, 5e-5, 'painel: fração da caixa da esfera (67,59%)');

// valores citados no smoke test (N = 12)
close(discSum(PROFILES.triangulo, 12), 1.5681, 5e-5, 'painel: soma do cone com 12 fatias (1,5681)');
close((discSum(PROFILES.triangulo, 12) - PROFILES.triangulo.exact) / PROFILES.triangulo.exact, -0.0017, 5e-5, 'painel: erro do cone com 12 fatias (−0,17%)');
close((discSum(PROFILES.semicirculo, 12) - PROFILES.semicirculo.exact) / PROFILES.semicirculo.exact, 0.0035, 5e-5, 'painel: erro da esfera com 12 fatias (+0,35%)');

// fórmulas fechadas da Oficina
for (const n of [2, 6, 12, 60, 240]) {
  close(discSum(PROFILES.triangulo, n), Math.PI * 1.5 * (1 / 3 - 1 / (12 * n * n)), 1e-12, `Oficina: fórmula fechada do cone em N=${n}`);
  close(discSum(PROFILES.semicirculo, n), (4 * Math.PI / 3) * (1 + 1 / (2 * n * n)), 1e-12, `Oficina: fórmula fechada da esfera em N=${n}`);
}

// exemplo pequeno do card de fórmulas (R = 1)
close(vCylinder(1, 1.5), 4.71, 5e-3, 'exemplo: cilindro ≈ 4,71');
close(vCone(1, 1.5), 1.57, 5e-3, 'exemplo: cone ≈ 1,57');
close(vSphere(1), 4.19, 5e-3, 'exemplo: esfera ≈ 4,19');

// ---- exercício A: cone R = 3, h = 4 --------------------------------------
close(vCone(3, 4), 37.70, 5e-3, 'exercício A: resposta 12π ≈ 37,70');
close(vCone(3, 4), 12 * Math.PI, 1e-12, 'exercício A: 12π exato');
close(vCylinder(3, 4), 113.10, 5e-3, 'exercício A: distrator 36π ≈ 113,10 (caixa sem o ÷3)');
close(Math.PI * 3 * 4 / 3, 12.57, 5e-3, 'exercício A: distrator 4π ≈ 12,57 (sem o quadrado)');
const coneA = { H: 4, radiusAt: z => 3 * (1 - z / 4), exact: vCone(3, 4) };
close(discSum(coneA, 200), 37.70, 5e-3, 'exercício A: pilha de 200 fatias dá ≈ 37,70 (gabarito)');

// ---- exercício B: esfera de volume 36π ------------------------------------
close(vSphere(3), 36 * Math.PI, 1e-12, 'exercício B: R = 3 devolve 36π');
close(36 * Math.PI, 113.10, 5e-3, 'exercício B: volume dado ≈ 113,10');
close(Math.cbrt(36 * 3 / 4), 3, 1e-12, 'exercício B: R³ = 27 → R = 3');
close(Math.cbrt(9), 2.08, 5e-3, 'exercício B: distrator sem o ÷3 (R³ = 9 → ≈ 2,08)');
close(Math.cbrt(36), 3.30, 5e-3, 'exercício B: distrator sem o 4/3 (R³ = 36 → ≈ 3,30)');
assert.ok(Math.abs(vSphere(Math.cbrt(9)) - 36 * Math.PI) > 20, 'exercício B: o distrator 2,08 não devolve o volume dado');
assert.ok(Math.abs(vSphere(Math.cbrt(36)) - 36 * Math.PI) > 20, 'exercício B: o distrator 3,30 não devolve o volume dado');

// ---- exercício C: retângulo 2 × 5, dois eixos ------------------------------
const upright = vCylinder(2, 5);
const lying = vCylinder(5, 2);
close(upright, 62.83, 5e-3, 'exercício C: giro em pé 20π ≈ 62,83');
close(lying, 157.08, 5e-3, 'exercício C: resposta 50π ≈ 157,08');
close(lying / upright, 2.5, 1e-15, 'exercício C: razão exata 5/2 (duas vezes e meia)');
close(upright * 6.25, 392.70, 5e-3, 'exercício C: distrator 125π ≈ 392,70 (quadrado sem devolver a altura)');
assert.ok(lying !== upright, 'exercício C: mesma área de perfil, volumes diferentes');

// honestidade da Oficina: N que garante ε no cone
close(1 / (4 * 51 * 51), 1 / (4 * 51 * 51), 0, 'sanidade');
for (const eps of [1e-3, 1e-5]) {
  const nGuar = Math.floor(1 / (2 * Math.sqrt(eps))) + 1;
  assert.ok(1 / (4 * nGuar * nGuar) < eps, `Oficina: N > 1/(2√ε) garante ε=${eps} no cone`);
}

console.log('Lab 07: pilha de discos exata no cilindro e convergente no cone (−1/(4N²)) e na esfera (+1/(2N²)) em N=2..400, razões 1/3 e 2/3 exatas (1:2:3 de Arquimedes), painel em N=6 e N=12, três exercícios com gabaritos e seis distratores conferidos sem divergência.');
