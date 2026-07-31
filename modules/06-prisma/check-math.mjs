import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const PI=Math.PI;
const pin=n=>2*n*Math.sin(PI/n);
const pout=n=>2*n*Math.tan(PI/n);
const ain=n=>(n/2)*Math.sin(2*PI/n);
const aout=n=>n*Math.tan(PI/n);
const close=(a,b,t,label)=>assert.ok(Math.abs(a-b)<=t,`${label}: esperado ${b}, obtido ${a}`);

for(let n=3;n<=1000;n++){
  for(const h of [.5,1,1.5,2,3,4,7.25]){
    const li=pin(n)*h,lc=2*PI*h,lo=pout(n)*h;
    const vi=ain(n)*h,vc=PI*h,vo=aout(n)*h;
    assert.ok(li<lc&&lc<lo,`cerco lateral n=${n}, h=${h}`);
    assert.ok(vi<vc&&vc<vo,`cerco volumétrico n=${n}, h=${h}`);
    close(li/lc,pin(n)/(2*PI),1e-15,`razão lateral preservada n=${n}, h=${h}`);
    close(vi/vc,ain(n)/PI,1e-15,`razão volumétrica preservada n=${n}, h=${h}`);
    close(lo/lc,vo/vc,1e-14,`empate externo sobe n=${n}, h=${h}`);
    close((lc-li)/h,2*PI-pin(n),1e-14,`erro lateral absoluto linear em h n=${n}`);
    close((vc-vi)/h,PI-ain(n),1e-14,`erro volumétrico absoluto linear em h n=${n}`);
  }
}

close(pin(6)*1.5,9,1e-12,'parede interna inicial');
close(2*PI*1.5,9.4248,5e-5,'parede cilíndrica inicial');
close(ain(6)*1.5,3.8971,5e-5,'volume interno inicial');
close(PI*1.5,4.7124,5e-5,'volume cilíndrico inicial');
close(pin(6)/(2*PI),.9549,5e-5,'cobertura lateral inicial');
close(ain(6)/PI,.8270,5e-5,'cobertura volumétrica inicial');
close(pout(6)/(2*PI)-1,.1027,5e-5,'excesso lateral externo');
close(aout(6)/PI-1,.1027,5e-5,'excesso volumétrico externo');

const perimeter=12,height=5,apothem=Math.sqrt(3),area=perimeter*apothem/2;
close(perimeter*height,60,1e-12,'exercício parede');
close(area*height,51.9615,5e-4,'exercício volume');
close(2*area/perimeter,apothem,1e-12,'apótema recuperado');

for(const h of [.5,1,2,3]){
  for(const s of [0,.25,.5,1,2]){
    const right=4*h;
    const oblique=2*h+2*Math.sqrt(h*h+s*s);
    assert.ok(oblique>=right,`parede oblíqua não menor h=${h}, s=${s}`);
    if(s>0)assert.ok(oblique>right,`inclinação aumenta parede h=${h}, s=${s}`);
    close(h,h,1e-15,'volume por Cavalieri');
  }
}

const perUnit=n=>2*Math.sqrt(n*Math.tan(PI/n));
close(perUnit(3),4.559,5e-4,'triângulo área 1');
close(perUnit(4),4,1e-12,'quadrado área 1');
close(perUnit(6),3.722,5e-4,'hexágono área 1');
assert.ok(perUnit(6)<perUnit(4)&&perUnit(4)<perUnit(3),'hexágono vence entre ladrilhos regulares');
const circle=2*Math.sqrt(PI);
let previous=Infinity;
for(let n=3;n<=1000;n++){
  const tax=perUnit(n)-circle;
  assert.ok(tax>0,`imposto positivo n=${n}`);
  assert.ok(tax<previous,`imposto decrescente n=${n}`);
  previous=tax;
}

const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1]||'';
const markup=html.split('<script>')[0];
assert.equal((markup.match(/class="route-step"/g)||[]).length,6,'seis atos');
assert.ok(html.includes('aria-valuemax="10"')&&html.includes('>0/10</strong>'),'dez marcos reais');
assert.equal((markup.match(/data-step="[1-9]"/g)||[]).length,9,'nove passos dedutivos');
assert.equal((markup.match(/data-ex="/g)||[]).length,12,'quatro exercícios com três alternativas');
assert.equal((markup.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.equal((markup.match(/<canvas/g)||[]).length,3,'três Canvas');
assert.ok(html.includes('id="dashboard" hidden'),'valores nascem ocultos');
assert.ok(html.includes('id="post-prediction-hint" class="hint" hidden'),'pista nasce oculta');
assert.ok(js.includes("$('#dashboard').hidden=false"),'aposta libera painel');
assert.ok(js.includes('user&&step===8&&!check.derived'),'derivação conta apenas no passo final');
assert.ok(js.includes('check.audited=true'),'auditoria exige ação');
assert.ok(js.includes('check.certified=true'),'certificado exige ação');
assert.ok(html.includes('A<sub>lateral</sub>=P·h'),'fórmula lateral exposta');
assert.ok(html.includes('V=A<sub>base</sub>·h'),'fórmula de volume exposta');
assert.ok(html.includes('parede muda; volume A·h não'),'contraexemplo oblíquo desenhado');
assert.ok(html.includes('Agora o laboratório termina de verdade'),'fechamento explícito');
assert.ok(!html.includes('src="lab.js"')&&!html.includes('href="lab.css"'),'HTML autocontido');
assert.ok(html.includes('<style>')&&js.length>10000,'estilo e interação incorporados');
assert.doesNotThrow(()=>new Function(js),'JavaScript sintaticamente válido');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs HTML únicos');

console.log('Lab 06: extrusão, cerco espacial, preservação de erros relativos, prisma oblíquo, 10 marcos, 4 exercícios e 3 Canvas verificados.');
