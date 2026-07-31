import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const PI=Math.PI;
const PROFILES={
  retangulo:{H:1.5,r:()=>1,exact:PI*1.5},
  triangulo:{H:1.5,r:z=>1-z/1.5,exact:PI*1.5/3},
  semicirculo:{H:2,r:z=>Math.sqrt(Math.max(0,1-(z-1)**2)),exact:4*PI/3}
};
const close=(a,b,t,label)=>assert.ok(Math.abs(a-b)<=t,`${label}: esperado ${b}, obtido ${a}`);
function discSum(p,N){const dz=p.H/N;let s=0;for(let i=0;i<N;i++){const r=p.r((i+.5)*dz);s+=PI*r*r*dz}return s}

let prevCone=Infinity,prevSphere=Infinity;
for(let N=2;N<=400;N++){
  close(discSum(PROFILES.retangulo,N),PROFILES.retangulo.exact,1e-12,`cilindro exato N=${N}`);
  const cs=discSum(PROFILES.triangulo,N),ce=(PROFILES.triangulo.exact-cs)/PROFILES.triangulo.exact;
  assert.ok(cs<PROFILES.triangulo.exact,`cone por baixo N=${N}`);
  close(ce,1/(4*N*N),1e-12,`erro cone N=${N}`);
  assert.ok(ce<prevCone,`erro cone decrescente N=${N}`);prevCone=ce;
  const ss=discSum(PROFILES.semicirculo,N),se=(ss-PROFILES.semicirculo.exact)/PROFILES.semicirculo.exact;
  assert.ok(ss>PROFILES.semicirculo.exact,`esfera por cima N=${N}`);
  close(se,1/(2*N*N),1e-12,`erro esfera N=${N}`);
  assert.ok(se<prevSphere,`erro esfera decrescente N=${N}`);prevSphere=se;
  if(N<=200){
    close(ce/(1/(4*(2*N)**2)),4,1e-8,`contração cone N=${N}`);
    close(se/(1/(2*(2*N)**2)),4,1e-8,`contração esfera N=${N}`);
  }
}

for(const eps of [1e-2,1e-3,1e-4,1e-6]){
  const Nc=Math.floor(1/(2*Math.sqrt(eps)))+1;
  const Ns=Math.floor(1/Math.sqrt(2*eps))+1;
  assert.ok(1/(4*Nc*Nc)<eps,`certificado cone ε=${eps}`);
  assert.ok(1/(2*Ns*Ns)<eps,`certificado esfera ε=${eps}`);
}

const cyl=(R,h)=>PI*R*R*h,cone=(R,h)=>PI*R*R*h/3,sphere=R=>4*PI*R**3/3;
for(const [R,h] of [[1,1.5],[3,4],[.5,7],[2,2]])close(cone(R,h)/cyl(R,h),1/3,1e-15,`cone/cilindro R=${R},h=${h}`);
for(const R of [1,2,3.7]){
  close(sphere(R)/cyl(R,2*R),2/3,1e-15,`esfera/cilindro R=${R}`);
  close(sphere(R)/cone(R,2*R),2,1e-15,`esfera/cone R=${R}`);
  close(cyl(R,2*R)/cone(R,2*R),3,1e-15,`cilindro/cone R=${R}`);
}

close(discSum(PROFILES.retangulo,6),4.7124,5e-5,'painel cilindro N=6');
close(discSum(PROFILES.triangulo,6),1.5599,5e-5,'painel cone N=6');
close((discSum(PROFILES.triangulo,6)-PROFILES.triangulo.exact)/PROFILES.triangulo.exact,-.0069,5e-5,'erro cone N=6');
close(discSum(PROFILES.semicirculo,6),4.2470,5e-5,'painel esfera N=6');
close((discSum(PROFILES.semicirculo,6)-PROFILES.semicirculo.exact)/PROFILES.semicirculo.exact,.0139,5e-5,'erro esfera N=6');
close(cone(3,4),12*PI,1e-12,'exercício cone 12π');
close(sphere(3),36*PI,1e-12,'exercício esfera 36π');
close(cyl(5,2),50*PI,1e-12,'exercício eixo 50π');
close(cyl(2,5),20*PI,1e-12,'eixo alternativo 20π');
close(cyl(5,2)/cyl(2,5),2.5,1e-15,'mudança de eixo 2,5×');

for(const N of [2,6,12,60,240]){
  close(discSum(PROFILES.triangulo,N),PI*1.5*(1/3-1/(12*N*N)),1e-12,`fórmula cone N=${N}`);
  close(discSum(PROFILES.semicirculo,N),(4*PI/3)*(1+1/(2*N*N)),1e-12,`fórmula esfera N=${N}`);
}

const html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1]||'';
const markup=html.split('<script>')[0];
assert.equal((markup.match(/class="route-step"/g)||[]).length,6,'seis atos');
assert.ok(html.includes('aria-valuemax="10"')&&html.includes('>0/10</strong>'),'dez marcos');
assert.equal((markup.match(/data-step="[1-9]"/g)||[]).length,9,'nove passos');
assert.equal((markup.match(/data-ex="/g)||[]).length,12,'quatro exercícios');
assert.equal((markup.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.equal((markup.match(/<canvas/g)||[]).length,3,'três Canvas');
assert.ok(html.includes('id="dashboard" hidden'),'painel nasce oculto');
assert.ok(html.includes('id="post-prediction-hint" class="hint" hidden'),'pista nasce oculta');
assert.ok(js.includes("$('#dashboard').hidden=false"),'aposta libera painel');
assert.ok(js.includes('user&&step===8&&!state.derived'),'derivação exige passo final');
assert.ok(js.includes('state.audited=true'),'auditoria exige ação');
assert.ok(js.includes('state.certified=true'),'certificado exige ação');
assert.ok(html.includes('V ≈ Σ πr(zᵢ)²·Δz'),'soma de discos exposta');
assert.ok(html.includes('V<sub>cone</sub>=πR²h/3'),'volume do cone exposto');
assert.ok(html.includes('V<sub>esf</sub>=4πR³/3'),'volume da esfera exposto');
assert.ok(html.includes('1 : 2 : 3'),'proporção de Arquimedes');
assert.ok(html.includes('Agora o laboratório termina de verdade'),'fechamento explícito');
assert.ok(!html.includes('src="lab.js"')&&!html.includes('href="lab.css"'),'HTML autocontido');
assert.ok(html.includes('<style>')&&js.length>10000,'estilo e interação incorporados');
assert.doesNotThrow(()=>new Function(js),'JavaScript válido');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs únicos');

console.log('Lab 07: discos, cilindro exato, cone −1/(4N²), esfera +1/(2N²), razão 1:2:3, 10 marcos, 4 exercícios e 3 Canvas verificados.');
