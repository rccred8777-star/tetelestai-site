import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, BookOpen, TrendingUp, Calendar,
  BarChart3, MessageSquare, ChevronRight,
  CheckCircle, Clock, AlertCircle,
  Heart, Target, ArrowUpRight, ArrowDownRight,
  Phone, MapPin, UserCheck, FileText,
  Send, Star, Activity,
  Play, Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { cellGroups, cellMembers } from '@/data/mock'

/* ------------------------------------------------------------------ */
/*  MOCK DATA - LIDER                                                  */
/* ------------------------------------------------------------------ */

// Celulas que o lider lidera (simulando que o usuario atual lidera 2 celulas)
const minhasCelulas = [
  { ...cellGroups[0], membrosAtivos: 10, visitantesMes: 3, conversoesAno: 2, proximoEncontro: '2026-01-20', temaProximo: 'O Chamado para Liderar', multiplicacaoPrevista: '2026-06' },
  { ...cellGroups[1], membrosAtivos: 6, visitantesMes: 2, conversoesAno: 1, proximoEncontro: '2026-01-22', temaProximo: 'Certeza da Salvacao', multiplicacaoPrevista: '2026-08' },
]

// Membros da celula principal (primeira celula)
const membrosCelula = cellMembers.slice(0, 10).map((m, i) => ({
  ...m,
  status: i < 3 ? 'ativo' : i < 6 ? 'regular' : i < 8 ? 'visitante' : 'ausente',
  ultimaPresenca: i < 5 ? '15 Jan 2026' : i < 8 ? '08 Jan 2026' : 'Nunca',
  dataNascimento: `${(i + 1).toString().padStart(2, '0')}/0${(i % 3) + 1}`,
  necessidadeOracao: i === 2 ? 'Saude' : i === 5 ? 'Emprego' : i === 7 ? 'Familia' : null,
}))

// Relatorios semanais anteriores
const relatoriosAnteriores = [
  { id: 1, semana: '06-12 Jan 2026', encontroRealizado: true, presentes: 9, visitantes: 1, novosConvertidos: 0, oferta: 'R$ 150,00', observacoes: 'Encontro muito bom. Joao trouxe o primo.' },
  { id: 2, semana: '30-05 Jan 2026', encontroRealizado: true, presentes: 7, visitantes: 2, novosConvertidos: 1, oferta: 'R$ 200,00', observacoes: 'Ana aceitou Jesus! Grande celebracao.' },
  { id: 3, semana: '23-29 Dez 2025', encontroRealizado: false, presentes: 0, visitantes: 0, novosConvertidos: 0, oferta: '-', observacoes: 'Recesso de final de ano. Encontro nao realizado.' },
]

// Material de estudo da semana
const materialSemana = {
  tema: 'O Chamado para Liderar',
  licoes: [
    { titulo: 'Aula 1: O Chamado para Liderar', video: 'https://youtube.com/...', duracao: '30min' },
    { titulo: 'Aula 2: O Carater do Lider', video: 'https://youtube.com/...', duracao: '35min' },
  ],
  perguntasDiscussao: [
    'Como voce sentiu o chamado para liderar?',
    'Quais qualidades de Exodo 18:21 voce mais precisa desenvolver?',
    'Como a lideranca no Reino difere da lideranca secular?',
  ],
  versiculoChave: 'Exodo 18:21',
  textoVersiculo: 'Tu procuras, de todo o povo, homens capazes, tementes a Deus, homens verazes, que odeiem a avareza.',
}

// Estatisticas mensais
const estatisticasMensais = [
  { mes: 'Out', presentes: 6, visitantes: 1 },
  { mes: 'Nov', presentes: 7, visitantes: 2 },
  { mes: 'Dez', presentes: 5, visitantes: 1 },
  { mes: 'Jan', presentes: 8, visitantes: 2 },
]

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; classe: string }> = {
    ativo: { label: 'Ativo', classe: 'bg-green-100 text-green-700 hover:bg-green-100' },
    regular: { label: 'Regular', classe: 'bg-blue-100 text-blue-700 hover:bg-blue-100' },
    visitante: { label: 'Visitante', classe: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' },
    ausente: { label: 'Ausente', classe: 'bg-red-100 text-red-700 hover:bg-red-100' },
  }
  const c = config[status] || config.ausente
  return <Badge className={c.classe}>{c.label}</Badge>
}

