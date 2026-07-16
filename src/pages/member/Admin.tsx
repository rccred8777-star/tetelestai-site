import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, Church, GraduationCap, Megaphone, CalendarDays, Shield,
  Loader2, ChevronRight, Clock, UserX, UserCircle, Check,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { listStudents, type Student } from '@/services/studentsDb'
import { listCells } from '@/services/cellsDb'
import { listCourses, type Course } from '@/services/coursesDb'
import {
  listPendingEnrollments, approveEnrollment, unenrollStudent, type Enrollment,
} from '@/services/enrollmentsDb'

interface Nums {
  membros: number; lideres: number; celulas: number; cursos: number; semLider: number
}

export default function Admin() {
  const { profile, user } = useAuth()
  const nome = profile?.displayName || user?.displayName || 'Admin'

  const [n, setN] = useState<Nums | null>(null)
  const [pend, setPend] = useState<Enrollment[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [busy, setBusy] = useState<string | null>(null)

  const carregar = async () => {
    try {
      const [sts, cells, crs, pe] = await Promise.all([
        listStudents(), listCells(), listCourses(), listPendingEnrollments(),
      ])
      setStudents(sts)
      setCourses(crs)
      setPend(pe)
      setN({
        membros: sts.length,
        lideres: sts.filter((s) => s.role === 'leader' || s.role === 'supervisor').length,
        celulas: cells.length,
        cursos: crs.length,
        semLider: cells.filter((c) => !c.leaderId).length,
      })
    } catch (e) { console.error(e) }
  }
  useEffect(() => { carregar() }, [])

  const nomeAluno = (uid: string) => {
    const s = students.find((x) => x.id === uid)
    return s?.displayName || s?.email || 'Membro'
  }
  const emailAluno = (uid: string) => students.find((x) => x.id === uid)?.email || ''
  const tituloCurso = (cid: string) => courses.find((c) => c.id === cid)?.title || cid

  const aprovar = async (e: Enrollment) => {
    setBusy(e.id)
    try {
      await approveEnrollment(e.courseId, e.userId)
      toast.success(`${nomeAluno(e.userId)} aprovado(a) em ${tituloCurso(e.courseId)}`)
      setPend((p) => p.filter((x) => x.id !== e.id))
    } catch (err) { toast.error('Erro ao aprovar'); console.error(err) }
    finally { setBusy(null) }
  }
  const recusar = async (e: Enrollment) => {
    if (!confirm(`Recusar o pedido de ${nomeAluno(e.userId)} em ${tituloCurso(e.courseId)}?`)) return
    setBusy(e.id)
    try {
      await unenrollStudent(e.courseId, e.userId)
      toast.info('Pedido recusado')
      setPend((p) => p.filter((x) => x.id !== e.id))
    } catch (err) { toast.error('Erro ao recusar'); console.error(err) }
    finally { setBusy(null) }
  }

  const areas = [
    { label: 'Gerenciar Cursos', desc: 'Cursos, aulas, apostilas, provas e turmas', href: '/admin/cursos', icon: GraduationCap },
    { label: 'Gerenciar Alunos', desc: 'Membros, papéis e progresso', href: '/admin/alunos', icon: Users },
    { label: 'Gerenciar Células', desc: 'Células, líderes e supervisão', href: '/admin/celulas', icon: Church },
    { label: 'Gerenciar Versículos', desc: 'Mural de memorização da igreja', href: '/admin/versiculos', icon: GraduationCap },
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

          {/* ---------- Pedidos de inscrição em cursos (aprovar aqui mesmo) ---------- */}
          {pend.length > 0 && (
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-[#92400E]">
                  <Clock className="h-4 w-4" /> {pend.length} pedido(s) de inscrição aguardando
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pend.map((e) => (
                  <div key={e.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#1A202C]">{nomeAluno(e.userId)}</p>
                      <p className="truncate text-[11px] text-[#718096]">
                        {emailAluno(e.userId)} · quer entrar em <b>{tituloCurso(e.courseId)}</b>
                      </p>
                    </div>
                    <Button size="sm" disabled={busy === e.id} onClick={() => aprovar(e)}
                      className="h-8 gap-1 bg-[#38A169] px-3 text-xs hover:bg-[#38A169]/90">
                      {busy === e.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />} Aprovar
                    </Button>
                    <Button size="sm" variant="ghost" disabled={busy === e.id} onClick={() => recusar(e)}
                      className="h-8 px-2 text-xs text-red-500">
                      Recusar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {n.semLider > 0 && (
            <Link to="/admin/celulas" className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 hover:bg-red-100">
              <UserX className="h-4 w-4 shrink-0" />
              <span className="flex-1"><b>{n.semLider} célula(s) sem líder.</b> Designe alguém.</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </>
      )}

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
