import { motion } from 'framer-motion'
import { Play, Headphones, BookOpen, Download, Plus, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const memberSeries = [
  { title: 'Aprofundando na Palavra', count: 5, image: '/placeholder-sermon.jpg' },
  { title: 'Liderança no Reino', count: 8, image: '/placeholder-sermon.jpg' },
  { title: 'Família Segundo o Coração de Deus', count: 6, image: '/placeholder-sermon.jpg' },
]

const studies = [
  { title: 'Estudo: O Livro de Romanos', format: 'PDF' },
  { title: 'Estudo: Vida no Espírito Santo', format: 'PDF' },
  { title: 'Estudo: O Fruto do Espírito', format: 'PDF' },
]

const playlists = [
  { title: 'Playback Ensaio', count: 25 },
  { title: 'Hinos Clássicos', count: 30 },
  { title: 'Louvor para Momentos de Oração', count: 20 },
]

const myPlaylists = [
  { title: 'Favoritos', count: 12 },
  { title: 'Estudo', count: 8 },
  { title: 'Oração', count: 15 },
]

export default function MidiaMembro() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-sm text-[#718096] mb-2"><span>Dashboard</span><span>/</span><span>Mídia</span></div>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Biblioteca de Mídia</h1>
        <p className="text-sm text-[#718096]">Conteúdo exclusivo para membros</p>
      </motion.div>

      {/* Continue Watching */}
      <motion.div custom={0} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Clock className="w-5 h-5 text-[#1A365D]" />Continue Assistindo</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0">
                <img src="/placeholder-sermon.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"><div className="h-full bg-[#D4A843] w-[40%]" /></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1A202C]">O Poder da Oração — Parte 2</p>
                <p className="text-sm text-[#718096]">Raízes Profundas • Pr. Ricardo Silva</p>
              </div>
              <Button size="sm" className="bg-[#1A365D] hover:bg-[#2C5282]"><Play className="w-4 h-4 mr-1" />Continuar</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Exclusive Content */}
      <motion.div custom={1} variants={fadeInUp} initial="hidden" animate="visible">
        <Badge className="mb-4 bg-[#1A365D] text-white border border-[#D4A843]">EXCLUSIVO PARA MEMBROS</Badge>
        <Tabs defaultValue="sermoes">
          <TabsList className="mb-6"><TabsTrigger value="sermoes">Sermões</TabsTrigger><TabsTrigger value="estudos">Estudos</TabsTrigger><TabsTrigger value="musica">Música</TabsTrigger><TabsTrigger value="playlists">Minhas Playlists</TabsTrigger></TabsList>

          <TabsContent value="sermoes">
            <div className="grid sm:grid-cols-3 gap-6">
              {memberSeries.map((s, i) => (
                <motion.div key={s.title} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
                  <div className="group cursor-pointer">
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3"><img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Play className="w-10 h-10 text-white" /></div></div>
                    <h3 className="font-heading text-lg font-semibold text-[#1A202C]">{s.title}</h3><p className="text-sm text-[#718096]">{s.count} mensagens • Membros only</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="estudos">
            <div className="space-y-3">
              {studies.map((s, i) => (
                <motion.div key={s.title} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0"><BookOpen className="w-6 h-6 text-[#1A365D]" /></div>
                    <div className="flex-1"><p className="font-medium text-[#1A202C]">{s.title}</p><p className="text-xs text-[#718096]">Membros exclusivo</p></div>
                    <Button size="sm" variant="outline"><Download className="w-3 h-3 mr-1" />{s.format}</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="musica">
            <div className="grid sm:grid-cols-3 gap-4">
              {playlists.map((pl, i) => (
                <motion.div key={pl.title} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
                  <div className="bg-gradient-to-br from-[#1A365D] to-[#2C5282] rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer">
                    <Headphones className="w-8 h-8 text-[#D4A843] mb-3" /><h3 className="font-heading text-base font-semibold">{pl.title}</h3><p className="text-white/60 text-sm">{pl.count} músicas</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists">
            <div className="space-y-3">
              {myPlaylists.map((pl, i) => (
                <motion.div key={pl.title} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 rounded-lg bg-[#F7FAFC] flex items-center justify-center shrink-0"><Headphones className="w-5 h-5 text-[#1A365D]" /></div>
                    <div className="flex-1"><p className="font-medium text-[#1A202C]">{pl.title}</p><p className="text-xs text-[#718096]">{pl.count} itens</p></div>
                    <Button size="sm" variant="ghost" className="text-[#718096]">Editar</Button>
                  </div>
                </motion.div>
              ))}
              <Button variant="outline" className="w-full gap-2 border-dashed"><Plus className="w-4 h-4" />Nova Playlist</Button>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
