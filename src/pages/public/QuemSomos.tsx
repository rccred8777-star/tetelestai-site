import { motion } from 'framer-motion'
import { Eye, Target, Heart } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { leaders } from '@/data/mock'

const timeline = [
  { year: '2010', text: 'Fundação do Ministério' },
  { year: '2015', text: 'Inauguração do Templo' },
  { year: '2019', text: 'Lançamento das Células' },
  { year: '2024', text: '500+ Membros Ativos' },
]

const values = ['Fé', 'Família', 'Discipulado', 'Missões', 'Excelência', 'Generosidade']

const beliefs = [
  'A Bíblia Sagrada como Palavra de Deus inspirada e infalível',
  'Um só Deus eterno existente em três pessoas: Pai, Filho e Espírito Santo',
  'A salvação pelo arrependimento dos pecados e fé em Jesus Cristo',
  'O batismo nas águas e o batismo no Espírito Santo',
  'A segunda vinda de Jesus Cristo e a vida eterna',
]

export default function QuemSomos() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/hero-about.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F2744]/60" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">Quem Somos</h1>
          <div className="w-16 h-0.5 bg-[#D4A843] mx-auto mb-3" />
          <p className="text-white/70 text-sm">Início &gt; Quem Somos</p>
        </motion.div>
      </section>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs uppercase tracking-wider text-[#D4A843] font-semibold">Nossa História</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mt-2 mb-6">Uma Jornada de Fé</h2>
              <div className="space-y-4 text-[#4A5568] leading-relaxed">
                <p>O Ministério Tetelestai Missões nasceu em 2010, quando o Pastor Ricardo Silva e sua família sentiram o chamado de Deus para estabelecer uma comunidade de fé focada em discipulado e missões.</p>
                <p>Começamos com pequenos encontros em residências, que rapidamente cresceram conforme mais famílias se uniram à visão de uma igreja verdadeiramente acolhedora.</p>
                <p>Hoje, somos uma comunidade vibrante com mais de 500 membros ativos, células em diversos bairros e projetos missionários em 3 países.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#EDF2F7]" />
              <div className="space-y-8 relative">
                {timeline.map((item, i) => (
                  <motion.div key={item.year} custom={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex items-start gap-6 pl-1">
                    <div className="w-3 h-3 rounded-full bg-[#D4A843] ring-4 ring-[#D4A843]/20 mt-1.5 relative z-10" />
                    <div>
                      <span className="text-lg font-bold text-[#1A365D]">{item.year}</span>
                      <p className="text-[#4A5568]">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C]">Visão, Missão e Valores</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: 'Visão', text: 'Ser uma comunidade de discípulos que transformam o mundo através do amor de Cristo.' },
              { icon: Target, title: 'Missão', text: 'Fazer discípulos de todas as nações, amando a Deus acima de todas as coisas e ao próximo como a si mesmo.' },
              { icon: Heart, title: 'Valores', isValues: true },
            ].map((item, i) => (
              <motion.div key={item.title} custom={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-white rounded-xl p-8 shadow-md text-center hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-[#1A365D] mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-[#1A202C] mb-3">{item.title}</h3>
                {item.isValues ? (
                  <div className="flex flex-wrap justify-center gap-2">
                    {values.map(v => <span key={v} className="px-3 py-1 bg-[#F7FAFC] text-[#4A5568] text-sm rounded-full">{v}</span>)}
                  </div>
                ) : (
                  <p className="text-[#4A5568] leading-relaxed">{item.text}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-3">Nossa Liderança</h2>
            <p className="text-[#4A5568]">Conheça aqueles que servem com amor</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, i) => (
              <motion.div key={leader.id} custom={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover rounded-full border-[3px] border-[#D4A843] group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#1A202C]">{leader.name}</h3>
                <p className="text-sm text-[#E8532D] font-medium mb-2">{leader.role}</p>
                <p className="text-sm text-[#4A5568]">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faith Statement */}
      <section className="py-20 bg-[#0F2744]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading text-3xl sm:text-4xl font-bold text-white text-center mb-10">
            Nossa Declaração de Fé
          </motion.h2>
          <Accordion type="single" collapsible className="space-y-3">
            {beliefs.map((belief, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <AccordionItem value={`item-${i}`} className="bg-white/5 border border-white/10 rounded-lg px-4 data-[state=open]:bg-white/10">
                  <AccordionTrigger className="text-white hover:no-underline py-4 text-left">
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#D4A843] text-[#0F2744] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      {belief}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-4 pl-9">
                    Acreditamos firmemente neste princípio como fundamento de nossa fé e prática cristã. A Bíblia nos ensina...
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
