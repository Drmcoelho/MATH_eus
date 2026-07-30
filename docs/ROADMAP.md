# Roadmap — Temporada 01 e revisão arquitetural

## Decisão de escopo

O escopo matemático da Temporada 01 está **completo**: os Labs 01–05 (e o
Interlúdio 01·B) estão na `main`, e os Labs 06–10 chegam pelo PR #14, a
implementação canônica da segunda metade (o PR #8, rascunho paralelo sobre
base defasada, foi fechado como superado).

A partir daqui vale um **gate de qualidade, não de escopo**: nenhum escopo
matemático novo (temporadas ou laboratórios além dos planejados) é
iniciado antes de as Fases A, B e C abaixo terminarem sobre a temporada
inteira. A prioridade é transformar o material existente em padrão ouro,
não produzir mais matemática.

> Nota de estado: o plano original congelava o escopo "após o Lab 03".
> Quando o roadmap foi escrito, os Labs 04 e 05 já existiam; em seguida os
> Labs 06–10 se materializaram no PR #14. O congelamento foi então
> convertido neste gate de qualidade — o documento não pode afirmar que um
> trabalho já entregue ainda não começou.

---

## Fase A — Refinamento (antes de escrever mais matemática)

Objetivo: transformar os Labs 01, 01·B e 02 em padrão ouro. O que for
decidido aqui vira o contrato visual e editorial de todos os laboratórios
seguintes.

### PR A1 — Fluxo editorial

- [x] Navegação "Anterior / Temporada / Próximo" (já presente em todos os labs).
- [x] Barra de progresso ("Lab 2 de 10") — Labs 01, 01·B e 02.
- [x] Tempo estimado do caminho principal — Labs 01, 01·B e 02.
- [x] Indicador de dificuldade — Labs 01, 01·B e 02.
- [x] Botão "Recomeçar laboratório" (reset do estado interativo) — Labs 01, 01·B e 02.

### PR A2 — Visualizações

- [ ] Gráfico dinâmico dos perímetros.
- [ ] Gráfico dos erros.
- [ ] Destaque automático do ponto correspondente ao valor atual de `n`
      (correspondência figura ↔ tabela ↔ gráfico, cf. AGENTS.md §7.4).
- [ ] Alternância Linear ↔ Log.
- [ ] Botão "Dobrar lados".

### PR A3 — UX

- [ ] Tornar o bloco "régua tremer" (ruído de medição) explicitamente opcional.
- [ ] Melhorar microanimações.
- [ ] Pequenas transições SVG.
- [ ] Melhor contraste em modo escuro.

---

## Fase B — Laboratório 03 como o melhor do projeto

O Lab 03 já existe como fatia vertical. A Fase B o eleva à referência de
qualidade do projeto inteiro.

Ele responde à pergunta:

> Se o perímetro converge, a área também?

Mas **nunca dizendo isso logo de início**.

Sequência ideal do caminho principal:

1. Qual figura pinta mais área?
2. Arrastar o número de lados.
3. Ver pequenos triângulos aparecerem.
4. Descobrir que área = soma dos triângulos.
5. Nascer naturalmente

   ```text
   A = n · base · altura / 2
   ```

   e então

   ```text
   A = n · R² · sen(2π/n) / 2
   ```

   sem decorar nada.

Depois, comparar com gráfico:

- área inscrita;
- área do círculo;
- área circunscrita.

Fechamento (o segredo que abre o Lab 04):

> Quem está diminuindo mais rápido?
> Os erros de área ou os de perímetro?

---

## Fase C — Revisão completa da Temporada

Só depois das Fases A e B, revisar a temporada inteira (Labs 01–10, com o
Interlúdio 01·B):

- ritmo;
- excesso de texto;
- acessibilidade;
- mobile;
- tempo real de leitura;
- propagação do padrão ouro da Fase A (faixa de meta, gráficos, UX) aos
  Labs 03–10;
- avaliação do piloto de reforma de profundidade do Lab 01
  (`docs/REFORMA.md`), com o gate de validação do leitor primário antes de
  propagar o padrão aos demais labs.

Ao fim da Fase C, o gate de qualidade é levantado e escopos novos podem
começar, já herdando o padrão ouro.

---

## Arquitetura — de conjunto de laboratórios a progressão

Hoje o projeto ainda parece um conjunto de laboratórios. A meta é que
pareça um **videogame** — não no sentido infantil, no sentido de
progressão.

### Mapa de progressão

O portal e cada laboratório mostram onde o leitor está e o que cada
laboratório desbloqueou:

```text
Temporada 1
✓ Lab 1
✓ Lab 2
○ Lab 3
────────────
Forma descoberta
■■□□□□□□□□
Medida descoberta
■□□□□□□□□□
Erro
□□□□□□□□□□
Limite
□□□□□□□□□□
```

Cada laboratório desbloqueia **uma ideia**, não uma fórmula.

### O objeto persistente

O mesmo polígono acompanha o leitor por toda a temporada:

| Lab | O que o objeto vira |
|-----|---------------------|
| 01  | serve para descobrir `r/R` |
| 02  | mede perímetro |
| 03  | mede área |
| 04  | vira erro |
| 05  | vira limite |
| 06  | vira prisma |
| 07  | vira sólido de revolução |
| 08  | vira integral |
| 09  | vira derivada |
| 10  | vira reciprocidade |

O leitor nunca aprende dez figuras. Ele aprende **uma** figura
extremamente profundamente. Isso realiza a tese do corpus: poucos objetos
gerando muitos fenômenos.

### Organização por perguntas inevitáveis

O MATHeu$ não é organizado por disciplinas, nem por conteúdos, nem por
capítulos. É organizado por **perguntas inevitáveis**:

- Como descobrir uma forma sem vê-la?
- Como medir um contorno impossível?
- Como medir uma área impossível?
- Quando um erro deixa de importar?
- Como o infinito nasce sem existir?
- O que fazer quando uma operação deixa de funcionar?
- O que sobra quando um sistema não fecha?

Essas perguntas são memoráveis. O leitor volta para respondê-las. A
matemática vira a consequência natural da investigação, e não o assunto
principal. Essa é a característica que diferencia o MATHeu$ de
praticamente todo material didático de matemática.

Regra prática para agentes: todo laboratório novo declara, antes de
qualquer código, qual pergunta inevitável ele responde — e o título, a
provocação inicial e o segredo final devem ser reconhecíveis a partir
dessa pergunta.
