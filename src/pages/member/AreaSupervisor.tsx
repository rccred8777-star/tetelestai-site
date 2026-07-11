import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Network, Loader2, Users, TrendingUp, Wallet, AlertTriangle, Lock,
  Clock, MapPin, ChevronLeft, HandHeart, UserX,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import {
  listCells, listCellsISupervise, listMeetings, listCellMemberships,
  computeStats, brl, type Cell, type Meeting,
} from '@/services/cellsDb'

interface CellData {
  cell: Cell
  meetings: Meeting[]
  membros: number
}

export default function AreaSupervisor() {
  const { user, isAdmin } = useAuth()
  const [dados, setDados] = useState<CellData[]>([])
  const [loading, setLoading] = useState(true)
  const [aberta, setAberta] = useState<CellData | null>(null)

  useEffect(() => {
    (async () => {
      if (!user) return
      setLoading(true)
      try {
        // O admin enxerga a igreja inteira. O supervisor, só a rede dele.
        const cells = isAdmin ? await listCells() : await listCellsISupervise(user.uid)

        const completo = await Promise.all(cells.map(async (cell) => {
          const [meetings, ms] = await Promise.all([
            listMeetings(cell.id),
            listCellMemberships(cell.id),
          ])
          return {
            cell,
            meetings,
            membros: ms.filter((m) => m.status === 'aprovado').length,
          }
        }))
        setDados(completo)
      } catch (e) {
        toast.error('Erro ao carregar a rede')
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [user, isAdmin])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#718096]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando a rede...
      </div>
    )
  }

  if (dados.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="border-0 shadow-sm">
          <CardContent className="py-16 text-center">
            <Network className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="font-medium text-[#1A202C]">Nenhuma célula na sua rede.</p>
            <p className="mt-1 text-sm text-[#718096]">
              O pastor precisa indicar você como supervisor das células, em Gerenciar Células.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ------------------------- Detalhe de uma célula -------------------------
  if (aberta) {
    const s = computeStats(aberta.meetings)
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setAberta(null)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-heading text-xl font-bold text-[#1A202C]">{aberta.cell.name}</h1>
            <p className="text-xs text-[#718096]">
              Líder: {aberta.cell.leaderName || '—'}
              {aberta.cell.secretarioName && ` · Secretário: ${aberta.cell.secretarioName}`}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { l: 'Encontros', v: String(s.encontros) },
            { l: 'Presença média', v: String(s.presencaMedia) },
            { l: 'Membros', v: String(aberta.membros) },
            { l: 'Visitantes', v: String(s.totalVisitantes) },
            { l: 'Decisões', v: String(s.totalDecisoes) },
            { l: 'Ofertas confirmadas', v: brl(s.totalOfertas) },
          ].map((x) => (
            <Card key={x.l} className="border-0 shadow-sm">
              <CardContent className="py-4">
                <p className="text-xs text-[#718096]">{x.l}</p>
                <p className="mt-1 font-heading text-xl font-bold text-[#1A365D]">{x.v}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Relatórios de encontro</CardTitle>
            <CardDescription>Você acompanha, mas não altera. Quem lança é a célula.</CardDescription>
          </CardHeader>
          <CardContent>
            {aberta.meetings.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-[#718096]">
                Esta célula ainda não registrou nenhum encontro.
              </div>
            ) : (
              <div className="space-y-2">
                {aberta.meetings.map((m) => (
                  <div key={m.id} className="rounded-lg border border-gray-100 px-3 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-[#1A202C]">
                        {new Date(m.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </p>
                      <Badge variant="outline" className="text-[10px]">{m.attendance?.length || 0} presentes</Badge>
                      {(m.visitors ?? 0) > 0 && <Badge variant="outline" className="text-[10px]">{m.visitors} visitante(s)</Badge>}
                      {(m.decisions ?? 0) > 0 && <Badge className="bg-[#38A169] text-[10px] text-white">{m.decisions} decisão(ões)</Badge>}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-gray-50 pt-2">
                      <Wallet className="h-3.5 w-3.5 text-[#718096]" />
                      {m.offeringStatus === 'confirmada' ? (
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
                              <AlertTriangle className="h-2.5 w-2.5" /> corrigida
                            </Badge>
                          )}
                        </>
                      ) : m.offeringStatus === 'lancada' ? (
                        <>
                          <span className="text-xs font-medium text-[#1A202C]">{brl(m.offeringAmount || 0)}</span>
                          <Badge className="bg-[#F59E0B] text-[10px] text-white">Aguardando o líder confirmar</Badge>
                        </>
                      ) : (
                        <span className="text-xs text-[#718096]">Oferta não lançada</span>
                      )}
                    </div>

                    {m.notes && <p className="mt-2 text-xs text-[#718096]">{m.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // ---------------------------- Visão da rede -----------------------------
  const rede = dados.reduce(
    (acc, d) => {
      const s = computeStats(d.meetings)
      acc.celulas += 1
      acc.membros += d.membros
      acc.encontros += s.encontros
      acc.visitantes += s.totalVisitantes
      acc.decisoes += s.totalDecisoes
      acc.ofertas += s.totalOfertas
      acc.pendentes += s.ofertasPendentes
      if (!d.cell.leaderId) acc.semLider += 1
      return acc
    },
    { celulas: 0, membros: 0, encontros: 0, visitantes: 0, decisoes: 0, ofertas: 0, pendentes: 0, semLider: 0 }
  )

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-1 flex items-center gap-2 text-sm text-[#718096]"><span>Dashboard</span><span>/</span><span>Supervisão</span></div>
        <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#1A202C]">
          <Network className="h-6 w-6 text-[#0E7490]" /> {isAdmin ? 'Todas as células' : 'Minha rede'}
        </h1>
        <p className="text-sm text-[#718096]">
          Acompanhe as células, os relatórios e as ofertas. Você observa — quem lança é a célula.
        </p>
      </motion.div>

      {/* Alertas que exigem ação */}
      {(rede.pendentes > 0 || rede.semLider > 0) && (
        <div className="space-y-2">
          {rede.pendentes > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5 text-sm text-[#92400E]">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                <b>{rede.pendentes} oferta(s) lançada(s) e ainda não confirmada(s)</b> pelo líder.
                Enquanto não confirmar, o valor não entra no total da rede.
              </span>
            </div>
          )}
          {rede.semLider > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              <UserX className="h-4 w-4 shrink-0" />
              <span><b>{rede.semLider} célula(s) sem líder.</b> Fale com o pastor para designar alguém.</span>
            </div>
          )}
        </div>
      )}

      {/* Números da rede */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { l: 'Células', v: String(rede.celulas), i: Network },
          { l: 'Membros', v: String(rede.membros), i: Users },
          { l: 'Encontros', v: String(rede.encontros), i: HandHeart },
          { l: 'Visitantes', v: String(rede.visitantes), i: Users },
          { l: 'Decisões', v: String(rede.decisoes), i: TrendingUp },
          { l: 'Ofertas', v: brl(rede.ofertas), i: Wallet },
        ].map((x) => (
          <Card key={x.l} className="border-0 shadow-sm">
            <CardContent className="py-4">
              <div className="flex items-center gap-1.5 text-[#718096]">
                <x.i className="h-3.5 w-3.5" />
                <p className="text-[11px]">{x.l}</p>
              </div>
              <p className="mt-1 font-heading text-lg font-bold text-[#1A365D]">{x.v}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="-mt-3 text-xs text-[#718096]">
        O total de ofertas soma <b>apenas o que já foi confirmado</b> pelo secretário e pelo líder.
      </p>

      {/* Células da rede */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-base">Células ({dados.length})</CardTitle>
          <CardDescription>Clique em uma célula para ver os relatórios dela.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {dados.map((d) => {
              const s = computeStats(d.meetings)
              const ultimo = d.meetings[0]
              return (
                <button
                  key={d.cell.id}
                  onClick={() => setAberta(d)}
                  className="rounded-lg border border-gray-100 p-4 text-left transition-colors hover:bg-[#F7FAFC]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#1A202C]">{d.cell.name}</p>
                      <p className="mt-0.5 truncate text-xs text-[#718096]">
                        Líder: {d.cell.leaderName || <span className="text-red-500">sem líder</span>}
                      </p>
                    </div>
                    {s.ofertasPendentes > 0 && (
                      <Badge className="shrink-0 bg-[#F59E0B] text-[10px] text-white">
                        {s.ofertasPendentes} a confirmar
                      </Badge>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-[#718096]">
                    {d.cell.day && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{d.cell.day}</span>}
                    {d.cell.region && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{d.cell.region}</span>}
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{d.membros} membros</span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-[10px]">{s.encontros} encontro(s)</Badge>
                    <Badge variant="outline" className="text-[10px]">média {s.presencaMedia}</Badge>
                    <Badge variant="outline" className="text-[10px]">{brl(s.totalOfertas)}</Badge>
                  </div>

                  <p className="mt-2 text-[11px] text-[#718096]">
                    {ultimo
                      ? `Último encontro: ${new Date(ultimo.date + 'T00:00:00').toLocaleDateString('pt-BR')}`
                      : 'Nenhum encontro registrado ainda'}
                  </p>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
