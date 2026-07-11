// Cell Groups
export const cellGroups = [
  { id: 1, name: 'Célula Vida Nova', leader: 'Pb. João Pereira', phone: '(11) 99999-1111', day: 'Terça-feira', time: '20h', location: 'Rua das Flores, 45 — Centro', region: 'Centro', profile: 'Família', members: 12 },
  { id: 2, name: 'Célula Luz', leader: 'Pra. Maria Santos', phone: '(11) 99999-2222', day: 'Quarta-feira', time: '19h30', location: 'Av. Jardim, 120 — Jardim das Flores', region: 'Jardim das Flores', profile: 'Mulheres', members: 8 },
  { id: 3, name: 'Célula Renovo', leader: 'Pr. Lucas Mendes', phone: '(11) 99999-3333', day: 'Quinta-feira', time: '20h', location: 'R. Nova, 78 — Vila Nova', region: 'Vila Nova', profile: 'Jovens', members: 10 },
  { id: 4, name: 'Célula Fé', leader: 'Dc. Carlos Oliveira', phone: '(11) 99999-4444', day: 'Sexta-feira', time: '19h', location: 'R. São José, 200 — São José', region: 'São José', profile: 'Casais', members: 8 },
  { id: 5, name: 'Célula Esperança', leader: 'Pb. Pedro Almeida', phone: '(11) 99999-5555', day: 'Sábado', time: '17h', location: 'R. Central, 50 — Centro', region: 'Centro', profile: 'Misto', members: 6 },
  { id: 6, name: 'Célula Avivamento', leader: 'Dc. Ana Beatriz', phone: '(11) 99999-6666', day: 'Terça-feira', time: '19h30', location: 'Av. América, 300 — Jardim América', region: 'Jardim América', profile: 'Família', members: 10 },
]

// Ministries
export const ministries = [
  { id: 1, name: 'Louvor e Adoração', image: '/min-louvor.jpg', description: 'Conduzindo a congregação à presença de Deus através da música. Ensaios toda terça, 20h.', leader: 'Ministério de Louvor', meeting: 'Terças, 20h' },
  { id: 2, name: 'Ministério Infantil', image: '/min-infantil.jpg', description: 'Cuidando das crianças com amor, ensinando a Palavra de forma lúdica. Todos os domingos, 10h.', leader: 'Tia Fernanda', meeting: 'Domingos, 10h' },
  { id: 3, name: 'Ministério de Jovens', image: '/min-jovens.jpg', description: 'Um espaço para jovens conhecerem a Cristo e viverem em comunidade. Sábados, 18h.', leader: 'Pb. Lucas Mendes', meeting: 'Sábados, 18h' },
  { id: 4, name: 'Ministério de Mulheres', image: '/min-mulheres.jpg', description: 'Fortalecendo mulheres na fé e na amizade. Encontros quinzenais, sábados 15h.', leader: 'Pra. Juliana Silva', meeting: 'Sábados 15h (quinzenal)' },
  { id: 5, name: 'Ministério de Homens', image: '/min-homens.jpg', description: 'Desenvolvendo liderança cristã masculina. Primeiro sábado do mês, 8h.', leader: 'Pr. Ricardo Silva', meeting: '1º Sábado, 8h' },
  { id: 6, name: 'Ministério de Casais', image: '/min-casais.jpg', description: 'Investindo no relacionamento matrimonial. Segundo sábado, 19h.', leader: 'Pr. Carlos e Ana', meeting: '2º Sábado, 19h' },
  { id: 7, name: 'Missões', image: '/min-missoes.jpg', description: 'Levando o evangelho ao mundo. Projetos em África, Ásia e América Latina.', leader: 'Pra. Juliana Silva', meeting: 'Reuniões mensais' },
  { id: 8, name: 'Células', image: '/min-celulas.jpg', description: 'Pequenos grupos que se reúnem semanalmente para estudar a Palavra e compartilhar a vida.', leader: 'Pb. João Pereira', meeting: 'Segunda a Sábado' },
]

// Events
export const events = [
  { id: 1, title: 'Conferência Avivamento 2026', date: '15-17 de Janeiro de 2026', datetime: '2026-01-15', time: '19h (sex/sab), 10h (dom)', location: 'Templo Principal', image: '/evento-conferencia.jpg', description: 'Três dias de adoração intensa e palavras poderosas.', category: 'destaque', status: 'Inscrições Abertas', price: null },
  { id: 2, title: 'Noite de Oração e Jejum', date: '22 de Janeiro de 2026', datetime: '2026-01-22', time: '20h', location: 'Templo Principal', image: '/placeholder-sermon.jpg', description: 'Uma noite dedicada à oração e busca pela presença de Deus.', category: 'regular', status: 'Aberto', price: null },
  { id: 3, title: 'Retiro de Casais', date: '7-8 de Fevereiro de 2026', datetime: '2026-02-07', time: 'Check-in 14h', location: 'Hotel Fazenda', image: '/evento-retiro.jpg', description: 'Um fim de semana para fortalecer seu casamento.', category: 'destaque', status: 'Vagas Limitadas', price: 'R$ 450,00/casal' },
  { id: 4, title: 'Batismo', date: '23 de Fevereiro de 2026', datetime: '2026-02-23', time: '10h', location: 'Templo Principal', image: '/evento-batismo.jpg', description: 'Celebração do batismo nas águas.', category: 'regular', status: 'Inscrições Abertas', price: null },
  { id: 5, title: 'Congresso de Jovens', date: '14-15 de Março de 2026', datetime: '2026-03-14', time: '19h', location: 'Ginásio', image: '/min-jovens.jpg', description: 'Um evento poderoso para jovens de toda a região.', category: 'destaque', status: 'Em Breve', price: 'R$ 80,00' },
  { id: 6, title: 'Campanha de Missões', date: 'Abril de 2026', datetime: '2026-04-01', time: 'Todo o mês', location: 'Templo', image: '/min-missoes.jpg', description: 'Mês dedicado às missões mundiais.', category: 'regular', status: 'Em Breve', price: null },
]

// Sermons
export const sermons = [
  { id: 1, title: 'O Poder da Oração', pastor: 'Pr. Ricardo Silva', date: '12 Jan 2026', duration: '45min', series: 'Raízes Profundas', image: '/placeholder-sermon.jpg' },
  { id: 2, title: 'Andando pela Fé', pastor: 'Pr. Ricardo Silva', date: '5 Jan 2026', duration: '38min', series: 'Raízes Profundas', image: '/placeholder-sermon.jpg' },
  { id: 3, title: 'Família Bendita', pastor: 'Pr. Carlos', date: '22 Dez 2025', duration: '42min', series: 'Família no Alvo', image: '/placeholder-sermon.jpg' },
  { id: 4, title: 'O Chamado da Mulher', pastor: 'Pra. Juliana', date: '15 Dez 2025', duration: '35min', series: 'Avivamento', image: '/placeholder-sermon.jpg' },
  { id: 5, title: 'Avivamento Pessoal', pastor: 'Pra. Juliana', date: '8 Dez 2025', duration: '50min', series: 'Avivamento', image: '/placeholder-sermon.jpg' },
]

// Blog/Devotionals
export const devotionals = [
  { id: 1, title: 'Encontrando Paz em Meio à Tempestade', author: 'Pra. Juliana Silva', date: '8 Jan 2026', readTime: '5min', image: '/pastora.jpg', excerpt: 'Como manter a paz de Deus mesmo quando tudo ao redor parece tumultuado...' },
  { id: 2, title: 'Como Manter a Fé nos Momentos Difíceis', author: 'Pr. Ricardo Silva', date: '5 Jan 2026', readTime: '4min', image: '/pastor-principal.jpg', excerpt: 'A fé não é ausência de dificuldades, mas confiança em quem nos guia...' },
  { id: 3, title: 'O Poder da Gratidão Diária', author: 'Pb. Lucas Mendes', date: '1 Jan 2026', readTime: '3min', image: '/lider-jovens.jpg', excerpt: 'A gratidão transforma nossa perspectiva e abre portas para bênçãos...' },
  { id: 4, title: 'Construindo um Lar Cristão', author: 'Pra. Ana Beatriz', date: '28 Dez 2025', readTime: '6min', image: '/lider-casais.jpg', excerpt: 'Princípios bíblicos para construir um lar de acordo com o coração de Deus...' },
]

// Leadership
export const leaders = [
  { id: 1, name: 'Pr. Ricardo Silva', role: 'Pastor Presidente', bio: 'Fundador do Ministério Tetelestai. Apaixonado por discipulado e missões.', image: '/pastor-principal.jpg', social: { instagram: '#', youtube: '#' } },
  { id: 2, name: 'Pra. Juliana Silva', role: 'Pastora de Mulheres e Família', bio: 'Dedicada ao fortalecimento dos lares e ao ministério com mulheres.', image: '/pastora.jpg', social: { instagram: '#' } },
  { id: 3, name: 'Pb. Lucas Mendes', role: 'Líder de Jovens', bio: 'Empolgado em conectar jovens a Cristo de forma relevante e autêntica.', image: '/lider-jovens.jpg', social: { instagram: '#' } },
  { id: 4, name: 'Pr. Carlos e Ana Beatriz', role: 'Líderes de Casais', bio: 'Comprometidos em fortalecer matrimônios através da Palavra de Deus.', image: '/lider-casais.jpg', social: { instagram: '#' } },
]

// Testimonials
export const testimonials = [
  { id: 1, name: 'Ana Carolina', role: 'Membro há 3 anos', text: 'O Ministério Tetelestai mudou minha vida. Encontrei uma família que me acolheu e me ajudou a crescer espiritualmente.', avatar: '/pastora.jpg' },
  { id: 2, name: 'Marcos Oliveira', role: 'Líder de Célula', text: 'Depois de participar das células, minha fé se fortaleceu e consegui superar momentos difíceis com o apoio dos irmãos.', avatar: '/lider-jovens.jpg' },
  { id: 3, name: 'Fernanda Lima', role: 'Mãe de 2', text: 'Meus filhos amam o ministério infantil! Eles aprendem sobre Deus de forma divertida e criativa.', avatar: '/pastora.jpg' },
]

// Announcements
export const announcements = [
  { id: 1, title: 'Novo horário de culto de quarta', content: 'A partir de fevereiro, o culto de quarta-feira será às 19h30 (novo horário, 30min mais cedo).', category: 'igreja', date: '2 dias atrás', unread: true },
  { id: 2, title: 'Inscrições abertas para o Retiro de Casais', content: 'O retiro acontecerá nos dias 7-8 de fevereiro no Hotel Fazenda. Vagas limitadas!', category: 'eventos', date: '5 dias atrás', unread: false },
  { id: 3, title: 'Orem pelo irmão Roberto Alves', content: 'Nosso irmão Roberto será operado na quinta-feira. Vamos orar pela sua recuperação.', category: 'celula', date: '1 semana atrás', unread: false },
  { id: 4, title: 'Novo curso: Liderança no Reino', content: 'Inscrições abertas para o novo curso do nível Liderança. Início: 20 de janeiro.', category: 'cursos', date: '1 semana atrás', unread: false },
  { id: 5, title: 'Mensagem do Pastor — Janeiro 2026', content: 'Queridos, que 2026 seja um ano de crescimento espiritual e bênçãos...', category: 'pastoral', date: '2 semanas atrás', unread: false },
  { id: 6, title: 'Campanha de Missões 2026', content: 'Nosso objetivo este ano é apoiar 5 missionários. Participe!', category: 'igreja', date: '2 semanas atrás', unread: false },
]

// Courses
export const courses = [
  {
    id: 1, title: 'Fundamentos da Fé', level: 'Fundamentos', progress: 60, totalModules: 5, completedModules: 3,
    description: 'Conheça os princípios básicos da fé cristã e construa uma fundação sólida.',
    modules: [
      { id: 1, title: 'Introdução à Fé', completed: true, lessons: [
        { id: 1, title: 'O Que é Fé?', duration: '15min', completed: true },
        { id: 2, title: 'Como Nascer de Novo', duration: '20min', completed: true },
        { id: 3, title: 'O Poder do Arrependimento', duration: '18min', completed: true },
      ]},
      { id: 2, title: 'A Bíblia Sagrada', completed: true, lessons: [
        { id: 4, title: 'A Inspiração Divina', duration: '22min', completed: true },
        { id: 5, title: 'Como Estudar a Bíblia', duration: '25min', completed: true },
        { id: 6, title: 'Aplicação Prática', duration: '20min', completed: true },
      ]},
      { id: 3, title: 'Oração e Comunhão', completed: false, lessons: [
        { id: 7, title: 'O Poder da Oração', duration: '20min', completed: true },
        { id: 8, title: 'Como Orar Efetivamente', duration: '18min', completed: true },
        { id: 9, title: 'Jejum e Busca', duration: '22min', completed: false },
        { id: 10, title: 'Ouvindo a Voz de Deus', duration: '20min', completed: false },
      ]},
      { id: 4, title: 'Vida no Espírito', completed: false, lessons: [
        { id: 11, title: 'O Batismo no Espírito', duration: '25min', completed: false },
        { id: 12, title: 'Os Dons Espirituais', duration: '23min', completed: false },
        { id: 13, title: 'O Fruto do Espírito', duration: '20min', completed: false },
        { id: 14, title: 'Andando no Espírito', duration: '18min', completed: false },
      ]},
      { id: 5, title: 'Compartilhando a Fé', completed: false, lessons: [
        { id: 15, title: 'O Chamado Missionário', duration: '22min', completed: false },
        { id: 16, title: 'Como Evangelizar', duration: '20min', completed: false },
        { id: 17, title: 'Discipulando Novos Convertidos', duration: '25min', completed: false },
        { id: 18, title: 'Multiplicação do Reino', duration: '20min', completed: false },
      ]},
    ]
  },
  { id: 2, title: 'Novos Começos', level: 'Fundamentos', progress: 100, totalModules: 4, completedModules: 4, description: 'Um curso para quem deseja recomeçar na fé.', modules: [] },
  { id: 3, title: 'Liderança no Reino', level: 'Liderança', progress: 0, totalModules: 4, completedModules: 0, description: 'Desenvolva suas habilidades de liderança cristã.', modules: [] },
]

// Giving History
export const givingHistory = [
  { id: 1, date: '10 Jan 2026', type: 'Dízimo', amount: 'R$ 200,00', destination: 'Geral', receipt: true },
  { id: 2, date: '5 Jan 2026', type: 'Oferta', amount: 'R$ 100,00', destination: 'Missões África', receipt: true },
  { id: 3, date: '20 Dez 2025', type: 'Dízimo', amount: 'R$ 200,00', destination: 'Geral', receipt: true },
  { id: 4, date: '15 Dez 2025', type: 'Oferta', amount: 'R$ 300,00', destination: 'Reforma Templo', receipt: true },
  { id: 5, date: '10 Dez 2025', type: 'Dízimo', amount: 'R$ 200,00', destination: 'Geral', receipt: true },
]

// Campaigns
export const campaigns = [
  { id: 1, name: 'Missões África 2026', current: 65000, goal: 100000, description: 'Apoio à missão de plantação de igrejas em Moçambique.' },
  { id: 2, name: 'Reforma do Templo', current: 80000, goal: 200000, description: 'Ampliação do espaço de culto para acomodar mais famílias.' },
]

// FAQ
export const faqItems = [
  { question: 'O que é o dízimo?', answer: 'O dízimo é 10% de nossa renda entregue a Deus. É um princípio bíblico estabelecido desde o Antigo Testamento que nos ensina a confiar em Deus como nosso provedor.' },
  { question: 'Como posso obter meu comprovante para imposto de renda?', answer: 'Enviamos o comprovante anual automaticamente para seu e-mail cadastrado até o dia 28 de fevereiro. Você também pode baixá-lo na área de membros em "Minhas Doações".' },
  { question: 'Posso direcionar minha oferta para um projeto específico?', answer: 'Sim! Ao doar, selecione o projeto desejado. Temos campanhas como Missões África, Reforma do Templo, e outras iniciativas especiais.' },
  { question: 'As doações são seguras?', answer: 'Utilizamos criptografia SSL e gateways de pagamento certificados (Stripe, PayPal). Seus dados financeiros nunca são armazenados em nossos servidores.' },
  { question: 'Como cancelar um dízimo recorrente?', answer: 'Acesse sua área de membros em "Minhas Doações" > "Doações Recorrentes" e clique em "Cancelar". Você também pode entrar em contato com nossa equipe financeira.' },
]

