# Temporada 02 — Números que constroem formas

## Pergunta-mãe

Que formas os números inteiros conseguem construir sozinhos — e, quando uma regra parece explicar todas, quantas construções escapam dela?

## Arco cognitivo

```text
regra
→ mapa
→ inversão
→ padrão escondido
→ lei de contagem
→ espaço
→ círculo
→ acumulação
→ ruptura
→ reciprocidade
```

O arco espelha deliberadamente o da Temporada 01: começa numa regra local,
passa pelo erro/exceção, sobe uma dimensão no sexto laboratório e fecha em
reciprocidade.

## Origem

A temporada nasce de uma pergunta real do leitor primário diante da regra
"todo ímpar gera uma terna": **dentre todas as ternas pitagóricas inteiras,
quantas não seguem essa regra?**

A ideia da família dos ímpares foi migrada seletivamente do MATH3us
(fonte visual do antigo cap-02), sem herdar sua numeração de capítulos —
ver `docs/MIGRATION.md`.

Cada laboratório segue o formato do Laboratório 06 da Temporada 01
("Do polígono ao prisma"): partir de um objeto já conquistado,
transformá-lo com uma construção mínima, deixar as fórmulas nascerem em
blocos curtos e fechar com uma comparação dupla.

## Laboratórios

### 01 — A fábrica dos ímpares

Entrega cognitiva: reconhecer que a regra do ímpar gera exatamente as
ternas com hipotenusa − cateto maior = 1, e que quase todas as ternas
escapam dela; chegar à fábrica completa.

Construção: repartir n² em duas metades quase iguais.

```text
terna do ímpar = (n, (n² − 1)/2, (n² + 1)/2)
fábrica completa = (m² − k², 2mk, m² + k²)
```

Comparar: censo por força bruta × fábrica de Euclides (as listas coincidem).

Interações: ímpar gerador, censo com teto até 500, nuvem cateto maior ×
hipotenusa, botões m e k.

Estado: fatia vertical disponível.

### 02 — O mapa de todas as ternas

Entrega cognitiva: enxergar a grade (m, k) como endereço único de cada
terna primitiva; as famílias do ímpar e do par como meras bordas do mapa.

Construção: varrer a grade e acender cada casa com sua terna.

```text
endereço (m, k) → terna (m² − k², 2mk, m² + k²)
diagonal k = m − 1 → família dos ímpares
coluna k = 1 → família do par
```

Comparar: bordas da grade × interior (onde moram Plimpton 322 e os
catetos quase gêmeos).

Interações: grade navegável, cor por diferença hipotenusa − cateto maior,
leitura de cópias nas casas inválidas, a volta terna → endereço.

Estado: fatia vertical disponível.

### 03 — Que números entram em ternas?

Entrega cognitiva: inverter a direção da pergunta — dado um lado inteiro,
encontrar todas as ternas que o contêm; descobrir que todo inteiro a partir
de 3 aparece em alguma.

Construção: fatorar a diferença de quadrados.

```text
cateto ímpar a: a² = (c − b)(c + b)
cada fatoração de a² em dois fatores de mesma paridade → uma terna
```

Comparar: números que aparecem em poucas ternas × campeões de aparição
(o que a fatoração tem a ver com isso).

Interações: busca por número com leque de triângulos de cateto comum,
lista das moradas com fatoração, ranking dos campeões até um teto.

Estado: fatia vertical disponível.

### 04 — A diferença esconde um padrão

Entrega cognitiva: transformar a exceção do Lab 01 em objeto — a diferença
hipotenusa − cateto maior de uma primitiva só pode ser um quadrado ímpar ou
o dobro de um quadrado (1, 2, 8, 9, 18, 25, 32…); prever quem pode e quem
não pode aparecer.

Construção: ler a diferença direto do endereço (m, k).

```text
cateto maior 2mk:      c − b = (m − k)²
cateto maior m² − k²:  c − b = 2k²
```

Comparar: diferenças que ocorrem × diferenças proibidas (3, 4, 5, 6, 7…),
histograma real × previsão.

Interações: histograma das diferenças, teste de um valor qualquer, caça ao
contraexemplo.

### 05 — Quantas ternas existem até N?

Entrega cognitiva: transformar o censo do Lab 01 em lei de crescimento — a
contagem de primitivas com hipotenusa até N cresce como uma reta, e o
coeficiente escondido é 1/(2π): π aparece onde só havia inteiros.

