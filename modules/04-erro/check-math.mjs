import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const PI=Math.PI;
const SERIES={
  perimeterIn:{error:n=>2*PI-2*n*Math.sin(PI/n),constant:PI**3/3,power:2},
  perimeterOut:{error:n=>2*n*Math.tan(PI/n)-2*PI,constant:2*PI**3/3,power:2},
  areaIn:{error:n=>PI-(n/2)*Math.sin(2*PI/n),constant:2*PI**3/3,power:2},
  areaOut:{error:n=>n*Math.tan(PI/n)-PI,constant:PI**3/3,power:2},
  gap:{error:n=>Math.cos(PI/(n+1))-Math.cos(PI/n),constant:PI**2,power:3}
};
const close=(actual,expected,tolerance,label)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${label}: esperado ${expected}, obtido ${actual}`);

for(const [key,s] of Object.entries(SERIES)){
  let previousGap=Infinity;
  for(let n=3;n<=512;n++){
    const e=s.error(n);
    assert.ok(e>0,`${key}: diferença positiva em n=${n}`);
    const scaled=n**s.power*e;
    const gap=Math.abs(scaled-s.constant);
    assert.ok(gap<previousGap,`${key}: valor normalizado deve aproximar a constante em n=${n}`);
    previousGap=gap;
  }
  close(512**s.power*s.error(512),s.constant,key==='gap'?0.04:0.002,`${key}: normalização em n=512`);
  let previousDistance=Infinity;
  for(let n=6;n<=384;n*=2){
    const ratio=s.error(2*n)/s.error(n);
    const distance=Math.abs(ratio-1/2**s.power);
    assert.ok(distance<previousDistance,`${key}: razão de dobra converge em n=${n}`);
    previousDistance=distance;
  }
}

close(PI**3/3,10.335,5e-4,'π³/3');
close(2*PI**3/3,20.671,5e-4,'2π³/3');
close(PI**2,9.8696,5e-5,'π²');
close(SERIES.perimeterIn.error(96),0.00112,5e-6,'erro de perímetro interno em n=96');
const shrink=SERIES.perimeterIn.error(960)/SERIES.perimeterIn.error(96);
assert.ok(shrink>1/105&&shrink<1/95,'n dez vezes maior reduz erro geométrico cerca de 100×');
const estimate50=(PI**3/3)/2500;
const real50=SERIES.areaOut.error(50);
close(estimate50,0.00413,5e-5,'estimativa da área externa em n=50');
close(real50,0.00414,5e-5,'erro real da área externa em n=50');
assert.ok(Math.abs(estimate50-real50)<1e-4,'estimativa n=50 próxima do valor real');
const gapRatio=SERIES.gap.error(48)/SERIES.gap.error(24);
assert.ok(gapRatio>0.12&&gapRatio<0.14,'dobrar 24 para 48 reduz espaçamento para perto de 1/8');
const measuredGapPower=-Math.log2(gapRatio);
assert.ok(measuredGapPower>2.9&&measuredGapPower<3,'potência medida da inferência perto de 3');

const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1]||'';
const markup=html.split('<script>')[0];
assert.ok(html.includes('Do número pequeno à lei que o governa'),'mapa de percurso deve existir');
assert.ok(html.includes('aria-valuemax="10"')&&html.includes('>0/10</strong>'),'dez marcos reais de progresso');
assert.equal((markup.match(/<li data-step=/g)||[]).length,9,'nove passos dedutivos');
assert.equal((markup.match(/data-ex="/g)||[]).length,12,'quatro exercícios com três alternativas');
assert.equal((markup.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.equal((markup.match(/<canvas /g)||[]).length,3,'três Canvas');
assert.ok(html.includes('id="dashboard" class="dashboard" hidden'),'valores devem nascer ocultos');
assert.ok(html.includes('id="family-chart-wrap" class="chart-card" hidden'),'gráfico deve nascer oculto');
assert.ok(html.includes('id="post-prediction-hint" class="hint" hidden'),'pista deve nascer oculta');
assert.ok(js.includes("$('#dashboard').hidden=false")&&js.includes("$('#family-chart-wrap').hidden=false"),'aposta libera resultados');
assert.ok(js.includes('derived:false')&&js.includes('derivStep===8&&!checkpoints.derived'),'derivação deve contar apenas no passo final');
assert.ok(js.includes("$('#audit-n').oninput=()=>{checkpoints.audited=true"),'auditoria exige ação');
assert.ok(js.includes("$('#normalize').onclick=()=>{checkpoints.normalized=true"),'normalização exige ação');
assert.ok(!html.includes('src="lab.js"')&&!html.includes('href="lab.css"'),'HTML deve ser autocontido');
assert.ok(html.includes('<style>')&&js.length>8000,'estilo e interação incorporados');
assert.doesNotThrow(()=>new Function(js),'JavaScript sintaticamente válido');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs HTML únicos');

console.log('Lab 04: quatro erros n^-2, espaçamento n^-3, constantes π³/3, 2π³/3 e π², 4 exercícios, 3 Canvas e contrato canônico verificados.');
