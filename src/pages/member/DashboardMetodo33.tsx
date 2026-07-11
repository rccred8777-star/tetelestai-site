import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen, CheckCircle, Target, TrendingUp, Users,
  Calendar, MessageCircle, Heart,
  ChevronRight, Sparkles, ArrowRight, Share2,
  UserPlus, Clock, Zap, Lightbulb,
  Save, MapPin,
  Video, Plus, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const licoesResumo = [
  { id: 1, titulo: 'Testemunho Pessoal Tetelestai', versiculo: 'Ap 12:11', proposito: 'Evangelismo' },
  { id: 2, titulo: 'Certeza da Salvação', versiculo: '1Jo 5:13', proposito: 'Discipulado' },
  { id: 3, titulo: 'Perdão e Restauração', versiculo: 'Ef 4:32', proposito: 'Comunhão' },
  { id: 4, titulo: 'Vida de Oração', versiculo: 'Mt 6:9-13', proposito: 'Adoração' },
  { id: 5, titulo: 'Palavra de Deus', versiculo: '2Tm 3:16', proposito: 'Discipulado' },
  { id: 6, titulo: 'Igreja em Comunhão', versiculo: 'At 2:42-47', proposito: 'Comunhão' },
  { id: 7, titulo: 'O Espírito Santo e o Avivamento', versiculo: 'At 1:8', proposito: 'Adoração' },
  { id: 8, titulo: 'Santidade e Excelência', versiculo: '1Pe 1:15-16', proposito: 'Discipulado' },
  { id: 9, titulo: 'Multiplicação — Faça Discípulos', versiculo: 'Mt 28:18-20', proposito: 'Evangelismo' },
]

const encontrosPredefinidos = [
  { id: 1, data: '2025-01-15', hora: '19:30', titulo: 'Encontro 3/3 — Semana 1', local: 'Sala Principal', tipo: 'presencial' },
  { id: 2, data: '2025-01-22', hora: '19:30', titulo: 'Encontro 3/3 — Semana 2', local: 'Sala Principal', tipo: 'presencial' },
  { id: 3, data: '2025-01-29', hora: '20:00', titulo: 'Encontro 3/3 — Semana 3 (Online)', local: 'Zoom', tipo: 'online' },
  { id: 4, data: '2025-02-05', hora: '19:30', titulo: 'Encontro 3/3 — Semana 4', local: 'Sala Principal', tipo: 'presencial' },
  { id: 5, data: '2025-02-12', hora: '19:30', titulo: 'Encontro 3/3 — Semana 5', local: 'Sala Principal', tipo: 'presencial' },
  { id: 6, data: '2025-02-19', hora: '20:00', titulo: 'Encontro 3/3 — Semana 6 (Online)', local: 'Zoom', tipo: 'online' },
]

const genMapData = [
  { geracao: 1, nome: 'Você', discipulos: 3, status: 'ativo' },
  { geracao: 2, nome: 'Geração 2', discipulos: 9, status: 'ativo' },
  { geracao: 3, nome: 'Geração 3', discipulos: 18, status: 'ativo' },
  { geracao: 4, nome: 'Geração 4', discipulos: 0, status: 'projecao' },
]

const propositoCores: Record<string, string> = {
  Evangelismo: 'bg-orange-100 text-orange-700 border-orange-200',
  Discipulado: 'bg-blue-100 text-blue-700 border-blue-200',
  Comunhão: 'bg-purple-100 text-purple-700 border-purple-200',
  Adoração: 'bg-pink-100 text-pink-700 border-pink-200',
}

