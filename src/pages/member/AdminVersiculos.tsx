import { useEffect, useState } from 'react'
import { BookMarked, Plus, Pencil, Trash2, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import {
  listMemoryVerses, addMemoryVerse, updateMemoryVerse, deleteMemoryVerse,
  seedMemoryVerses, THEMES, type MemoryVerse,
} from '@/services/versiculosDb'

const empty = { theme: THEMES[0] as string, reference: '', text: '', order: 0 }

export default function AdminVersiculos() {
  const [verses, setVerses] = useState<MemoryVerse[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<{ theme: string; reference: string; text: string; order: number }>(empty)
  const [saving, setSaving] = useState(false)

  const carregar = async () => {
    try { setVerses(await listMemoryVerses()) }
    catch (e) { console.error(e); toast.error('Erro ao carregar') }
    finally { setLoading(false) }
  }
  useEffect(() => { carregar() }, [])

  const novo = () => {
    const maxOrder = verses.length ? Math.max(...verses.map((v) => v.order || 0)) : 0
    setEditId(null); setForm({ ...empty, order: maxOrder + 1 }); setOpen(true)
  }
  const editar = (v: MemoryVerse) => {
    setEditId(v.id); setForm({ theme: v.theme, reference: v.reference, text: v.text, order: v.order }); setOpen(true)
  }

  const salvar = async () => {
    if (!form.reference.trim() || !form.text.trim()) { toast.error('Preencha referência e texto'); return }
    setSaving(true)
    try {
      if (editId) { await updateMemoryVerse(editId, form); toast.success('Atualizado') }
      else { await addMemoryVerse(form); toast.success('Adicionado') }
      setOpen(false); await carregar()
    } catch (e) { toast.error('Erro ao salvar'); console.error(e) }
    finally { setSaving(false) }
  }

  const remover = async (v: MemoryVerse) => {
    if (!confirm(`Remover ${v.reference}?`)) return
    try { await deleteMemoryVerse(v.id); await carregar(); toast.info('Removido') }
    catch (e) { toast.error('Erro'); console.error(e) }
  }

  const popular = async () => {
    try {
      const n = await seedMemoryVerses()
      if (n > 0) { toast.success(`${n} versículos principais adicionados`); await carregar() }
      else toast.info('Já existem versículos cadastrados')
    } catch (e) { toast.error('Erro ao popular'); console.error(e) }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookMarked className="h-6 w-6 text-[#D4A843]" />
          <h1 className="font-heading text-2xl font-bold text-[#1A365D]">Gerenciar Versículos</h1>
        </div>
        <div className="flex gap-2">
          {verses.length === 0 && (
            <Button variant="outline" onClick={popular} className="gap-1">
              <Download className="h-4 w-4" /> Popular principais
            </Button>
          )}
          <Button onClick={novo} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
            <Plus className="h-4 w-4" /> Novo versículo
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-[#1A365D]" /></div>
      ) : (
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{verses.length} versículo(s)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {verses.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#718096]">Nenhum versículo. Clique em "Popular principais".</p>
            ) : verses.map((v) => (
              <div key={v.id} className="flex items-start gap-2 rounded-lg border border-gray-100 px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">{v.theme}</Badge>
                    <span className="text-sm font-semibold text-[#1A365D]">{v.reference}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-[#718096]">{v.text}</p>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => editar(v)}>
                  <Pencil className="h-4 w-4 text-[#4A5568]" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400" onClick={() => remover(v)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? 'Editar versículo' : 'Novo versículo'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label>Tema</Label>
              <select
                value={form.theme}
                onChange={(e) => setForm({ ...form, theme: e.target.value })}
                className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm"
              >
                {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Referência</Label>
              <Input value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })}
                placeholder="Ex.: João 3.16" />
            </div>
            <div className="space-y-1.5">
              <Label>Texto do versículo</Label>
              <Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="min-h-[100px]" placeholder="Texto (Almeida)" />
            </div>
            <div className="space-y-1.5">
              <Label>Ordem</Label>
              <Input type="number" value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-24" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={salvar} disabled={saving} className="bg-[#1A365D] hover:bg-[#1A365D]/90">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
