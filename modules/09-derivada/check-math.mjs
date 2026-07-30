import assert from 'node:assert/strict';

function close(a,b,t,label){assert.ok(Math.abs(a-b)<=t,`${label}: esperado ${b}, obtido ${a}`);}
for (const r of [0.5,1,3,10]) for (const dr of [0.5,0.2,0.1,0.01,1e-4]) {
  const exact=Math.PI*((r+dr)**2-r**2);
  const linear=2*Math.PI*r*dr;
  const rest=Math.PI*dr**2;
  close(exact,linear+rest,1e-12,'identidade da coroa');
  close(exact/dr,2*Math.PI*r+Math.PI*dr,1e-8,'quociente incremental');
  close((Math.PI*(dr/2)**2)/rest,1/4,1e-14,'resto quadrático');
}
for (const r of [0.7,2,5]) {
  const q=(dr=>Math.PI*((r+dr)**2-r**2)/dr)(1e-7);
  close(q,2*Math.PI*r,1e-6,'limite do quociente');
}
close(Math.PI*0.01**2,0.0003141592653589793,1e-16,'desafio');
console.log('Lab 09: identidade da coroa, aproximação linear, resto quadrático e derivada 2πr verificados.');
