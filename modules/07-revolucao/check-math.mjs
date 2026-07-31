import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const PI=Math.PI;
const PROFILES={
  retangulo:{H:1.5,r:()=>1,exact:PI*1.5},
  triangulo:{H:1.5,r:z=>1-z/1.5,exact:PI*1.5/3},
  semicirculo:{H:2,r:z=>Math.sqrt(Math.max(0,1-(z-1)**2)),exact:4*PI/3}
};
const sum=(p,N)=>{const dz=p.H/N;let s=0;for(let i=0;i<N;i++){const r=p.r((i+.5)*dz);s+=PI*r*r*dz}return s};
const close=(a,b,t,l)=>assert.ok(Math.abs(a-b)<=t,`${l}: esperado ${b}, obtido ${a}`);

let pc=Infinity,ps=Infinity;
for(let N=2;N<=500;N++){
  close(sum(PROFILES.retangulo,N),PROFILES.retangulo.exact,1e-12,`cilindro exato N=${N}`);
  const ec=(PROFILES.triangulo.exact-sum(PROFILES.triangulo,N))/PROFILES.triangulo.exact;
  const es=(sum(PROFILES.semicirculo,N)-PROFILES.semicirculo.exact)/PROFILES.semicirculo.exact;
  close(ec,1/(4*N*N),1e-12,`erro cone N=${N}`);
  close(es,1/(2*N*N),1e-12,`erro esfera N=${N}`);
  assert.ok(ec>0&&ec<pc,`cone converge por baixo N=${N}`);
  assert.ok(es>0&&es<ps,`esfera converge por cima N=${N}`);
  pc=ec;ps=es;
}
for(const N of [2,6,12,60,240]){
  close(sum(PROFILES.triangulo,N),PI*1.5*(1/3-1/(12*N*N)),1e-12,`fórmula cone N=${N}`);
  close(sum(PROFILES.semicirculo,N),(4*PI/3)*(1+1/(2*N*N)),1e-12,`fórmula esfera N=${N}`);
}
for(const eps of [1e-2,1e-3,1e-4,1e-6]){
  const Nc=Math.floor(1/(2*Math.sqrt(eps)))+1;
  const Ns=Math.floor(1/Math.sqrt(2*eps))+1;
  assert.ok(1/(4*Nc*Nc)<eps,`certificado cone ε=${eps}`);
  assert.ok(1/(2*Ns*Ns)<eps,`certificado esfera ε=${eps}`);
}

const cyl=(R,h)=>PI*R*R*h,cone=(R,h)=>PI*R*R*h/3,sphere=R=>4*PI*R**3/3;
for(const [R,h] of [[1,1.5],[3,4],[.5,7],[2,2]])close(cone(R,h)/cyl(R,h),1/3,1e-15,`cone/cilindro R=${R}`);
for(const R of [1,2,3.7]){
  close(sphere(R)/cyl(R,2*R),2/3,1e-15,`esfera/cilindro R=${R}`);
  close(sphere(R)/cone(R,2*R),2,1e-15,`esfera/cone R=${R}`);
}
close(cone(3,4),12*PI,1e-12,'exercício cone');
close(sphere(3),36*PI,1e-12,'exercício esfera');
close(cyl(2,5),20*PI,1e-12,'retângulo eixo lado 5');
close(cyl(5,2),50*PI,1e-12,'retângulo eixo lado 2');
close(cyl(5,2)/cyl(2,5),2.5,1e-15,'troca de eixo');
close((1*1.5/2)/(1*1.5),1/2,1e-15,'área triangular metade');
close(cone(1,1.5)/cyl(1,1.5),1/3,1e-15,'volume cone um terço');

const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1]||'';
new vm.Script(js);
assert.equal((html.match(/class="route-step"/g)||[]).length,6,'seis atos');
assert.equal((html.match(/data-step="[1-9]"/g)||[]).length,9,'nove passos');
const markup=html.split('<script>')[0];
assert.equal((markup.match(/data-ex="/g)||[]).length,12,'quatro exercícios');
assert.equal((html.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.equal((html.match(/<canvas /g)||[]).length,3,'três Canvas');
assert.match(html,/aria-valuemax="10"/);
assert.match(html,/Agora o laboratório termina de verdade/);
assert.match(html,/V≈Σ πr\(zᵢ\)²Δz/);
assert.match(html,/V=∫ πr\(z\)²dz/);
assert.match(html,/cone:esfera:cilindro=1:2:3/);
assert.match(js,/step===8&&!state\.derived/);
assert.match(js,/state\.audited=true/);
assert.match(js,/state\.certified=true/);
assert.ok(!html.includes('predicted && manipulated'),'sem trava invisível');
assert.ok(html.includes('<style>')&&js.length>8000,'HTML autocontido');
assert.ok(!html.includes('src="lab.js"')&&!html.includes('href="lab.css"'),'sem dependências externas');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'IDs únicos');

console.log('Lab 07: discos, integral, erros fechados N⁻², garantias, proporção 1:2:3, eixo e contrato canônico verificados sem divergência.');
