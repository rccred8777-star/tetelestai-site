import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import {
  Users, UserCheck, BookOpen, Heart, TrendingUp, BarChart3,
  Mail, FileText, UserCircle, CalendarDays, ClipboardList,
  Shield, Search, Edit, Trash2, Eye,
  Plus, Send, GraduationCap, Church, AlertTriangle, CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/useAuth'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 }
  })
}

// ============ MOCK DATA ============

const statsCards = [
  { icon: Users, label: 'Total de Membros', value: '47', change: '+3 este mes', color: 'bg-[#1A365D]', textColor: 'text-[#1A365D]' },
  { icon: UserCheck, label: 'Membros Ativos', value: '38', change: '81% ativos', color: 'bg-[#38A169]', textColor: 'text-[#38A169]' },
  { icon: Church, label: 'Celulas Ativas', value: '6', change: '2 precisam de lider', color: 'bg-[#D4A843]', textColor: 'text-[#D4A843]' },
  { icon: BookOpen, label: 'Cursos Concluidos', value: '124', change: '+12 esta semana', color: 'bg-[#3182CE]', textColor: 'text-[#3182CE]' },
  { icon: Heart, label: 'Doacoes (Mes)', value: 'R$ 8.450', change: '+15% vs mes passado', color: 'bg-[#E8532D]', textColor: 'text-[#E8532D]' },
  { icon: GraduationCap, label: 'Alunos em Cursos', value: '31', change: '5 novos alunos', color: 'bg-[#805AD5]', textColor: 'text-[#805AD5]' },
]

const membersData = [
  { id: '1', name: 'Ana Carolina Silva', email: 'ana.silva@email.com', cell: 'Vida Nova', level: 4, status: 'active', role: 'member', phone: '(11) 98765-4321', joined: '15/01/2023' },
  { id: '2', name: 'Marcos Oliveira', email: 'marcos.oliveira@email.com', cell: 'Luz', level: 3, status: 'active', role: 'leader', phone: '(11) 91234-5678', joined: '22/03/2023' },
  { id: '3', name: 'Fernanda Lima', email: 'fernanda.l@email.com', cell: 'Renovo', level: 5, status: 'active', role: 'leader', phone: '(11) 99876-5432', joined: '10/02/2023' },
  { id: '4', name: 'Pedro Costa', email: 'pedro.costa@email.com', cell: 'Vida Nova', level: 2, status: 'inactive', role: 'member', phone: '(11) 95555-4444', joined: '05/06/2023' },
  { id: '5', name: 'Juliana Mendes', email: 'juliana.m@email.com', cell: '-', level: 1, status: 'new', role: 'member', phone: '(11) 96666-7777', joined: '02/07/2024' },
  { id: '6', name: 'Ricardo Santos', email: 'ricardo.s@email.com', cell: 'Esperanca', level: 3, status: 'active', role: 'member', phone: '(11) 94444-3333', joined: '18/04/2023' },
  { id: '7', name: 'Priscila Rocha', email: 'pri.rocha@email.com', cell: 'Luz', level: 4, status: 'active', role: 'admin', phone: '(11) 93333-2222', joined: '01/01/2022' },
]

const cellsData = [
  { id: '1', name: 'Celula Vida Nova', leader: 'Pb. Joao Pereira', members: 12, day: 'Tercas 20h', region: 'Centro', status: 'active', type: 'Mista' },
  { id: '2', name: 'Celula Luz', leader: 'Pra. Maria Santos', members: 8, day: 'Quartas 19h30', region: 'Jardim das Flores', status: 'active', type: 'Mulheres' },
  { id: '3', name: 'Celula Renovo', leader: 'Pr. Lucas Lima', members: 10, day: 'Quintas 20h', region: 'Vila Nova', status: 'active', type: 'Jovens' },
  { id: '4', name: 'Celula Esperanca', leader: 'Sem lider', members: 5, day: 'Sabados 17h', region: 'Centro', status: 'needs_leader', type: 'Mista' },
  { id: '5', name: 'Celula Fogo', leader: 'Diac. Pedro Alves', members: 7, day: 'Segundas 19h30', region: 'Morumbi', status: 'active', type: 'Homens' },
  { id: '6', name: 'Celula Vitoria', leader: 'Dna. Ana Costa', members: 9, day: 'Sextas 20h', region: 'Jardim das Flores', status: 'active', type: 'Casais' },
]