// Cell Members (for My Cell page)
export const cellMembers = [
  { id: 1, name: 'Pb. João Pereira', role: 'Líder', phone: '(11) 99999-1111', avatar: '/pastor-principal.jpg' },
  { id: 2, name: 'Dc. Maria Santos', role: 'Co-líder', phone: '(11) 99999-2222', avatar: '/pastora.jpg' },
  { id: 3, name: 'Ana Carolina Silva', role: 'Membro', phone: '(11) 98765-4321', avatar: '/pastora.jpg' },
  { id: 4, name: 'Pedro Henrique Costa', role: 'Membro', phone: '(11) 99999-3333', avatar: '/pastor-principal.jpg' },
  { id: 5, name: 'Fernanda Lima', role: 'Membro', phone: '(11) 99999-4444', avatar: '/pastora.jpg' },
  { id: 6, name: 'Marcos Oliveira', role: 'Membro', phone: '(11) 99999-5555', avatar: '/lider-jovens.jpg' },
  { id: 7, name: 'Juliana Mendes', role: 'Membro', phone: '(11) 99999-6666', avatar: '/pastora.jpg' },
  { id: 8, name: 'Roberto Alves', role: 'Membro', phone: '(11) 99999-7777', avatar: '/pastor-principal.jpg' },
  { id: 9, name: 'Carolina Dias', role: 'Membro', phone: '(11) 99999-8888', avatar: '/pastora.jpg' },
  { id: 10, name: 'Lucas Ferreira', role: 'Membro', phone: '(11) 99999-9999', avatar: '/lider-jovens.jpg' },
  { id: 11, name: 'Beatriz Santos', role: 'Membro', phone: '(11) 99999-0000', avatar: '/pastora.jpg' },
  { id: 12, name: 'Ricardo Gomes', role: 'Membro', phone: '(11) 98888-1111', avatar: '/pastor-principal.jpg' },
]

