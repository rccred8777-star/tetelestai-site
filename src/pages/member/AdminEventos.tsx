import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Plus, Pencil, Trash2, Loader2, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { toast } from 'sonner'
import {
  listEvents, createEvent, updateEvent, deleteEvent, type ChurchEvent,
} from '@/services/adminContentDb'

function fmt(datetime?: string) {
  if (!datetime) return ''
  const d = new Date(datetime + 'T00:00:00')
  return isNaN(d.getTime()) ? datetime : d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function EventDialog({ open, onOpenChange, item, onSaved }: {
  open: boolean; onOpenChange: (v: boolean) => void; item: ChurchEvent | null; onSaved: () => void
}) {
  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setTitle(item?.title || '')
      setDatetime(item?.datetime || '')
      setTime(item?.time || '')
      setLocation(item?.location || '')
      setDescription(item?.description || '')
      setStatus(item?.status || 'Inscrições Abertas')
    }
  }, [open, item])

  const save = async () => {
    if (!title.trim()) { toast.error('Dê um título ao evento'); return }
    setSaving(true)
    const data: Partial<ChurchEvent> = { title, datetime, time, location, description, status }
    try {
      if (item) { await updateEvent(item.id, data); toast.success('Evento atualizado') }
      else { await createEvent(data); toast.success('Evento criado') }
      onOpenChange(false); onSaved()
    } catch (e) { toast.error('Erro ao salvar'); console.error(e) } finally { setSaving(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{item ? 'Editar evento' : 'Novo evento'}</DialogTitle>
          <DialogDescription>Aparecerá na agenda da igreja.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5"><Label>Título</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Data</Label><Input type="date" value={datetime} onChange={(e) => setDatetime(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Horário</Label><Input value={time} onChange={(e) => setTime(e.target.value)} placeholder="Ex.: 19h30" /></div>
          </div>
          <div className="space-y-1.5"><Label>Local</Label><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex.: Templo Principal" /></div>
          <div className="space-y-1.5"><Label>Descrição</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} /></div>
          <div className="space-y-1.5"><Label>Status</Label><Input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Ex.: Inscrições Abertas" /></div>
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

export default function AdminEventos() {
  const [items, setItems] = useState<ChurchEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [dialog, setDialog] = useState(false)
  const [editing, setEditing] = useState<ChurchEvent | null>(null)

  const reload = async () => {
    setLoading(true)
    try { setItems(await listEvents()) }
    catch (e) { toast.error('Erro ao carregar'); console.error(e) }
    finally { setLoading(false) }
  }
  useEffect(() => { reload() }, [])

  const remove = async (ev: ChurchEvent) => {
    if (!confirm(`Excluir o evento "${ev.title}"?`)) return
    try { await deleteEvent(ev.id); toast.success('Excluído'); reload() }
    catch (e) { toast.error('Erro ao excluir'); console.error(e) }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-[#718096]"><span>Painel Admin</span><span>/</span><span>Eventos</span></div>
          <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#1A202C]"><Calendar className="h-6 w-6 text-[#1A365D]" /> Eventos</h1>
          <p className="text-sm text-[#718096]">Crie e edite os eventos da agenda da igreja.</p>
        </div>
        <Button onClick={() => { setEditing(null); setDialog(true) }} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90"><Plus className="h-4 w-4" /> Novo Evento</Button>
      </motion.div>

      <Card className="border-0 shadow-md">
        <CardHeader><CardTitle className="text-base">Agenda ({items.length})</CardTitle><CardDescription>Ordenados por data.</CardDescription></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-[#718096]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando...</div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-[#718096]">Nenhum evento ainda. Clique em "Novo Evento".</div>
          ) : (
            <div className="space-y-2">
              {items.map((ev) => (
                <div key={ev.id} className="flex items-start gap-3 rounded-lg border border-gray-100 px-3 py-3 hover:bg-[#F7FAFC]">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1A202C]">{ev.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-[#718096]">
                      {ev.datetime && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{fmt(ev.datetime)}</span>}
                      {ev.time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ev.time}</span>}
                      {ev.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>}
                      {ev.status && <Badge variant="outline" className="text-[10px]">{ev.status}</Badge>}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditing(ev); setDialog(true) }}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => remove(ev)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EventDialog open={dialog} onOpenChange={setDialog} item={editing} onSaved={reload} />
    </div>
  )
}