const coursesData = [
  { id: '1', name: 'Metodo 3/3', students: 18, completions: 12, avgProgress: 72, category: 'Discipulado' },
  { id: '2', name: 'Curso de Lideres', students: 8, completions: 5, avgProgress: 65, category: 'Lideranca' },
  { id: '3', name: 'Escola de Missoes', students: 5, completions: 2, avgProgress: 45, category: 'Missoes' },
  { id: '4', name: 'Fundamentos da Fe', students: 15, completions: 14, avgProgress: 88, category: 'Basico' },
  { id: '5', name: 'Vida no Espirito', students: 10, completions: 7, avgProgress: 60, category: 'Crescimento' },
]

const monthlyGrowth = [
  { month: 'Jan', members: 30, visitors: 12 },
  { month: 'Fev', members: 32, visitors: 15 },
  { month: 'Mar', members: 35, visitors: 10 },
  { month: 'Abr', members: 35, visitors: 18 },
  { month: 'Mai', members: 38, visitors: 14 },
  { month: 'Jun', members: 40, visitors: 20 },
  { month: 'Jul', members: 42, visitors: 16 },
  { month: 'Ago', members: 43, visitors: 22 },
  { month: 'Set', members: 45, visitors: 18 },
  { month: 'Out', members: 45, visitors: 25 },
  { month: 'Nov', members: 46, visitors: 20 },
  { month: 'Dez', members: 47, visitors: 28 },
]

const statusConfig: Record<string, { label: string; variant: string }> = {
  active: { label: 'Ativo', variant: 'bg-[#38A169] text-white hover:bg-[#38A169]' },
  inactive: { label: 'Inativo', variant: 'bg-[#D69E2E] text-white hover:bg-[#D69E2E]' },
  new: { label: 'Novo', variant: 'bg-[#3182CE] text-white hover:bg-[#3182CE]' },
  needs_leader: { label: 'Precisa de Lider', variant: 'bg-[#E8532D] text-white hover:bg-[#E8532D]' },
}

const quickActions: { icon: typeof Mail; label: string; href?: string }[] = [
  { icon: Mail, label: 'Enviar Comunicado', href: '/admin/comunicados' },
  { icon: CalendarDays, label: 'Criar Evento', href: '/admin/eventos' },
  { icon: UserCircle, label: 'Gerenciar Membros', href: '/admin/alunos' },
  { icon: GraduationCap, label: 'Gerenciar Cursos', href: '/admin/cursos' },
  { icon: FileText, label: 'Gerar Relatorio' },
  { icon: ClipboardList, label: 'Lista de Presenca' },
]

// ============ COMPONENTS ============