// ============================================================
// CURSO: Método 3/3 — Fundamentos do Discipulado
// 9 licoes completas
// ============================================================
export const metodo33Lessons = [
  {
    id: 1,
    title: 'Testemunho Pessoal',
    verse: 'Apocalipse 12:11',
    verseText: 'E eles o venceram pelo sangue do Cordeiro e pela palavra do seu testemunho; e não amaram as suas vidas, até à morte.',
    videoUrl: '',
    completed: false,
    content: `## Lição 1 — Testemunho Pessoal: O Poder de Sua História

### Introdução
Todo cristão tem uma história poderosa para contar. Seu testemunho pessoal é uma das ferramentas mais eficazes de evangelismo que Deus lhe deu. Não é necessário ser teólogo ou pastor — basta ser sincero e compartilhar o que Deus fez em sua vida. A Bíblia diz em Apocalipse 12:11 que os crentes venceram "pela palavra do seu testemunho". Sua história tem poder!

### O Modelo ANTES — COMO — DEPOIS
Uma maneira simples e clara de compartilhar seu testemunho é seguindo o modelo de três partes:

**1. ANTES — Como eu era antes de Cristo**
Descreva sua vida antes de conhecer Jesus. Fale sobre o vazio, a busca, os erros, as frustrações ou a falta de sentido. Não precisa entrar em detalhes sensacionalistas — seja honesto, mas digno. O objetivo é mostrar que havia uma necessidade real em sua vida.

**2. COMO — Como eu encontrei Cristo**
Conte o momento específico ou o processo pelo qual você decidiu entregar sua vida a Jesus. Quem foi usado por Deus? O que você ouviu, leu ou vivenciou? Foi numa igreja, numa célula, num momento de crise? Essa é a parte central do testemunho.

**3. DEPOIS — Como minha vida mudou**
Descreva as mudanças que Jesus trouxe para sua vida. Fale sobre paz, propósito, relacionamentos restaurados, libertações, nova perspectiva. As pessoas precisam ver que Jesus faz diferença real no dia a dia.

### Dicas Práticas
- Mantenha seu testemunho entre 3 e 5 minutos.
- Foque na graça de Deus, não nos seus erros.
- Use linguagem simples, evite termos religiosos difíceis.
- Termine sempre apontando para Jesus, não para você mesmo.
- Pratique sozinho antes de compartilhar com alguém.

### Exemplo de Testemunho
"Antes de Jesus, eu vivia buscando felicidade nas coisas erradas — festas, dinheiro, relacionamentos vazios. Sentia um vazio enorme que nada preenchia. Um dia, um amigo me convidou para uma célula e lá, pela primeira vez, ouvi que Deus me amava de verdade. Decidi entregar minha vida a Jesus e, desde então, encontrei um propósito de viver, paz no coração e amigos que são verdadeiramente minha família."

### Desafio
Seu testemunho é único e Deus quer usá-lo. Não subestime o poder de sua história. Milhares de pessoas podem ser alcançadas quando você simplesmente compartilha o que Deus fez em você.`,
    discussionQuestions: [
      'Como você era antes de conhecer Jesus? Quais eram suas maiores necessidades?',
      'Quem ou o que Deus usou para trazê-lo ao conhecimento de Cristo?',
      'Quais mudanças concretas Jesus trouxe para sua vida desde então?',
      'Qual é o maior desafio que você enfrenta ao compartilhar sua fé com outras pessoas?',
      'Como podemos tornar nosso testemunho mais natural no dia a dia?'
    ],
    practicalActivity: 'Escreva seu testemunho usando o modelo ANTES-COMO-DEPOIS em um papel. Compartilhe com seu discipulador ou grupo.',
    homework: 'Compartilhe seu testemunho com pelo menos uma pessoa esta semana — seja um amigo, familiar ou colega de trabalho.',
    memoryVerse: 'Apocalipse 12:11'
  },
  {
    id: 2,
    title: 'Certeza da Salvação',
    verse: '1 João 5:13',
    verseText: 'Estas coisas vos escrevi, para que saibais que tendes a vida eterna, e para que creiais no nome do Filho de Deus.',
    videoUrl: '',
    completed: false,
    content: `## Lição 2 — Certeza da Salvação: Você Pode Ter Certeza

### Introdução
Muitos crentes vivem com incerteza sobre sua salvação. Será que sou realmente salvo? Será que Deus me aceitou? A Bíblia deixa claro que podemos ter certeza absoluta. João escreveu sua carta exatamente para isso: "para que saibais que tendes a vida eterna" (1 Jo 5:13). Deus quer que você viva com confiança e paz, não com dúvida e medo.

### 5 Evidências da Salvação

**1. Você crê em Jesus Cristo como Senhor e Salvador**
A base da salvação é a fé em Jesus. João 3:16 diz: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." Crer não é apenas aceitar fatos — é confiar inteiramente em Cristo para salvação.

**2. Você ama os irmãos em Cristo**
1 João 3:14 afirma: "Nós sabemos que passamos da morte para a vida porque amamos os irmãos." O amor pelos outros crentes é um sinal claro de que o amor de Deus está em nós. Não precisamos amar perfeitamente, mas devemos ter um amor genuíno e crescente pelos irmãos.

**3. Você obedece aos mandamentos de Deus**
Jesus disse: "Se vocês me amam, guardarão os meus mandamentos" (João 14:15). A obediência não é condição para a salvação, mas é fruto dela. Um verdadeiro cristão deseja agradar a Deus e vive em obediência, mesmo que de forma imperfeita.

**4. Você busca viver uma vida santa**
1 João 3:9 diz que o que é nascido de Deus não continua pecando deliberadamente. Isso não significa perfeição, mas uma mudança de direção. O cristão verdadeiro odeia o pecado, busca confessá-lo e cresce em santidade ao longo do tempo.

**5. Você tem comunhão com Deus através da oração e da Palavra**
O cristão verdadeiro tem fome espiritual. Busca a Deus em oração, lê a Bíblia com interesse e tem um relacionamento vivo com o Pai. Essa comunhão é evidência de que você é filho de Deus.

### O Modelo A.C.T.S. de Oração
Para manter sua comunhão com Deus e crescer na certeza da salvação, use o modelo A.C.T.S. em suas orações diárias:

**A — Adoração:** Comece louvando a Deus por quem Ele é. Exalte Sua grandeza, santidade e amor.
**C — Confissão:** Confesse seus pecados e receba o perdão. 1 João 1:9 promete que Deus é fiel para perdoar.
**T — Ação de Graças:** Agradeça a Deus por suas bênçãos, grandes e pequenas.
**S — Súplica:** Apresente seus pedidos, necessidades e intercessões por outros.

### Conclusão
A salvação é baseada na obra terminada de Jesus na cruz, não em seus sentimentos ou méritos. Você pode ter certeza hoje — não porque é perfeito, mas porque Cristo é fiel e Sua Palavra é verdade.`,
    discussionQuestions: [
      'Você tem vivido com certeza ou dúvida sobre sua salvação? Por quê?',
      'Quais das 5 evidências você vê mais fortemente em sua vida?',
      'Quais das 5 evidências precisam crescer em você?',
      'Como o modelo A.C.T.S. pode transformar sua vida de oração?',
      'O que fazer quando os sentimentos dizem que você não é salvo, mas a Palavra diz que é?'
    ],
    practicalActivity: 'Escreva em seu caderno as 5 evidências da salvação e avalie honestamente cada uma delas em sua vida (nota de 1 a 10).',
    homework: 'Pratique o modelo A.C.T.S. de oração todos os dias durante esta semana e anote o que Deus falar com você.',
    memoryVerse: '1 João 5:13'
  },
  {
    id: 3,
    title: 'Perdão e Restauração',
    verse: 'Efésios 4:32',
    verseText: 'Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.',
    videoUrl: '',
    completed: false,
    content: `## Lição 3 — Perdão e Restauração: O Caminho da Cura Interior

### Introdução
O perdão é uma das áreas mais desafiadoras da vida cristã, mas também uma das mais libertadoras. Muitos crentes carregam feridas do passado, ressentimentos e mágoas que impedem seu crescimento espiritual e destroem relacionamentos. Jesus ensinou que o perdão não é uma opção — é um mandamento. Efésios 4:32 nos chama a perdoar "como também Deus vos perdoou em Cristo". O padrão é alto, mas a graça é abundante.

### Os Três Perdões Necessários

**1. Perdoar a Deus**
Muitas pessoas, sem perceber, guardam ressentimento contra Deus. Questionam: "Por que Deus permitiu isso?", "Por que não respondeu minha oração?", "Por que minha vida é tão difícil?". Deus não comete erros, mas nossa percepção dele pode ser distorcida pela dor. Perdoar a Deus não significa que Ele pecou — significa que nós escolhemos confiar que Ele é bom mesmo quando não entendemos Suas ações. Jó disse: "Ainda que ele me mate, nele esperarei" (Jó 13:15). Essa é a confiança que precisamos desenvolver.

**2. Perdoar aos Outros**
Jesus foi enfático: "Se vós não perdoardes aos homens as suas ofensas, também vosso Pai não vos perdoará as vossas" (Mateus 6:15). O perdão não é um sentimento — é uma decisão. Você pode não sentir vontade de perdoar, mas pode escolher perdoar. O perdão não significa aprovar o erro, esquecer o que aconteceu ou restabelecer confiança imediata. Significa entregar a justiça nas mãos de Deus e liberar a pessoa de sua dívida.

Passos para perdoar: (a) Reconheça a dor, (b) Decida perdoar como ato de obediência, (c) Entregue a justiça a Deus, (d) Ore pelo ofensor, (e) Repita o processo até que o ressentimento se vá.

**3. Perdoar a Si Mesmo**
Muitos crentes conseguem perdoar outros, mas não conseguem se perdoar. Vivem atormentados pela culpa do passado, repetindo mentalmente seus erros. A Bíblia diz que "não há mais condenação para os que estão em Cristo Jesus" (Romanos 8:1). Se Deus já perdoou você, quem é você para recusar esse perdão? Se per perdoar não significa justificar o pecado — significa aceitar a graça de Deus e seguir em frente.

### O Poder Libertador do Perdão
O perdão não muda o passado, mas transforma o futuro. Quando perdoamos, somos nós que somos libertados — da amargura, do ódio, do desejo de vingança. O perdão abre espaço para Deus agir em nossas vidas e restaurar o que foi perdido.

### Conclusão
O perdão é uma jornada, não um evento único. Às vezes precisamos perdoar a mesma pessoa muitas vezes até que a ferida cicatrize. Mas cada passo de obediência nos aproxima mais da liberdade plena que Cristo deseja para nós.`,
    discussionQuestions: [
      'Você guarda alguma mágoa ou ressentimento contra alguém? Como isso tem afetado sua vida?',
      'É mais difícil para você perdoar aos outros ou a si mesmo? Por quê?',
      'Você já sentiu ressentimento contra Deus por alguma situação? Como lidou com isso?',
      'Quais passos práticos você pode dar esta semana para liberar perdão?',
      'Como o perdão se relaciona com a comunhão com Deus e com o crescimento espiritual?'
    ],
    practicalActivity: 'Escreva uma carta de perdão (que não será enviada) para alguém que você precisa perdoar. Entregue a dor a Deus em oração.',
    homework: 'Identifique uma pessoa que você precisa perdoar e comece a orar por ela diariamente durante esta semana.',
    memoryVerse: 'Efésios 4:32'
  },
  {
    id: 4,
    title: 'Vida de Oração',
    verse: 'Mateus 6:9-13',
    verseText: 'Vós, pois, orareis assim: Pai nosso que estás nos céus, santificado seja o teu nome...',
    videoUrl: '',
    completed: false,
    content: `## Lição 4 — Vida de Oração: O Pai Nosso Desvendado

### Introdução
A oração é o oxigênio da alma. Sem ela, o cristão sufoca espiritualmente. Jesus ensinou aos discípulos a orar através do Pai Nosso — um modelo que continua relevante até hoje. Mateus 6:9-13 não é apenas uma oração para decorarmos, mas um padrão para nossa vida de comunhão com Deus. Vamos desvendar cada parte desta oração e aplicá-la em nossa vida diária.

### O Pai Nosso Desvendado

**"Pai nosso que estás nos céus" — RELACIONAMENTO**
Jesus nos ensina a nos dirigirmos a Deus como Pai. Essa palavra revela proximidade, intimidade e confiança. Deus não é um tirano distante — é um Pai amoroso que cuida de seus filhos. A oração começa com relacionamento, não com pedidos.

**"Santificado seja o teu nome" — ADORAÇÃO**
A oração verdadeira começa focando em Deus, não em nós mesmos. Adorar é reconhecer a grandeza, a santidade e a beleza de Deus. Quando adoramos, nossa perspectiva muda — nossos problemas parecem menores diante da grandeza de Deus.

**"Venha o teu reino, seja feita a tua vontade" — SUBMISSÃO**
Antes de apresentarmos nossa vontade, devemos submeter nossa vontade à de Deus. Essa é a parte mais difícil da oração — dizer "faça-se a Tua vontade, não a minha". A submissão é o caminho para a bênção, pois a vontade de Deus é sempre melhor que a nossa.

**"O pão nosso de cada dia nos dá hoje" — PROVISÃO**
Deus se importa com nossas necessidades diárias — alimento, moradia, saúde, trabalho. Essa parte nos ensina a depender diariamente de Deus e a confiar que Ele é nosso provedor. Não pedimos apenas para nós, mas reconhecemos que tudo vem dele.

**"Perdoa as nossas dívidas, assim como perdoamos aos nossos devedores" — CONFISSÃO E PERDÃO**
Não podemos caminhar com Deus carregando pecado não confessado. A confissão nos mantém em comunhão com o Pai. E essa parte também nos lembra que somos perdoados para perdoar — não podemos receber graça e negá-la aos outros.

**"Não nos deixes cair em tentação, mas livra-nos do mal" — PROTEÇÃO**
Deus não nos leva à tentação, mas nos guia para longe dela. Devemos pedir sabedoria para reconhecer as armadilhas do inimigo e força para resistir. O cristão sábio reconhece suas fraquezas e busca proteção divina.

**"Pois teu é o reino, o poder e a glória para sempre" — GLÓRIA**
A oração termina onde começou — com Deus. Reconhecemos que toda autoridade, poder e honra pertencem a Ele. Essa declaração nos mantém humildes e dependentes, sabendo que o propósito final de tudo é a glória de Deus.

### A Prática da Oração Diária
Estabeleça momentos fixos de oração: pela manhã (consagração), ao meio-dia (intercessão), à noite (confissão e gratidão). Use o modelo do Pai Nosso como guia, mas também ore espontaneamente. A oração é conversa, não monólogo — aprenda a ouvir a voz de Deus.

### Conclusão
A vida de oração é o coração do cristão maduro. Quanto mais oramos, mais nos parecemos com Cristo. O Pai Nosso nos ensina que a oração não é sobre repetir palavras, mas sobre transformar nosso relacionamento com Deus e nossa perspectiva da vida.`,
    discussionQuestions: [
      'Como você tem vivido sua vida de oração nos últimos meses?',
      'Qual parte do Pai Nosso é mais desafiadora para você e por quê?',
      'Por que Jesus ensinou a orar "Pai" e não "Deus onipotente" ou outro título distante?',
      'Como podemos desenvolver constância na oração quando não "sentimos" vontade?',
      'Qual a diferença entre oração e mera repetição de palavras?'
    ],
    practicalActivity: 'Ore o Pai Nosso lentamente, pausando em cada frase para meditar e aplicar. Anote o que Deus revelou.',
    homework: 'Estabeleça um horário fixo de oração diária de 15 minutos usando o modelo do Pai Nosso. Faça isso todos os dias desta semana.',
    memoryVerse: 'Mateus 6:9-13'
  },
  {
    id: 5,
    title: 'Palavra de Deus',
    verse: '2 Timóteo 3:16',
    verseText: 'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção, para a instrução na justiça.',
    videoUrl: '',
    completed: false,
    content: `## Lição 5 — Palavra de Deus: Sua Bússola para a Vida

### Introdução
A Bíblia é o manual de vida do cristão. Sem ela, andamos às cegas, sem direção nem propósito. 2 Timóteo 3:16 nos diz que "toda a Escritura é inspirada por Deus" — a palavra "inspirada" em grego (theopneustos) significa "soprada por Deus". A Bíblia não é apenas um livro antigo; é a própria Palavra viva do Criador do universo. Nela encontramos direção para cada área da vida: relacionamentos, finanças, trabalho, família, espiritualidade.

### A Autoridade da Palavra de Deus
A Bíblia tem autoridade sobre nossas vidas por três razões fundamentais. Primeiro, sua origem divina: "há quarenta anos beneficiava-me a esta nação... sendo ajudado das mãos de Deus até o dia de hoje" (Atos 24:14-15). Segundo, sua transformação: "santifica-os na verdade; a tua palavra é a verdade" (João 17:17). Terceiro, sua durabilidade: "passará o céu e a terra, mas as minhas palavras não hão de passar" (Mateus 24:35). Milhares de anos se passaram, impérios caíram, e a Bíblia continua sendo o livro mais lido e influente do mundo.

### O Método S.O.A.P. de Estudo Bíblico
Para que a Palavra de Deus realmente transforme nossa vida, precisamos de um método prático de estudo. O S.O.A.P. é uma ferramenta simples e poderosa que qualquer cristão pode usar diariamente.

**S — Scripture (Escritura):** Leia um trecho da Bíblia — pode ser um capítulo, uma passagem ou até um versículo. Escreva o versículo ou trecho que mais chamou sua atenção. A prática de escrever ajuda a fixar a Palavra no coração.

**O — Observation (Observação):** O que este texto diz? Quem está falando? Para quem está falando? Qual é o contexto? Quais são as palavras-chave? O que é explícito e o que pode ser inferido? Faça perguntas ao texto. A observação cuidadosa é a base de uma boa interpretação.

**A — Application (Aplicação):** O que este texto me diz? Como se aplica à minha vida hoje? Deus está me mostrando algo para mudar? Para confessar? Para começar? Para parar? A aplicação é onde a transformação acontece — "sedes vós os que praticam a minha palavra" (Tiago 1:22).

**P — Prayer (Oração):** Como devo orar em resposta a este texto? Peça a Deus que aplique Sua Palavra em seu coração. A oração de resposta fecha o ciclo de estudo, transformando conhecimento em comunhão.

### Erros Comuns no Estudo da Bíblia
Muitos crentes leem a Bíblia de forma superficial ou errada. Alguns erros comuns incluem: ler sem contexto (arrancar versículos isolados), ler apenas para informação e não para transformação, não aplicar o que leu, e estudar sem oração. Lembre-se: o objetivo do estudo bíblico não é conhecer mais, mas amar mais a Deus e obedecer mais a Ele.

### Conclusão
A Bíblia é lâmpada para os nossos pés e luz para o nosso caminho (Salmo 119:105). Quando dedicamos tempo diário para mergulhar na Palavra, estamos investindo em nossa vida eterna. Faça do estudo bíblico diário uma prioridade inegociável — não porque é um dever, mas porque é um privilégio ouvir a voz do próprio Deus.`,
    discussionQuestions: [
      'Como tem sido sua rotina de leitura da Bíblia? Você lê por obrigação ou por desejo?',
      'Quais são os maiores obstáculos que impedem você de estudar a Bíblia regularmente?',
      'Como o método S.O.A.P. pode ajudar a tornar seu estudo mais profundo e aplicável?',
      'Por que muitos cristãos conhecem a Bíblia mas não são transformados por ela?',
      'Qual passagem bíblica tem sido mais significativa em sua caminhada?'
    ],
    practicalActivity: 'Escolha um capítulo da Bíblia e pratique o método S.O.A.P. completo em uma folha. Compartilhe com seu grupo.',
    homework: 'Durante esta semana, estude um capítulo por dia usando o método S.O.A.P. Anote tudo em um caderno dedicado.',
    memoryVerse: '2 Timóteo 3:16'
  },
  {
    id: 6,
    title: 'Igreja em Comunhão',
    verse: 'Atos 2:42',
    verseText: 'E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações.',
    videoUrl: '',
    completed: false,
    content: `## Lição 6 — Igreja em Comunhão: Os Quatro Pilares da Igreja Primitiva

### Introdução
A igreja primitiva cresceu de forma explosiva — três mil convertidos no Dia de Pentecostes, e o crescimento continuou diariamente. Qual era o segredo? Atos 2:42 nos revela quatro pilares que sustentavam aquela comunidade de fé. Esses pilares são atemporais — se funcionaram há dois mil anos, funcionam hoje. Qualquer igreja ou célula que os adotar experimentará o mesmo poder e crescimento.

### Os Quatro Pilares da Igreja

**1. Doutrina dos Apóstolos — O Ensino da Palavra**
"E perseveravam na doutrina dos apóstolos..." O primeiro pilar é o ensino sólido da Palavra de Deus. A igreja não pode viver de emoções, experiências ou métodos — ela precisa de fundamentação doutrinária. Os apóstolos ensinavam o que Jesus lhes ensinara, e aquela igreja se dedicava ao estudo constante. Hoje, isso se manifesta na pregação fiel, nos estudos bíblicos, nos cursos de discipulado e na leitura pessoal da Bíblia. Sem a Palavra, a igreja se torna um clube social; com ela, é o poder de Deus para salvação.

**2. Comunhão — O Compartilhar da Vida**
"...e na comunhão..." A palavra "comunhão" (koinônia em grego) significa participação, partilha, intimidade. Não se trata apenas de se encontrar aos domingos — é compartilhar a vida de verdade. Os primeiros cristãos compartilhavam bens, tempo, alegrias, dores, sonhos. A comunhão verdadeira acontece quando nos abrimos uns aos outros, quando somos transparentes, quando nos importamos genuinamente. A célula é o ambiente ideal para essa comunhão profunda.

**3. Partir do Pão — A Ceia e a Recordação**
"...e no partir do pão..." Este pilar representa a adoração congregacional e, especificamente, a Santa Ceia. Ao partirem o pão, os cristãos recordavam a morte e ressurreição de Jesus. Esse pilar nos ensina a importância da adoração coletiva, dos momentos de lembrança do sacrifício de Cristo e da celebração da fé. A adoração não é apenas música — é atitude de reverência e gratidão a Deus.

**4. Orações — A Dependência de Deus**
"...e nas orações." O quarto pilar é a oração — não apenas oração individual, mas oração coletiva. A igreja primitiva orava junta, intercedia uns pelos outros, buscava a direção de Deus em comunidade. A oração congregacional tem um poder especial — "onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles" (Mateus 18:20). Uma igreja que ora é uma igreja que vence.

### O Resultado dos Pilares
Atos 2:43-47 descreve o resultado: "E em toda a alma havia temor, e muitas maravilhas e sinais eram feitos pelos apóstolos... E o Senhor lhes acrescentava todos os dias os que iam sendo salvos." Temor de Deus, unidade, generosidade, alegria, testemunho público favorável e crescimento diário. Esses são os frutos de uma igreja fundamentada nos quatro pilares.

### Conclusão
A igreja moderna muitas vezes negligencia um ou mais desses pilares. Algumas focam apenas no ensino, outras apenas na comunhão, outras apenas na adoração. Mas a igreja saudável é aquela que mantém o equilíbrio de todos os quatro: Palavra, comunhão, adoração e oração. Qual pilar precisa de mais atenção em sua vida e em sua célula?`,
    discussionQuestions: [
      'Qual dos quatro pilares é mais forte em sua vida pessoal? E qual é o mais fraco?',
      'Como você tem vivido a comunhão (koinônia) com outros crentes além do culto de domingo?',
      'Por que muitos cristãos negligenciam a participação em uma comunidade de fé?',
      'Como podemos aplicar os quatro pilares em nossa célula de forma prática?',
      'O que acontece quando um dos pilares é negligenciado? Dê exemplos.'
    ],
    practicalActivity: 'Avalie sua vida e célula em relação aos 4 pilares (nota de 1-10 em cada um). Crie um plano de ação para fortalecer o pilar mais fraco.',
    homework: 'Participe ativamente de todos os quatro pilares esta semana: estude a Bíblia, compartilhe a vida com alguém, adore em comunidade e ore em grupo.',
    memoryVerse: 'Atos 2:42'
  },
  {
    id: 7,
    title: 'Espírito Santo e Avivamento',
    verse: 'Atos 1:8',
    verseText: 'Mas recebereis poder, ao descer sobre vós o Espírito Santo, e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judéia e Samaria, e até aos confins da terra.',
    videoUrl: '',
    completed: false,
    content: `## Lição 7 — Espírito Santo e Avivamento: Receba o Poder

### Introdução
Jesus prometeu algo extraordinário aos seus discípulos antes de ascender aos céus: "Recebereis poder, ao descer sobre vós o Espírito Santo" (Atos 1:8). Essa promessa não era apenas para os discípulos — é para todo crente que deseja viver uma vida de poder e testemunho. O Espírito Santo não é uma força impessoal; é a terceira Pessoa da Trindade, nosso Consolador, Guia, Professor e Fonte de poder espiritual. Sem Ele, somos cristãos ineficazes; com Ele, somos testemunhas transformadoras.

### Quem é o Espírito Santo?
O Espírito Santo é Deus — coeterno, coexistente e coigual com o Pai e o Filho. Ele é o Paráclito, o Ajudador que Jesus enviou para estar conosco para sempre (João 14:16). Ele habita em todo crente desde o momento da conversão (Romanos 8:9), nos selando como propriedade de Deus até o dia da redenção (Efésios 1:13-14). Sua presença em nós é a garantia de nossa salvação e a fonte de nossa capacitação para viver e servir a Deus.

### Os Dons do Espírito Santo
A Bíblia menciona vários dons espirituais distribuídos pelo Espírito para edificação da igreja. Os principais grupos incluem:

**Dons de revelação:** palavra de sabedoria, palavra de conhecimento, discernimento de espíritos. Esses dons ajudam a compreender a vontade de Deus e a realidade espiritual.

**Dons de poder:** fé, dons de curas, operação de milagres. Esses dons demonstram o poder sobrenatural de Deus em circunstâncias impossíveis.

**Dons de comunicação:** profecia, variedades de línguas, interpretação de línguas. Esses dons edificam a igreja e aproximam o povo de Deus.

É importante lembrar que todos os dons vêm do mesmo Espírito e têm o mesmo propósito: edificar o corpo de Cristo (1 Coríntios 12:7).

### Os Frutos do Espírito Santo
Além dos dons, o Espírito produz em nós frutos que refletem o caráter de Cristo. Gálatas 5:22-23 lista nove frutos: "Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, domínio próprio." Dons sem frutos geram orgulho; frutos sem dons geram impotência. O cristão maduro busca desenvolver ambos — caráter e capacitação.

### O Avivamento — Quando o Espírito Move em Poder
Avivamento é um derramamento extraordinário do Espírito Santo que resulta em conversão em massa, restauração da igreja e transformação social. Ao longo da história, avivamentos como o de Wales (1904), a Grande Despertação (1730-1750) e o Dia de Pentecostes mostram o que acontece quando o Espírito se move em poder. O avivamento começa sempre com oração, arrependimento e fome por Deus.

### Como ser Cheio do Espírito Santo
Efésios 5:18 ordena: "Não vos embriagueis com vinho... mas enchei-vos do Espírito." Ser cheio do Espírito não é receber mais do Espírito, mas dar mais de nós mesmos ao Espírito. Passos práticos: (1) Confesse todo pecado, (2) Renda todo controle ao Espírito, (3) Peça ser cheio, (4) Obedeça às impressões do Espírito, (5) Cultive um relacionamento diário com Ele através da oração e da Palavra.

### Conclusão
O Espírito Santo é a pessoa mais negligenciada da Trindade na vida de muitos cristãos. Mas Ele é essencial para uma vida de poder, alegria e testemunho eficaz. Busque ser cheio do Espírito todos os dias — essa é a chave para uma vida cristã vitoriosa e para o avivamento pessoal e coletivo.`,
    discussionQuestions: [
      'Qual é sua compreensão atual sobre o Espírito Santo? Como você o relaciona em sua vida?',
      'Você já experimentou o batismo no Espírito Santo? Como foi essa experiência?',
      'Qual a diferença entre dons do Espírito e frutos do Espírito? Por que ambos são importantes?',
      'O que é avivamento e como podemos buscar um avivamento genuíno hoje?',
      'Quais são os sinais de uma pessoa que está cheia do Espírito Santo?'
    ],
    practicalActivity: 'Peça ao Espírito Santo para revelar áreas de sua vida que precisam ser entregues a Ele. Escreva e entregue em oração.',
    homework: 'Dedique 10 minutos por dia esta semana para orar em línguas (se tiver esse dom) ou para meditar na presença do Espírito Santo. Busque ser cheio dEle.',
    memoryVerse: 'Atos 1:8'
  },
  {
    id: 8,
    title: 'Santidade e Excelência',
    verse: '1 Pedro 1:15',
    verseText: 'Mas, como é santo aquele que vos chamou, sede vós também santos em toda a vossa maneira de viver.',
    videoUrl: '',
    completed: false,
    content: `## Lição 8 — Santidade e Excelência: Chamados para Ser Diferentes

### Introdução
A santidade é um dos conceitos mais mal compreendidos no cristianismo. Muitos associam santidade a tristeza, rigidez ou separação do mundo de forma negativa. Mas a Bíblia apresenta a santidade como algo belo, desejável e transformador. 1 Pedro 1:15 nos chama a ser santos "em toda a vossa maneira de viver" — isso significa que a santidade não é apenas para alguns "super-cristãos", mas é o chamado de todo aquele que segue a Jesus. Santidade é separação para Deus, não apenas separação do mundo.

### O Que é Santidade?
Santidade (hagios em grego) significa "diferente", "separado", "consagrado". No Antigo Testamento, objetos, lugares e pessoas eram santos quando eram separados para uso exclusivo de Deus. No Novo Testamento, a santidade se aplica a todo crente que é chamado a viver de forma diferente do padrão do mundo. Santidade não é perfeição imediata — é uma direção de vida. É a busca constante de parecer mais com Jesus.

**Santidade é positiva, não negativa.** Não é apenas "não fazer" coisas erradas — é "fazer" coisas certas. É viver com propósito, paixão e dedicação a Deus. É escolher o melhor em vez do bom, o eterno em vez do temporário, o espiritual em vez do carnal.

### A Base da Santidade: A Graça de Deus
A santidade nunca começa com esforço humano — começa com a graça de Deus. Deus nos santifica porque nos ama, não para que Ele nos ame. 1 Tessalonicenses 5:23-24 diz: "E o mesmo Deus de pais vos santifique... Fiel é o que vos chama." Deus é quem inicia e completa a obra de santificação em nós. Nosso papel é cooperar com o Espírito Santo, respondendo à graça com obediência.

### Santidade Prática — Áreas de Aplicação

**Santidade na moralidade:** Pureza sexual, integridade nas palavras, honestidade nos negócios. O cristão é chamado a padrões elevados em todas as áreas da vida.

**Santidade nos relacionamentos:** Amor, perdão, paciência, bondade. Tratar as pessoas com o mesmo amor que Deus nos tratou.

**Santidade no uso do tempo:** Administrar bem o tempo que Deus nos deu. Cada dia é um dom que devemos usar para a glória de Deus.

**Santidade nos pensamentos:** Filtrar o que entra em nossa mente através da TV, internet, redes sociais e conversas. Romanos 12:2 nos chama a renovar nossa mente.

### Excelência: A Expressão da Santidade
A excelência é a aplicação prática da santidade em tudo que fazemos. Colossenses 3:23 diz: "E tudo quanto fizerdes, fazei-o de todo o coração, como para o Senhor e não para homens." O cristão deve buscar a excelência no trabalho, nos estudos, no ministério, nos relacionamentos. Fazemos tudo como se fosse para Deus — porque de fato é.

### Conclusão
A santidade não é alcançável pela força própria — é obra do Espírito Santo em nós. Mas precisamos cooperar, criando ambientes que favoreçam o crescimento espiritual e eliminando o que nos afasta de Deus. Busque a santidade não por medo ou obrigação, mas por amor a Deus. "Sede santos, porque eu sou santo" (1 Pedro 1:16).`,
    discussionQuestions: [
      'Qual é a diferença entre santidade e perfeição? Por que muitos cristãos confundem os dois?',
      'Em que áreas da sua vida você sente maior necessidade de crescer em santidade?',
      'Como a graça de Deus se relaciona com a busca pela santidade?',
      'O que significa buscar excelência "como para o Senhor" em seu trabalho ou estudos?',
      'Como podemos criar hábitos que promovam santidade sem cair em legalismo?'
    ],
    practicalActivity: 'Identifique 3 áreas de sua vida onde a santidade precisa crescer. Escreva passos práticos de mudança para cada uma.',
    homework: 'Durante esta semana, antes de cada decisão, pergunte-se: "Isso me aproxima de Deus ou me afasta?" Anote suas observações.',
    memoryVerse: '1 Pedro 1:15'
  },
  {
    id: 9,
    title: 'Multiplicação',
    verse: 'Mateus 28:18-20',
    verseText: 'E Jesus, aproximando-se, falou-lhes, dizendo: É-me dado todo o poder no céu e na terra. Ide, portanto, fazei discípulos de todas as nações...',
    videoUrl: '',
    completed: false,
    content: `## Lição 9 — Multiplicação: O Método 3/3 Explicado

### Introdução
A Grande Comissão é o mandamento mais importante que Jesus deixou à igreja: "Ide, portanto, fazei discípulos de todas as nações" (Mateus 28:19). Jesus não nos pediu para fazer converts — ele nos mandou fazer discípulos. A diferença é fundamental: convertidos param em si mesmos; discípulos fazem outros discípulos. O Método 3/3 é uma ferramenta simples, reproduzível e bíblica para cumprir essa comissão. Ele funciona em qualquer lugar, com qualquer pessoa, sem necessidade de recursos sofisticados.

### O Que é o Método 3/3?
O Método 3/3 é um formato de reunião que divide o tempo em três partes iguais, projetado para ensinar, praticar e obedecer à Palavra de Deus de forma participativa. Cada parte dura aproximadamente um terço do tempo total da reunião — daí o nome "3/3". O objetivo não é apenas transmitir informação, mas formar discípulos que obedecem e multiplicam.

### A Primeira Parte: CUIDADO — Olhar para Trás
A primeira terça parte é dedicada ao cuidado mútuo. Cada pessoa compartilha como foi sua semana, quais foram os desafios e as vitórias. O líder pergunta especificamente sobre a tarefa que foi dada na semana anterior — se a pessoa cumpriu o desafio de aplicar o que aprendeu. Esse momento promove comunhão, accountability (responsabilidade mútua) e um ambiente de confiança. Não se trata de julgamento, mas de encorajamento.

Também nesta parte, revisamos o versículo de memória da semana anterior. A memorização da Palavra é crucial para que o discípulo tenha recursos espirituais disponíveis a qualquer momento.

### A Segunda Parte: CULTIVO — Olhar para Cima
A segunda terça parte é o momento do ensino. Não é uma pregação monólogada, mas um estudo participativo. O líder apresenta o conteúdo bíblico da lição e o grupo discute, faz perguntas, compartilha insights. O foco está na aplicação prática — "como isso se aplica à minha vida hoje?"

Durante este tempo, o grupo também medita no versículo chave da semana, garantindo que cada pessoa entenda e internalize a verdade bíblica. O objetivo não é acumular conhecimento, mas ser transformado pela Palavra.

### A Terceira Parte: COMPARTILHAMENTO — Olhar para Fora
A terceira e última parte é a mais importante: a prática. Sem prática, não há discipulado — há apenas informação. Neste momento, o grupo pratica o que aprendeu. Pode ser através de um exercício de evangelismo, de um momento de oração prática, ou de um desafio específico de aplicação.

O líder pergunta: "Com quem você vai compartilhar o que aprendeu esta semana?" e "Qual pessoa não crente você vai alcançar?" Cada pessoa sai da reunião com uma tarefa clara para a semana seguinte — um "dever de casa" espiritual.

### O Princípio da Multiplicação
O Método 3/3 é projetado para multiplicação. Quando um discípulo completa as 9 lições, ele está pronto para começar a discipular outra pessoa. Ele não precisa ser pastor ou teólogo — precisa apenas ser fiel no que aprendeu. Assim, um discípulo faz outro discípulo, que faz outro, e o crescimento é exponencial.

### Conclusão
O Método 3/3 não é uma fórmula mágica — é uma ferramenta simples para cumprir o maior mandamento de Jesus. Cada cristão é chamado a ser um discipulador. Você não precisa esperar ser "perfeito" — comece onde está, com o que tem, e Deus multiplicará. O reino de Deus avança quando discípulos fiéis se multiplicam. Agora é sua vez: quem você vai discipular?`,
    discussionQuestions: [
      'Qual a diferença entre fazer convertidos e fazer discípulos? Por que Jesus mandou o segundo?',
      'Qual das três partes do Método 3/3 (Cuidado, Cultivo, Compartilhamento) é mais desafiadora para você?',
      'Por que a prática (terceira parte) é essencial no discipulado?',
      'Com quem você pode começar a compartilhar o que aprendeu neste curso?',
      'O que impede muitos cristãos de discipular outros? Como superar esses obstáculos?'
    ],
    practicalActivity: 'Identifique 3 pessoas que você pode começar a discipular usando o Método 3/3. Ore por elas e faça o primeiro convite.',
    homework: 'Compartilhe o resumo desta lição com pelo menos uma pessoa esta semana e convide-a para iniciar um grupo de discipulado.',
    memoryVerse: 'Mateus 28:18-20'
  },
]

