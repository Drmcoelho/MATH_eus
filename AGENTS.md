# AGENTS.md — MATHeu$

## Laboratório visual de intuição matemática

> Não construir um tratado.
> Construir algo que Matheus efetivamente abra, manipule, leia, questione e termine.

---

## 0. Autoridade e finalidade

Este arquivo rege todos os agentes que planejam, escrevem, desenham, programam, auditam ou revisam o **MATHeu$**.

Nome público: `MATHeu$`.

Nome técnico do repositório: `MATH_eus`.

O caractere `$` integra a marca pública, mas não o nome do repositório. Ele significa **valor observável entregue**:

- figura que explica;
- manipulação que responde;
- exercício que força uma decisão;
- fórmula que nasce de um objeto;
- prova que fecha o que realmente precisa ser fechado.

Em caso de conflito entre uma decisão tecnicamente sofisticada e a experiência real do leitor primário, prevalece a experiência do leitor, desde que a correção matemática seja preservada.

A medida de sucesso não é quantidade de teoremas, páginas, telas, claims, agentes ou referências.

A medida de sucesso é:

> O leitor pensou antes de receber a resposta?

---

# 1. Definição do produto

MATHeu$ é um **livro-laboratório matemático, visual, interativo, autocontido e pessoal**.

Não é:

- tratado;
- enciclopédia;
- currículo completo;
- curso universitário convencional;
- coleção de demonstrações formais;
- vitrine de equações;
- versão simplificada do MATH3us;
- sistema de governança com uma aula ocasional anexada.

É uma sequência de **laboratórios conectados**.

Cada laboratório parte de uma pergunta genuína, preferencialmente nascida de:

- uma intuição do leitor primário;
- uma inversão de pergunta;
- um padrão percebido;
- uma imagem mental;
- uma aparente contradição;
- uma tentativa de generalização;
- uma aplicação concreta.

A unidade editorial é o **laboratório**.

Um laboratório deve poder ser explorado em aproximadamente 10 a 30 minutos no caminho principal, podendo conter oficinas opcionais mais longas.

Um laboratório não precisa encerrar toda a teoria relacionada. Precisa produzir uma transformação cognitiva identificável.

Exemplo:

- antes: “dois círculos não parecem determinar um polígono”;
- depois: “a razão entre os raios restringe discretamente o número de lados e a precisão da medida limita a decisão”.

---

# 2. Relação com o MATH3us

O repositório `MATH3us` permanece preservado como:

- arquivo da reconstrução formal;
- fonte de demonstrações;
- banco de claims;
- registro de erros, autópsias e auditorias;
- mina de componentes visuais e algoritmos.

O MATHeu$ não herda automaticamente:

- capítulos;
- numeração;
- volumes;
- gates;
- tags;
- claims;
- contratos editoriais;
- arquitetura de tratado.

Nada é migrado por prestígio documental.

Um elemento do MATH3us só entra no MATHeu$ se passar pelo teste:

> Isso melhora a experiência de observar, manipular, deduzir ou transferir uma ideia?

Migração é seletiva e explícita.

---

# 3. Modelo do leitor primário

O leitor primário é Matheus.

Características relevantes:

- forte percepção de padrões;
- raciocínio intuitivo, associativo e inversivo;
- tendência a buscar estruturas ocultas;
- boa memória visual;
- formação científica avançada;
- baixa tolerância a formalismo anterior à necessidade;
- baixa probabilidade de ler longas exposições lineares apenas porque são rigorosas;
- alta probabilidade de explorar uma interface responsiva às próprias perguntas;
- capacidade de compreender uma ideia difícil antes de dominar a notação convencional.

O agente não deve confundir falta de familiaridade notacional com limitação intelectual.

A notação deve chegar **depois da ideia**, como compressão útil daquilo que já foi compreendido.

---

# 4. Primeira lei pedagógica

## Não partir da premissa. Chegar à premissa.

É proibido iniciar um laboratório com:

- teorema;
- definição abstrata;
- fórmula não motivada;
- lista de propriedades;
- revisão histórica;
- objetivos curriculares;
- notação que o leitor ainda não sabe ler.

Sequência preferencial:

```text
provocação
→ desenho
→ palpite
→ manipulação
→ comparação
→ padrão
→ pergunta inevitável
→ nome
→ fórmula
→ explicação
→ teste adversarial
→ aplicação
→ desafio
```

A definição entra quando o leitor já encontrou o objeto.

A fórmula entra quando a linguagem comum ficou longa ou imprecisa demais.

