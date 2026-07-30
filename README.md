# MATHeu$

**Laboratório visual de intuição matemática.**

A matemática entra pelos olhos, é interrogada pelas mãos e só então recebe fórmula.

## O que este projeto é

Uma sequência de laboratórios interativos para observar, prever, manipular, deduzir, testar e transferir ideias matemáticas.

Não é tratado, currículo ou enciclopédia.

## Site

Publicação esperada:

- portal: `https://drmcoelho.github.io/MATH_eus/`
- Laboratório 01: `https://drmcoelho.github.io/MATH_eus/modules/01-duas-circunferencias/`
- Interlúdio 01·B: `https://drmcoelho.github.io/MATH_eus/modules/01b-poligono-escondido/`
- Laboratório 02: `https://drmcoelho.github.io/MATH_eus/modules/02-perimetros/`
- Laboratório 03: `https://drmcoelho.github.io/MATH_eus/modules/03-areas/`
- Laboratório 04: `https://drmcoelho.github.io/MATH_eus/modules/04-erro/`
- Laboratório 05: `https://drmcoelho.github.io/MATH_eus/modules/05-limite/`
- Laboratório 06: `https://drmcoelho.github.io/MATH_eus/modules/06-prisma/`
- Laboratório 07: `https://drmcoelho.github.io/MATH_eus/modules/07-revolucao/`
- Laboratório 08: `https://drmcoelho.github.io/MATH_eus/modules/08-integral/`
- Laboratório 09: `https://drmcoelho.github.io/MATH_eus/modules/09-derivada/`
- Laboratório 10: `https://drmcoelho.github.io/MATH_eus/modules/10-reciprocidade/`
- Temporada 02, Laboratório 01: `https://drmcoelho.github.io/MATH_eus/modules/s02-01-ternas-pitagoricas/`
- Temporada 02, Laboratório 02: `https://drmcoelho.github.io/MATH_eus/modules/s02-02-mapa-das-ternas/`
- Temporada 02, Laboratório 03: `https://drmcoelho.github.io/MATH_eus/modules/s02-03-que-numeros-entram/`
- Temporada 02, Laboratório 04: `https://drmcoelho.github.io/MATH_eus/modules/s02-04-diferencas/`

