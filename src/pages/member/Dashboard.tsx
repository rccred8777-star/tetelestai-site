import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, GraduationCap, Calendar, Bell, Play, Heart, HandHelping, Clock,
  ChevronRight, Church, Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { listAnnouncements, listEvents, type Announcement, type ChurchEvent } from '@/services/adminContentDb'
import { listCells, listMyMemberships, type Cell } from '@/services/cellsDb'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }) }

function isFuturo(d?: string) {
  if (!d) return true
  const dt = new Date(d + 'T23:59:59')
  return isNaN(dt.getTime()) ? true : dt.getTime() >= Date.now()
}
function fmtData(d?: string) {
  if (!d) return ''
  const dt = new Date(d + 'T00:00:00')
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export default function Dashboard() {
  const { user, profile } = useAuth()
  const displayName = profile?.displayName || user?.displayName || 'Usuario'

  const [minhaCelula, setMinhaCelula] = useState<Cell | null>(null)
  const [eventos, setEventos] = useState<ChurchEvent[]>([])
  const [avisos, setAvisos] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user) return
      try {
        const [cells, minhas, evs, ans] = await Promise.all([
          listCells(), listMyMemberships(user.uid), listEvents(), listAnnouncements(),
        ])
        const aprovada = minhas.find((m) => m.status === 'aprovado')
        setMinhaCelula(aprovada ? cells.find((c) => c.id === aprovada.cellId) || null : null)
        setEventos(evs.filter((e) => isFuturo(e.datetime)).slice(0, 3))
        setAvisos(ans.slice(0, 3))
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    })()
  }, [user])

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Olá, {displayName?.split(' ')[0]}!</h1>
        <p className="text-sm text-[#718096]">Bem-vindo à sua área de membros</p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#718096]">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando...
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Minha Célula */}
          <motion.div custom={0} variants={fadeInUp} initial="hidden" animate="visible">
            <Card className="h-full border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#1A202C]">
                  <Church className="h-5 w-5 text-[#1A365D]" /> Minha Célula
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {minhaCelula ? (
                  <>
                    <p className="mb-2 font-heading text-lg font-semibold text-[#1A202C]">{minhaCelula.name}</p>
                    <div className="mb-4 space-y-1 text-sm text-[#4A5568]">
                      {minhaCelula.day && <p>{minhaCelula.day} {minhaCelula.time}</p>}
                      {minhaCelula.location && <p>{minhaCelula.location}</p>}
                      {minhaCelula.leaderName && <p className="text-[#718096]">Líder: {minhaCelula.leaderName}</p>}
                    </div>
                  </>
                ) : (
                  <p className="mb-4 text-sm text-[#718096]">Você ainda não participa de uma célula.</p>
                )}
                <Link to="/minhas-celulas" className="flex items-center gap-1 text-sm font-medium text-[#1A365D] hover:underline">
                  {minhaCelula ? 'Ver detalhes' : 'Encontrar uma célula'} <ChevronRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cursos */}
          <motion.div custom={1} variants={fadeInUp} initial="hidden" animate="visible">
            <Card className="h-full border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#1A202C]">
                  <GraduationCap className="h-5 w-5 text-[#1A365D]" /> Cursos e Materiais
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="mb-4 text-sm text-[#4A5568]">
                  Veja os cursos disponíveis, peça sua inscrição e acompanhe seu progresso.
                </p>
                <Button asChild size="sm" className="bg-[#1A365D] hover:bg-[#2C5282]">
                  <Link to="/cursos">Ver cursos</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Próximos Eventos */}
          <motion.div custom={2} variants={fadeInUp} initial="hidden" animate="visible">
            <Card className="h-full border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#1A202C]">
                  <Calendar className="h-5 w-5 text-[#1A365D]" /> Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {eventos.length === 0 ? (
                  <p className="text-sm text-[#718096]">Nenhum evento marcado.</p>
                ) : eventos.map((e) => (
                  <div key={e.id} className="flex items-center justify-between border-b border-gray-50 py-2 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#1A202C]">{e.title}</p>
                      <p className="text-xs text-[#718096]">{fmtData(e.datetime)} {e.time}</p>
                    </div>
                  </div>
                ))}
                <Link to="/meus-eventos" className="flex items-center gap-1 pt-1 text-sm font-medium text-[#1A365D] hover:underline">
                  Ver todos <ChevronRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Avisos */}
          <motion.div custom={3} variants={fadeInUp} initial="hidden" animate="visible">
            <Card className="h-full border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#1A202C]">
                  <Bell className="h-5 w-5 text-[#1A365D]" /> Avisos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {avisos.length === 0 ? (
                  <p className="text-sm text-[#718096]">Nenhum aviso no momento.</p>
                ) : avisos.map((a, i) => (
                  <div key={a.id} className="flex items-start gap-3 border-b border-gray-50 py-2 last:border-0">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.urgent || i === 0 ? 'bg-[#E8532D]' : 'bg-[#718096]'}`} />
                    <div className="min-w-0">
                      <p className="line-clamp-1 text-sm font-medium text-[#1A202C]">{a.title}</p>
                      {a.date && <p className="text-xs text-[#718096]">{a.date}</p>}
                    </div>
                  </div>
                ))}
                <Link to="/comunicados" className="flex items-center gap-1 pt-1 text-sm font-medium text-[#1A365D] hover:underline">
                  Ver todos <ChevronRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Ações rápidas */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Assistir Culto', icon: Play, variant: 'default' as const, href: '/midia-membro' },
            { label: 'Meus Cursos', icon: GraduationCap, variant: 'outline' as const, href: '/cursos' },
            { label: 'Doações', icon: Heart, variant: 'outline' as const, href: '/minhas-doacoes' },
            { label: 'Pedir Oração', icon: HandHelping, variant: 'ghost' as const, href: '/contato' },
            { label: 'Comunicados', icon: Users, variant: 'ghost' as const, href: '/comunicados' },
            { label: 'Calendário', icon: Clock, variant: 'ghost' as const, href: '/meus-eventos' },
          ].map((action) => (
            <Button key={action.label} asChild variant={action.variant} size="sm"
              className={action.variant === 'default' ? 'gap-2 bg-[#1A365D] hover:bg-[#2C5282]' : action.variant === 'outline' ? 'gap-2 border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white' : 'gap-2 text-[#4A5568] hover:text-[#1A202C]'}>
              <Link to={action.href}>
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
