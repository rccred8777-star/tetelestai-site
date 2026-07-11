import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Smartphone, Landmark, Repeat, BookOpen, Heart, Globe, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqItems, campaigns } from '@/data/mock'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const methods = [
  { icon: CreditCard, title: 'Cartao de Credito/Debito', desc: 'Doacao rapida e segura com cartao.', action: 'Doar com Cartao' },
  { icon: Smartphone, title: 'PIX', desc: 'Chave PIX: doacoes@tetelestai.org', action: 'Copiar Chave PIX' },
  { icon: Landmark, title: 'Transferencia Bancaria', desc: 'Banco do Brasil | Ag: 1234-5 | CC: 67890-1', action: 'Copiar Dados' },
  { icon: Repeat, title: 'Dizimo Recorrente', desc: 'Configure seu dizimo automatico mensal.', action: 'Configurar Recorrencia' },
]

const reasons = [
  { icon: BookOpen, title: 'Obediencia', text: 'A Biblia nos ensina que o dizimo pertence ao Senhor (Levitico 27:30).' },
  { icon: Heart, title: 'Gratidao', text: 'Damos em resposta ao amor incondicional de Deus por nos.' },
  { icon: Globe, title: 'Impacto', text: 'Cada contribuicao alimenta missoes e transforma comunidades.' },
]

export default function Doacoes() {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center bg-gradient-to-br from-[#1A365D] to-[#0F2744]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">Doacoes</h1>
          <p className="text-white/70 text-lg">Seu gesto de amor transforma vidas</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-6">Por Que Damos?</h2>
              <blockquote className="font-serif italic text-lg text-[#4A5568] leading-relaxed border-l-4 border-[#D4A843] pl-6 mb-8">
                "Cada um contribua conforme propuser em seu coracao, nao com pesar nem por obrigacao, pois Deus ama a quem da com alegria."
                <span className="block mt-2 text-sm font-medium not-italic text-[#1A202C]">- 2 Corintios 9:7</span>
              </blockquote>
            </motion.div>
            <div className="space-y-6">
              {reasons.map((item, i) => (
                <motion.div key={item.title} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1A365D]/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-[#1A365D]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[#1A202C]">{item.title}</h3>
                    <p className="text-sm text-[#4A5568]">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C]">Como Doar</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methods.map((m, i) => (
              <motion.div key={m.title} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-all">
                <m.icon className="w-12 h-12 text-[#38A169] mx-auto mb-4" />
                <h3 className="font-heading text-lg font-semibold text-[#1A202C] mb-2">{m.title}</h3>
                <p className="text-sm text-[#4A5568] mb-4">{m.desc}</p>
                <Button size="sm" variant="outline" className="border-[#38A169] text-[#38A169] hover:bg-[#38A169] hover:text-white" onClick={() => m.action.includes('Copiar') ? handleCopy(m.desc.split(': ')[1] || 'doacoes@tetelestai.org') : alert('Em breve!')}>
                  {copied && m.action.includes('Copiar') ? <><Check className="w-3 h-3 mr-1" />Copiado!</> : m.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C]">Campanhas e Projetos</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {campaigns.map((c, i) => (
              <motion.div key={c.id} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white border border-gray-100 rounded-xl p-6 shadow-md">
                <h3 className="font-heading text-xl font-semibold text-[#1A202C] mb-2">{c.name}</h3>
                <p className="text-sm text-[#4A5568] mb-4">{c.description}</p>
                <div className="mb-2">
                  <Progress value={(c.current / c.goal) * 100} className="h-2.5" />
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-[#1A365D] font-medium">R$ {c.current.toLocaleString()}</span>
                  <span className="text-[#718096]">meta: R$ {c.goal.toLocaleString()}</span>
                </div>
                <Button size="sm" className="bg-[#38A169] hover:bg-[#2F855A] text-white w-full">Contribuir</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-[#1A202C]">Perguntas Frequentes</h2>
          </motion.div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <AccordionItem value={`faq-${i}`} className="bg-white border border-gray-100 rounded-lg px-4">
                  <AccordionTrigger className="text-left text-[#1A202C] hover:no-underline py-4 text-sm sm:text-base">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-[#4A5568] pb-4 text-sm">{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 bg-[#38A169]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="font-heading text-3xl font-bold mb-3">Sua Generosidade Faz a Diferenca</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">Cada contribuicao, por menor que seja, e uma semente que gera fruto para a eternidade.</p>
          <Button size="lg" className="bg-white text-[#38A169] hover:bg-white/90 font-semibold rounded-lg px-8">Fazer Minha Doacao</Button>
        </motion.div>
      </section>
    </div>
  )
}
