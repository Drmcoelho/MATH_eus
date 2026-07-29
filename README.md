# MATHeu$

**Laboratório visual de intuição matemática.**

A matemática entra pelos olhos, é interrogada pelas mãos e só então recebe fórmula.

## O que este projeto é

Uma sequência de laboratórios interativos para observar, prever, manipular, deduzir, testar e transferir ideias matemáticas.

Não é tratado, currículo ou enciclopédia.

## Primeira temporada

**O cerco do círculo**

1. [Duas circunferências, um polígono](modules/01-duas-circunferencias/index.html) — primeira fatia vertical disponível
2. Quanto mede o contorno?
3. O que acontece com as áreas?
4. O erro também tem forma
5. Quando “chegar perto” vira limite?
6. Do polígono ao prisma
7. Girar cria espaço
8. Acumular é integrar
9. Mudar é derivar
10. Derivar e integrar são movimentos inversos

## Verificação do Laboratório 01

O módulo possui um verificador matemático independente, sem dependências externas:

```bash
node modules/01-duas-circunferencias/check-math.mjs
```

Ele confere 118 valores de `n`, a identidade pitagórica, a monotonicidade de `r/R`, a construção pelo ponto médio, a inferência inversa de `n` e, para a parte de ruído, os intervalos de compatibilidade e o alcance do instrumento em cada tolerância.

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
