import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Megaphone, Plus, Pencil, Trash2, Loader2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { toast } from 'sonner'
import {
  listAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement,
  type Announcement,
} from '@/services/adminContentDb'

const CATEGORIES = [
  { value: 'igreja', label: 'Igreja' },
  { value: 'pastoral', label: 'Pastoral' },
  { value: 'celula', label: 'Célula' },
  { value: 'cursos', label: 'Cursos' },
  { value: 'eventos', label: 'Eventos' },
]
const catLabel = (v: string) => CATEGORIES.find((c) => c.value === v)?.label || v

function AnnouncementDialog({ open, onOpenChange, item, onSaved }: {
  open: boolean; onOpenChange: (v: boolean) => void; item: Announcement | null; onSaved: () => void
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('igreja')
  const [urgent, setUrgent] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setTitle(item?.title || '')
      setContent(item?.content || '')
      setCategory(item?.category || 'igreja')
      setUrgent(item?.urgent || false)
    }
  }, [open, item])

  const save = async () => {
    if (!title.trim() || !content.trim()) { toast.error('Preencha título e mensagem'); return }
    setSaving(true)
    try {
      if (item) { await updateAnnouncement(item.id, { title, content, category, urgent }); toast.success('Comunicado atualizado') }
      else { await createAnnouncement({ title, content, category, urgent }); toast.success('Comunicado publicado') }
      onOpenChange(false); onSaved()
    } catch (e) { toast.error('Erro ao salvar'); console.error(e) } finally { setSaving(false) }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{item ? 'Editar comunicado' : 'Novo comunicado'}</DialogTitle>
          <DialogDescription>Publicado para todos os membros logados.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5"><Label>Título</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Mensagem</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2 pb-1">
              <Switch id="urg" checked={urgent} onCheckedChange={setUrgent} />
              <Label htmlFor="urg" className="cursor-pointer">Marcar como urgente</Label>
            </div>
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

export default function AdminComunicados() {
  const [items, setItems] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [dialog, setDialog] = useState(false)
  const [editing, setEditing] = useState<Announcement | null>(null)

  const reload = async () => {
    setLoading(true)
    try { setItems(await listAnnouncements()) }
    catch (e) { toast.error('Erro ao carregar'); console.error(e) }
    finally { setLoading(false) }
  }
  useEffect(() => { reload() }, [])

  const remove = async (a: Announcement) => {
    if (!confirm(`Excluir o comunicado "${a.title}"?`)) return
    try { await deleteAnnouncement(a.id); toast.success('Excluído'); reload() }
    catch (e) { toast.error('Erro ao excluir'); console.error(e) }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-[#718096]"><span>Painel Admin</span><span>/</span><span>Comunicados</span></div>
          <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#1A202C]"><Megaphone className="h-6 w-6 text-[#1A365D]" /> Comunicados</h1>
          <p className="text-sm text-[#718096]">Publique avisos que aparecem para todos os membros.</p>
        </div>
        <Button onClick={() => { setEditing(null); setDialog(true) }} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90"><Plus className="h-4 w-4" /> Novo Comunicado</Button>
      </motion.div>

      <Card className="border-0 shadow-md">
        <CardHeader><CardTitle className="text-base">Publicados ({items.length})</CardTitle><CardDescription>Os mais recentes aparecem primeiro.</CardDescription></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-[#718096]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando...</div>
          ) : items.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-[#718096]">Nenhum comunicado ainda. Clique em "Novo Comunicado".</div>
          ) : (
            <div className="space-y-2">
              {items.map((a) => (
                <div key={a.id} className="flex items-start gap-3 rounded-lg border border-gray-100 px-3 py-3 hover:bg-[#F7FAFC]">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{catLabel(a.category)}</Badge>
                      {a.urgent && <Badge className="gap-1 bg-[#E8532D] text-[10px] text-white hover:bg-[#E8532D]"><AlertTriangle className="h-3 w-3" /> Urgente</Badge>}
                      {a.date && <span className="text-[11px] text-[#718096]">{a.date}</span>}
                    </div>
                    <p className="text-sm font-medium text-[#1A202C]">{a.title}</p>
                    <p className="line-clamp-2 text-xs text-[#718096]">{a.content}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditing(a); setDialog(true) }}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => remove(a)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AnnouncementDialog open={dialog} onOpenChange={setDialog} item={editing} onSaved={reload} />
    </div>
  )
}
