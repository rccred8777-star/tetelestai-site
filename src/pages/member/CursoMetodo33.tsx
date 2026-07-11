import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, CheckCircle, Play,
  MessageCircle, Target, Home, Star,
  Heart, Users, Flame, HelpCircle,
  ArrowLeft, ArrowRight, PenLine,
  Bookmark, TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Licao {
  id: number
  titulo: string
  versiculo: string
  proposito: string
  valor: string
  concluida: boolean
  icone: React.ElementType
  descricao: string
  conteudo: string[]
  perguntas: string[]
  pontoObediencia: string
  atividadePratica: string
  tarefaCasa: string
  versoMemorizar: { referencia: string; texto: string }
  videoUrl?: string
  tempoEstimado: string
}

const licoesData: Licao[] = [
  {
    id: 1,
    titulo: 'Testemunho Pessoal Tetelestai',
    versiculo: 'Ap 12:11',
    proposito: 'Evangelismo',
    valor: 'Missão',
    concluida: false,
    icone: Flame,
    tempoEstimado: '30 min',
    descricao: 'Aprenda a compartilhar sua história de fé de forma clara, autêntica e impactante. Seu testemunho é uma ferramenta poderosa de evangelismo.',
    conteudo: [
      'O testemunho pessoal é uma das ferramentas mais poderosas para compartilhar o evangelho. Quando contamos o que Deus fez em nossas vidas, criamos conexões autênticas.',
      'Eles o venceram pelo sangue do Cordeiro e pela palavra do seu testemunho (Ap 12:11). Nossa história de fé tem poder para inspirar outros a buscarem a Deus.',
      'Um bom testemunho tem três partes: (1) Como era sua vida antes de Cristo, (2) Como conheceu a Jesus, e (3) Como sua vida mudou depois.',
      'Pratique seu testemunho até que ele dure cerca de 3 minutos. Seja honesto, específico e focado no que Cristo fez por você.',
      'O objetivo não é impressionar, mas sim conectar. Pessoas se conectam com vulnerabilidade e autenticidade. Compartilhe suas lutas reais e como Deus as transformou.',
      'Memorize sua história para que possa compartilhá-la a qualquer momento. Peça ao Espírito Santo oportunidades para testemunhar esta semana.',
    ],
    perguntas: [
      'Como você se sente ao compartilhar seu testemunho? O que o impede?',
      'Quais são os três momentos-chave da sua história de fé?',
      'Como você pode usar seu testemunho em seu contexto diário (trabalho, família, escola)?',
      'Qual foi a última vez que você compartilhou Jesus com alguém? Como foi?',
    ],
    pontoObediencia: 'Escreva seu testemunho em 3 minutos e compartilhe com pelo menos uma pessoa esta semana.',
    atividadePratica: 'Em pares, pratique contar seu testemunho em 3 minutos. O parceiro deve dar feedback sobre clareza e autenticidade.',
    tarefaCasa: 'Compartilhe seu testemunho com pelo menos uma pessoa que não conhece Jesus. Anote o resultado e traga para o próximo encontro.',
    versoMemorizar: {
      referencia: 'Apocalipse 12:11',
      texto: 'Eles o venceram pelo sangue do Cordeiro e pela palavra do seu testemunho.',
    },
  },
  {
    id: 2,
    titulo: 'Certeza da Salvação',
    versiculo: '1Jo 5:13',
    proposito: 'Discipulado',
    valor: 'Palavra de Deus',
    concluida: false,
    icone: CheckCircle,
    tempoEstimado: '35 min',
    descricao: 'Tenha certeza da sua salvação baseada na Palavra de Deus, não em sentimentos. A Bíblia nos dá garantias claras.',
    conteudo: [
      'Muitos cristãos vivem sem ter certeza de sua salvação, baseando-se em sentimentos que mudam. Mas a Bíblia nos dá garantias objetivas.',
      'Escrevi estas coisas a vocês que creem no nome do Filho de Deus, para que saibam que têm a vida eterna (1Jo 5:13). A certeza da salvação é um privilégio do cristão.',
      'A salvação não é baseada em nossos sentimentos, mas nos fatos da Palavra de Deus. Deus prometeu, e Ele é fiel.',
      'Cinco evidências bíblicas de salvação: (1) Você confessa Jesus como Senhor, (2) Você ama os irmãos, (3) Você obedece aos mandamentos de Deus, (4) Você deseja viver para Deus, (5) O Espírito Santo testifica com seu espírito.',
      'Quando as dúvidas vierem, não olhe para seus sentimentos — olhe para a cruz e para as promessas de Deus.',
      'A certeza da salvação nos dá confiança para viver a vida cristã sem medo. Somos filhos amados de Deus, não escravos incertos.',
    ],
    perguntas: [
      'Você tem certeza de sua salvação? O que te dá (ou te tiraria) essa certeza?',
      'Por que alguns cristãos vivem sem ter certeza da salvação?',
      'Como a certeza da salvação muda a forma como vivemos o dia a dia?',
      'O que você diria a alguém que diz: "Não me sinto salvo"?',
    ],
    pontoObediencia: 'Memorize 1João 5:13 e declare em voz alta: "Eu tenho vida eterna porque creio em Jesus."',
    atividadePratica: 'Escreva uma carta a si mesmo listando 5 razões bíblicas pelas quais você pode ter certeza de sua salvação. Leia sempre que duvidar.',
    tarefaCasa: 'Compartilhe com alguém que está inseguro sobre sua salvação as garantias bíblicas que você aprendeu.',
    versoMemorizar: {
      referencia: '1 João 5:13',
      texto: 'Escrevi estas coisas a vocês que creem no nome do Filho de Deus, para que saibam que têm a vida eterna.',
    },
  },
  {
    id: 3,
    titulo: 'Perdão e Restauração',
    versiculo: 'Ef 4:32',
    proposito: 'Comunhão',
    valor: 'Unidade',
    concluida: false,
    icone: Heart,
    tempoEstimado: '30 min',
    descricao: 'O perdão é a base da comunhão. Aprenda a perdoar como Deus perdoou você e experimente a liberdade da restauração.',
    conteudo: [
      'O perdão é a fundação de todo relacionamento saudável. Sem perdão, não há comunhão. Sem comunhão, não há igreja.',
      'Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo (Ef 4:32).',
      'Perdoar não é um sentimento, é uma decisão. Deus nos mandou perdoar assim como Ele perdoou — livremente e completamente.',
      'Três níveis de perdão: (1) Perdoar a Deus por desapontamentos, (2) Perdoar a si mesmo, (3) Perdoar aos outros que o machucaram.',
      'O perdão liberta quem perdoa. Quando não perdoamos, carregamos um fardo que só nos prejudica. A pessoa que você não perdoa pode nem saber.',
      'O perdão não significa aprovar o erro nem necessariamente restaurar a confiança. Significa entregar a justiça nas mãos de Deus.',
    ],
    perguntas: [
      'Existe alguém que você ainda não perdoou completamente? O que o impede?',
      'Qual é a diferença entre perdoar e reconciliar? É possível perdoar sem reconciliar?',
      'Como podemos perdoar quando a pessoa não pede perdão?',
      'Como o perdão de Deus por nós deve moldar nossa disposição de perdoar outros?',
    ],
    pontoObediencia: 'Identifique uma pessoa que você precisa perdoar e tome a decisão de perdoá-la hoje. Ore por ela por 7 dias consecutivos.',
    atividadePratica: 'Em grupo, compartilhe (se sentir confortável) sobre uma experiência de perdão que transformou sua vida. Orem uns pelos outros.',
    tarefaCasa: 'Escreva uma carta de perdão (não precisa enviar) a alguém que o machucou. Libere o perdão diante de Deus.',
    versoMemorizar: {
      referencia: 'Efésios 4:32',
      texto: 'Sejam bondosos e compassivos uns para com os outros, perdoando-se mutuamente, assim como Deus os perdoou em Cristo.',
    },
  },
  {
    id: 4,
    titulo: 'Vida de Oração',
    versiculo: 'Mt 6:9-13',
    proposito: 'Adoração',
    valor: 'Oração',
    concluida: false,
    icone: MessageCircle,
    tempoEstimado: '35 min',
    descricao: 'A oração é a respiração da alma. Aprenda a orar segundo o modelo de Jesus e desenvolva uma vida de comunhão constante com Deus.',
    conteudo: [
      'A oração não é apenas fazer pedidos a Deus — é relacionamento. É conversar com o Pai que nos ama e quer ouvir nossa voz.',
      'Jesus nos ensinou a orar com a Oração do Pai Nosso (Mt 6:9-13). Vamos analisar cada elemento:',
      '1. "Pai nosso" — Oração começa com relacionamento. Deus não é um estranho distante; Ele é nosso Pai amoroso.',
      '2. "Santificado seja o teu nome" — Adoração vem primeiro. Antes de pedir qualquer coisa, honramos quem Deus é.',
      '3. "Venha o teu reino" — Submissão à vontade de Deus. Oramos para que Seu proposto se cumpra na terra.',
      '4. "O pão nosso de cada dia" — Confiança na provisão de Deus. Deus cuida de nossas necessidades diárias.',
      '5. "Perdoa as nossas dívidas" — Confissão e perdão. Mantemos nossa comunhão limpa.',
      '6. "Não nos deixes cair em tentação" — Proteção e dependência. Reconhecemos nossa vulnerabilidade.',
      '7. "Pois teu é o reino" — Concluímos com louvor. Reconhecemos que Deus é soberano sobre tudo.',
    ],
    perguntas: [
      'Como é sua vida de oração atualmente? O que funcionaria melhor para você?',
      'Por que Jesus ensinou a orar "Pai nosso" e não "Deus do universo"?',
      'O que significa "venha o teu reino" em oração prática?',
      'Como podemos desenvolver o hábito de orar sem cessar no dia a dia?',
    ],
    pontoObediencia: 'Estabeleça um horário fixo de oração diária de pelo menos 10 minutos. Use o modelo do Pai Nosso como estrutura.',
    atividadePratica: 'Ore em grupo usando o modelo do Pai Nosso. Cada pessoa ora uma frase do modelo, aplicando-a à vida real do grupo.',
    tarefaCasa: 'Anote todas as suas orações respondidas durante a semana. Compartilhe no próximo encontro.',
    versoMemorizar: {
      referencia: 'Mateus 6:9-10',
      texto: 'Portanto, vós deveis orar assim: Pai nosso que estás nos céus, santificado seja o teu nome; venha o teu reino, seja feita a tua vontade.',
    },
  },
  {
    id: 5,
    titulo: 'Palavra de Deus',
    versiculo: '2Tm 3:16',
    proposito: 'Discipulado',
    valor: 'Palavra de Deus',
    concluida: false,
    icone: BookOpen,
    tempoEstimado: '35 min',
    descricao: 'A Bíblia é a fonte de toda verdade espiritual. Aprenda a ler, meditar e aplicar a Palavra de Deus de forma transformadora.',
    conteudo: [
      'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a instrução na justiça (2Tm 3:16).',
      'A Bíblia não é apenas um livro — é a Palavra viva de Deus. Ela tem poder para transformar vidas, porque é inspirada pelo próprio Espírito Santo.',
      'Método S.O.A.P. de estudo bíblico: (S) Escritura — Leia um trecho. (O) Observação — O que diz? (A) Aplicação — O que devo fazer? (P) Oração — Ore sobre o que aprendeu.',
      'A leitura bíblica deve ser diária, mesmo que por pouco tempo. Consistência é mais importante que quantidade. Um capítulo por dia é melhor que dez capítulos uma vez por mês.',
      'A Bíblia não foi dada apenas para aumentar nosso conhecimento, mas para transformar nosso caráter. A aplicação é o objetivo final.',
      'Memorizar Escrituras é armazenar a Palavra de Deus no coração. Quando vierem tentações, dúvidas ou medos, a Palavra estará pronta para combater.',
    ],
    perguntas: [
      'Como está seu hábito de leitura da Bíblia? O que o ajudaria a ser mais consistente?',
      'Qual a diferença entre ler a Bíblia para informação e lê-la para transformação?',
      'Como o método S.O.A.P. pode ajudar em seu estudo bíblico pessoal?',
      'Qual versículo você memorizaria primeiro e por quê?',
    ],
    pontoObediencia: 'Comece a praticar o método S.O.A.P. diariamente esta semana. Escolha um livro da Bíblia e leia um capítulo por dia.',
    atividadePratica: 'Em grupo, pratique o método S.O.A.P. com um versículo escolhido. Cada pessoa compartilha sua aplicação pessoal.',
    tarefaCasa: 'Memorize um versículo novo esta semana. Escreva-o em cartões e coloque em locais visíveis.',
    versoMemorizar: {
      referencia: '2 Timóteo 3:16-17',
      texto: 'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a instrução na justiça.',
    },
  },
  {
    id: 6,
    titulo: 'Igreja em Comunhão',
    versiculo: 'At 2:42-47',
    proposito: 'Comunhão',
    valor: 'Unidade',
    concluida: false,
    icone: Users,
    tempoEstimado: '30 min',
    descricao: 'A igreja não é um prédio — é uma família. Descubra o modelo da igreja primitiva e como viver em comunhão autêntica hoje.',
    conteudo: [
      'Eles se dedicavam ao ensino dos apóstolos e à comunhão, ao partir do pão e às orações (At 2:42). Este é o modelo da igreja que mudou o mundo.',
      'A igreja primitiva tinha quatro pilares: (1) Doutrina — ensino dos apóstolos, (2) Comunhão — koinônia, partilha da vida, (3) Ceia — lembrança de Cristo, (4) Oração — dependência de Deus.',
      'Comunhão (koinônia) é mais que socializar. É partilhar a vida, os recursos, os sonhos e as lutas. É estar juntos em propósito.',
      'A igreja é o corpo de Cristo — cada membro tem uma função. Não existem crentes dispensáveis. Todos são necessários.',
      'A igreja deve ser um lugar de segurança onde podemos ser autênticos. Não precisamos fingir perfeição; precisamos praticar graça.',
      'Viver em comunhão exige compromisso. A igreja não é um serviço de consumo — é uma família onde todos servem e são servidos.',
    ],
    perguntas: [
      'O que significa comunhão (koinônia) para você? Como ela difere de simplesmente "fazer amigos na igreja"?',
      'Quais são os 4 pilares da igreja primitiva e como vivemos cada um hoje?',
      'Por que algumas pessoas se isolam da igreja? Como podemos ajudá-las?',
      'Como a célula/prupo pequeno expressa o modelo da igreja primitiva?',
    ],
    pontoObediencia: 'Identifique uma pessoa em sua igreja que você pode servir esta semana. Faça algo prático por ela sem esperar nada em troca.',
    atividadePratica: 'Como grupo, liste as necessidades práticas dos membros. Estabeleçam como vão suprir uma delas coletivamente.',
    tarefaCasa: 'Visite ou ligue para alguém que não compareceu à célula recentemente. Demonstre que faz parte da família.',
    versoMemorizar: {
      referencia: 'Atos 2:42',
      texto: 'Eles se dedicavam ao ensino dos apóstolos e à comunhão, ao partir do pão e às orações.',
    },
  },
  {
    id: 7,
    titulo: 'O Espírito Santo e o Avivamento',
    versiculo: 'At 1:8',
    proposito: 'Adoração',
    valor: 'Missão',
    concluida: false,
    icone: Flame,
    tempoEstimado: '35 min',
    descricao: 'O Espírito Santo é a fonte de poder para testemunhar. Descubra quem Ele é, o que Ele faz e como ser cheio do Espírito.',
    conteudo: [
      'Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas (At 1:8). O Espírito Santo não é opcional — Ele é essencial.',
      'O Espírito Santo é Deus. Ele é a terceira pessoa da Trindade, co-igual e co-eterno com o Pai e o Filho. Ele é nosso consolador, guia e poder.',
      'O Espírito Santo faz oito coisas principais na vida do crente: (1) Regenera, (2) Batiza, (3) Habita, (4) Ensina, (5) Guia, (6) Dá poder, (7) Produz fruto, (8) Distribui dons.',
      'Ser cheio do Espírito Santo não é ter mais do Espírito, mas deixar que Ele tenha mais de você. É rendição contínua.',
      'O avivamento começa quando o povo de Deus busca a presença de Deus. 2 Crônicas 7:14 mostra o padrão: humilhação, oração, busca e arrependimento.',
      'Avivamento é o povo de Deus vivendo como povo de Deus. Não é sobre emoção, mas sobre obediência radical ao Espírito Santo.',
    ],
    perguntas: [
      'Como você descreveria sua experiência com o Espírito Santo?',
      'O que significa ser "cheio do Espírito" na prática diária?',
      'Quais sinais indicam que um crente está cheio do Espírito?',
      'Como podemos buscar e manter um avivamento pessoal?',
    ],
    pontoObediencia: 'Peça a Deus para encher você com o Espírito Santo todos os dias esta semana. Fique sensível à Sua voz e direção.',
    atividadePratica: 'Em grupo, orem uns pelos outros para serem cheios do Espírito Santo. Peçam ao Espírito Santo para revelar áreas que precisam de rendição.',
    tarefaCasa: 'Leia Atos 1-2 e anote tudo que o Espírito Santo faz. Compartilhe suas descobertas no próximo encontro.',
    versoMemorizar: {
      referencia: 'Atos 1:8',
      texto: 'Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas.',
    },
  },
  {
    id: 8,
    titulo: 'Santidade e Excelência',
    versiculo: '1Pe 1:15-16',
    proposito: 'Discipulado',
    valor: 'Santidade',
    concluida: false,
    icone: Star,
    tempoEstimado: '30 min',
    descricao: 'Santidade não é perfeição — é separação. Aprenda a viver uma vida separada para Deus em todos os aspectos da sua existência.',
    conteudo: [
      'Mas, assim é santo aquele que os chamou, sede vós também santos em toda a vossa maneira de viver (1Pe 1:15). Santidade é um estilo de vida.',
      'Santidade não significa ser perfeito. Significa ser separado para Deus. É viver diferente do mundo porque pertencemos a Deus.',
      'A santidade se manifesta em três áreas: (1) Santidade interior — pensamentos e motivos, (2) Santidade exterior — ações e comportamentos, (3) Santidade relacional — como tratamos os outros.',
      'Excelência é fazer o melhor com o que Deus nos deu. Não é sobre ser perfeito, mas sobre ser fiel. Colossenses 3:23 diz para trabalharmos de todo coração.',
      'A santidade é tanto posição quanto prática. Posicionalmente somos santos em Cristo; praticamente, crescemos em santidade pelo Espírito Santo.',
      'A busca pela santidade não é legalismo — é amor. Quando amamos a Deus, queremos agradá-Lo em tudo.',
    ],
    perguntas: [
      'Qual a diferença entre santidade e legalismo? Como evitar cair em extremos?',
      'Em que área da sua vida você precisa de mais santidade prática?',
      'Como a santidade interior (pensamentos) se relaciona com a santidade exterior (ações)?',
      'O que significa ser "excelente" como cristão no seu contexto diário?',
    ],
    pontoObediencia: 'Identifique uma área de sua vida que não reflete santidade. Tome a decisão de mudar e peça ajuda de um irmão para se accountability.',
    atividadePratica: 'Em grupo, compartilhem (voluntariamente) uma área onde querem crescer em santidade. Orem uns pelos outros.',
    tarefaCasa: 'Leia 1 Pedro 1 inteiro. Anote todos os chamados à santidade e como eles se aplicam à sua vida.',
    versoMemorizar: {
      referencia: '1 Pedro 1:15-16',
      texto: 'Mas, assim é santo aquele que os chamou, sede vós também santos em toda a vossa maneira de viver.',
    },
  },
  {
    id: 9,
    titulo: 'Multiplicação — Faça Discípulos',
    versiculo: 'Mt 28:18-20',
    proposito: 'Evangelismo',
    valor: 'Multiplicação',
    concluida: false,
    icone: TrendingUp,
    tempoEstimado: '35 min',
    descricao: 'A Grande Comissão é o chamado de todo cristão. Aprenda a fazer discípulos que fazem discípulos — multiplicando para a eternidade.',
    conteudo: [
      'Fazei discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, ensinando-os a obedecer a tudo o que eu vos ordenei (Mt 28:19-20).',
      'A Grande Comissão não é apenas para missionários ou pastores — é para todo cristão. Jesus nos chamou a todos para fazermos discípulos.',
      'Um discípulo não é apenas um convertido. É alguém que segue a Jesus, é transformado por Jesus e está comprometido com a missão de Jesus.',
      'O processo de multiplicação: Você é alcançado → Você é consolidado → Você é discipulado → Vocé discipula outros → Seus discípulos discipulam outros.',
      'O Método 3/3 foi projetado para multiplicação. Cada pessoa que completa as 9 lições está pronta para facilitar seu próprio grupo.',
      'A multiplicação é o sinal de saúde de uma igreja. Igrejas que não multiplicam estão em declínio. Igrejas que multiplicam mudam o mundo.',
      'O seu "3" — os três primeiros que você vai discipular. Ore e identifique quem Deus está colocando em seu coração.',
    ],
    perguntas: [
      'Quem foram as pessoas que mais te influenciaram espiritualmente? Como elas te discipularam?',
      'Qual é a diferença entre converter alguém e discipular alguém?',
      'Quem são as 3 pessoas que Deus está colocando em seu coração para discipular?',
      'O que impede a multiplicação de discípulos na igreja hoje? Como superar?',
    ],
    pontoObediencia: 'Liste 3 pessoas que você vai começar a discipular. Ore por elas diariamente e inicie um convite esta semana.',
    atividadePratica: 'Como grupo, pratique o convite a discipulado. Cada pessoa simula convidar alguém para começar um grupo 3/3.',
    tarefaCasa: 'Faça o convite real a pelo menos uma pessoa para começar a ser discipulado. Use seu testemunho e o que aprendeu no curso.',
    versoMemorizar: {
      referencia: 'Mateus 28:19-20',
      texto: 'Portanto, vão e façam discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo.',
    },
  },
]

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function VersoCard({ referencia, texto }: { referencia: string; texto: string }) {
  const [mostrarTexto, setMostrarTexto] = useState(false)

  return (
    <div className="bg-[#1A365D]/5 rounded-xl p-6 border border-[#1A365D]/10">
      <div className="flex items-center gap-2 mb-3">
        <Bookmark className="w-5 h-5 text-[#D4A843]" />
        <span className="font-semibold text-[#1A365D]">Verso para Memorizar</span>
      </div>
      <p className="text-lg font-medium text-[#1A202C] mb-3 leading-relaxed">
        {mostrarTexto ? `"${texto}"` : '"..."'}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#D4A843] font-medium">{referencia}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMostrarTexto(!mostrarTexto)}
          className="text-[#1A365D] hover:text-[#1A365D] hover:bg-[#1A365D]/10"
        >
          {mostrarTexto ? 'Ocultar' : 'Revelar'}
        </Button>
      </div>
    </div>
  )
}

