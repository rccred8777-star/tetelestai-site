import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCheck, Loader2, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { listAnnouncements } from '@/services/adminContentDb'

const categoryColors: Record<string, string> = {
  igreja: 'bg-[#3182CE]',
  pastoral: 'bg-[#D4A843]',
  celula: 'bg-[#38A169]',
  cursos: 'bg-[#805AD5]',
  eventos: 'bg-[#E8532D]',
}

const categoryLabels: Record<string, string> = {
  igreja: 'Igreja',
  pastoral: 'Pastoral',
  celula: 'Célula',
  cursos: 'Cursos',
  eventos: 'Eventos',
}

export default function Comunicados() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listAnnouncements()
      .then((db) => setItems(db.map((a) => ({ id: a.id, title: a.title, content: a.content, category: a.category, date: a.date || '', unread: true }))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const markAllRead = () => setItems(items.map(a => ({ ...a, unread: false })))

  const unreadCount = items.filter(a => a.unread).length

  const tabs = ['Todos', 'Igreja', 'Pastoral', 'Célula', 'Cursos', 'Eventos']

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#718096] mb-2"><span>Dashboard</span><span>/</span><span>Comunicados</span></div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Comunicados</h1>
            {unreadCount > 0 && <Badge className="bg-[#E8532D] text-white hover:bg-[#E8532D]">{unreadCount} não lidos</Badge>}
          </div>
          <p className="text-sm text-[#718096]">Fique por dentro das novidades</p>
        </div>
        {unreadCount > 0 && <Button variant="outline" size="sm" className="gap-2" onClick={markAllRead}><CheckCheck className="w-4 h-4" />Marcar todos como lidos</Button>}
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#718096]"><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando...</div>
      ) : items.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-14 text-center">
            <Bell className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-[#4A5568]">Nenhum comunicado no momento.</p>
          </CardContent>
        </Card>
      ) : (
      <Tabs defaultValue="Todos">
        <TabsList className="mb-6 flex flex-wrap h-auto gap-1"><TabsTrigger value="Todos">Todos</TabsTrigger>{tabs.slice(1).map(t => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}</TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab} value={tab}>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#EDF2F7]" />
              {items.filter(a => tab === 'Todos' || categoryLabels[a.category] === tab).map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className={`border-0 shadow-sm hover:shadow-md transition-shadow ${a.unread ? 'ring-1 ring-[#E8532D]/20' : ''}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className={`w-3 h-3 rounded-full ${categoryColors[a.category]} shrink-0 mt-1.5`} />
                          {a.unread && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E8532D]" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`${categoryColors[a.category]} text-white text-[10px] hover:${categoryColors[a.category]}`}>{categoryLabels[a.category]}</Badge>
                            <span className="text-xs text-[#718096]">{a.date}</span>
                          </div>
                          <h3 className="font-medium text-[#1A202C] mb-1">{a.title}</h3>
                          <p className="text-sm text-[#4A5568] leading-relaxed">{a.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      )}
    </div>
  )
}
