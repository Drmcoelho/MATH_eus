import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const close=(a,b,t,l)=>assert.ok(Math.abs(a-b)<=t,`${l}: esperado ${b}, obtido ${a}`);
const vertices=(R,n,start)=>Array.from({length:n},(_,i)=>[R*Math.cos(start+2*Math.PI*i/n),R*Math.sin(start+2*Math.PI*i/n)]);
const mids=p=>p.map((q,i)=>[(q[0]+p[(i+1)%p.length][0])/2,(q[1]+p[(i+1)%p.length][1])/2]);
const half=n=>Math.ceil(Math.log(.5)/Math.log(Math.cos(Math.PI/n))-1e-12);

for(let n=3;n<=160;n++){
  const t=Math.PI/n,c=Math.cos(t),L=2*Math.sin(t),outer=vertices(1,n,-Math.PI/2-t),hidden=mids(outer);
  for(const p of hidden)close(Math.hypot(...p),c,1e-12,`raio escondido n=${n}`);
  for(let i=0;i<n;i++){
    const p=hidden[i],q=hidden[(i+1)%n];
    close(Math.hypot(p[0]-q[0],p[1]-q[1]),L*c,1e-12,`lado escondido n=${n}`);
  }
  close(Math.atan2(hidden[0][1],hidden[0][0]),-Math.PI/2,1e-12,`giro meio passo n=${n}`);
  close(Math.PI*(1-c*c),Math.PI*Math.sin(t)**2,1e-12,`coroa n=${n}`);
}

for(const n of [3,4,5,6,8,12,24,48]){
  const c=Math.cos(Math.PI/n);
  let p=vertices(1,n,-Math.PI/2-Math.PI/n);
  for(let k=1;k<=14;k++){
    p=mids(p);
    close(Math.hypot(...p[0]),c**k,1e-10,`iteração n=${n},k=${k}`);
  }
}

close(Math.cos(Math.PI/6)**2,.75,1e-12,'hexágono k=2');
close(Math.cos(Math.PI/4)**2,.5,1e-12,'quadrado k=2');
close(Math.cos(Math.PI/6)**10,(Math.cos(Math.PI/6)**5)**2,1e-12,'meia-vida repetida');
close(Math.PI*(1-Math.cos(Math.PI/6)**2),Math.PI/4,1e-12,'coroa hexágono');

const table=[[3,1],[4,2],[5,4],[6,5],[8,9],[12,20],[24,81],[48,324]];
for(const [n,k] of table)assert.equal(half(n),k,`meia-vida n=${n}`);
let prev=0;
for(let n=3;n<=300;n++){
  assert.ok(half(n)>=prev,`meia-vida não decresce n=${n}`);
  prev=half(n);
}

const asym=2*Math.log(2)/(Math.PI**2);
for(const n of [48,96,192,384])close(half(n)/(n*n),asym,4e-4,`meia-vida normalizada n=${n}`);
for(const n of [24,48,96,192])close(n*n*(1-Math.cos(Math.PI/n)),Math.PI**2/2,2e-2,`folga normalizada n=${n}`);

let product=1;
for(let n=3;n<=100000;n++)product*=Math.cos(Math.PI/n);
close(product,.1149420448,1e-4,'Kepler–Bouwkamp');
assert.ok(product>.11);

const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('./lab.js',import.meta.url),'utf8');
const css=readFileSync(new URL('./lab.css',import.meta.url),'utf8');
new vm.Script(js);
assert.equal((html.match(/class="route-step"/g)||[]).length,6,'seis atos');
assert.equal((html.match(/data-step="[1-9]"/g)||[]).length,9,'nove passos');
const body=html.split('<script>')[0];
assert.equal((body.match(/data-ex="/g)||[]).length,12,'quatro exercícios');
assert.equal((html.match(/class="curiosity"/g)||[]).length,4,'quatro curiosidades');
assert.equal((html.match(/<canvas/g)||[]).length,3,'três Canvas');
assert.match(html,/aria-valuemax="10"/);
assert.match(html,/Agora o interlúdio termina de verdade/);
assert.match(html,/Kepler–Bouwkamp/);
assert.match(html,/π\(R²−r²\)=π\(L\/2\)²/);
assert.ok(!html.includes('predicted && manipulated'));
assert.match(js,/if\(user&&step===8\)\{check\.derived=true/);
assert.match(js,/check\.audited=true/);
assert.match(js,/check\.certified=true/);
assert.match(css,/\.stepper\{position:sticky/);

console.log('Interlúdio 01·B: polígono escondido, iteração, coroa, meia-vida n², duas espirais e arquitetura canônica verificados sem divergência.');