function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statsCards.map((s, i) => (
        <motion.div key={s.label} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center`}>
                  <s.icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#1A202C]">{s.value}</p>
              <p className="text-xs text-[#4A5568] mt-0.5">{s.label}</p>
              <p className="text-[10px] text-[#718096] mt-1">{s.change}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function MembersTable() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = membersData.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-5 h-5 text-[#1A365D]" />
            Gerenciamento de Membros
          </CardTitle>
          <CardDescription>{membersData.length} membros cadastrados</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]" />
            <Input
              placeholder="Buscar membro..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 w-[200px] text-sm"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[140px] text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
              <SelectItem value="new">Novos</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="bg-[#1A365D] hover:bg-[#1A365D]/90 h-9">
            <Plus className="w-4 h-4 mr-1" /> Novo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Membro</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Celula</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Nivel</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Funcao</th>
                <th className="text-right py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F7FAFC] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=1A365D&color=fff`} />
                        <AvatarFallback className="bg-[#1A365D] text-white text-xs font-bold">
                          {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#1A202C] text-sm">{m.name}</p>
                        <p className="text-xs text-[#718096]">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#4A5568]">{m.cell}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-2 h-2 rounded-full ${star <= m.level ? 'bg-[#D4A843]' : 'bg-gray-200'}`}
                        />
                      ))}
                      <span className="text-xs text-[#718096] ml-1">{m.level}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <Badge className={`${statusConfig[m.status]?.variant || ''} text-[10px]`}>
                      {statusConfig[m.status]?.label || m.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {m.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : null}
                      {m.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4A5568] hover:text-[#1A365D]">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4A5568] hover:text-[#3182CE]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4A5568] hover:text-[#E8532D]">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function CellsTable() {
  const [search, setSearch] = useState('')

  const filtered = cellsData.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.leader.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Church className="w-5 h-5 text-[#1A365D]" />
            Gerenciamento de Celulas
          </CardTitle>
          <CardDescription>{cellsData.length} celulas ativas</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]" />
            <Input
              placeholder="Buscar celula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 w-[200px] text-sm"
            />
          </div>
          <Button size="sm" className="bg-[#1A365D] hover:bg-[#1A365D]/90 h-9">
            <Plus className="w-4 h-4 mr-1" /> Nova
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Celula</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Lider</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Membros</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Dia/Horario</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Status</th>
                <th className="text-right py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F7FAFC] transition-colors">
                  <td className="py-3 px-3">
                    <div>
                      <p className="font-medium text-[#1A202C] text-sm">{c.name}</p>
                      <p className="text-xs text-[#718096]">{c.type} • {c.region}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#4A5568]">{c.leader}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#718096]" />
                      <span className="text-[#4A5568]">{c.members}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#4A5568] text-sm">{c.day}</td>
                  <td className="py-3 px-3">
                    <Badge className={`${statusConfig[c.status]?.variant || ''} text-[10px]`}>
                      {statusConfig[c.status]?.label || c.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4A5568] hover:text-[#3182CE]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4A5568] hover:text-[#E8532D]">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function CoursesTable() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="w-5 h-5 text-[#1A365D]" />
            Cursos
          </CardTitle>
          <CardDescription>{coursesData.length} cursos disponiveis</CardDescription>
        </div>
        <Button size="sm" className="bg-[#1A365D] hover:bg-[#1A365D]/90 h-9">
          <Plus className="w-4 h-4 mr-1" /> Novo Curso
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Curso</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Categoria</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Alunos</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Conclusoes</th>
                <th className="text-left py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Progresso Medio</th>
                <th className="text-right py-2.5 px-3 text-[#718096] font-medium text-xs uppercase tracking-wider">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {coursesData.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F7FAFC] transition-colors">
                  <td className="py-3 px-3 font-medium text-[#1A202C] text-sm">{c.name}</td>
                  <td className="py-3 px-3">
                    <Badge variant="outline" className="text-[10px]">{c.category}</Badge>
                  </td>
                  <td className="py-3 px-3 text-[#4A5568]">{c.students}</td>
                  <td className="py-3 px-3 text-[#4A5568]">{c.completions}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#38A169] rounded-full transition-all"
                          style={{ width: `${c.avgProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#718096]">{c.avgProgress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4A5568] hover:text-[#3182CE]">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function AnnouncementsPanel() {
  const [announcements, setAnnouncements] = useState([
    { id: '1', title: 'Culto especial de quinta-feira', message: 'Teremos um culto especial nesta quinta com o Pr. Ricardo. Todos sao bem-vindos!', date: '2024-07-10', author: 'Pr. Lucas', urgent: true },
    { id: '2', title: 'Retiro de celulas', message: 'O retiro anual das celulas acontecera no dia 25/07. Inscricoes abertas!', date: '2024-07-08', author: 'Pra. Maria', urgent: false },
    { id: '3', title: 'Nova turma do Metodo 3/3', message: 'Abertas as inscricoes para a nova turma do Metodo 3/3. Nao perca!', date: '2024-07-05', author: 'Pb. Joao', urgent: false },
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCreate = () => {
    if (!newTitle.trim() || !newMessage.trim()) return
    const newAnnouncement = {
      id: Date.now().toString(),
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString().split('T')[0],
      author: 'Admin',
      urgent: isUrgent,
    }
    setAnnouncements([newAnnouncement, ...announcements])
    setNewTitle('')
    setNewMessage('')
    setIsUrgent(false)
    setDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id))
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="w-5 h-5 text-[#1A365D]" />
            Comunicados
          </CardTitle>
          <CardDescription>{announcements.length} comunicados ativos</CardDescription>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#1A365D] hover:bg-[#1A365D]/90 h-9">
              <Plus className="w-4 h-4 mr-1" /> Novo Aviso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Comunicado</DialogTitle>
              <DialogDescription>O comunicado sera enviado para todos os membros.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titulo</Label>
                <Input
                  id="title"
                  placeholder="Titulo do comunicado"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Escreva a mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="urgent" className="text-sm cursor-pointer">Marcar como urgente</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button className="bg-[#1A365D] hover:bg-[#1A365D]/90" onClick={handleCreate}>
                <Send className="w-4 h-4 mr-2" /> Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        {announcements.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${a.urgent ? 'bg-[#E8532D]/5 border-[#E8532D]/20' : 'bg-[#F7FAFC] border-gray-100'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {a.urgent && <AlertTriangle className="w-4 h-4 text-[#E8532D]" />}
                  <h4 className="font-medium text-[#1A202C] text-sm">{a.title}</h4>
                </div>
                <p className="text-sm text-[#4A5568] mb-2">{a.message}</p>
                <div className="flex items-center gap-3 text-xs text-[#718096]">
                  <span>por {a.author}</span>
                  <span>{new Date(a.date).toLocaleDateString('pt-BR')}</span>
                  {a.urgent && (
                    <Badge className="bg-[#E8532D] text-white text-[9px] hover:bg-[#E8532D]">Urgente</Badge>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-[#718096] hover:text-[#E8532D] shrink-0"
                onClick={() => handleDelete(a.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}

function ChartsPanel() {
  const maxMembers = Math.max(...monthlyGrowth.map(d => d.members + d.visitors))

  // Pie chart data - member levels
  const levelDistribution = [
    { label: 'Nivel 1', value: 8, color: '#1A365D' },
    { label: 'Nivel 2', value: 12, color: '#3182CE' },
    { label: 'Nivel 3', value: 15, color: '#38A169' },
    { label: 'Nivel 4', value: 7, color: '#D4A843' },
    { label: 'Nivel 5', value: 5, color: '#E8532D' },
  ]
  const totalLevels = levelDistribution.reduce((sum, l) => sum + l.value, 0)

  // SVG pie chart calculations
  let currentAngle = 0
  const pieSlices = levelDistribution.map((slice) => {
    const angle = (slice.value / totalLevels) * 360
    const startAngle = currentAngle
    currentAngle += angle
    const endAngle = currentAngle
    return { ...slice, startAngle, endAngle }
  })

  function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const angleRad = (angleDeg - 90) * Math.PI / 180
    return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) }
  }

  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, endAngle)
    const end = polarToCartesian(cx, cy, r, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Bar Chart - Monthly Growth */}
      <motion.div custom={4} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-5 h-5 text-[#1A365D]" />
              Crescimento Mensal
            </CardTitle>
            <CardDescription>Membros e visitantes ao longo do ano</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-56 flex items-end justify-between gap-1.5 px-2">
              {monthlyGrowth.map((d, i) => {
                // unused
                // unused
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-px justify-center" style={{ height: '140px' }}>
                      <div className="flex flex-col justify-end w-3">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.visitors / maxMembers) * 140}px` }}
                          transition={{ delay: i * 0.03, duration: 0.5 }}
                          className="w-full bg-[#3182CE]/40 rounded-t-sm"
                        />
                      </div>
                      <div className="flex flex-col justify-end w-3">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(d.members / maxMembers) * 140}px` }}
                          transition={{ delay: i * 0.03, duration: 0.5 }}
                          className="w-full bg-[#1A365D] rounded-t-sm"
                        />
                      </div>
                    </div>
                    <span className="text-[9px] text-[#718096]">{d.month}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#718096]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#1A365D] rounded-sm" />
                <span>Membros</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#3182CE]/40 rounded-sm" />
                <span>Visitantes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pie Chart - Level Distribution */}
      <motion.div custom={5} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="w-5 h-5 text-[#1A365D]" />
              Distribuicao por Nivel Espiritual
            </CardTitle>
            <CardDescription>Membros por nivel de maturidade</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-center gap-6">
              {/* SVG Pie Chart */}
              <svg width="160" height="160" viewBox="0 0 160 160">
                {pieSlices.map((slice, i) => (
                  <path
                    key={i}
                    d={describeArc(80, 80, 70, slice.startAngle, slice.endAngle)}
                    fill={slice.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
                <circle cx="80" cy="80" r="30" fill="white" />
                <text x="80" y="76" textAnchor="middle" className="text-xs font-bold fill-[#1A202C]">{totalLevels}</text>
                <text x="80" y="90" textAnchor="middle" className="text-[8px] fill-[#718096]">membros</text>
              </svg>

              {/* Legend */}
              <div className="space-y-2">
                {levelDistribution.map((l, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                    <span className="text-xs text-[#4A5568]">{l.label}</span>
                    <span className="text-xs font-medium text-[#1A202C] ml-auto">{l.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function QuickActionsPanel() {
  const navigate = useNavigate()

  const handleAction = (href?: string) => {
    if (href) navigate(href)
    else toast.info('Esse recurso ainda esta em desenvolvimento.')
  }

  return (
    <motion.div custom={8} variants={fadeInUp} initial="hidden" animate="visible">
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-base">Acoes Rapidas</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((a) => (
              <Button
                key={a.label}
                variant="outline"
                className="h-auto py-4 gap-2 justify-start hover:bg-[#1A365D] hover:text-white hover:border-[#1A365D] transition-all"
                onClick={() => handleAction(a.href)}
              >
                <a.icon className="w-5 h-5" />
                <span className="text-sm">{a.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ============ MAIN PAGE ============

export default function Admin() {
  const { isAdmin } = useAuth()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0F2744] rounded-xl p-6 text-white"
      >
        <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
          <span>Dashboard</span>
          <span>/</span>
          <span>Painel Administrativo</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl font-bold">Painel Administrativo</h1>
          <Badge className="bg-[#D4A843] text-[#0F2744] hover:bg-[#D4A843]">
            {isAdmin ? 'Administrador' : 'Lider de Celula'}
          </Badge>
        </div>
        <p className="text-white/60 text-sm mt-1">
          Visao geral completa do ministerio — membros, celulas, cursos e comunicados
        </p>
      </motion.div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts */}
      <ChartsPanel />

      {/* Quick Actions */}
      <QuickActionsPanel />

      {/* Tabs for Tables */}
      <motion.div custom={6} variants={fadeInUp} initial="hidden" animate="visible">
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" /> Membros
            </TabsTrigger>
            <TabsTrigger value="cells" className="gap-2">
              <Church className="w-4 h-4" /> Celulas
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2">
              <GraduationCap className="w-4 h-4" /> Cursos
            </TabsTrigger>
            <TabsTrigger value="announcements" className="gap-2">
              <Mail className="w-4 h-4" /> Comunicados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-0">
            <MembersTable />
          </TabsContent>

          <TabsContent value="cells" className="mt-0">
            <CellsTable />
          </TabsContent>

          <TabsContent value="courses" className="mt-0">
            <CoursesTable />
          </TabsContent>

          <TabsContent value="announcements" className="mt-0">
            <AnnouncementsPanel />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Footer info */}
      <motion.div custom={9} variants={fadeInUp} initial="hidden" animate="visible">
        <div className="flex items-center gap-2 text-xs text-[#718096] justify-center py-4">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#38A169]" />
          <span>Sistema atualizado em {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </motion.div>
    </div>
  )
}
