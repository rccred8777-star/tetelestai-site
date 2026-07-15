// ============================================================================
// fundamentos.ts — Curso "Fundamentos da Fé" (Teologia Sistemática)
//
// Nível: introdutório-seminarístico. Cada módulo apresenta a doutrina, seus
// textos-base, o desenvolvimento histórico/credal, a POSIÇÃO DA IGREJA
// (linha evangélica pentecostal, conforme a declaração de fé do Ministério
// Tetelestai Missões) e, nos pontos em que evangélicos divergem, as demais
// posições citadas com respeito.
//
// Estrutura clássica dos loci: Revelação (Bibliologia), Teologia própria,
// Cristologia, Pneumatologia, Antropologia, Angelologia, Soteriologia,
// Eclesiologia, Escatologia — mais o apêndice dos Três Credos.
//
// Cada lição traz uma prova (quiz) de aprovação.
// ============================================================================

export const fundamentosLessons = [
  // =========================================================================
  {
    id: 'revelacao',
    title: 'Módulo 1 — Revelação (Bibliologia)',
    verse: '2 Timóteo 3:16',
    verseText:
      'Toda a Escritura é divinamente inspirada, e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça.',
    content: `# Módulo 1 — Revelação

A teologia começa por uma pergunta: **como podemos conhecer a Deus?** Se Deus é infinito e nós somos finitos e pecadores, jamais o alcançaríamos por esforço próprio. Só o conhecemos porque **Ele decidiu se dar a conhecer**. A isso chamamos *revelação*.

## 1. Revelação geral

Deus se revela a todos os homens, em todo tempo, por duas vias:

**A criação.** "Os céus manifestam a glória de Deus" (Salmo 19:1). A ordem, a beleza e a imensidão do universo apontam para um Criador. Paulo diz que os atributos invisíveis de Deus "se entendem, e claramente se veem pelas coisas que estão criadas" (Romanos 1:19-20) — de modo que ninguém tem desculpa.

**A consciência.** A lei moral escrita no coração (Romanos 2:14-15) testemunha que há um Legislador.

A revelação geral é suficiente para **condenar** (tira a desculpa), mas **não é suficiente para salvar**. Ela mostra que Deus existe e é poderoso, mas não anuncia o Evangelho. Para isso é preciso a revelação especial.

## 2. Revelação especial

"Havendo Deus antigamente falado muitas vezes... aos pais, pelos profetas, a nós falou-nos nestes últimos dias pelo Filho" (Hebreus 1:1-2). A revelação especial vem em atos (a libertação do Egito, a cruz, a ressurreição), em palavras (a Lei, os profetas) e, supremamente, na **pessoa de Cristo** — o Verbo (João 1:1,14). E essa revelação foi registrada e preservada nas **Escrituras**.

## 3. Inspiração

A palavra grega de 2 Timóteo 3:16 é *theopneustos* — "soprada por Deus". A Bíblia não é apenas um livro sobre Deus; ela **procede** de Deus. Pedro explica o mecanismo: "homens santos de Deus falaram inspirados pelo Espírito Santo" (2 Pedro 1:21).

A posição histórica da igreja evangélica é a **inspiração verbal e plenária**:

- **Verbal** — a inspiração alcança as próprias palavras, não só as ideias gerais.
- **Plenária** — alcança *toda* a Escritura, não apenas as partes "religiosas".

Sem anular a personalidade e o estilo dos autores humanos (Moisés não escreve como Paulo), o Espírito os conduziu de modo que o resultado é, ao mesmo tempo, plenamente humano e plenamente a Palavra de Deus.

**Teorias que a igreja rejeita:**
- *Ditado mecânico* — os autores como máquinas passivas. (Ignora o estilo humano evidente.)
- *Intuição/natural* — inspiração como mero talento religioso, igual ao de um poeta. (Rebaixa a Escritura.)
- *Inspiração por graus* — só algumas partes seriam inspiradas. (Contraria "toda a Escritura".)

## 4. Inerrância, autoridade e suficiência

Da inspiração decorrem três afirmações:

**Inerrância / infalibilidade** — sendo Palavra de um Deus que não mente (Tito 1:2), a Escritura não erra naquilo que afirma.

**Autoridade** — ela é a regra final de fé e prática. Toda tradição, experiência ou razão se submete a ela. É o princípio da Reforma: *Sola Scriptura*.

**Suficiência** — a Escritura contém tudo o que é necessário para a salvação e para a vida cristã (2 Timóteo 3:15-17). Não precisamos de nova revelação para sermos salvos.

## 5. O Cânon

Cânon (do grego *kanon*, "régua") é a lista dos livros reconhecidos como Escritura: **66 livros** — 39 no Antigo Testamento, 27 no Novo. A igreja não *criou* o cânon; ela *reconheceu* os livros que já traziam a marca da autoridade divina (profético/apostólico, coerência com a revelação, uso pela comunidade da aliança). Os livros **apócrifos** (aceitos por Roma) não foram recebidos como Escritura pela tradição judaica nem pela igreja evangélica.

## 6. Iluminação

Inspiração é a obra do Espírito ao **produzir** a Escritura, no passado, uma vez por todas. **Iluminação** é a obra presente do Espírito ao **abrir o entendimento** do leitor (1 Coríntios 2:14). Por isso a leitura da Bíblia é um ato espiritual, não apenas intelectual — lemos orando.

> **Resumo:** Deus se revela na criação (para condenar) e na Palavra e no Filho (para salvar). A Escritura é inspirada — verbal e plenária —, inerrante, autoritativa e suficiente. Os 66 livros são a nossa régua final.`,
    discussionQuestions: [
      'Se a revelação geral já mostra que Deus existe, por que ela não basta para salvar?',
      'O que muda na sua leitura da Bíblia ao crer que ela é "soprada por Deus", e não apenas escrita por homens religiosos?',
      'O que significa, na prática da sua vida, dizer que a Escritura tem autoridade final sobre tradição e experiência?',
    ],
    practicalActivity:
      'Leia o Salmo 19. Na primeira metade (v.1-6) Davi fala da revelação geral (os céus); na segunda (v.7-11), da revelação especial (a lei do Senhor). Liste o que cada uma comunica e por que precisamos das duas.',
    homework:
      'Escreva, em suas palavras, a diferença entre inspiração e iluminação, e por que as duas importam para quem lê a Bíblia.',
    memoryVerse:
      'Toda a Escritura é divinamente inspirada, e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça. (2 Timóteo 3:16)',
    quiz: [
      {
        question: 'A revelação geral (criação e consciência) é suficiente para quê?',
        options: [
          'Para salvar qualquer pessoa, mesmo sem ouvir o Evangelho',
          'Para condenar (tirar a desculpa), mas não para salvar',
          'Para nada — só a razão humana conta',
          'Para substituir a Escritura',
        ],
        correctIndex: 1,
      },
      {
        question: 'O que significa "inspiração verbal e plenária"?',
        options: [
          'Só as ideias gerais e só as partes religiosas são inspiradas',
          'A Bíblia foi ditada mecanicamente, sem autores humanos',
          'A inspiração alcança as próprias palavras e toda a Escritura',
          'Apenas os profetas foram inspirados',
        ],
        correctIndex: 2,
      },
      {
        question: 'Quantos livros compõem o cânon reconhecido pela igreja evangélica?',
        options: ['66 livros', '73 livros', '39 livros', '27 livros'],
        correctIndex: 0,
      },
      {
        question: 'Qual a diferença entre inspiração e iluminação?',
        options: [
          'São a mesma coisa',
          'Inspiração produziu a Escritura no passado; iluminação abre o entendimento do leitor hoje',
          'Iluminação produziu a Escritura; inspiração é a leitura',
          'Ambas acontecem só com pastores',
        ],
        correctIndex: 1,
      },
    ],
  },

  // =========================================================================
  {
    id: 'teologia',
    title: 'Módulo 2 — Teologia (Doutrina de Deus)',
    verse: 'Deuteronômio 6:4',
    verseText: 'Ouve, Israel, o Senhor nosso Deus é o único Senhor.',
    content: `# Módulo 2 — A Doutrina de Deus

Depois de saber *como* conhecemos a Deus (a Escritura), vem a pergunta central: **quem é Deus?** Este é o coração da teologia — em grego, *Theos* (Deus) + *logos* (estudo).

## 1. Existência e cognoscibilidade

A Bíblia nunca argumenta a existência de Deus; ela a **pressupõe**: "No princípio, Deus..." (Gênesis 1:1). Ainda assim, a razão oferece indícios (evidências, não provas absolutas):

- **Cosmológico** — tudo que começa tem uma causa; o universo começou; logo, há uma Causa Primeira.
- **Teleológico** — a ordem e o *design* do universo apontam para um Projetista.
- **Moral** — a existência de uma lei moral universal aponta para um Legislador.

Deus é **cognoscível**, mas não **compreensível** — podemos conhecê-lo verdadeiramente (porque Ele se revelou), mas nunca exaustivamente (porque é infinito). "Porque os meus pensamentos não são os vossos pensamentos" (Isaías 55:8-9).

## 2. Os atributos de Deus

Costuma-se dividir os atributos em duas categorias.

**Incomunicáveis** (que só Deus possui):
- **Aseidade / autoexistência** — Deus existe por si mesmo, não depende de nada. "EU SOU O QUE SOU" (Êxodo 3:14).
- **Imutabilidade** — Ele não muda em Seu ser, caráter e propósito (Malaquias 3:6; Tiago 1:17).
- **Eternidade** — sem começo nem fim, acima do tempo (Salmo 90:2).
- **Onipresença** — presente em toda parte (Salmo 139:7-10).
- **Onisciência** — sabe todas as coisas, inclusive o futuro (Salmo 147:5).
- **Onipotência** — todo-poderoso; pode fazer tudo o que é coerente com Sua natureza (Jeremias 32:17).

**Comunicáveis** (dos quais o homem reflete algo):
- **Santidade** — separação absoluta do pecado; o atributo que os serafins triplicam: "Santo, Santo, Santo" (Isaías 6:3).
- **Amor** — "Deus é amor" (1 João 4:8).
- **Justiça** — Ele julga com retidão (Salmo 89:14).
- **Misericórdia e graça** — bondade para com o miserável e o indigno.
- **Fidelidade e veracidade** — cumpre o que promete; não pode mentir.

Erro a evitar: **isolar um atributo**. Um deus só de amor vira permissivo; só de justiça, tirano. Na cruz, amor e justiça se encontram — Deus é justo *e* justificador (Romanos 3:26).

## 3. A Trindade

A doutrina mais distintiva do cristianismo. Formulada em três afirmações que a Escritura mantém juntas:

1. **Há um só Deus** (Deuteronômio 6:4; Isaías 45:5).
2. **O Pai é Deus, o Filho é Deus, o Espírito Santo é Deus** (João 1:1; Atos 5:3-4; Mateus 28:19).
3. **O Pai, o Filho e o Espírito são pessoas distintas** — o Filho ora ao Pai; o Espírito é enviado.

A síntese: **um Deus em essência (substância), três Pessoas**. Não três deuses (triteísmo), nem uma pessoa em três "modos".

**Distinção útil:** a *Trindade ontológica* (o que Deus é em si, eternamente) e a *Trindade econômica* (os papéis na obra da salvação — o Pai planeja, o Filho realiza, o Espírito aplica). As Pessoas são iguais em essência, distintas em função.

**Heresias que a igreja rejeitou:**
- **Modalismo / Sabelianismo** — nega as três Pessoas; seria um só Deus "vestindo três máscaras". (Destrói a distinção.)
- **Arianismo** — nega a divindade plena do Filho, fazendo dEle uma criatura. Foi condenado em Niceia (325), que afirmou o Filho *homoousios* (da mesma substância) com o Pai.
- **Triteísmo** — três deuses. (Destrói a unidade.)

A Trindade não é contradição (não dizemos "um Deus e três deuses", nem "uma Pessoa e três Pessoas"). É **mistério** — verdade que ultrapassa a razão sem contrariá-la.

> **Resumo:** Deus existe por si, é conhecível mas não esgotável, e reúne atributos que nunca devemos isolar. Ele é um só em essência e três Pessoas — Pai, Filho e Espírito Santo —, iguais em divindade e distintos em pessoa.`,
    discussionQuestions: [
      'Por que é perigoso enfatizar só o amor de Deus, ou só a Sua justiça? Onde os dois se encontram?',
      'Qual a diferença entre conhecer a Deus verdadeiramente e conhecê-lo exaustivamente? Que humildade isso traz?',
      'Como você explicaria a Trindade a alguém, evitando tanto o modalismo (três máscaras) quanto o triteísmo (três deuses)?',
    ],
    practicalActivity:
      'Leia Isaías 6:1-8. Identifique quais atributos de Deus aparecem na visão de Isaías e o efeito que a santidade de Deus produziu nele. Compare com Mateus 28:19 e aponte as três Pessoas.',
    homework:
      'Faça uma lista dos atributos incomunicáveis e comunicáveis com um versículo para cada. Escolha um atributo e escreva como ele consola ou corrige você hoje.',
    memoryVerse: 'Ouve, Israel, o Senhor nosso Deus é o único Senhor. (Deuteronômio 6:4)',
    quiz: [
      {
        question: 'Um atributo "incomunicável" de Deus é aquele que:',
        options: [
          'O ser humano também reflete em alguma medida',
          'Só Deus possui (ex.: autoexistência, onipresença, imutabilidade)',
          'Deus não tem mais hoje',
          'Muda conforme a situação',
        ],
        correctIndex: 1,
      },
      {
        question: 'As três afirmações que compõem a Trindade são:',
        options: [
          'Há três deuses, iguais e separados',
          'Há um só Deus que aparece em três modos diferentes',
          'Há um só Deus; Pai, Filho e Espírito são Deus; e são três Pessoas distintas',
          'Há um Deus e dois ajudantes criados',
        ],
        correctIndex: 2,
      },
      {
        question: 'A heresia do arianismo ensina que:',
        options: [
          'O Filho é uma criatura, não plenamente Deus',
          'Deus tem três máscaras',
          'Existem três deuses',
          'A Bíblia tem erros',
        ],
        correctIndex: 0,
      },
      {
        question: 'O Concílio de Niceia (325) afirmou que o Filho é:',
        options: [
          'Inferior ao Pai',
          'Da mesma substância (homoousios) que o Pai',
          'Apenas um bom mestre',
          'Uma das máscaras de Deus',
        ],
        correctIndex: 1,
      },
    ],
  },

  // =========================================================================
  {
    id: 'cristologia',
    title: 'Módulo 3 — Cristologia',
    verse: 'João 1:14',
    verseText:
      'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória, como a glória do unigênito do Pai, cheio de graça e de verdade.',
    content: `# Módulo 3 — A Pessoa e a Obra de Cristo

Cristologia é o estudo de **quem é Jesus** e **o que Ele fez**. Aqui o cristianismo se decide: retire ou distorça a pessoa de Cristo, e todo o edifício cai.

## 1. A divindade de Cristo

Jesus não é uma criatura elevada; Ele é **Deus**. A Escritura afirma:
- Sua **pré-existência** e divindade: "No princípio era o Verbo... e o Verbo era Deus" (João 1:1). "Antes que Abraão existisse, EU SOU" (João 8:58).
- Ele **criou** todas as coisas (Colossenses 1:16; João 1:3).
- Recebe **adoração** (João 20:28, "Senhor meu e Deus meu") e perdoa pecados (Marcos 2:5-7).

## 2. A humanidade de Cristo

E, sem deixar de ser Deus, Ele se fez **verdadeiramente homem**. Nasceu, teve fome, cansou, chorou, foi tentado "em tudo... à nossa semelhança, mas sem pecado" (Hebreus 4:15), e morreu. Negar a humanidade real de Jesus é tão grave quanto negar Sua divindade.

## 3. A união hipostática

Como uma só pessoa pode ser plenamente Deus e plenamente homem? A resposta da igreja veio no **Concílio de Calcedônia (451)**: em Cristo há **duas naturezas** (divina e humana) unidas em **uma só Pessoa**, "sem confusão, sem mudança, sem divisão, sem separação". As naturezas não se misturam formando uma terceira; nem se separam formando dois Cristos.

**Heresias cristológicas rejeitadas:**
- **Docetismo** — Jesus só *parecia* ter corpo. (Nega a humanidade.)
- **Arianismo** — o Filho é criatura. (Nega a divindade.)
- **Nestorianismo** — divide Cristo em duas pessoas.
- **Eutiquianismo / Monofisismo** — funde as naturezas em uma só, "misturada".
- **Apolinarismo** — Jesus teria corpo humano, mas mente divina (humanidade incompleta).

**A kenose (Filipenses 2:5-8).** Cristo "esvaziou-se a si mesmo". Não significa que abriu mão da divindade, mas que **velou o uso independente de Sua glória** e assumiu a condição de servo, sujeitando-se voluntariamente.

## 4. A obra de Cristo

**Encarnação** — Deus assumiu a carne (João 1:14).
**Vida sem pecado** — Ele cumpriu a lei em nosso lugar (a "obediência ativa").
**Morte expiatória** — o centro. A igreja evangélica confessa a **substituição penal** como o coração da cruz: "o Senhor fez cair sobre ele a iniquidade de nós todos" (Isaías 53:6); "Ele... levou em seu corpo os nossos pecados sobre o madeiro" (1 Pedro 2:24). Cristo tomou o nosso lugar e sofreu a ira que era nossa. *(Outros aspectos verdadeiros da cruz também são ensinados — vitória sobre o mal (Cristo Vencedor, Colossenses 2:15), exemplo de amor, resgate —, mas todos repousam sobre a substituição.)*
**Ressurreição** — real, corporal, histórica; a garantia da nossa justificação (Romanos 4:25) e da nossa própria ressurreição (1 Coríntios 15).
**Ascensão e intercessão** — Ele está à direita do Pai, intercedendo por nós (Hebreus 7:25).
**Retorno** — voltará em glória (tema da Escatologia).

## 5. Os três ofícios de Cristo

A tradição resume a obra de Cristo em três ofícios do Antigo Testamento, que Ele cumpre perfeitamente:
- **Profeta** — revela Deus e Sua vontade (Ele é a Palavra).
- **Sacerdote** — oferece o sacrifício (a si mesmo) e intercede.
- **Rei** — governa e reina sobre tudo.

> **Resumo:** Jesus é verdadeiro Deus e verdadeiro homem, duas naturezas em uma só Pessoa (Calcedônia). Sua obra — encarnação, vida santa, morte substitutiva, ressurreição, ascensão e retorno — cumpre os ofícios de profeta, sacerdote e rei.`,
    discussionQuestions: [
      'Por que negar a humanidade real de Jesus é tão perigoso quanto negar a Sua divindade?',
      'A substituição penal diz que Cristo tomou o nosso lugar e a nossa pena. Como isso deveria afetar a forma como você se sente diante de Deus?',
      'Dos três ofícios (profeta, sacerdote, rei), em qual você tem pensado menos — e o que muda ao lembrar dele?',
    ],
    practicalActivity:
      'Leia Isaías 53 inteiro, escrito cerca de 700 anos antes de Cristo. Sublinhe cada frase que descreve a substituição (Ele em nosso lugar). Depois leia Filipenses 2:5-11 e descreva o "caminho de descida e subida" de Cristo.',
    homework:
      'Explique, em um parágrafo, a fórmula de Calcedônia ("duas naturezas, uma pessoa, sem confusão, mudança, divisão ou separação") como você explicaria a um novo convertido.',
    memoryVerse:
      'E o Verbo se fez carne, e habitou entre nós, e vimos a sua glória... cheio de graça e de verdade. (João 1:14)',
    quiz: [
      {
        question: 'A fórmula de Calcedônia (451) afirma que em Cristo há:',
        options: [
          'Uma natureza mista, metade Deus metade homem',
          'Duas pessoas distintas',
          'Duas naturezas (divina e humana) em uma só Pessoa, sem confusão nem separação',
          'Apenas natureza divina, com aparência de homem',
        ],
        correctIndex: 2,
      },
      {
        question: 'O docetismo é a heresia que:',
        options: [
          'Diz que Jesus só parecia ter corpo (nega a humanidade)',
          'Diz que Jesus é criatura',
          'Funde as duas naturezas em uma',
          'Divide Cristo em duas pessoas',
        ],
        correctIndex: 0,
      },
      {
        question: 'Segundo a igreja evangélica, o coração da obra da cruz é:',
        options: [
          'Apenas um exemplo de amor a ser imitado',
          'A substituição penal — Cristo tomou o nosso lugar e a nossa pena',
          'Um resgate pago ao diabo, e nada mais',
          'Um mito religioso',
        ],
        correctIndex: 1,
      },
      {
        question: 'Os três ofícios que Cristo cumpre são:',
        options: [
          'Juiz, advogado e testemunha',
          'Pai, Filho e Espírito',
          'Profeta, sacerdote e rei',
          'Pastor, mestre e evangelista',
        ],
        correctIndex: 2,
      },
    ],
  },

  // =========================================================================
  {
    id: 'pneumatologia',
    title: 'Módulo 4 — Pneumatologia (O Espírito Santo)',
    verse: 'Atos 1:8',
    verseText:
      'Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas.',
    content: `# Módulo 4 — O Espírito Santo

O nome vem do grego *pneuma* (espírito, sopro). Aqui tratamos da terceira Pessoa da Trindade — muitas vezes a menos compreendida.

## 1. Ele é uma Pessoa, não uma força

O Espírito Santo não é uma energia impessoal ("algo"), mas uma **Pessoa** ("Alguém"). Ele possui intelecto, sentimento e vontade: Ele ensina (João 14:26), pode ser **entristecido** (Efésios 4:30), intercede (Romanos 8:26), decide e distribui dons "como quer" (1 Coríntios 12:11). Uma força não se entristece.

## 2. Ele é Deus

O Espírito é plenamente divino. Mentir ao Espírito Santo é mentir **a Deus** (Atos 5:3-4). Ele é eterno (Hebreus 9:14), onipresente (Salmo 139:7) e participa da fórmula batismal ao lado do Pai e do Filho (Mateus 28:19). *(Nota histórica: a controvérsia do "filioque" — se o Espírito procede do Pai "e do Filho" — separou Oriente e Ocidente em 1054. Não é ponto que divida evangélicos.)*

## 3. A obra do Espírito na salvação

Todo crente, no momento em que crê, recebe o Espírito. Sua obra inclui:
- **Convencer** do pecado, da justiça e do juízo (João 16:8).
- **Regenerar** — o novo nascimento "do Espírito" (João 3:5-6; Tito 3:5).
- **Habitar** — o corpo do crente é templo do Espírito (1 Coríntios 6:19).
- **Selar** — garantia da nossa herança (Efésios 1:13-14).
- **Batizar no corpo** — "por um só Espírito fomos todos batizados em um corpo" (1 Coríntios 12:13). Este batismo, que insere o crente na Igreja, ocorre na conversão.

Ponto pastoral importante: **quem tem Cristo tem o Espírito** — "se alguém não tem o Espírito de Cristo, esse tal não é dele" (Romanos 8:9). Ninguém é cristão de segunda classe.

## 4. O batismo no Espírito Santo (a posição da igreja)

O Ministério Tetelestai, na tradição pentecostal, ensina o **batismo no Espírito Santo** como um **revestimento de poder para o serviço**, distinto da regeneração — João Batista já anunciava: "ele vos batizará com o Espírito Santo" (Mateus 3:11), e em Atos 1:8 o propósito é **poder para testemunhar**. Na leitura pentecostal (doutrina da subsequência), é uma experiência que pode ser posterior à conversão, ilustrada em Atos 2, 8, 10 e 19.

*Com respeito, registramos que evangélicos divergem aqui:* muitos da tradição reformada entendem o "batismo no Espírito" como o mesmo ato de 1 Coríntios 12:13, ocorrido na conversão, e não como segunda experiência; e os **cessacionistas** creem que certos dons cessaram com a era apostólica. Nossa igreja é **continuísta** (os dons permanecem), mas ensina isso com três cuidados: (1) a experiência **não** mede o valor ou a salvação de ninguém; (2) ela **não se fabrica** nem se encena; (3) busca-se **a Deus**, não o fenômeno.

## 5. Dons e fruto

O Espírito distribui **dons** para edificar a Igreja (listas em 1 Coríntios 12, Romanos 12 e Efésios 4) — de serviço, ensino, e também os chamados dons de manifestação. E o Espírito produz **fruto**: "amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, domínio próprio" (Gálatas 5:22-23).

A prioridade bíblica é clara: **dom sem amor é barulho** (1 Coríntios 13:1-2). O fruto — o caráter de Cristo — é o teste mais confiável de uma vida cheia do Espírito.

> **Resumo:** O Espírito Santo é Pessoa divina. Todo crente O recebe na conversão (regeneração, habitação, selo, batismo no corpo). Nossa igreja ensina, além disso, o batismo no Espírito como revestimento de poder, com cuidado pastoral, e valoriza tanto os dons quanto — acima deles — o fruto.`,
    discussionQuestions: [
      'Por que é importante afirmar que o Espírito Santo é uma Pessoa, e não uma força? O que muda no seu relacionamento com Ele?',
      'Romanos 8:9 diz que todo crente tem o Espírito. Como isso protege alguém de se sentir "cristão de segunda classe"?',
      'Por que o fruto do Espírito é um teste mais confiável do que os dons? Qual aspecto do fruto está mais fraco em você?',
    ],
    practicalActivity:
      'Leia João 16:7-15 e liste tudo o que Jesus diz que o Espírito faria. Depois leia Gálatas 5:22-23 e faça uma autoavaliação honesta dos nove aspectos do fruto.',
    homework:
      'Descreva, com base em 1 Coríntios 12:13 e Atos 1:8, a diferença entre "ter o Espírito" (habitação, na conversão) e "ser cheio/revestido" do Espírito para o serviço.',
    memoryVerse:
      'Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas. (Atos 1:8)',
    quiz: [
      {
        question: 'O que mostra que o Espírito Santo é uma Pessoa, e não uma força?',
        options: [
          'Ele não faz nada',
          'Ele ensina, pode ser entristecido, intercede e decide — coisas de pessoa',
          'Ele é apenas um símbolo',
          'Ele é uma energia da natureza',
        ],
        correctIndex: 1,
      },
      {
        question: 'Segundo Romanos 8:9, quem tem o Espírito de Cristo?',
        options: [
          'Apenas os pastores',
          'Apenas quem já teve uma experiência marcante',
          'Todo aquele que é de Cristo (todo crente)',
          'Ninguém hoje em dia',
        ],
        correctIndex: 2,
      },
      {
        question: 'Como a nossa igreja (pentecostal) entende o batismo no Espírito Santo?',
        options: [
          'Como um revestimento de poder para o serviço, ensinado com cuidado pastoral',
          'Como algo que salva a pessoa',
          'Como uma força impessoal',
          'Como um dom que já cessou',
        ],
        correctIndex: 0,
      },
      {
        question: 'Segundo 1 Coríntios 13, o que vale mais que os dons?',
        options: [
          'O dom de línguas acima de tudo',
          'A quantidade de dons',
          'O amor / o fruto do Espírito (o caráter de Cristo)',
          'A eloquência',
        ],
        correctIndex: 2,
      },
    ],
  },

  // =========================================================================
  {
    id: 'antropologia',
    title: 'Módulo 5 — Antropologia (Doutrina do Homem)',
    verse: 'Gênesis 1:27',
    verseText:
      'E criou Deus o homem à sua imagem; à imagem de Deus o criou; macho e fêmea os criou.',
    content: `# Módulo 5 — A Doutrina do Homem

Antropologia bíblica (*anthropos*, homem) responde: **o que é o ser humano, e o que aconteceu com ele?** Sem entender o homem e o pecado, o Evangelho perde o sentido — quem não sabe que está doente não busca médico.

## 1. Criado à imagem de Deus

O homem é o ápice da criação, feito "à imagem e semelhança de Deus" (Gênesis 1:26-27). Sobre o que é essa imagem, há três ênfases (complementares, não excludentes):
- **Substantiva** — a imagem está em capacidades: razão, moralidade, espiritualidade.
- **Funcional** — a imagem é o papel de **representar** Deus e administrar a criação (o mandato de Gênesis 1:28).
- **Relacional** — a imagem se manifesta na capacidade de relacionamento (com Deus e com o próximo).

Consequências práticas da imago Dei: **todo ser humano tem valor e dignidade** — o que fundamenta a santidade da vida, a igualdade e o combate a todo desprezo pelo próximo (Tiago 3:9).

## 2. A constituição do homem

O homem é material e imaterial. Há duas visões evangélicas:
- **Dicotomia** — o homem é corpo e alma/espírito (usados como sinônimos da parte imaterial).
- **Tricotomia** — corpo, alma e espírito como três partes distintas (1 Tessalonicenses 5:23).

A maioria da teologia histórica é dicotomista; a tricotomia é comum em meios pentecostais. Em ambos, a verdade central é a mesma: **o homem não é só corpo** — há uma dimensão espiritual que sobrevive à morte.

*(Sobre a origem da alma, discute-se o criacionismo — Deus cria cada alma — e o traducianismo — a alma é transmitida pelos pais. É questão secundária.)*

## 3. A Queda

Deus criou o homem **bom** e livre, e o pôs à prova (Gênesis 2:16-17). Em Gênesis 3, tentado, o homem **desobedeceu** — quis ser "como Deus", determinando por si o bem e o mal. Isso é o pecado em sua raiz: **autonomia** contra Deus.

## 4. A natureza e as consequências do pecado

Pecado (grego *hamartia*, "errar o alvo") é falta de conformidade com a lei de Deus, em ato, palavra, pensamento e natureza. Suas consequências:
- **Morte** — espiritual (separação de Deus), física e eterna (Romanos 6:23).
- **Culpa e corrupção** — o homem fica culpado diante de Deus e corrompido em toda a sua natureza.

**Pecado original.** O pecado de Adão afeta toda a humanidade: "por um homem entrou o pecado no mundo, e... a morte passou a todos os homens" (Romanos 5:12). Herdamos dele uma natureza caída.

## 5. A extensão da corrupção (onde evangélicos divergem)

Todos concordam que o pecado corrompe **todo o homem** (mente, vontade, afetos) — a chamada *depravação total* (total em **extensão**, não significando que somos tão maus quanto poderíamos ser).

A divergência é sobre a **vontade**:
- **Posição arminiana / wesleyana** (a linha da nossa igreja) — o pecado incapacita o homem, mas Deus concede a **graça preveniente**, que vem antes e capacita todo pecador a responder ao Evangelho. A salvação é toda de graça; a fé é a resposta possibilitada por Deus e não forçada.
- **Posição reformada / calvinista** (citada com respeito) — a incapacidade é total: só a graça eficaz e a regeneração precedem e produzem a fé; a resposta decorre da eleição incondicional.

Ambas afirmam: **ninguém se salva por mérito próprio**; a diferença está em *como* a graça opera na vontade. (Retomamos isso na Soteriologia.)

> **Resumo:** O homem foi criado à imagem de Deus, com dignidade e um chamado a representá-Lo. Pela Queda, tornou-se pecador — culpado e corrompido em toda a sua natureza, sujeito à morte. Herdamos o pecado de Adão. A igreja ensina a depravação total com graça preveniente (linha arminiana), citando a visão reformada com respeito.`,
    discussionQuestions: [
      'Se todo ser humano é imagem de Deus, que implicações isso tem para como tratamos os outros — inclusive quem discordamos ou desprezamos?',
      'Por que entender a gravidade do pecado é pré-requisito para valorizar a graça?',
      'Qual a diferença prática entre "depravação total em extensão" e a ideia de que "somos tão maus quanto poderíamos ser"?',
    ],
    practicalActivity:
      'Leia Gênesis 3:1-13. Identifique os passos da tentação e da queda (o que a serpente questiona, o que Eva vê, o que fazem depois de pecar). Depois leia Romanos 5:12-21 e liste os contrastes entre Adão e Cristo.',
    homework:
      'Escreva, em suas palavras, o que é a imagem de Deus no homem e o que a Queda estragou — mas não apagou — dessa imagem.',
    memoryVerse:
      'E criou Deus o homem à sua imagem; à imagem de Deus o criou. (Gênesis 1:27)',
    quiz: [
      {
        question: 'A "imagem de Deus" no homem fundamenta:',
        options: [
          'A ideia de que os humanos são deuses',
          'O valor e a dignidade de todo ser humano',
          'A superioridade de uns povos sobre outros',
          'Que o corpo não importa',
        ],
        correctIndex: 1,
      },
      {
        question: 'A raiz do pecado em Gênesis 3 é:',
        options: [
          'Comer uma fruta apenas',
          'A autonomia contra Deus — querer ser "como Deus", decidindo o bem e o mal',
          'A falta de inteligência',
          'Um acidente sem culpa',
        ],
        correctIndex: 1,
      },
      {
        question: '"Depravação total" significa que:',
        options: [
          'Somos tão maus quanto poderíamos ser',
          'O pecado atinge todo o homem — mente, vontade e afetos (total em extensão)',
          'Só o corpo é pecador',
          'Ninguém peca de verdade',
        ],
        correctIndex: 1,
      },
      {
        question: 'A posição da nossa igreja (arminiana) sobre a vontade do pecador é que:',
        options: [
          'O homem se salva por mérito próprio',
          'A graça preveniente capacita todo pecador a responder ao Evangelho',
          'Ninguém pode ser salvo',
          'A fé é forçada por Deus',
        ],
        correctIndex: 1,
      },
    ],
  },

  // =========================================================================
  {
    id: 'angelologia',
    title: 'Módulo 6 — Angelologia',
    verse: 'Hebreus 1:14',
    verseText:
      'Não são porventura todos eles espíritos ministradores, enviados para servir a favor daqueles que hão de herdar a salvação?',
    content: `# Módulo 6 — Anjos, Satanás e Demônios

Angelologia (*angelos*, mensageiro) trata dos seres espirituais criados. O tema exige **equilíbrio**: nem ignorar (a Bíblia fala muito de anjos), nem sensacionalizar (fazer do diabo o centro, como se fosse o rival igual de Deus).

## 1. Os anjos

Os anjos são **seres criados** por Deus (Colossenses 1:16; Salmo 148:2,5), **espíritos** sem corpo físico (embora possam se manifestar), **pessoais** (têm inteligência e vontade), **poderosos**, porém **finitos** — não são onipresentes, oniscientes nem onipotentes. Não devem ser adorados (Apocalipse 22:8-9).

**Funções dos anjos fiéis:**
- Adorar a Deus continuamente (Isaías 6; Apocalipse 4).
- Levar mensagens (Gabriel a Maria, Lucas 1).
- Ministrar e proteger os herdeiros da salvação (Hebreus 1:14; Salmo 91:11).
- Executar juízos de Deus.

A Escritura menciona ordens/tipos: **querubins** (guardiões da santidade), **serafins** (adoradores ardentes), o **arcanjo** Miguel (Judas 9) e o mensageiro Gabriel.

## 2. A origem do mal: a queda de Satanás

Satanás (o "adversário"; também "Diabo", o "acusador") foi criado bom e, por **orgulho**, rebelou-se contra Deus (passagens como Isaías 14 e Ezequiel 28 são lidas, em parte, como retrato dessa queda). Ele **não é o oposto igual de Deus** — é criatura caída, limitada, já derrotada. Jesus o descreve como "mentiroso e pai da mentira" e homicida (João 8:44).

Os **demônios** são anjos caídos que seguiram Satanás (Apocalipse 12). São reais, mas limitados: não são onipresentes nem onipotentes.

## 3. A batalha espiritual — com sobriedade

O crente está em guerra real (Efésios 6:12), mas trava-a com as armas certas: a **armadura de Deus** (verdade, justiça, evangelho, fé, salvação, a Palavra) e a **oração** (Efésios 6:10-18). Pedro manda "resistir firmes na fé" (1 Pedro 5:8-9), e Tiago: "resisti ao diabo, e ele fugirá de vós" (Tiago 4:7).

Dois erros a evitar (C. S. Lewis os descreveu bem): **ignorar** a existência do maligno, ou ter por ele um **interesse doentio**. A igreja saudável não vê demônio em tudo, nem finge que não existe.

## 4. A vitória de Cristo

Aqui está a âncora: **o inimigo já foi vencido**. Na cruz, Cristo "despojou os principados e potestades... triunfando deles" (Colossenses 2:15). "Maior é o que está em vós do que o que está no mundo" (1 João 4:4). O crente não luta *por* vitória, mas *a partir* da vitória de Cristo.

> **Resumo:** Anjos são criaturas espirituais, poderosas e finitas, que servem a Deus e ministram aos salvos. Satanás e os demônios são anjos caídos — reais, mas limitados e já derrotados na cruz. A batalha espiritual é travada com a armadura de Deus e a oração, sem ignorância e sem sensacionalismo.`,
    discussionQuestions: [
      'Quais os dois extremos a evitar ao falar do diabo? Qual deles você já viu mais na prática?',
      'Se Satanás já foi derrotado na cruz, como isso muda a forma como o crente encara a luta espiritual?',
      'O que significa, no dia a dia, "vestir a armadura de Deus" de Efésios 6?',
    ],
    practicalActivity:
      'Leia Efésios 6:10-18. Faça uma tabela com cada peça da armadura e o que ela representa na vida prática. Depois leia Colossenses 2:13-15 e escreva o que a cruz fez com os poderes das trevas.',
    homework:
      'Explique por que Satanás não é "o oposto igual de Deus", usando ao menos dois argumentos bíblicos (ex.: ele é criatura; é limitado; já foi derrotado).',
    memoryVerse:
      'Maior é o que está em vós do que o que está no mundo. (1 João 4:4)',
    quiz: [
      {
        question: 'Sobre os anjos, é correto afirmar que eles são:',
        options: [
          'Deuses menores que devemos adorar',
          'Seres criados, poderosos, mas finitos — não onipresentes nem onipotentes',
          'Almas de pessoas que morreram',
          'Uma força impessoal',
        ],
        correctIndex: 1,
      },
      {
        question: 'Qual afirmação sobre Satanás está correta?',
        options: [
          'Ele é o oposto igual de Deus, com o mesmo poder',
          'Ele é uma criatura caída, limitada e já derrotada na cruz',
          'Ele não existe de verdade',
          'Ele é onisciente e onipresente',
        ],
        correctIndex: 1,
      },
      {
        question: 'Os dois extremos a evitar na batalha espiritual são:',
        options: [
          'Orar demais ou de menos',
          'Ignorar o maligno OU ter por ele um interesse doentio (ver demônio em tudo)',
          'Ler a Bíblia ou não ler',
          'Ir à igreja de manhã ou à noite',
        ],
        correctIndex: 1,
      },
      {
        question: 'Segundo Colossenses 2:15, na cruz Cristo:',
        options: [
          'Foi derrotado pelos poderes das trevas',
          'Despojou e triunfou sobre os principados e potestades',
          'Fez um acordo com o diabo',
          'Nada mudou no mundo espiritual',
        ],
        correctIndex: 1,
      },
    ],
  },

  // =========================================================================
  {
    id: 'soteriologia',
    title: 'Módulo 7 — Soteriologia (A Salvação)',
    verse: 'Efésios 2:8-9',
    verseText:
      'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.',
    content: `# Módulo 7 — A Salvação

Soteriologia (*soteria*, salvação) é o coração pastoral da teologia: **como o pecador é reconciliado com Deus?** A resposta une tudo o que vimos — o Deus santo, o homem caído, a obra de Cristo, a aplicação pelo Espírito.

## 1. A base: a graça

A salvação é **pela graça** — favor imerecido — **por meio da fé**, e **não das obras** (Efésios 2:8-9). Nenhum passo da salvação é mérito humano; do princípio ao fim é dom de Deus. As boas obras são o **fruto** da salvação, nunca a sua causa (Efésios 2:10).

## 2. A eleição (onde evangélicos divergem)

Antes da fundação do mundo, Deus escolheu um povo para si (Efésios 1:4). *Como* essa eleição se relaciona com a resposta humana é o ponto que separa as duas grandes tradições evangélicas:

**Posição arminiana / wesleyana — a linha da nossa igreja.** A eleição é **condicional**: Deus, em Sua presciência, elege os que Ele sabe que, pela graça preveniente, responderão à fé. A graça é **resistível** — pode ser recusada. Cristo morreu por **todos** (expiação ilimitada, 1 Timóteo 2:4-6; 1 João 2:2), e o convite é sincero a todos.

**Posição reformada / calvinista — citada com respeito.** Resumida no acróstico **TULIP**: depravação **T**otal, eleição **I**ncondicional (*U*nconditional), expiação **L**imitada, graça **I**rresistível (*I*rresistible), perseverança dos santos (*P*erseverance). A eleição não depende de nada previsto no homem, mas só da vontade soberana de Deus.

Ambas confessam: a salvação é **totalmente pela graça**; ninguém se gloria. A diferença está em como a graça e a vontade humana se articulam. É um debate **entre irmãos**, não entre salvos e perdidos.

## 3. A ordem da salvação (ordo salutis)

Um modo de organizar o que Deus faz no pecador (não necessariamente uma sequência cronológica rígida):

- **Chamado** — Deus convida pelo Evangelho (2 Tessalonicenses 2:14).
- **Arrependimento** (*metanoia*) — mudança de mente e direção quanto ao pecado.
- **Fé** — confiança que se lança sobre Cristo.
- **Regeneração** — o novo nascimento; Deus dá vida nova (João 3; Tito 3:5).
- **Justificação** — ato judicial em que Deus **declara justo** o pecador, perdoando sua culpa e **imputando** a justiça de Cristo (Romanos 3:24-28; 5:1). Não é "tornar-se bom aos poucos"; é uma **declaração** definitiva, recebida só pela fé (*sola fide*).
- **Adoção** — somos feitos filhos de Deus, com todos os direitos (Romanos 8:15-17).
- **Santificação** — o processo de sermos transformados à imagem de Cristo. Tem um aspecto **posicional** (fomos separados, "santos" em Cristo) e **progressivo** (crescemos em santidade dia a dia). É obra do Espírito em cooperação com o crente (Filipenses 2:12-13).
- **Glorificação** — a consumação: seremos plenamente conformados a Cristo, com corpos ressurretos (Romanos 8:30).

## 4. A segurança da salvação (um segundo ponto em debate)

- A tradição **reformada** e boa parte dos batistas defendem a **segurança eterna** / preservação dos santos: quem é verdadeiramente salvo será guardado por Deus (João 10:28-29; Filipenses 1:6).
- A tradição **arminiana/pentecostal** tende a ensinar uma segurança **condicionada** à permanência na fé, alertando contra a apostasia (Hebreus 6; João 15:6).

Em qualquer das leituras, a Escritura une **confiança** (Deus guarda os seus) e **perseverança** (permanecei nEle). A vida cristã não é ansiedade, mas também não é descuido.

> **Resumo:** A salvação é toda pela graça, por meio da fé, sem mérito humano. Deus chama, concede arrependimento e fé, regenera, justifica (declara justo, imputando a justiça de Cristo), adota, santifica e glorifica. Sobre eleição e segurança, a igreja ensina a linha arminiana, reconhecendo a reformada como posição irmã.`,
    discussionQuestions: [
      'Justificação é "ser declarado justo", não "ficar bom aos poucos". Por que essa diferença é uma boa notícia para quem luta com o pecado?',
      'Se a salvação é totalmente pela graça, que lugar sobra para as boas obras na vida cristã?',
      'Como manter juntas a confiança ("Deus me guarda") e a perseverança ("permanecei em mim") sem cair nem na ansiedade nem no descuido?',
    ],
    practicalActivity:
      'Leia Romanos 5:1-11. Liste os benefícios da justificação pela fé que Paulo enumera (paz com Deus, acesso, esperança...). Depois localize no texto a base de tudo isso (v.8: "Cristo morreu por nós").',
    homework:
      'Explique, para um novo convertido, a diferença entre justificação (declaração, de uma vez) e santificação (processo, dia a dia), e por que confundi-las gera desânimo.',
    memoryVerse:
      'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. (Efésios 2:8)',
    quiz: [
      {
        question: 'A salvação, segundo Efésios 2:8-9, é:',
        options: [
          'Pela graça, por meio da fé, e não das obras',
          'Pelo esforço e mérito de cada um',
          'Só para quem nunca peca',
          'Comprada com dinheiro ou penitência',
        ],
        correctIndex: 0,
      },
      {
        question: 'Justificação significa que Deus:',
        options: [
          'Torna a pessoa perfeita aos poucos',
          'Declara o pecador justo, perdoando a culpa e imputando a justiça de Cristo',
          'Ignora o pecado sem base',
          'Salva pelas boas obras',
        ],
        correctIndex: 1,
      },
      {
        question: 'A posição da nossa igreja (arminiana) sobre a eleição é que ela é:',
        options: [
          'Incondicional, sem relação com a resposta humana',
          'Condicional, ligada à graça preveniente e à fé, sendo a graça resistível',
          'Baseada no mérito das obras',
          'Impossível de acontecer',
        ],
        correctIndex: 1,
      },
      {
        question: 'Santificação, na sua dimensão progressiva, é:',
        options: [
          'Uma declaração feita de uma vez',
          'O processo de ser transformado à imagem de Cristo, dia a dia',
          'Algo que só acontece após a morte',
          'Obra exclusiva do esforço humano, sem o Espírito',
        ],
        correctIndex: 1,
      },
    ],
  },

  // =========================================================================
  {
    id: 'eclesiologia',
    title: 'Módulo 8 — Eclesiologia (A Igreja)',
    verse: 'Mateus 16:18',
    verseText: 'E sobre esta pedra edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela.',
    content: `# Módulo 8 — A Igreja

Eclesiologia vem de *ekklesia* — "os chamados para fora", a assembleia. A Igreja não é um prédio nem uma empresa religiosa; é o **povo de Deus**, o corpo de Cristo.

## 1. O que é a Igreja

Distinguem-se dois sentidos:
- **Igreja universal** — todos os salvos de todos os tempos e lugares, a comunhão dos santos.
- **Igreja local** — a comunidade concreta que se reúne num lugar (a igreja em Corinto, em Éfeso... e a sua igreja).

A Escritura a descreve por imagens ricas: **corpo de Cristo** (1 Coríntios 12), **noiva** de Cristo (Efésios 5), **templo** do Espírito (Efésios 2:21-22), **rebanho** de Deus (1 Pedro 5:2), **família** (Efésios 2:19).

## 2. As marcas da Igreja

O credo antigo confessa a Igreja "una, santa, católica (universal) e apostólica". A Reforma destacou marcas verificáveis de uma igreja verdadeira: a **pregação fiel da Palavra**, a **administração correta das ordenanças** e a **disciplina** que zela pela santidade e pelo amor.

## 3. As ordenanças (ou sacramentos)

Cristo instituiu dois sinais visíveis para a Igreja:

**O Batismo.** Sinal público de entrada na fé. Nossa igreja pratica o **batismo de crentes por imersão** — de quem creu e se arrependeu (retomado em detalhe no *Curso de Batismo*). Ele representa a morte e ressurreição com Cristo (Romanos 6:4). *(Outras tradições batizam crianças por aspersão, ligando o batismo à aliança — posição irmã, tratada no curso específico.)*

**A Ceia do Senhor.** Sinal contínuo, memória da morte de Cristo até que Ele venha (1 Coríntios 11:23-26). Sobre *o que* acontece na ceia, há posições distintas:
- **Memorial** (Zwínglio; comum entre evangélicos e pentecostais) — a ceia é lembrança e proclamação.
- **Presença espiritual** (Calvino) — Cristo está espiritualmente presente, e o crente dele se alimenta pela fé.
- *(Roma: transubstanciação; luteranos: consubstanciação — posições que a tradição evangélica não segue.)*

## 4. O governo e os ministérios

Há três grandes modelos de governo eclesiástico:
- **Episcopal** — autoridade em bispos (metodistas, anglicanos).
- **Presbiteriano** — governo por presbíteros/conselhos.
- **Congregacional** — a autoridade sob Cristo reside na assembleia local (batistas, muitas igrejas pentecostais).

Cristo dá dons de liderança para "aperfeiçoar os santos" — apóstolos, profetas, evangelistas, pastores e mestres (Efésios 4:11-12). O objetivo não é criar dependência dos líderes, mas **equipar cada membro para o serviço**. O Novo Testamento fala de **presbíteros/bispos** (supervisão e ensino) e **diáconos** (serviço).

## 5. A missão da Igreja

A Igreja existe para (1) **adorar** a Deus, (2) **edificar** os santos, (3) **evangelizar** o mundo (a Grande Comissão, Mateus 28:19-20) e (4) **servir** ao próximo. E não foi feita para o isolamento: "não deixando a nossa congregação, como é costume de alguns" (Hebreus 10:25). É por isso que a vida em **células e comunhão** não é opcional — brasa fora da fogueira apaga.

> **Resumo:** A Igreja é o povo de Deus — universal e local —, corpo e noiva de Cristo. Marca-se pela Palavra fiel, pelas ordenanças (batismo e ceia) e pela disciplina. Governa-se por líderes que equipam os membros, e existe para adorar, edificar, evangelizar e servir.`,
    discussionQuestions: [
      'Qual a diferença entre "ir à igreja" e "ser a Igreja"? Como isso muda a sua participação?',
      'Efésios 4 diz que os líderes existem para equipar os membros, não para fazer tudo sozinhos. Onde você poderia servir com seu dom?',
      'Por que a fé cristã não foi feita para o isolamento? O que você perde ao ficar longe da comunhão e da célula?',
    ],
    practicalActivity:
      'Leia 1 Coríntios 12:12-27 (a imagem do corpo). Identifique o que Paulo ensina sobre a interdependência dos membros e escreva qual "parte do corpo" você tem sido — e qual gostaria de ser.',
    homework:
      'Descreva o significado das duas ordenanças (batismo e ceia) e a diferença entre a Igreja universal e a Igreja local.',
    memoryVerse:
      'E sobre esta pedra edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela. (Mateus 16:18)',
    quiz: [
      {
        question: 'A palavra "igreja" (ekklesia) significa originalmente:',
        options: [
          'Um prédio sagrado',
          'Os chamados para fora / a assembleia (o povo de Deus)',
          'Uma denominação específica',
          'Uma reunião de líderes',
        ],
        correctIndex: 1,
      },
      {
        question: 'As duas ordenanças instituídas por Cristo para a Igreja são:',
        options: [
          'O dízimo e a oração',
          'O batismo e a Ceia do Senhor',
          'O culto e a escola dominical',
          'A confissão e a penitência',
        ],
        correctIndex: 1,
      },
      {
        question: 'A visão mais comum entre evangélicos e pentecostais sobre a Ceia é a:',
        options: [
          'Transubstanciação',
          'Consubstanciação',
          'Memorial (lembrança e proclamação da morte de Cristo)',
          'Que a ceia salva',
        ],
        correctIndex: 2,
      },
      {
        question: 'Segundo Efésios 4:11-12, os líderes são dados para:',
        options: [
          'Fazer todo o trabalho sozinhos',
          'Aperfeiçoar/equipar os santos para a obra do ministério',
          'Serem servidos pela igreja',
          'Substituir Cristo como cabeça',
        ],
        correctIndex: 1,
      },
    ],
  },

  // =========================================================================
  {
    id: 'escatologia',
    title: 'Módulo 9 — Escatologia',
    verse: 'Atos 1:11',
    verseText:
      'Este Jesus... assim virá como para o céu o vistes ir.',
    content: `# Módulo 9 — As Últimas Coisas

Escatologia (*eschatos*, últimas coisas) trata do futuro segundo a promessa de Deus. É onde os evangélicos mais divergem nos **detalhes** — mas concordam no **essencial**: Cristo voltará, os mortos ressuscitarão, haverá juízo, e Deus fará novas todas as coisas.

## 1. Escatologia pessoal (o indivíduo)

- **A morte** — separação da alma e do corpo; para o crente, "partir e estar com Cristo" (Filipenses 1:23).
- **O estado intermediário** — entre a morte e a ressurreição, os salvos estão conscientes na presença do Senhor (2 Coríntios 5:8; Lucas 23:43), e os perdidos, separados dEle. Não é o estado final — este virá com a ressurreição do corpo.

## 2. Escatologia geral (a história)

**A segunda vinda de Cristo** será **pessoal, visível e gloriosa** (Atos 1:11; Apocalipse 1:7) — não secreta nem simbólica. É a "bendita esperança" (Tito 2:13). Sobre *como* os eventos se ordenam, há três grandes posições quanto ao **milênio** (os mil anos de Apocalipse 20):

- **Pré-milenismo** — Cristo volta **antes** do milênio e estabelece Seu reino visível na terra por mil anos. *É a posição da nossa igreja e a mais comum no meio pentecostal.*
- **A-milenismo** — os "mil anos" são simbólicos do reino presente de Cristo entre a primeira e a segunda vinda; não haverá um milênio terreno literal.
- **Pós-milenismo** — o Evangelho triunfará no mundo, inaugurando uma era de bênção, ao fim da qual Cristo volta.

Dentro do pré-milenismo, discute-se ainda o **arrebatamento** da Igreja (1 Tessalonicenses 4:16-17) em relação à Grande Tribulação: **pré-tribulacionista** (antes), **meso** (no meio) ou **pós** (ao fim). *São diferenças entre irmãos — não motivo de divisão.*

## 3. Os eventos finais

- **A ressurreição** — todos ressuscitarão corporalmente: os justos para a vida, os injustos para o juízo (João 5:28-29; 1 Coríntios 15).
- **O juízo** — a Escritura fala do **tribunal de Cristo**, onde a obra do crente é avaliada e recompensada (2 Coríntios 5:10), e do **grande trono branco**, o juízo final dos que rejeitaram a Cristo (Apocalipse 20:11-15).
- **O estado eterno** — o inferno, separação eterna e consciente de Deus (Mateus 25:46; Apocalipse 20), e o céu — melhor, os **novos céus e nova terra**, onde Deus habita com o Seu povo e "enxugará toda lágrima" (Apocalipse 21:1-4). O destino final do salvo não é uma existência fantasmagórica nas nuvens, mas uma **criação renovada**, corpórea e gloriosa.

## 4. O propósito da escatologia

A profecia bíblica não foi dada para alimentar curiosidade ou medo, mas para produzir **santidade e esperança**: "todo aquele que nele tem esta esperança purifica-se a si mesmo" (1 João 3:3). Quem espera de verdade a volta de Cristo vive diferente hoje.

> **Resumo:** No essencial há acordo: Cristo voltará pessoal e visivelmente, os mortos ressuscitarão, haverá juízo, e Deus renovará todas as coisas. Nos detalhes do milênio e do arrebatamento, a igreja ensina o pré-milenismo, reconhecendo as demais posições como legítimas entre irmãos. O objetivo da escatologia é santidade e esperança.`,
    discussionQuestions: [
      'Por que é sábio segurar com firmeza o essencial da escatologia (Cristo volta, haverá juízo) e com humildade os detalhes (milênio, arrebatamento)?',
      'Se o destino final do salvo é uma "nova terra" — criação renovada e corpórea —, como isso muda a ideia comum de "ir para as nuvens"?',
      '1 João 3:3 liga a esperança da volta de Cristo à santidade hoje. De que forma esperar a volta dEle mudaria uma decisão sua nesta semana?',
    ],
    practicalActivity:
      'Leia Apocalipse 21:1-8. Liste como será o estado eterno (o que haverá e o que não haverá mais). Depois leia 1 Tessalonicenses 4:13-18 e escreva a palavra que Paulo usa para o efeito que essa esperança deve ter (v.18).',
    homework:
      'Descreva as três posições sobre o milênio (pré, a e pós) em uma frase cada, e indique qual é a da nossa igreja.',
    memoryVerse: 'Este Jesus... assim virá como para o céu o vistes ir. (Atos 1:11)',
    quiz: [
      {
        question: 'A segunda vinda de Cristo será:',
        options: [
          'Secreta e apenas simbólica',
          'Pessoal, visível e gloriosa',
          'Somente espiritual, sem retorno real',
          'Já aconteceu no passado',
        ],
        correctIndex: 1,
      },
      {
        question: 'A posição da nossa igreja sobre o milênio é o:',
        options: [
          'A-milenismo',
          'Pós-milenismo',
          'Pré-milenismo (Cristo volta antes do milênio)',
          'Nenhuma volta acontecerá',
        ],
        correctIndex: 2,
      },
      {
        question: 'Sobre o estado intermediário (entre a morte e a ressurreição), a Bíblia ensina que:',
        options: [
          'A alma deixa de existir',
          'O salvo está consciente na presença do Senhor; é estágio, não o estado final',
          'Todos dormem sem consciência para sempre',
          'A pessoa reencarna',
        ],
        correctIndex: 1,
      },
      {
        question: 'Qual o propósito prático da escatologia, segundo 1 João 3:3?',
        options: [
          'Alimentar curiosidade e medo',
          'Prever datas exatas',
          'Produzir santidade e esperança ("purifica-se a si mesmo")',
          'Dividir a igreja',
        ],
        correctIndex: 2,
      },
    ],
  },

  // =========================================================================
  {
    id: 'credos',
    title: 'Apêndice — Os Três Credos da Igreja Primitiva',
    verse: '1 Coríntios 15:3-4',
    verseText:
      'Porque primeiramente vos entreguei o que também recebi: que Cristo morreu por nossos pecados, segundo as Escrituras; e que foi sepultado, e que ressuscitou ao terceiro dia, segundo as Escrituras.',
    content: `# Apêndice — Os Três Credos da Igreja Primitiva

Credo vem do latim *credo*, "eu creio". Os credos não estão acima da Bíblia — são **resumos fiéis** do que a Escritura ensina, forjados quando heresias ameaçaram distorcer o Evangelho. Já no Novo Testamento há mini-credos (1 Coríntios 15:3-4; 1 Timóteo 3:16). Estes três são o patrimônio comum de toda a Igreja.

## 1. O Símbolo dos Apóstolos

O mais antigo em uso, com raízes em confissões batismais do século II (forma final por volta do séc. VI). É a síntese mais simples da fé:

*"Creio em Deus Pai, Todo-Poderoso, Criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, de onde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja universal, na comunhão dos santos, na remissão dos pecados, na ressurreição do corpo e na vida eterna. Amém."*

Note a estrutura **trinitária**: Pai (Criador), Filho (a obra completa) e Espírito (e a vida da Igreja).

## 2. O Credo Niceno (Niceno-Constantinopolitano)

Formulado no Concílio de **Niceia (325)** e completado em **Constantinopla (381)**, para responder ao **arianismo** (que negava a plena divindade de Cristo) e afirmar também a divindade do Espírito. Seu coração:

*"...em um só Senhor, Jesus Cristo, Filho unigênito de Deus, nascido do Pai antes de todos os séculos: Deus de Deus, Luz da Luz, Deus verdadeiro de Deus verdadeiro; gerado, não criado, **consubstancial ao Pai** (homoousios); por Ele todas as coisas foram feitas... Creio no Espírito Santo, Senhor que dá a vida, que procede do Pai, que com o Pai e o Filho é adorado e glorificado..."*

A expressão **"gerado, não criado, consubstancial ao Pai"** é a espada que decapitou o arianismo: o Filho não é criatura, mas Deus verdadeiro, da mesma substância do Pai.

## 3. O Credo Atanasiano

Atribuído tradicionalmente a Atanásio (embora de autoria posterior e incerta), é o mais preciso na formulação da Trindade e da encarnação. Lutero o chamou "a maior produção da igreja desde os apóstolos". Trechos centrais:

*"Adoramos um só Deus na Trindade, e a Trindade na unidade; não confundindo as pessoas, nem dividindo a substância. Pois uma é a pessoa do Pai, outra a do Filho, outra a do Espírito Santo. Mas do Pai, do Filho e do Espírito Santo é uma só a divindade, igual a glória, coeterna a majestade... E, contudo, não são três deuses, mas um só Deus."*

E, quanto a Cristo: *"...Deus perfeito e homem perfeito... não pela conversão da divindade em carne, mas pela assunção da humanidade em Deus; um só, não pela mistura das substâncias, mas pela unidade da pessoa."* — a mesma verdade de Calcedônia.

## Por que os credos importam

- **Guardam o Evangelho** — traçam a fronteira entre a fé cristã e as heresias (arianismo, modalismo, docetismo...).
- **Unem a Igreja** — católicos, ortodoxos e protestantes confessam os mesmos credos; são o "cristianismo mero".
- **Ensinam e adoram** — condensam em poucas linhas o que se deve crer, e podem ser recitados como ato de adoração.
- **Ligam-nos à história** — lembram que não inventamos a fé; nós a **recebemos** (Judas 3).

> **Resumo:** Os três credos — Apostólico, Niceno e Atanasiano — são resumos fiéis da Escritura, nascidos na defesa da verdade. Afirmam a Trindade e a plena divindade e humanidade de Cristo, guardam o Evangelho, unem a Igreja e nos ligam à fé "uma vez por todas entregue aos santos".`,
    discussionQuestions: [
      'Se os credos apenas resumem a Bíblia, por que ainda são úteis hoje? Contra quais confusões eles nos protegem?',
      'A frase "gerado, não criado, consubstancial ao Pai" nasceu para refutar qual heresia — e por que essa distinção importa para a salvação?',
      'Recitar um credo pode virar mera repetição. Como transformar essa confissão em adoração de verdade?',
    ],
    practicalActivity:
      'Leia o Símbolo dos Apóstolos em voz alta, devagar. A cada afirmação, aponte um texto bíblico que a sustente. Depois escreva qual frase mais fortalece a sua fé hoje.',
    homework:
      'Escolha um dos três credos e explique, em suas palavras, contra qual erro ele foi escrito e qual verdade ele protege.',
    memoryVerse:
      'Cristo morreu por nossos pecados, segundo as Escrituras; e foi sepultado, e ressuscitou ao terceiro dia, segundo as Escrituras. (1 Coríntios 15:3-4)',
    quiz: [
      {
        question: 'A palavra "credo" significa:',
        options: ['"Eu creio"', '"Livro sagrado"', '"Igreja"', '"Oração"'],
        correctIndex: 0,
      },
      {
        question: 'O Credo Niceno (325/381) foi formulado principalmente para responder a qual heresia?',
        options: [
          'O modalismo',
          'O arianismo (que negava a plena divindade de Cristo)',
          'O docetismo',
          'O ateísmo',
        ],
        correctIndex: 1,
      },
      {
        question: 'A expressão do Credo Niceno que afirma que o Filho é Deus verdadeiro é:',
        options: [
          '"Criado antes de tudo"',
          '"Gerado, não criado, consubstancial ao Pai"',
          '"Semelhante ao Pai apenas"',
          '"Inferior ao Pai"',
        ],
        correctIndex: 1,
      },
      {
        question: 'Por que os credos são importantes para a Igreja?',
        options: [
          'Porque estão acima da Bíblia',
          'Porque guardam o Evangelho, unem a Igreja e nos ligam à fé recebida',
          'Porque substituem a leitura da Escritura',
          'Porque foram escritos pelos apóstolos pessoalmente',
        ],
        correctIndex: 1,
      },
    ],
  },

]