O teorema entra quando existe uma afirmação que merece garantia.

A demonstração entra quando o leitor já entende o que está sendo demonstrado e por que isso importa.

---

# 5. As três camadas

Cada laboratório possui três profundidades separadas.

## 5.1 Brinque

É o caminho principal.

Contém:

- perguntas;
- desenhos;
- animações;
- controles;
- comparações;
- números pequenos;
- previsões;
- feedback imediato;
- exercícios curtos.

Não exige domínio de notação avançada.

O leitor deve conseguir percorrê-la sem abrir demonstração formal.

## 5.2 Entenda

Explica:

- por que o padrão aparece;
- o significado das grandezas;
- a origem geométrica das fórmulas;
- as relações entre representações;
- os casos especiais;
- os limites de validade.

Usa álgebra apenas quando necessária.

## 5.3 Oficina

É opcional e expansível.

Pode conter:

- derivação completa;
- demonstração formal;
- generalização;
- notação mais avançada;
- implementação;
- testes numéricos;
- referências;
- auditoria.

A Oficina não invade o caminho principal.

**Rigor disponível não significa rigor compulsório.**

---

# 6. Protocolo obrigatório para fórmulas

Nenhuma fórmula aparece sem preparação.

Antes de exibir uma fórmula central, o laboratório deve permitir que o leitor reconheça visual ou numericamente a relação que ela comprime.

Toda fórmula central apresenta, nesta ordem:

1. **Leitura em voz natural** — como a expressão é lida em português.
2. **Dicionário de símbolos** — significado de cada símbolo junto da fórmula.
3. **Objeto representado** — qual figura, medida ou comportamento ela descreve.
4. **Exemplo pequeno** — preferencialmente verificável por inspeção.
5. **Controle interativo** — alterar variável e observar resultado.
6. **Unidade** — comprimento, área, volume, razão, ângulo ou adimensional.
7. **Domínio de validade** — quando funciona e quando não deve ser usada.
8. **Origem curta** — derivação em poucos passos ou botão para abrir.

## 6.1 Limites de densidade no caminho principal

- no máximo dois símbolos novos por bloco;
- nenhum símbolo antes de definição;
- nenhuma cadeia com mais de três igualdades sem divisão em passos;
- nenhum somatório, produto, quantificador ou notação assintótica sem preparação visual;
- nenhuma equação apenas porque é convencional;
- nenhuma manipulação algébrica usada como substituto de explicação.

## 6.2 Exemplo canônico: as duas circunferências

Para um polígono regular de `n` lados:

- `R` é o raio da circunferência que passa pelos vértices;
- `r` é o raio da circunferência tangente aos lados.

A relação correta é:

```text
r / R = cos(π / n)
```

O laboratório não começa por ela.

Primeiro mostra:

- centro;
- vértice;
- ponto médio de um lado;
- triângulo retângulo formado;
- ângulo `π/n`;
- `r` como cateto adjacente;
- `R` como hipotenusa.

Depois apresenta:

```text
cosseno do ângulo
=
cateto adjacente / hipotenusa
=
r / R
```

A relação inversa pode aparecer posteriormente:

```text
R / r = 1 / cos(π/n)
```

A fórmula deve parecer inevitável, não importada.

---

# 7. Regime visual

## 7.1 A imagem conduz

Todo conceito central possui representação visual funcional.

Não basta anexar ilustração ao texto.

A imagem participa do raciocínio.

Elementos preferenciais:

- SVG calculado;
- Canvas interativo;
- gráfico;
- diagrama de transformação;
- tabela vinculada ao gráfico;
- animação controlável;
- comparação lado a lado;
- corte transversal;
- visualização tridimensional manipulável.

## 7.2 Imagem generativa não é geometria

Imagens geradas por modelos podem ser usadas como:

- moodboard;
- referência de atmosfera;
- pesquisa de composição;
- rascunho descartável.

Não podem ser fonte canônica para:

- geometria;
- gráfico;
- escala;
- tangência;
- ângulo;
- proporção;
- área;
- volume;
- demonstração;
- dados.

Toda figura matemática nasce de dados, coordenadas, equações ou construções verificáveis.

## 7.3 Fonte, derivado e testemunha

- **Fonte:** código, dados, coordenadas e especificação.
- **Derivado:** SVG, Canvas ou visualização produzida.
- **Testemunha:** screenshot usado para verificar a renderização.

Screenshot nunca é fonte.

## 7.4 Quatro representações

Quando aplicável, o mesmo objeto aparece em:

1. figura geométrica;
2. valores numéricos;
3. gráfico;
4. expressão matemática.

