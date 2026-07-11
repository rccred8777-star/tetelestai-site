import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, CheckCircle, Play,
  MessageCircle, Target, Home,
  Heart, Users, Flame, HelpCircle,
  ArrowLeft, ArrowRight, PenLine,
  Bookmark, TrendingUp, Crown, Lightbulb,
  Shield, Eye, HandHeart
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
/*  INTERFACE                                                          */
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

/* ------------------------------------------------------------------ */
/*  DATA - 12 LICoes DE LIDERANCA DE CELULAS                           */
/* ------------------------------------------------------------------ */

const licoesData: Licao[] = [
  {
    id: 1,
    titulo: 'O Chamado para Liderar',
    versiculo: 'Ex 18:21',
    proposito: 'Vocacao',
    valor: 'Lideranca',
    concluida: false,
    icone: Crown,
    tempoEstimado: '30 min',
    descricao: 'Descubra o chamado divino para lideranca. Deus levanta lideres nao por competencia, mas por coracao disposto a servir.',
    conteudo: [
      'Lideranca crista comeca com um chamado de Deus. Nao e sobre ambicao pessoal, mas sobre obediencia a voz de Deus que diz: "Vai, eu envio voce".',
      'Jethro disse a Moises: "Tu procuras, de todo o povo, homens capazes, tementes a Deus, homens verazes, que odeiem a avareza" (Ex 18:21). Estas sao as qualidades que Deus busca em um lider.',
      'O chamado para liderar nao e apenas para pastores ou missionarios. Todo crente e chamado a influenciar outros para Cristo, e os lideres de celula sao pecas-chave nessa estrategia.',
      'Um lider de celula nao precisa ser um teologo ou um orador brilhante. Ele precisa ser: (1) Temeroso a Deus, (2) Verdadeiro em carater, (3) Livre de amor excessivo ao dinheiro, (4) Disponivel para servir.',
      'A lideranca no Reino e invertida: quem quer ser grande deve ser servo. O lider de celula e antes de tudo um servo que ama as pessoas e quer ve-las crescer.',
      'Ore sobre seu chamado. Se Deus esta colocando em seu coracao o desejo de liderar uma celula, consagre-se a esse proposito e busque preparacao.',
    ],
    perguntas: [
      'Como voce sentiu o chamado para liderar uma celula? Compartilhe sua experiencia.',
      'Quais sao as qualidades que Deus busca em um lider segundo Exodo 18:21?',
      'Qual a diferenca entre lideranca secular e lideranca no Reino de Deus?',
      'O que o impede de aceitar plenamente seu chamado para liderar?',
    ],
    pontoObediencia: 'Escreva uma declaracao de compromisso com seu chamado de lideranca. Leia-a todos os dias durante uma semana.',
    atividadePratica: 'Em grupo, cada lider compartilhe como sentiu o chamado para liderar. Orem uns pelos outros confirmando esse chamado.',
    tarefaCasa: 'Leia Exodo 18 inteiro. Anote tudo que Jethro ensinou a Moises sobre lideranca e como aplicar na sua celula.',
    versoMemorizar: {
      referencia: 'Exodo 18:21',
      texto: 'Tu procuras, de todo o povo, homens capazes, tementes a Deus, homens verazes, que odeiem a avareza.',
    },
  },
  {
    id: 2,
    titulo: 'O Carater do Lider',
    versiculo: '1Tm 3:1-7',
    proposito: 'Discipulado',
    valor: 'Santidade',
    concluida: false,
    icone: Shield,
    tempoEstimado: '35 min',
    descricao: 'O carater e a base da lideranca. Aprenda as qualidades essenciais que todo lider de celula deve desenvolver.',
    conteudo: [
      'A lideranca eficaz comeca por dentro. Nao adianta ter habilidades sem carater. As pessoas seguem quem voce e, nao apenas o que voce diz.',
      'Paulo escreveu a Timoteo sobre as qualidades de um lider (1Tm 3:1-7): irrepreensivel, marido de uma so mulher, sobrio, sensato, honesto, hospitaleiro, apto para ensinar.',
      'O lider deve ser irrepreensivel — nao significa perfeicao, mas significa que nao ha acusacao consistente contra sua conduta. E uma vida acima de suspeita.',
      'Aptidao para ensinar nao significa ser um pregador. Significa ser capaz de compartilhar a Palavra de forma clara e aplicavel. Todo lider de celula pode desenvolver essa habilidade.',
      'A hospitalidade e essencial. Uma celula deve ser um ambiente acolhedor onde todos se sintam em casa. O lider modela essa cultura.',
      'O carater e construido no secreto, na intimidade com Deus. O lider que nao cultiva uma vida devocional nao tem o que transmitir.',
    ],
    perguntas: [
      'Qual dessas qualidades de 1Tm 3 voce mais precisa desenvolver? Por que?',
      'Como o carater do lider afeta a saude da celula como um todo?',
      'Como voce cultiva sua vida devocional pessoal? O que funcionaria melhor?',
      'O que significa ser "irrepreensivel" na pratica do dia a dia?',
    ],
    pontoObediencia: 'Escolha uma qualidade de 1Tm 3 para trabalhar esta semana. Peça a um lider mais experiente para ser seu accountability.',
    atividadePratica: 'Em grupo, identifiquem pontos fortes e areas de crescimento uns dos outros. Orem pelas areas que cada um quer desenvolver.',
    tarefaCasa: 'Leia Salmos 15 e 101. Faca uma autoavaliacao honesta do seu carater como lider.',
    versoMemorizar: {
      referencia: '1 Timoteo 3:1',
      texto: 'Se alguem aspira ao oficio de bispo, deseja boa obra.',
    },
  },
  {
    id: 3,
    titulo: 'A Visao do Lider',
    versiculo: 'Pv 29:18',
    proposito: 'Lideranca',
    valor: 'Visao',
    concluida: false,
    icone: Eye,
    tempoEstimado: '30 min',
    descricao: 'Onde nao ha visao, o povo se corrompe. Aprenda a captar, comunicar e implementar a visao de Deus para sua celula.',
    conteudo: [
      '"Onde nao ha revelacao, o povo se corrompe" (Pv 29:18). Um lider precisa ter visao clara do que Deus quer fazer atraves da sua celula.',
      'A visao de uma celula Tetelestai e: (1) Conectar pessoas a Deus, (2) Crescer em discipulado, (3) Formar novos lideres, (4) Multiplicar celulas.',
      'A visao vem de Deus, nao das ideias humanas. O lider deve buscar em oracao qual a direcao especifica para sua celula nesta temporada.',
      'Comunicar a visao e responsabilidade do lider. Repita a visao constantemente. Uma visao que nao e repetida e esquecida.',
      'A visao deve ser traduzida em metas praticas: quantos novos membros? Quantos discipulos? Quando multiplicar? Metas movem pessoas.',
      'Celebre os marcos da visao. Quando alguem aceita Jesus, quando um membro completa o curso, quando a celula se multiplica — celebre!',
    ],
    perguntas: [
      'Qual a visao que Deus tem colocado em seu coracao para sua celula?',
      'Como voce comunica a visao de forma que os membros se animem a participar?',
      'Quais metas praticas voce pode estabelecer para sua celula neste semestre?',
      'Como voce celebra os marcos e vitorias da sua celula?',
    ],
    pontoObediencia: 'Escreva a declaracao de visao da sua celula. Compartilhe com todos os membros no proximo encontro.',
    atividadePratica: 'Como grupo, definam juntos 3 metas para a celula neste semestre. Escrevam-nas e coloquem em um lugar visivel.',
    tarefaCasa: 'Ore 15 minutos pedindo a Deus clareza sobre a visao especifica para sua celula nesta temporada.',
    versoMemorizar: {
      referencia: 'Proverbios 29:18',
      texto: 'Onde nao ha revelacao, o povo se corrompe; mas feliz e aquele que guarda a lei.',
    },
  },
  {
    id: 4,
    titulo: 'Amando as Ovelhas',
    versiculo: 'Jo 10:11-14',
    proposito: 'Pastoreio',
    valor: 'Amor',
    concluida: false,
    icone: Heart,
    tempoEstimado: '35 min',
    descricao: 'O lider de celula e um pastor. Aprenda a cuidar, amar e pastorear os membros da sua celula como Jesus pastoreia sua igreja.',
    conteudo: [
      'Jesus disse: "Eu sou o bom pastor; o bom pastor da a vida pelas ovelhas" (Jo 10:11). O lider de celula e um pastor sob o Pastor principal.',
      'Pastoreio nao e apenas conduzir reunioes. E cuidar das pessoas em todos os momentos: quando estao doentes, tristes, em crise ou celebrando.',
      'Cinco praticas do bom pastor: (1) Conhece suas ovelhas pelo nome, (2) Cuida quando estao feridas, (3) Busca quando se perdem, (4) Protege de perigos, (5) Alimenta com Palavra.',
      'O lider deve conhecer cada membro de sua celula pessoalmente: nome completo, situacao familiar, trabalho, sonhos, desafios. Anote essas informacoes.',
      'O amor pastoral se demonstra em detalhes: uma mensagem no aniversario, uma ligacao quando falta, uma visita no hospital, um ouvido disponivel.',
      'O lider que ama suas ovelhas nao as usa para seus objetivos. Ele as serve e as prepara para cumprir o proposito de Deus na vida delas.',
    ],
    perguntas: [
      'Voce conhece cada membro de sua celula pessoalmente? O que ainda precisa saber?',
      'Como voce pode demonstrar cuidado pastoral esta semana com alguem especifico?',
      'Qual a diferenca entre liderar projetos e pastorear pessoas?',
      'Como balancear o pastoreio sem invadir a privacidade dos membros?',
    ],
    pontoObediencia: 'Faca contato com cada membro de sua celula esta semana (mensagem, ligacao ou visita). Demonstre que se importa.',
    atividadePratica: 'Em grupo, compartilhem experiencias de como foram bem pastoreados. O que voce pode imitar na sua pratica?',
    tarefaCasa: 'Crie uma ficha pastoral para cada membro: nome, dados, necessidades, datas importantes.',
    versoMemorizar: {
      referencia: 'Joao 10:11',
      texto: 'Eu sou o bom pastor; o bom pastor da a vida pelas ovelhas.',
    },
  },
  {
    id: 5,
    titulo: 'Conduzindo o Encontro',
    versiculo: '1Co 14:26,40',
    proposito: 'Organizacao',
    valor: 'Excelencia',
    concluida: false,
    icone: Users,
    tempoEstimado: '35 min',
    descricao: 'Aprenda a conduzir um encontro de celula dinamico, participativo e que produz transformacao. A excelencia honra Deus.',
    conteudo: [
      '"Facam tudo de forma ordenada" (1Co 14:40). Um bom encontro de celula tem estrutura, mas nao e rigido. E organizado, mas e caloroso.',
      'A estrutura basica do encontro Tetelestai: (1) Louvor (10 min), (2) Palavra (15 min), (3) Compartilhamento (15 min), (4) Pratica (10 min), (5) Oração (10 min).',
      'O louvor nao precisa de musico profissional. Use um celular com playlist, ou cante a capella. O importante e a adoracao sincera.',
      'A palavra deve ser clara, objetiva e aplicavel. Use o material fornecido pela igreja. Nao e um sermao — e uma conversa sobre a Palavra.',
      'O compartilhamento e a parte mais importante. Faca perguntas abertas. Inclua todos. Nao deixe uma pessoa monopolizar a conversa.',
      'Termine na hora. Respeite o tempo das pessoas. E melhor deixar as pessoas querendo mais do que cansadas demais.',
    ],
    perguntas: [
      'Como esta a estrutura dos seus encontros? O que precisa melhorar?',
      'Como voce inclui membros timidos no compartilhamento sem constrange-los?',
      'O que fazer quando um membro monopoliza a conversa ou desvia o tema?',
      'Como voce prepara o encontro da celula durante a semana?',
    ],
    pontoObediencia: 'Prepare o proximo encontro com antecedencia: escolha louvores, revise a palavra, prepare perguntas. Nao improvise.',
    atividadePratica: 'Faca uma simulacao de encontro. Um lider conduz e os outros participam. Deem feedback construtivo ao final.',
    tarefaCasa: 'Crie um template de preparacao de encontro para usar todas as semanas. Inclua cada momento do encontro.',
    versoMemorizar: {
      referencia: '1 Corintios 14:40',
      texto: 'Facam tudo de forma ordenada.',
    },
  },
  {
    id: 6,
    titulo: 'Facilitando o Compartilhamento',
    versiculo: 'Tg 1:19',
    proposito: 'Comunicacao',
    valor: 'Escuta',
    concluida: false,
    icone: MessageCircle,
    tempoEstimado: '30 min',
    descricao: 'A arte de ouvir e fazer perguntas. Aprenda a criar um ambiente seguro onde todos se sintam a vontade para compartilhar.',
    conteudo: [
      '"Seja cada um pronto para ouvir" (Tg 1:19). Um bom facilitador e antes de tudo um bom ouvinte. Ele escuta mais do que fala.',
      'Perguntas abertas sao a chave. Em vez de "Voce gostou?", pergunte "O que essa passagem despertou em voce?". Em vez de "Entendeu?", pergunte "Como voce aplica isso?".',
      'Crie um ambiente seguro: (1) Sem julgamento, (2) Sem interrupcoes, (3) Sem corrigir na frente de todos, (4) Com validacao, (5) Com confidencialidade.',
      'A regra do silencio: depois de fazer uma pergunta, espere. O silencio incomoda, mas e necessario para que as pessoas pensem e respondam.',
      'Quando alguem da uma resposta "errada", nao corrija publicamente. Valide a participacao e, se necessario, converse depois em particular.',
      'Inclua todos. Observe quem nao esta falando e gentilmente o convide: "Joao, voce nao comentou ainda. Qual sua perspectiva?".',
    ],
    perguntas: [
      'Como voce lida com o silencio depois de fazer uma pergunta?',
      'O que fazer quando alguem compartilha algo muito pessoal ou dolorido?',
      'Como corrigir uma interpretacao biblica errada sem humilhar a pessoa?',
      'Como voce pode melhorar suas perguntas para gerar mais compartilhamento?',
    ],
    pontoObediencia: 'Na proxima celula, faca pelo menos 3 perguntas abertas e pratique ouvir sem interromper. Nao fale mais que 30% do tempo.',
    atividadePratica: 'Faca um jogo de perguntas em duplas. Um faz perguntas abertas sobre um tema, o outro responde. Troquem os papeis.',
    tarefaCasa: 'Escreva 10 perguntas abertas sobre o proximo tema de estudo da celula. Teste-as mentalmente.',
    versoMemorizar: {
      referencia: 'Tiago 1:19',
      texto: 'Seja cada um pronto para ouvir, tardio para falar, tardio para se irar.',
    },
  },
  {
    id: 7,
    titulo: 'Oração e Intercessao',
    versiculo: 'Cl 4:2',
    proposito: 'Espiritualidade',
    valor: 'Oração',
    concluida: false,
    icone: Flame,
    tempoEstimado: '35 min',
    descricao: 'A oracao e a forca motriz da celula. Aprenda a conduzir momentos de oracao e a interceder pelos membros.',
    conteudo: [
      '"Perseverai em oracao, velando com acoes de gracas" (Cl 4:2). Uma celula que nao ora e um corpo que nao respira. A oracao e essencial.',
      'O momento de oracao na celula deve ser: (1) Participativo — nao apenas o lider ora, (2) Especifico — ore pelas necessidades reais dos membros, (3) Expectante — acredite que Deus responde.',
      'Faca uma lista de oracao da celula: anote os pedidos e as respostas. Atualize semanalmente. Compartilhe as respostas para fortalecer a fe.',
      'A oracao nao e apenas no encontro. O lider deve orar individualmente por cada membro durante a semana. Ore pelos desafios, sonhos e familiares.',
      'Ensine os membros a orar. Nem todos sabem orar em voz alta. Comece com oracoes curtas e simples. Valide cada tentativa.',
      'O jejum e uma arma poderosa. Incentive a celula a jejuar por causas especificas: conversao de familiares, multiplicacao, curas.',
    ],
    perguntas: [
      'Como esta o momento de oracao na sua celula? E participativo ou monopolizado?',
      'Voce ora individualmente por cada membro da sua celula? Como pode melhorar?',
      'Como voce ensina membros timidos a orar em publico?',
      'Quais pedidos de oracao estao na lista da sua celula? Quantos ja foram respondidos?',
    ],
    pontoObediencia: 'Crie ou atualize a lista de oracao da sua celula. Ore por cada membro individualmente esta semana.',
    atividadePratica: 'Faca um momento de oracao especial. Ore uns pelos outros em pares. Coloquem as maos sobre quem esta sendo orado.',
    tarefaCasa: 'Comece um jejum semanal pela sua celula. Escolha o dia e motive os membros a participarem.',
    versoMemorizar: {
      referencia: 'Colossenses 4:2',
      texto: 'Perseverai em oracao, velando com acoes de gracas.',
    },
  },
  {
    id: 8,
    titulo: 'Visitacao e Evangelismo',
    versiculo: 'Lc 14:23',
    proposito: 'Crescimento',
    valor: 'Evangelismo',
    concluida: false,
    icone: HandHeart,
    tempoEstimado: '30 min',
    descricao: 'A celula deve crescer. Aprenda estrategias para alcancar novas pessoas, fazer visitas e ganhar almas para Jesus.',
    conteudo: [
      '"Sai pelos caminhos e valados e obriga-os a entrar, para que a minha casa se encha" (Lc 14:23). Deus quer que sua casa esteja cheia!',
      'O crescimento da celula e responsabilidade de todos os membros, nao apenas do lider. Cada membro deve trazer pelo menos uma pessoa.',
      'Tres estrategias de crescimento: (1) Relacionamento pessoal — cada membro ore e convide um amigo, (2) Visitaacao — visite membros que faltaram e novos convertidos, (3) Eventos evangelisticos.',
      'A visitacao e uma ferramenta poderosa. Visitar alguem em casa demonstra cuidado genuino e cria vinculos profundos. Nao subestime o poder de uma visita.',
      'Prepare sua celula para receber visitantes. Seja acolhedor. Apresente todos. Nao deixe o visitante isolado no canto. Inclua-o nas dinamicas.',
      'Apos o primeiro contato, siga o visitante. Mande mensagem no dia seguinte. Convide para o proximo encontro. Acompanhe ate que se torne membro.',
    ],
    perguntas: [
      'Quantos visitantes a sua celula teve nos ultimos 3 meses? Quantos permaneceram?',
      'Como voce prepara a celula para receber visitantes de forma acolhedora?',
      'Qual a diferenca entre convidar alguem para a celula e trazer alguem para a celula?',
      'Como voce faz o acompanhamento pos-visita sem parecer importuno?',
    ],
    pontoObediencia: 'Cada membro da celula deve convidar pelo menos uma pessoa esta semana. Orem juntos pelos convidados.',
    atividadePratica: 'Facam uma lista de 10 pessoas que cada membro conhece que nao tem celula. Orem por elas e planejem os convites.',
    tarefaCasa: 'Visite pelo menos um membro que esta faltando ou um novo convertido. Leve algo simples (fruta, bolo) como gesto de carinho.',
    versoMemorizar: {
      referencia: 'Lucas 14:23',
      texto: 'Sai pelos caminhos e valados e obriga-os a entrar, para que a minha casa se encha.',
    },
  },
  {
    id: 9,
    titulo: 'Discipulando com o Metodo 3/3',
    versiculo: '2Tm 2:2',
    proposito: 'Discipulado',
    valor: 'Multiplicacao',
    concluida: false,
    icone: TrendingUp,
    tempoEstimado: '35 min',
    descricao: 'O coracao do movimento: discipular para multiplicar. Aprenda a aplicar o Metodo 3/3 na sua celula e formar novos lideres.',
    conteudo: [
      '"O que de minhas maos ouviste diante de muitas testemunhas, confia-o a homens fieis, que sejam idoneos para tambem ensinar a outros" (2Tm 2:2). Discipulado em 4 geracoes: Paulo → Timoteo → homens fieis → outros.',
      'O Metodo 3/3 e uma ferramenta de discipulado que consiste em: (1) Conta-me — o lider compartilha, (2) O que voce ouviu? — o discipulo repete, (3) Pratique — coloque em acao, (4) Comprometa-se — ponto de obediencia.',
      'Identifique em sua celula quem tem potencial para ser lider. Sao pessoas com: fidelidade, disponibilidade, desejo de crescer e coracao de servo.',
      'Invista individualmente nessas pessoas. Encontre-se semanalmente para discipulado. Use o material 3/3. Seja intencional.',
      'O objetivo do discipulado nao e criar dependentes, e criar multiplicadores. Seu discipulo deve estar pronto para discipular outros.',
      'A multiplicacao da celula so acontece quando ha lideres prontos. Por isso, o discipulado de novos lideres e a prioridade numero um.',
    ],
    perguntas: [
      'Quem sao as pessoas na sua celula com potencial para lideranca? Por que voce pensa isso?',
      'Como voce comeca um processo de discipulado com alguem? Qual o primeiro passo?',
      'Qual a diferenca entre ensinar informacao e discipular para multiplicacao?',
      'Quando voce sabera que seu discipulo esta pronto para liderar sua propria celula?',
    ],
    pontoObediencia: 'Identifique 1-2 pessoas na sua celula para iniciar um processo de discipulado 3/3 esta semana. Faca o convite.',
    atividadePratica: 'Faca uma simulacao do Metodo 3/3 em trios. Um e lider, outro e discipulo, o terceiro observa e da feedback.',
    tarefaCasa: 'Leia 2 Timoteo 2 inteiro. Anote tudo que Paulo ensina sobre discipulado e multiplicacao.',
    versoMemorizar: {
      referencia: '2 Timoteo 2:2',
      texto: 'O que de minhas maos ouviste diante de muitas testemunhas, confia-o a homens fieis.',
    },
  },
  {
    id: 10,
    titulo: 'Multiplicando Celulas',
    versiculo: 'At 6:1-7',
    proposito: 'Multiplicacao',
    valor: 'Crescimento',
    concluida: false,
    icone: Users,
    tempoEstimado: '35 min',
    descricao: 'A celula que nao multiplica esta em declinio. Aprenda quando, como e por que multiplicar sua celula em duas.',
    conteudo: [
      'A igreja primitiva cresceu porque multiplicava lideres e grupos (At 6). Quando a necessidade surgiu, eles nao fizeram igreja maior — fizeram mais lideres e mais grupos.',
      'O sinal de que esta na hora de multiplicar: (1) A celula tem 12-15 pessoas, (2) Ha um lider preparado, (3) Ha um local disponivel, (4) Os membros estao engajados em trazer novos.',
      'A multiplicacao nao e divisao. Nao e "metade fica, metade sai". E "nasce uma nova familia". Todos continuam ligados. A igreja cresce.',
      'O processo de multiplicacao: (1) Anuncie com antecedencia (2-3 meses), (2) Envie lider e 3-5 membros, (3) Escolha dia e local novos, (4) Celebre como igreja, (5) Acompanhe o novo lider semanalmente.',
      'Apos a multiplicacao, a celula mae continua crescendo e se preparando para a proxima multiplicacao. E um ciclo continuo.',
      'O lider que multiplica nao perde status — ele ganha recompensa no ceu. Cada celula multiplicada e uma arvore que produz mais fruto.',
    ],
    perguntas: [
      'Sua celula esta pronta para multiplicar? O que ainda falta?',
      'Como voce comunica a multiplicacao de forma que os membros vejam como vitoria e nao perda?',
      'Quem sao os membros que voce enviaria para a nova celula? Por que?',
      'Como voce acompanhara o novo lider apos a multiplicacao?',
    ],
    pontoObediencia: 'Faca um plano de multiplicacao: data prevista, lider designado, membros que irao, local novo. Compartilhe com seu pastor.',
    atividadePratica: 'Como grupo, discutam a multiplicacao. Quem topa ir para a nova celula? Quando seria um bom momento? Orem sobre isso.',
    tarefaCasa: 'Visite o possivel local da nova celula. Converse com o futuro lider sobre a visao e o compromisso.',
    versoMemorizar: {
      referencia: 'Atos 6:7',
      texto: 'A palavra de Deus crescia, e o numero de discipulos se multiplicava grandemente.',
    },
  },
  {
    id: 11,
    titulo: 'Resolvendo Conflitos',
    versiculo: 'Mt 18:15-17',
    proposito: 'Pastoreio',
    valor: 'Unidade',
    concluida: false,
    icone: Shield,
    tempoEstimado: '30 min',
    descricao: 'Conflitos acontecem. Aprenda a lidar com desentendimentos, ofensas e problemas de forma sabia e biblica.',
    conteudo: [
      '"Se teu irmao pecar contra ti, vai e repreende-o entre ti e ele sozinho" (Mt 18:15). Jesus deu um protocolo claro para conflitos entre irmaos.',
      'O lider nao pode fugir de conflitos. Ele deve enfrenta-los com sabedoria, amor e firmeza. Ignorar conflitos e deixar que crescam e destruam a celula.',
      'Protocolo biblico: (1) Conversa particular — va sozinho, sem expor, (2) Leve testemunhas — se nao funcionar, (3) Leve a igreja — se persistir, (4) Se nao ouvir, separe-se com amor.',
      'Na pratica: ouca ambos os lados separadamente primeiro. Nao tome partido antes de ouvir. Busque entender, nao julgar.',
      'Ofensas sempre acontecerao. O lider deve ensinar o perdao e modelar reconciliacao. Uma celula saudavel e uma celula que perdoa.',
      'Alguns conflitos nao sao sobre o que parecem. Muitas vezes ha dor nao resolvida, inseguranca ou necessidade nao atendida por tras do conflito.',
    ],
    perguntas: [
      'Como voce reage quando ha conflito na sua celula? Enfrenta ou evita?',
      'Voce ja precisou aplicar Mt 18? Como foi? O que aprendeu?',
      'Como manter neutralidade quando ambos os lados sao seus amigos?',
      'Quando e hora de pedir ajuda ao pastor em um conflito?',
    ],
    pontoObediencia: 'Se ha algum conflito nao resolvido na sua celula, tome a iniciativa de conversar com os envolvidos esta semana.',
    atividadePratica: 'Facam role-play de um conflito comum. Um lider medeia. Deem feedback sobre como foi conduzido.',
    tarefaCasa: 'Leia Efesios 4:25-32. Anote como devemos nos comportar em relacionamentos para manter a unidade.',
    versoMemorizar: {
      referencia: 'Mateus 18:15',
      texto: 'Se teu irmao pecar contra ti, vai e repreende-o entre ti e ele sozinho.',
    },
  },
  {
    id: 12,
    titulo: 'O Lider que Forma Lideres',
    versiculo: 'Fl 4:9',
    proposito: 'Multiplicacao',
    valor: 'Legado',
    concluida: false,
    icone: Lightbulb,
    tempoEstimado: '35 min',
    descricao: 'O apice da lideranca: formar outros lideres. Deixe um legado de multiplicacao que continuara por geracoes.',
    conteudo: [
      '"O que tambem aprendestes, e recebestes, e ouvistes, e vistes em mim, isso praticai" (Fl 4:9). Paulo nao apenas ensinou — ele modelou. Seus discipulos viram como ele vivia.',
      'O lider que forma lideres pratica "vida transparente". Deixa que outros vejam sua vida: como ora, como estuda, como lida com dificuldades, como ama sua familia.',
      'Tres niveis de lideranca: (1) Lider que faz — trabalha sozinho, (2) Lider que lidera — mobiliza outros, (3) Lider que forma lideres — multiplica influencia atraves de outros.',
      'O legado de um lider nao e o tamanho da celula que ele liderou. E quantos lideres ele formou. Quantos estao liderando porque ele investiu neles?',
      'Invista em 3 pessoas profundamente. Estas 3 investirao em outras 3. Em poucos anos, voce tera influenciado dezenas de lideres indiretamente.',
      'O movimento Tetelestai so crescera se cada lider se comprometer a formar pelo menos 3 novos lideres. Essa e a estrategia de multiplicacao de Jesus.',
    ],
    perguntas: [
      'Quantos lideres voce ja formou? Quantos esta formando agora?',
      'Como voce pratica a "vida transparente" permitindo que outros vejam como voce vive?',
      'Em qual dos 3 niveis de lideranca voce esta? O que falta para o proximo?',
      'Qual legado voce quer deixar como lider de celula?',
    ],
    pontoObediencia: 'Escolha 3 pessoas para investir profundamente este ano. Faca o compromisso com elas e com Deus.',
    atividadePratica: 'Cerimonia de compromisso: cada lider escreve os nomes de 3 pessoas. Orem juntos, consagrem esses nomes a Deus.',
    tarefaCasa: 'Leia Filipenses 4 inteiro. Anote tudo que Paulo modelou para os filipenses seguirem. Aplique na sua lideranca.',
    versoMemorizar: {
      referencia: 'Filipenses 4:9',
      texto: 'O que tambem aprendestes, e recebestes, e ouvistes, e vistes em mim, isso praticai.',
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

export default function CursoLideres() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const licoesConcluidasInicial = licoesData.map((l) => ({
    ...l,
    concluida: localStorage.getItem(`lider-licao-${l.id}-concluida`) === 'true',
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
    localStorage.setItem(`lider-licao-${id}-concluida`, 'true')
    toast.success(`Licao ${id} concluida!`, {
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
    const key = `lider-licao-${licaoAtivaId}-pergunta-${perguntaIndex}`
    if (respostas[key]?.trim()) {
      localStorage.setItem(key, respostas[key])
      toast.success('Resposta salva!')
    }
  }

  const handleTextareaChange = (perguntaIndex: number, value: string) => {
    setRespostas((prev) => ({
      ...prev,
      [`lider-licao-${licaoAtivaId}-pergunta-${perguntaIndex}`]: value,
    }))
  }

  return (
    <div className="flex min-h-[calc(100dvh-56px)]">
      {/* ========== SIDEBAR ========== */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[280px] bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ top: '56px', bottom: 0 }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header do Curso */}
          <div className="p-4 border-b bg-[#1A365D]">
            <h2 className="font-heading text-lg font-bold text-white">Curso de Lideres de Celulas</h2>
            <p className="text-xs text-white/70 mt-1">12 licoes para formar lideres multiplicadores</p>
          </div>

          {/* Progress Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#1A202C]">Progresso do Curso</span>
              <span className="text-sm font-bold text-[#D4A843]">{progressoTotal}%</span>
            </div>
            <Progress value={progressoTotal} className="h-2" />
            <p className="text-xs text-[#718096] mt-2">
              {licoes.filter((l) => l.concluida).length} de {licoes.length} licoes concluidas
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
              onClick={() => navigate('/member/area-lider')}
            >
              <TrendingUp className="w-4 h-4" />
              Ver Area do Lider
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

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b sticky top-0 z-20">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <BookOpen className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#1A202C] truncate">
              Licao {licaoAtiva.id}: {licaoAtiva.titulo}
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
                  Licao {licaoAtiva.id} de {licoes.length}
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
                    Concluida
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
                  Video da Licao {licaoAtiva.id}
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
                  Conteudo
                </TabsTrigger>
                <TabsTrigger value="perguntas" className="gap-1.5">
                  <HelpCircle className="w-4 h-4 hidden sm:inline" />
                  Perguntas
                </TabsTrigger>
                <TabsTrigger value="pratica" className="gap-1.5">
                  <Target className="w-4 h-4 hidden sm:inline" />
                  Pratica
                </TabsTrigger>
              </TabsList>

              {/* Tab: Conteudo */}
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
                            placeholder="Escreva sua reflexao aqui..."
                            value={
                              respostas[`lider-licao-${licaoAtivaId}-pergunta-${i}`] ||
                              localStorage.getItem(`lider-licao-${licaoAtivaId}-pergunta-${i}`) ||
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

              {/* Tab: Pratica */}
              <TabsContent value="pratica" className="mt-6">
                <div className="space-y-5">
                  {/* Ponto de Obediencia */}
                  <SecaoCard icone={Target} titulo="Ponto de Obediencia" cor="bg-orange-500">
                    <p className="text-[#1A202C] leading-relaxed">
                      {licaoAtiva.pontoObediencia}
                    </p>
                  </SecaoCard>

                  {/* Atividade Pratica */}
                  <SecaoCard icone={PenLine} titulo="Atividade Pratica no Grupo" cor="bg-blue-500">
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
                Licao Anterior
              </Button>

              {!licaoAtiva.concluida ? (
                <Button
                  onClick={() => marcarComoConcluida(licaoAtiva.id)}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Marcar como Concluida
                </Button>
              ) : (
                <Badge className="bg-green-100 text-green-700 px-4 py-2 gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Licao Concluida
                </Badge>
              )}

              <Button
                variant="outline"
                onClick={irParaProxima}
                disabled={licaoAtivaId === licoes.length}
                className="w-full sm:w-auto gap-2"
              >
                Proxima Licao
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