function SecaoCard({
  icone: Icon,
  titulo,
  cor,
  children,
}: {
  icone: React.ElementType
  titulo: string
  cor: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-0">
        <div className={`${cor} p-4 rounded-t-lg flex items-center gap-3`}>
          <Icon className="w-5 h-5 text-white" />
          <h3 className="font-semibold text-white">{titulo}</h3>
        </div>
        <div className="p-5">{children}</div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function CursoMetodo33() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const licoesConcluidasInicial = licoesData.map((l) => ({
    ...l,
    concluida: localStorage.getItem(`licao-${l.id}-concluida`) === 'true',
  }))

  const [licoes, setLicoes] = useState<Licao[]>(licoesConcluidasInicial)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [respostas, setRespostas] = useState<Record<string, string>>({})

  const licaoIdParam = searchParams.get('licao')
  const licaoAtivaId = licaoIdParam ? parseInt(licaoIdParam) : 1

  const licaoAtiva = licoes.find((l) => l.id === licaoAtivaId) || licoes[0]
  const progressoTotal = Math.round((licoes.filter((l) => l.concluida).length / licoes.length) * 100)

  const selecionarLicao = (id: number) => {
    setSearchParams({ licao: String(id) })
    setSidebarOpen(false)
  }

  const marcarComoConcluida = (id: number) => {
    const novasLicoes = licoes.map((l) =>
      l.id === id ? { ...l, concluida: true } : l
    )
    setLicoes(novasLicoes)
    localStorage.setItem(`licao-${id}-concluida`, 'true')
    toast.success(`Lição ${id} concluída!`, {
      description: 'Seu progresso foi salvo. Continue assim!',
    })
  }

  const irParaProxima = () => {
    if (licaoAtivaId < licoes.length) {
      selecionarLicao(licaoAtivaId + 1)
    }
  }

  const irParaAnterior = () => {
    if (licaoAtivaId > 1) {
      selecionarLicao(licaoAtivaId - 1)
    }
  }

  const salvarResposta = (perguntaIndex: number) => {
    const key = `licao-${licaoAtivaId}-pergunta-${perguntaIndex}`
    if (respostas[key]?.trim()) {
      localStorage.setItem(key, respostas[key])
      toast.success('Resposta salva!')
    }
  }

  const handleTextareaChange = (perguntaIndex: number, value: string) => {
    setRespostas((prev) => ({
      ...prev,
      [`licao-${licaoAtivaId}-pergunta-${perguntaIndex}`]: value,
    }))
  }

  return (
    <div className="flex min-h-[calc(100dvh-56px)]">
      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[280px] bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '56px', bottom: 0 }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Progress Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#1A202C]">Progresso do Curso</span>
              <span className="text-sm font-bold text-[#D4A843]">{progressoTotal}%</span>
            </div>
            <Progress value={progressoTotal} className="h-2" />
            <p className="text-xs text-[#718096] mt-2">
              {licoes.filter((l) => l.concluida).length} de {licoes.length} lições concluídas
            </p>
          </div>

          {/* Lessons List */}
          <nav className="flex-1 py-2">
            {licoes.map((licao) => (
              <button
                key={licao.id}
                onClick={() => selecionarLicao(licao.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-gray-50 ${
                  licaoAtivaId === licao.id
                    ? 'bg-[#1A365D]/5 border-l-[3px] border-[#D4A843]'
                    : 'border-l-[3px] border-transparent'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    licao.concluida
                      ? 'bg-green-100'
                      : licaoAtivaId === licao.id
                      ? 'bg-[#1A365D]'
                      : 'bg-gray-100'
                  }`}
                >
                  {licao.concluida ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <span
                      className={`text-xs font-bold ${
                        licaoAtivaId === licao.id ? 'text-white' : 'text-[#4A5568]'
                      }`}
                    >
                      {licao.id}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      licaoAtivaId === licao.id ? 'text-[#1A365D]' : 'text-[#1A202C]'
                    }`}
                  >
                    {licao.titulo}
                  </p>
                  <p className="text-xs text-[#718096]">{licao.versiculo}</p>
                </div>
              </button>
            ))}
          </nav>

          {/* Dashboard Link */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full gap-2 text-[#1A365D] border-[#1A365D]/20 hover:bg-[#1A365D]/5"
              onClick={() => navigate('/member/dashboard-metodo-33')}
            >
              <TrendingUp className="w-4 h-4" />
              Ver Dashboard 3/3
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{ top: '56px' }}
        />
      )}

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b sticky top-0 z-20">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <BookOpen className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#1A202C] truncate">
              Lição {licaoAtiva.id}: {licaoAtiva.titulo}
            </p>
          </div>
          <Badge variant="outline" className="text-xs shrink-0">
            {licaoAtiva.tempoEstimado}
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={licaoAtiva.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 lg:p-8 max-w-4xl"
          >
            {/* Lesson Header */}
            <div className="mb-8">
              <div className="hidden lg:flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-[#D4A843] border-[#D4A843]/40">
                  Lição {licaoAtiva.id} de 9
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {licaoAtiva.tempoEstimado}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {licaoAtiva.proposito}
                </Badge>
                {licaoAtiva.concluida && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Concluída
                  </Badge>
                )}
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A202C] mb-3">
                {licaoAtiva.titulo}
              </h1>
              <p className="text-[#D4A843] font-medium mb-2">
                <BookOpen className="w-4 h-4 inline mr-1" />
                {licaoAtiva.versiculo}
              </p>
              <p className="text-[#4A5568] leading-relaxed">
                {licaoAtiva.descricao}
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="mb-8">
              <div className="relative bg-[#0F2744] rounded-xl overflow-hidden aspect-video flex flex-col items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A365D]/80 to-[#0F2744]/90" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 w-20 h-20 rounded-full bg-[#D4A843] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <Play className="w-8 h-8 text-[#0F2744] ml-1" />
                </motion.div>
                <p className="relative z-10 text-white/70 mt-4 text-sm font-medium">
                  Video da Lição {licaoAtiva.id}
                </p>
                <p className="relative z-10 text-white/40 text-xs mt-1">
                  Em breve
                </p>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="conteudo" className="mb-8">
              <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
                <TabsTrigger value="conteudo" className="gap-1.5">
                  <BookOpen className="w-4 h-4 hidden sm:inline" />
                  Conteúdo
                </TabsTrigger>
                <TabsTrigger value="perguntas" className="gap-1.5">
                  <HelpCircle className="w-4 h-4 hidden sm:inline" />
                  Perguntas
                </TabsTrigger>
                <TabsTrigger value="pratica" className="gap-1.5">
                  <Target className="w-4 h-4 hidden sm:inline" />
                  Prática
                </TabsTrigger>
              </TabsList>

              {/* Tab: Conteúdo */}
              <TabsContent value="conteudo" className="mt-6">
                <div className="space-y-4">
                  {licaoAtiva.conteudo.map((paragrafo, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-[#1A202C] leading-relaxed text-base"
                    >
                      {paragrafo}
                    </motion.p>
                  ))}
                </div>

                {/* Verso para Memorizar */}
                <div className="mt-8">
                  <VersoCard
                    referencia={licaoAtiva.versoMemorizar.referencia}
                    texto={licaoAtiva.versoMemorizar.texto}
                  />
                </div>
              </TabsContent>

              {/* Tab: Perguntas */}
              <TabsContent value="perguntas" className="mt-6">
                <div className="space-y-6">
                  {licaoAtiva.perguntas.map((pergunta, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-7 h-7 rounded-full bg-[#1A365D] flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">{i + 1}</span>
                            </div>
                            <h4 className="font-medium text-[#1A202C]">{pergunta}</h4>
                          </div>
                          <Textarea
                            placeholder="Escreva sua reflexão aqui..."
                            value={
                              respostas[`licao-${licaoAtivaId}-pergunta-${i}`] ||
                              localStorage.getItem(`licao-${licaoAtivaId}-pergunta-${i}`) ||
                              ''
                            }
                            onChange={(e) => handleTextareaChange(i, e.target.value)}
                            className="min-h-[100px] resize-none border-gray-200 focus:border-[#D4A843] focus:ring-[#D4A843]/20"
                          />
                          <div className="flex justify-end mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => salvarResposta(i)}
                              className="text-[#1A365D] hover:bg-[#1A365D]/5 gap-1"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              Salvar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab: Prática */}
              <TabsContent value="pratica" className="mt-6">
                <div className="space-y-5">
                  {/* Ponto de Obediência */}
                  <SecaoCard icone={Target} titulo="Ponto de Obediência" cor="bg-orange-500">
                    <p className="text-[#1A202C] leading-relaxed">
                      {licaoAtiva.pontoObediencia}
                    </p>
                  </SecaoCard>

                  {/* Atividade Prática */}
                  <SecaoCard icone={PenLine} titulo="Atividade Prática no Grupo" cor="bg-blue-500">
                    <p className="text-[#1A202C] leading-relaxed">
                      {licaoAtiva.atividadePratica}
                    </p>
                  </SecaoCard>

                  {/* Tarefa para Casa */}
                  <SecaoCard icone={Home} titulo="Tarefa para Casa" cor="bg-purple-500">
                    <p className="text-[#1A202C] leading-relaxed">
                      {licaoAtiva.tarefaCasa}
                    </p>
                  </SecaoCard>

                  {/* Verso para Memorizar */}
                  <VersoCard
                    referencia={licaoAtiva.versoMemorizar.referencia}
                    texto={licaoAtiva.versoMemorizar.texto}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-8" />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={irParaAnterior}
                disabled={licaoAtivaId === 1}
                className="w-full sm:w-auto gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Lição Anterior
              </Button>

              {!licaoAtiva.concluida ? (
                <Button
                  onClick={() => marcarComoConcluida(licaoAtiva.id)}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Marcar como Concluída
                </Button>
              ) : (
                <Badge className="bg-green-100 text-green-700 px-4 py-2 gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Lição Concluída
                </Badge>
              )}

              <Button
                variant="outline"
                onClick={irParaProxima}
                disabled={licaoAtivaId === licoes.length}
                className="w-full sm:w-auto gap-2"
              >
                Próxima Lição
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