Construção: medir a contagem em vários tetos e procurar a reta.

```text
primitivas até N ≈ N / (2π)
fração fabricada pelos ímpares ≈ √(2N) / total → 0
```

Comparar: contagem exata × reta prevista; família dos ímpares × população
inteira (a resposta definitiva à pergunta-mãe).

Interações: teto N, gráfico contagem × N, razão contagem/N estabilizando.

### 06 — Do esquadro ao tijolo

Entrega cognitiva: subir uma dimensão com o mesmo movimento do
"Do polígono ao prisma" — o esquadro vira a diagonal de uma caixa; a
pergunta a² + b² = c² vira a² + b² + c² = d²; a fábrica ganha um botão a
mais; e o tijolo perfeito permanece um problema em aberto, como fronteira
honesta.

Construção: aplicar Pitágoras duas vezes dentro da caixa.

```text
diagonal da base: a² + b² = e²
diagonal do tijolo: e² + c² = d²  →  a² + b² + c² = d²
exemplo mínimo: (1, 2, 2, 3)
```

Comparar: o que permaneceu do plano × o que ganhou dimensão; quadruplas em
profusão × tijolo perfeito (todas as sete medidas inteiras) sem nenhum
exemplo conhecido.

Interações: tijolo manipulável em 3D, extrusão do triângulo, busca de
quadruplas, checagem das sete medidas.

### 07 — Ternas viram pontos no círculo

Entrega cognitiva: dividir a terna pela hipotenusa e aterrissar na
circunferência unitária — ternas pitagóricas são exatamente os pontos
racionais do círculo, e o círculo da Temporada 01 reaparece vindo da
aritmética.

Construção: normalizar e projetar.

```text
(a, b, c) → (a/c, b/c) com (a/c)² + (b/c)² = 1
reta pelo polo (−1, 0) com inclinação k/m → o mesmo endereço da grade
```

Comparar: pontos racionais (densos) × pontos de coordenadas inteiras no
círculo (só quatro).

Interações: projeção terna → ponto, reta pelo polo, varredura da densidade.

### 08 — Acumular quadrados

Entrega cognitiva: contar pontos inteiros dentro do círculo de raio √N e
ver a contagem acumulada se aproximar de πN — acumular aritmética recupera
a área, ecoando o "Acumular é integrar" da Temporada 01.

Construção: somar as soluções de a² + b² ≤ N.

```text
pontos inteiros no disco de raio √N ≈ πN
erro da borda encolhe em proporção quando N cresce
```

Comparar: contagem exata × área prevista; quais inteiros são soma de dois
quadrados × quais nunca são (a porta dos primos 4k + 1).

Interações: raio deslizante, contagem × área, mapa dos representáveis.

### 09 — Quando o expoente sobe

Entrega cognitiva: encarar a ruptura — com cubos a fábrica não existe:
a³ + b³ = c³ não tem solução inteira (Fermat); as quase-soluções e o
táxi 1729 de Ramanujan mostram o quão perto a aritmética chega sem nunca
fechar.

Construção: procurar de verdade, medir o quanto falta.

```text
a³ + b³ = c³ → sem solução (enunciado; prova fora do alcance e dito assim)
1729 = 1³ + 12³ = 9³ + 10³ (o menor número que é soma de dois cubos
de duas maneiras)
```

Comparar: expoente 2 (infinitas soluções) × expoente 3 (nenhuma); busca
computacional honesta × teorema que a encerra.

Interações: busca exaustiva com teto, mapa do erro |c³ − a³ − b³|, caça aos
números de táxi.

### 10 — A grade e o círculo são o mesmo desenho

Entrega cognitiva: fechar a reciprocidade — cada endereço (m, k) da grade é
uma reta pelo polo, cada reta é um ponto racional do círculo, cada ponto é
uma terna; aritmética e geometria são leituras do mesmo objeto, como
derivar e integrar foram na Temporada 01.

Construção: seguir um único exemplo pelas quatro representações e voltar.

```text
(m, k) ↔ inclinação k/m ↔ ponto (m² − k², 2mk)/(m² + k²) ↔ terna
```

Comparar: ida (grade → círculo) × volta (círculo → grade), com o leitor
dirigindo as duas.

Interações: alternar entre grade, círculo, tabela e fórmula com o mesmo
objeto destacado nas quatro.
