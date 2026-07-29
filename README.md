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
- Temporada 02, Laboratório 01: `https://drmcoelho.github.io/MATH_eus/modules/s02-01-ternas-pitagoricas/`

O repositório é um site estático puro. A fonte do GitHub Pages deve ser configurada como:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/(root)`

A raiz contém `index.html`, `.nojekyll` e `404.html`; não há build de publicação nem dependência de CDN.

## Primeira temporada

**O cerco do círculo**

1. [Duas circunferências, um polígono](modules/01-duas-circunferencias/index.html) — fatia vertical disponível
2. [Quanto mede o contorno?](modules/02-perimetros/index.html) — fatia vertical disponível
3. O que acontece com as áreas?
4. O erro também tem forma
5. Quando “chegar perto” vira limite?
6. Do polígono ao prisma
7. Girar cria espaço
8. Acumular é integrar
9. Mudar é derivar
10. Derivar e integrar são movimentos inversos

## Segunda temporada

**Números que constroem formas** — plano completo em [docs/SEASON-02.md](docs/SEASON-02.md).

1. [A fábrica dos ímpares](modules/s02-01-ternas-pitagoricas/index.html) — fatia vertical disponível
2. O mapa de todas as ternas
3. Que números entram em ternas?
4. Ternas viram círculos
5. Do esquadro ao tijolo

## Verificação dos laboratórios

Cada módulo possui um verificador matemático independente, sem dependências externas:

```bash
for checker in modules/*/check-math.mjs; do node "$checker"; done
```

O do Lab 01 confere a identidade pitagórica, a monotonicidade de `r/R`, a construção pelo ponto médio, a inferência inversa de `n` e, para a parte de ruído, os intervalos de compatibilidade e o alcance do instrumento em cada tolerância. O do Lab 02 confere o cerco (interno < círculo < externo), as monotonicidades, a razão dos erros descendo para 2, o desafio da barreira de 6,2 e as cotas de Arquimedes com n = 96. O do T02 Lab 01 confere a fábrica dos ímpares (identidade, diferença 1 e primitividade), refaz o censo das ternas por dois caminhos independentes — força bruta e fórmula de Euclides — exigindo listas idênticas até hipotenusa 500, e valida as contagens citadas na página (52/6 até 100, 881/21 até 1.000, 12.471/70 até 10.000).

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