function StatCard({
  titulo, valor, subtitulo, icone: Icon, cor, tendencia
}: {
  titulo: string; valor: string; subtitulo: string; icone: React.ElementType; cor: string; tendencia?: 'up' | 'down' | 'neutral'
}) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-[#718096] font-medium">{titulo}</p>
            <p className="text-2xl font-bold text-[#1A202C] mt-1">{valor}</p>
            <div className="flex items-center gap-1 mt-1">
              {tendencia === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />}
              {tendencia === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />}
              <p className="text-xs text-[#718096]">{subtitulo}</p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-lg ${cor} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function AreaLider() {
  const navigate = useNavigate()
  const [abaAtiva, setAbaAtiva] = useState('visao-geral')
  const [celulaSelecionada, setCelulaSelecionada] = useState(0)

  // Formulario de relatorio
  const [formRelatorio, setFormRelatorio] = useState({
    dataEncontro: '',
    presentes: '',
    visitantes: '',
    novosConvertidos: '',
    oferta: '',
    louvor: '',
    palavra: '',
    perguntas: '',
    oracao: '',
    compromissos: '',
    observacoes: '',
  })

  const handleSubmitRelatorio = () => {
    toast.success('Relatorio enviado com sucesso!', {
      description: 'Seu pastor sera notificado. Obrigado!'
    })
    setFormRelatorio({
      dataEncontro: '', presentes: '', visitantes: '', novosConvertidos: '',
      oferta: '', louvor: '', palavra: '', perguntas: '', oracao: '',
      compromissos: '', observacoes: '',
    })
  }

  const celulaAtual = minhasCelulas[celulaSelecionada]

  return (
    <div className="min-h-[calc(100dvh-56px)] bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* ========== HEADER ========== */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A202C]">
                Area do Lider
              </h1>
              <p className="text-[#718096] mt-1">
                Dashboard exclusivo para lideres de celula — gerencie suas celulas, membros e relatorios
              </p>
            </div>
            <div className="flex items-center gap-2">
              {minhasCelulas.map((c, i) => (
                <Button
                  key={c.id}
                  variant={celulaSelecionada === i ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCelulaSelecionada(i)}
                  className={celulaSelecionada === i ? 'bg-[#1A365D]' : ''}
                >
                  {c.name}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ========== STATS CARDS ========== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            titulo="Membros Ativos"
            valor={String(celulaAtual.membrosAtivos)}
            subtitulo={`de ${celulaAtual.members} cadastrados`}
            icone={Users}
            cor="bg-[#1A365D]"
            tendencia="up"
          />
          <StatCard
            titulo="Visitantes este Mes"
            valor={`+${celulaAtual.visitantesMes}`}
            subtitulo="Novos rostos"
            icone={UserCheck}
            cor="bg-[#D4A843]"
            tendencia="up"
          />
          <StatCard
            titulo="Conversoes no Ano"
            valor={String(celulaAtual.conversoesAno)}
            subtitulo="Vidas para Jesus"
            icone={Heart}
            cor="bg-green-600"
            tendencia="up"
          />
          <StatCard
            titulo="Prox. Multiplicacao"
            valor={celulaAtual.multiplicacaoPrevista}
            subtitulo="Meta planejada"
            icone={Target}
            cor="bg-purple-600"
            tendencia="neutral"
          />
        </motion.div>

        {/* ========== TABS ========== */}
        <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="space-y-6">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:grid-cols-6 gap-1">
            <TabsTrigger value="visao-geral" className="gap-1.5 text-xs sm:text-sm">
              <BarChart3 className="w-4 h-4 hidden sm:inline" />
              Visao Geral
            </TabsTrigger>
            <TabsTrigger value="membros" className="gap-1.5 text-xs sm:text-sm">
              <Users className="w-4 h-4 hidden sm:inline" />
              Membros
            </TabsTrigger>
            <TabsTrigger value="relatorio" className="gap-1.5 text-xs sm:text-sm">
              <FileText className="w-4 h-4 hidden sm:inline" />
              Relatorio
            </TabsTrigger>
            <TabsTrigger value="estudos" className="gap-1.5 text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 hidden sm:inline" />
              Estudos
            </TabsTrigger>
            <TabsTrigger value="encontro" className="gap-1.5 text-xs sm:text-sm">
              <Calendar className="w-4 h-4 hidden sm:inline" />
              Encontro
            </TabsTrigger>
            <TabsTrigger value="estatisticas" className="gap-1.5 text-xs sm:text-sm">
              <TrendingUp className="w-4 h-4 hidden sm:inline" />
              Estatisticas
            </TabsTrigger>
          </TabsList>

          {/* ========== TAB: VISAO GERAL ========== */}
          <TabsContent value="visao-geral" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Info da Celula */}
              <Card className="border-0 shadow-sm lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#1A365D]" />
                    {celulaAtual.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-9 h-9 rounded-full bg-[#1A365D]/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-[#1A365D]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#718096]">Dia e Horario</p>
                        <p className="text-sm font-medium text-[#1A202C]">{celulaAtual.day} - {celulaAtual.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-9 h-9 rounded-full bg-[#1A365D]/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#1A365D]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#718096]">Local</p>
                        <p className="text-sm font-medium text-[#1A202C]">{celulaAtual.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-9 h-9 rounded-full bg-[#1A365D]/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#1A365D]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#718096]">Perfil</p>
                        <p className="text-sm font-medium text-[#1A202C]">{celulaAtual.profile}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-9 h-9 rounded-full bg-[#1A365D]/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-[#1A365D]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#718096]">Contato</p>
                        <p className="text-sm font-medium text-[#1A202C]">{celulaAtual.phone}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Progresso */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1A202C]">Progresso para Multiplicacao</span>
                      <span className="text-sm font-bold text-[#D4A843]">{Math.round((celulaAtual.membrosAtivos / 12) * 100)}%</span>
                    </div>
                    <Progress value={(celulaAtual.membrosAtivos / 12) * 100} className="h-2" />
                    <p className="text-xs text-[#718096] mt-1">
                      Meta: 12 membros para multiplicacao | Previsao: {celulaAtual.multiplicacaoPrevista}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Proximo Encontro */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#D4A843]" />
                    Proximo Encontro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-[#1A365D]/5 rounded-xl border border-[#1A365D]/10">
                    <p className="text-sm text-[#718096]">Data</p>
                    <p className="text-lg font-bold text-[#1A202C]">
                      {new Date(celulaAtual.proximoEncontro + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                  <div className="p-4 bg-[#D4A843]/5 rounded-xl border border-[#D4A843]/10">
                    <p className="text-sm text-[#718096]">Tema da Semana</p>
                    <p className="text-base font-semibold text-[#1A202C]">{celulaAtual.temaProximo}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#1A202C]">Preparacao do Lider:</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2 text-sm text-[#4A5568]">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        Estudar a licao antes
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#4A5568]">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        Preparar perguntas de discussao
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#4A5568]">
                        <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                        Preparar ambiente e lanche
                      </li>
                      <li className="flex items-center gap-2 text-sm text-[#4A5568]">
                        <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                        Confirmar presenca dos membros
                      </li>
                    </ul>
                  </div>
                  <Button
                    className="w-full bg-[#1A365D] hover:bg-[#0F2744] gap-2"
                    onClick={() => setAbaAtiva('encontro')}
                  >
                    Ver Detalhes Completos
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Acoes Rapidas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 border-[#1A365D]/20 hover:bg-[#1A365D]/5"
                onClick={() => setAbaAtiva('relatorio')}
              >
                <FileText className="w-6 h-6 text-[#1A365D]" />
                <span className="text-xs">Enviar Relatorio</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 border-[#D4A843]/20 hover:bg-[#D4A843]/5"
                onClick={() => navigate('/member/curso-lideres')}
              >
                <BookOpen className="w-6 h-6 text-[#D4A843]" />
                <span className="text-xs">Curso de Lideres</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 border-green-200 hover:bg-green-50"
                onClick={() => setAbaAtiva('membros')}
              >
                <MessageSquare className="w-6 h-6 text-green-600" />
                <span className="text-xs">Contatar Membros</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 border-purple-200 hover:bg-purple-50"
                onClick={() => setAbaAtiva('estatisticas')}
              >
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <span className="text-xs">Ver Estatisticas</span>
              </Button>
            </div>
          </TabsContent>

          {/* ========== TAB: MEMBROS ========== */}
          <TabsContent value="membros" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#1A365D]" />
                    Membros da Celula
                  </div>
                  <Badge variant="outline">{membrosCelula.length} membros</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {membrosCelula.map((membro, i) => (
                    <motion.div
                      key={membro.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1A365D]/10 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-[#1A365D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#1A202C] truncate">{membro.name}</p>
                          <StatusBadge status={membro.status} />
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-[#718096]">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {membro.role}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {membro.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="w-3 h-3" />
                            Ultima: {membro.ultimaPresenca}
                          </span>
                        </div>
                      </div>
                      {membro.necessidadeOracao && (
                        <Badge variant="outline" className="shrink-0 text-xs border-red-200 text-red-600 bg-red-50">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Oracao: {membro.necessidadeOracao}
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="shrink-0 text-[#1A365D]">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB: RELATORIO ========== */}
          <TabsContent value="relatorio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulario */}
              <Card className="border-0 shadow-sm lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#1A365D]" />
                    Relatorio Semanal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data">Data do Encontro</Label>
                      <Input
                        id="data"
                        type="date"
                        value={formRelatorio.dataEncontro}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, dataEncontro: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="presentes">Membros Presentes</Label>
                      <Input
                        id="presentes"
                        type="number"
                        placeholder="Quantos membros?"
                        value={formRelatorio.presentes}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, presentes: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="visitantes">Visitantes</Label>
                      <Input
                        id="visitantes"
                        type="number"
                        placeholder="Quantos visitantes?"
                        value={formRelatorio.visitantes}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, visitantes: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="convertidos">Novos Convertidos</Label>
                      <Input
                        id="convertidos"
                        type="number"
                        placeholder="Alguma conversao?"
                        value={formRelatorio.novosConvertidos}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, novosConvertidos: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="oferta">Oferta</Label>
                      <Input
                        id="oferta"
                        placeholder="R$ 0,00"
                        value={formRelatorio.oferta}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, oferta: e.target.value })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="louvor">Louvor / Adoracao</Label>
                      <Textarea
                        id="louvor"
                        placeholder="Como foi o momento de louvor? Quais musicas?..."
                        value={formRelatorio.louvor}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, louvor: e.target.value })}
                        className="min-h-[60px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="palavra">Palavra / Estudo</Label>
                      <Textarea
                        id="palavra"
                        placeholder="Qual foi o tema estudado? Como foi a dinamica?..."
                        value={formRelatorio.palavra}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, palavra: e.target.value })}
                        className="min-h-[60px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perguntas">Compartilhamento / Perguntas</Label>
                      <Textarea
                        id="perguntas"
                        placeholder="Como foi o momento de compartilhamento?..."
                        value={formRelatorio.perguntas}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, perguntas: e.target.value })}
                        className="min-h-[60px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oracao">Oracao</Label>
                      <Textarea
                        id="oracao"
                        placeholder="Como foi o momento de oracao? Algum pedido especial?..."
                        value={formRelatorio.oracao}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, oracao: e.target.value })}
                        className="min-h-[60px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compromissos">Compromissos para Proxima Semana</Label>
                      <Textarea
                        id="compromissos"
                        placeholder="O que foi decidido? Quais os proximos passos?..."
                        value={formRelatorio.compromissos}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, compromissos: e.target.value })}
                        className="min-h-[60px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="observacoes">Observacoes Gerais</Label>
                      <Textarea
                        id="observacoes"
                        placeholder="Algo mais que gostaria de relatar?..."
                        value={formRelatorio.observacoes}
                        onChange={(e) => setFormRelatorio({ ...formRelatorio, observacoes: e.target.value })}
                        className="min-h-[60px]"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmitRelatorio}
                    className="w-full bg-[#1A365D] hover:bg-[#0F2744] gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Relatorio ao Pastor
                  </Button>
                </CardContent>
              </Card>

              {/* Relatorios Anteriores */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#D4A843]" />
                    Relatorios Anteriores
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatoriosAnteriores.map((rel) => (
                    <div
                      key={rel.id}
                      className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#1A202C]">{rel.semana}</span>
                        {rel.encontroRealizado ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Realizado</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">Nao realizado</Badge>
                        )}
                      </div>
                      {rel.encontroRealizado && (
                        <div className="grid grid-cols-3 gap-2 text-xs text-[#718096]">
                          <span>{rel.presentes} presentes</span>
                          <span>{rel.visitantes} visitas</span>
                          <span>{rel.novosConvertidos} conversoes</span>
                        </div>
                      )}
                      {rel.observacoes && (
                        <p className="text-xs text-[#4A5568] mt-2 italic">{rel.observacoes}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ========== TAB: ESTUDOS ========== */}
          <TabsContent value="estudos" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Material da Semana */}
              <Card className="border-0 shadow-sm lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#1A365D]" />
                    Material de Estudo — Semana Atual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="p-5 bg-[#1A365D]/5 rounded-xl border border-[#1A365D]/10">
                    <p className="text-sm text-[#718096]">Tema da Semana</p>
                    <p className="text-xl font-bold text-[#1A202C] mt-1">{materialSemana.tema}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[#D4A843] border-[#D4A843]/40">
                        {materialSemana.versiculoChave}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#4A5568] mt-3 italic">
                      "{materialSemana.textoVersiculo}"
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#1A202C] mb-3">Aulas do Curso de Lideres</h3>
                    <div className="space-y-3">
                      {materialSemana.licoes.map((aula, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer"
                          onClick={() => navigate('/member/curso-lideres?licao=1')}
                        >
                          <div className="w-12 h-12 rounded-lg bg-[#0F2744] flex items-center justify-center shrink-0">
                            <Play className="w-5 h-5 text-[#D4A843]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#1A202C] truncate">{aula.titulo}</p>
                            <p className="text-xs text-[#718096]">{aula.duracao}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#718096] shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#1A202C] mb-3">Perguntas para Discussao</h3>
                    <div className="space-y-2">
                      {materialSemana.perguntasDiscussao.map((pergunta, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 rounded-full bg-[#1A365D] flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">{i + 1}</span>
                          </div>
                          <p className="text-sm text-[#1A202C]">{pergunta}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-[#D4A843] hover:bg-[#c49a3b] text-[#0F2744] font-semibold gap-2"
                    onClick={() => navigate('/member/curso-lideres')}
                  >
                    <BookOpen className="w-4 h-4" />
                    Acessar Curso Completo
                  </Button>
                </CardContent>
              </Card>

              {/* Links Uteis */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#D4A843]" />
                    Links Uteis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-[#1A365D]/20 hover:bg-[#1A365D]/5"
                    onClick={() => navigate('/member/curso-lideres')}
                  >
                    <Users className="w-4 h-4 text-[#1A365D]" />
                    Curso de Lideres de Celulas
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-[#D4A843]/20 hover:bg-[#D4A843]/5"
                    onClick={() => navigate('/member/curso-missoes')}
                  >
                    <Globe className="w-4 h-4 text-[#D4A843]" />
                    Escola de Missoes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-green-200 hover:bg-green-50"
                    onClick={() => navigate('/member/dashboard-metodo-33')}
                  >
                    <Target className="w-4 h-4 text-green-600" />
                    Metodo 3/3
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 border-purple-200 hover:bg-purple-50"
                    onClick={() => navigate('/member/meu-celula')}
                  >
                    <Users className="w-4 h-4 text-purple-600" />
                    Minha Celula
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ========== TAB: ENCONTRO ========== */}
          <TabsContent value="encontro" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#1A365D]" />
                  Guia do Proximo Encontro
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Timeline do Encontro */}
                <div className="space-y-4">
                  {[
                    { tempo: '0:00-0:10', titulo: 'Boas-vindas e Integracao', desc: 'Receba os membros e visitantes. Conversa leve, lanche. Crie um ambiente acolhedor.', icone: Users, cor: 'bg-blue-500' },
                    { tempo: '0:10-0:20', titulo: 'Louvor e Adoracao', desc: '2-3 musicas. Pode ser playback, violao ou a capella. O importante e a adoracao sincera.', icone: Heart, cor: 'bg-purple-500' },
                    { tempo: '0:20-0:35', titulo: 'Palavra — ' + celulaAtual.temaProximo, desc: 'Estude a licao do curso. Faca perguntas abertas. Inclua todos no compartilhamento.', icone: BookOpen, cor: 'bg-[#1A365D]' },
                    { tempo: '0:35-0:45', titulo: 'Compartilhamento e Oracao', desc: 'Perguntas de discussao. Compartilhamento aberto. Orem uns pelos outros.', icone: MessageSquare, cor: 'bg-orange-500' },
                    { tempo: '0:45-0:50', titulo: 'Ponto de Obediencia e Despedida', desc: 'Estabeleca um compromisso para a semana. Ore pela despesa. Agende o proximo encontro.', icone: Target, cor: 'bg-green-500' },
                  ].map((etapa, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-10 h-10 rounded-full ${etapa.cor} flex items-center justify-center`}>
                          <etapa.icone className="w-5 h-5 text-white" />
                        </div>
                        {i < 4 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{etapa.tempo}</Badge>
                          <h4 className="font-semibold text-[#1A202C]">{etapa.titulo}</h4>
                        </div>
                        <p className="text-sm text-[#4A5568]">{etapa.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Separator />

                {/* Checklist do Lider */}
                <div>
                  <h3 className="text-sm font-semibold text-[#1A202C] mb-3">Checklist do Lider</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Confirmar presenca dos membros 1 dia antes',
                      'Preparar o ambiente (limpeza, cadeiras, iluminacao)',
                      'Separar material de estudo (Biblia, caderno)',
                      'Preparar playlist de louvor',
                      'Preparar lanche',
                      'Revisar a licao e preparar perguntas',
                      'Orar antes do encontro',
                      'Ter lista de oracao da celula a mao',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                        <input type="checkbox" id={`check-${i}`} className="w-4 h-4 rounded border-gray-300 text-[#1A365D]" />
                        <label htmlFor={`check-${i}`} className="text-sm text-[#4A5568] cursor-pointer">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== TAB: ESTATISTICAS ========== */}
          <TabsContent value="estatisticas" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Frequencia Mensal */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#1A365D]" />
                    Frequencia Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {estatisticasMensais.map((mes, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[#1A202C]">{mes.mes}</span>
                          <span className="text-sm text-[#718096]">{mes.presentes} presentes | {mes.visitantes} visitantes</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="h-4 bg-[#1A365D] rounded-sm" style={{ width: `${(mes.presentes / 12) * 100}%` }} />
                          <div className="h-4 bg-[#D4A843] rounded-sm" style={{ width: `${(mes.visitantes / 12) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs text-[#718096]">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#1A365D] rounded-sm" /> Membros
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-[#D4A843] rounded-sm" /> Visitantes
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Resumo do Ano */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#D4A843]" />
                    Resumo do Ano
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Encontros Realizados', valor: '42', cor: 'text-[#1A365D]' },
                      { label: 'Total de Presentes', valor: '336', cor: 'text-[#1A365D]' },
                      { label: 'Visitantes Recebidos', valor: '28', cor: 'text-[#D4A843]' },
                      { label: 'Novos Convertidos', valor: '5', cor: 'text-green-600' },
                      { label: 'Batismos', valor: '3', cor: 'text-blue-600' },
                      { label: 'Novos Lideres Formados', valor: '2', cor: 'text-purple-600' },
                      { label: 'Multiplicacoes', valor: '0', cor: 'text-[#718096]' },
                      { label: 'Membros Ativos Hoje', valor: String(celulaAtual.membrosAtivos), cor: 'text-[#1A365D]' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-xl text-center">
                        <p className={`text-2xl font-bold ${item.cor}`}>{item.valor}</p>
                        <p className="text-xs text-[#718096] mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Crescimento */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Evolucao da Celula
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 h-48">
                  {[
                    { mes: 'Out', membros: 5, altura: 35 },
                    { mes: 'Nov', membros: 6, altura: 42 },
                    { mes: 'Dez', membros: 7, altura: 50 },
                    { mes: 'Jan', membros: 8, altura: 58 },
                    { mes: 'Fev', membros: 9, altura: 67 },
                    { mes: 'Mar', membros: 10, altura: 75 },
                    { mes: 'Abr', membros: 10, altura: 75 },
                    { mes: 'Mai', membros: 11, altura: 83 },
                    { mes: 'Jun', membros: 12, altura: 92 },
                  ].map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-[#1A202C]">{m.membros}</span>
                      <div
                        className="w-full bg-[#1A365D] rounded-t-sm transition-all hover:bg-[#D4A843]"
                        style={{ height: `${m.altura * 1.5}px` }}
                      />
                      <span className="text-xs text-[#718096]">{m.mes}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">Crescimento de 100% em 9 meses!</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Sua celula cresceu de 5 para 10 membros ativos. Continue discipulando e multiplicando!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


