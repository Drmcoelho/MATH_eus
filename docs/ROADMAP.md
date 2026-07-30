# Roadmap — Temporada 01 e revisão arquitetural

## Decisão de escopo

O escopo matemático da Temporada 01 está **congelado**: nenhum laboratório
novo (06–10) é iniciado antes de as Fases A, B e C abaixo terminarem.

Já existe material suficiente — Labs 01, 01·B, 02, 03, 04 e 05 como fatias
verticais — para descobrir o que realmente funciona com um leitor. A
prioridade agora é transformar esse material em padrão ouro, não produzir
mais matemática.

> Nota de estado: o plano original congelava o escopo "após o Lab 03".
> Como os Labs 04 e 05 já existem como fatias verticais, o congelamento
> vale para os Labs 06–10; os Labs 04 e 05 entram na revisão da Fase C
> como material existente, não como escopo novo.

---

## Fase A — Refinamento (antes de escrever mais matemática)

Objetivo: transformar os Labs 01, 01·B e 02 em padrão ouro. O que for
decidido aqui vira o contrato visual e editorial de todos os laboratórios
seguintes.

### PR A1 — Fluxo editorial

- [x] Navegação "Anterior / Temporada / Próximo" (já presente em todos os labs).
- [ ] Barra de progresso ("Lab 2 de 10").
- [ ] Tempo estimado do caminho principal.
- [ ] Indicador de dificuldade.
- [ ] Botão "Recomeçar laboratório" (reset do estado interativo).

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

Só depois das Fases A e B, revisar a temporada inteira (Labs 01–05):

- ritmo;
- excesso de texto;
- acessibilidade;
- mobile;
- tempo real de leitura.

Ao fim da Fase C, o congelamento é levantado e os Labs 06–10 podem começar,
já herdando o padrão ouro.

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
