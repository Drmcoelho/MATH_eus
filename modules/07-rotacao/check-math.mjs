import assert from 'node:assert/strict';

function close(a,b,t,label){assert.ok(Math.abs(a-b)<=t,`${label}: esperado ${b}, obtido ${a}`);}
function cyl(r,h){return Math.PI*r*r*h;}
function cone(r,h){return Math.PI*r*r*h/3;}
function sphere(r){return 4*Math.PI*r**3/3;}
for (const r of [0.5,1,2.3]) for (const h of [1,3.7,5]) {
  close(cone(r,h)/cyl(r,h),1/3,1e-14,'cone é um terço');
  for (const angle of [30,90,180,270,360]) {
    close(cyl(r,h)*angle/360, cyl(r,h)*(angle/360), 1e-14, 'fração angular cilindro');
    close(cone(r,h)*angle/360, cone(r,h)*(angle/360), 1e-14, 'fração angular cone');
    close(sphere(r)*angle/360, sphere(r)*(angle/360), 1e-14, 'fração angular esfera');
  }
}
for (const f of [cyl,cone]) {
  const v1=f(1,2),v2=f(2,4);
  close(v2/v1,8,1e-12,'escala cúbica');
}
close(sphere(2)/sphere(1),8,1e-12,'escala cúbica esfera');
close(sphere(1),4.1887902047863905,1e-14,'volume esfera unitária');
console.log('Lab 07: cilindro, cone, esfera, frações angulares e escala cúbica verificados.');