// ============================================================
// CURSO: Lideres de Celulas — 12 Aulas
// ============================================================
export const lideresLessons = [
  {
    id: 1,
    title: 'A Visao da Celula',
    verse: 'Atos 2:42-47',
    verseText: 'E perseveravam na doutrina dos apostolos, e na comunhao, e no partir do pao, e nas oracoes.',
    videoUrl: '',
    completed: false,
    content: `## Aula 1 — A Visao da Celula: Pequenos Grupos, Grande Impacto

### Introducao
A celula nao e apenas um grupo pequeno que se reune semanalmente. Ela e a expressao viva da igreja no coracao da comunidade. A visao da celula nasce do proprio modelo de Jesus, que escolheu doze homens para viverem em comunhao profunda com Ele. Quando compreendemos a visao correta, a celula deixa de ser uma atividade mais na agenda e se torna um estilo de vida centrado em discipulado, comunhao e multiplicacao.

### O Modelo Biblico da Celula
A igreja do Novo Testamento cresceu atraves de pequenos grupos que se reuniam nas casas. Atos 2:46 diz que os crentes "de casa em casa... partiam o pao". Paulo saudava as "igrejas que se reunem nas casas" (Romanos 16:5). O modelo da celula nao e uma invencao moderna — e um retorno as raizes da igreja primitiva. A celula e o lugar onde a igreja "acontece" de verdade.

### O Que E Uma Celula?
Uma celula e um grupo de 6 a 15 pessoas que se reune regularmente com o proposito de evangelizar, edificar e multiplicar. E uma comunidade de fe onde cada membro e valorizado, cuidado e encorajado a crescer espiritualmente. A celula e o ambiente ideal para o discipulado, a cura interior, o desenvolvimento de lideres e a alcance de pessoas que nao frequentariam uma igreja tradicional.

### Os Tres Propositos da Celula
**1. Evangelismo:** A celula e a melhor ferramenta para alcancar pessoas fora da igreja. E menos intimidante que um culto publico e mais pessoal.
**2. Edificacao:** Membros sao edificados atraves do ensino, comunhao, adoracao e oracao mútua.
**3. Multiplicacao:** Uma celula saudavel cresce e se divide, formando novas celulas e novos lideres.

### A Visao do Seu Lider
Como lider de celula, voce e mais do que um coordenador de reunioes. Voce e um pastor, um discipulador, um visionario. Deus colocou em suas maos o cuidado de ovelhas preciosas. Sua celula pode ser o meio pelo qual Deus transforma familias, liberta viciados, cura feridas e salva vidas. Nao subestime o poder de um pequeno grupo de pessoas comprometidas com Deus e umas com as outras.`,
    discussionQuestions: [
      'Qual e a sua compreensao atual sobre o proposito de uma celula?',
      'Por que o modelo de pequenos grupos e tao eficaz para o discipulado?',
      'Quais diferencas voce ve entre uma celula saudavel e um simples grupo de estudo?',
      'Como a visao da celula se conecta com a Grande Comissao de Jesus?'
    ],
    practicalActivity: 'Escreva em uma frase a visao da sua celula. Compartilhe com o grupo e discuta como essa visao pode se tornar realidade.',
    homework: 'Leia Atos 2:42-47 e anote todas as caracteristicas da igreja primitiva que podem ser aplicadas na sua celula.',
    memoryVerse: 'Atos 2:42'
  },
  {
    id: 2,
    title: 'O Carater do Lider',
    verse: '1 Timoteo 3:1-7',
    verseText: 'Fiel e esta palavra: Se alguem deseja o episcopado, excelente obra deseja.',
    videoUrl: '',
    completed: false,
    content: `## Aula 2 — O Carater do Lider: Quem Voce E Importa Mais do Que o Que Voce Faz

### Introducao
O lider de celula nao e escolhido por suas habilidades tecnicas, carisma ou conhecimento teologico. O principal requisito para lideranca crista e o carater. 1 Timoteo 3 lista qualidades como irrepreensibilidade, sobriedade, temperanca, hospitalidade, aptidao para ensinar — todas relacionadas ao ser, nao ao fazer. Antes de liderar outros, voce precisa ser uma pessoa que reflete a Cristo em seu carater.

### Carater vs. Carisma
Muitos lideres confundem carisma com carater. Carisma e um dom natural — a capacidade de atrair pessoas, de falar bem, de ser carismatico. Carater e a maturidade espiritual que se desenvolve atraves do tempo, obediencia e intimidade com Deus. Carisma pode atrair pessoas, mas carater as mantem. Carisma pode iniciar um ministerio, mas carater o sustenta. Um lider sem carater eventualmente caira, e quando cair, levara muitos consigo.

### Qualidades Essenciais do Lider de Celula
**Integridade:** Coerencia entre o que se diz e o que se faz. O lider e o mesmo em publico e em privado.
**Humildade:** Reconhecer que e um servo, nao um superstar. O maior lider e aquele que mais serve.
**Autocontrole:** Dominio proprio nas emocoes, palavras e acoes. O lider nao explode, nao ofende, nao age por impulso.
**Hospitalidade:** Receber pessoas de bracos abertos, criando um ambiente acolhedor e seguro.
**Compaixao:** Sentir o que os membros sentem, chorar com quem chora, alegrar-se com quem se alegra.
**Fidelidade:** Constancia no compromisso, mesmo quando e dificil. O lider nao desiste facilmente.

### O Desenvolvimento do Carater
O carater nao se desenvolve da noite para o dia. E um processo de toda a vida que envolve: (1) Tempo diario com Deus em oracao e Palavra, (2) Accountability com um mentor ou supervisor, (3) Disposicao para ser corrigido e ensinado, (4) Transparencia sobre falhas e lutas, (5) Pratica constante de valores cristaos nas pequenas coisas do dia a dia.

### Conclusao
Lembre-se: voce nao esta liderando por seus proprios meritos, mas pela graca de Deus. Seja fiel no pouco e Deus confiara o muito. Seu carater e sua credencial mais importante como lider.`,
    discussionQuestions: [
      'Qual e a diferenca entre carater e carisma? Por que o primeiro e mais importante?',
      'Quais qualidades de 1 Timoteo 3 voce ve como mais fortes em sua vida?',
      'Quais areas do seu carater precisam de desenvolvimento urgente?',
      'Como voce pode cultivar accountability em sua vida de lideranca?'
    ],
    practicalActivity: 'Faca uma autoavaliacao honesta das qualidades de 1 Timoteo 3. Identifique 2 areas para trabalhar nos proximos 30 dias.',
    homework: 'Peca a uma pessoa de confianca para avaliar seu carater e apontar areas cegas que voce nao ve.',
    memoryVerse: '1 Timoteo 3:1'
  },
  {
    id: 3,
    title: 'O Chamado e os Dons do Lider',
    verse: 'Efesios 4:11-12',
    verseText: 'E ele mesmo concedeu uns para apostolos, e outros para profetas, e outros para evangelistas, e outros para pastores e mestres.',
    videoUrl: '',
    completed: false,
    content: `## Aula 3 — O Chamado e os Dons do Lider: Equipado por Deus

### Introducao
Liderar uma celula nao e uma ocupacao qualquer — e um chamado de Deus. Quando Deus chama alguem para a lideranca, Ele tambem equips essa pessoa com dons e habilidades necessarias para cumprir sua missao. Efesios 4:11-12 diz que Cristo deu dons de lideranca a igreja "para o aperfeicoamento dos santos". Como lider de celula, voce foi dado por Deus a sua celula como um presente. Seu papel e equipar os membros para a obra do ministerio.

### Como Reconhecer Seu Chamado
O chamado para lideranca geralmente se manifesta atraves de: (1) Um desejo crescente por Deus e por Seu povo, (2) O reconhecimento de lideres mais maduros que confirmam suas potencialidades, (3) A abertura de oportunidades para servir e liderar, (4) Fruto no ministerio — pessoas sao alcancadas, edificadas e transformadas atraves de sua vida. Se voce sente esse desejo e ve esses sinais, Deus provavelmente o esta chamando.

### Os Cinco Ministerios de Efesios 4
**Apostolo:** Pioneiro, fundador, visionario que abre novos campos.
**Profeta:** Quem ouve a voz de Deus e traz revelacao, exortacao e edificacao.
**Evangelista:** Quem tem paixao por almas e habilidade para alcancar nao-crentes.
**Pastor:** Quem cuida, protege, aconselha e guia o rebanho.
**Mestre:** Quem ensina a Palavra de forma clara e aplicavel.

Voce pode ter um ou mais desses dons em operacao. Identifique seus dons principais e desenvolva-os, mas tambem trabalhe em areas que nao sao suas fortalezas.

### Dons Espirituais em Operacao
Alem dos ministerios de Efesios 4, o Espirito Santo distribui dons espirituais a todos os crentes (1 Corintios 12, Romanos 12). Como lider, identifique os dons dos membros de sua celula e os posicione para servir segundo suas habilidades. Alguem com don de hospitalidade pode receber as visitas; alguem com don de ensino pode liderar estudos; alguem com don de fe pode interceder.

### Conclusao
Voce foi chamado e equipado por Deus. Nao confie apenas em seus dons naturais, mas busque ser cheio do Espirito Santo a cada dia. O ministerio que depende apenas de habilidade humana frustra; o que depende do Espirito frutifica.`,
    discussionQuestions: [
      'Como voce percebeu seu chamado para lideranca? Quais foram os sinais?',
      'Quais dos cinco ministerios de Efesios 4 voce identifica mais em sua vida?',
      'Como voce pode identificar e desenvolver os dons dos membros de sua celula?',
      'Qual a diferenca entre confiar em dons naturais e depender do Espirito Santo?'
    ],
    practicalActivity: 'Faca um teste de dons espirituais (online ou fornecido pela igreja). Discuta os resultados com seu supervisor.',
    homework: 'Identifique um membro de sua celula que tem um don especifico e o encoraje a usa-lo esta semana.',
    memoryVerse: 'Efesios 4:12'
  },
  {
    id: 4,
    title: 'Conduzindo o 4Ws',
    verse: 'Hebreus 10:24-25',
    verseText: 'E consideremo-nos uns aos outros, para nos estimularmos ao amor e as boas obras, nao deixando a nossa congregacao.',
    videoUrl: '',
    completed: false,
    content: `## Aula 4 — Conduzindo o 4Ws: Uma Reuniao que Transforma Vidas

### Introducao
O 4Ws e um formato simples e poderoso para conduzir reunioes de celula. Cada "W" representa uma parte essencial da reuniao: **W**elcome (Bem-vindo), **W**orship (Adoracao), **W**ord (Palavra) e **W**orks (Obras/Oração/Testemunho). Esse modelo garante que cada reuniao seja equilibrada, participativa e focada em transformacao, nao apenas em informacao. Uma reuniao bem conduzida deixa os membros edificados, encorajados e desafiados a viver a fe no dia a dia.

### 1. Welcome — Acolhida (15-20 minutos)
A acolhida e o momento de quebrar o gelo e criar conexao. Comece com um lanche simples, conversas descontraidas e uma dinamica que faca todos se sentirem a vontade. A acolhida nao e perda de tempo — ela constroi relacionamento. Pergunte sobre a semana de cada um, celebre aniversarios, comemore conquistas. Um ambiente acolhedor e essencial para que as pessoas se abram durante o restante da reuniao.

### 2. Worship — Adoracao (15-20 minutos)
A adoracao nao precisa ser sofisticada. Duas ou tres musicas simples, cantadas com coracao, sao suficientes. O lider pode tocar violao, usar um celular com playback, ou ate cantar sem instrumento. O importante e que todos participem e que a atencao se direcione a Deus. A adoracao prepara os coracoes para receber a Palavra. Inclua tambem um momento breve de louvor e gratidao espontanea.

### 3. Word — Palavra (30-40 minutos)
Este e o momento do ensino. Use o Metodo 3/3 ou faca um estudo biblico participativo. O lider nao deve monopolizar a palavra — faca perguntas que estimulem a participacao. Aplique a verdade a vida pratica dos membros. O objetivo nao e apenas informar, mas transformar. Termine com uma aplicacao clara e desafiadora para a semana.

### 4. Works — Obras/Compromisso (15-20 minutos)
A ultima parte e a mais importante: a pratica. Faca perguntas como: "Com quem voce vai compartilhar o que aprendeu?", "Qual pessoa voce vai alcancar esta semana?", "Como vamos orar uns pelos outros?". Ore uns pelos outros, pelas necessidades do grupo e pelas pessoas que ainda nao conhecem Jesus. Termine com um compromisso de acao para a semana seguinte.

### Conclusao
O 4Ws e flexivel — pode ser adaptado ao contexto da sua celula. O importante e manter o equilibrio entre comunhao, adoracao, ensino e pratica. Uma reuniao que tem apenas Palavra se torna aula; apenas comunhao se torna festa; apenas oracao se torna monotona. O equilibrio e a chave.`,
    discussionQuestions: [
      'Qual das quatro partes do 4Ws e mais desafiadora para voce conduzir? Por que?',
      'Como voce pode tornar a acolhida mais significativa em sua celula?',
      'Quais sao os erros comuns na hora de ministrar a Palavra na celula?',
      'Por que a parte de "obras" e essencial para uma reuniao completa?'
    ],
    practicalActivity: 'Planeje uma reuniao completa usando o 4Ws. Escreva o roteiro e divida responsabilidades entre os membros.',
    homework: 'Na proxima reuniao, experimente um novo elemento em uma das quatro partes do 4Ws e avalie os resultados.',
    memoryVerse: 'Hebreus 10:24'
  },
  {
    id: 5,
    title: 'Facilitando Discussao Biblica',
    verse: 'Neemias 8:8',
    verseText: 'E liam no livro, na lei de Deus, distinctamente, e lhe davam a entender, e faziam compreender a leitura.',
    videoUrl: '',
    completed: false,
    content: `## Aula 5 — Facilitando Discussao Biblica: Mais que uma Palestra

### Introducao
A diferenca entre uma boa celula e uma excelente celula esta frequentemente na qualidade da discussao biblica. O lider nao e um palestrante, mas um facilitador. Seu papel nao e transmitir informacao, mas ajudar as pessoas a descobrirem a verdade por si mesmas. Jesus frequentemente ensinava atraves de perguntas, parabolas e dialogo. Quando os membros participam ativamente, a Palavra se torna viva e aplicavel.

### O Papel do Facilitador
Um facilitador de discussao biblica tem tres funcoes principais: **(1) Guiar** — conduzir a conversa mantendo o foco no tema, **(2) Estimular** — fazer perguntas que provoquem reflexao profunda, **(3) Sintetizar** — resumir os aprendizados e conectar com a aplicacao pratica. O facilitador nao precisa ser um erudito biblico, mas precisa estar preparado e orar antes de liderar a discussao.

### Tipos de Perguntas que Transformam
**Perguntas de observacao:** "O que este texto diz? Quem sao os personagens? Qual o contexto?"
**Perguntas de interpretacao:** "O que este texto significa? Quais principios podemos extrair?"
**Perguntas de aplicacao:** "Como isso se aplica a sua vida hoje? O que voce vai fazer diferente?"
**Perguntas de compartilhamento:** "Alguem ja vivenciou algo semelhante? Como Deus o ajudou?"

### Erros Comuns a Evitar
- Monopolizar a fala: o lider deve falar menos e ouvir mais.
- Dar respostas prontas: deixe o grupo descobrir as verdades.
- Julgar contribuicoes: todas as respostas devem ser valorizadas.
- Desviar do assunto: mantenha o foco com gentileza.
- Ignorar pessoas timidas: crie oportunidades para todos participarem.

### Ferramentas Praticas
Use mapas mentais na parede, peca para membros lerem diferentes versoes do texto, divida o grupo em duplas para discutir, use ilustracoes e historias do dia a dia. Varie os metodos para manter o interesse e envolver diferentes estilos de aprendizado.

### Conclusao
Uma discussao biblica bem facilitada deixa os membros nao apenas mais informados, mas mais transformados. Pratique a arte de fazer boas perguntas — ela e a chave para um estudo biblico vivo e participativo.`,
    discussionQuestions: [
      'Qual a diferenca entre ensinar e facilitar uma discussao?',
      'Como voce pode envolver pessoas timidas nas discussoes da celula?',
      'Quais tipos de perguntas geram as melhores discussoes em grupo?',
      'Como lidar com uma resposta incorreta ou incompleta de um membro sem constrange-lo?'
    ],
    practicalActivity: 'Prepare 8 perguntas (2 de cada tipo) sobre um texto biblico curto. Pratique a facilitacao com um amigo.',
    homework: 'Na proxima reuniao, tente falar menos e fazer mais perguntas. Avalie o nivel de participacao do grupo.',
    memoryVerse: 'Neemias 8:8'
  },
  {
    id: 6,
    title: 'Evangelismo na Celula',
    verse: 'Romanos 1:16',
    verseText: 'Porque nao me envergonho do evangelho, porque e o poder de Deus para a salvacao de todo aquele que cre.',
    videoUrl: '',
    completed: false,
    content: `## Aula 6 — Evangelismo na Celula: A Celula como Ferramenta de Alcance

### Introducao
A celula existe nao apenas para os membros atuais, mas para alcançar aqueles que ainda nao conhecem Jesus. A celula e a estrategia evangelistica mais eficaz da igreja porque combina relacionamento com mensagem. Pessoas nao se convertem por argumentos teologicos — se convertem porque sentem amor, aceitacao e pertencimento. A celula oferece exatamente isso. Romanos 1:16 lembra que o evangelho e poder de Deus para salvacao. Nossa tarefa e apresenta-lo de forma clara e amorosa.

### O Relacional como Base do Evangelismo
O evangelismo mais eficaz e o relacional. Jesus chamou discipulos atraves de relacionamento; a igreja primitiva cresceu porque "agradava ao povo" (Atos 2:47). Antes de compartilhar a mensagem, precisamos construir pontes de relacionamento. Conheca seus vizinhos, colegas de trabalho, comerciantes locais. Demonstre interesse genuino, ouca com atencao e esteja presente nos momentos de necessidade. O relacionamento abre o coracao para a mensagem.

### Estrategias Evangelisticas para Celulas
**Eventos de alcance:** Festas, churrasco, noite de jogos, cafe da manha — eventes sociais onde nao-crentes se sintam a vontade.
**Testemunhos pessoais:** Convide um membro para compartilhar sua historia de vida de forma natural.
**Servico a comunidade:** Projetos sociais que demonstram o amor de Deus em acoes: distribuicao de cestas basicas, mutiroes de limpeza, visitas a orfanatos.
**Convite pessoal:** O metodo mais eficaz de todos. Convide alguem pessoalmente para a celula. Um convite sincero vale mais que mil panfletos.

### Como Compartilhar o Evangelho de Forma Natural
Nao precisa ser um sermao formal. Compartilhe seu testemunho, conte o que Deus tem feito, explique o que a fe significa para voce. Use ferramentas simples como os "4 pontos evangelisticos" ou desenhe a historia da redencao. O importante e ser natural e sincero. O Espirito Santo e quem convence — voce e apenas o mensageiro.

### Trabalhando com Novos Convertidos
Quando alguem aceita Jesus na celula, celebre! Mas nao pare ai. O novo convertido precisa ser discipulado imediatamente. Designe um membro mais maduro para acompanha-lo. Inclua-o nas atividades, responda suas duvidas e ajude-o a dar os primeiros passos na fe.

### Conclusao
A celula que nao evangeliza esta fadada ao estagnamento. A celula que alcanca vidas cresce, se multiplica e se renova. Faca do evangelismo uma prioridade em sua celula — ore por pessoas nao-crentes regularmente e crie oportunidades para alcanca-las.`,
    discussionQuestions: [
      'Por que o evangelismo relacional e mais eficaz que o evangelismo de massa?',
      'Quais pessoas nao-crentes voce ja tem relacionamento que podem ser convidadas?',
      'Como podemos criar eventos de alcance sem parecer que so queremos "converter" pessoas?',
      'Como cuidar de um novo convertido para que nao se sinta perdido ou abandonado?'
    ],
    practicalActivity: 'Faca uma lista de 10 pessoas nao-crentes que voce conhece. Comece a orar por elas diariamente.',
    homework: 'Convide uma pessoa nao-crente para um evento ou reuniao da celula esta semana.',
    memoryVerse: 'Romanos 1:16'
  },
  {
    id: 7,
    title: 'Pastoreio e Cuidado Pastoral',
    verse: '1 Pedro 5:2-3',
    verseText: 'Apascentai o rebanho de Deus que esta entre vos, nao por forca, mas voluntariamente; nem por torpe ganancia, mas de animo pronto.',
    videoUrl: '',
    completed: false,
    content: `## Aula 7 — Pastoreio e Cuidado Pastoral: Cuidando das Ovelhas

### Introducao
O lider de celula e, antes de tudo, um pastor. Nao no sentido oficial de titulo, mas no sentido de funcao. Voce foi colocado por Deus para cuidar de um pequeno rebanho — as pessoas que Ele confiou as suas maos. 1 Pedro 5:2-3 exorta os presbiteros a "apascentar o rebanho... nao por forca, mas voluntariamente". O cuidado pastoral nao pode ser obrigatorio — precisa vir do coracao, motivado por amor genuino.

### O Que E Cuidado Pastoral?
Cuidado pastoral e o acompanhamento integral das pessoas sob sua responsabilidade. Vai muito alem de conduzir reunioes semanais. E saber como cada pessoa esta, conhecer suas lutas, celebrar suas vitorias, interceder por suas necessidades. E estar presente nos momentos dificeis: doenca, luto, crise conjugal, perda de emprego. O pastor que so aparece na reuniao nao e pastor — e apenas coordenador.

### As Nove Areas do Cuidado Pastoral
Um cuidado pastoral completo abrange: **(1) Espiritual** — crescimento na fe, **(2) Emocional** — saude mental e equilibrio, **(3) Relacional** — relacionamentos familiares e amizades, **(4) Profissional** — carreira e trabalho, **(5) Financeira** — administracao dos recursos, **(6) Fisica** — saude do corpo, **(7) Social** — integracao na comunidade, **(8) Ministerial** — desenvolvimento de dons, **(9) Missional** — alcance de outras pessoas.

### Visitas Pastorais
As visitas sao uma ferramenta poderosa de cuidado. Visite membros que faltaram a reuniao — nao para cobrar, mas para demonstrar que sentiram falta. Visite quem esta doente ou hospitalizado. Visite familias em momentos de crise. Uma visita simples diz mais que mil palavras: "voce e importante para nos". Planeje visitar pelo menos um membro por semana fora do horario da reuniao.

### Conselho Biblico
O lider de celula frequentemente e procurado para conselhos. Esteja preparado para oferecer orientacao baseada na Palavra. Estude temas como: casamento, educacao de filhos, finanças, lideranca, relacionamentos. Quando nao souber a resposta, seja honesto e procure ajuda de pastores ou lideres mais experientes. Nao tente resolver problemas que estao alem de sua competencia — encaminhe para aconselhamento profissional quando necessario.

### Conclusao
O cuidado pastoral e a parte mais gratificante do ministerio. Ver uma pessoa restaurada, um casamento salvo, uma vida transformada — nao ha recompensa maior. Seja um pastor de coracao, nao de titulo. Suas ovelhas precisam de voce.`,
    discussionQuestions: [
      'Qual e a diferenca entre liderar uma reuniao e pastorear pessoas?',
      'Como voce pode melhorar o cuidado pastoral em sua celula praticamente?',
      'Quais membros de sua celula precisam de atencao especial neste momento?',
      'Como balancear o cuidado pastoral com as outras responsabilidades da vida?'
    ],
    practicalActivity: 'Faca uma ficha pastoral basica para cada membro de sua celula: dados pessoais, necessidades, dons, situacao espiritual.',
    homework: 'Visite pelo menos um membro de sua celula esta semana em sua casa ou local de trabalho. Demonstre cuid genuino.',
    memoryVerse: '1 Pedro 5:2'
  },
  {
    id: 8,
    title: 'Multiplicacao: Quando e Como Dividir',
    verse: 'Joao 15:1-2',
    verseText: 'Eu sou a videira verdadeira, e meu Pai e o lavrador. Toda a vara em mim que nao da fruto, a tira; e limpa toda aquela que da fruto, para que de mais fruto.',
    videoUrl: '',
    completed: false,
    content: `## Aula 8 — Multiplicacao: Quando e Como Dividir a Celula

### Introducao
A multiplicacao e o objetivo final de toda celula saudavel. Uma celula que nao se multiplica esta desobedecendo ao mandamento de Jesus de "fazer discipulos". Joao 15:2 diz que Deus "limpa toda a vara que da fruto, para que de mais fruto". A poda da multiplicacao pode parecer dolorosa no momento, mas e necessaria para o crescimento. Dividir uma celula nao e um fracasso — e um sucesso! Significa que a obra esta crescendo.

### Quando Multiplicar?
Uma celula deve considerar a multiplicacao quando: **(1)** Atinge 12-15 membros regularmente — grupos maiores perdem a intimidade; **(2)** Ha pelo menos um assistente/co-lider preparado; **(3)** Existem 2-3 novos lideres em treinamento; **(4)** A celula tem consciencia missionaria e desejo de alcancar novas pessoas; **(5)** O lider sente direcao de Deus e confirmaacao da lideranca.

### Como Preparar a Multiplicacao
A multiplicacao comeca no primeiro dia, nao no ultimo. Desde o inicio, o lider deve estar desenvolvendo novos lideres. Identifique pessoas com potencial, de responsabilidades pequenas, acompanhe de perto. Quando a celula chegar a 8-10 pessoas, comece a falar abertamente sobre a visao de multiplicacao. A multiplicacao nao deve ser uma surpresa — todos devem entender e abracar a visao.

### O Processo de Divisao
**1. Comunicacao:** Converse com a lideranca da igreja sobre a decisao.
**2. Preparacao:** Treine o novo lider ate que esteja pronto para assumir.
**3. Transicao:** Faca reunioes conjuntas por 2-4 semanas antes da separacao.
**4. Celebracao:** Celebre a multiplicacao como uma vitoria! Nao como uma perda.
**5. Acompanhamento:** Acompanhe a nova celula nas primeiras semanas.

### Superando a Resistencia a Multiplicacao
Muitos membros resistem a multiplicacao por medo, apego ou comodidade. Alguns dizem: "Nosso grupo e uma familia, nao podemos nos separar". Explique que familias crescem e se multiplicam — e exatamente isso que esta acontecendo. Incentive os membros a ver a multiplicacao como um ato de obediencia e amor por aqueles que ainda nao foram alcancados.

### Conclusao
A multiplicacao e o sinal de saude de uma celula. Cada nova celula e uma nova oportunidade de alcancar um bairro, uma familia, uma comunidade. Nao guarde a luz so para voce — multiplique-a! O reino de Deus cresce quando celulas se multiplicam.`,
    discussionQuestions: [
      'Por que muitas celulas resistem a multiplicacao? Quais sao os medos envolvidos?',
      'Como preparar uma celula para a multiplicacao desde o inicio?',
      'Quais sao os sinais de que uma celula esta pronta para se multiplicar?',
      'Como acompanhar uma nova celula nas primeiras semanas apos a divisao?'
    ],
    practicalActivity: 'Faca um plano de multiplicacao para sua celula: identifique o novo lider, a data estimada e os passos necessarios.',
    homework: 'Converse com cada membro sobre a visao de multiplicacao e ouca suas perguntas e receios.',
    memoryVerse: 'Joao 15:2'
  },
  {
    id: 9,
    title: 'Resolvendo Conflitos',
    verse: 'Mateus 18:15-17',
    verseText: 'Se teu irmao pecar contra ti, vai, e repreende-o entre ti e ele so; se te ouvir, ganhaste teu irmao.',
    videoUrl: '',
    completed: false,
    content: `## Aula 9 — Resolvendo Conflitos: A Arte da Conciliacao

### Introducao
Conflitos sao inevitaveis em qualquer grupo de pessoas. A celula nao e excecao. O que diferencia uma celula saudavel de uma doente nao e a ausencia de conflitos, mas a maneira como os resolve. Mateus 18:15-17 apresenta o modelo biblico de resolucao de conflitos: privado, respeitoso, progressivo e redentivo. Como lider, voce precisa estar preparado para mediar conflitos de forma sabia e amorosa.

### Por Que os Conflitos Acontecem?
Os conflitos em celulas geralmente surgem de: **(1)** Mal-entendidos de comunicacao; **(2)** Expectativas nao cumpridas; **(3)** Diferencas de personalidade; **(4)** Ciumes ou rivalidade; **(5)** Pecados nao confessados; **(6)** Lideranca autoritaria ou negligente; **(7)** Pessoas problematicas que perturbam a harmonia. Identificar a causa raiz e essencial para resolver o conflito de forma duradoura.

### O Modelo de Mateus 18
**Passo 1 — Conversa privada:** Va sozinho, fale com amor, nao acuse. O objetivo nao e vencer, e ganhar seu irmao.
**Passo 2 — Duas ou tres testemunhas:** Se nao resolver, leve testemunhas maduras para ajudar na mediacao.
**Passo 3 — Leve a igreja:** Se persistir, envolva a lideranca pastoral da igreja.
**Passo 4 — Como gentio:** Se nada funcionar, ameace excluir do grupo (usado apenas em ultimo caso).

### Principios para Mediadores
Como lider, voce frequentemente sera o mediador. Lembre-se: **(1)** Ouça ambos os lados antes de julgar; **(2)** Nao tome partido publicamente; **(3)** Mantenha confidencialidade; **(4)** Foque na reconciliacao, nao na vitoria; **(5)** Use a Palavra como base, nao opinioes pessoais; **(6)** Estabeleca compromissos claros; **(7)** Acompanhe o relacionamento depois.

### Prevencao de Conflitos
A melhor maneira de resolver conflitos e preveni-los. Crie uma cultura de: comunicacao aberta, transparencia, feedback construtivo, definicao clara de expectativas e lideranca exemplar. Uma celula que cultiva relacionamentos honestos e respeitosos naturalmente tera menos conflitos.

### Conclusao
Conflitos bem resolvidos fortalecem relacionamentos e maturam o grupo. Conflitos ignorados destroem celulas. Seja proativo, amoroso e firme quando necessario. Lembre-se: o diabo usa divisao para destruir — voce e chamado a unir.`,
    discussionQuestions: [
      'Quais sao as causas mais comuns de conflitos em celulas?',
      'Por que Jesus ensinou a resolver conflitos primeiro em particular?',
      'Como manter imparcialidade quando voce e amigo de uma das partes?',
      'Como prevenir conflitos atraves de uma cultura saudavel na celula?'
    ],
    practicalActivity: 'Escreva um "acordo de convivencia" para sua celula com principios de comunicacao, respeito e resolucao de conflitos.',
    homework: 'Identifique alguma tensao existente em sua celula e tome a iniciativa de medi-la antes que se agrave.',
    memoryVerse: 'Mateus 18:15'
  },
  {
    id: 10,
    title: 'Oracao e Jejum do Lider',
    verse: 'Marcos 9:29',
    verseText: 'E disse-lhes: Esta casta nao pode sair com coisa alguma, a nao ser com oracao e jejum.',
    videoUrl: '',
    completed: false,
    content: `## Aula 10 — Oracao e Jejum do Lider: A Fonte do Poder

### Introducao
A lideranca de celula que depende apenas de tecnicas, metodos e habilidades humanas e destinada ao fracasso. O segredo de uma lideranca vitoriosa esta em duas disciplinas espirituais: a oracao e o jejum. Marcos 9:29 nos ensina que existem realidades espirituais que so sao vencidas "com oracao e jejum". O lider que ora e diferente do lider que nao ora. O lider que jejua tem acesso a um nivel de poder espiritual que outros nao tem.

### A Oracao do Lider
O lider de celula deve ser um homem ou mulher de oracao. Nao apenas orar antes das reunioes, mas manter uma vida de oracao constante. Orem pelos membros da celula pelo nome, diariamente. Orem pelas pessoas que serao alcancadas. Orem pelos novos convertidos. Orem pela igreja e seus pastores. Orem pelas necessidades da comunidade. Uma lista de oracao atualizada e revisada regularmente e uma ferramenta essencial.

### O Poder do Jejum
O jejum e a abstinencia de alimentos (ou outras atividades) por um periodo para dedicar-se a oracao e busca de Deus. O jejum: **(1)** Quebra a dependencia da carne, **(2)** Aumenta a sensibilidade espiritual, **(3)** Demonstra seriedade na busca, **(4)** Move o ceu em situacoes impossiveis. O lider deve jejuar regularmente — pelo menos um dia por mes, e mais em tempos de crise ou decisoes importantes.

### Tipos de Jejum
**Jejum parcial:** Abstinencia de determinados alimentos ou refeicoes (ex: so frutas e agua).
**Jejum completo:** Apenas agua por um periodo determinado.
**Jejum de atividades:** Abstinencia de entretenimento, redes sociais ou outras atividades para focar em Deus.
**Jejum congregacional:** Quando toda a celula jejua junto por um proposito especifico.

### A Oracao em Grupo
Alem da oracao individual, o lider deve cultivar a oracao em grupo. Tenha momentos de oracao nas reunioes de celula. Organize vigilias ou madrugadas de oracao. Ensine os membros a orar uns pelos outros. A oracao congregada tem poder multiplicado — "se dois de vos na terra concordarem". Faca da oracao a marca da sua celula.

### Conclusao
Sem oracao, voce trabalha sozinho. Com oracao, voce trabalha com Deus. Sem jejum, voce luta com suas proprias forcas. Com jejum, voce acessa o poder sobrenatural. Seja um lider que ora e jejua — e vera Deus fazer o impossivel atraves da sua celula.`,
    discussionQuestions: [
      'Como esta sua vida de oracao atualmente? Voce ora mais como dever ou como desejo?',
      'Qual foi a ultima vez que voce jejuou? Qual foi o resultado?',
      'Como organizar momentos de oracao em grupo sem que se tornem monotonos?',
      'Quais situacoes em sua celula precisam de oracao e jejum especificos?'
    ],
    practicalActivity: 'Organize uma madrugada de oracao para sua celula. Escolha um proposito especifico e prepare o roteiro.',
    homework: 'Escolha um dia esta semana para jejuar pelas necessidades de sua celula. Anote o que Deus revelar.',
    memoryVerse: 'Marcos 9:29'
  },
  {
    id: 11,
    title: 'Trabalhando com Personalidades',
    verse: 'Romanos 12:4-6',
    verseText: 'Porque, assim como em um corpo temos muitos membros, e nem todos os membros tem a mesma operacao, assim nos, que somos muitos, somos um so corpo em Cristo.',
    videoUrl: '',
    completed: false,
    content: `## Aula 11 — Trabalhando com Personalidades: Unidade na Diversidade

### Introducao
Cada pessoa e unica. Deus criou diferentes temperamentos, personalidades e estilos de comportamento. Romanos 12:4-6 nos lembra que, assim como um corpo tem muitos membros com diferentes funcoes, a igreja e composta de pessoas diversas. Como lider de celula, voce precisa aprender a lidar com diferentes personalidades de forma sabia, valorizando as diferencas em vez de ser frustrado por elas. A diversidade e um presente, nao um problema.

### Os Quatro Temperamentos Classicos
**Sanguineo:** Extrovertido, entusiasta, otimista, comunicativo. Pontos fortes: anima o grupo, contagia com alegria. Pontos fracos: pode ser superficial, impaciente, desorganizado.
**Colerico:** Determinado, pratico, lider nato, focado em resultados. Pontos fortes: produtividade, visao, capacidade de decisao. Pontos fracos: pode ser insensivel, impaciente, controlador.
**Melancolico:** Analitico, perfeccionista, sensivel, profundo. Pontos fortes: lealdade, criatividade, atencao aos detalhes. Pontos fracos: pode ser pessimista, rancoroso, critico.
**Fleumatico:** Calmo, paciente, equilibrado, bom ouvinte. Pontos fortes: pacificador, confiavel, consistente. Pontos fracos: pode ser apatico, indeciso, resistente a mudancas.

### Adaptando Sua Lideranca
Um lider sabio adapta seu estilo as diferentes personalidades. Com sanguineos: seja dinamico, de espaco para expressao. Com colericos: seja direto, foque em resultados. Com melancolicos: seja detalhista, valorize sua contribuicao profunda. Com fleumaticos: seja paciente, de tempo para processar. Nao tente mudar as pessoas — ajude-as a florescer como Deus as fez.

### Lidando com Pessoas Dificeis
Toda celula tem pelo menos uma pessoa "dificil". O dominador que monopoliza a fala, o reclamao que critica tudo, o ausente que nunca comparece, o dependente que consome toda sua atencao. Aprenda a: estabelecer limites com amor, dar feedback construtivo, delegar responsabilidades para envolver todos, e quando necessario, conversar em particular.

### A Unidade na Diversidade
A beleza da igreja esta na unidade de pessoas completamente diferentes. Jovens e idosos, ricos e pobres, extrovertidos e timidos — todos unidos por Cristo. Cultive essa unidade celebrando as diferencas, criando oportunidades para todos contribuirem e mantendo o foco no que nos une: Jesus.

### Conclusao
Aprender a trabalhar com diferentes personalidades e uma habilidade que desenvolvemos ao longo da vida. Seja humilde para reconhecer suas proprias limitacoes e sabio para valorizar o que cada pessoa traz ao grupo. Uma celula diversa e uma celula rica.`,
    discussionQuestions: [
      'Qual o seu temperamento predominante? Como isso afeta sua lideranca?',
      'Quais personalidades em sua celula sao mais desafiadoras para voce? Por que?',
      'Como voce pode criar espaco para todos os tipos de personalidade participarem?',
      'Como lidar com uma pessoa que esta desequilibrando a dinamica do grupo?'
    ],
    practicalActivity: 'Aplique um teste de temperamento na celula. Discuta como cada um pode contribuir segundo seu perfil.',
    homework: 'Observe cada membro da celula e identifique seu temperamento. Pense em como voce pode melhor se relacionar com cada um.',
    memoryVerse: 'Romanos 12:4'
  },
  {
    id: 12,
    title: 'Lancando sua Primeira Celula',
    verse: 'Lucas 14:28',
    verseText: 'Pois qual de vos, querendo edificar uma torre, primeiro nao se assenta a contar as despesas, para ver se tem com que a acabar?',
    videoUrl: '',
    completed: false,
    content: `## Aula 12 — Lancando sua Primeira Celula: Do Planejamento a Realidade

### Introducao
Lancar uma nova celula e um momento emocionante e desafiador. Lucas 14:28 nos ensina que antes de comecar qualquer obra, precisamos contar as despesas — planejar com sabedoria. Lancar uma celula sem preparacao e como construir sobre areia; lancar com planejamento e como construir sobre rocha. Esta aula e um guia pratico para transformar seu sonho em realidade.

### Fase 1: Preparacao (2-4 semanas antes)
Antes de lancar, prepare-se. **(1) Clarifique sua visao:** Por que voce esta lancando esta celula? Qual o proposito? **(2) Defina o publico-alvo:** Quem voce quer alcancar? Jovens? Familias? Profissionais? **(3) Escolha o dia, horario e local:** Facil de acessar, confortavel, privado. **(4) Prepare a lista de convidados:** Comece com 5-8 pessoas que voce ja tem relacionamento. **(5) Construa uma equipe:** Tenha pelo menos um co-lider ou assistente.

### Fase 2: Convite e Consolidacao (1-2 semanas antes)
Nao anuncie publicamente antes de ter um nucleo solido. Comece convidando pessoalmente. Visite cada pessoa, compartilhe a visao, ouca suas expectativas. Faca um encontro pre-lancamento — um cafe ou jantar onde os futuros membros se conhecem. Esse momento cria conexao antes mesmo da primeira reuniao oficial.

### Fase 3: O Lancamento (Semana 1)
A primeira reuniao e crucial. Planeje com cuidado: **Acolhida calorosa:** Receba cada pessoa pessoalmente. **Apresentacao da visao:** Compartilhe o proposito da celula com paixao. **Dinamica de quebra-gelo:** Ajude todos a se sentirem a vontade. **Estudo biblico leve:** Nao sobrecarregue na primeira vez. **Lanche e comunhao:** Termine com tempo de descontracao. **Definicao de compromissos:** Estabeleca expectativas claras desde o inicio.

### Fase 4: Consolidacao (Semanas 2-8)
As primeiras semanas definem a cultura da celula. Seja consistente nos horarios. Conduza bem as reunioes usando o 4Ws. Visite os membros individualmente. Resolva problemas rapidamente. Comece a desenvolver um assistente desde o inicio. Faca um evento social nas primeiras semanas para fortalecer os lacos.

### Desafios Comuns no Inicio
**Pouca frequencia:** E normal! Persista, ore e nao desanime.
**Desistencias:** Alguns vao sair. Foque nos que permanecem.
**Expectativas irreais:** Resultados levam tempo. Seja paciente.
**Cansaco:** Cuide de si mesmo. Nao queime suas energias.
**Falta de recursos:** Comece simples. Deus supre as necessidades.

### Conclusao
Lancar uma celula e uma aventura de fe. Nao ha formula perfeita, mas ha principios eternos. Seja fiel, ore muito, ame as pessoas e confie em Deus. A primeira celula e sempre a mais dificil, mas tambem a mais especial. Deus esta com voce. Va em frente — o mundo precisa de mais celulas que transformam vidas!`,
    discussionQuestions: [
      'Voce esta pronto para lancar sua celula? O que ainda precisa ser preparado?',
      'Quais sao os maiores medos e desafios que voce enfrenta neste lancamento?',
      'Como voce pode construir uma equipe de lideranca desde o inicio?',
      'Quais expectativas realis voce deve ter sobre os primeiros meses de uma celula?'
    ],
    practicalActivity: 'Crie um plano completo de lancamento: data, local, lista de convidados, roteiro da primeira reuniao e metas para os primeiros 3 meses.',
    homework: 'Faca o primeiro convite pessoal para pelo menos 3 pessoas esta semana. Compartilhe a visao com paixao!',
    memoryVerse: 'Lucas 14:28'
  },
]

