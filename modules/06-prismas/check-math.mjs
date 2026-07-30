import assert from 'node:assert/strict';

function close(actual, expected, tolerance, label) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: esperado ${expected}, obtido ${actual}`);
}
function base(n, R) {
  const t = Math.PI / n;
  return {
    Ain: (n / 2) * R ** 2 * Math.sin(2 * t),
    Aout: n * R ** 2 * Math.tan(t),
    Pin: 2 * n * R * Math.sin(t),
    Pout: 2 * n * R * Math.tan(t)
  };
}
for (let n = 3; n <= 200; n++) {
  for (const R of [0.4, 1, 2.5]) {
    for (const h of [0.3, 1.7, 5]) {
      const b = base(n, R);
      const Vc = Math.PI * R ** 2 * h;
      const Lc = 2 * Math.PI * R * h;
      assert.ok(b.Ain * h < Vc && Vc < b.Aout * h, `cerco de volumes n=${n}`);
      assert.ok(b.Pin * h < Lc && Lc < b.Pout * h, `cerco lateral n=${n}`);
      close((b.Ain * h) / Vc, b.Ain / (Math.PI * R ** 2), 1e-14, `razão independente de h n=${n}`);
    }
  }
}
for (const n of [3, 8, 32]) {
  const b1 = base(n, 1), b2 = base(n, 2);
  close(b2.Pin / b1.Pin, 2, 1e-12, 'comprimento escala linear');
  close(b2.Ain / b1.Ain, 4, 1e-12, 'área escala quadrática');
  const V1 = b1.Ain * 2, V2 = b2.Ain * 4;
  close(V2 / V1, 8, 1e-12, 'volume escala cúbica');
  close((b2.Pin * 4) / (b1.Pin * 2), 4, 1e-12, 'área lateral escala quadrática');
}
console.log('Lab 06: cerco espacial, extrusão, independência da altura e leis λ, λ² e λ³ verificados.');