/* ------------------------------------------------------------------ */
/*  HELPER                                                             */
/* ------------------------------------------------------------------ */

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function DashboardMetodo33() {
  const navigate = useNavigate()

  // Load completed lessons from localStorage
  const concluidas = licoesResumo
    .filter((l) => localStorage.getItem(`licao-${l.id}-concluida`) === 'true')
    .map((l) => l.id)

  // Accountability state
  const [discipuladoSemana, setDiscipuladoSemana] = useState(
    localStorage.getItem('accountability-discipulado') || ''
  )
  const [compartilhouEvangelho, setCompartilhouEvangelho] = useState(
    localStorage.getItem('accountability-evangelho') || ''
  )

  // Evangelism goals
  const [metaEvangelismo, setMetaEvangelismo] = useState(() =>
    parseInt(localStorage.getItem('meta-evangelismo') || '3')
  )
  const [compartilhamentosSemana, setCompartilhamentosSemana] = useState(() =>
    parseInt(localStorage.getItem('compartilhamentos-semana') || '0')
  )

  // Calendar state
  const [encontros, setEncontros] = useState(encontrosPredefinidos)
  const [mostrarFormEncontro, setMostrarFormEncontro] = useState(false)
  const [novoEncontro, setNovoEncontro] = useState({
    data: '',
    hora: '',
    titulo: '',
    local: '',
    tipo: 'presencial' as 'presencial' | 'online',
  })

  // Derived state
  const progressoTotal = Math.round((concluidas.length / licoesResumo.length) * 100)
  const proximaLicao = licoesResumo.find((l) => !concluidas.includes(l.id))

  // Accountability save handlers
  const salvarDiscipulado = () => {
    localStorage.setItem('accountability-discipulado', discipuladoSemana)
    toast.success('Resposta salva com sucesso!')
  }

  const salvarEvangelho = () => {
    localStorage.setItem('accountability-evangelho', compartilhouEvangelho)
    toast.success('Resposta salva com sucesso!')
  }

  const incrementarCompartilhamento = () => {
    const novo = compartilhamentosSemana + 1
    setCompartilhamentosSemana(novo)
    localStorage.setItem('compartilhamentos-semana', String(novo))
    toast.success('Compartilhamento registrado!')
  }

  const adicionarEncontro = () => {
    if (!novoEncontro.data || !novoEncontro.titulo) {
      toast.error('Preencha pelo menos a data e o título')
      return
    }
    const encontro = {
      id: Date.now(),
      ...novoEncontro,
    }
    setEncontros((prev) => [...prev, encontro].sort((a, b) => a.data.localeCompare(b.data)))
    setMostrarFormEncontro(false)
    setNovoEncontro({ data: '', hora: '', titulo: '', local: '', tipo: 'presencial' })
    toast.success('Encontro adicionado!')
  }

  const removerEncontro = (id: number) => {
    setEncontros((prev) => prev.filter((e) => e.id !== id))
    toast.success('Encontro removido')
  }

  const formatarData = (dataStr: string) => {
    const [ano, mes, dia] = dataStr.split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ═══════════ HEADER ═══════════ */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[#D4A843] border-[#D4A843]/40">
                <Sparkles className="w-3 h-3 mr-1" />
                Método 3/3
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Área de Membros
              </Badge>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A202C]">
              Dashboard do Curso
            </h1>
            <p className="text-[#4A5568] mt-1">
              Acompanhe seu progresso, metas e accountability
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => navigate('/member/curso-metodo-33')}
            >
              <BookOpen className="w-4 h-4" />
              Ir para o Curso
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* ═══════════ STATS CARDS ═══════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Progresso',
            valor: `${progressoTotal}%`,
            sub: `${concluidas.length}/${licoesResumo.length} lições`,
            icone: TrendingUp,
            cor: 'text-[#D4A843]',
            bg: 'bg-[#D4A843]/10',
          },
          {
            label: 'Concluídas',
            valor: String(concluidas.length),
            sub: 'Lições finalizadas',
            icone: CheckCircle,
            cor: 'text-green-600',
            bg: 'bg-green-100',
          },
          {
            label: 'Compartilhou',
            valor: String(compartilhamentosSemana),
            sub: `Meta: ${metaEvangelismo}/semana`,
            icone: Share2,
            cor: 'text-blue-600',
            bg: 'bg-blue-100',
          },
          {
            label: 'Próxima Lição',
            valor: proximaLicao ? `#${proximaLicao.id}` : '—',
            sub: proximaLicao ? proximaLicao.titulo : 'Todas concluídas!',
            icone: BookOpen,
            cor: 'text-purple-600',
            bg: 'bg-purple-100',
          },
        ].map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icone className={`w-5 h-5 ${stat.cor}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#1A202C] font-heading">{stat.valor}</div>
                <div className="text-sm font-medium text-[#4A5568]">{stat.label}</div>
                <div className="text-xs text-[#718096] mt-0.5 truncate">{stat.sub}</div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* ═══════════ PROGRESS BAR ═══════════ */}
      <FadeIn delay={0.1}>
        <Card className="border-0 shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#D4A843]" />
                <span className="font-semibold text-[#1A202C]">Progresso do Curso</span>
              </div>
              <span className="text-sm font-bold text-[#D4A843]">{progressoTotal}%</span>
            </div>
            <Progress value={progressoTotal} className="h-3 mb-4" />
            <div className="flex flex-wrap gap-1.5">
              {licoesResumo.map((l) => (
                <button
                  key={l.id}
                  onClick={() => navigate(`/member/curso-metodo-33?licao=${l.id}`)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all hover:scale-110 ${
                    concluidas.includes(l.id)
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'bg-gray-100 text-[#4A5568] hover:bg-[#1A365D]/10'
                  }`}
                  title={l.titulo}
                >
                  {l.id}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* ═══════════ MAIN CONTENT TABS ═══════════ */}
      <FadeIn delay={0.15}>
        <Tabs defaultValue="licoes" className="space-y-4">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
            <TabsTrigger value="licoes" className="gap-1.5">
              <BookOpen className="w-4 h-4 hidden sm:inline" />
              Lições
            </TabsTrigger>
            <TabsTrigger value="accountability" className="gap-1.5">
              <MessageCircle className="w-4 h-4 hidden sm:inline" />
              Accountability
            </TabsTrigger>
            <TabsTrigger value="multiplicacao" className="gap-1.5">
              <Users className="w-4 h-4 hidden sm:inline" />
              Multiplicação
            </TabsTrigger>
          </TabsList>

          {/* ═══════════ TAB: LIÇÕES ═══════════ */}
          <TabsContent value="licoes" className="space-y-4">
            {/* Próxima lição */}
            {proximaLicao && (
              <Card className="border-0 shadow-md bg-gradient-to-r from-[#1A365D] to-[#2C5282] text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <Badge className="bg-white/20 text-white border-white/30 mb-2 hover:bg-white/30">
                        <Zap className="w-3 h-3 mr-1" />
                        Continue onde parou
                      </Badge>
                      <h3 className="font-heading text-xl font-bold mb-1">
                        Lição {proximaLicao.id}: {proximaLicao.titulo}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {proximaLicao.versiculo} — {proximaLicao.proposito}
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate(`/member/curso-metodo-33?licao=${proximaLicao.id}`)}
                      className="bg-[#D4A843] hover:bg-[#B8922E] text-[#0F2744] font-semibold shrink-0 gap-2"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista de todas as lições */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {licoesResumo.map((licao) => {
                const isConcluida = concluidas.includes(licao.id)
                return (
                  <motion.div
                    key={licao.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                        isConcluida ? 'bg-green-50/50' : ''
                      }`}
                      onClick={() => navigate(`/member/curso-metodo-33?licao=${licao.id}`)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                              isConcluida ? 'bg-green-100' : 'bg-[#1A365D]/10'
                            }`}
                          >
                            {isConcluida ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <span className="font-bold text-[#1A365D]">{licao.id}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[#1A202C] text-sm truncate">
                              {licao.titulo}
                            </h4>
                            <p className="text-xs text-[#D4A843] mt-0.5">{licao.versiculo}</p>
                            <Badge
                              variant="outline"
                              className={`text-[10px] mt-2 ${
                                propositoCores[licao.proposito] || ''
                              }`}
                            >
                              {licao.proposito}
                            </Badge>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#718096] shrink-0 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          {/* ═══════════ TAB: ACCOUNTABILITY ═══════════ */}
          <TabsContent value="accountability" className="space-y-5">
            {/* Evangelism Goal */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#E8532D]" />
                  Metas de Evangelismo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#4A5568]">
                      Meta: Compartilhar o evangelho com{' '}
                      <span className="font-bold text-[#1A202C]">{metaEvangelismo}</span> pessoas
                      esta semana
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={metaEvangelismo}
                        onChange={(e) => {
                          const val = parseInt(e.target.value)
                          setMetaEvangelismo(val)
                          localStorage.setItem('meta-evangelismo', String(val))
                        }}
                        className="w-32 accent-[#E8532D]"
                      />
                      <span className="text-sm font-medium text-[#1A202C]">{metaEvangelismo}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#1A202C] font-heading">
                        {compartilhamentosSemana}
                      </div>
                      <div className="text-xs text-[#718096]">esta semana</div>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <Button
                      size="sm"
                      onClick={incrementarCompartilhamento}
                      className="bg-[#E8532D] hover:bg-[#D14A28] gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Registre
                    </Button>
                  </div>
                </div>

                {/* Mini progress */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#718096]">Progresso da meta</span>
                    <span className="font-medium text-[#1A202C]">
                      {Math.min(Math.round((compartilhamentosSemana / metaEvangelismo) * 100), 100)}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min((compartilhamentosSemana / metaEvangelismo) * 100, 100)}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Accountability Questions */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#1A365D]" />
                  Accountability Semanal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question 1 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D4A843]/20 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 text-[#D4A843]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1A202C]">
                        Como você viveu o discipulado esta semana?
                      </h4>
                      <p className="text-sm text-[#718096]">
                        Compartilhe como foi sua caminhada, desafios e vitórias.
                      </p>
                    </div>
                  </div>
                  <Textarea
                    value={discipuladoSemana}
                    onChange={(e) => setDiscipuladoSemana(e.target.value)}
                    placeholder="Escreva sua resposta aqui..."
                    className="min-h-[120px] resize-none border-gray-200 focus:border-[#D4A843] focus:ring-[#D4A843]/20"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={salvarDiscipulado}
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-[#1A365D] hover:bg-[#1A365D]/5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Salvar Resposta
                    </Button>
                  </div>
                </div>

                <div className="border-t" />

                {/* Question 2 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8532D]/20 flex items-center justify-center shrink-0">
                      <Share2 className="w-4 h-4 text-[#E8532D]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1A202C]">
                        Com quem você compartilhou o evangelho?
                      </h4>
                      <p className="text-sm text-[#718096]">
                        Liste os nomes e como foi a conversa.
                      </p>
                    </div>
                  </div>
                  <Textarea
                    value={compartilhouEvangelho}
                    onChange={(e) => setCompartilhouEvangelho(e.target.value)}
                    placeholder="Ex: Compartilhei com Maria no trabalho sobre como Jesus mudou minha vida..."
                    className="min-h-[120px] resize-none border-gray-200 focus:border-[#E8532D] focus:ring-[#E8532D]/20"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={salvarEvangelho}
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-[#E8532D] hover:bg-[#E8532D]/5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Salvar Resposta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accountability Tip */}
            <div className="bg-[#F7FAFC] rounded-xl p-4 border border-gray-100 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#D4A843] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#1A202C]">Dica de Accountability</p>
                <p className="text-sm text-[#4A5568]">
                  O accountability funciona melhor quando é feito em grupo. Compartilhe suas respostas
                  com um parceiro de accountability ou na sua célula para maior impacto.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* ═══════════ TAB: MULTIPLICAÇÃO ═══════════ */}
          <TabsContent value="multiplicacao" className="space-y-5">
            {/* Gen Map */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#D4A843]" />
                  Gen Map — Mapa de Gerações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#4A5568] mb-6">
                  Visualize a multiplicação dos discípulos através das gerações.
                  Cada geração discipula 3 pessoas que discipulam mais 3.
                </p>

                <div className="space-y-4">
                  {genMapData.map((gen, i) => (
                    <motion.div
                      key={gen.geracao}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="relative"
                    >
                      <div className="flex items-center gap-4">
                        {/* Generation label */}
                        <div className="w-20 shrink-0 text-right">
                          <span className="text-xs font-medium text-[#718096]">
                            {gen.geracao === 1 ? 'Você' : `G${gen.geracao}`}
                          </span>
                        </div>

                        {/* Connector line */}
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              gen.status === 'ativo' ? 'bg-[#D4A843]' : 'bg-gray-300'
                            }`}
                          />
                          {i < genMapData.length - 1 && (
                            <div className="w-px h-8 bg-gray-200" />
                          )}
                        </div>

                        {/* Bar */}
                        <div className="flex-1">
                          <div
                            className={`h-10 rounded-lg flex items-center px-4 transition-all ${
                              gen.status === 'ativo'
                                ? 'bg-gradient-to-r from-[#1A365D] to-[#2C5282] text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                            style={{ width: gen.discipulos > 0 ? '100%' : '60%' }}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium text-sm">
                                {gen.discipulos > 0
                                  ? `${gen.discipulos} discípulo${gen.discipulos > 1 ? 's' : ''}`
                                  : 'Projeção'}
                              </span>
                              {gen.status === 'ativo' && (
                                <div className="flex -space-x-1.5">
                                  {Array.from({ length: Math.min(gen.discipulos, 8) }).map(
                                    (_, j) => (
                                      <div
                                        key={j}
                                        className="w-6 h-6 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center"
                                      >
                                        <UserPlus className="w-3 h-3" />
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Projections */}
                <div className="mt-6 p-4 bg-[#F7FAFC] rounded-xl">
                  <p className="text-sm font-medium text-[#1A202C] mb-2">
                    <TrendingUp className="w-4 h-4 inline mr-1 text-[#D4A843]" />
                    Se cada discípulo fizer 3 discípulos:
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <div className="font-bold text-[#1A365D] text-lg">3</div>
                      <div className="text-[#718096]">1ª geração</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <div className="font-bold text-[#1A365D] text-lg">9</div>
                      <div className="text-[#718096]">2ª geração</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <div className="font-bold text-[#1A365D] text-lg">27</div>
                      <div className="text-[#718096]">3ª geração</div>
                    </div>
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <div className="font-bold text-[#D4A843] text-lg">81+</div>
                      <div className="text-[#718096]">4ª geração</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#1A365D]" />
                  Calendário de Encontros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {encontros.map((encontro) => (
                    <motion.div
                      key={encontro.id}
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                          encontro.tipo === 'online'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-[#1A365D]/10 text-[#1A365D]'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="text-[10px] font-bold mt-0.5">
                          {formatarData(encontro.data).split('/')[0]}/{formatarData(encontro.data).split('/')[1]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#1A202C] text-sm truncate">
                          {encontro.titulo}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#718096] mt-0.5">
                          <Clock className="w-3 h-3" />
                          {encontro.hora}
                          <MapPin className="w-3 h-3 ml-1" />
                          {encontro.local}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] shrink-0 ${
                          encontro.tipo === 'online'
                            ? 'border-blue-200 text-blue-600'
                            : 'border-green-200 text-green-600'
                        }`}
                      >
                        {encontro.tipo === 'online' ? (
                          <Video className="w-3 h-3 mr-1" />
                        ) : (
                          <MapPin className="w-3 h-3 mr-1" />
                        )}
                        {encontro.tipo}
                      </Badge>
                      <button
                        onClick={() => removerEncontro(encontro.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#718096] hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Add Meeting */}
                {!mostrarFormEncontro ? (
                  <Button
                    variant="outline"
                    className="w-full mt-4 gap-2 text-[#1A365D] border-dashed border-[#1A365D]/30 hover:bg-[#1A365D]/5"
                    onClick={() => setMostrarFormEncontro(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Encontro
                  </Button>
                ) : (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-[#718096] mb-1 block">Data</label>
                        <input
                          type="date"
                          value={novoEncontro.data}
                          onChange={(e) =>
                            setNovoEncontro((p) => ({ ...p, data: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#D4A843]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#718096] mb-1 block">Hora</label>
                        <input
                          type="time"
                          value={novoEncontro.hora}
                          onChange={(e) =>
                            setNovoEncontro((p) => ({ ...p, hora: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#D4A843]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-[#718096] mb-1 block">Título</label>
                      <input
                        type="text"
                        value={novoEncontro.titulo}
                        onChange={(e) =>
                          setNovoEncontro((p) => ({ ...p, titulo: e.target.value }))
                        }
                        placeholder="Ex: Encontro 3/3 — Semana 7"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#D4A843]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-[#718096] mb-1 block">Local</label>
                        <input
                          type="text"
                          value={novoEncontro.local}
                          onChange={(e) =>
                            setNovoEncontro((p) => ({ ...p, local: e.target.value }))
                          }
                          placeholder="Sala Principal"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#D4A843]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[#718096] mb-1 block">Tipo</label>
                        <select
                          value={novoEncontro.tipo}
                          onChange={(e) =>
                            setNovoEncontro((p) => ({
                              ...p,
                              tipo: e.target.value as 'presencial' | 'online',
                            }))
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#D4A843] bg-white"
                        >
                          <option value="presencial">Presencial</option>
                          <option value="online">Online</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={adicionarEncontro}
                        className="bg-[#1A365D] hover:bg-[#2C5282] gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Adicionar
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setMostrarFormEncontro(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all bg-gradient-to-br from-[#1A365D] to-[#2C5282] text-white"
                onClick={() => navigate('/member/curso-metodo-33')}
              >
                <CardContent className="p-5">
                  <BookOpen className="w-8 h-8 text-[#D4A843] mb-3" />
                  <h4 className="font-heading text-lg font-bold">Continuar Curso</h4>
                  <p className="text-white/70 text-sm mt-1">
                    Acesse as lições e continue seu discipulado.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-all bg-gradient-to-br from-[#38A169] to-[#2F855A] text-white"
                onClick={() => {
                  toast.success('Convite copiado!', {
                    description: 'Compartilhe com alguém que você quer discipular.',
                  })
                }}
              >
                <CardContent className="p-5">
                  <UserPlus className="w-8 h-8 text-white/80 mb-3" />
                  <h4 className="font-heading text-lg font-bold">Convidar Alguém</h4>
                  <p className="text-white/70 text-sm mt-1">
                    Compartilhe o Método 3/3 com seus 3.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  )
}