O leitor deve poder alternar entre elas.

A interface deve destacar a correspondência entre:

- ponto da figura;
- linha da tabela;
- ponto do gráfico;
- termo da fórmula.

---

# 8. Transformação espacial

Objetos bidimensionais relevantes recebem, quando produtivo, extensão tridimensional.

Exemplos:

- polígono extrudado → prisma;
- círculo extrudado → cilindro;
- triângulo rotacionado → cone;
- semicircunferência rotacionada → esfera;
- polígonos inscritos e circunscritos → prismas cercando um cilindro;
- fatias planas → volume acumulado.

A passagem para três dimensões deve responder:

- o que permaneceu;
- o que ganhou dimensão;
- como perímetro virou área lateral;
- como área virou volume;
- como o erro bidimensional se propagou no espaço.

---

# 9. Exercícios entremeados

Exercícios não ficam concentrados no fim.

O leitor não permanece mais de três ou quatro blocos passivo.

## 9.1 Intervenções

### Pare e aposte

Prever antes de executar animação ou revelar gráfico.

### Arraste e descubra

Manipular parâmetro até encontrar condição.

### Qual não pertence?

Comparar casos e detectar exceção.

### Complete a figura

Preencher segmento, ângulo, valor ou relação.

### Encontre o erro

Analisar explicação plausível, mas errada.

### Quebre a regra

Procurar contraexemplo.

### Explique sem fórmula

Justificar verbal ou visualmente.

### Agora use a fórmula

Aplicar expressão já compreendida.

### Mesma estrutura, outra história

Transferir a ideia para outro contexto.

### Segredo de mestre

Resolver desafio que revela conexão futura.

## 9.2 Escada de pistas

Cada exercício relevante oferece:

1. tentativa livre;
2. primeira pista;
3. pista visual;
4. pista estrutural;
5. solução comentada.

A solução explica:

- primeiro passo;
- intuição útil;
- armadilha provável;
- verificação;
- reaparição futura da ideia.

## 9.3 Proibição do exercício burocrático

Não criar vinte substituições numéricas iguais.

Repetição só é válida quando muda deliberadamente:

- representação;
- escala;
- domínio;
- direção da inferência;
- caso extremo;
- hipótese;
- aplicação.

---

# 10. Boxes editoriais

## Pare e aposte

Solicita previsão antes da resposta.

## Olhe de novo

Aponta característica visual fácil de ignorar.

## Erro fértil

Expõe raciocínio plausível que falha de modo instrutivo.

## Curiosidade

Fato lateral curto e estruturalmente ligado.

## Aplicação real

Mostra uso legítimo fora do laboratório.

## Em três dimensões

Transforma o objeto plano em espacial.

## Segredo de mestre

Relação surpreendente já verificável, explicada depois.

## Porta futura

Nomeia ferramenta ainda não construída, sem usá-la como explicação mágica.

## Oficina

Abre derivação, prova, código ou auditoria opcional.

Boxes não servem para despejar conteúdo que o agente não soube integrar.

---

# 11. Anatomia de um laboratório

## 11.1 Provocação

Pergunta curta, concreta e genuína.

## 11.2 Objeto nu

Figura sem fórmula, inspecionável e manipulável.

## 11.3 Primeiro palpite

Resposta solicitada antes do instrumento.

## 11.4 Ferramenta mínima

Apenas a construção necessária para avançar.

## 11.5 Laboratório

Parâmetros variáveis e observações registráveis.

## 11.6 Padrão

Casos organizados em tabela ou gráfico.

## 11.7 Fórmula inevitável

Compressão da relação percebida.

## 11.8 Por que funciona

Explicação curta; prova completa na Oficina.

## 11.9 Teste adversarial

- menor caso;
- maior caso razoável;
- degenerado;
- impossível;
- arredondamento;
- ruído de medição.

## 11.10 Transferência

Mesma estrutura em outro objeto.

## 11.11 Segredo

Pergunta final que abre o próximo laboratório.

---

# 12. Primeira temporada — O cerco do círculo

A primeira temporada nasce da configuração de duas circunferências e um polígono.

Ela não tenta ensinar “geometria inteira”.

Ela extrai o máximo de uma única configuração.

## Laboratório 1 — Duas circunferências, um polígono

Perguntas:

- o que as duas circunferências determinam;
- o que não determinam;
- qual informação está contida em `r/R`;
- por que apenas certos valores são compatíveis com polígonos regulares;
- como erro de medição pode tornar números de lados indistinguíveis.

Resultado central:

```text
r / R = cos(π/n)
```

Aplicações:

- inferência geométrica;
- tolerância de medição;
- classificação por forma;
- reconstrução aproximada.

## Laboratório 2 — Quanto mede o contorno?

Construir o lado antes do perímetro:

```text
lado = 2R · sen(π/n)
```

Chegar a:

```text
perímetro inscrito = 2nR · sen(π/n)
```

E, para o circunscrito:

```text
perímetro circunscrito = 2nr · tg(π/n)
```

Explorações:

- aumentar `n`;
- comparar interno, círculo e externo;
- medir os erros;
- observar assimetria;
- comparar escalas linear e logarítmica.

## Laboratório 3 — O que acontece com as áreas?

Construir área por triângulos.

Chegar a:

```text
área do polígono = perímetro × apótema / 2
```

Gráficos:

- áreas versus `n`;
- erro absoluto;
- erro percentual;
- diferença externa-interna;
- erro de área versus erro de perímetro.

## Laboratório 4 — O erro também tem forma

Introduzir:

- erro absoluto;
- erro relativo;
- razão entre erros;
- erro normalizado;
- contração ao dobrar `n`.

A notação assintótica só aparece depois de o leitor observar estabilização de `n² × erro`.

## Laboratório 5 — Quando “chegar perto” vira limite?

O limite nasce da pergunta:

> Quantos lados garantem erro menor que uma tolerância escolhida?

A linguagem formal `ε–N` permanece opcional na Oficina.

## Laboratório 6 — Do polígono ao prisma

Extrusão por altura `h`.

```text
área lateral = perímetro da base × altura
volume = área da base × altura
```

Comparar prismas inscritos e circunscritos a cilindro.

## Laboratório 7 — Girar cria espaço

- retângulo → cilindro;
- triângulo → cone;
- semicircunferência → esfera.

Fatiar antes de fornecer fórmulas.

## Laboratório 8 — Acumular é integrar

A integral aparece como máquina de acumulação:

- setores;
- anéis;
- fatias;
- discos;
- aproximações progressivas.

Toda integral é lida verbalmente.

## Laboratório 9 — Mudar é derivar

Começar por:

- como a área do círculo muda quando o raio cresce;
- quanto uma coroa fina acrescenta.

Chegar a:

```text
dA/dr = 2πr
```

E, para a esfera:

```text
dV/dr = 4πr²
```

## Laboratório 10 — Derivar e integrar são movimentos inversos

Conectar:

- variação local;
- acumulação global;
- área;
- contorno;
- volume;
- superfície.

O Teorema Fundamental do Cálculo só é nomeado depois que a reciprocidade já foi percebida.

---

# 13. Segunda temporada — Números que constroem formas

A segunda temporada nasce de uma pergunta real do leitor primário:

> Dentre todas as ternas pitagóricas inteiras, quantas não seguem a regra do ímpar?

Ela extrai o máximo de uma única configuração aritmética — a² + b² = c² com
lados inteiros — em dez laboratórios, espelhando o arco da primeira:
regra, mapa, inversão, padrão escondido, lei de contagem, espaço, círculo,
acumulação, ruptura e reciprocidade.

Cada laboratório segue o formato do Laboratório 6 da primeira temporada:
partir de um objeto já conquistado, transformá-lo com uma construção
mínima, deixar as fórmulas nascerem em blocos curtos e fechar com uma
comparação dupla.

O plano completo, laboratório a laboratório, está em `docs/SEASON-02.md`.

1. A fábrica dos ímpares — a regra, o censo e quem escapa.
2. O mapa de todas as ternas — a grade (m, k) como endereço único.
3. Que números entram em ternas? — o problema inverso via fatoração.
4. A diferença esconde um padrão — quadrados e dobros de quadrados.
5. Quantas ternas existem até N? — a lei de contagem onde π aparece.
6. Do esquadro ao tijolo — Pitágoras duas vezes e o tijolo perfeito.
7. Ternas viram pontos no círculo — os pontos racionais da circunferência.
8. Acumular quadrados — pontos inteiros no disco e a área recuperada.
9. Quando o expoente sobe — Fermat, as quase-soluções e o táxi 1729.
10. A grade e o círculo são o mesmo desenho — a reciprocidade final.

---

# 14. Temporadas futuras

## Números que não terminam

- bases;
- expansões;
- ciclos de restos;
- periodicidade;
- aproximações racionais;
- música e temperamento.

## Rotação, complexos e ondas

- rotação;
- números complexos;
- raízes;
- fase;
- seno e cosseno;
- ondas;
- Fourier visual.

