import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const sites = [
  ['closure', '../modules/01-duas-circunferencias/index.html'],
  ['closure', '../modules/01b-poligono-escondido/index.html'],
  ['closure', '../modules/02-perimetros/index.html'],
  ['closure', '../modules/03-areas/index.html'],
  ['proof', '../modules/04-erro/index.html'],
  ['proof', '../modules/05-limite/index.html'],
  ['family', '../modules/s02-01-ternas-pitagoricas/index.html'],
  ['family', '../modules/s02-02-mapa-das-ternas/index.html'],
  ['family', '../modules/s02-03-que-numeros-entram/index.html'],
];

const allowed = new Set(['closure', 'break', 'family', 'proof']);
for (const [type, href] of sites) {
  assert(allowed.has(type), `movimento desconhecido: ${type}`);
  await access(new URL(href, import.meta.url));
}

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
for (const token of [
  '<canvas id="atlas"',
  'Arraste o centro',
  'quatro movimentos',
  'exercício de transferência',
  'intuição → figura → manipulação',
]) assert(html.includes(token), `elemento canônico ausente: ${token}`);

for (const [, href] of sites) assert(html.includes(href), `laboratório não ligado: ${href}`);

// Identidades que sustentam os sítios já materializados.
for (const n of [3, 4, 6, 12, 96, 1000]) {
  const x = Math.PI / n;
  const pIn = 2 * n * Math.sin(x);
  const pOut = 2 * n * Math.tan(x);
  assert(pIn < 2 * Math.PI && 2 * Math.PI < pOut);

  const aIn = n * Math.sin(x) * Math.cos(x);
  const aOut = n * Math.tan(x);
  assert(aIn < Math.PI && Math.PI < aOut);
}

for (const n of [3, 5, 7, 9, 19, 101]) {
  const b = (n * n - 1) / 2;
  const c = (n * n + 1) / 2;
  assert.equal(n * n + b * b, c * c);
  assert.equal(c - b, 1);
}

// O atlas não pode virar um índice puramente textual.
const visualSignals = (html.match(/canvas|quadraticCurveTo|arc\(|createRadialGradient/g) || []).length;
const interactionSignals = (html.match(/pointer|keydown|data-filter|quiz-card/g) || []).length;
assert(visualSignals >= 8, 'densidade visual insuficiente');
assert(interactionSignals >= 8, 'densidade interativa insuficiente');

console.log(`Atlas do Resto: ${sites.length} sítios ligados, 4 movimentos e identidades verificadas.`);
