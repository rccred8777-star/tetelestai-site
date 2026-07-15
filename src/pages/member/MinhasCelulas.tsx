import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, MapPin, Clock, Loader2, UserPlus, CheckCircle, Church, Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import {
  listCells, listMyMemberships, requestToJoin, cancelRequestToJoin,
  type Cell, type MembershipStatus,
} from '@/services/cellsDb'

export default function MinhasCelulas() {
  const { user } = useAuth()
  const [cells, setCells] = useState<Cell[]>([])
  const [status, setStatus] = useState<Record<string, MembershipStatus>>({})
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const carregar = async () => {
    if (!user) return
    setLoading(true)
    try {
      const [todas, minhas] = await Promise.all([listCells(), listMyMemberships(user.uid)])
      setCells(todas)
      const map: Record<string, MembershipStatus> = {}
      minhas.forEach((m) => { map[m.cellId] = m.status })
      setStatus(map)
    } catch (e) { toast.error('Erro ao carregar as células'); console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { carregar() }, [user])

  const minhas = cells.filter((c) => status[c.id])
  const disponiveis = cells.filter((c) => !status[c.id]).filter((c) => {
    const t = `${c.name} ${c.region || ''} ${c.profile || ''}`.toLowerCase()
    return t.includes(search.toLowerCase())
  })

  const pedir = async (c: Cell) => {
    if (!user) return
    setBusy(c.id)
    try { await requestToJoin(c.id, user.uid); await carregar(); toast.success('Pedido enviado ao líder da célula.') }
    catch (e) { toast.error('Não foi possível enviar o pedido.'); console.error(e) }
    finally { setBusy(null) }
  }
  const cancelar = async (c: Cell) => {
    if (!user) return
    setBusy(c.id)
    try { await cancelRequestToJoin(c.id, user.uid); await carregar(); toast.info('Pedido cancelado.') }
    catch (e) { toast.error('Não foi possível cancelar.'); console.error(e) }
    finally { setBusy(null) }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#718096]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Minhas Células</h1>
        <p className="text-sm text-[#718096]">A célula em que você participa e as células disponíveis para entrar.</p>
      </motion.div>

      {/* Minhas células */}
      <section className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-[#1A202C]">Minha participação</h2>
        {minhas.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-10 text-center">
              <Church className="mx-auto mb-3 h-9 w-9 text-gray-300" />
              <p className="text-sm text-[#4A5568]">Você ainda não participa de nenhuma célula.</p>
              <p className="mt-1 text-xs text-[#718096]">Escolha uma abaixo e peça para entrar.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {minhas.map((c) => {
              const pend = status[c.id] === 'pendente'
              return (
                <Card key={c.id} className="border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base">
                      {c.name}
                      {pend
                        ? <Badge className="bg-[#F59E0B] text-[10px] text-white">aguardando</Badge>
                        : <Badge className="gap-1 bg-[#38A169] text-[10px] text-white"><CheckCircle className="h-3 w-3" /> membro</Badge>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5 text-sm text-[#4A5568]">
                    {c.leaderName && <p><span className="text-[#718096]">Líder:</span> {c.leaderName}</p>}
                    {c.day && <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#718096]" />{c.day} {c.time}</p>}
                    {c.location && <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#718096]" />{c.location}</p>}
                    {pend && (
                      <Button variant="ghost" size="sm" disabled={busy === c.id} onClick={() => cancelar(c)} className="mt-2 h-8 w-full text-xs text-[#718096]">
                        {busy === c.id && <Loader2 className="mr-1 h-3 w-3 animate-spin" />} Cancelar pedido
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* Células disponíveis */}
      <section className="space-y-3 pt-2">
        <div>
          <h2 className="font-heading text-lg font-bold text-[#1A202C]">Células disponíveis</h2>
          <p className="text-xs text-[#718096]">Peça para entrar. O líder da célula aprova.</p>
        </div>

        {cells.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#718096]" />
            <Input placeholder="Buscar por nome, bairro ou perfil" value={search}
              onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        )}

        {disponiveis.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-10 text-center text-sm text-[#718096]">
              {cells.length === 0 ? 'Nenhuma célula cadastrada ainda.' : 'Nenhuma outra célula disponível.'}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {disponiveis.map((c) => (
              <Card key={c.id} className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <CardDescription className="flex flex-wrap gap-1.5">
                    {c.profile && <Badge variant="outline" className="text-[10px]">{c.profile}</Badge>}
                    {c.region && <Badge variant="outline" className="text-[10px]">{c.region}</Badge>}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1.5 text-sm text-[#4A5568]">
                  {c.leaderName && <p><span className="text-[#718096]">Líder:</span> {c.leaderName}</p>}
                  {c.day && <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-[#718096]" />{c.day} {c.time}</p>}
                  {c.location && <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#718096]" />{c.location}</p>}
                  <Button size="sm" disabled={busy === c.id} onClick={() => pedir(c)} className="mt-2 w-full gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
                    {busy === c.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                    Quero participar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
