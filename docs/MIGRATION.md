# Migração seletiva — MATH3us → MATHeu$

## Regra

Não copiar o braço antigo integralmente.

Migrar conceitos e componentes, não a burocracia.

## Fontes prioritárias

- `MATH3us/arms/matheus-dollar/index.html`
- `MATH3us/arms/matheus-dollar/MATHeu$.md` ou `MATH3us/MATHeu$.md`
- `MATH3us/arms/matheus-dollar/EXPANSAO-02-LIMITES-TRIANGULOS-SETORES.md`
- geradores SVG e rotinas de gráficos já verificadas
- autópsias de bugs visuais e matemáticos

## O que aproveitar

- triângulo fundamental `R–r–L/2`;
- alternância inscrito/circunscrito;
- identidade visual: inscrito verde, circunscrito vermelho tracejado, círculo preto pontilhado;
- vista local autoajustável;
- tabelas equivalentes aos gráficos;
- invariantes geométricos;
- cálculos de perímetro, área e erros;
- testes de viewport e ausência de rede.

## O que não migrar automaticamente

- contrato de tratado;
- organização por capítulos canônicos;
- ledger completo de claims;
- releases e tags do MATH3us;
- texto formal que anteceda a experiência;
- fórmulas assintóticas no caminho principal;
- rodapés editoriais extensos;
- conteúdo que não sobreviva ao teste de uso.

## Processo por componente

1. identificar a pergunta pedagógica;
2. extrair o algoritmo ou construção;
3. reescrever a interface para Brinque → Entenda → Oficina;
4. inserir exercício antes da explicação;
5. verificar matemática;
6. auditar desktop e iPhone;
7. integrar apenas após render real.

## Migrações realizadas

- **Ternas do ímpar** (fonte visual do antigo cap-02 do MATH3us) →
  `modules/s02-01-ternas-pitagoricas/`. Migrados: a regra
  `(n, (n²−1)/2, (n²+1)/2)` e a caracterização "hipotenusa e cateto maior
  diferem de 1". Não migrados: a numeração de capítulos e o formato de
  pôster estático. A regra foi reescrita como laboratório
  Brinque → Entenda → Oficina, com censo interativo das ternas que escapam
  e a fórmula de Euclides revelada por último.
