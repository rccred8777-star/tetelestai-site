import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Loader2, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { getUserDonations } from '@/services/firestore'

interface Donation { id: string; amount?: number; type?: string; createdAt?: { seconds: number } }

function brl(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function MinhasDoacoes() {
  const { user } = useAuth()
  const [doacoes, setDoacoes] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user) return
      try { setDoacoes(await getUserDonations(user.uid) as Donation[]) }
      catch (e) { toast.error('Erro ao carregar'); console.error(e) }
      finally { setLoading(false) }
    })()
  }, [user])

  const total = doacoes.reduce((s, d) => s + (d.amount || 0), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#718096]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Minhas Doações</h1>
        <p className="text-sm text-[#718096]">Seu histórico de contribuições registradas.</p>
      </motion.div>

      {doacoes.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-14 text-center">
            <Heart className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-[#4A5568]">Você ainda não tem doações registradas por aqui.</p>
            <p className="mx-auto mt-1 max-w-md text-xs text-[#718096]">
              Para dizimar ou ofertar, use a página de doações da igreja.
            </p>
            <Button asChild className="mt-4 bg-[#1A365D] hover:bg-[#1A365D]/90">
              <Link to="/doacoes">Ver formas de doar</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-0 bg-[#1A365D] text-white shadow-md">
            <CardContent className="py-6">
              <p className="text-sm text-white/70">Total contribuído (registrado)</p>
              <p className="mt-1 font-heading text-3xl font-bold">{brl(total)}</p>
              <p className="mt-1 text-xs text-white/60">{doacoes.length} contribuição(ões)</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader><CardTitle className="text-base">Histórico</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {doacoes.map((d) => (
                  <div key={d.id} className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-[#1A202C] capitalize">{d.type || 'Contribuição'}</p>
                      {d.createdAt?.seconds && (
                        <p className="text-[11px] text-[#718096]">
                          {new Date(d.createdAt.seconds * 1000).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                    <p className="font-medium text-[#1A365D]">{brl(d.amount || 0)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="flex items-start gap-2 rounded-lg bg-[#F7FAFC] px-3 py-2.5 text-xs text-[#718096]">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          Este histórico mostra apenas o que a tesouraria registrou no sistema.
          Doações feitas por PIX ou fora do app podem não aparecer aqui.
        </span>
      </div>
    </div>
  )
}
