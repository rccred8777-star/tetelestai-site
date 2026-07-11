import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

// ============ USER SERVICES ============
export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (userId: string, data: any) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
};

// ============ COURSE SERVICES ============
export const getCourses = async () => {
  const q = query(collection(db, 'courses'), orderBy('order'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getCourseLessons = async (courseId: string) => {
  const q = query(
    collection(db, 'courses', courseId, 'lessons'),
    orderBy('order')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getLesson = async (courseId: string, lessonId: string) => {
  const docRef = doc(db, 'courses', courseId, 'lessons', lessonId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// ============ PROGRESS SERVICES ============
export const getUserProgress = async (userId: string) => {
  const docRef = doc(db, 'progress', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : { completedLessons: [], courses: {} };
};

export const markLessonComplete = async (userId: string, courseId: string, lessonId: string) => {
  const progressRef = doc(db, 'progress', userId);
  const progressSnap = await getDoc(progressRef);
  
  if (progressSnap.exists()) {
    const data = progressSnap.data();
    const completedLessons = data.completedLessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }
    
    const courses = data.courses || {};
    if (!courses[courseId]) courses[courseId] = { completedLessons: [] };
    if (!courses[courseId].completedLessons.includes(lessonId)) {
      courses[courseId].completedLessons.push(lessonId);
    }
    
    await updateDoc(progressRef, { completedLessons, courses, updatedAt: serverTimestamp() });
  } else {
    await setDoc(progressRef, {
      userId,
      completedLessons: [lessonId],
      courses: { [courseId]: { completedLessons: [lessonId] } },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
};

// ============ CELL GROUP SERVICES ============
export const getCellGroups = async () => {
  const q = query(collection(db, 'cellGroups'), orderBy('name'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getCellGroup = async (groupId: string) => {
  const docRef = doc(db, 'cellGroups', groupId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getUserCellGroup = async (userId: string) => {
  const q = query(collection(db, 'cellGroups'), where('members', 'array-contains', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ============ EVENT SERVICES ============
export const getEvents = async () => {
  const q = query(collection(db, 'events'), orderBy('date', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const registerForEvent = async (userId: string, eventId: string) => {
  await addDoc(collection(db, 'eventRegistrations'), {
    userId,
    eventId,
    registeredAt: serverTimestamp()
  });
};

// ============ ANNOUNCEMENT SERVICES ============
export const getAnnouncements = async () => {
  const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ============ DONATION SERVICES ============
export const recordDonation = async (userId: string, amount: number, type: string) => {
  await addDoc(collection(db, 'donations'), {
    userId,
    amount,
    type,
    createdAt: serverTimestamp()
  });
};

export const getUserDonations = async (userId: string) => {
  const q = query(collection(db, 'donations'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ============ SEED DATA ============
// Call this once to populate initial data
export const seedInitialData = async () => {
  // Seed courses
  const coursesRef = collection(db, 'courses');
  
  const method33Course = {
    id: 'metodo-33',
    title: 'Metodo 3/3 - Discipulado Multiplicativo',
    description: 'Treinamento completo para fazer discipulos que fazem discipulos',
    order: 1,
    createdAt: serverTimestamp()
  };
  
  await setDoc(doc(coursesRef, 'metodo-33'), method33Course);
  
  // Seed lessons for Metodo 3/3
  const lessons = [
    {
      id: 'licao-1',
      order: 1,
      title: 'Testemunho Pessoal Tetelestai',
      verse: 'Apocalipse 12:11',
      verseText: 'E eles o venceram pelo sangue do Cordeiro e pela palavra do seu testemunho.',
      purpose: 'Evangelismo',
      value: 'Missao',
      content: `## Introducao\n\nSeu testemunho pessoal e a ferramenta de evangelismo mais poderosa que voce possui. Ninguem pode contestar sua experiencia.\n\n## Conteudo\n\n### O Modelo: ANTES - COMO - DEPOIS\n\n**ANTES:** Como era sua vida antes de Jesus?\n- Qual era seu vazio?\n- O que voce buscava?\n- Onde voce estava perdido?\n\n**COMO:** Como voce encontrou Jesus?\n- Quem foi usado por Deus?\n- Qual momento foi decisivo?\n- Como foi sua oracao de salvacao?\n\n**DEPOIS:** Como Jesus mudou sua vida?\n- O que mudou de verdade?\n- Quem voce e hoje?\n- O que Jesus esta fazendo em voce?\n\n### Dica Pratica\n\nTreine seu testemunho em 3 minutos. Seja honesto, nao exagere. A autenticidade converte mais que a perfeicao.\n\n## Atividade Pratica\n\nEm pares, cada pessoa compartilha seu testemunho em 3 minutos. O outro ouve e da feedback.\n\n## Tarefa para Casa\n\nCompartilhe seu testemunho com pelo menos 1 pessoa esta semana. Escreva o nome da pessoa e o que aconteceu.\n\n## Versiculo para Memorizar\n\n"E eles o venceram pelo sangue do Cordeiro e pela palavra do seu testemunho." - Apocalipse 12:11`,
      discussionQuestions: [
        'Por que seu testemunho pessoal e tao poderoso?',
        'O que voce acha mais dificil compartilhar sobre sua historia?',
        'Como voce pode simplificar seu testemunho para 3 minutos?',
        'Quem e 1 pessoa especifica com quem voce pode compartilhar esta semana?'
      ],
      obediencePoint: 'Compartilhar meu testemunho com 1 pessoa esta semana',
      practicalActivity: 'Em pares, praticar o testemunho em 3 minutos',
      homework: 'Compartilhar com 1 pessoa e anotar o resultado',
      createdAt: serverTimestamp()
    },
    {
      id: 'licao-2',
      order: 2,
      title: 'Certeza da Salvacao',
      verse: '1 Joao 5:13',
      verseText: 'Estas coisas vos escrevi, para que saibais que tendes a vida eterna.',
      purpose: 'Discipulado',
      value: 'Palavra de Deus',
      content: `## Introducao\n\nMuitos crentes vivem com duvida sobre sua salvacao. Deus quer que voce TENHA CERTEZA.\n\n## Conteudo\n\n### 5 Evidencias de Salvacao\n\n**1. Voce creu em Jesus (Joao 1:12)**\n- Recebeu Jesus como Salvador?\n- Confessou que Ele e Senhor?\n\n**2. Voce e guiado pelo Espirito (Romanos 8:16)**\n- O Espirito testifica que voce e filho de Deus\n- Ha desejo por coisas espirituais em voce\n\n**3. Voce obedece a Palavra (1 Joao 2:3)**\n- Ha obediencia crescente?\n- Nao e perfeicao, mas direcao\n\n**4. Voce ama outros crentes (1 Joao 3:14)**\n- Ha amor pela igreja?\n- Voce busca comunhao?\n\n**5. Voce produz frutos (Joao 15:5)**\n- Fruto do Espirito esta aparecendo?\n- Amor, alegria, paz, paciencia...\n\n## Atividade Pratica\n\nAvalie cada uma das 5 evidencias pessoalmente (1-5). Identifique areas que precisam crescer.\n\n## Tarefa para Casa\n\nLeia 1 Joao inteiro esta semana. Anote cada evidencia de salvacao que voce encontrar.\n\n## Versiculo para Memorizar\n\n"Estas coisas vos escrevi, para que saibais que tendes a vida eterna." - 1 Joao 5:13`,
      discussionQuestions: [
        'Voce tem certeza da sua salvacao? Por que sim ou por que nao?',
        'Qual das 5 evidencias voce sente mais forte em sua vida?',
        'Qual evidencia precisa crescer mais?',
        'Como voce pode ajudar alguem que duvida da salvacao?'
      ],
      obediencePoint: 'Ter certeza da minha salvacao e ajudar alguem a ter tambem',
      practicalActivity: 'Auto-avaliacao das 5 evidencias de salvacao',
      homework: 'Ler 1 Joao e anotar evidencias de salvacao',
      createdAt: serverTimestamp()
    },
    {
      id: 'licao-3',
      order: 3,
      title: 'Perdao e Restauracao',
      verse: 'Efesios 4:32',
      verseText: 'Sede bondosos uns para com os outros, compassivos, perdoando-vos uns aos outros.',
      purpose: 'Comunhao',
      value: 'Unidade',
      content: `## Introducao\n\nO perdao e a chave para a liberdade. Muitos estao presos ao passado porque nao conseguem perdoar.\n\n## Conteudo\n\n### Os 3 Perdoes Necessarios\n\n**1. Perdao de Deus**\n- 1 Joao 1:9 - "Se confessarmos, Ele e fiel para perdoar"\n- Nao ha pecado que Deus nao possa perdoar\n- A culpa nao vem de Deus - vem do inimigo\n\n**2. Perdao de Si Mesmo**\n- Muitos aceitam o perdao de Deus mas nao se perdoam\n- Romanos 8:1 - "Nenhuma condenacao ha para os que estao em Cristo"\n- Se Deus te perdoou, quem e voce para nao se perdoar?\n\n**3. Perdao dos Outros**\n- Mateus 6:14-15 - Perdoamos porque fomos perdoados\n- Nao e sobre a outra pessoa - e sobre sua liberdade\n- O perdao nao justifica o erro, mas liberta voce\n\n## Atividade Pratica\n\nEscreva uma carta de perdao (nao precisa enviar). Deixe ir o que esta prendendo voce.\n\n## Tarefa para Casa\n\nPratique o perdao: escolha 1 pessoa para perdoar esta semana. Ore por ela.\n\n## Versiculo para Memorizar\n\n"Sede bondosos uns para com os outros, compassivos, perdoando-vos uns aos outros, como tambem Deus vos perdoou em Cristo." - Efesios 4:32`,
      discussionQuestions: [
        'Qual dos 3 perdoes voce mais precisa praticar?',
        'Quem voce precisa perdoar? O que esta te prendendo?',
        'Como o perdao se relaciona com a unidade da igreja?',
        'O que diferencia perdoar de "passar a mao na cabeca"?'
      ],
      obediencePoint: 'Perdoar 1 pessoa especifica esta semana',
      practicalActivity: 'Escrever carta de perdao (nao precisa enviar)',
      homework: 'Orar por 1 pessoa que voce precisa perdoar',
      createdAt: serverTimestamp()
    },
    {
      id: 'licao-4',
      order: 4,
      title: 'Vida de Oracao',
      verse: 'Mateus 6:9-13',
      verseText: 'Vos, portanto, orareis assim: Pai nosso que estas nos ceus...',
      purpose: 'Adoracao',
      value: 'Oracao',
      content: `## Introducao\n\nA oracao e a respiracao da alma crista. Sem oracao, nao ha vida espiritual.\n\n## Conteudo\n\n### O Modelo do Pai Nosso\n\n**1. "Pai nosso" - Relacionamento**\n- Deus e seu Pai, nao um juiz distante\n- Proximidade e intimidade\n\n**2. "Santificado seja o teu nome" - Adoracao**\n- Comece louvando quem Deus e\n- Coloque Deus no centro\n\n**3. "Venha o teu reino" - Intercessao**\n- Ore pelos outros, pela igreja, pela cidade\n\n**4. "Seja feita a tua vontade" - Submissao**\n- Entregue seus planos a Deus\n- Confie que o plano Dele e melhor\n\n**5. "O pao nosso de cada dia" - Provisionamento**\n- Pecas necessidades praticas\n\n**6. "Perdoa as nossas dividas" - Confissao**\n- Mantenha a consciencia limpa\n\n**7. "Nao nos deixes cair" - Protecao**\n- Peça força contra tentacoes\n\n**8. "Teu e o reino" - Adoracao final**\n- Termine louvando\n\n### Modelo A.C.T.S.\n- **A**doracao - Louvar quem Deus e\n- **C**onfissao - Confessar pecados\n- **T**hanksgiving - Agradecer\n- **S**upplication - Pedir\n\n## Atividade Pratica\n\nOre juntos usando o modelo A.C.T.S. por 10 minutos.\n\n## Tarefa para Casa\n\nEstabeleca um horario diario de oracao (pelo menos 10 minutos). Use o modelo A.C.T.S.\n\n## Versiculo para Memorizar\n\n"Vos, portanto, orareis assim: Pai nosso que estas nos ceus, santificado seja o teu nome." - Mateus 6:9`,
      discussionQuestions: [
        'Qual parte do Pai Nosso mais tocou voce hoje?',
        'Qual obstaculo mais dificulta sua vida de oracao?',
        'Como podemos orar uns pelos outros na celula?',
        'Que horario voce vai escolher para orar diariamente?'
      ],
      obediencePoint: 'Orar 10 minutos por dia usando A.C.T.S.',
      practicalActivity: 'Oracao em grupo usando modelo A.C.T.S.',
      homework: 'Estabelecer horario diario de oracao',
      createdAt: serverTimestamp()
    },
    {
      id: 'licao-5',
      order: 5,
      title: 'Palavra de Deus',
      verse: '2 Timoteo 3:16-17',
      verseText: 'Toda a Escritura e inspirada por Deus e util para o ensino, para a repreensao...',
      purpose: 'Discipulado',
      value: 'Palavra de Deus',
      content: `## Introducao\n\nA Biblia e a palavra viva de Deus. Ela tem poder para transformar, curar, dirigir e salvar.\n\n## Conteudo\n\n### Metodo S.O.A.P. de Leitura\n\n**S - Scripture (Escritura)**\n- Leia um capitulo ou passagem\n- Escreva o versiculo que mais te tocou\n\n**O - Observation (Observacao)**\n- O que diz o texto?\n- Quem fala? Com quem? O que acontece?\n\n**A - Application (Aplicacao)**\n- Como isso se aplica a sua vida?\n- O que voce precisa fazer diferente?\n\n**P - Prayer (Oracao)**\n- Ore sobre o que voce aprendeu\n- Peca ajuda para aplicar\n\n### Por que Ler a Biblia Todos os Dias?\n\n1. **E comida para a alma** (Mateus 4:4)\n2. **E espada espiritual** (Efesios 6:17)\n3. **E lampada para os pes** (Salmo 119:105)\n4. **E fonte de vida** (Joao 6:63)\n\n## Atividade Pratica\n\nFaca um estudo S.O.A.P. juntos em Salmo 1.\n\n## Tarefa para Casa\n\nLeia 1 capitulo por dia usando S.O.A.P. Comece pelo Evangelho de Joao.\n\n## Versiculo para Memorizar\n\n"Toda a Escritura e inspirada por Deus e util para o ensino, para a repreensao, para a correcao, para a educacao na justica." - 2 Timoteo 3:16`,
      discussionQuestions: [
        'Qual versiculo mais te tocou no estudo S.O.A.P. de hoje?',
        'O que impede voce de ler a Biblia diariamente?',
        'Como a Palavra ja mudou sua vida?',
        'Qual livro da Biblia voce vai ler este mes?'
      ],
      obediencePoint: 'Ler 1 capitulo por dia usando S.O.A.P.',
      practicalActivity: 'Estudo S.O.A.P. em grupo (Salmo 1)',
      homework: 'Comecar Joao, 1 capitulo/dia com S.O.A.P.',
      createdAt: serverTimestamp()
    },
    {
      id: 'licao-6',
      order: 6,
      title: 'Igreja em Comunhao',
      verse: 'Atos 2:42-47',
      verseText: 'E perseveravam na doutrina dos apostolos, e na comunhao, e no partir do pao, e nas oracoes.',
      purpose: 'Comunhao',
      value: 'Unidade',
      content: `## Introducao\n\nA igreja nao e um predio - e uma familia. A comunhao e essencial para o crescimento espiritual.\n\n## Conteudo\n\n### 4 Pilares da Igreja Primitiva (Atos 2:42)\n\n**1. Doutrina (Palavra)**\n- Ensino da Biblia\n- Crescimento no conhecimento de Deus\n\n**2. Comunhao**\n- Partilha da vida\n- Relacionamentos profundos\n- Cuidado uns pelos outros\n\n**3. Partir do Pao (Santa Ceia)**\n- Rememoracao da morte de Cristo\n- Unidade do corpo\n\n**4. Oracoes**\n- Orao coletiva\n- Intercessao\n\n### O Circulo da Igreja\n\nUma igreja saudavel tem 4 funcoes:\n- UP (Adoracao) - Relacionamento com Deus\n- IN (Comunhao) - Relacionamento com crentes\n- OUT (Evangelismo) - Relacionamento com nao-crentes\n- DOWN (Ministerio) - Servico ao proximo\n\n## Atividade Pratica\n\nDesenhe o Circulo da Igreja e avalie onde sua celula esta forte e onde precisa crescer.\n\n## Tarefa para Casa\n\nIdentifique 1 pessoa da igreja para investir relacionamento esta semana.\n\n## Versiculo para Memorizar\n\n"E perseveravam na doutrina dos apostolos, e na comunhao, e no partir do pao, e nas oracoes." - Atos 2:42`,
      discussionQuestions: [
        'Qual dos 4 pilares e mais forte na sua celula?',
        'Qual dos 4 pilares precisa mais atencao?',
        'Como voce contribui para a comunhao da igreja?',
        'Quem voce pode investir em relacionamento esta semana?'
      ],
      obediencePoint: 'Investir em 1 relacionamento na igreja esta semana',
      practicalActivity: 'Desenhar e avaliar o Circulo da Igreja',
      homework: 'Identificar 1 pessoa para investir relacionamento',
      createdAt: serverTimestamp()
    },
    {
      id: 'licao-7',
      order: 7,
      title: 'O Espirito Santo e o Avivamento',
      verse: 'Atos 1:8',
      verseText: 'Mas recebereis poder, ao vir sobre vos o Espirito Santo, e sereis minhas testemunhas.',
      purpose: 'Adoracao',
      value: 'Missao',
      content: `## Introducao\n\nO Espirito Santo nao e uma forca - e uma pessoa. Ele e seu parceiro de poder para viver e testemunhar.\n\n## Conteudo\n\n### Quem e o Espirito Santo?\n\n**1. Ele e Deus** (Atos 5:3-4)\n- Co-igual com o Pai e o Filho\n- Nao e uma forca, e uma pessoa\n\n**2. Ele Habita em Voce** (1 Corintios 6:19)\n- Seu corpo e templo do Espirito Santo\n- Ele esta sempre com voce\n\n**3. Ele da Poder** (Atos 1:8)\n- Poder para ser testemunha\n- Poder para vencer\n- Poder para viver santidade\n\n### Os Frutos do Espirito (Galatas 5:22-23)\nAmor, alegria, paz, paciencia, benignidade, bondade, fidelidade, mansidao, dominio proprio.\n\n### Os Dons do Espirito (1 Corintios 12)\nCada cristao recebe dons para edificar a igreja.\n\n## Atividade Pratica\n\nOre uns pelos outros para serem cheios do Espirito Santo.\n\n## Tarefa para Casa\n\nLeia Atos 1-2 e anote tudo que o Espirito Santo faz.\n\n## Versiculo para Memorizar\n\n"Mas recebereis poder, ao vir sobre vos o Espirito Santo, e sereis minhas testemunhas." - Atos 1:8`,
      discussionQuestions: [
        'Qual e sua relacao atual com o Espirito Santo?',
        'Qual fruto do Espirito voce mais precisa desenvolver?',
        'Voce ja experimentou o poder do Espirito Santo? Como?',
        'Como o Espirito Santo te capacita para a missao?'
      ],
      obediencePoint: 'Buscar ser cheio do Espirito Santo diariamente',
      practicalActivity: 'Oracao uns pelos outros para receber o Espirito',
      homework: 'Ler Atos 1-2 e anotar obras do Espirito Santo',
      createdAt: serverTimestamp()
    },
    {
      id: 'licao-8',
      order: 8,
      title: 'Santidade e Excelencia',
      verse: '1 Pedro 1:15-16',
      verseText: 'Mas, assim como e santo aquele que vos chamou, sede vos tambem santos.',
      purpose: 'Discipulado',
      value: 'Santidade',
      content: `## Introducao\n\nSantidade nao e perfeicao - e separacao. Ser santo e ser diferente do mundo para honrar a Deus.\n\n## Conteudo\n\n### O Que e Santidade?\n\n**Nao e:**\n- Nunca errar\n- Ser chato/religioso\n- Usar roupa preta\n\n**E:**\n- Ser diferente do mundo (separado)\n- Ter o carater de Deus\n- Viver de acordo com os valores do Reino\n\n### Areas de Santidade Pratica\n\n**1. Santidade nos Relacionamentos**\n- Pureza antes do casamento\n- Fidelidade no casamento\n- Amor sem interesse\n\n**2. Santidade na Honestidade**\n- Nao roubar no trabalho\n- Nao mentir\n- Ser transparente\n\n**3. Santidade na Linguagem**\n- Falar o que edifica\n- Evitar fofoca\n- Usar palavras de vida\n\n**4. Santidade na Midia**\n- O que voce consome?\n- O que voce assiste/ouve?\n- Filtros pessoais\n\n## Atividade Pratica\n\nAvalie cada area de santidade (1-5). Escolha 1 area para trabalhar esta semana.\n\n## Tarefa para Casa\n\nIdentifique 1 area onde voce precisa ser mais santo. Tome uma decisao concreta.\n\n## Versiculo para Memorizar\n\n"Mas, assim como e santo aquele que vos chamou, sede vos tambem santos em toda a vossa maneira de viver." - 1 Pedro 1:15`,
      discussionQuestions: [
        'O que santidade significa para voce?',
        'Qual area da sua vida mais precisa de santidade?',
        'Como a santidade se relaciona com excelencia?',
        'Qual decisao concreta voce vai tomar esta semana?'
      ],
      obediencePoint: 'Escolher 1 area para crescer em santidade esta semana',
      practicalActivity: 'Auto-avaliacao de santidade em 4 areas',
      homework: 'Tomar 1 decisao concreta de santidade',
      createdAt: serverTimestamp()
    },
    {
      id: 'licao-9',
      order: 9,
      title: 'Multiplicacao - Faca Discipulos',
      verse: 'Mateus 28:18-20',
      verseText: 'Ide, portanto, e fazei discipulos de todas as nacoes...',
      purpose: 'Evangelismo',
      value: 'Multiplicacao',
      content: `## Introducao\n\nEsta e a licao mais importante! Jesus nao nos chamou para sermos convertidos - nos chamou para fazermos convertidos.\n\n## Conteudo\n\n### A Grande Comissao (Mateus 28:18-20)\n\n**1. "Foi-me dada toda a autoridade"**\n- Jesus tem autoridade sobre tudo\n- Nao ha limite para o que Ele pode fazer atraves de voce\n\n**2. "Ide, portanto"**\n- A igreja e movimento, nao monumento\n- "Ide" = saia do seu comforto\n\n**3. "E fazei discipulos"**\n- Nao e so ganhar almas\n- E fazer DISCIPULOS - pessoas que obedecem Jesus\n\n**4. "De todas as nacoes"**\n- Todos merecem ouvir\n- Comece onde voce esta\n\n**5. "Ensinando-os a obedecer"**\n- Discipulado = obediencia\n- Nao e so informacao, e transformacao\n\n### O Metodo 3/3\n\n- 1/3: Looking Back (Volte a Deus)\n- 2/3: Looking Up (Volte a Palavra)\n- 3/3: Looking Ahead (Va e faca discipulos)\n\n### Como Iniciar Seu Grupo\n\n1. Ore e escolha 3-5 pessoas\n2. Convide-as para o treinamento\n3. Use este material (Metodo 3/3)\n4. Encontrem semanalmente por 90 minutos\n5. Cada pessoa pratica e compartilha\n6. Ao final, cada um inicia seu proprio grupo!\n\n## Atividade Pratica\n\nCada pessoa pratica como conduziria um encontro do Metodo 3/3.\n\n## Tarefa para Casa\n\nListe 3 pessoas que voce vai convidar para seu grupo de discipulado.\n\n## Versiculo para Memorizar\n\n"Ide, portanto, e fazei discipulos de todas as nacoes, batizando-os em nome do Pai, e do Filho, e do Espirito Santo." - Mateus 28:19`,
      discussionQuestions: [
        'Voce esta fazendo discipulos? Por que sim ou por que nao?',
        'Quem sao 3 pessoas que voce pode convidar para seu grupo?',
        'O que te impede de multiplicar discipulos?',
        'Como o Metodo 3/3 pode te ajudar a multiplicar?'
      ],
      obediencePoint: 'Convidar 3 pessoas para um grupo de discipulado',
      practicalActivity: 'Praticar conducao de encontro do Metodo 3/3',
      homework: 'Listar 3 pessoas para convidar ao grupo',
      createdAt: serverTimestamp()
    }
  ];
  
  const lessonsRef = collection(db, 'courses', 'metodo-33', 'lessons');
  for (const lesson of lessons) {
    await setDoc(doc(lessonsRef, lesson.id), lesson);
  }
  
  console.log('Seed data inserted successfully!');
};
