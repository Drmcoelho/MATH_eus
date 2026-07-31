import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const PI=Math.PI;
const width=n=>2*n*(Math.tan(PI/n)-Math.sin(PI/n));
const findN=e=>{let n=3;while(width(n)>=e)n++;return n};
const estimate=e=>Math.ceil(Math.sqrt(PI**3/e));
const certified=e=>Math.floor(Math.sqrt(2*PI**3/e))+1;
const close=(a,b,t,l)=>assert.ok(Math.abs(a-b)<=t,`${l}: esperado ${b}, obtido ${a}`);

let previous=Infinity;
for(let n=3;n<=5000;n++){
  const pin=2*n*Math.sin(PI/n),pout=2*n*Math.tan(PI/n),w=width(n);
  assert.ok(pin<2*PI&&2*PI<pout,`cerco contém 2π em n=${n}`);
  assert.ok(w>0&&w<previous,`largura positiva e decrescente em n=${n}`);
  assert.ok(w<2*PI**3/n**2,`cota rigorosa W<2π³/n² em n=${n}`);
  previous=w;
}
close(3072**2*width(3072),PI**3,1e-2,'n²W em n=3072');

const cases=[[.1,18],[.03,33],[.01,56],[.003,102],[.001,177],[.0003,322],[.0001,557],[.000031,1001],[.00001,1761]];
for(const [e,N] of cases){
  assert.equal(findN(e),N,`N exato para ε=${e}`);
  assert.equal(estimate(e),N,`estimativa assintótica exibida para ε=${e}`);
  assert.ok(width(N)<e&&width(N-1)>=e,`fronteira N−1/N em ε=${e}`);
  const C=certified(e);
  assert.ok(C>=N&&width(C)<e,`certificado suficiente para ε=${e}`);
  for(let n=C;n<=C+3000;n++)assert.ok(width(n)<e,`sem recaída após certificado em ε=${e}, n=${n}`);
}
close(width(56),.0098950,5e-8,'W56');
close(width(55),.0102584,5e-8,'W55');
assert.equal(findN(.000031),1001,'desafio 31 milionésimos');
close(Math.sqrt(PI**3/.000031),1000.1,.2,'estimativa mental do desafio');
assert.ok(findN(.0001)/findN(.01)>9&&findN(.0001)/findN(.01)<11,'100× menos ε pede cerca de 10× N');
assert.equal(certified(.01),79,'certificado citado para ε=.01');
assert.ok(certified(.01)>findN(.01),'certificado suficiente pode ser conservador sem fingir minimalidade');

const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1]||'';
const markup=html.split('<script>')[0];
assert.ok(html.includes('Da aproximação à garantia'),'mapa do percurso');
assert.ok(html.includes('aria-valuemax="10"')&&html.includes('>0/10</strong>'),'dez marcos reais');
assert.equal((markup.match(/<li data-step=/g)||[]).length,9,'nove passos');
assert.equal((markup.match(/data-ex="/g)||[]).length,12,'quatro exercícios com três alternativas');
assert.equal((markup.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.equal((markup.match(/<canvas /g)||[]).length,3,'três Canvas');
assert.ok(html.includes('id="dashboard" class="machine-grid" hidden'),'painel nasce oculto');
assert.ok(html.includes('id="width-chart-wrap" class="chart-card" hidden'),'gráfico nasce oculto');
assert.ok(html.includes('id="post-prediction-hint" class="hint" hidden'),'pista nasce oculta');
assert.ok(js.includes("$('#dashboard').hidden=false")&&js.includes("$('#width-chart-wrap').hidden=false"),'aposta libera dados');
assert.ok(js.includes('derived:false')&&js.includes('derivStep===8&&!checkpoints.derived'),'derivação só conta no passo final');
assert.ok(js.includes("$('#candidate').oninput=()=>{checkpoints.audited=true"),'auditoria exige ação');
assert.ok(js.includes("$('#certify').onclick=()=>")&&js.includes('checkpoints.certified=true'),'certificação exige ação');
assert.ok(html.includes('N<sub>cert</sub>=⌊√(2π³/ε)⌋+1'),'fórmula certificada');
assert.ok(html.includes('W<sub>n</sub>&lt;2π³/n²'),'cota rigorosa exposta');
assert.ok(!html.includes('src="lab.js"')&&!html.includes('href="lab.css"'),'HTML autocontido');
assert.ok(html.includes('<style>')&&js.length>8000,'estilo e interação incorporados');
assert.doesNotThrow(()=>new Function(js),'JavaScript sintaticamente válido');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs únicos');

console.log('Lab 05: monotonicidade, fronteiras mínimas, estimativas não certificadas, certificados conservadores, 10 marcos, 4 exercícios, 3 Canvas e contrato canônico verificados.');
