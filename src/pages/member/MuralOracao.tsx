import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, HandHeart, Plus, Check, Trash2, RotateCcw, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import {
  listChurchPrayers, addChurchPrayer, togglePray,
  setChurchPrayerAnswered, deleteChurchPrayer, type ChurchPrayer,
} from '@/services/muralDb'

export default function MuralOracao() {
  const { user, profile, isLeader, isSupervisor, isAdmin } = useAuth()
  const meuNome = profile?.displayName || user?.displayName || user?.email || 'Membro'
  const podeModerar = isLeader || isSupervisor || isAdmin

  const [prayers, setPrayers] = useState<ChurchPrayer[]>([])
  const [loading, setLoading] = useState(true)
  const [texto, setTexto] = useState('')
  const [anonimo, setAnonimo] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)

  const carregar = async () => {
    try { setPrayers(await listChurchPrayers()) }
    catch (e) { console.error(e); toast.error('Erro ao carregar o mural') }
    finally { setLoading(false) }
  }
  useEffect(() => { carregar() }, [])

  const publicar = async () => {
    if (!texto.trim()) { toast.error('Escreva o pedido'); return }
    setEnviando(true)
    try {
      await addChurchPrayer(texto, user!.uid, meuNome, anonimo)
      setTexto(''); setAnonimo(false)
      await carregar()
      toast.success('Pedido publicado no mural 🙏')
    } catch (e) { toast.error('Erro ao publicar'); console.error(e) }
    finally { setEnviando(false) }
  }

  const orar = async (p: ChurchPrayer) => {
    const jaOro = p.prayedBy?.includes(user!.uid)
    setBusy(p.id)
    // atualização otimista
    setPrayers((prev) => prev.map((x) => x.id === p.id
      ? { ...x, prayedBy: jaOro ? x.prayedBy.filter((u) => u !== user!.uid) : [...(x.prayedBy || []), user!.uid] }
      : x))
    try { await togglePray(p.id, user!.uid, !jaOro) }
    catch (e) { toast.error('Erro'); console.error(e); await carregar() }
    finally { setBusy(null) }
  }

  const responder = async (p: ChurchPrayer) => {
    try { await setChurchPrayerAnswered(p.id, !p.answered); await carregar() }
    catch (e) { toast.error('Erro'); console.error(e) }
  }

  const remover = async (p: ChurchPrayer) => {
    if (!confirm('Remover este pedido do mural?')) return
    try { await deleteChurchPrayer(p.id); await carregar(); toast.info('Removido') }
    catch (e) { toast.error('Erro'); console.error(e) }
  }

  const abertos = prayers.filter((p) => !p.answered)
  const respondidos = prayers.filter((p) => p.answered)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-1 flex items-center gap-2">
          <HandHeart className="h-6 w-6 text-[#E8532D]" />
          <h1 className="font-heading text-2xl font-bold text-[#1A365D]">Mural de Oração</h1>
        </div>
        <p className="text-sm text-[#718096]">
          Um espaço da igreja para carregarmos as cargas uns dos outros. Publique seu pedido e ore pelos irmãos.
        </p>
      </motion.div>

      {/* Novo pedido */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Heart className="h-4 w-4 text-[#E8532D]" /> Compartilhar um pedido
          </CardTitle>
          <CardDescription>Toda a igreja poderá ver e orar com você.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={texto} onChange={(e) => setTexto(e.target.value)}
            placeholder="Escreva aqui seu pedido de oração..."
            className="min-h-[90px]"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox checked={anonimo} onCheckedChange={(v) => setAnonimo(!!v)} />
              <Label className="cursor-pointer text-sm text-[#4A5568]">Publicar como anônimo</Label>
            </label>
            <Button onClick={publicar} disabled={enviando} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
              {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Publicar
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-[#1A365D]" /></div>
      ) : prayers.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-12 text-center text-sm text-[#718096]">
            Ainda não há pedidos. Seja o primeiro a compartilhar.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {abertos.map((p) => (
            <PrayerCard key={p.id} p={p} uid={user!.uid} busy={busy === p.id}
              podeMexer={p.authorUid === user!.uid || podeModerar}
              onOrar={() => orar(p)} onResponder={() => responder(p)} onRemover={() => remover(p)} />
          ))}

          {respondidos.length > 0 && (
            <div className="pt-2">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38A169]">
                <Sparkles className="h-3.5 w-3.5" /> Respondidas
              </div>
              <div className="space-y-3">
                {respondidos.map((p) => (
                  <PrayerCard key={p.id} p={p} uid={user!.uid} busy={busy === p.id}
                    podeMexer={p.authorUid === user!.uid || podeModerar}
                    onOrar={() => orar(p)} onResponder={() => responder(p)} onRemover={() => remover(p)} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PrayerCard({ p, uid, busy, podeMexer, onOrar, onResponder, onRemover }: {
  p: ChurchPrayer; uid: string; busy: boolean; podeMexer: boolean
  onOrar: () => void; onResponder: () => void; onRemover: () => void
}) {
  const jaOro = p.prayedBy?.includes(uid)
  const total = p.prayedBy?.length || 0
  return (
    <Card className={`border-0 shadow-sm ${p.answered ? 'bg-[#F0FFF4]' : ''}`}>
      <CardContent className="py-4">
        <p className={`text-sm ${p.answered ? 'text-[#276749]' : 'text-[#1A202C]'}`}>{p.text}</p>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-[#718096]">
          <span>{p.authorName}</span>
          {p.answered && <Badge className="bg-[#38A169] text-[10px] text-white">Respondida 🙌</Badge>}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-50 pt-3">
          <Button size="sm" variant={jaOro ? 'default' : 'outline'} disabled={busy}
            onClick={onOrar}
            className={`h-8 gap-1.5 text-xs ${jaOro ? 'bg-[#E8532D] hover:bg-[#E8532D]/90' : 'text-[#E8532D]'}`}>
            <HandHeart className="h-3.5 w-3.5" /> {jaOro ? 'Orando' : 'Vou orar'}
          </Button>
          {total > 0 && (
            <span className="text-xs text-[#718096]">
              {total} {total === 1 ? 'pessoa está orando' : 'pessoas estão orando'}
            </span>
          )}
          {podeMexer && (
            <div className="ml-auto flex gap-1">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title={p.answered ? 'Reabrir' : 'Marcar respondida'}
                onClick={onResponder}>
                {p.answered ? <RotateCcw className="h-4 w-4 text-[#718096]" /> : <Check className="h-4 w-4 text-[#38A169]" />}
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400" onClick={onRemover}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
