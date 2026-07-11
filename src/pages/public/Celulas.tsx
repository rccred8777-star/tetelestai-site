import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Heart, Users, MapPin, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cellGroups } from '@/data/mock'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
}

export default function Celulas() {
  const [filters, setFilters] = useState({ region: 'all', day: 'all', profile: 'all' })

  const filtered = cellGroups.filter(c => {
    if (filters.region !== 'all' && !c.region.toLowerCase().includes(filters.region.toLowerCase())) return false
    if (filters.day !== 'all' && !c.day.toLowerCase().includes(filters.day.toLowerCase())) return false
    if (filters.profile !== 'all' && c.profile !== filters.profile) return false
    return true
  })

  return (
    <div>
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/min-celulas.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F2744]/70" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">Células</h1>
          <p className="text-white/70 text-lg">Pequenos grupos, grandes transformações</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-6">O que são Células?</h2>
              <p className="text-[#4A5568] leading-relaxed mb-6">
                As células são pequenos grupos de 8-15 pessoas que se reúnem semanalmente em lares para estudar a Bíblia, orar, compartilhar a vida e crescer juntos na fé. É onde a igreja se torna família.
              </p>
              <div className="space-y-4">
                {[{ icon: BookOpen, text: 'Estudo da Palavra' }, { icon: Heart, text: 'Comunhão e Amizade' }, { icon: Users, text: 'Crescimento Espiritual' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A365D]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#1A365D]" />
                    </div>
                    <span className="text-[#1A202C] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl overflow-hidden shadow-lg">
              <img src="/min-celulas.jpg" alt="Célula" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-3">Encontre uma Célula Perto de Você</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap gap-3 mb-10 justify-center">
            <Select onValueChange={v => setFilters(f => ({ ...f, region: v }))}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Região" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="centro">Centro</SelectItem>
                <SelectItem value="jardim">Jardim das Flores</SelectItem>
                <SelectItem value="vila">Vila Nova</SelectItem>
                <SelectItem value="são josé">São José</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={v => setFilters(f => ({ ...f, day: v }))}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Dia" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="terça">Terça</SelectItem>
                <SelectItem value="quarta">Quarta</SelectItem>
                <SelectItem value="quinta">Quinta</SelectItem>
                <SelectItem value="sexta">Sexta</SelectItem>
                <SelectItem value="sábado">Sábado</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={v => setFilters(f => ({ ...f, profile: v }))}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Perfil" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Família">Família</SelectItem>
                <SelectItem value="Jovens">Jovens</SelectItem>
                <SelectItem value="Mulheres">Mulheres</SelectItem>
                <SelectItem value="Casais">Casais</SelectItem>
                <SelectItem value="Misto">Misto</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cell, i) => (
              <motion.div key={cell.id} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                  <h3 className="font-heading text-lg font-semibold text-[#1A202C] mb-3">{cell.name}</h3>
                  <div className="space-y-2 text-sm text-[#4A5568] mb-4">
                    <div className="flex items-center gap-2"><User className="w-4 h-4 text-[#1A365D]" />{cell.leader}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#1A365D]" />{cell.day}, {cell.time}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#1A365D]" />{cell.location}</div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-[#F7FAFC] text-[#1A365D] text-xs font-medium rounded-full mb-3">{cell.profile}</span>
                  <Button size="sm" variant="outline" className="w-full text-[#1A365D] border-[#1A365D] hover:bg-[#1A365D] hover:text-white" onClick={() => alert('Interesse registrado!')}>
                    Quero Participar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#F7FAFC] rounded-xl p-8">
              <h3 className="font-heading text-2xl font-semibold text-[#1A202C] mb-6">Quero Participar de uma Célula</h3>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Enviado com sucesso!') }}>
                <div><Label>Nome</Label><Input placeholder="Seu nome" /></div>
                <div><Label>Email</Label><Input type="email" placeholder="seu@email.com" /></div>
                <div><Label>Telefone</Label><Input placeholder="(11) 98765-4321" /></div>
                <Button type="submit" className="w-full bg-[#1A365D] hover:bg-[#2C5282]">Enviar Interesse</Button>
              </form>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#F7FAFC] rounded-xl p-8">
              <h3 className="font-heading text-2xl font-semibold text-[#1A202C] mb-6">Quero Ser Líder de Célula</h3>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Enviado com sucesso!') }}>
                <div><Label>Nome</Label><Input placeholder="Seu nome" /></div>
                <div><Label>Email</Label><Input type="email" placeholder="seu@email.com" /></div>
                <div><Label>Telefone</Label><Input placeholder="(11) 98765-4321" /></div>
                <Button type="submit" variant="outline" className="w-full border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white">Quero Liderar</Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
