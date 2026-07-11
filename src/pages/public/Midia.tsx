import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Headphones, Radio, Download, Share2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { sermons, devotionals } from '@/data/mock'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const series = [
  { title: 'Raízes Profundas', count: 8, pastor: 'Pr. Ricardo', date: 'Jan 2026', image: '/placeholder-sermon.jpg' },
  { title: 'Família no Alvo', count: 6, pastor: 'Pr. Carlos e Ana', date: 'Nov-Dez 2025', image: '/placeholder-sermon.jpg' },
  { title: 'Avivamento', count: 10, pastor: 'Pra. Juliana', date: 'Set-Out 2025', image: '/placeholder-sermon.jpg' },
]

const playlists = [
  { title: 'Setlist Domingo Manhã', count: 12 },
  { title: 'Momento de Oração', count: 20 },
  { title: 'Louvor Jovem', count: 15 },
]

export default function Midia() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center bg-gradient-to-br from-[#0F2744] to-[#1A365D]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">Mídia</h1>
          <p className="text-white/70 text-lg">Mensagens, estudos e conteúdo para edificar sua fé</p>
        </motion.div>
      </section>

      <section className="py-16 bg-[#0F2744]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <Badge className="bg-red-500 text-white hover:bg-red-500 mb-4 gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              AO VIVO AGORA
            </Badge>
            <div className="aspect-video max-w-3xl mx-auto bg-black/30 rounded-xl border-2 border-white/20 flex items-center justify-center">
              <div className="text-center text-white/60">
                <Radio className="w-12 h-12 mx-auto mb-3" />
                <p className="text-lg font-medium text-white">Próximo culto: Domingo, 10h</p>
                <p className="text-sm">Retransmissão disponível após o culto</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <h2 className="font-heading text-3xl font-bold text-[#1A202C]">Biblioteca de Mensagens</h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
              <Input placeholder="Buscar mensagens..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>

          <Tabs defaultValue="series" className="w-full">
            <TabsList className="mb-8"><TabsTrigger value="series">Séries</TabsTrigger><TabsTrigger value="mensagens">Mensagens</TabsTrigger><TabsTrigger value="musica">Música</TabsTrigger><TabsTrigger value="blog">Devocionais</TabsTrigger></TabsList>

            <TabsContent value="series">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {series.map((s, i) => (
                  <motion.div key={s.title} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="group cursor-pointer">
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"><Play className="w-5 h-5 text-[#1A365D] ml-0.5" /></div>
                        </div>
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-[#1A202C]">{s.title}</h3>
                      <p className="text-sm text-[#718096]">{s.count} mensagens • {s.pastor} • {s.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mensagens">
              <div className="space-y-3">
                {sermons.map((sermon, i) => (
                  <motion.div key={sermon.id} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="flex items-center gap-4 p-4 bg-[#F7FAFC] rounded-xl hover:bg-[#EDF2F7] transition-colors group cursor-pointer">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src={sermon.image} alt={sermon.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Play className="w-5 h-5 text-white" /></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#1A202C] truncate">{sermon.title}</h4>
                        <p className="text-sm text-[#718096]">{sermon.pastor} • {sermon.date} • {sermon.duration}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <Button size="icon" variant="ghost" className="text-[#718096] hover:text-[#1A365D]"><Headphones className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-[#718096] hover:text-[#1A365D]"><Download className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-[#718096] hover:text-[#1A365D]"><Share2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="musica">
              <div className="grid sm:grid-cols-3 gap-6">
                {playlists.map((pl, i) => (
                  <motion.div key={pl.title} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="bg-gradient-to-br from-[#1A365D] to-[#2C5282] rounded-xl p-6 text-white hover:shadow-lg transition-all cursor-pointer">
                      <Headphones className="w-10 h-10 text-[#D4A843] mb-4" />
                      <h3 className="font-heading text-lg font-semibold mb-1">{pl.title}</h3>
                      <p className="text-white/60 text-sm">{pl.count} músicas</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blog">
              <div className="grid sm:grid-cols-2 gap-6">
                {devotionals.map((d, i) => (
                  <motion.div key={d.id} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                      <div className="h-40 overflow-hidden">
                        <img src={d.image} alt={d.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <Badge variant="outline" className="mb-2 text-[10px]">Devocional</Badge>
                        <h3 className="font-heading text-lg font-semibold text-[#1A202C] mb-2">{d.title}</h3>
                        <p className="text-sm text-[#4A5568] mb-3 line-clamp-2">{d.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-[#718096]">
                          <img src={d.image} alt={d.author} className="w-5 h-5 rounded-full object-cover" />
                          <span>{d.author}</span>
                          <span>•</span>
                          <span>{d.date}</span>
                          <span>•</span>
                          <span>{d.readTime} de leitura</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
