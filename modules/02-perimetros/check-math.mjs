import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const CIRCLE=2*Math.PI;
const close=(a,b,t,l)=>assert.ok(Math.abs(a-b)<=t,`${l}: esperado ${b}, obtido ${a}`);
const pIn=n=>2*n*Math.sin(Math.PI/n);
const pOut=n=>2*n*Math.tan(Math.PI/n);
const sideIn=n=>2*Math.sin(Math.PI/n);
const sideOut=n=>2*Math.tan(Math.PI/n);

let previousIn=0,previousOut=Infinity,previousRatio=Infinity;
for(let n=3;n<=1000;n+=1){
  const theta=Math.PI/n,inside=pIn(n),outside=pOut(n),eIn=CIRCLE-inside,eOut=outside-CIRCLE,ratio=eOut/eIn;
  assert.ok(inside<CIRCLE,`interno abaixo do círculo em n=${n}`);
  assert.ok(outside>CIRCLE,`externo acima do círculo em n=${n}`);
  assert.ok(inside>previousIn,`interno crescente em n=${n}`);
  assert.ok(outside<previousOut,`externo decrescente em n=${n}`);
  assert.ok(ratio>2&&ratio<previousRatio,`razão dos erros desce para 2 em n=${n}`);
  close(Math.sin(theta)**2+Math.cos(theta)**2,1,1e-12,`Pitágoras n=${n}`);
  close(sideOut(n)/sideIn(n),1/Math.cos(theta),1e-12,`razão dos lados n=${n}`);
  previousIn=inside;previousOut=outside;previousRatio=ratio;
}
close(previousRatio,2,1e-4,'razão dos erros em n=1000');
assert.ok(pIn(11)<6.2&&pIn(12)>6.2,'12 é o menor n que ultrapassa 6,2');
close(pIn(12),6.2117,5e-5,'P interno n=12');
close(pIn(11),6.1981,5e-5,'P interno n=11');
close(pIn(6),6,1e-12,'hexágono interno');
close(pOut(6),6.9282,5e-5,'hexágono externo');
close((pOut(6)-CIRCLE)/(CIRCLE-pIn(6)),2.2777,5e-5,'razão inicial dos erros');
close(sideOut(12)/sideIn(12),1.0353,5e-5,'razão dos lados em n=12');
const halfIn96=pIn(96)/2,halfOut96=pOut(96)/2;
assert.ok(halfIn96<Math.PI&&Math.PI<halfOut96,'Arquimedes prende π');
assert.ok(halfIn96>3+10/71&&halfOut96<3+1/7,'cotas clássicas de Arquimedes');
close(halfIn96,3.14103,5e-6,'semiperímetro interno n=96');
close(halfOut96,3.14271,5e-6,'semiperímetro externo n=96');

const base=new URL('./',import.meta.url);
const [html,js,css]=await Promise.all([
  readFile(new URL('index.html',base),'utf8'),
  readFile(new URL('lab.js',base),'utf8'),
  readFile(new URL('lab.css',base),'utf8')
]);
assert.doesNotThrow(()=>new Function(js),'JavaScript sintaticamente válido');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs HTML únicos');
const reveal=html.match(/<button id="reveal"[^>]*>/)?.[0]||'';
assert.ok(reveal&&!/disabled/.test(reveal),'botão principal existe e nasce habilitado');
assert.ok(!js.includes('predicted&&manipulated')&&!js.includes('predicted && manipulated'),'sem trava invisível');
assert.ok(js.includes('sections.forEach(s=>s.hidden=false)'),'uma revelação abre os atos posteriores');
assert.ok(html.includes('role="progressbar"'),'progresso real visível');
assert.ok(html.includes('<canvas id="perimeter-chart"')&&html.includes('<canvas id="error-chart"'),'dois Canvas calculados');
assert.ok(html.includes('lab.css')&&html.includes('lab.js'),'recursos locais explícitos');
assert.equal((html.match(/<li data-step="/g)||[]).length,8,'Ato 3 tem oito passos');
assert.equal((html.match(/<button data-ex=/g)||[]).length,12,'quatro exercícios com três alternativas');
assert.equal((html.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.ok(html.indexOf('id="step-dots"')<html.indexOf('<ol id="chain"'),'navegação antes do cartão ativo');
assert.ok(js.includes('li.hidden=i!==derivStep'),'somente um passo ativo');
assert.ok(js.includes("$('#deriv-result').hidden=derivStep!==7"),'fórmulas apenas no passo 8');
assert.ok(!js.includes('Math.min(+sides.value,18)')&&js.includes('n=+sides.value'),'dedução preserva n selecionado');
assert.ok(js.includes('yMin=5,yMax=10.7'),'gráfico inclui n=3 e n=4');
assert.ok(css.includes('@media(max-width:840px)')&&css.includes('.stepper{position:sticky'),'controle móvel permanece alcançável');
const result=html.slice(html.indexOf('<div id="deriv-result"'),html.indexOf('<section id="workbook"'));
assert.ok(result.indexOf('Leia primeiro em voz natural')<result.indexOf('P<sub>in</sub>=2nR'),'leitura natural precede símbolos');
assert.ok(result.includes('P<sub>out</sub>=2nr·tg(π/n)'),'fórmula externa usa apótema r');
assert.ok(result.includes('mesma unidade de R e r'),'unidades explícitas');
assert.ok(result.includes('n ≥ 3'),'domínio de validade explícito');
assert.ok(html.includes('(2π/n)/2 = 2π/(2n) = π/n'),'meia-fatia deduzida sem salto');
assert.ok(html.includes('triângulo isósceles'),'bissetriz fundamentada no isósceles');

console.log('Lab 02: 998 cercos, Arquimedes, 8 passos, 4 exercícios, 4 curiosidades, 2 Canvas e protocolo canônico verificados.');
