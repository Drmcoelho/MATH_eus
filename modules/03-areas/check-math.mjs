import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const C=Math.PI;
const areaIn=(n,R=1)=>n*R*R*Math.sin(Math.PI/n)*Math.cos(Math.PI/n);
const areaOut=(n,R=1)=>n*R*R*Math.tan(Math.PI/n);
const circle=R=>Math.PI*R*R;
const close=(a,b,t,l)=>assert.ok(Math.abs(a-b)<=t,`${l}: esperado ${b}, obtido ${a}`);
let prevIn=0,prevOut=Infinity,prevRatio=0;
for(let n=3;n<=1000;n++){
 const ai=areaIn(n),ao=areaOut(n),ac=C;
 assert.ok(ai<ac&&ao>ac,`cerco de área n=${n}`);
 assert.ok(ai>prevIn,`área interna crescente n=${n}`);
 assert.ok(ao<prevOut,`área externa decrescente n=${n}`);
 prevIn=ai;prevOut=ao;
 close(ai,(2*n*Math.sin(Math.PI/n))*Math.cos(Math.PI/n)/2,1e-12,`A=Pa/2 interno n=${n}`);
 close(ao,(2*n*Math.tan(Math.PI/n))/2,1e-12,`A=Pa/2 externo n=${n}`);
 const ratio=(ac-ai)/(ao-ac);
 assert.ok(ratio>prevRatio,`razão falta/sobra crescente n=${n}`);
 assert.ok(ratio<2,`razão abaixo de 2 n=${n}`);
 prevRatio=ratio;
}
close(prevRatio,2,2e-5,'razão assintótica em n=1000');
close(areaIn(12),3,1e-12,'dodecágono interno exato');
close(areaOut(12),3.215390309,1e-9,'dodecágono externo');
close(areaIn(6),3*Math.sqrt(3)/2,1e-12,'hexágono interno');
for(const n of [3,6,12,24,96])for(const R of [.5,1,2,3]){
 close(areaIn(n,2*R),4*areaIn(n,R),1e-11,`escala interna n=${n},R=${R}`);
 close(areaOut(n,2*R),4*areaOut(n,R),1e-11,`escala externa n=${n},R=${R}`);
 close(circle(2*R),4*circle(R),1e-11,`escala círculo R=${R}`);
}
for(const n of [12,24,48,96]){
 const ei=circle(1)-areaIn(n),ei2=circle(1)-areaIn(2*n);
 const eo=areaOut(n)-circle(1),eo2=areaOut(2*n)-circle(1);
 assert.ok(ei2/ei>.24&&ei2/ei<.26,`erro interno ~1/4 n=${n}`);
 assert.ok(eo2/eo>.24&&eo2/eo<.26,`erro externo ~1/4 n=${n}`);
}
const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const css=readFileSync(new URL('./lab.css',import.meta.url),'utf8');
const js=readFileSync(new URL('./lab.js',import.meta.url),'utf8');
new vm.Script(js);
assert.match(html,/Mapa do laboratório/);
assert.equal((html.match(/class="route-step"/g)||[]).length,6,'seis atos anunciados');
assert.equal((html.match(/data-step="[1-8]"/g)||[]).length,8,'oito passos de dedução');
assert.equal((html.match(/data-ex="/g)||[]).length,12,'quatro exercícios com três respostas');
assert.equal((html.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.equal((html.match(/<canvas/g)||[]).length,2,'dois Canvas');
assert.match(html,/Agora o laboratório termina de verdade/);
assert.match(html,/A = P·a\/2/);
assert.match(html,/falta interna ÷ sobra externa → 2/);
assert.match(html,/rel="icon"/);
assert.ok(!js.includes('predicted && manipulated'),'sem trava invisível');
assert.match(js,/sections\.forEach\(s=>s\.hidden=false\)/);
assert.match(css,/\.stepper\{position:sticky/,'controles móveis acessíveis');
console.log('Lab 03: 998 cercos, leque exato, escala R², erro n⁻², razão →2 e arquitetura canônica verificados sem divergência.');
