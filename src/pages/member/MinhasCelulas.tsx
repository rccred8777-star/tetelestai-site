import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MapPin, Calendar, Phone, Check, MessageSquare, FileText, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cellMembers } from '@/data/mock'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const cellMessages = [
  { from: 'Pb. João', text: 'Lembrete: Amanhã trazer o estudo da semana 3.', time: '2h ago' },
  { from: 'Dc. Maria', text: 'Oremos pelo irmão Roberto que está no hospital.', time: '1d ago' },
  { from: 'Pb. João', text: 'Próximo sábado teremos churrasco de integração!', time: '3d ago' },
]

export default function MinhasCelulas() {
  const [confirmed, setConfirmed] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState(cellMessages)

  const handleSend = () => {
    if (!messageText.trim()) return
    setMessages([{ from: 'Você', text: messageText, time: 'agora' }, ...messages])
    setMessageText('')
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-sm text-[#718096] mb-2"><span>Dashboard</span><span>/</span><span>Minhas Células</span></div>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Célula Vida Nova</h1>
          <Badge className="bg-[#1A365D] text-white hover:bg-[#1A365D]">Família</Badge>
        </div>
        <p className="text-sm text-[#718096] mt-1">Membro desde Janeiro 2024</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div custom={0} variants={fadeInUp} initial="hidden" animate="visible">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-14 h-14 border-2 border-[#D4A843]"><AvatarFallback className="bg-[#1A365D] text-white">Pb</AvatarFallback></Avatar>
                      <div><p className="font-medium text-[#1A202C]">Pb. João Pereira</p><Badge variant="outline" className="text-[10px]">Líder</Badge></div>
                    </div>
                    <div className="space-y-2 text-sm text-[#4A5568]">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#1A365D]" />Toda terça-feira, 20h</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#1A365D]" />Rua das Flores, 45 — Centro</div>
                    </div>
                  </div>
                  <div className="bg-[#F7FAFC] rounded-xl p-4">
                    <h3 className="font-medium text-[#1A202C] mb-2">Próximo Encontro</h3>
                    <p className="text-sm text-[#4A5568] mb-1">14 de Janeiro de 2026</p>
                    <p className="text-sm text-[#4A5568] mb-1">20h00</p>
                    <p className="text-sm text-[#1A365D] font-medium mb-3">Estudo: O Fruto do Espírito</p>
                    <p className="text-xs text-[#718096] mb-3">Casa do irmão Pedro</p>
                    <Button size="sm" className={confirmed ? 'bg-[#38A169] hover:bg-[#38A169]' : 'bg-[#1A365D] hover:bg-[#2C5282]'} onClick={() => setConfirmed(!confirmed)}>
                      {confirmed ? <><Check className="w-4 h-4 mr-1" />Confirmado</> : 'Confirmar presença'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={1} variants={fadeInUp} initial="hidden" animate="visible">
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Users className="w-5 h-5 text-[#1A365D]" />Membros ({cellMembers.length})</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {cellMembers.slice(0, 8).map((m) => (
                    <div key={m.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <Avatar className="w-9 h-9"><AvatarFallback className="bg-[#1A365D]/10 text-[#1A365D] text-xs">{m.name.charAt(0)}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium text-[#1A202C] truncate">{m.name}</p><p className="text-xs text-[#718096]">{m.role}</p></div>
                      <Button size="icon" variant="ghost" className="w-8 h-8 text-[#718096] hover:text-[#1A365D]" onClick={() => alert('Ligar: ' + m.phone)}><Phone className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={2} variants={fadeInUp} initial="hidden" animate="visible">
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><FileText className="w-5 h-5 text-[#1A365D]" />Material do Trimestre</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-[#4A5568] mb-3">Trimestre 1/2026 — Crescendo em Cristo</p>
                <div className="space-y-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${i === 2 ? 'bg-[#D4A843]/10 border border-[#D4A843]/30' : 'bg-[#F7FAFC]'}`}>
                      <span className="text-sm text-[#1A202C]">Semana {i + 1}: {['O Amor de Deus', 'Andando em Obediência', 'O Fruto do Espírito', 'Compartilhando a Fé'][i]}</span>
                      <Button size="sm" variant="ghost" className="text-[#1A365D]">PDF</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div custom={3} variants={fadeInUp} initial="hidden" animate="visible">
          <Card className="border-0 shadow-md h-full flex flex-col">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><MessageSquare className="w-5 h-5 text-[#1A365D]" />Comunicados da Célula</CardTitle></CardHeader>
            <CardContent className="pt-0 flex-1 flex flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[400px]">
                {messages.map((msg, i) => (
                  <div key={i} className="bg-[#F7FAFC] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#1A365D]">{msg.from}</span>
                      <span className="text-[10px] text-[#718096]">{msg.time}</span>
                    </div>
                    <p className="text-sm text-[#4A5568]">{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <Input placeholder="Escrever mensagem..." value={messageText} onChange={e => setMessageText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="text-sm" />
                <Button size="icon" className="bg-[#1A365D] hover:bg-[#2C5282] shrink-0" onClick={handleSend}><Send className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