## Variação, risco e decisão

Condicionada a problemas concretos:

- crescimento;
- decaimento;
- probabilidade condicional;
- testes diagnósticos;
- erro de medição;
- incerteza;
- decisão sob risco.

---

# 15. Aplicabilidade

Cada conceito recebe aplicação prática quando a transferência for legítima.

Não forçar analogias.

Domínios possíveis:

- medição;
- fabricação;
- imagem digital;
- reconstrução por cortes;
- área e volume;
- superfícies biológicas;
- relação superfície/volume;
- sinais;
- acústica;
- movimento;
- localização;
- computação gráfica;
- impressão 3D.

Aplicações clínicas são contexto matemático, não recomendação médica.

Cada aplicação responde:

1. qual é o objeto matemático;
2. qual é a correspondência real;
3. onde a analogia termina;
4. que decisão a matemática melhora.

---

# 16. Honestidade matemática

Simplificar apresentação não autoriza simplificar verdade.

Distinguir sempre:

- desenho;
- observação;
- padrão;
- conjectura;
- fórmula;
- demonstração;
- aproximação;
- simulação;
- aplicação.

Um gráfico não prova universalidade.

Uma animação não prova limite.

Mil exemplos não provam teorema.

Uma prova correta não garante implementação correta.

A prova completa pode ser opcional para o leitor.

A verificação não é opcional para o agente.

---

# 17. Auditoria proporcional

Todo laboratório verifica:

- fórmulas;
- equivalência figura/tabela/gráfico;
- casos extremos;
- desktop e celular;
- clipping;
- teclado;
- contraste;
- textos alternativos;
- funcionamento offline;
- fidelidade dos controles ao estado.

Claims formais são reservados para:

- resultados centrais;
- invariantes computacionais;
- relações reutilizadas;
- afirmações cuja falha comprometeria a experiência.

A auditoria não deve produzir mais texto que o laboratório.

---

# 18. Arquitetura técnica

```text
MATH_eus/
├── AGENTS.md
├── README.md
├── index.html
├── docs/
│   ├── SEASON-01.md
│   ├── SEASON-02.md
│   └── MIGRATION.md
├── modules/
│   ├── 01-duas-circunferencias/
│   │   ├── index.html
│   │   ├── lesson.md
│   │   ├── exercises.yml
│   │   ├── source/
│   │   │   ├── visual-spec.md
│   │   │   ├── figures/
│   │   │   ├── generators/
│   │   │   └── data/
│   │   └── audit/
│   ├── 02-perimetros/
│   └── ...
├── shared/
│   ├── geometry/
│   ├── graphs/
│   ├── ui/
│   └── accessibility/
└── tools/
    ├── audit.mjs
    ├── check-math.mjs
    └── validate-offline.mjs
```

Regras:

- HTML autocontido é a fonte canônica de publicação;
- sem CDN;
- sem biblioteca externa em runtime;
- sem build obrigatório;
- SVG preferencial;
- Canvas quando oferecer vantagem real;
- Safari/iOS é alvo primário;
- infraestrutura compartilhada só surge após repetição real.

---

# 19. Critério de conclusão

Um laboratório está pronto quando:

- começa por pergunta;
- permite interação antes da fórmula;
- exige ao menos uma previsão;
- a fórmula nasce de objeto compreendido;
- símbolos são legíveis;
- exercícios são entremeados;
- há transferência;
- há caso adversarial;
- figura, tabela, gráfico e cálculo concordam;
- funciona no celular;
- o leitor primário percorreu a entrega renderizada;
- termina com vontade de abrir o próximo.

Não está pronto quando:

- apenas contém informação correta;
- possui prova longa sem experiência;
- tem gráficos decorativos;
- depende de explicação oral externa;
- introduz notação que não ensina a ler;
- usa “veremos depois” para esconder salto;
- parece completo no Git, mas não é convidativo no navegador.

---

# 20. Regra final para agentes

Antes de adicionar qualquer seção, perguntar:

1. Matheus vai abrir isto?
2. O que ele fará nesta tela?
3. Que palpite formulará?
4. O que a figura permite perceber?
5. Por que a fórmula precisa aparecer agora?
6. É possível explicar com menos símbolos?
7. Há algo manipulável?
8. Onde está o exercício?
9. Onde está a surpresa?
10. O rigor protege a verdade ou apenas aumenta o documento?

Se a seção apenas prova que o agente conhece matemática, removê-la.

Se a seção faz o leitor descobrir matemática, desenvolvê-la.