O repositório é um site estático puro. A fonte do GitHub Pages deve ser configurada como:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/(root)`

A raiz contém `index.html`, `.nojekyll` e `404.html`; não há build de publicação nem dependência de CDN.

## Primeira temporada

**O cerco do círculo**

1. [Duas circunferências, um polígono](modules/01-duas-circunferencias/index.html) — fatia vertical disponível
   - [Interlúdio 01·B — O polígono escondido](modules/01b-poligono-escondido/index.html) — fatia vertical disponível
2. [Quanto mede o contorno?](modules/02-perimetros/index.html) — fatia vertical disponível
3. [O que acontece com as áreas?](modules/03-areas/index.html) — fatia vertical disponível
4. [O erro também tem forma](modules/04-erro/index.html) — fatia vertical disponível
5. [Quando “chegar perto” vira limite?](modules/05-limite/index.html) — fatia vertical disponível
6. [Do polígono ao prisma](modules/06-prisma/index.html) — fatia vertical disponível
7. [Girar cria espaço](modules/07-revolucao/index.html) — fatia vertical disponível
8. [Acumular é integrar](modules/08-integral/index.html) — fatia vertical disponível
9. [Mudar é derivar](modules/09-derivada/index.html) — fatia vertical disponível
10. [Derivar e integrar são movimentos inversos](modules/10-reciprocidade/index.html) — fatia vertical disponível

## Segunda temporada

**Números que constroem formas** — dez laboratórios sobre uma única configuração aritmética, a² + b² = c² com lados inteiros. Plano completo em [docs/SEASON-02.md](docs/SEASON-02.md).

1. [A fábrica dos ímpares](modules/s02-01-ternas-pitagoricas/index.html) — fatia vertical disponível
2. [O mapa de todas as ternas](modules/s02-02-mapa-das-ternas/index.html) — fatia vertical disponível
3. [Que números entram em ternas?](modules/s02-03-que-numeros-entram/index.html) — fatia vertical disponível
4. [A diferença esconde um padrão](modules/s02-04-diferencas/index.html) — fatia vertical disponível
5. Quantas ternas existem até N?
6. Do esquadro ao tijolo
7. Ternas viram pontos no círculo
8. Acumular quadrados
9. Quando o expoente sobe
10. A grade e o círculo são o mesmo desenho

## Verificação dos laboratórios

Cada módulo possui um verificador matemático independente, sem dependências externas:

```bash
for checker in modules/*/check-math.mjs; do node "$checker"; done
```

O do Lab 01 confere a identidade pitagórica, a monotonicidade de `r/R`, a construção pelo ponto médio, a inferência inversa de `n` e, para a parte de ruído, os intervalos de compatibilidade e o alcance do instrumento em cada tolerância. O do Interlúdio 01·B constrói o polígono escondido por coordenadas e confere o circunraio `r`, a semelhança `L'/L = r/R`, o raio e o giro após `k` repetições, a identidade da coroa `π(R² − r²) = π(L/2)²`, a tabela de repetições até a metade e o produto de Kepler–Bouwkamp. O do Lab 02 confere o cerco (interno < círculo < externo), as monotonicidades, a razão dos erros descendo para 2, o desafio da barreira de 6,2 e as cotas de Arquimedes com n = 96. O do Lab 03 confere a fórmula do leque (exata para os dois polígonos), o empate exato entre os excessos de área e de contorno do circunscrito, a razão dos erros relativos internos subindo para 4 e os valores citados na página. O do Lab 04 confere, para as quatro séries de erro, a convergência de `n² × erro` às constantes `π³/3` e `2π³/3`, a contração rumo a 1/4 ao dobrar `n` e o desafio dos cem vezes menos. O do Lab 05 confere as monotonias do cerco até `n = 5000`, o menor `N` de cada tolerância (sem recaída em 3000 valores seguintes) e a previsão `N ≈ √(π³/ε)` acertando o `N` exato. O do Lab 06 confere a preservação exata dos erros relativos na extrusão (o `h` corta nas razões), o empate do circunscrito subindo intacto, os gabaritos dos três exercícios e os números do favo e da lata. O do Lab 07 confere a pilha de discos (exata no cilindro, com erro fechado `−1/(4N²)` no cone e `+1/(2N²)` na esfera) e o 1:2:3 de Arquimedes. O do Lab 08 confere as três somas de acumulação com as ordens medidas (`n × erro = π` cravado nos anéis internos), o triângulo dos anéis desenrolados e as garantias de tolerância sem recaída. O do Lab 09 confere a sobra exata `π·Δr` do quociente da coroa, a meia-vida exata da diferença e o cordão da Terra. O do Lab 10 confere a ida e a volta nos três pares da temporada, a reciprocidade exata contra as fórmulas e as ordens do erro de reconstrução. O do T02 Lab 01 confere a fábrica dos ímpares (identidade, diferença 1 e primitividade), refaz o censo das ternas por dois caminhos independentes — força bruta e fórmula de Euclides — exigindo listas idênticas até hipotenusa 500, e valida as contagens citadas na página (52/6 até 100, 881/21 até 1.000, 12.471/70 até 10.000). O do T02 Lab 02 confere que as casas válidas da grade fabricam primitivas sem repetição, que a volta m² = (c + cateto ímpar)/2, k² = (c − cateto ímpar)/2 recupera o endereço das 158 primitivas com hipotenusa até 1.000, as bordas (diagonal com diferença 1, coluna do par com diferença 2) e as contagens 190/86 do mapa. O do T02 Lab 03 confere que a contagem de moradas por fórmula, por fatoração e por força bruta coincide para todo n de 3 a 300, que nenhum número a partir de 3 fica de fora (e que 1 e 2 ficam), que a terna mais esticada de cada número é a da fábrica do ímpar ou da família do par, e as contagens citadas (12 e 15 com 4 moradas, empate triplo 60-84-96 com 13, campeão 240 com 31, eremita 97 com 1). O do T02 Lab 04 confere que toda primitiva com hipotenusa até 5.000 tem falta (m − k)² ou 2k² conforme o cateto maior, que as nove faltas presentes até 50 não mudam entre os tetos 500 e 2.000 e nenhuma proibida aparece, as primeiras ocorrências citadas (8, 18, 25, 49), o preenchimento total pelas cópias (3v, 4v, 5v) e os catetos gêmeos de Pell até (696, 697, 985) com a razão 3 + 2√2.

## Princípios

- não partir da fórmula: chegar a ela;
- imagem matemática calculada, nunca decorativa;
- exercícios entremeados;
- três camadas: **Brinque**, **Entenda**, **Oficina**;
- HTML autocontido, offline e sem CDN;
- SVG preferencial;
- Safari/iOS como alvo primário;
- prova opcional para o leitor, verificação obrigatória para o agente.

A constituição completa está em [AGENTS.md](AGENTS.md).
