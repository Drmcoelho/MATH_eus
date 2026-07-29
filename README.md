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
- Laboratório 02: `https://drmcoelho.github.io/MATH_eus/modules/02-perimetros/`
- Laboratório 03: `https://drmcoelho.github.io/MATH_eus/modules/03-areas/`
- Laboratório 04: `https://drmcoelho.github.io/MATH_eus/modules/04-erro/`
- Laboratório 05: `https://drmcoelho.github.io/MATH_eus/modules/05-limite/`

O repositório é um site estático puro. A fonte do GitHub Pages deve ser configurada como:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/(root)`

A raiz contém `index.html`, `.nojekyll` e `404.html`; não há build de publicação nem dependência de CDN.

## Primeira temporada

**O cerco do círculo**

1. [Duas circunferências, um polígono](modules/01-duas-circunferencias/index.html) — fatia vertical disponível
2. [Quanto mede o contorno?](modules/02-perimetros/index.html) — fatia vertical disponível
3. [O que acontece com as áreas?](modules/03-areas/index.html) — fatia vertical disponível
4. [O erro também tem forma](modules/04-erro/index.html) — fatia vertical disponível
5. [Quando “chegar perto” vira limite?](modules/05-limite/index.html) — fatia vertical disponível
6. Do polígono ao prisma
7. Girar cria espaço
8. Acumular é integrar
9. Mudar é derivar
10. Derivar e integrar são movimentos inversos

## Verificação dos laboratórios

Cada módulo possui um verificador matemático independente, sem dependências externas:

```bash
for checker in modules/*/check-math.mjs; do node "$checker"; done
```

O do Lab 01 confere a identidade pitagórica, a monotonicidade de `r/R`, a construção pelo ponto médio, a inferência inversa de `n` e, para a parte de ruído, os intervalos de compatibilidade e o alcance do instrumento em cada tolerância. O do Lab 02 confere o cerco (interno < círculo < externo), as monotonicidades, a razão dos erros descendo para 2, o desafio da barreira de 6,2 e as cotas de Arquimedes com n = 96. O do Lab 03 confere a fórmula do leque (exata para os dois polígonos), o empate exato entre os excessos de área e de contorno do circunscrito, a razão dos erros relativos internos subindo para 4 e os valores citados na página. O do Lab 04 confere, para as quatro séries de erro, a convergência de `n² × erro` às constantes `π³/3` e `2π³/3`, a contração rumo a 1/4 ao dobrar `n` e o desafio dos cem vezes menos. O do Lab 05 confere as monotonias do cerco até `n = 5000`, o menor `N` de cada tolerância (sem recaída em 3000 valores seguintes) e a previsão `N ≈ √(π³/ε)` acertando o `N` exato.

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
