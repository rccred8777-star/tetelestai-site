import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, CheckCircle, AlertTriangle, QrCode, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { events } from '@/data/mock'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

export default function MeusEventos() {
  const myEvents = [
    { ...events[0], registrationStatus: 'confirmed' as const, qrCode: true },
    { ...events[3], registrationStatus: 'pending' as const, qrCode: false },
  ]
  const pastEvents = [
    { title: 'Culto de Ano Novo', date: '31 Dez 2025', attended: true },
    { title: 'Retiro de Jovens', date: '15-17 Nov 2025', attended: true },
  ]
  const availableEvents = events.slice(1, 4)

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-sm text-[#718096] mb-2"><span>Dashboard</span><span>/</span><span>Meus Eventos</span></div>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Meus Eventos</h1>
        <p className="text-sm text-[#718096]">Gerencie suas inscrições</p>
      </motion.div>

      <Tabs defaultValue="proximos">
        <TabsList className="mb-6"><TabsTrigger value="proximos">Próximos</TabsTrigger><TabsTrigger value="anteriores">Anteriores</TabsTrigger><TabsTrigger value="disponiveis">Disponíveis</TabsTrigger></TabsList>

        <TabsContent value="proximos">
          <div className="space-y-4">
            {myEvents.map((evt, i) => (
              <motion.div key={evt.id} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="sm:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                        <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {evt.registrationStatus === 'confirmed' ? (
                            <Badge className="bg-[#38A169] text-white hover:bg-[#38A169]"><CheckCircle className="w-3 h-3 mr-1" />INSCRITO</Badge>
                          ) : (
                            <Badge className="bg-[#D69E2E] text-white hover:bg-[#D69E2E]"><AlertTriangle className="w-3 h-3 mr-1" />INSCRIÇÃO PENDENTE</Badge>
                          )}
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-[#1A202C] mb-2">{evt.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-[#4A5568] mb-4">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-[#1A365D]" />{evt.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#1A365D]" />{evt.time}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#1A365D]" />{evt.location}</span>
                        </div>
                        {evt.qrCode && (
                          <div className="flex items-center gap-3 p-3 bg-[#F7FAFC] rounded-lg">
                            <QrCode className="w-10 h-10 text-[#1A365D]" />
                            <div><p className="text-sm font-medium text-[#1A202C]">Seu QR Code de check-in</p><p className="text-xs text-[#718096]">Apresente no dia do evento</p></div>
                          </div>
                        )}
                        {evt.registrationStatus === 'pending' && <Button size="sm" className="mt-3 bg-[#1A365D] hover:bg-[#2C5282]">Completar Inscrição</Button>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anteriores">
          <div className="space-y-3">
            {pastEvents.map((evt, i) => (
              <motion.div key={i} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-[#F7FAFC] flex items-center justify-center shrink-0"><Calendar className="w-5 h-5 text-[#1A365D]" /></div>
                  <div className="flex-1"><p className="font-medium text-[#1A202C]">{evt.title}</p><p className="text-sm text-[#718096]">{evt.date}</p></div>
                  {evt.attended && <Badge variant="outline" className="text-[#38A169] border-[#38A169]"><CheckCircle className="w-3 h-3 mr-1" />Compareceu</Badge>}
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="disponiveis">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableEvents.map((evt, i) => (
              <motion.div key={evt.id} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
                <Card className="border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-36 overflow-hidden"><img src={evt.image} alt={evt.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                  <CardContent className="p-5">
                    <h3 className="font-heading text-lg font-semibold text-[#1A202C] mb-2">{evt.title}</h3>
                    <div className="space-y-1 text-sm text-[#4A5568] mb-3">
                      <p className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#1A365D]" />{evt.date}</p>
                      <p className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#1A365D]" />{evt.time}</p>
                    </div>
                    {evt.price ? <p className="text-sm font-medium text-[#1A365D] mb-3">{evt.price}</p> : <p className="text-sm text-[#38A169] mb-3">Gratuito</p>}
                    <Button size="sm" className="w-full bg-[#1A365D] hover:bg-[#2C5282]"><Ticket className="w-4 h-4 mr-1" />Inscrever-se</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
