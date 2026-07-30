import assert from 'node:assert/strict';

// Lab 08: a integral como máquina de acumulação. As mesmas somas da página
// (anéis pela borda interna, setores do leque, discos inscritos da esfera)
// convergem aos alvos exatos πR², πR² e 4πR³/3, com erro decrescente e ordem
// medida como no Lab 04. O triângulo dos anéis desenrolados fecha πR² por
// inspeção, a garantia estilo Lab 05 encontra o menor corte para cada
// tolerância sem recaída, e todos os números citados na página conferem.

const PI = Math.PI;

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

// ---------- as três somas exibidas na página (R = 1) ----------

function somaAneis(n) { // borda interna: contribuição 2π·r_i·Δr, r_i = i/n
  let s = 0;
  for (let i = 0; i < n; i += 1) s += 2 * PI * (i / n) * (1 / n);
  return s;
}

function somaSetores(n) { // leque: n triângulos de ângulo 2π/n
  let s = 0;
  for (let i = 0; i < n; i += 1) s += 0.5 * Math.sin(2 * PI / n);
  return s;
}

function somaDiscos(n) { // pilha inscrita: em cada fatia, o disco de raio mínimo
  const h = 2 / n;
  let s = 0;
  for (let i = 0; i < n; i += 1) {
    const a = -1 + i * h;
    const b = a + h;
    s += h * PI * (1 - Math.max(a * a, b * b));
  }
  return s;
}

function somaDiscosPontoMedio(n) { // oficina: raio medido no meio da fatia
  const h = 2 / n;
  let s = 0;
  for (let i = 0; i < n; i += 1) {
    const m = -1 + (i + 0.5) * h;
    s += h * PI * (1 - m * m);
  }
  return s;
}

function somaAneisPontoMedio(n) { // oficina: anel desenrolado pelo raio médio
  let s = 0;
  for (let i = 0; i < n; i += 1) s += 2 * PI * ((i + 0.5) / n) * (1 / n);
  return s;
}

const VOLUME_ESFERA = 4 * PI / 3;
const DOBRAS = [4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];

// convergência com erro estritamente decrescente nas três somas
const ALVOS = [
  ['anéis', somaAneis, PI],
  ['setores', somaSetores, PI],
  ['discos', somaDiscos, VOLUME_ESFERA]
];

for (const [nome, soma, alvo] of ALVOS) {
  let anterior = Infinity;
  for (const n of DOBRAS) {
    const erro = alvo - soma(n);
    assert.ok(erro > 0, `${nome}: a soma inscrita deve ficar abaixo do alvo em n=${n}`);
    assert.ok(erro < anterior, `${nome}: o erro deve cair ao dobrar, falhou em n=${n}`);
    anterior = erro;
  }
}

// ---------- a ordem de cada corte, medida como no Lab 04 ----------

// anéis pela borda interna: erro = π/n EXATO, logo n × erro = π cravado
for (const n of DOBRAS) {
  close(somaAneis(n), PI * (n - 1) / n, 1e-12, `soma dos anéis fecha π(n−1)/n em n=${n}`);
  close(n * (PI - somaAneis(n)), PI, 1e-9, `n × erro dos anéis crava π em n=${n}`);
}

// anéis pelo raio médio: exatos para todo n (a coroa é 2π·r_médio·Δr exata)
for (const n of DOBRAS) {
  close(somaAneisPontoMedio(n), PI, 1e-12, `anéis pelo raio médio são exatos em n=${n}`);
}

// setores: ordem quadrática — n² × erro estabiliza em 2π³/3 ≈ 20,671
{
  const constante = 2 * PI ** 3 / 3;
  close(constante, 20.671, 5e-4, 'constante 2π³/3 citada na oficina');
  let desvioAnterior = Infinity;
  // até 4096: acima disso o arredondamento da soma repetida (≈ 10⁻¹³) já pesa
  // mais do que a distância real até a constante (≈ 10⁻⁶)
  for (const n of DOBRAS.filter(n => n <= 4096)) {
    const escalado = n * n * (PI - somaSetores(n));
    const desvio = Math.abs(escalado - constante);
    assert.ok(desvio < desvioAnterior, `setores: n² × erro deve se aproximar de 2π³/3, falhou em n=${n}`);
    desvioAnterior = desvio;
  }
  close(4096 ** 2 * (PI - somaSetores(4096)), constante, 1e-3, 'estabilização final dos setores');
}

