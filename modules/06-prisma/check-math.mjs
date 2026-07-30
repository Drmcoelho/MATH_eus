import assert from 'node:assert/strict';

// Lab 06: a extrusão multiplica as medidas do plano pela altura h e preserva
// exatamente os erros relativos — parede/parede = perímetro/perímetro e
// volume/volume = área/área, para qualquer h. O empate do circunscrito
// (Lab 03) sobe intacto. Os boxes citam o favo (n = 3, 4, 6) e a lata
// (círculo com o menor perímetro por área).

function close(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: esperado ${expected}, obtido ${actual}`
  );
}

function perimeterIn(n) { return 2 * n * Math.sin(Math.PI / n); }
function areaIn(n) { return (n / 2) * Math.sin(2 * Math.PI / n); }
function perimeterOut(n) { return 2 * n * Math.tan(Math.PI / n); }
function areaOut(n) { return n * Math.tan(Math.PI / n); }

const HEIGHTS = [0.5, 1, 1.5, 2, 3, 7.25];

for (let n = 3; n <= 1000; n += 1) {
  for (const h of HEIGHTS) {
    const lateralIn = perimeterIn(n) * h;
    const lateralOut = perimeterOut(n) * h;
    const lateralCylinder = 2 * Math.PI * h;
    const volumeIn = areaIn(n) * h;
    const volumeOut = areaOut(n) * h;
    const volumeCylinder = Math.PI * h;

    // o cerco sobe: prisma de dentro < cilindro < prisma de fora
    assert.ok(lateralIn < lateralCylinder && lateralCylinder < lateralOut, `cerco da parede em n=${n}, h=${h}`);
    assert.ok(volumeIn < volumeCylinder && volumeCylinder < volumeOut, `cerco do volume em n=${n}, h=${h}`);

    // preservação exata dos erros relativos: o h corta em qualquer razão
    close(lateralIn / lateralCylinder, perimeterIn(n) / (2 * Math.PI), 1e-15, `parede ÷ cilindro = razão do plano, n=${n}, h=${h}`);
    close(volumeIn / volumeCylinder, areaIn(n) / Math.PI, 1e-15, `volume ÷ cilindro = razão do plano, n=${n}, h=${h}`);

    // o empate do circunscrito (Lab 03) sobe intacto
    close(
      lateralOut / lateralCylinder,
      volumeOut / volumeCylinder,
      1e-14,
      `empate do prisma de fora em n=${n}, h=${h}`
    );
  }
}

// valores exibidos no painel inicial (n = 6, h = 1,5)
close(perimeterIn(6) * 1.5, 9, 1e-12, 'parede inicial do prisma');
close(2 * Math.PI * 1.5, 9.4248, 5e-5, 'parede inicial do cilindro');
close(areaIn(6) * 1.5, 3.8971, 5e-5, 'volume inicial do prisma');
close(Math.PI * 1.5, 4.7124, 5e-5, 'volume inicial do cilindro');
close(perimeterIn(6) / (2 * Math.PI), 0.9549, 5e-5, 'cobertura da parede citada');
close(areaIn(6) / Math.PI, 0.8270, 5e-5, 'cobertura do volume citada');
close(perimeterOut(6) / (2 * Math.PI) - 1, 0.1027, 5e-5, 'excesso da parede de fora citado');
close(areaOut(6) / Math.PI - 1, 0.1027, 5e-5, 'excesso do volume de fora citado');

// exercício A: favo com perímetro 12, apótema √3, altura 5
const hexApothem = Math.sqrt(3);
close(12 * 5, 60, 1e-12, 'lateral do exercício A');
close(12 * hexApothem / 2 * 5, 51.9615, 5e-4, 'volume do exercício A/B');
close(12 * hexApothem * 5, 103.923, 5e-3, 'distrator 103,9 do exercício A');

// exercício B: reconstrução do apótema a partir do espaço
const recoveredPerimeter = 60 / 5;
const recoveredArea = (12 * hexApothem / 2 * 5) / 5;
close(2 * recoveredArea / recoveredPerimeter, hexApothem, 1e-12, 'apótema reconstruído no exercício B');
close(hexApothem, 1.732, 5e-4, 'valor citado do apótema');

// exercício C: o prisma torto quebra a fórmula da parede, não a do volume.
// Baralho quadrado de lado 1 empurrado a 45°: duas paredes ficam √2 vezes
// maiores; a seção reta continua a base, então o volume segue A·h (Cavalieri)
const uprightWall = 4 * 1;
const tiltedWall = 2 * 1 + 2 * Math.sqrt(2);
assert.ok(tiltedWall > uprightWall, 'inclinação aumenta a parede do baralho');
close(tiltedWall / 2 - 1, Math.sqrt(2), 1e-12, 'paredes empurradas crescem √2');

// boxes: favo (entre os ladrilhos regulares, o hexágono gasta menos contorno
// por área) e lata (o círculo bate qualquer polígono; o imposto cai com n)
function perimeterForUnitArea(n) { return 2 * Math.sqrt(n * Math.tan(Math.PI / n)); }
close(perimeterForUnitArea(3), 4.559, 5e-4, 'triângulo citado no favo');
close(perimeterForUnitArea(4), 4, 1e-12, 'quadrado citado no favo');
close(perimeterForUnitArea(6), 3.722, 5e-4, 'hexágono citado no favo');
assert.ok(
  perimeterForUnitArea(6) < perimeterForUnitArea(4) && perimeterForUnitArea(4) < perimeterForUnitArea(3),
  'o hexágono vence o favo'
);

const circlePerimeter = 2 * Math.sqrt(Math.PI);
let previousTax = Infinity;
for (let n = 3; n <= 1000; n += 1) {
  const tax = perimeterForUnitArea(n) - circlePerimeter;
  assert.ok(tax > 0, `o imposto de contorno deve ser positivo em n=${n}`);
  assert.ok(tax < previousTax, `o imposto de contorno deve cair com n; falhou em n=${n}`);
  previousTax = tax;
}

console.log('Lab 06: preservação exata dos erros na extrusão (6 alturas × 998 bases), o empate que sobe, os três exercícios com gabarito e os números do favo e da lata verificados sem divergência.');
