import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Church, Users, Loader2, MapPin, Clock, Plus, Check, Trash2,
  UserPlus, Search, Wallet, Lock, AlertTriangle, TrendingUp, HandHeart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import {
  getCellILead, listCellMemberships, listMeetings, saveMeeting,
  addMember, approveMember, removeMember, setTimoteo, setSecretario,
  launchOffering, confirmOffering, computeStats, brl,
  type Cell, type Meeting, type Membership,
} from '@/services/cellsDb'
import { listStudents, type Student } from '@/services/studentsDb'

const nomeDe = (s?: Student) => s?.displayName || s?.email || '(sem nome)'

export default function AreaLider() {
  const { user, profile } = useAuth()
  const meuNome = profile?.displayName || user?.displayName || user?.email || 'Líder'

  const [cell, setCell] = useState<Cell | null>(null)
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)

  const [addOpen, setAddOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [offeringFor, setOfferingFor] = useState<Meeting | null>(null)

  const carregar = async () => {
    if (!user) return
    setLoading(true)
    try {
      const c = await getCellILead(user.uid)
      setCell(c)
      if (c) {
        const [ms, ss, mt] = await Promise.all([
          listCellMemberships(c.id), listStudents(), listMeetings(c.id),
        ])
        setMemberships(ms)
        setStudents(ss)
        setMeetings(mt)
      }
    } catch (e) { toast.error('Erro ao carregar a célula'); console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { carregar() }, [user])

  // ---- papéis dentro da célula ----
  const souLider = !!cell && cell.leaderId === user?.uid
  const souSecretario = !!cell && cell.secretarioId === user?.uid

  const aprovados = memberships.filter((m) => m.status === 'aprovado')
  const pendentes = memberships.filter((m) => m.status === 'pendente')
  const membroDe = (uid: string) => students.find((s) => s.id === uid)
  const stats = computeStats(meetings)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#718096]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando sua célula...
      </div>
    )
  }

  if (!cell) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <Church className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="font-medium text-[#1A202C]">Você ainda não lidera nenhuma célula.</p>
            <p className="mt-1 text-sm text-[#718096]">
              A liderança da igreja precisa vincular você a uma célula no Painel Admin.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const incluir = async (uid: string) => {
    setBusy(uid)
    try { await addMember(cell.id, uid); await carregar(); toast.success('Membro incluído') }
    catch (e) { toast.error('Erro ao incluir'); console.error(e) } finally { setBusy(null) }
  }
  const aprovar = async (uid: string) => {
    setBusy(uid)
    try { await approveMember(cell.id, uid); await carregar(); toast.success('Pedido aprovado') }
    catch (e) { toast.error('Erro ao aprovar'); console.error(e) } finally { setBusy(null) }
  }
  const remover = async (uid: string) => {
    const s = membroDe(uid)
    if (!confirm(`Remover ${nomeDe(s)} da célula?`)) return
    setBusy(uid)
    try { await removeMember(cell.id, uid); await carregar(); toast.info('Removido') }
    catch (e) { toast.error('Erro ao remover'); console.error(e) } finally { setBusy(null) }
  }
  const nomearTimoteo = async (uid: string) => {
    const s = membroDe(uid)
    try { await setTimoteo(cell.id, uid, nomeDe(s)); await carregar(); toast.success(`${nomeDe(s)} é o Timóteo da casa`) }
    catch (e) { toast.error('Erro'); console.error(e) }
  }
  const nomearSecretario = async (uid: string) => {
    const s = membroDe(uid)
    try { await setSecretario(cell.id, uid, nomeDe(s)); await carregar(); toast.success(`${nomeDe(s)} é o Secretário`) }
    catch (e) { toast.error('Erro'); console.error(e) }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-1 flex items-center gap-2 text-sm text-[#718096]"><span>Dashboard</span><span>/</span><span>Área do Líder</span></div>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#1A202C]">
          <Church className="h-6 w-6 text-[#1A365D]" /> {cell.name}
        </h1>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#718096]">
          {cell.day && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{cell.day} {cell.time}</span>}
          {cell.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{cell.location}</span>}
          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{aprovados.length} membros</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="outline" className="text-[10px]">Líder: {cell.leaderName}</Badge>
          {cell.timoteoName && <Badge variant="outline" className="text-[10px]">Timóteo: {cell.timoteoName}</Badge>}
          {cell.secretarioName && <Badge variant="outline" className="text-[10px]">Secretário: {cell.secretarioName}</Badge>}
        </div>
      </motion.div>

      <Tabs defaultValue="membros">
        <TabsList>
          <TabsTrigger value="membros" className="gap-1.5 text-xs sm:text-sm">
            <Users className="h-4 w-4" /> Membros
            {pendentes.length > 0 && <Badge className="ml-1 bg-[#E8532D] px-1.5 text-[10px] text-white">{pendentes.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="encontros" className="gap-1.5 text-xs sm:text-sm">
            <HandHeart className="h-4 w-4" /> Encontros
          </TabsTrigger>
          <TabsTrigger value="estatisticas" className="gap-1.5 text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4" /> Números
          </TabsTrigger>
        </TabsList>

        {/* ============================= MEMBROS ============================= */}
        <TabsContent value="membros" className="mt-4 space-y-4">
          {pendentes.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-[#92400E]">
                  {pendentes.length} pessoa(s) pediram para entrar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pendentes.map((m) => {
                  const s = membroDe(m.userId)
                  return (
                    <div key={m.id} className="flex items-center gap-2 rounded-lg bg-[#FFFBEB] px-3 py-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#1A202C]">{nomeDe(s)}</p>
                        <p className="truncate text-[11px] text-[#718096]">{s?.email}</p>
                      </div>
                      <Button size="sm" disabled={busy === m.userId} onClick={() => aprovar(m.userId)}
                        className="h-7 gap-1 bg-[#38A169] px-2 text-xs hover:bg-[#38A169]/90">
                        {busy === m.userId ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />} Aceitar
                      </Button>
                      <Button size="sm" variant="ghost" disabled={busy === m.userId}
                        onClick={() => remover(m.userId)} className="h-7 px-2 text-xs text-red-500">
                        Recusar
                      </Button>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}

          <Card className="border-0 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Membros da célula ({aprovados.length})</CardTitle>
                <CardDescription>Nomeie aqui o Timóteo da casa e o Secretário.</CardDescription>
              </div>
              {souLider && (
                <Button size="sm" onClick={() => setAddOpen(true)} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
                  <UserPlus className="h-4 w-4" /> Adicionar
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {aprovados.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-[#718096]">
                  Nenhum membro ainda. Clique em "Adicionar".
                </div>
              ) : (
                <div className="space-y-2">
                  {aprovados.map((m) => {
                    const s = membroDe(m.userId)
                    const ehTimoteo = cell.timoteoId === m.userId
                    const ehSecretario = cell.secretarioId === m.userId
                    return (
                      <div key={m.id} className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-100 px-3 py-2.5">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[#1A202C]">{nomeDe(s)}</p>
                          <p className="truncate text-[11px] text-[#718096]">{s?.email}</p>
                        </div>
                        {ehTimoteo && <Badge className="bg-[#7C2D12] text-[10px] text-white">Timóteo</Badge>}
                        {ehSecretario && <Badge className="bg-[#0E7490] text-[10px] text-white">Secretário</Badge>}
                        {souLider && (
                          <div className="flex gap-1">
                            {!ehTimoteo && (
                              <Button size="sm" variant="outline" className="h-7 px-2 text-[11px]"
                                onClick={() => nomearTimoteo(m.userId)}>Timóteo</Button>
                            )}
                            {!ehSecretario && (
                              <Button size="sm" variant="outline" className="h-7 px-2 text-[11px]"
                                onClick={() => nomearSecretario(m.userId)}>Secretário</Button>
                            )}
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500"
                              onClick={() => remover(m.userId)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ============================ ENCONTROS ============================ */}
        <TabsContent value="encontros" className="mt-4 space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Relatórios de encontro</CardTitle>
                <CardDescription>Presença, visitantes, decisões e oferta.</CardDescription>
              </div>
              <Button size="sm" onClick={() => setReportOpen(true)} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
                <Plus className="h-4 w-4" /> Novo encontro
              </Button>
            </CardHeader>
            <CardContent>
              {meetings.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-[#718096]">
                  Nenhum encontro registrado ainda.
                </div>
              ) : (
                <div className="space-y-2">
                  {meetings.map((m) => (
                    <div key={m.id} className="rounded-lg border border-gray-100 px-3 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-[#1A202C]">
                          {new Date(m.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                        </p>
                        <Badge variant="outline" className="text-[10px]">{m.attendance?.length || 0} presentes</Badge>
                        {(m.visitors ?? 0) > 0 && <Badge variant="outline" className="text-[10px]">{m.visitors} visitante(s)</Badge>}
                        {(m.decisions ?? 0) > 0 && <Badge className="bg-[#38A169] text-[10px] text-white">{m.decisions} decisão(ões)</Badge>}
                      </div>

                      {/* ---------- Oferta: fluxo de duas pessoas ---------- */}
                      <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-gray-50 pt-2">
                        <Wallet className="h-3.5 w-3.5 text-[#718096]" />

                        {m.offeringStatus === 'pendente' && (
                          <>
                            <span className="text-xs text-[#718096]">Oferta não lançada</span>
                            {souSecretario && (
                              <Button size="sm" variant="outline" className="h-7 px-2 text-[11px]"
                                onClick={() => setOfferingFor(m)}>
                                Lançar oferta
                              </Button>
                            )}
                          </>
                        )}

                        {m.offeringStatus === 'lancada' && (
                          <>
                            <span className="text-xs font-medium text-[#1A202C]">{brl(m.offeringAmount || 0)}</span>
                            <Badge className="bg-[#F59E0B] text-[10px] text-white">Aguardando confirmação</Badge>
                            <span className="text-[11px] text-[#718096]">lançada por {m.offeringByName}</span>
                            {souLider && (
                              <Button size="sm" className="h-7 gap-1 bg-[#38A169] px-2 text-[11px] hover:bg-[#38A169]/90"
                                onClick={async () => {
                                  try {
                                    await confirmOffering(cell.id, m.id, user!.uid, meuNome)
                                    await carregar()
                                    toast.success('Oferta confirmada e travada')
                                  } catch (e) { toast.error('Erro ao confirmar'); console.error(e) }
                                }}>
                                <Check className="h-3 w-3" /> Confirmar
                              </Button>
                            )}
                          </>
                        )}

                        {m.offeringStatus === 'confirmada' && (
                          <>
                            <span className="text-xs font-semibold text-[#1A202C]">{brl(m.offeringAmount || 0)}</span>
                            <Badge className="gap-1 bg-[#38A169] text-[10px] text-white">
                              <Lock className="h-2.5 w-2.5" /> Confirmada
                            </Badge>
                            <span className="text-[11px] text-[#718096]">
                              {m.offeringByName} lançou · {m.confirmedByName} confirmou
                            </span>
                            {(m.corrections?.length ?? 0) > 0 && (
                              <Badge variant="outline" className="gap-1 text-[10px] text-[#92400E]">
                                <AlertTriangle className="h-2.5 w-2.5" /> corrigida pelo admin
                              </Badge>
                            )}
                          </>
                        )}
                      </div>

                      {m.notes && <p className="mt-2 text-xs text-[#718096]">{m.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========================== ESTATÍSTICAS =========================== */}
        <TabsContent value="estatisticas" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Encontros', value: String(stats.encontros) },
              { label: 'Presença média', value: String(stats.presencaMedia) },
              { label: 'Visitantes', value: String(stats.totalVisitantes) },
              { label: 'Decisões por Cristo', value: String(stats.totalDecisoes) },
              { label: 'Ofertas confirmadas', value: brl(stats.totalOfertas) },
              { label: 'Ofertas a confirmar', value: String(stats.ofertasPendentes) },
            ].map((s) => (
              <Card key={s.label} className="border-0 shadow-sm">
                <CardContent className="py-5">
                  <p className="text-xs text-[#718096]">{s.label}</p>
                  <p className="mt-1 font-heading text-2xl font-bold text-[#1A365D]">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#718096]">
            O total de ofertas só soma o que já foi <b>confirmado pelas duas pessoas</b> (secretário e líder).
          </p>
        </TabsContent>
      </Tabs>

      <AddMemberDialog
        open={addOpen} onOpenChange={setAddOpen}
        students={students} jaNaCelula={memberships.map((m) => m.userId)}
        onAdd={incluir} busy={busy}
      />
      <ReportDialog
        open={reportOpen} onOpenChange={setReportOpen}
        cell={cell} aprovados={aprovados} membroDe={membroDe}
        onSaved={carregar} reportedBy={user?.uid || ''}
      />
      <OfferingDialog
        meeting={offeringFor} cellId={cell.id}
        onClose={() => setOfferingFor(null)} onSaved={carregar}
        byUid={user?.uid || ''} byName={meuNome}
      />
    </div>
  )
}

// ------------------------- Adicionar membro à célula -------------------------
function AddMemberDialog({ open, onOpenChange, students, jaNaCelula, onAdd, busy }: {
  open: boolean; onOpenChange: (v: boolean) => void; students: Student[]
  jaNaCelula: string[]; onAdd: (uid: string) => void; busy: string | null
}) {
  const [search, setSearch] = useState('')
  useEffect(() => { if (open) setSearch('') }, [open])

  const candidatos = students
    .filter((s) => !jaNaCelula.includes(s.id))
    .filter((s) => `${s.displayName || ''} ${s.email || ''}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar membro</DialogTitle>
          <DialogDescription>Busque entre os membros da igreja.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718096]" />
            <Input placeholder="Buscar por nome ou e-mail" value={search}
              onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="max-h-[300px] space-y-1 overflow-y-auto">
            {candidatos.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#718096]">Ninguém encontrado.</p>
            ) : candidatos.map((s) => (
              <div key={s.id} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#1A202C]">{nomeDe(s)}</p>
                  <p className="truncate text-[11px] text-[#718096]">{s.email}</p>
                </div>
                <Button size="sm" disabled={busy === s.id} onClick={() => onAdd(s.id)}
                  className="h-7 bg-[#1A365D] px-2 text-xs hover:bg-[#1A365D]/90">
                  {busy === s.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Incluir'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --------------------------- Relatório do encontro ---------------------------
function ReportDialog({ open, onOpenChange, cell, aprovados, membroDe, onSaved, reportedBy }: {
  open: boolean; onOpenChange: (v: boolean) => void; cell: Cell
  aprovados: Membership[]; membroDe: (uid: string) => Student | undefined
  onSaved: () => void; reportedBy: string
}) {
  const [date, setDate] = useState('')
  const [presentes, setPresentes] = useState<string[]>([])
  const [visitors, setVisitors] = useState('0')
  const [decisions, setDecisions] = useState('0')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!open) return
    setDate(new Date().toISOString().slice(0, 10))
    setPresentes([])
    setVisitors('0'); setDecisions('0'); setNotes('')
  }, [open])

  const toggle = (uid: string) =>
    setPresentes((p) => p.includes(uid) ? p.filter((x) => x !== uid) : [...p, uid])

  const save = async () => {
    if (!date) { toast.error('Informe a data'); return }
    setSaving(true)
    try {
      await saveMeeting(cell.id, {
        date,
        attendance: presentes,
        visitors: parseInt(visitors) || 0,
        decisions: parseInt(decisions) || 0,
        notes,
      }, reportedBy)
      toast.success('Encontro registrado. O secretário já pode lançar a oferta.')
      onOpenChange(false)
      onSaved()
    } catch (e) { toast.error('Erro ao salvar'); console.error(e) }
    finally { setSaving(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Relatório do encontro</DialogTitle>
          <DialogDescription>
            A oferta não é lançada aqui — quem lança é o Secretário, na lista de encontros.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label>Data</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Visitantes</Label>
              <Input type="number" min="0" value={visitors} onChange={(e) => setVisitors(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Decisões</Label>
              <Input type="number" min="0" value={decisions} onChange={(e) => setDecisions(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Presença ({presentes.length}/{aprovados.length})</Label>
              <button type="button" className="text-xs text-[#1A365D] hover:underline"
                onClick={() => setPresentes(aprovados.map((m) => m.userId))}>
                Marcar todos
              </button>
            </div>
            <div className="max-h-[200px] overflow-y-auto rounded-lg border border-gray-100">
              {aprovados.length === 0 ? (
                <p className="py-6 text-center text-xs text-[#718096]">Sem membros cadastrados.</p>
              ) : aprovados.map((m) => (
                <label key={m.id} className="flex cursor-pointer items-center gap-3 border-b border-gray-50 px-3 py-2 last:border-0 hover:bg-[#F7FAFC]">
                  <input type="checkbox" checked={presentes.includes(m.userId)}
                    onChange={() => toggle(m.userId)} className="h-4 w-4 rounded border-gray-300" />
                  <span className="text-sm text-[#1A202C]">{nomeDe(membroDe(m.userId))}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Observações</Label>
            <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="Como foi o encontro? Algum pedido de oração?" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={save} disabled={saving} className="bg-[#1A365D] hover:bg-[#1A365D]/90">
            {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Salvar encontro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ------------------------------ Lançar a oferta ------------------------------
function OfferingDialog({ meeting, cellId, onClose, onSaved, byUid, byName }: {
  meeting: Meeting | null; cellId: string; onClose: () => void
  onSaved: () => void; byUid: string; byName: string
}) {
  const [valor, setValor] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { if (meeting) setValor('') }, [meeting])

  const lancar = async () => {
    const v = parseFloat(valor.replace(',', '.'))
    if (isNaN(v) || v < 0) { toast.error('Informe um valor válido'); return }
    if (!meeting) return
    setSaving(true)
    try {
      await launchOffering(cellId, meeting.id, v, byUid, byName)
      toast.success('Oferta lançada. Agora o líder precisa confirmar.')
      onClose()
      onSaved()
    } catch (e) { toast.error('Erro ao lançar'); console.error(e) }
    finally { setSaving(false) }
  }

  return (
    <Dialog open={!!meeting} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lançar oferta</DialogTitle>
          <DialogDescription>
            Você conta e lança. Em seguida o líder confere e confirma.
            Depois de confirmada, o valor trava — só o pastor corrige, e a correção fica registrada.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            <Label>Valor contado (R$)</Label>
            <Input value={valor} onChange={(e) => setValor(e.target.value)}
              placeholder="Ex.: 150,00" inputMode="decimal" />
          </div>
          <div className="rounded-lg bg-[#FFFBEB] px-3 py-2 text-xs text-[#92400E]">
            Confira a contagem antes de lançar. Seu nome ficará registrado como responsável.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={lancar} disabled={saving} className="bg-[#1A365D] hover:bg-[#1A365D]/90">
            {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Lançar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
