import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const PI=Math.PI;
const pin=n=>2*n*Math.sin(PI/n);
const ain=n=>n/2*Math.sin(2*PI/n);
const pout=n=>2*n*Math.tan(PI/n);
const aout=n=>n*Math.tan(PI/n);
const close=(a,b,t,l)=>assert.ok(Math.abs(a-b)<=t,`${l}: esperado ${b}, obtido ${a}`);

for(let n=3;n<=1000;n++){
  for(const h of [.5,1,1.5,2,3,5,7.25]){
    const li=pin(n)*h,lc=2*PI*h,lo=pout(n)*h;
    const vi=ain(n)*h,vc=PI*h,vo=aout(n)*h;
    assert.ok(li<lc&&lc<lo,`cerco lateral n=${n}, h=${h}`);
    assert.ok(vi<vc&&vc<vo,`cerco volumétrico n=${n}, h=${h}`);
    close(li/lc,pin(n)/(2*PI),2e-15,`razão lateral n=${n}, h=${h}`);
    close(vi/vc,ain(n)/PI,2e-15,`razão volumétrica n=${n}, h=${h}`);
    close(lo/lc,vo/vc,2e-14,`empate externo n=${n}, h=${h}`);
    close(lc-li,h*(2*PI-pin(n)),2e-14,`erro absoluto lateral n=${n}, h=${h}`);
    close(vc-vi,h*(PI-ain(n)),2e-14,`erro absoluto volumétrico n=${n}, h=${h}`);
  }
}

close(pin(6)*1.5,9,1e-12,'parede interna inicial');
close(2*PI*1.5,9.4248,5e-5,'parede cilindro inicial');
close(ain(6)*1.5,3.8971,5e-5,'volume interno inicial');
close(PI*1.5,4.7124,5e-5,'volume cilindro inicial');
close(1-pin(6)/(2*PI),.04507,5e-5,'erro relativo parede inicial');
close(1-ain(6)/PI,.17301,5e-5,'erro relativo volume inicial');
close(pout(6)/(2*PI)-1,aout(6)/PI-1,1e-15,'empate externo hexágono');

close(12*5,60,1e-12,'exercício parede');
const A=51.9615/5,P=60/5;
close(2*A/P,Math.sqrt(3),5e-5,'apótema reconstruído');
for(const h of [.5,1,2,5]){
  for(const s of [0,.25,.5,1,2]){
    const wall=2*h+2*Math.hypot(h,s);
    const volume=h;
    assert.ok(wall>=4*h,`parede cisalhada não diminui h=${h},s=${s}`);
    if(s>0)assert.ok(wall>4*h,`parede cresce com cisalha h=${h},s=${s}`);
    close(volume,1*h,1e-15,`Cavalieri h=${h},s=${s}`);
  }
}

const perUnitArea=n=>2*Math.sqrt(n*Math.tan(PI/n));
assert.ok(perUnitArea(6)<perUnitArea(4)&&perUnitArea(4)<perUnitArea(3),'hexágono vence entre ladrilhos regulares');
let prev=Infinity;
for(let n=3;n<=1000;n++){
  const tax=perUnitArea(n)-2*Math.sqrt(PI);
  assert.ok(tax>0&&tax<prev,`imposto de contorno decresce n=${n}`);
  prev=tax;
}

const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1]||'';
new vm.Script(js);
assert.equal((html.match(/class="route-step"/g)||[]).length,6,'seis atos');
assert.equal((html.match(/data-step="[1-9]"/g)||[]).length,9,'nove passos');
const markup=html.split('<script>')[0];
assert.equal((markup.match(/data-ex="/g)||[]).length,12,'quatro exercícios com três alternativas');
assert.equal((html.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.equal((html.match(/<canvas /g)||[]).length,3,'três Canvas');
assert.match(html,/aria-valuemax="10"/);
assert.match(html,/Agora o laboratório termina de verdade/);
assert.match(html,/S<sub>lateral<\/sub>=P·h/);
assert.match(html,/V=A·h/);
assert.match(html,/princípio de Cavalieri/i);
assert.match(js,/step===8&&!state\.derived/);
assert.match(js,/state\.audited=true/);
assert.match(js,/state\.certified=true/);
assert.ok(!html.includes('predicted && manipulated'),'sem trava invisível');
assert.ok(html.includes('<style>')&&js.length>8000,'HTML autocontido com interação incorporada');
assert.ok(!html.includes('src="lab.js"')&&!html.includes('href="lab.css"'),'sem dependências locais externas');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs únicos');

console.log('Lab 06: extrusão, erros absolutos/relativos, empate externo, cisalha, Cavalieri e contrato canônico verificados sem divergência.');
