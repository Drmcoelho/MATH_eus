import assert from 'node:assert/strict';

function close(a,b,t,label){assert.ok(Math.abs(a-b)<=t,`${label}: esperado ${b}, obtido ${a}`);}
function approx(N,R){
  const dx=2*R/N;let s=0;
  for(let i=0;i<N;i++){const x=-R+(i+.5)*dx;s+=Math.PI*(R*R-x*x)*dx;}
  return s;
}
for (const R of [0.5,1,2]) {
  const exact=4*Math.PI*R**3/3;
  for (let N=2;N<=200;N++) {
    const err=approx(N,R)-exact;
    close(err,2*Math.PI*R**3/(3*N**2),1e-11,`erro exato R=${R} N=${N}`);
    close((approx(2*N,R)-exact)/err,1/4,2e-9,`contração R=${R} N=${N}`);
  }
}
const exact=4*Math.PI/3;
assert.ok(approx(45,1)-exact>=0.001,'N=45 ainda falha');
assert.ok(approx(46,1)-exact<0.001,'N=46 vence');
close(approx(8,1)-exact,2*Math.PI/(3*64),1e-14,'valor inicial');
console.log('Lab 08: soma de discos, erro exato 2πR³/(3N²), contração 1/4 e limiar N=46 verificados.');
