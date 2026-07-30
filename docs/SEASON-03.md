# Temporada 03 — Girar é multiplicar

## Pergunta-mãe

O que significa multiplicar por um número que não deixa nada maior nem
menor — só gira?

## Arco cognitivo

```text
giro
→ mapa do giro
→ multiplicação
→ potência
→ raiz
→ onda
→ soma de ondas
→ decomposição
→ fase
→ reciprocidade
```

O arco espelha deliberadamente o das duas primeiras: começa numa
manipulação concreta (girar um ponto), passa por uma lei de composição
(multiplicar é somar ângulos), sobe uma dimensão no sexto laboratório
(do ponto que gira à onda que ele traça) e fecha em reciprocidade.

## Origem e por que esta é a terceira temporada

Das três frentes registradas em `AGENTS.md` §14 ("Temporadas futuras") —
números que não terminam, rotação/complexos/ondas, e variação/risco/decisão
— esta foi escolhida por fechar dois laços que as duas primeiras temporadas
já abriram e deixaram em aberto deliberadamente:

- a Temporada 01 usa `cos(π/n)` desde o Laboratório 01 e chega a "girar
  cria espaço" no Laboratório 07, mas nunca nomeia o giro como operação
  algébrica — só como construção geométrica;
- a Temporada 02 aterrissa as ternas pitagóricas na circunferência unitária
  no Laboratório 07 ("ternas viram pontos no círculo"), mas para no ponto
  racional, sem perguntar o que significa multiplicar dois desses pontos.

A Temporada 03 reencontra o mesmo círculo pela terceira vez — depois de
`r/R = cos(π/n)` e depois de `(a/c, b/c)` — e finalmente pergunta o que ele
faz quando dois de seus pontos se multiplicam. O polígono regular da
Temporada 01 reaparece intacto no Laboratório 05 (raízes da unidade), sem
ter sido convocado: é a mesma figura, a quarta vez que ela carrega uma
ideia nova.

Cada laboratório segue o formato do Laboratório 06 da Temporada 01: partir
de um objeto já conquistado (o ponto no círculo, herdado das duas
temporadas anteriores), transformá-lo com uma construção mínima, deixar as
fórmulas nascerem em blocos curtos e fechar com uma comparação dupla.

## Laboratórios

### 01 — O que gira quando eu multiplico?

Entrega cognitiva: descobrir que multiplicar por certos números do plano
gira um ponto em vez de só esticá-lo; nomear o par (x, y) como um único
número.

Construção: multiplicar (a, b) por (c, d) igual a esticar-e-girar,
comparando com a multiplicação escalar já conhecida.

```text
(a, b) · (c, d) = (ac − bd, ad + bc)
i · i = (0,1) · (0,1) = (−1, 0)
```

Comparar: multiplicar por um número real positivo (só estica) × multiplicar
por i (só gira 90°) — com dois casos à parte que a régua arrastável vai
encontrar sozinha: um real negativo também gira (180°, não "só" estica) e
zero colapsa qualquer ponto na origem, onde nenhum ângulo sobrevive.

Interações: ponto arrastável, multiplicador arrastável, trilha do produto.

### 02 — O mapa dos giros

Entrega cognitiva: trocar (x, y) por (raio, ângulo) — a forma polar — e
enxergar que todo ponto do plano, exceto a própria origem, é "um giro e um
tamanho": em (0, 0) o módulo é zero mas o ângulo não existe — não há giro
que precise ser lido quando não há seta a apontar.

Construção: ler o mesmo ponto nas duas coordenadas e alternar entre elas.

```text
módulo = √(x² + y²)
ângulo = atan2(y, x)
```

Comparar: mapa cartesiano × mapa polar do mesmo conjunto de pontos.

Interações: alternância cartesiano/polar com o mesmo ponto destacado nas
duas, régua de módulo, transferidor de ângulo.

### 03 — Multiplicar é somar ângulos

Entrega cognitiva: chegar à lei de composição — multiplicar dois números
do plano soma os ângulos e multiplica os módulos — a partir da
manipulação, não da fórmula.

Construção: multiplicar dois pontos na forma polar e conferir contra a
forma cartesiana do Lab 01.

```text
(r₁, θ₁) × (r₂, θ₂) = (r₁r₂, θ₁ + θ₂)
```

Comparar: soma de ângulos (produto) × soma de módulos (nunca acontece,
armadilha comum).

Interações: dois ponteiros giratórios, produto ao vivo, contraexemplo
"somar os módulos".

### 04 — Potências viram voltas

Entrega cognitiva: ver que elevar um número do plano a uma potência inteira
é só multiplicar o ângulo — e que isso faz o ponto dar voltas.

Construção: repetir a multiplicação do Lab 03 n vezes.

