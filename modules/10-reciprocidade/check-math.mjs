import assert from 'node:assert/strict';

function close(a,b,t,label){assert.ok(Math.abs(a-b)<=t,`${label}: esperado ${b}, obtido ${a}`);}
function sums(N,R){
  const exact=Math.PI*R**2;
  const dr=R/N;
  let left=0,mid=0,right=0;
  for(let i=0;i<N;i++){
    left+=2*Math.PI*(i*dr)*dr;
    mid+=2*Math.PI*((i+.5)*dr)*dr;
    right+=2*Math.PI*((i+1)*dr)*dr;
  }
  return {left,mid,right,exact};
}
for (const R of [0.5,1,2,3.7]) for (let N=1;N<=200;N++) {
  const s=sums(N,R);
  close(s.left,s.exact*(1-1/N),1e-11,'soma interna');
  close(s.mid,s.exact,1e-11,'ponto médio exato');
  close(s.right,s.exact*(1+1/N),1e-11,'soma externa');
  close(s.right-s.left,2*s.exact/N,1e-11,'largura do cerco');
  assert.ok(s.left<=s.exact && s.exact<=s.right,'cerco final');
}
close(sums(8,2).right-sums(8,2).left,Math.PI,1e-14,'desafio R=2 N=8');
const A=r=>Math.PI*r*r;
for (const r of [0.3,1,4]) {
  const h=1e-7;
  close((A(r+h)-A(r))/h,2*Math.PI*r,1e-6,'derivada da área');
}
console.log('Lab 10: somas interna, média e externa, cerco, reciprocidade e desafio final verificados.');
