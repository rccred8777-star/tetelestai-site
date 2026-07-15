import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Loader2, CalendarDays } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { listEvents, type ChurchEvent } from '@/services/adminContentDb'

function fmt(d?: string) {
  if (!d) return ''
  const dt = new Date(d + 'T00:00:00')
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

function isFuturo(d?: string) {
  if (!d) return true
  const dt = new Date(d + 'T23:59:59')
  return isNaN(dt.getTime()) ? true : dt.getTime() >= Date.now()
}

export default function MeusEventos() {
  const [events, setEvents] = useState<ChurchEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try { setEvents(await listEvents()) }
      catch (e) { toast.error('Erro ao carregar os eventos'); console.error(e) }
      finally { setLoading(false) }
    })()
  }, [])

  const proximos = events.filter((e) => isFuturo(e.datetime))
  const passados = events.filter((e) => !isFuturo(e.datetime))

  const Item = ({ e, passado }: { e: ChurchEvent; passado?: boolean }) => (
    <Card className={`border-0 shadow-sm ${passado ? 'opacity-70' : ''}`}>
      <CardContent className="flex items-start gap-4 py-4">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-[#1A365D] text-white">
          <Calendar className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-[#1A202C]">{e.title}</p>
            {e.status && !passado && <Badge className="bg-[#38A169] text-[10px] text-white">{e.status}</Badge>}
            {passado && <Badge variant="outline" className="text-[10px]">Encerrado</Badge>}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#718096]">
            {e.datetime && <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{fmt(e.datetime)}</span>}
            {e.time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>}
            {e.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.location}</span>}
          </div>
          {e.description && <p className="mt-1.5 text-sm text-[#4A5568]">{e.description}</p>}
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-[#718096]">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando eventos...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Eventos</h1>
        <p className="text-sm text-[#718096]">A agenda da igreja.</p>
      </motion.div>

      {events.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-14 text-center">
            <Calendar className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-[#4A5568]">Nenhum evento na agenda no momento.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {proximos.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-[#1A202C]">Próximos</h2>
              <div className="space-y-3">{proximos.map((e) => <Item key={e.id} e={e} />)}</div>
            </section>
          )}
          {passados.length > 0 && (
            <section className="space-y-3 pt-2">
              <h2 className="font-heading text-lg font-bold text-[#1A202C]">Já aconteceram</h2>
              <div className="space-y-3">{passados.map((e) => <Item key={e.id} e={e} passado />)}</div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