// discos inscritos: primeira ordem — n × erro estabiliza em 2π ≈ 6,28
{
  let desvioAnterior = Infinity;
  for (const n of DOBRAS) {
    const desvio = Math.abs(n * (VOLUME_ESFERA - somaDiscos(n)) - 2 * PI);
    assert.ok(desvio < desvioAnterior, `discos: n × erro deve se aproximar de 2π, falhou em n=${n}`);
    desvioAnterior = desvio;
  }
  close(8192 * (VOLUME_ESFERA - somaDiscos(8192)), 2 * PI, 5e-3, 'estabilização final dos discos');
}

// discos pelo ponto médio (oficina): sobra exatamente 2π/(3n²) — perfil quadrático
for (const n of DOBRAS.filter(n => n <= 1024)) {
  const sobra = somaDiscosPontoMedio(n) - VOLUME_ESFERA;
  assert.ok(sobra > 0, `ponto médio dos discos deve exceder o volume em n=${n}`);
  close(n * n * sobra, 2 * PI / 3, 1e-5, `n² × sobra do ponto médio crava 2π/3 em n=${n}`);
}
close(2 * PI / 3, 2.094, 5e-4, 'valor 2,094 citado na oficina');

// contração por dobra: ÷2 nos anéis (exato) e ÷4 assintótico nos setores
for (let i = 1; i < DOBRAS.length; i += 1) {
  const razaoAneis = (PI - somaAneis(DOBRAS[i])) / (PI - somaAneis(DOBRAS[i - 1]));
  close(razaoAneis, 0.5, 1e-9, `dobra dos anéis divide o erro por 2 em n=${DOBRAS[i]}`);
}
close((PI - somaSetores(4096)) / (PI - somaSetores(2048)), 0.25, 1e-4, 'dobra dos setores divide o erro por 4');

// ---------- o triângulo dos anéis desenrolados ----------

for (const R of [1, 2, 3.5]) {
  const base = 2 * PI * R;
  const altura = R;
  close((base * altura) / 2, PI * R * R, 1e-12, `triângulo desenrolado: base 2πR × altura R ÷ 2 = πR² para R=${R}`);
}

// ---------- garantia estilo Lab 05: menor corte que vence a tolerância ----------

function menorCorte(soma, alvo, tolerancia, passo = 1, inicio = 4) {
  let n = inicio;
  while (alvo - soma(n) >= tolerancia) n += passo;
  return n;
}

// anéis: erro = π/n, então o menor n é ⌊π/tol⌋ + 1 — 3 142 e 31 416, citados
{
  const n3 = menorCorte(somaAneis, PI, 1e-3);
  const n4 = menorCorte(somaAneis, PI, 1e-4, 1, 30000);
  assert.equal(n3, 3142, 'menor número de anéis para 10⁻³ citado na página');
  assert.equal(n4, 31416, 'menor número de anéis para 10⁻⁴ citado na página');
  for (let n = n3; n <= n3 + 500; n += 1) {
    assert.ok(PI - somaAneis(n) < 1e-3, `recaída dos anéis em n=${n}`);
  }
  for (let n = n4; n <= n4 + 500; n += 1) {
    assert.ok(PI - somaAneis(n) < 1e-4, `recaída dos anéis em n=${n}`);
  }
}

// setores: 144 cortes bastam para 10⁻³ (citado na oficina), sem recaída
{
  const n3 = menorCorte(somaSetores, PI, 1e-3);
  assert.equal(n3, 144, 'menor número de setores para 10⁻³ citado na oficina');
  for (let n = n3; n <= n3 + 500; n += 1) {
    assert.ok(PI - somaSetores(n) < 1e-3, `recaída dos setores em n=${n}`);
  }
  const n4 = menorCorte(somaSetores, PI, 1e-4);
  assert.equal(n4, 455, 'menor número de setores para 10⁻⁴');
  for (let n = n4; n <= n4 + 500; n += 1) {
    assert.ok(PI - somaSetores(n) < 1e-4, `recaída dos setores em n=${n}`);
  }
}

// discos: garantia também existe (números não citados na página), sem recaída
{
  const n3 = menorCorte(somaDiscos, VOLUME_ESFERA, 1e-3, 2, 6000);
  assert.ok(VOLUME_ESFERA - somaDiscos(n3) < 1e-3, 'discos vencem a tolerância 10⁻³');
  for (let n = n3; n <= n3 + 200; n += 1) {
    assert.ok(VOLUME_ESFERA - somaDiscos(n) < 1e-3, `recaída dos discos em n=${n}`);
  }
}

// ---------- valores citados na página ----------

