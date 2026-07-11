import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, BookOpen, Calendar, Bell, Play, Heart, HandHelping, Clock, ChevronRight, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
import { announcements } from '@/data/mock'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }) }

export default function Dashboard() {
  const { user, profile } = useAuth()
  const displayName = profile?.displayName || user?.displayName || 'Usuario'

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Olá, {displayName?.split(' ')[0]}!</h1>
          <p className="text-sm text-[#718096]">Bem-vindo à sua área de membros</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm text-sm text-[#4A5568]">
          <Sun className="w-4 h-4 text-[#D4A843]" />
          <span>28°C São Paulo</span>
        </div>
      </motion.div>

      {/* Onboarding Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#1A202C]">Complete seu perfil</span>
              <span className="text-sm text-[#718096]">75%</span>
            </div>
            <Progress value={75} className="h-2 mb-3" />
            <div className="flex flex-wrap gap-2">
              {[{ text: 'Completar perfil', done: true }, { text: 'Adicionar foto', done: true }, { text: 'Entrar em uma célula', done: true }, { text: 'Iniciar primeiro curso', done: false }].map((item, i) => (
                <span key={i} className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${item.done ? 'bg-[#38A169]/10 text-[#38A169]' : 'bg-gray-100 text-[#718096]'}`}>
                  {item.done ? '✓' : '○'} {item.text}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dashboard Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* My Cell */}
        <motion.div custom={0} variants={fadeInUp} initial="hidden" animate="visible">
          <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#1A202C]">
                <Users className="w-5 h-5 text-[#1A365D]" />
                Minha Célula
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="font-heading text-lg font-semibold text-[#1A202C] mb-2">Célula Vida Nova</p>
              <div className="space-y-1.5 text-sm text-[#4A5568] mb-4">
                <p>Próximo encontro: Terça-feira, 14 Jan — 20h</p>
                <p>Rua das Flores, 45 — Centro</p>
                <p className="flex items-center gap-1.5"><span className="w-5 h-5 rounded-full bg-[#1A365D]/10 flex items-center justify-center text-xs">Pb</span>Pb. João Pereira</p>
              </div>
              <Link to="/minhas-celulas" className="text-sm text-[#1A365D] font-medium hover:underline flex items-center gap-1">Ver Detalhes <ChevronRight className="w-3 h-3" /></Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Courses */}
        <motion.div custom={1} variants={fadeInUp} initial="hidden" animate="visible">
          <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#1A202C]">
                <BookOpen className="w-5 h-5 text-[#1A365D]" />
                Meus Cursos
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="font-medium text-[#1A202C] mb-1">Fundamentos da Fé</p>
              <div className="flex items-center justify-between text-xs text-[#718096] mb-2">
                <span>Progresso: 60%</span>
                <span>3 de 5 módulos</span>
              </div>
              <Progress value={60} className="h-2 mb-3" />
              <p className="text-sm text-[#4A5568] mb-4">Próxima aula: Aula 4 — O Poder da Oração</p>
              <Link to="/meus-cursos">
                <Button size="sm" className="bg-[#1A365D] hover:bg-[#2C5282]">Continuar Estudando</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Events */}
        <motion.div custom={2} variants={fadeInUp} initial="hidden" animate="visible">
          <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#1A202C]">
                <Calendar className="w-5 h-5 text-[#1A365D]" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {[{ name: 'Conferência Avivamento 2026', date: '15-17 Jan', status: 'Inscrito', ok: true }, { name: 'Batismo', date: '23 Fev', status: 'Pendente', ok: false }, { name: 'Noite de Oração', date: '22 Jan — 20h', status: '', ok: false }].map((evt, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#1A202C]">{evt.name}</p>
                    <p className="text-xs text-[#718096]">{evt.date}</p>
                  </div>
                  {evt.ok && <span className="text-xs text-[#38A169] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#38A169]" />{evt.status}</span>}
                </div>
              ))}
              <Link to="/meus-eventos" className="text-sm text-[#1A365D] font-medium hover:underline flex items-center gap-1 pt-1">Ver Todos <ChevronRight className="w-3 h-3" /></Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Announcements */}
        <motion.div custom={3} variants={fadeInUp} initial="hidden" animate="visible">
          <Card className="border-0 shadow-md h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#1A202C]">
                <Bell className="w-5 h-5 text-[#1A365D]" />
                Avisos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {announcements.slice(0, 3).map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${i === 0 ? 'bg-[#E8532D]' : 'bg-[#718096]'}`} />
                  <div>
                    <p className="text-sm font-medium text-[#1A202C] line-clamp-1">{a.title}</p>
                    <p className="text-xs text-[#718096]">{a.date}</p>
                  </div>
                </div>
              ))}
              <Link to="/comunicados" className="text-sm text-[#1A365D] font-medium hover:underline flex items-center gap-1 pt-1">Ver Todos <ChevronRight className="w-3 h-3" /></Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Assistir Culto', icon: Play, variant: 'default' as const },
            { label: 'Ver Mensagem', icon: BookOpen, variant: 'outline' as const },
            { label: 'Fazer Doação', icon: Heart, variant: 'outline' as const },
            { label: 'Pedir Oração', icon: HandHelping, variant: 'ghost' as const },
            { label: 'Convidar Amigo', icon: Users, variant: 'ghost' as const },
            { label: 'Ver Calendário', icon: Clock, variant: 'ghost' as const },
          ].map((action) => (
            <Button key={action.label} variant={action.variant} size="sm" className={action.variant === 'default' ? 'bg-[#1A365D] hover:bg-[#2C5282] gap-2' : action.variant === 'outline' ? 'border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white gap-2' : 'text-[#4A5568] hover:text-[#1A202C] gap-2'} onClick={() => alert('Em breve!')}>
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
