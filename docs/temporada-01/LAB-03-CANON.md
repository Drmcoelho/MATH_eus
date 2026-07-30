# LAB 03 — A ÁREA QUE O CÍRCULO ESCONDE

## Estado

Brief canônico de produção.

## Transformação cognitiva

```text
Antes: “se o polígono de fora sobra mais no perímetro, provavelmente também sobra mais na área”.
Depois: “perímetro e área possuem assimetrias diferentes; consigo decompor, medir, comparar e prever os dois erros”.
```

## Pergunta de origem

> Ao cercar o mesmo círculo por dentro e por fora, qual polígono erra mais em área — e por quê?

A pergunta deve ser feita antes de mostrar qualquer fórmula.

---

## 1. Cena inicial

Mostrar, sincronizados:

- círculo de raio `R`;
- polígono regular inscrito;
- polígono regular circunscrito;
- regiões de falta e sobra preenchidas com padrões distintos;
- controle de `n`;
- controle opcional de `R`.

Sem números na primeira cena.

Pergunta obrigatória:

```text
Qual área parece maior?
A) o que falta por dentro
B) o que sobra por fora
C) parecem iguais
```

Registrar a previsão antes de liberar o controle de `n`.

---

## 2. Manipulação principal

Ao alterar `n`, atualizar simultaneamente:

1. figura geométrica;
2. áreas interna, circular e externa;
3. gráfico dos dois erros;
4. expressões decompostas em triângulos.

Estados rápidos obrigatórios:

- `n = 4`;
- `n = 6`;
- `n = 12`;
- `n = 24`;
- `n = 96`.

A interface deve permitir alternar entre:

- área absoluta;
- erro absoluto;
- erro relativo;
- escala linear;
- escala logarítmica.

---

## 3. Construção dedutiva

### Passo A — decompor

O polígono inscrito é decomposto em `n` triângulos congruentes.

Destacar um triângulo por vez e mostrar:

- base;
- apótema;
- área do triângulo;
- multiplicação por `n`.

A expressão deve nascer visualmente:

```text
área do polígono
=
n × área de um triângulo
```

Depois:

```text
área do polígono
=
(perímetro × apótema) / 2
```

Somente então apresentar:

```text
A = P · a / 2
```

### Passo B — inscrito

Para o polígono inscrito:

```text
A⁻ₙ = n R² sen(π/n) cos(π/n)
```

A fórmula deve ser mostrada em camadas, nunca como linha pronta.

### Passo C — circunscrito

Para o polígono circunscrito:

```text
A⁺ₙ = n R² tan(π/n)
```

O leitor deve poder tocar nos termos e vê-los destacados na figura.

---

## 4. Descoberta central

Definir visualmente:

```text
erro interno = área do círculo − área inscrita
erro externo = área circunscrita − área do círculo
```

Não revelar inicialmente a relação assintótica.

Mostrar a razão dinâmica:

```text
erro externo / erro interno
```

À medida que `n` cresce, a razão deve tender a:

```text
1/2
```

A descoberta deve contrastar explicitamente com o Lab 02:

```text
Perímetro:
fora erra aproximadamente 2 vezes mais.

Área:
dentro erra aproximadamente 2 vezes mais.
```

Essa inversão é o centro narrativo do laboratório.

---

## 5. Explicação curta

O texto principal deve explicar sem série de Taylor completa:

- no polígono circunscrito, a base cresce, mas o apótema coincide com `R`;
- no inscrito, o apótema fica menor que `R` em toda a figura;
- perímetro e área pesam essas diferenças de maneira diferente;
- portanto, a intuição “o lado de fora sempre erra mais” não é uma lei matemática.

A derivação assintótica permanece na Oficina.

---

## 6. Escala

Adicionar controle `R` com valores simples:

- `R = 1`;
- `R = 2`;
- `R = 4`.

O leitor deve prever antes:

> Se o raio dobra, os erros de área dobram ou quadruplicam?

A interface deve tornar inevitável:

```text
comprimento ∝ R
área ∝ R²
```

A razão entre os erros não muda com `R`.

Isso introduz invariância por escala antes da notação formal.

---

## 7. Desafios

### Desafio 1 — decisão visual

Encontrar o menor `n` em que ambos os erros relativos ficam abaixo de 1%.

### Desafio 2 — hipótese falsa

Apresentar:

> “Se o polígono externo tem perímetro mais distante, também deve ter área mais distante.”

O leitor deve refutar usando um estado compartilhável.

### Desafio 3 — escala

Escolher dois raios e demonstrar que o erro absoluto muda por `R²`, mas o erro relativo permanece.

### Desafio 4 — transferência

Perguntar o que aconteceria ao extrudar as três figuras para a mesma altura.

Não resolver completamente. Essa pergunta abre a passagem para volume.

---

## 8. Oficina

A Oficina deve conter:

### Derivação exata

```text
A⁻ₙ = nR² sen(π/n) cos(π/n)
A⁺ₙ = nR² tan(π/n)
```

### Assintótica

Para `x = π/n`:

```text
sen x cos x = x − (2/3)x³ + O(x⁵)
tan x = x + (1/3)x³ + O(x⁵)
```

Logo:

```text
πR² − A⁻ₙ ~ 2π³R² / (3n²)
A⁺ₙ − πR² ~ π³R² / (3n²)
```

E:

```text
(erro externo) / (erro interno) → 1/2
```

### Auditoria

- comparar fórmula direta com decomposição por coordenadas;
- testar monotonicidade das áreas;
- verificar o cerco `A⁻ₙ < πR² < A⁺ₙ`;
- verificar a lei de escala em `R²`;
- verificar numericamente a razão assintótica sem chamá-la de prova;
- testar casos pequenos e grandes;
- comparar valores da interface com checker independente.

---

## 9. Quatro representações sincronizadas

### Figura

Áreas coloridas de falta e sobra.

### Valores

- `A⁻ₙ`;
- `πR²`;
- `A⁺ₙ`;
- erros absoluto e relativo;
- razão dos erros.

### Gráfico

Duas curvas de erro por `n`, com escalas linear e logarítmica.

### Expressão

Fórmulas com destaque semântico dos termos.

Ao passar o cursor ou tocar em uma região, as outras três representações devem destacar a mesma grandeza.

---

## 10. Estado reproduzível

A URL deve guardar, no mínimo:

```text
?n=24&R=2&view=relative&scale=log
```

A previsão inicial pode permanecer local e não precisa ser exposta na URL.

---

## 11. Critérios de aceite

O Lab 03 só está pronto quando:

- a previsão ocorre antes das fórmulas;
- a área nasce da decomposição em triângulos;
- as quatro representações estão sincronizadas;
- a inversão entre erros de perímetro e área fica visualmente incontornável;
- a lei de escala em `R²` pode ser descoberta por manipulação;
- observação numérica e prova assintótica estão separadas;
- existe checker independente;
- a interface funciona por toque, teclado e Safari móvel;
- o caminho principal pode ser concluído sem abrir a Oficina;
- o leitor consegue explicar por que “por fora erra mais” não é uma regra geral.