// painel inicial (modo anéis, n = 4)
close(somaAneis(4), 2.3562, 5e-5, 'soma inicial do painel');
close(PI, 3.1416, 5e-5, 'alvo exato do painel');
close(((PI - somaAneis(4)) / PI) * 100, 25, 1e-9, 'erro percentual inicial de 25,00%');
close(4 * (PI - somaAneis(4)), 3.1416, 5e-5, 'n × erro inicial do painel');
close(somaSetores(4), 2, 1e-12, 'soma dos setores em n=4');
close(VOLUME_ESFERA, 4.1888, 5e-5, 'alvo dos discos exibido');

// erro fértil: sem a espessura, a soma dos contornos vale π(n−1) e explode
{
  function somaSemEspessura(n) {
    let s = 0;
    for (let i = 0; i < n; i += 1) s += 2 * PI * (i / n);
    return s;
  }
  close(somaSemEspessura(8), PI * 7, 1e-12, 'soma sem espessura em n=8 fecha π(n−1)');
  close(somaSemEspessura(8), 22.0, 5e-2, 'valor ≈ 22,0 citado no Erro fértil');
  close(somaSemEspessura(16), 47.1, 5e-2, 'valor ≈ 47,1 citado no Erro fértil');
  let anterior = 0;
  for (let n = 4; n <= 4096; n *= 2) {
    assert.ok(somaSemEspessura(n) > anterior, `sem espessura a soma deve crescer, falhou em n=${n}`);
    anterior = somaSemEspessura(n);
  }
  assert.ok(somaSemEspessura(4096) > 1000, 'sem espessura a soma passa de qualquer teto');
}

// exercício A: cilindro R = 1, h = 2 — ∫₀² π dz = 2π; distrator dos contornos = 4π
{
  function riemann(f, a, b, n) {
    const h = (b - a) / n;
    let s = 0;
    for (let i = 0; i < n; i += 1) s += h * f(a + (i + 0.5) * h);
    return s;
  }
  close(riemann(() => PI, 0, 2, 2000), 2 * PI, 1e-9, 'exercício A: a acumulação fecha 2π');
  close(2 * PI, 6.2832, 5e-5, 'valor 2π ≈ 6,2832 citado no gabarito de A');
  close(riemann(() => 2 * PI, 0, 2, 2000), 4 * PI, 1e-9, 'distrator de A: contornos dariam 4π');
  close(4 * PI, 12.57, 5e-3, 'valor 4π ≈ 12,57 citado no gabarito de A');

  // exercício B: cone R = 1, h = 3 — discos π(1 − z/3)² fecham πR²h/3 = π
  const perfilCone = z => PI * (1 - z / 3) ** 2;
  close(riemann(perfilCone, 0, 3, 200000), PI, 1e-8, 'exercício B: os discos do cone fecham π');
  close(PI * 1 * 1 * 3 / 3, PI, 1e-12, 'fórmula do cone πR²h ÷ 3 confere com a acumulação');
  close(riemann(z => 2 * PI * (1 - z / 3), 0, 3, 2000), 3 * PI, 1e-9, 'distrator de B: contornos dariam 3π');
  close(3 * PI, 9.42, 5e-3, 'valor 3π ≈ 9,42 citado no gabarito de B');
  close(riemann(perfilCone, 0, 1, 200000), 19 * PI / 27, 1e-8, 'distrator de B: parar em z=1 dá o tronco 19π/27');
  close(19 * PI / 27, 2.21, 5e-3, 'valor ≈ 2,21 citado no feedback de B');

  // exercício C: 2πr·dr acumula a área π; a receita certa são as cascas 4πr²·dr
  close(riemann(r => 2 * PI * r, 0, 1, 2000), PI, 1e-9, 'exercício C: a proposta errada converge para π (área)');
  close(PI, 3.14, 5e-3, 'valor ≈ 3,14 citado no enunciado de C');
  close(riemann(r => 4 * PI * r * r, 0, 1, 200000), VOLUME_ESFERA, 1e-8, 'exercício C: as cascas 4πr²·dr fecham 4π/3');
  close(VOLUME_ESFERA, 4.19, 5e-3, 'valor 4π/3 ≈ 4,19 citado no gabarito de C');
  assert.ok(Math.abs(PI - VOLUME_ESFERA) > 1, 'área do círculo e volume da esfera não se confundem');
}

console.log('Lab 08: três somas convergindo aos alvos exatos com ordem medida (n×erro = π cravado, 2π³/3 e 2π estabilizando), triângulo desenrolado fechando πR², garantias de 10⁻³ e 10⁻⁴ sem recaída e todos os números citados na página conferidos.');
