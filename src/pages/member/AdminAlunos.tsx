import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Shield, Church, User as UserIcon, BookOpen, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import type { UserRole } from '@/contexts/AuthContext'
import { listStudents, updateStudentRole, completedCount, type Student } from '@/services/studentsDb'

const roleLabel: Record<UserRole, string> = {
  admin: 'Administrador',
  supervisor: 'Supervisor de Rede',
  leader: 'Líder',
  member: 'Membro',
}
const roleColor: Record<UserRole, string> = {
  admin: 'bg-[#1A365D] text-white',
  supervisor: 'bg-[#0E7490] text-white',
  leader: 'bg-[#7C2D12] text-white',
  member: 'bg-gray-100 text-[#4A5568]',
}

function initials(s: Student) {
  const n = s.displayName || s.email || '?'
  return n.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function AdminAlunos() {
  const { user } = useAuth()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all')
  const [savingId, setSavingId] = useState<string | null>(null)

  const reload = async () => {
    setLoading(true)
    try {
      setStudents(await listStudents())
    } catch (e) {
      toast.error('Erro ao carregar alunos')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { reload() }, [])

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const hay = `${s.displayName || ''} ${s.email || ''}`.toLowerCase()
      const matchSearch = hay.includes(search.toLowerCase())
      const matchRole = roleFilter === 'all' || s.role === roleFilter
      return matchSearch && matchRole
    })
  }, [students, search, roleFilter])

  const counts = useMemo(() => ({
    total: students.length,
    admin: students.filter((s) => s.role === 'admin').length,
    supervisor: students.filter((s) => s.role === 'supervisor').length,
    leader: students.filter((s) => s.role === 'leader').length,
    member: students.filter((s) => s.role === 'member').length,
  }), [students])

  const changeRole = async (s: Student, role: UserRole) => {
    if (role === s.role) return
    setSavingId(s.id)
    try {
      await updateStudentRole(s.id, role)
      setStudents((prev) => prev.map((x) => (x.id === s.id ? { ...x, role } : x)))
      toast.success(`${s.displayName || 'Aluno'} agora é ${roleLabel[role]}`)
    } catch (e) {
      toast.error('Erro ao alterar o papel')
      console.error(e)
    } finally {
      setSavingId(null)
    }
  }

  const StatCard = ({ icon: Icon, label, value, color }: { icon: typeof Users; label: string; value: number; color: string }) => (
    <Card className="border-0 shadow-sm">
      <CardContent className="flex items-center gap-3 p-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}><Icon className="h-5 w-5" /></div>
        <div>
          <p className="text-xl font-bold text-[#1A202C]">{value}</p>
          <p className="text-xs text-[#718096]">{label}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-1 flex items-center gap-2 text-sm text-[#718096]"><span>Painel Admin</span><span>/</span><span>Gerenciar Alunos</span></div>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#1A202C]">
          <Users className="h-6 w-6 text-[#1A365D]" /> Gerenciar Alunos
        </h1>
        <p className="text-sm text-[#718096]">Veja os membros, o progresso e defina quem é líder ou administrador.</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={Users} label="Total" value={counts.total} color="bg-[#1A365D]/10 text-[#1A365D]" />
        <StatCard icon={Shield} label="Administradores" value={counts.admin} color="bg-[#1A365D]/10 text-[#1A365D]" />
        <StatCard icon={Church} label="Líderes" value={counts.leader} color="bg-[#7C2D12]/10 text-[#7C2D12]" />
        <StatCard icon={UserIcon} label="Membros" value={counts.member} color="bg-gray-100 text-[#4A5568]" />
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Alunos ({filtered.length})</CardTitle>
            <CardDescription>Altere o papel pelo seletor à direita de cada aluno.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718096]" />
              <Input placeholder="Buscar por nome ou email..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9 w-[220px] pl-9 text-sm" />
            </div>
            <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as 'all' | UserRole)}>
              <SelectTrigger className="h-9 w-[140px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="admin">Administradores</SelectItem>
                <SelectItem value="supervisor">Supervisores</SelectItem>
                <SelectItem value="leader">Líderes</SelectItem>
                <SelectItem value="member">Membros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-[#718096]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando...</div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#718096]">Nenhum aluno encontrado.</div>
          ) : (
            <div className="space-y-2">
              {filtered.map((s) => {
                const isSelf = user?.uid === s.id
                return (
                  <div key={s.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5 hover:bg-[#F7FAFC]">
                    <Avatar className="h-9 w-9">
                      {s.photoURL && <AvatarImage src={s.photoURL} alt="" />}
                      <AvatarFallback className="bg-[#1A365D]/10 text-xs text-[#1A365D]">{initials(s)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#1A202C]">
                        {s.displayName || 'Sem nome'} {isSelf && <span className="ml-1 rounded bg-[#D4A843]/20 px-1.5 py-0.5 text-[10px] text-[#8a6d1b]">você</span>}
                      </p>
                      <p className="truncate text-xs text-[#718096]">{s.email}</p>
                    </div>
                    <Badge variant="outline" className="hidden items-center gap-1 text-[10px] sm:flex">
                      <BookOpen className="h-3 w-3" /> {completedCount(s)} aula(s)
                    </Badge>
                    <Badge className={`text-[10px] ${roleColor[s.role]}`}>{roleLabel[s.role]}</Badge>
                    {isSelf ? (
                      <span className="w-[150px] text-right text-[11px] italic text-[#718096]">seu próprio papel é travado</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        {savingId === s.id && <Loader2 className="h-4 w-4 animate-spin text-[#718096]" />}
                        <Select value={s.role} onValueChange={(v) => changeRole(s, v as UserRole)}>
                          <SelectTrigger className="h-8 w-[150px] text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="member">Membro</SelectItem>
                            <SelectItem value="leader">Líder</SelectItem>
                            <SelectItem value="supervisor">Supervisor de Rede</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
          <p className="mt-4 text-[11px] text-[#718096]">
            Observação: você não pode alterar o próprio papel — é uma trava para o último administrador não perder o acesso.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