```text
(r, θ)ⁿ = (rⁿ, nθ)
```

Comparar: crescimento do módulo (exponencial) × crescimento do ângulo
(linear, mas dá voltas — o mostrador estoura e recomeça).

Interações: expoente deslizante, contador de voltas completas, trilha da
potência sobre o círculo unitário quando r = 1.

### 05 — Raízes se repartem em roda

Entrega cognitiva: inverter o Lab 04 — buscar todos os números cuja
n-ésima potência dá 1 — e ver o polígono regular da Temporada 01 reaparecer
sozinho, como as n soluções igualmente espaçadas no círculo.

Construção: dividir a volta completa em n fatias iguais.

```text
raízes de zⁿ = 1: (1, 2kπ/n) para k = 0, 1, …, n−1
```

Comparar: o polígono regular de n lados (Temporada 01, Lab 01) × as n
raízes n-ésimas da unidade (mesmas coordenadas, sem nenhuma circunferência
ter sido desenhada de propósito).

Interações: n deslizante, raízes destacadas sobre o círculo, sobreposição
com o polígono do Lab 01 (mesma figura, dois nomes).

### 06 — Do giro à onda

Entrega cognitiva: subir uma dimensão — projetar o ponto que gira sobre um
eixo, deixando o tempo correr, e ver a onda senoidal nascer como sombra do
giro, não como fórmula memorizada.

Construção: acrescentar o eixo do tempo e observar a sombra vertical do
ponto girante.

```text
altura(t) = R · sen(ωt)
```

Comparar: o movimento circular (Lab 02) × sua sombra ao longo do tempo
(a onda) — mesma velocidade angular, duas representações.

Interações: velocidade angular deslizante, traço da onda se desenhando em
tempo real ao lado do círculo, congelar/retomar.

### 07 — Somar ondas

Entrega cognitiva: somar duas ondas ponto a ponto e descobrir que o
resultado às vezes cresce, às vezes quase desaparece — batimento como
consequência visível, não como jargão de física.

Construção: somar duas sombras (Lab 06) com frequências próximas.

```text
sen(ω₁t) + sen(ω₂t)
```

Comparar: mesma frequência (reforço constante) × frequências próximas
(batimento lento) × frequências distantes (mistura sem padrão óbvio).

Interações: duas frequências deslizantes, onda-soma desenhada ao vivo,
envelope do batimento destacável.

### 08 — Toda onda é soma de giros

Entrega cognitiva: inverter o Lab 07 — dada uma onda complicada (não
senoidal), decompô-la em poucos giros simples que, somados, a recriam;
primeiro contato honesto com a ideia de Fourier, sem a série completa.

Construção: ajustar amplitude e frequência de 2–3 giros até a soma
aproximar um alvo (dente de serra ou onda quadrada truncada).

```text
alvo(t) ≈ Σ aₖ · sen(kωt)
```

Comparar: poucos termos (aproximação grosseira) × mais termos (a esquina
da onda quadrada fica mais nítida, nunca perfeita — porta futura para o
fenômeno de Gibbs, nomeado e não explicado).

Interações: número de termos deslizante, erro da aproximação, alvo
selecionável.

### 09 — A fase que muda tudo

Entrega cognitiva: isolar o parâmetro que Lab 06–08 deixaram fixo — a fase
— e ver que atrasar um giro antes de somá-lo muda o resultado tanto quanto
mudar sua amplitude, mesmo sem tocar em nenhum módulo.

Construção: reintroduzir o ângulo inicial do Lab 02 como atraso de tempo —
subtrair φ dentro do seno é o que empurra a onda para depois no tempo, não
somar.

```text
sen(ωt − φ) = sen(ω(t − φ/ω))
```

Comparar: mudar amplitude (estica a onda) × mudar fase (desloca a onda) —
efeitos visualmente distintos, facilmente confundidos em texto.

Interações: fase deslizante independente da amplitude, sobreposição
antes/depois do deslocamento.

### 10 — Girar, somar e voltar são o mesmo movimento

Entrega cognitiva: fechar a reciprocidade — girar um ponto (Lab 01),
multiplicar dois números do plano (Lab 03), decompor uma onda em giros
(Lab 08) e voltar da onda ao giro que a gerou são a mesma ida-e-volta, como
derivar/integrar fechou a Temporada 01 e a grade/círculo fechou a
Temporada 02.

Construção: seguir um único exemplo pelas quatro representações (ponto no
plano, forma polar, onda no tempo, soma de giros) e voltar ao ponto de
partida.

Comparar: ida (giro → onda) × volta (onda → giro que a gerou), com o
leitor dirigindo as duas.

Interações: alternar entre as quatro representações com o mesmo objeto
destacado em todas.
