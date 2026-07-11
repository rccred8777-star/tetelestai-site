import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, CheckCircle, Play,
  Target, Home,
  Heart, Flame, HelpCircle,
  ArrowLeft, ArrowRight, PenLine,
  Bookmark, TrendingUp, Globe, Church,
  Anchor, Compass, Send, Globe2
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
/*  DATA - 10 LICoes DE MISSOES                                        */
/* ------------------------------------------------------------------ */

const licoesData: Licao[] = [
  {
    id: 1,
    titulo: 'O Coracao Missionario de Deus',
    versiculo: 'Jo 3:16',
    proposito: 'Fundamento',
    valor: 'Amor',
    concluida: false,
    icone: Heart,
    tempoEstimado: '30 min',
    descricao: 'Deus e um Deus missionario. Desde a Genesis ate Apocalipse, a Biblia e a historia de Deus buscando a humanidade.',
    conteudo: [
      '"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigenito" (Jo 3:16). A missao comeca no coracao de Deus. Ele e o primeiro missionario.',
      'A missao nao e uma atividade da igreja — e a razao de ser da igreja. Fomos criados para conhecer e adorar a Deus, e chamados para fazer discipulos de todas as nacoes.',
      'A Biblia inteira e uma historia missionaria: Deus chamou Abrao para abencoar todas as familias da terra (Gn 12:3). Enviou Israel como luz para as nacoes. Deu seu Filho para salvar o mundo.',
      'A igreja nao existe para si mesma. Existe para o mundo. Somos chamados a ser "o sal da terra" e "a luz do mundo" (Mt 5:13-14).',
      'O coracao missionario de Deus pulsa por aqueles que ainda nao ouviram o evangelho. Ha mais de 3 bilhoes de pessoas sem acesso ao evangelho. Deus se importa com cada uma delas.',
      'Um missionario nao e alguem que vai para outro pais. Um missionario e alguem que entende o coracao de Deus e vive para alcancar os perdidos, onde quer que estejam.',
    ],
    perguntas: [
      'Como a compreensao de que Deus e missionario muda sua perspectiva sobre missao?',
      'Por que muitos cristaos veem missao como algo opcional e nao essencial?',
      'O que significa dizer que "a igreja nao existe para si mesma"?',
      'Como voce pode cultivar um coracao missionario semelhante ao de Deus?',
    ],
    pontoObediencia: 'Ore durante 10 minutos apenas pelos povos que nunca ouviram o nome de Jesus. Use o app Operation World ou similar.',
    atividadePratica: 'Mapeiem no globo/mapamundi: onde estao os povos nao alcancados? Marquem com pins. Orem por eles.',
    tarefaCasa: 'Leia Genesis 12:1-3 e anote como Abraao foi chamado para ser uma bencao as nacoes. Como voce se encaixa nessa promessa?',
    versoMemorizar: {
      referencia: 'Joao 3:16',
      texto: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigenito.',
    },
  },
  {
    id: 2,
    titulo: 'A Grande Comissao',
    versiculo: 'Mt 28:18-20',
    proposito: 'Chamado',
    valor: 'Obediencia',
    concluida: false,
    icone: Globe,
    tempoEstimado: '35 min',
    descricao: 'A Grande Comissao e o mandamento mais claro de Jesus a sua igreja. Entenda seu alcance e sua aplicacao para sua vida.',
    conteudo: [
      '"Toda a autoridade me foi dada no ceu e na terra. Ide, portanto, e fazei discipulos de todas as nacoes" (Mt 28:18-19). A Grande Comissao e baseada na autoridade total de Jesus.',
      'A Grande Comissao tem quatro verbos: (1) Ide — mobilize-se, va, (2) Fazei discipulos — nao apenas converta, forme seguidores, (3) Batizando-os — incorpore a comunidade, (4) Ensinando — transmita tudo que Jesus ensinou.',
      '"Todas as nacoes" (etneth) significa todos os grupos etnicos. Nao e apenas geografia — e povo. Deus quer que cada grupo etnico seja representado no ceu.',
      'A promessa de Jesus: "Eis que estou convosco todos os dias ate a consumacao dos seculos" (v.20). Nunca seremos enviados sozinhos. Ele esta sempre conosco.',
      'A Grande Comissao nao e um mandamento apenas para missionarios profissionais. E para todo cristao. Cada um de nos tem um papel no cumprimento dessa comissao.',
      'O chamado missionario universal: va para todas as nacoes, em todos os lugares, em todos os tempos, ate que Jesus volte.',
    ],
    perguntas: [
      'Qual dos quatro verbos da Grande Comissao (ide, fazei discipulos, batizando, ensinando) voce mais precisa desenvolver?',
      'O que significa "todas as nacoes" na pratica? Como alcancar grupos etnicos diferentes?',
      'Como a promessa "estou convosco" te encoraja a cumprir a Grande Comissao?',
      'Qual o seu papel pessoal na Grande Comissao? Nao responda "nenhum" — Deus tem um papel para voce.',
    ],
    pontoObediencia: 'Escreva sua declaracao pessoal de compromisso com a Grande Comissao. Assine e coloque em um lugar visivel.',
    atividadePratica: 'Como grupo, facam um plano missionario: que "nacoes" (grupos) voces podem alcancar juntos este ano?',
    tarefaCasa: 'Leia Atos 1:8 e compare com Mateus 28. Quais sao as semelhancas e diferencas entre essas duas comissoes?',
    versoMemorizar: {
      referencia: 'Mateus 28:19',
      texto: 'Ide, portanto, e fazei discipulos de todas as nacoes, batizando-os em nome do Pai, do Filho e do Espirito Santo.',
    },
  },
  {
    id: 3,
    titulo: 'Atos 1:8 — O Poder do Espirito Santo',
    versiculo: 'At 1:8',
    proposito: 'Poder',
    valor: 'Espirito Santo',
    concluida: false,
    icone: Flame,
    tempoEstimado: '30 min',
    descricao: 'Nao somos enviados em nossa propria forca. Receberemos poder quando o Espirito Santo vier sobre nos.',
    conteudo: [
      '"Mas recebereis poder, ao descer sobre vos o Espirito Santo, e sereis minhas testemunhas" (At 1:8). A missao sem poder do Espirito e apenas atividade humana.',
      'A promessa e clara: recebereis PODER. Nao e sobre educacao, estrategia ou recursos — embora tudo isso seja util. E sobre poder sobrenatural para ser testemunha de Jesus.',
      'A sequencia e importante: primeiro o poder, depois a testemunha. Nao tentamos ser testemunhas por esforco proprio — somos testemunhas porque o Espirito nos capacita.',
      'O Espirito Santo habilita-nos de varias formas: (1) Da ousadia para falar, (2) Confirma com sinais, (3) Guia para as pessoas certas, (4) Prepara o coracao dos ouvintes.',
      'A estrategia geografica de Atos 1:8: Jerusalém (proximos), Judeia (regiao), Samaria (diferentes), confins da terra (todos os povos). Comece onde esta e expanda.',
      'Muitos querem ir aos confins da terra sem ser fieis em Jerusalém. Comece evangelizando seu proximo, seu vizinho, seu colega de trabalho.',
    ],
    perguntas: [
      'Como voce experimenta o poder do Espirito Santo em sua vida diaria?',
      'Qual a diferenca entre trabalhar para Deus por esforco proprio e ser capacitado pelo Espirito?',
      'O que significa "sereis minhas testemunhas"? Qual a diferenca entre testemunha e evangelista?',
      'Voce esta sendo fiel em sua "Jerusalém" antes de querer ir aos "confins da terra"?',
    ],
    pontoObediencia: 'Ore especificamente para ser cheio do Espirito Santo e receber poder para testemunhar. Faca isso todos os dias esta semana.',
    atividadePratica: 'Em grupo, orem uns pelos outros para receberem ousadia do Espirito. Depois, pratiquem testemunhar uns aos outros.',
    tarefaCasa: 'Leia Atos 2 e anote tudo que o Espirito Santo fez no dia de Pentecostes. Ore para que isso se repita em sua vida.',
    versoMemorizar: {
      referencia: 'Atos 1:8',
      texto: 'Mas recebereis poder, ao descer sobre vos o Espirito Santo, e sereis minhas testemunhas.',
    },
  },
  {
    id: 4,
    titulo: 'O Missionario como Servo',
    versiculo: 'Fp 2:5-8',
    proposito: 'Carater',
    valor: 'Humildade',
    concluida: false,
    icone: Anchor,
    tempoEstimado: '35 min',
    descricao: 'Jesus se fez servo. O verdadeiro missionario nao e um heroi, mas um servo humilde que segue o exemplo de Cristo.',
    conteudo: [
      '"Tende em vos o mesmo sentimento que houve em Cristo Jesus... ele se humilhou a si mesmo, tornando-se obediente ate a morte" (Fp 2:5,8). O missionario segue o caminho da humildade.',
      'O modelo missionario de Jesus nao e de dominio, mas de servico. Ele lavou pes, tocou leprosos, conversou com samaritanas, abracava criancas.',
      'O missionario nao e um heroi que vai salvar os "pobres pagas". E um servo que vem aprender, servir e amar. A abordagem paternalista destroi o ministerio.',
      'Servir em missao exige: (1) Aprender a cultura local, (2) Respeitar os costumes, (3) Comer o que servem, (4) Falar a lingua, (5) Ser paciente com o processo.',
      'A humildade do missionario se demonstra na disposicao de comecar do zero: sem status, sem conforto, sem rede de apoio. Confiar apenas em Deus.',
      'Jesus "esvaziou-se" (ekenosen). O missionario tambem deve esvaziar-se de preconceitos, conforto, direitos e orgulho para ser preenchido com o que Deus quer.',
    ],
    perguntas: [
      'Como a atitude de servo de Jesus deve moldar sua abordagem missionaria?',
      'Por que a abordagem "heroi salvador" e prejudicial em missao?',
      'O que voce precisa "esvaziar" de si mesmo para ser um missionario eficaz?',
      'Como servir pessoas de uma cultura completamente diferente da sua?',
    ],
    pontoObediencia: 'Sirva alguem esta semana sem esperar reconhecimento. Faca algo que ninguem vera, apenas como ato de amor.',
    atividadePratica: 'Em grupo, cada um compartilhe uma experiencia em que teve que se humilhar para servir. O que aprenderam?',
    tarefaCasa: 'Leia Filipenses 2:1-18. Anote tudo que Paulo ensina sobre humildade e como Jesus e o modelo.',
    versoMemorizar: {
      referencia: 'Filipenses 2:7',
      texto: 'Mas esvaziou-se a si mesmo, tomando a forma de servo, fazendo-se semelhante aos homens.',
    },
  },
  {
    id: 5,
    titulo: 'Contextualizacao do Evangelho',
    versiculo: '1Co 9:19-23',
    proposito: 'Estrategia',
    valor: 'Sabedoria',
    concluida: false,
    icone: Compass,
    tempoEstimado: '35 min',
    descricao: 'Paulo tornou-se tudo para todos. Aprenda a compartilhar o evangelho de forma relevante em diferentes contextos culturais.',
    conteudo: [
      '"Fiz-me como judeu para os judeus... como gentio para os gentios... weak para os fracos. Fiz-me tudo para todos" (1Co 9:20-22). Paulo adaptou seu metodo, nao sua mensagem.',
      'Contextualizacao nao e mudar a mensagem do evangelho. E apresentar a mensagem eterna em termos que cada cultura possa entender. A verdade e imutavel; as formas sao flexiveis.',
      'Paulo em Atenas (At 17) e um exemplo brilhante: citou poetas pagas, referiu-se ao altar ao Deus desconhecido, usou termos filosoficos. Mas pregou a ressurreicao de Cristo.',
      'Principios de contextualizacao: (1) Estude a cultura antes de falar, (2) Encontre pontes de conexao, (3) Respeite tabus e valores, (4) Use linguagem compreensivel, (5) Nao comprometa a essencia do evangelho.',
      'O erro de nao contextualizar: impor cultura ocidental junto com o evangelho. Jesus nao e americano, europeu ou brasileiro. Ele e para todos os povos.',
      'Pergunte sempre: "Se Jesus estivesse nascido nesta cultura, como Ele se expressaria?" Isso ajuda a encontrar formas relevantes de comunicar.',
    ],
    perguntas: [
      'Qual a diferenca entre contextualizar o evangelho e comprometer o evangelho?',
      'Como voce compartilharia Jesus com alguem de uma cultura completamente diferente?',
      'Quais elementos da cultura ocidental crista sao biblicos e quais sao culturais?',
      'Como Paulo em Atenas pode inspirar sua abordagem com pessoas de outras crencas?',
    ],
    pontoObediencia: 'Pesquise sobre uma cultura diferente da sua (religiao, costumes, valores). Como voce compartilharia Jesus com eles?',
    atividadePratica: 'Em grupo, facam role-play: um e de outra cultura/religiao, outro e o missionario. Pratiquem compartilhar respeitosamente.',
    tarefaCasa: 'Leia Atos 17:16-34. Anote como Paulo contextualizou sua mensagem para os atenienses.',
    versoMemorizar: {
      referencia: '1 Corintios 9:22',
      texto: 'Fiz-me tudo para todos, para de alguma forma salvar alguns.',
    },
  },
  {
    id: 6,
    titulo: 'Missao Transcultural e Local',
    versiculo: 'At 13:2-3',
    proposito: 'Envio',
    valor: 'Obediencia',
    concluida: false,
    icone: Send,
    tempoEstimado: '30 min',
    descricao: 'Deus separa e envia. Entenda os diferentes tipos de missao e descubra como voce pode participar tanto local quanto globalmente.',
    conteudo: [
      '"Separa-me Barnabe e Saulo para a obra a que os tenho chamado" (At 13:2). O Espirito Santo separa e envia. A igreja deve discernir e apoiar.',
      'Missao transcultural: cruzar fronteiras culturais e geograficas para alcancar outro povo. Exige aprendizado de lingua, adaptacao cultural e longo prazo.',
      'Missao local: alcancar seu proprio povo e cultura. Todo cristao e um missionario local. Seu trabalho, familia, vizinhanca e campo missionario.',
      'Missao entre diasporas: alcancar imigrantes e refugiados que vivem em seu pais. E transcultural sem sair do pais. E uma oportunidade crescente.',
      'Missao digital: usar tecnologia e redes sociais para alcancar pessoas em todo o mundo. Nunca foi tao facil compartilhar o evangelho globalmente.',
      'Nao existe missao "superior". Toda missao e importante. Deus chama alguns para ir longe, outros para ficar. O que importa e obedecer ao seu chamado.',
    ],
    perguntas: [
      'Qual tipo de missao mais resuou com seu coracao? Por que?',
      'Como voce pode fazer missao local no seu dia a dia, no trabalho, escola ou bairro?',
      'De que formas voce pode apoiar missionarios transculturais sem ir ao campo?',
      'Como a igreja pode melhorar na tarefa de separar e enviar missionarios?',
    ],
    pontoObediencia: 'Identifique uma oportunidade concreta de missao (local, diaspora ou digital) e de o primeiro passo esta semana.',
    atividadePratica: 'Mapeiem juntos: quais nacoes/povos estao representados na sua cidade? Como voces podem alcanca-los?',
    tarefaCasa: 'Pesquise sobre imigrantes/refugiados na sua regiao. Como sua igreja poderia alcanca-los com amor?',
    versoMemorizar: {
      referencia: 'Atos 13:2',
      texto: 'Separai-me Barnabe e Saulo para a obra a que os tenho chamado.',
    },
  },
  {
    id: 7,
    titulo: 'Plantacao de Igrejas',
    versiculo: 'At 14:21-23',
    proposito: 'Estrategia',
    valor: 'Multiplicacao',
    concluida: false,
    icone: Church,
    tempoEstimado: '35 min',
    descricao: 'A igreja primitiva crescia porque plantava igrejas. Aprenda o modelo de Paulo para estabelecer comunidades de fe duradouras.',
    conteudo: [
      '"Tendo lhes feito discipulos, agruparam igrejas em cada cidade" (At 14:23). Paulo nao apenas evangelizava — ele plantava igrejas. A igreja e o centro da missao.',
      'O modelo de Paulo para plantacao de igrejas: (1) Evangelize — pregue o evangelho, (2) Discipule — forme lideres, (3) Agrupe — una em comunidade, (4) Encarregue — ordene ancioes, (5) Acompanhe — visite e escreva.',
      'A igreja nao e um predio — e um grupo de discipulos reunidos em nome de Jesus. Pode ser em uma casa, uma escola, sob uma arvore. O importante e a comunidade.',
      'A sustentabilidade da igreja plantada depende de lideres locais. O missionario deve formar lideres desde o inicio, nao criar dependencia.',
      'Paulo passava meses ou anos em cada lugar. Depois visitava, escrevia cartas, enviava ajuda. A plantacao de igrejas exige compromisso de longo prazo.',
      'O movimento de plantacao de igrejas em massa e a forma mais rapida de alcancar o mundo. Igrejas simples, multiplicaveis, lideradas por locais.',
    ],
    perguntas: [
      'Por que a plantacao de igrejas e mais eficaz que o evangelismo individual isolado?',
      'Como evitar que igrejas plantadas dependam eternamente do missionario?',
      'Quais sao os elementos essenciais de uma igreja saudavel? (Atos 2:42)',
      'Como voce poderia apoiar plantadores de igrejas em campo?',
    ],
    pontoObediencia: 'Ore por 3 igrejas recém-plantadas. Se possivel, descubra quem sao os plantadores e ore por eles pelo nome.',
    atividadePratica: 'Como grupo, discutam: e se voces plantassem uma nova igreja/celula? Onde seria? Quem lideraria? Como seria?',
    tarefaCasa: 'Leia Tito 1:5-9 e 1 Timoteo 3. Anote as qualidades de lideres locais. Por que sao importantes?',
    versoMemorizar: {
      referencia: 'Atos 14:23',
      texto: 'Tendo-lhes ordenado ancioes em cada igreja, orando com jejum, os encomendaram ao Senhor.',
    },
  },
  {
    id: 8,
    titulo: 'Sofrimento e Perseveranca',
    versiculo: '2Tm 3:12',
    proposito: 'Resiliencia',
    valor: 'Fe',
    concluida: false,
    icone: Anchor,
    tempoEstimado: '30 min',
    descricao: 'Todos os que quiserem viver piedosamente em Cristo Jesus serao perseguidos. Aprenda a enfrentar dificuldades com fe e perseveranca.',
    conteudo: [
      '"Todos os que quiserem viver piedosamente em Cristo Jesus serao perseguidos" (2Tm 3:12). A missao nao e uma estrada de rosas. E uma jornada de fe que inclui sofrimento.',
      'Paulo enfrentou: prisoes, acoites, apedrejamento, naufragio, traicao, fome, frio, solidao. E disse: "Mas de tudo isso me livrou o Senhor" (2Tm 3:11).',
      'O sofrimento em missao pode ser: perseguicao religiosa, rejeicao cultural, doenca, solidao, burnout, conflitos no time, dificuldades financeiras, distancia da familia.',
      'A perseveranca vem de: (1) Chamado claro — lembre por que foi enviado, (2) Comunidade — nao isole-se, (3) Palavra — alimente-se espiritualmente, (4) Oracao — mantenha-se conectado a Deus.',
      'O sofrimento nao e sinal de derrota. Pode ser ferramenta de Deus para: moldar carater, aprofundar dependencia, dar testemunho poderoso, identificar-se com Cristo.',
      'Cuide da sua saude emocional e espiritual. O burnout e real. O missionario que nao cuida de si nao pode cuidar de outros. Descanse, recarregue, peça ajuda.',
    ],
    perguntas: [
      'Como voce se prepara espiritualmente para enfrentar dificuldades em missao?',
      'Qual a diferenca entre sofrimento redentor (que edifica) e sofrimento destrutivo (que queima)?',
      'Como reconhecer e prevenir o burnout em ministerio?',
      'O que voce faria se sentisse vontade de desistir da missao?',
    ],
    pontoObediencia: 'Identifique um area de dificuldade em sua vida agora. Ofereça a Deus como sacrificio de adoracao. Confiando que Ele usara para seu bem.',
    atividadePratica: 'Compartilhem em grupo: qual foi a maior dificuldade que voces ja enfrentaram? Como Deus os ajudou? Orem uns pelos outros.',
    tarefaCasa: 'Leia 2 Corintios 4 e 11. Anote como Paulo viu o sofrimento e como isso o aproximou de Cristo.',
    versoMemorizar: {
      referencia: '2 Timoteo 3:11-12',
      texto: 'Mas de tudo isso me livrou o Senhor. E todos os que quiserem viver piedosamente em Cristo Jesus serao perseguidos.',
    },
  },
  {
    id: 9,
    titulo: 'Financas e Sustentabilidade',
    versiculo: '3Jo 1:5-8',
    proposito: 'Pratico',
    valor: 'Provisao',
    concluida: false,
    icone: TrendingUp,
    tempoEstimado: '30 min',
    descricao: 'A obra missionaria precisa de recursos. Aprenda sobre sustentacao, apoio, administracao e como Deus prover para a missao.',
    conteudo: [
      '"Amado, fielmente procedes em tudo o que fazes para com os irmaos... eles partiram por amor do nome" (3Jo 1:5-7). A igreja deve apoiar financeiramente os missionarios.',
      'O missionario tem direito de ser sustentado pela obra (1Co 9:14). Nao e errado receber salario ou apoio financeiro para dedicar-se a tempo integral a missao.',
      'Modelos de sustentacao: (1) Apoiadores individuais — parcerias mensais, (2) Igreja enviadora — sustentacao principal, (3) Empreendedorismo missionario — trabalho secular + missao, (4) Profissoes de plataforma — usar sua carreira como porta.',
      'A administracao financeira do missionario deve ser: transparente, responsavel, planejada, com reserva de emergencia. Missionarios em crise financeira nao podem focar no ministerio.',
      'A igreja apoiadora deve: orar regularmente, manter comunicacao, visitar no campo, cuidar da reintegracao, celebrar vitorias. E uma parceria de verdade.',
      'Deus prove. A historia da missao esta cheia de testemunhos de providencia sobrenatural. Mas Deus tambem espera que trabalhemos, planejemos e sejamos bons mordomos.',
    ],
    perguntas: [
      'Como voce ve a relacao entre dinheiro e missao? E espiritual ou pratico?',
      'Qual modelo de sustentacao mais se adequa a sua situacao? Por que?',
      'Como uma igreja pode desenvolver uma cultura generosa de apoio a missoes?',
      'O que fazer quando os recursos sao menores que as necessidades?',
    ],
    pontoObediencia: 'Se voce apoia um missionario, escreva uma carta de encorajamento esta semana. Se nao apoia, descubra como comecar.',
    atividadePratica: 'Como grupo, calculem quanto custaria enviar um missionario. Facam um plano de como a igreja pode arcar com isso.',
    tarefaCasa: 'Leia 3 Joao inteiro. Anote o que Joao elogia e o que ele critica no relacionamento igreja-missionario.',
    versoMemorizar: {
      referencia: '3 Joao 1:8',
      texto: 'Nos, pois, devemos acolher tais homens, para que sejamos cooperadores da verdade.',
    },
  },
  {
    id: 10,
    titulo: 'Desafio Final — Sua Jornada Comeca',
    versiculo: 'Is 6:8',
    proposito: 'Envio',
    valor: 'Compromisso',
    concluida: false,
    icone: Globe2,
    tempoEstimado: '35 min',
    descricao: 'Eis-me aqui, envia-me a mim! O curso termina, mas sua jornada missionaria comeca agora. Deus esta chamando — voce dira sim?',
    conteudo: [
      '"E ouvi a voz do Senhor, dizendo: A quem enviarei, e quem ira por nos? Disse eu: Eis-me aqui, envia-me a mim" (Is 6:8). A resposta certa ainda ecoa atraves dos seculos.',
      'Vocaoo para missoes nao e sobre talento, preparacao ou recursos. E sobre disponibilidade. Deus nao chama os capacitados — Ele capacita os chamados.',
      'Ha tres formas de ir: (1) Como missionario de tempo integral — vida dedicada ao campo, (2) Como missionario de curto prazo — viagens missionarias, (3) Como missionario local — vivendo missao onde esta.',
      'Ha tres formas de enviar: (1) Orendo — ore diariamente por missoes, (2) Dando — contribua financeiramente, (3) Mobilizando — inspire outros a se envolverem.',
      'O mundo nao sera alcancado por profissionais da missao. Sera alcancado quando todo cristao entender que e um missionario em seu lugar de influencia.',
      'A jornada comeca com um passo. Nao espere estar perfeitamente preparado. Nao espere ter certeza absoluta. Deus guia passo a passo aqueles que dao o primeiro passo em fe.',
    ],
    perguntas: [
      'Qual e a sua resposta ao chamado "A quem enviarei?" O que te impede de dizer "eis-me aqui"?',
      'Deus esta te chamando para ir, enviar ou ambos? Como voce responde a isso?',
      'Qual o primeiro passo concreto que voce pode dar agora em direcao a missao?',
      'Como voce mantera viva a chama missionaria apos este curso?',
    ],
    pontoObediencia: 'Escreva um compromisso formal com Deus sobre sua participacao na missao. Inclua: o que fara, quando comecara, como sera avaliado.',
    atividadePratica: 'Cerimonia de envio: como grupo, cada um compartilhe seu compromisso. Orem uns pelos outros. Consagrem suas vidas a missao.',
    tarefaCasa: 'Leia Isaias 6 inteiro. Anote a sequencia: visao de Deus → consciencia de pecado → purificacao → chamado → resposta. Ore para que isso se repita em voce.',
    versoMemorizar: {
      referencia: 'Isaias 6:8',
      texto: 'E ouvi a voz do Senhor, dizendo: A quem enviarei, e quem ira por nos? E eu disse: Eis-me aqui, envia-me a mim.',
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

export default function CursoMissoes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const licoesConcluidasInicial = licoesData.map((l) => ({
    ...l,
    concluida: localStorage.getItem(`missoes-licao-${l.id}-concluida`) === 'true',
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
    localStorage.setItem(`missoes-licao-${id}-concluida`, 'true')
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
    const key = `missoes-licao-${licaoAtivaId}-pergunta-${perguntaIndex}`
    if (respostas[key]?.trim()) {
      localStorage.setItem(key, respostas[key])
      toast.success('Resposta salva!')
    }
  }

  const handleTextareaChange = (perguntaIndex: number, value: string) => {
    setRespostas((prev) => ({
      ...prev,
      [`missoes-licao-${licaoAtivaId}-pergunta-${perguntaIndex}`]: value,
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
            <h2 className="font-heading text-lg font-bold text-white">Escola de Missoes</h2>
            <p className="text-xs text-white/70 mt-1">10 licoes para missionarios de todos os campos</p>
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
              onClick={() => navigate('/member/dashboard')}
            >
              <TrendingUp className="w-4 h-4" />
              Voltar ao Dashboard
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
                              respostas[`missoes-licao-${licaoAtivaId}-pergunta-${i}`] ||
                              localStorage.getItem(`missoes-licao-${licaoAtivaId}-pergunta-${i}`) ||
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
