import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { events } from '@/data/mock'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

export default function Eventos() {
  const [activeTab, setActiveTab] = useState('lista')
  const featured = events[0]
  const regular = events.slice(1)

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/evento-conferencia.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F2744]/70" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">Eventos</h1>
          <p className="text-white/70 text-lg">Participe dos nossos encontros especiais</p>
        </motion.div>
      </section>

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 h-64 lg:h-auto">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div className="lg:col-span-3 p-8">
                <Badge className="bg-[#E8532D] text-white hover:bg-[#E8532D] mb-3">DESTAQUE</Badge>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A202C] mb-4">{featured.title}</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]"><Calendar className="w-4 h-4 text-[#1A365D]" />{featured.date}</div>
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]"><Clock className="w-4 h-4 text-[#1A365D]" />{featured.time}</div>
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]"><MapPin className="w-4 h-4 text-[#1A365D]" />{featured.location}</div>
                </div>
                <p className="text-[#4A5568] mb-6">{featured.description}</p>
                <div className="flex gap-3">
                  <Button className="bg-[#1A365D] hover:bg-[#2C5282]">Inscrever-se Agora</Button>
                  <Button variant="outline" className="gap-2"><Share2 className="w-4 h-4" />Compartilhar</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mx-auto mb-10 flex w-fit">
              <TabsTrigger value="lista">Lista</TabsTrigger>
              <TabsTrigger value="calendario">Calendário</TabsTrigger>
            </TabsList>
            <TabsContent value="lista">
              <div className="space-y-4">
                <div className="bg-[#1A365D] text-white px-4 py-2 rounded-lg font-medium text-sm">Janeiro 2026</div>
                {regular.slice(0, 2).map((evt, i) => (
                  <motion.div key={evt.id} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#F7FAFC] rounded-lg shrink-0">
                        <span className="text-xs text-[#718096] uppercase">{evt.date.split(' ')[2]?.substring(0, 3) || 'JAN'}</span>
                        <span className="text-xl font-bold text-[#1A365D]">{evt.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-semibold text-[#1A202C]">{evt.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-[#718096] mt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{evt.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{evt.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={evt.status === 'Vagas Limitadas' ? 'text-[#E8532D] border-[#E8532D]' : 'text-[#38A169] border-[#38A169]'}>{evt.status}</Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div className="bg-[#1A365D] text-white px-4 py-2 rounded-lg font-medium text-sm mt-6">Fevereiro 2026</div>
                {regular.slice(2, 4).map((evt, i) => (
                  <motion.div key={evt.id} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#F7FAFC] rounded-lg shrink-0">
                        <span className="text-xs text-[#718096] uppercase">FEV</span>
                        <span className="text-xl font-bold text-[#1A365D]">{evt.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-lg font-semibold text-[#1A202C]">{evt.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-[#718096] mt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{evt.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{evt.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[#38A169] border-[#38A169]">{evt.status}</Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="calendario">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                <Calendar className="w-16 h-16 text-[#1A365D]/20 mx-auto mb-4" />
                <p className="text-[#718096]">Visualização de calendário disponível na área de membros.</p>
                <Button className="mt-4 bg-[#1A365D] hover:bg-[#2C5282]" onClick={() => alert('Faça login para acessar!')}>Acessar Área de Membros</Button>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
