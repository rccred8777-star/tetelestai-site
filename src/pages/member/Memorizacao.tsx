import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookMarked, Eye, RotateCcw, Loader2, Sparkles, Settings } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { listMemoryVerses, seedMemoryVerses, THEMES, type MemoryVerse } from '@/services/versiculosDb'

// cor por tema (fundo suave + destaque)
const THEME_COLOR: Record<string, string> = {
  'Graça': '#B45309',
  'Salvação': '#1A365D',
  'O Sangue de Jesus': '#9B2C2C',
  'A Cruz': '#4C1D95',
  'Vida Eterna': '#166534',
  'Guerra Espiritual': '#0E7490',
}

export default function Memorizacao() {
  const { user, isAdmin } = useAuth()
  const [verses, setVerses] = useState<MemoryVerse[]>([])
  const [loading, setLoading] = useState(true)
  // estado de revelação por card: 0 = escondido, 1 = referência, 2 = referência + texto
  const [reveal, setReveal] = useState<Record<string, number>>({})

  const carregar = async () => {
    try {
      let vs = await listMemoryVerses()
      // se estiver vazio e for admin, já popula os principais
      if (vs.length === 0 && isAdmin) {
        const n = await seedMemoryVerses()
        if (n > 0) { toast.success(`${n} versículos adicionados`); vs = await listMemoryVerses() }
      }
      setVerses(vs)
    } catch (e) { console.error(e); toast.error('Erro ao carregar os versículos') }
    finally { setLoading(false) }
  }
  useEffect(() => { carregar() }, [])

  const grupos = useMemo(() => {
    const map = new Map<string, MemoryVerse[]>()
    for (const t of THEMES) map.set(t, [])
    for (const v of verses) {
      if (!map.has(v.theme)) map.set(v.theme, [])
      map.get(v.theme)!.push(v)
    }
    return [...map.entries()].filter(([, arr]) => arr.length > 0)
  }, [verses])

  const step = (id: string) => setReveal((r) => ({ ...r, [id]: Math.min((r[id] ?? 0) + 1, 2) }))
  const resetCard = (id: string) => setReveal((r) => ({ ...r, [id]: 0 }))
  const revelarTudo = () => setReveal(Object.fromEntries(verses.map((v) => [v.id, 2])))
  const esconderTudo = () => setReveal({})

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-1 flex items-center gap-2">
          <BookMarked className="h-6 w-6 text-[#D4A843]" />
          <h1 className="font-heading text-2xl font-bold text-[#1A365D]">Memorização de Versículos</h1>
        </div>
        <p className="text-sm text-[#718096]">
          Esconda a Palavra no coração. Toque no card: o primeiro toque mostra a referência, o segundo mostra o texto.
          Tente lembrar antes de revelar.
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" onClick={esconderTudo} className="gap-1 text-xs">
          <RotateCcw className="h-3.5 w-3.5" /> Esconder tudo
        </Button>
        <Button size="sm" variant="outline" onClick={revelarTudo} className="gap-1 text-xs">
          <Eye className="h-3.5 w-3.5" /> Revelar tudo
        </Button>
        {isAdmin && (
          <Button asChild size="sm" variant="ghost" className="ml-auto gap-1 text-xs text-[#1A365D]">
            <Link to="/admin/versiculos"><Settings className="h-3.5 w-3.5" /> Gerenciar versículos</Link>
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-[#1A365D]" /></div>
      ) : verses.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-12 text-center text-sm text-[#718096]">
            Ainda não há versículos cadastrados.
            {isAdmin && ' Abra "Gerenciar versículos" para adicionar.'}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {grupos.map(([tema, arr]) => {
            const cor = THEME_COLOR[tema] || '#1A365D'
            return (
              <section key={tema}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-4 w-1.5 rounded-full" style={{ background: cor }} />
                  <h2 className="font-heading text-lg font-bold" style={{ color: cor }}>{tema}</h2>
                  <Badge variant="outline" className="text-[10px] text-[#718096]">{arr.length}</Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {arr.map((v) => {
                    const st = reveal[v.id] ?? 0
                    return (
                      <button
                        key={v.id}
                        onClick={() => step(v.id)}
                        className="group relative min-h-[120px] rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md"
                        style={{ borderTopColor: cor, borderTopWidth: 3 }}
                      >
                        {st === 0 && (
                          <div className="flex h-full min-h-[88px] flex-col items-center justify-center text-center">
                            <BookMarked className="mb-2 h-5 w-5" style={{ color: cor }} />
                            <span className="text-xs font-medium text-[#718096]">Toque para ver a referência</span>
                          </div>
                        )}
                        {st >= 1 && (
                          <div>
                            <p className="font-heading text-base font-bold" style={{ color: cor }}>{v.reference}</p>
                            {st === 1 && (
                              <p className="mt-2 flex items-center gap-1 text-[11px] text-[#A0AEC0]">
                                <Eye className="h-3 w-3" /> Toque de novo para ver o texto
                              </p>
                            )}
                            {st >= 2 && (
                              <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="mt-2 text-sm leading-relaxed text-[#2D3748]"
                              >
                                "{v.text}"
                              </motion.p>
                            )}
                          </div>
                        )}
                        {st >= 1 && (
                          <span
                            onClick={(e) => { e.stopPropagation(); resetCard(v.id) }}
                            className="absolute right-2 top-2 rounded p-1 text-[#CBD5E0] opacity-0 transition-opacity hover:text-[#718096] group-hover:opacity-100"
                            title="Esconder"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}
          <p className="flex items-center justify-center gap-1.5 pt-2 text-center text-xs text-[#A0AEC0]">
            <Sparkles className="h-3.5 w-3.5" /> "Escondi a tua palavra no meu coração, para eu não pecar contra ti." — Salmos 119.11
          </p>
        </div>
      )}
    </div>
  )
}