// ============================================================
// CURSO: Missoes — 10 Aulas Iniciais
// ============================================================
export const missoesLessons = [
  {
    id: 1,
    title: 'O Mandato Missionario',
    verse: 'Mateus 28:18-20',
    verseText: 'E Jesus, aproximando-se, falou-lhes, dizendo: E-me dado todo o poder no ceu e na terra. Ide, portanto, fazei discipulos de todas as nacoes...',
    videoUrl: '',
    completed: false,
    content: `## Aula 1 — O Mandato Missionario: A Maior Tarefa da Igreja

### Introducao
A Grande Comissao e o ultimo e mais importante mandamento que Jesus deixou a Sua igreja antes de ascender aos ceus. Em Mateus 28:18-20, Jesus declara Sua soberania sobre todo o universo e, com base nessa autoridade, comissiona cada crente a participar da obra de fazer discipulos em todas as nacoes. A missao nao e opcional, nao e apenas para alguns escolhidos, e nao e apenas um projeto da igreja — e o proposito central da existencia de todo cristao.

### O Contexto da Grande Comissao
As ultimas palavras de um lider sempre carregam peso especial. A Grande Comissao foi dada no contexto da ressurreicao de Jesus, quando a esperanca foi restaurada e o poder da morte foi vencido. Jesus aparece aos discipulos em Galileia — o mesmo lugar onde tudo comecara — e lhes entrega a missao que continuaria Sua obra na terra. Nao seriam eles sozinhos: "Eis que eu estou convosco todos os dias, ate a consumacao dos seculos" (v. 20).

### Os Elementos do Mandato
**Autoridade:** "E-me dado todo o poder no ceu e na terra." A missao e baseada na autoridade soberana de Cristo. Nao dependemos de recursos humanos, mas do poder do Ressurreto.
**Acao:** "Ide... fazei discipulos." A missao exige movimento — sair da zona de conforto, atravessar fronteiras, ir onde as pessoas estao.
**Alcance:** "De todas as nacoes." A missao e universal — nenhum povo, etnia ou grupo esta excluido.
**Metodo:** "Batizando-os... ensinando-os." A missao e completa — inclui evangelismo, incorporacao a igreja e educacao teologica.
**Presenca:** "Eis que eu estou convosco." A missao e acompanhada — Jesus nao nos envia sozinhos.

### A Missao e para Todos
Nem todo cristao e chamado a ser missionario de tempo integral, mas todo cristao e chamado a participar da missao. Ha diferentes maneiras de cumprir a Grande Comissao: orando, dando financeiramente, enviando missionarios, alcancando vizinhos, apoiando projetos missionarios, indo em viagens de curto prazo, ou dedicando a vida ao campo missionario. Todos tem um papel no corpo missionario de Cristo.

### Conclusao
A Grande Comissao nao e uma sugestao — e uma ordem do nosso Senhor ressurreto. A igreja que negligencia a missao esta desobedecendo a Jesus. A igreja que abraca a missao encontra seu verdadeiro proposito e a presenca poderosa de Cristo. Qual e o seu papel nessa grande obra?`,
    discussionQuestions: [
      'Voce ja havia compreendido que a Grande Comissao e um mandamento para todos os crentes?',
      'Quais sao os "deuses" que competem com a missao de Deus em sua vida (conforto, seguranca, carreira)?',
      'Como a promessa da presenca de Jesus muda sua visao sobre a missao?',
      'De que formas praticas voce pode participar da Grande Comissao ja a partir de hoje?'
    ],
    practicalActivity: 'Escreva uma carta de compromisso com a missao de Deus. Assine e guarde como lembrete.',
    homework: 'Leia Atos 1:8 e confira como Jesus expande o alcance geografico da missao. Aplique a sua vida.',
    memoryVerse: 'Mateus 28:19'
  },
  {
    id: 2,
    title: 'Historia das Missoes',
    verse: 'Atos 1:8',
    verseText: 'Mas recebereis poder, ao descer sobre vos o Espirito Santo, e ser-me-eis testemunhas tanto em Jerusalém como em toda a Judeia e Samaria, e ate aos confins da terra.',
    videoUrl: '',
    completed: false,
    content: `## Aula 2 — Historia das Missoes: Duas Mil Anos de Fé e Obra

### Introducao
A historia das missoes e a historia do avanco do reino de Deus na terra. Desde o Dia de Pentecostes ate os dias de hoje, milhares de homens e mulheres entregaram suas vidas para levar o evangelho aos confins da terra. Conhecer essa historia nos inspira, nos da perspectiva e nos conecta com uma corrente de fe que se estende por vinte seculos. Atos 1:8 mostra o plano de Jesus: comecar em Jerusalém e expandir ate os confins da terra.

### As Ondas Missionarias Biblicas
**Jerusalém (Atos 1-7):** A igreja nasce no coracao do judaismo. Tres mil convertidos no Dia de Pentecostes. O crescimento e explosivo, mas ainda dentro de uma unica cultura.
**Judeia e Samaria (Atos 8-12):** A perseguicao espalha os crentes. Filipe evangeliza os samaritanos. Pedro vai a Cesareia. A igreja comeca a cruzar fronteiras culturais.
**Os Confins da Terra (Atos 13-28):** Paulo e Barnabe sao enviados. Tres viagens missionarias pelo mundo romano. Igrejas plantadas em cidades estrategicas. O evangelho alcanca gentios, gregos, romanos e barbaros.

### Marcos da Historia Missionaria
**Sao Patricio (sec. V):** Escravo tornado missionario, evangelizou a Irlanda.
**Francisco Xavier (sec. XVI):** Jesuita que levou o evangelho a India, Japao e Indonesia.
**William Carey (sec. XVIII-XIX):** "O pai das missoes modernas", traduziu a Biblia para linguas da India.
**Hudson Taylor (sec. XIX):** Fundou a China Inland Mission, vestiu-se como os chineses, enviou mais de 800 missionarios.
**Amy Carmichael (sec. XIX-XX):** Resgatou criancas do templo na India, fundou o Dohnavur Fellowship.
**Jim Elliot e os cinco de Auca (sec. XX):** Martirizados tentando alcancar os indios Huaorani no Equador. "Nao e tolo quem da o que nao pode manter para ganhar o que nao pode perder."

### Licoes da Historia
A historia das missoes ensina: (1) Deus usa pessoas comuns para fazer obras extraordinarias; (2) A missao avanca apesar da perseguicao; (3) Adaptacao cultural e essencial; (4) Traducao da Biblia e prioridade; (5) Sacrificio e parte da missao; (6) Deus honra a fidelidade, nao o talento natural.

### Conclusao
Nos somos parte dessa grande historia. Os martires, pioneiros e missionarios do passado nos legaram uma tocha que agora esta em nossas maos. Nao a deixemos apagar. A historia das missoes continua sendo escrita — e voce pode ser parte do proximo capitulo.`,
    discussionQuestions: [
      'Qual historia de missionario mais te tocou e por que?',
      'O que voce aprendeu com os erros e acertos dos pioneiros das missoes?',
      'Como a perseguicao, estranhamente, impulsionou a expansao do evangelho?',
      'Como nos, cristaos do seculo XXI, continuamos essa heranca missionaria?'
    ],
    practicalActivity: 'Escolha um missionario historico e faca uma apresentacao breve (5 min) sobre sua vida e legado.',
    homework: 'Leia uma biografia de um missionario (sugestao: "A Trilha Aromatizada" sobre Hudson Taylor ou "Sombras do Pai" sobre Jim Elliot).',
    memoryVerse: 'Atos 1:8'
  },
  {
    id: 3,
    title: 'Povos Nao Alcancados',
    verse: 'Apocalipse 7:9',
    verseText: 'Depois destas coisas, vi, e eis grande multidao que ninguem podia contar, de todas as nacoes, tribos, povos e linguas.',
    videoUrl: '',
    completed: false,
    content: `## Aula 3 — Povos Nao Alcancados: Os Esquecidos do Mundo

### Introducao
A visao do ceu em Apocalipse 7:9 e clara: diante do trono de Deus havera representantes de "todas as nacoes, tribos, povos e linguas". Mas hoje, mais de 7.000 grupos etnicos no mundo ainda nao tem acesso ao evangelho. Sao os chamados "povos nao alcancados" — pessoas que nunca ouviram falar de Jesus, que nao tem igreja em sua lingua, que nao tem acesso a Biblia. A missao de Deus nao estara completa ate que cada povo seja representado diante do trono.

### O Que Sao Povos Nao Alcancados?
Povos nao alcancados (ou "povos nao evangelizados") sao grupos etnicos onde menos de 2% da populacao sao cristaos evangelicos. Nesses grupos, nao ha igreja local suficientemente forte para evangelizar seu proprio povo. Eles nao tem acesso a um cristao, a uma Biblia em sua lingua ou a uma igreja onde possam ouvir o evangelho. Estimativas indicam que mais de 3 bilhoes de pessoas vivem nessa condicao.

### Onde Estao os Povos Nao Alcancados?
Concentrados principalmente em uma regiao conhecida como "Cinturao 10/40" — uma faixa entre 10 e 40 graus de latitude norte, estendendo-se da Africa Ocidental ate a Asia Oriental. Paises como: India, China, Paquistao, Bangladesh, Indonesia, Turquia, Ira, Iraque, Arabia Saudita, Niger, Mali, Senegal, e muitos outros. Nesses lugares, o cristianismo e minoria ou ilegal.

### Barreiras ao Alcance
**Geograficas:** Regioes remotas, montanhosas ou de dificil acesso.
**Linguisticas:** Mais de 7.000 linguas no mundo, muitas sem porcao da Biblia.
**Culturais:** Fortes tradicoes religiosas que rejeitam o cristianismo.
**Politicas:** Governos que perseguem ou proibem o evangelismo.
**Espirituais:** Forte cativeiro espiritual em idolatria, ocultismo e falsas religioes.

### O Que Podemos Fazer?
**Orar:** A oracao e a ferramenta mais poderosa. Ore pelos povos nao alcancados diariamente.
**Dar:** Financie tradutores da Biblia, missionarios e projetos de alcance.
**Ir:** Considere ser um missionario de tempo integral ou de curto prazo.
**Mobilizar:** Despertar outros cristaos para a causa dos povos nao alcancados.
**Adotar:** Sua igreja ou celula pode "adotar" um povo nao alcancado para orar e investir.

### Conclusao
A missao de Deus so estara completa quando cada povo for alcancado. Nao podemos ser indiferentes a bilhoes de pessoas que nunca ouviram o nome de Jesus. A oracao por todos os povos e a chave para o retorno de Cristo (Mateus 24:14). Seja parte da solucao — comece orando hoje.`,
    discussionQuestions: [
      'Voce ja tinha ouvido falar do conceito de "povos nao alcancados" antes?',
      'Por que Deus permitiria que bilhoes de pessoas nascessem sem acesso ao evangelho?',
      'Como a promessa de Apocalipse 7:9 nos motiva a alcancar povos ainda nao evangelizados?',
      'Qual atitude pratica voce pode tomar ja esta semana em relacao aos povos nao alcancados?'
    ],
    practicalActivity: 'Escolha um povo nao alcancado e pesquise sobre eles: lingua, cultura, religiao, localizacao. Compartilhe com o grupo.',
    homework: 'Comece a orar diariamente por um povo nao alcancado especifico. Use recursos como o Operation World ou Joshua Project.',
    memoryVerse: 'Mateus 24:14'
  },
  {
    id: 4,
    title: 'Evangelismo Transcultural',
    verse: '1 Corintios 9:22-23',
    verseText: 'Fiz-me fraco aos fracos, para ganhar os fracos. Fiz-me tudo para todos, para, de alguma maneira, salvar alguns. E faco isto por causa do evangelho.',
    videoUrl: '',
    completed: false,
    content: `## Aula 4 — Evangelismo Transcultural: Tornando-se Tudo para Todos

### Introducao
Pablo escreveu: "Fiz-me tudo para todos, para, de alguma maneira, salvar alguns" (1 Corintios 9:22). Essa e a essencia do evangelismo transcultural — a capacidade de comunicar o evangelho de forma relevante em contextos culturais diferentes. Paulo, um judeu fariseu, tornou-se como grego para os gregos, como judeu para os judeus, como fraco para os fracos. Essa flexibilidade cultural e essencial para qualquer missionario.

### O Que e Cultura?
Cultura e o conjunto de valores, crencas, costumes, linguagem e comportamentos compartilhados por um grupo de pessoas. Cada cultura tem sua propria maneira de entender o mundo, de se relacionar, de resolver conflitos, de demonstrar respeito. Ignorar a cultura e um dos maiores erros do missionario. Respeitar e adaptar-se a cultura nao e sincretismo — e sabedoria.

### Principios do Evangelismo Transcultural
**1. Contextualizacao:** Apresentar o evangelho de forma que faca sentido na cultura local. Jesus usou parabolas sobre agricultura porque vivia em uma cultura agraria. Paulo citou poetas gregos em Atenas (Atos 17:28).
**2. Incarnacao:** Assim como Deus se fez carne em Jesus, o missionario deve "encarnar" o evangelho na cultura local. Hudson Taylor vestiu-se como chines. Missionarios modernos aprendem a lingua, comem a comida, respeitam os costumes.
**3. Comunicacao clara:** O evangelho e simples, mas precisa ser traduzido culturalmente. O conceito de "pecado" pode ser entendido de forma diferente em culturas orientais e ocidentais.
**4. Relacionamento:** O evangelismo transcultural comeca com amizade. Pessoas nao se importam com o que voce sabe ate saberem que voce se importa.

### Desafios do Contexto Transcultural
**Xenofobia:** O medo do estrangeiro pode dificultar a aceitacao.
**Etiqueta:** Normas de cumprimento, visita, alimentacao e vestimenta variam enormemente.
**Linguagem:** Idiomas com estruturas gramaticais e conceituais muito diferentes.
**Valores:** Individualismo vs. coletivismo, hierarquia vs. igualdade, tempo linear vs. ciclico.
**Religiao:** Sistemas religiosos profundamente enraizados que resistem ao cristianismo.

### Conclusao
O evangelismo transcultural exige humildade, paciencia e amor genuino. Nao estamos exportando cultura ocidental — estamos compartilhando Jesus. Quanto mais nos identificarmos com o povo que servimos, mais eficazes seremos. Torne-se tudo para todos — para que alguns sejam salvos.`,
    discussionQuestions: [
      'Por que Paulo se adaptava a cada cultura em vez de impor sua cultura judaica?',
      'Quais elementos da cultura ocidental voce carrega que poderiam ser barreiras em outra cultura?',
      'O que e contextualizacao e qual a diferenca entre isso e sincretismo?',
      'Como voce pode comecar a desenvolver sensibilidade transcultural ja em sua cidade?'
    ],
    practicalActivity: 'Visite um bairro ou comunidade de uma etnia diferente na sua cidade. Observe, ouca e aprenda sem julgar.',
    homework: 'Leia Atos 17:16-34 e analise como Paulo se adaptou ao contexto cultural de Atenas. Anote as estrategias.',
    memoryVerse: '1 Corintios 9:22'
  },
  {
    id: 5,
    title: 'Plantio de Igrejas',
    verse: 'Atos 14:21-23',
    verseText: 'E, tendo anunciado o evangelho naquela cidade e feito muitos discipulos, voltaram para Listra, Iconio e Antioquia, confirmando os animos dos discipulos.',
    videoUrl: '',
    completed: false,
    content: `## Aula 5 — Plantio de Igrejas: Multiplicando Comunidades de Fe

### Introducao
O plantio de igrejas e a estrategia missionaria mais eficaz para alcancar o mundo. Estudos mostram que novas igrejas alcancam mais nao-crentes do que igrejas estabelecidas. Cada nova igreja plantada e um farol de esperanca em uma comunidade. Atos 14:21-23 mostra o modelo de Paulo: evangelizar, fazer discipulos, consolidar, levantar lideres e entregar a responsabilidade. Esse ciclo se repetiu por toda a obra missionaria paulina.

### Por Que Plantar Igrejas?
**1. Crescimento exponencial:** Uma igreja que planta outras cria um movimento multiplicativo.
**2. Alcance de novas areas:** Novas igrejas alcançam bairros, cidades e povos que igrejas existentes nao conseguem.
**3. Relevancia cultural:** Igrejas novas tendem a ser mais adaptaveis as necessidades de sua comunidade.
**4. Desenvolvimento de lideres:** O plantio de igrejas e a melhor escola de lideranca.
**5. Cumprimento da Grande Comissao:** Cada nova igreja e um centro de discipulado e envio de missionarios.

### O Modelo Paulino de Plantio
**Evangelismo:** Paulo pregava publicamente, nos sinagogas e nas pracas. Milagres atraíam multidoes.
**Discipulado:** Os convertidos eram ensinados e integrados em comunidade. Paulo permanecia meses em cada cidade.
**Consolidacao:** Os novos convertidos eram fortalecidos na fe atraves do ensino e do acompanhamento.
**Levantamento de lideres:** Paulo identificava e treinava lideres locais — presbiteros e diaconos.
**Entrega:** Paulo partia e deixava a igreja sob a responsabilidade dos lideres locais, voltando apenas para visitar.

### Estrategias Modernas de Plantio
**Plantação por divisao:** Uma igreja mae envia um grupo para iniciar uma nova obra.
**Plantação por equipe:** Uma equipe de missionarios planta uma igreja do zero.
**Modelo de celulas:** Multiplicacao de celulas que se tornam igrejas autonomas.
**Treinamento de pioneiros:** Identificar e capacitar lideres locais para plantar.
**Plantação bi-vocacional:** Lideres que trabalham secularmente e plantam igrejas simultaneamente.

### Desafios do Plantio
Falta de recursos, resistencia cultural, perseguicao religiosa, dificuldade em levantar lideres locais, isolamento emocional do plantador. Mas cada desafio superado e uma oportunidade para Deus demonstrar Sua fidelidade.

### Conclusao
O plantio de igrejas nao e para super-herois espirituais — e para crentes comuns que amam Jesus e amam pessoas. Se voce sente o chamado para plantar, prepare-se, procure mentorias e de o primeiro passo. Cada igreja plantada e uma nova expresao do reino de Deus na terra.`,
    discussionQuestions: [
      'Por que novas igrejas sao mais eficazes em alcancar nao-crentes que igrejas antigas?',
      'Quais elementos do modelo paulino de plantio podemos aplicar hoje?',
      'Quais sao os maiores desafios de um plantador de igrejas?',
      'Como sua igreja pode se tornar uma "igreja mae" que planta outras igrejas?'
    ],
    practicalActivity: 'Mapeie bairros ou comunidades na sua regiao que nao tem igreja evangelica. Ore por essas areas.',
    homework: 'Converse com seu pastor sobre a visao de plantacao de igrejas e como voce pode participar.',
    memoryVerse: 'Atos 14:23'
  },
  {
    id: 6,
    title: 'Missao Urbana',
    verse: 'Jonas 3:2-5',
    verseText: 'Levanta-te, vai a Ninive, aquela grande cidade, e clama contra ela... E os homens de Ninive creram em Deus.',
    videoUrl: '',
    completed: false,
    content: `## Aula 6 — Missao Urbana: Alcancando as Cidades

### Introducao
As cidades sao o campo missionario do seculo XXI. Mais da metade da populacao mundial vive em areas urbanas, e essa proporcao continua crescendo. As cidades concentram pobreza, violencia, imigracao, diversidade religiosa e imensa necessidade espiritual. Jonas 3 mostra que Deus se preocupa com as cidades — Ninive era uma "grande cidade" e Deus enviou Jonas para clamar contra ela. O resultado? Toda a cidade se arrependeu. Deus ainda quer salvar as cidades.

### O Poder das Cidades
As cidades sao centros de influencia cultural, economica, politica e social. O que acontece nas cidades influencia nacoes inteiras. Quando a igreja alcanca uma cidade, ela alcanca um pais inteiro. As cidades tambem sao o lugar onde diferentes culturas se encontram — imigrantes, refugiados, estudantes internacionais — todos em um so lugar. Isso cria oportunidades unicas para o evangelismo transcultural.

### Estrategias de Missao Urbana
**Adocao de bairros:** Escolher um bairro especifico e concentrar esforcos evangelisticos ali.
**Ministerios compassionais:** Distribuicao de alimentos, abrigos, clinicas moveis, escolas comunitarias.
**Alcance a grupos especificos:** Moradores de rua, dependentes quimicos, prostitutas, imigrantes, refugiados.
**Arte e cultura:** Usar musica, teatro, danca e artes visuais como pontes para o evangelho.
**Empreendedorismo social:** Criar negocios que geram renda e alcancam comunidades.
**Plantio de igrejas multi-etnicas:** Igrejas que refletem a diversidade da cidade.

### Desafios da Missao Urbana
**Anonimato:** Nas cidades, as pessoas sao isoladas apesar da proximidade fisica.
**Secularismo:** As cidades tendem a ser mais secularizadas e hostis ao cristianismo.
**Complexidade social:** Problemas urbanos sao interligados — pobreza, crime, desemprego, falta de moradia.
**Custo de vida:** Trabalhar em cidades grandes exige mais recursos financeiros.
**Concorrencia de atencao:** Milhares de estimulos competem pela atencao das pessoas.

### Conclusao
Deus ama as cidades. Jesus chorou sobre Jerusalém. A igreja precisa amar as cidades também. A missao urbana exige criatividade, compromisso e colaboracao. Cada pessoa alcancada em uma cidade pode influenciar uma rede inteira de relacionamentos. Invista nas cidades — o retorno e eterno.`,
    discussionQuestions: [
      'Por que as cidades sao tao estrategicas para a missao de Deus?',
      'Quais sao as necessidades especificas da sua cidade que a igreja pode atender?',
      'Como podemos alcancar grupos marginalizados nas cidades com dignidade e amor?',
      'Quais parcerias sua igreja pode formar com organizacoes que ja trabalham na cidade?'
    ],
    practicalActivity: 'Faca um passeio de oracao por um bairro carente da sua cidade. Ore por cada rua, casa e pessoa que voce ve.',
    homework: 'Pesquise sobre projetos sociais em sua cidade e descubra como sua igreja pode se envolver.',
    memoryVerse: 'Jonas 3:5'
  },
  {
    id: 7,
    title: 'Missao Digital',
    verse: 'Marcos 16:15',
    verseText: 'E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda a criatura.',
    videoUrl: '',
    completed: false,
    content: `## Aula 7 — Missao Digital: O Campo Missionario da Internet

### Introducao
A internet mudou o mundo. Hoje, mais de 5 bilhoes de pessoas estao conectadas online. Redes sociais, aplicativos de mensagem, plataformas de video e streaming se tornaram o principal meio de comunicacao da humanidade. Se Jesus disse "ide por todo o mundo", isso inclui o mundo digital. A missao digital nao substitui a presencial, mas amplifica o alcance de formas sem precedentes. Nunca na historia foi tao facil alcancar tantas pessoas em tantos lugares ao mesmo tempo.

### O Potencial Missionario da Internet
**Alcance global:** Uma unica postagem pode chegar a milhoes em diferentes paises.
**Acesso a paises fechados:** Em nacoes onde o evangelismo e proibido, a internet pode ser a unica porta de entrada.
**Comunidade online:** Grupos de oracao, estudos biblicos e discipulado podem acontecer online.
**Conteudo em massa:** Videos, podcasts, artigos e cursos podem ser acessados 24 horas por dia.
**Conexao pessoal:** Mensagens diretas permitem conversas evangelisticas individuais.

### Estrategias de Missao Digital
**Evangelismo em redes sociais:** Compartilhar conteudo evangelistico, testemunhos e mensagens de esperanca.
**Grupos de estudo online:** Criar grupos de WhatsApp, Telegram ou Discord para discipulado.
**Canais no YouTube/TikTok:** Produzir videos curtos e relevantes para jovens e nao-crentes.
**Podcasts cristaos:** Alcancar pessoas durante seu tempo de deslocamento ou trabalho.
**Cursos online gratuitos:** Oferecer cursos de formacao crista e discipulado digital.
**Traducao de conteudo:** Traduzir materiais evangelisticos para linguas de povos nao alcancados.

### Etica e Cuidados na Missao Digital
**Autenticidade:** O evangelho online deve ser tao autentico quanto o presencial.
**Relacionamento:** A missao digital nao deve ser apenas transmissao de conteudo — deve construir relacionamento.
**Acompanhamento:** Pessoas que respondem online precisam ser conectadas a uma igreja local.
**Seguranca:** Em paises hostis, proteja a identidade de cristaos e novos convertidos.
**Qualidade:** Conteudo missionario deve ter boa qualidade — Deus merece o nosso melhor.

### Conclusao
A missao digital e o novo campo missionario. Nao podemos ignorar o fato de que bilhoes de pessoas passam horas online todos os dias. Se queremos alcancar o mundo, precisamos estar onde o mundo esta. Use suas redes sociais para Jesus. Crie conteudo. Evangelize online. A internet pode ser a ferramenta mais poderosa da missao desde a invencao da imprensa.`,
    discussionQuestions: [
      'Como voce usa a internet atualmente? Poderia usar parte desse tempo para missao?',
      'Quais sao as vantagens e limitacoes da missao digital comparada a presencial?',
      'Como garantir que pessoas alcancadas online sejam integradas em comunidades locais?',
      'Quais plataformas digitais sao mais adequadas para alcancar diferentes faixas etarias?'
    ],
    practicalActivity: 'Crie um plano de conteudo evangelistico para suas redes sociais nas proximas 2 semanas.',
    homework: 'Compartilhe uma mensagem de esperanca ou testemunho em suas redes sociais hoje e ofereca orar por quem responder.',
    memoryVerse: 'Marcos 16:15'
  },
  {
    id: 8,
    title: 'Vida no Campo Missionario',
    verse: 'Filipenses 4:11-13',
    verseText: 'Nao digo isto como por necessidade, porque ja aprendi a contentar-me com o que tenho. Sei estar abatido e sei ter abundancia.',
    videoUrl: '',
    completed: false,
    content: `## Aula 8 — Vida no Campo Missionario: A Realidade Alem do Ideal

### Introducao
A vida no campo missionario e frequentemente idealizada. Muitos imaginam um cenario romantico de conversões diarias, experiencias sobrenaturais e alegria constante. A realidade, porem, e diferente. O campo missionario inclui solidao, frustracao, doenca, perseguicao, saudade da familia e luta cultural diaria. Filipenses 4:11-13 revela o segredo de Paulo para a vida missionaria: aprender a estar contente em toda e qualquer situacao. Essa contentamento nao vem das circunstancias, mas de Cristo.

### A Realidade do Campo Missionario
**Solidao:** Longe de familia e amigos, em um lugar onde poucos entendem voce.
**Cultura:** Choque cultural, dificuldade de comunicacao, costumes estranhos.
**Frustracao:** Resultados lentos, conversas sem resposta, portas fechadas.
**Saude:** Doencas tropicais, alimentacao diferente, falta de medicos.
**Espiritual:** Ataques espirituais intensos, guerra contra o cristianismo.
**Financeira:** Dependencia de apoio, incerteza sobre doacoes, vida simples.

### O Segredo da Resiliencia Missionaria
**1. Relacionamento intimo com Deus:** A oracao e a Palavra sao a ancora. Sem isso, o missionario naufraga.
**2. Comunidade:** Ter outros missionarios ou crentes proximos e vital para o sustento emocional.
**3. Expectativas realistas:** Saber que frustacao e parte do processo normaliza as dificuldades.
**4. Autocuidado:** Descanso, exercicio, hobby e saude mental nao sao luxos — sao necessidades.
**5. Humor:** Aprender a rir das situacoes culturais engracadas ajuda a aliviar a tensao.
**6. Foco na eternidade:** Lembrar que cada dificuldade tem valor eterno da sentido ao sofrimento.

### Preparacao para o Campo
Antes de ir, prepare-se em tres areas: **(1) Espiritualmente:** Vida de oracao solida, conhecimento da Palavra. **(2) Praticamente:** Aprenda a lingua, estude a cultura, faca curso de primeiros socorros. **(3) Emocionalmente:** Resolva questoes pessoais, fortaleca seu casamento (se for casado), desenvolva resiliencia.

### Conclusao
A vida no campo missionario nao e facil, mas e profundamente gratificante. Ver uma pessoa se converter, uma igreja nascer, uma comunidade transformada — nada se compara. O poder de Cristo se aperfeicoa na fraqueza. Se Deus o chama, Ele tambem sustenta. Va, mas va preparado.`,
    discussionQuestions: [
      'Por que a vida missionaria e frequentemente idealizada? Quais sao os perigos dessa idealizacao?',
      'Como Paulo conseguiu estar contente em meio a tanta adversidade?',
      'Quais sao as areas que voce precisa fortalecer antes de ir ao campo missionario?',
      'Como podemos apoiar melhor os missionarios que estao no campo?'
    ],
    practicalActivity: 'Faca um "teste de campo": viva uma semana sem os confortos que voce tem (internet, comida favorita, contato com familia) e ore mais.',
    homework: 'Entre em contato com um missionario que voce conhece e pergunte sobre a realidade do campo. Ouca com atencao.',
    memoryVerse: 'Filipenses 4:13'
  },
  {
    id: 9,
    title: 'Financas e Sustentabilidade',
    verse: '3 Joao 1:2',
    verseText: 'Amado, acima de tudo, faco votos que te va bem, e que tenhas saude, assim como bem vai a tua alma.',
    videoUrl: '',
    completed: false,
    content: `## Aula 9 — Financas e Sustentabilidade: A Economia da Missao

### Introducao
A missao de Deus exige recursos. Tradutores da Biblia precisam ser pagos, missionarios sustentados, projetos financiados, viagens custeadas. Sem um fundamento financeiro saudavel, a missao nao se sustenta. 3 Joao 1:2 mostra que Deus se preocupa com o bem-estar material de Seus servos. A Biblia fala mais sobre dinheiro do que sobre oracao — porque sabe que as financas sao uma area onde o coracao e testado e onde o inimigo ataca.

### O Principio da Providencia Divina
Deus e o dono de tudo (Salmo 24:1). Ele provê para Sua obra. Jesus disse: "Buscai primeiro o reino de Deus e a sua justica, e todas estas coisas vos serao acrescentadas" (Mateus 6:33). A missao nao depende do tamanho da conta bancaria, mas da fidelidade de Deus. Isso nao significa irresponsabilidade financeira, mas confianca naquele que nunca falhou.

### Fontes de Sustentacao Missionaria
**Apoio de individuos e igrejas:** A maioria dos missionarios e sustentada por parceiros que doam mensalmente.
**Trabalho secular (tent-making):** Missionarios que trabalham secularmente para se sustentar, seguindo o exemplo de Paulo (Atos 18:3).
**Negocios missionarios:** Empreendimentos que geram renda e abrem portas para o evangelismo.
**Fundacoes e organizacoes:** ONGs cristas que financiam projetos especificos.
**Doacoes ocasionais:** Ofertas especiais, campanhas e eventos de arrecadacao.

### Gestao Financeira na Missao
**Transparencia:** Contabilidade clara e aberta. Parceiros merecem saber como seu dinheiro e usado.
**Planejamento:** Orcamento realista, reserva de emergencia, metas financeiras claras.
**Fidelidade:** Usar os recursos com sabedoria, evitando desperdicio.
**Gratidao:** Agradecer aos parceiros regularmente, compartilhando resultados.
**Fe:** Confiar que Deus suprirá quando as financas estiverem apertadas.

### Como a Igreja Pode Financiar a Missao
- Designe pelo menos 10% do orcamento da igreja para missoes.
- Crie um fundo missionario permanente.
- Mobilize membros para serem parceiros mensais de missionarios.
- Promova campanhas de arrecadacao para projetos especificos.
- Invista no treinamento de missionarios bivocacionais.

### Conclusao
As financas nao sao um assunto mundano — sao espirituais. Deus usa recursos materiais para cumprir Seus propositos eternos. Seja um bom administrador do que Deus confiou a voce. Doe generosamente. Planeje com sabedoria. Confie na providencia divina. A missao de Deus nao pode parar por falta de recursos.`,
    discussionQuestions: [
      'Por que Jesus falou tanto sobre dinheiro e generosidade?',
      'Qual a diferenca entre confiar na providencia de Deus e ser irresponsavel financeiramente?',
      'Como podemos educar a igreja para ter uma cultura de generosidade missionaria?',
      'Quais sao as vantagens e desvantagens do modelo "tent-making" para missionarios?'
    ],
    practicalActivity: 'Crie um orcamento pessoal e inclua uma linha de "doacoes missionarias". Comprometa-se com um valor mensal.',
    homework: 'Pesquise quanto custa sustentar um missionario por mes. Compartilhe essa informacao com sua celula e inicie um projeto de apoio.',
    memoryVerse: '3 Joao 1:2'
  },
  {
    id: 10,
    title: 'Formando Missionarios',
    verse: '2 Timoteo 2:2',
    verseText: 'E o que ouviste de mim entre muitas testemunhas, isto confia a homens fieis, que sejam idoneos para também ensinar outros.',
    videoUrl: '',
    completed: false,
    content: `## Aula 10 — Formando Missionarios: Multiplicando Enviados

### Introducao
A maior necessidade da missao mundial nao e dinheiro, tecnologia ou estrategia — e missionarios. Milhoes de pessoas ainda nao ouviram o evangelho porque nao ha quem va ate elas. 2 Timoteo 2:2 mostra o metodo de Paulo para formar missionarios: "confia a homens fieis, que sejam idoneos para tambem ensinar outros". A formacao de missionarios nao e um evento — e um processo de multiplicacao de geracoes.

### O Processo de Formacao
**1. Despertar:** Despertar o coracao dos crentes para a missao atraves de pregação, historias e oracao. Muitos nunca foram porque nunca foram desafiados.
**2. Discipular:** Formar discipulos maduros antes de formar missionarios. Um missionario imaturo pode causar mais dano que bem.
**3. Treinar:** Oferecer capacitacao pratica — linguas, cultura, evangelismo, plantio de igrejas, lideranca.
**4. Mentorear:** Conectar o candidato a missionarios experientes que possam orientar.
**5. Testar:** Dar oportunidades de curto prazo (1-3 meses) antes do compromisso de longo prazo.
**6. Enviar:** Comissionar com a bencao da igreja, apoio financeiro e cobertura espiritual.
**7. Acompanhar:** Manter relacionamento de apoio durante todo o tempo no campo.

### O Perfil do Missionario
Nem todo mundo e chamado a ser missionario de tempo integral. O missionario ideal tem: chamado claro de Deus, carater maduro, saude emocional, habilidade de adaptacao, espirito de sacrificio, competencias especificas (linguistica, medica, pedagogica, etc.), e apoio de uma igreja local. A formacao deve avaliar nao apenas o desejo, mas a preparacao.

### A Igreja como Centro de Formacao
A igreja local e o lugar ideal para formar missionarios. Atraves de: cursos de missoes, experiencias de curto prazo, grupos de oracao por missoes, mentoria de lideres, parcerias com agencias missionarias. Cada igreja pode se tornar uma "fabrica" de missionarios, enviando regularmente trabalhadores para a seara.

### Conclusao
O mundo precisa de missionarios — milhoes deles. A igreja brasileira, em particular, tem uma responsabilidade unica: somos uma das maiores igrejas evangelicas do mundo, falamos portugues (lingua falada em varios paises africanos) e temos paixao pelo evangelismo. Nao podemos ser apenas receptores da missao — devemos ser enviadores. Forme missionarios. Envie missionarios. Seja parte da multiplicacao de 2 Timoteo 2:2. A colheita e grande, mas os trabalhadores sao poucos. Ore ao Senhor da seara para que envie trabalhadores.`,
    discussionQuestions: [
      'Por que a falta de missionarios e o maior gargalo da missao mundial?',
      'Qual a diferenca entre formar convertidos e formar missionarios?',
      'Como sua igreja pode se tornar uma "fabrica" de missionarios?',
      'Voce sente o chamado para ser um missionario? Como confirmar isso?'
    ],
    practicalActivity: 'Organize uma noite de oracao por missoes. Convide um missionario para compartilhar e desafie pessoas a se envolverem.',
    homework: 'Ore durante 7 dias consecutivos pedindo a Deus que levante missionarios da sua igreja. Anote o que Deus falar.',
    memoryVerse: '2 Timoteo 2:2'
  },
]
