import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, Church, GraduationCap, Megaphone, CalendarDays, Shield,
  Loader2, ChevronRight, Clock, UserX, UserCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { listStudents } from '@/services/studentsDb'
import { listCells } from '@/services/cellsDb'
import { listCourses } from '@/services/coursesDb'
import { listPendingEnrollments } from '@/services/enrollmentsDb'

interface Nums {
  membros: number; lideres: number; celulas: number; cursos: number
  semLider: number; pedidos: number
}

export default function Admin() {
  const { profile, user } = useAuth()
  const nome = profile?.displayName || user?.displayName || 'Admin'

  const [n, setN] = useState<Nums | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const [students, cells, courses, pend] = await Promise.all([
          listStudents(), listCells(), listCourses(), listPendingEnrollments(),
        ])
        setN({
          membros: students.length,
          lideres: students.filter((s) => s.role === 'leader' || s.role === 'supervisor').length,
          celulas: cells.length,
          cursos: courses.length,
          semLider: cells.filter((c) => !c.leaderId).length,
          pedidos: pend.length,
        })
      } catch (e) { console.error(e) }
    })()
  }, [])

  // Atalhos para as áreas de gestão (tudo com dados reais)
  const areas = [
    { label: 'Gerenciar Cursos', desc: 'Cursos, aulas, apostilas, provas e turmas', href: '/admin/cursos', icon: GraduationCap },
    { label: 'Gerenciar Alunos', desc: 'Membros, papéis e progresso', href: '/admin/alunos', icon: Users },
    { label: 'Gerenciar Células', desc: 'Células, líderes e supervisão', href: '/admin/celulas', icon: Church },
    { label: 'Gerenciar Comunicados', desc: 'Avisos para os membros', href: '/admin/comunicados', icon: Megaphone },
    { label: 'Gerenciar Eventos', desc: 'Agenda da igreja', href: '/admin/eventos', icon: CalendarDays },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#1A202C]">
          <Shield className="h-6 w-6 text-[#1A365D]" /> Painel Administrativo
        </h1>
        <p className="text-sm text-[#718096]">Olá, {nome?.split(' ')[0]}. Aqui está o panorama da igreja.</p>
      </motion.div>

      {/* Números reais */}
      {!n ? (
        <div className="flex items-center justify-center py-10 text-[#718096]">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando números...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Membros', value: n.membros, icon: Users },
              { label: 'Líderes', value: n.lideres, icon: UserCircle },
              { label: 'Células', value: n.celulas, icon: Church },
              { label: 'Cursos', value: n.cursos, icon: GraduationCap },
            ].map((c) => (
              <Card key={c.label} className="border-0 shadow-sm">
                <CardContent className="py-4">
                  <div className="flex items-center gap-1.5 text-[#718096]">
                    <c.icon className="h-3.5 w-3.5" /><p className="text-[11px]">{c.label}</p>
                  </div>
                  <p className="mt-1 font-heading text-2xl font-bold text-[#1A365D]">{c.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Alertas: coisas que pedem ação */}
          {(n.pedidos > 0 || n.semLider > 0) && (
            <div className="space-y-2">
              {n.pedidos > 0 && (
                <Link to="/admin/cursos" className="flex items-center gap-2 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5 text-sm text-[#92400E] hover:bg-[#FEF3C7]">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="flex-1"><b>{n.pedidos} pedido(s) de inscrição</b> em cursos aguardando aprovação.</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
              {n.semLider > 0 && (
                <Link to="/admin/celulas" className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 hover:bg-red-100">
                  <UserX className="h-4 w-4 shrink-0" />
                  <span className="flex-1"><b>{n.semLider} célula(s) sem líder.</b> Designe alguém.</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          )}
        </>
      )}

      {/* Áreas de gestão */}
      <div>
        <h2 className="mb-3 font-heading text-lg font-bold text-[#1A202C]">Gestão</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {areas.map((a) => (
            <Link key={a.href} to={a.href}
              className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1A365D]/10 text-[#1A365D]">
                <a.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#1A202C]">{a.label}</p>
                <p className="truncate text-xs text-[#718096]">{a.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#718096]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
