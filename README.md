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
- Laboratório 06: `https://drmcoelho.github.io/MATH_eus/modules/06-prismas/`
- Laboratório 07: `https://drmcoelho.github.io/MATH_eus/modules/07-rotacao/`
- Laboratório 08: `https://drmcoelho.github.io/MATH_eus/modules/08-integral/`
- Laboratório 09: `https://drmcoelho.github.io/MATH_eus/modules/09-derivada/`
- Laboratório 10: `https://drmcoelho.github.io/MATH_eus/modules/10-reciprocidade/`

O repositório é um site estático puro. A fonte do GitHub Pages deve ser configurada como:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/(root)`

A raiz contém `index.html`, `.nojekyll` e `404.html`; não há build de publicação nem dependência de CDN.

## Primeira temporada

**O cerco do círculo — completa**

1. [Duas circunferências, um polígono](modules/01-duas-circunferencias/index.html)
   - [Interlúdio 01·B — O polígono escondido](modules/01b-poligono-escondido/index.html)
2. [Quanto mede o contorno?](modules/02-perimetros/index.html)
3. [O que acontece com as áreas?](modules/03-areas/index.html)
4. [O erro também tem forma](modules/04-erro/index.html)
5. [Quando “chegar perto” vira limite?](modules/05-limite/index.html)
6. [Do polígono ao prisma](modules/06-prismas/index.html)
7. [Girar cria espaço](modules/07-rotacao/index.html)
8. [Acumular é integrar](modules/08-integral/index.html)
9. [Mudar é derivar](modules/09-derivada/index.html)
10. [Derivar e integrar são movimentos inversos](modules/10-reciprocidade/index.html)

Arco cognitivo:

```text
forma → medida → comparação → erro → garantia → limite
→ espaço → acumulação → variação → reciprocidade
```

## Verificação dos laboratórios

Cada módulo possui um verificador matemático independente, sem dependências externas:

```bash
for checker in modules/*/check-math.mjs; do node "$checker"; done
```

Os Labs 06–10 acrescentam verificações de:

- cerco espacial entre prismas e cilindro, extrusão e leis de escala `λ`, `λ²` e `λ³`;
- volumes de cilindro, cone e esfera, fração angular e escala cúbica;
- soma de discos para a esfera, erro exato `2πR³/(3N²)` e contração por `1/4`;
- identidade da coroa, aproximação linear, resto quadrático e `dA/dr = 2πr`;
- somas interna, média e externa das coroas, cerco final e reciprocidade derivada–integral.

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
