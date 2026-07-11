import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Church, Plus, Pencil, Trash2, Loader2, MapPin, Clock, Users,
  ArrowRightLeft, History, UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import {
  listCells, createCell, updateCell, deleteCell, transferLeadership,
  listCellMemberships, type Cell,
} from '@/services/cellsDb'
import { listStudents, type Student } from '@/services/studentsDb'

const DIAS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const PERFIS = ['Família', 'Jovens', 'Casais', 'Mulheres', 'Homens', 'Adolescentes', 'Misto']

const nomeDe = (s?: Student) => s?.displayName || s?.email || '(sem nome)'

// --------------------------- Criar / editar célula ---------------------------
function CellDialog({ open, onOpenChange, cell, students, onSaved }: {
  open: boolean; onOpenChange: (v: boolean) => void; cell: Cell | null
  students: Student[]; onSaved: () => void
}) {
  const [name, setName] = useState('')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [region, setRegion] = useState('')
  const [profile, setProfile] = useState('')
  const [leaderId, setLeaderId] = useState('')
  const [supervisorId, setSupervisorId] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    setName(cell?.name || '')
    setDay(cell?.day || '')
    setTime(cell?.time || '')
    setLocation(cell?.location || '')
    setRegion(cell?.region || '')
    setProfile(cell?.profile || '')
    setLeaderId(cell?.leaderId || '')
    setSupervisorId(cell?.supervisorId || '')
  }, [open, cell])

  // Só quem é líder (ou mais) pode liderar célula.
  const possiveisLideres = students.filter((s) => s.role !== 'member')
  const possiveisSupervisores = students.filter((s) => s.role === 'supervisor' || s.role === 'admin')

  const save = async () => {
    if (!name.trim()) { toast.error('Dê um nome à célula'); return }
    setSaving(true)
    try {
      const lider = students.find((s) => s.id === leaderId)
      const sup = students.find((s) => s.id === supervisorId)
      const data: Partial<Cell> = {
        name: name.trim(), day, time, location, region, profile,
        leaderId: leaderId || '',
        leaderName: lider ? nomeDe(lider) : '',
        supervisorId: supervisorId || '',
        supervisorName: sup ? nomeDe(sup) : '',
      }

      if (cell) {
        // Trocar de líder tem fluxo próprio — aqui não mexemos nisso.
        delete data.leaderId
        delete data.leaderName
        await updateCell(cell.id, data)
        toast.success('Célula atualizada')
      } else {
        await createCell(data)
        toast.success('Célula criada')
      }
      onOpenChange(false)
      onSaved()
    } catch (e) { toast.error('Erro ao salvar'); console.error(e) }
    finally { setSaving(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{cell ? 'Editar célula' : 'Nova célula'}</DialogTitle>
          <DialogDescription>
            {cell
              ? 'Para trocar o líder, use o botão "Trocar líder" — assim o histórico é preservado.'
              : 'O líder escolhido aqui inicia o histórico de liderança da célula.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Nome da célula</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Célula Vida Nova" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Dia</Label>
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger><SelectValue placeholder="Escolha" /></SelectTrigger>
                <SelectContent>{DIAS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Horário</Label>
              <Input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Ex.: 20h" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Endereço</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Rua, número — bairro" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Região / bairro</Label>
              <Input value={region} onChange={(e) => setRegion(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Perfil</Label>
              <Select value={profile} onValueChange={setProfile}>
                <SelectTrigger><SelectValue placeholder="Escolha" /></SelectTrigger>
                <SelectContent>{PERFIS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          {!cell && (
            <div className="space-y-1.5">
              <Label>Líder</Label>
              <Select value={leaderId} onValueChange={setLeaderId}>
                <SelectTrigger><SelectValue placeholder="Escolha o líder" /></SelectTrigger>
                <SelectContent>
                  {possiveisLideres.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-[#718096]">
                      Ninguém tem papel de Líder ainda. Defina em "Gerenciar Alunos".
                    </div>
                  ) : possiveisLideres.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{nomeDe(s)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1.5">
            <Label>Supervisor de rede <span className="text-[#718096]">(opcional)</span></Label>
            <Select value={supervisorId} onValueChange={setSupervisorId}>
              <SelectTrigger><SelectValue placeholder="Sem supervisor" /></SelectTrigger>
              <SelectContent>
                {possiveisSupervisores.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-[#718096]">
                    Ninguém tem papel de Supervisor ainda.
                  </div>
                ) : possiveisSupervisores.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{nomeDe(s)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={save} disabled={saving} className="bg-[#1A365D] hover:bg-[#1A365D]/90">
            {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ----------------------------- Trocar de líder -------------------------------
function TransferDialog({ open, onOpenChange, cell, students, onSaved }: {
  open: boolean; onOpenChange: (v: boolean) => void; cell: Cell | null
  students: Student[]; onSaved: () => void
}) {
  const [newLeaderId, setNewLeaderId] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (open) setNewLeaderId('') }, [open])

  const candidatos = students.filter((s) => s.role !== 'member' && s.id !== cell?.leaderId)

  const transfer = async () => {
    if (!cell || !newLeaderId) { toast.error('Escolha o novo líder'); return }
    const novo = students.find((s) => s.id === newLeaderId)
    if (!novo) return
    setSaving(true)
    try {
      await transferLeadership(cell.id, novo.id, nomeDe(novo))
      toast.success(`${nomeDe(novo)} agora lidera a ${cell.name}`)
      onOpenChange(false)
      onSaved()
    } catch (e) { toast.error('Erro ao trocar o líder'); console.error(e) }
    finally { setSaving(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Trocar líder — {cell?.name}</DialogTitle>
          <DialogDescription>
            O líder atual sai, o novo entra. Nada é apagado: o período de quem
            liderou antes fica registrado no histórico da célula.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-lg bg-[#F7FAFC] px-3 py-2 text-sm">
            <span className="text-[#718096]">Líder atual: </span>
            <span className="font-medium text-[#1A202C]">{cell?.leaderName || '(nenhum)'}</span>
          </div>

          <div className="space-y-1.5">
            <Label>Novo líder</Label>
            <Select value={newLeaderId} onValueChange={setNewLeaderId}>
              <SelectTrigger><SelectValue placeholder="Escolha" /></SelectTrigger>
              <SelectContent>
                {candidatos.map((s) => <SelectItem key={s.id} value={s.id}>{nomeDe(s)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {(cell?.leaderHistory?.length ?? 0) > 0 && (
            <div className="rounded-lg border border-gray-100 p-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-[#4A5568]">
                <History className="h-3.5 w-3.5" /> Histórico de liderança
              </p>
              <div className="space-y-1">
                {cell!.leaderHistory!.map((h, i) => (
                  <div key={i} className="flex justify-between text-[11px] text-[#718096]">
                    <span>{h.leaderName}</span>
                    <span>{h.from} → {h.to || 'atual'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={transfer} disabled={saving || !newLeaderId} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
            {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            <ArrowRightLeft className="h-4 w-4" /> Confirmar troca
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --------------------------------- Página ------------------------------------
export default function AdminCelulas() {
  const [cells, setCells] = useState<Cell[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  const [dialog, setDialog] = useState(false)
  const [transferOpen, setTransferOpen] = useState(false)
  const [editing, setEditing] = useState<Cell | null>(null)

  const reload = async () => {
    setLoading(true)
    try {
      const [cs, ss] = await Promise.all([listCells(), listStudents()])
      setCells(cs)
      setStudents(ss)

      // quantos membros aprovados em cada célula
      const map: Record<string, number> = {}
      await Promise.all(cs.map(async (c) => {
        const ms = await listCellMemberships(c.id)
        map[c.id] = ms.filter((m) => m.status === 'aprovado').length
      }))
      setCounts(map)
    } catch (e) { toast.error('Erro ao carregar'); console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { reload() }, [])

  const remove = async (c: Cell) => {
    if (!confirm(`Excluir a célula "${c.name}"? Os relatórios de encontro dela também somem.`)) return
    try { await deleteCell(c.id); toast.success('Célula excluída'); reload() }
    catch (e) { toast.error('Erro ao excluir'); console.error(e) }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-[#718096]"><span>Painel Admin</span><span>/</span><span>Células</span></div>
          <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#1A202C]">
            <Church className="h-6 w-6 text-[#1A365D]" /> Células
          </h1>
          <p className="text-sm text-[#718096]">Crie células, nomeie líderes e supervisores, e faça a troca de liderança.</p>
        </div>
        <Button onClick={() => { setEditing(null); setDialog(true) }} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
          <Plus className="h-4 w-4" /> Nova Célula
        </Button>
      </motion.div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-base">Células cadastradas ({cells.length})</CardTitle>
          <CardDescription>O líder só enxerga e administra a própria célula.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-[#718096]">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando...
            </div>
          ) : cells.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-200 py-12 text-center">
              <Church className="mx-auto mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm text-[#4A5568]">Nenhuma célula cadastrada ainda.</p>
              <p className="mt-1 text-xs text-[#718096]">
                Antes de criar, defina alguém como "Líder" em Gerenciar Alunos.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {cells.map((c) => (
                <div key={c.id} className="rounded-lg border border-gray-100 p-4 hover:bg-[#F7FAFC]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#1A202C]">{c.name}</p>
                      <p className="mt-0.5 truncate text-xs text-[#718096]">
                        Líder: {c.leaderName || <span className="text-red-500">sem líder</span>}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Trocar líder"
                        onClick={() => { setEditing(c); setTransferOpen(true) }}>
                        <ArrowRightLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Editar"
                        onClick={() => { setEditing(c); setDialog(true) }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" title="Excluir"
                        onClick={() => remove(c)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#718096]">
                    {c.day && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.day} {c.time}</span>}
                    {c.region && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.region}</span>}
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{counts[c.id] ?? 0} membros</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.profile && <Badge variant="outline" className="text-[10px]">{c.profile}</Badge>}
                    {c.supervisorName && (
                      <Badge variant="outline" className="gap-1 text-[10px]">
                        <UserCheck className="h-3 w-3" /> Sup.: {c.supervisorName}
                      </Badge>
                    )}
                    {c.timoteoName && <Badge variant="outline" className="text-[10px]">Timóteo: {c.timoteoName}</Badge>}
                    {c.secretarioName && <Badge variant="outline" className="text-[10px]">Sec.: {c.secretarioName}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CellDialog open={dialog} onOpenChange={setDialog} cell={editing} students={students} onSaved={reload} />
      <TransferDialog open={transferOpen} onOpenChange={setTransferOpen} cell={editing} students={students} onSaved={reload} />
    </div>
  )
}
