import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, Music, Clock, Send, Cross } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent } from '@/components/ui/card'

const contactInfo = [
  { icon: Phone, title: 'Telefone/WhatsApp', value: '(11) 98765-4321', sub: 'Atendimento: Seg-Sex, 9h às 18h' },
  { icon: Mail, title: 'E-mail', value: 'contato@tetelestai.org', sub: 'Respondemos em até 48h' },
  { icon: MapPin, title: 'Endereço', value: 'Rua da Fé, 123 — Centro', sub: 'São Paulo, SP — CEP 01000-000' },
]

const worshipTimes = [
  { day: 'Domingo', time: '10h', name: 'Culto da Família (manhã)' },
  { day: 'Domingo', time: '19h', name: 'Culto da Família (noite)' },
  { day: 'Quarta', time: '20h', name: 'Culto de Oração' },
  { day: 'Sábado', time: '18h', name: 'Culto dos Jovens' },
]

export default function Contato() {
  const [contactPreference, setContactPreference] = useState('nao')

  return (
    <div>
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center bg-gradient-to-br from-[#1A365D] to-[#0F2744]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">Contato</h1>
          <p className="text-white/70 text-lg">Estamos aqui para ouvir você</p>
        </motion.div>
      </section>

      <section className="relative z-10 -mt-10 pb-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-4 mb-16">
            {contactInfo.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card className="shadow-lg border-0 text-center p-6">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 rounded-full bg-[#1A365D]/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-5 h-5 text-[#1A365D]" />
                    </div>
                    <h3 className="font-medium text-[#1A202C] mb-1">{item.title}</h3>
                    <p className="text-sm font-medium text-[#1A365D]">{item.value}</p>
                    <p className="text-xs text-[#718096] mt-1">{item.sub}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#F7FAFC] rounded-xl p-8">
              <h3 className="font-heading text-2xl font-semibold text-[#1A202C] mb-6">Envie uma Mensagem</h3>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Mensagem enviada com sucesso!') }}>
                <div><Label>Nome *</Label><Input placeholder="Seu nome" required /></div>
                <div><Label>E-mail *</Label><Input type="email" placeholder="seu@email.com" required /></div>
                <div><Label>Telefone</Label><Input placeholder="(11) 98765-4321" /></div>
                <div><Label>Assunto</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>
                    <SelectItem value="duvida">Dúvida</SelectItem><SelectItem value="sugestao">Sugestão</SelectItem><SelectItem value="visita">Visita</SelectItem><SelectItem value="outro">Outro</SelectItem>
                  </SelectContent></Select>
                </div>
                <div><Label>Mensagem *</Label><Textarea placeholder="Sua mensagem..." required className="min-h-[120px]" /></div>
                <Button type="submit" className="w-full bg-[#1A365D] hover:bg-[#2C5282]"><Send className="w-4 h-4 mr-2" />Enviar Mensagem</Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#F7FAFC] rounded-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Cross className="w-6 h-6 text-[#D4A843]" />
                <h3 className="font-heading text-2xl font-semibold text-[#1A202C]">Pedido de Oração</h3>
              </div>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Pedido de oração enviado! Nossa equipe está intercedendo por você.') }}>
                <div><Label>Nome</Label><Input placeholder="Seu nome (opcional)" /></div>
                <div><Label>Pedido de Oração *</Label><Textarea placeholder="Compartilhe seu pedido de oração..." required className="min-h-[140px]" /></div>
                <div>
                  <Label className="mb-2 block">Gostaria de ser contactado?</Label>
                  <RadioGroup value={contactPreference} onValueChange={setContactPreference} className="flex gap-4">
                    <div className="flex items-center gap-2"><RadioGroupItem value="sim" id="sim" /><Label htmlFor="sim" className="cursor-pointer">Sim</Label></div>
                    <div className="flex items-center gap-2"><RadioGroupItem value="nao" id="nao" /><Label htmlFor="nao" className="cursor-pointer">Não</Label></div>
                  </RadioGroup>
                </div>
                {contactPreference === 'sim' && <div><Label>Telefone/E-mail</Label><Input placeholder="Seu contato" /></div>}
                <Button type="submit" variant="outline" className="w-full border-[#D4A843] text-[#D4A843] hover:bg-[#D4A843] hover:text-[#0F2744]">Enviar Pedido</Button>
              </form>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#EDF2F7] rounded-xl overflow-hidden h-80">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.5!2d-46.63!3d-23.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsMzMyw4xLjBTIDQ2wrAzNyczOC4wVw!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="font-heading text-2xl font-semibold text-[#1A202C] mb-6">Horários dos Cultos</h3>
              <div className="space-y-4">
                {worshipTimes.map((w, i) => (
                  <div key={i} className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-12 h-12 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#1A365D]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A202C]">{w.name}</p>
                      <p className="text-sm text-[#718096]">{w.day}, {w.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-[#718096] mb-3">Siga-nos nas redes sociais</p>
                <div className="flex gap-3">
                  {[Instagram, Youtube, Facebook, Music].map((Icon, i) => (
                    <a key={i} href="#" onClick={e => { e.preventDefault(); alert('Em breve!') }} className="w-10 h-10 rounded-full bg-[#F7FAFC] flex items-center justify-center hover:bg-[#1A365D] hover:text-white transition-colors text-[#4A5568]">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0F2744]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-6">Siga-nos nas Redes Sociais</h2>
          <div className="flex justify-center gap-4">
            {[Instagram, Youtube, Facebook, Music].map((Icon, i) => (
              <a key={i} href="#" onClick={e => { e.preventDefault(); alert('Em breve!') }} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A843] transition-colors text-white">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-[#D4A843] mt-4 font-medium">@tetelestaimissoes</p>
        </motion.div>
      </section>
    </div>
  )
}
