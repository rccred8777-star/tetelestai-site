import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Users, ArrowRight } from 'lucide-react'
import { ministries } from '@/data/mock'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
}

export default function Ministerios() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="/hero-home.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F2744]/70" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center text-white px-4">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">Nossos Ministérios</h1>
          <p className="text-white/70 text-lg">Há um lugar para você servir e crescer</p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid gap-6">
            {ministries.map((m, i) => (
              <motion.div key={m.id} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="sm:w-[40%] h-48 sm:h-auto">
                    <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="sm:w-[60%] p-6 flex flex-col justify-center">
                    <h3 className="font-heading text-xl font-semibold text-[#1A202C] mb-2">{m.name}</h3>
                    <p className="text-[#4A5568] mb-4 leading-relaxed">{m.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#718096]">
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#1A365D]" />{m.leader}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#1A365D]" />{m.meeting}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#E8532D]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="font-heading text-3xl font-bold mb-3">Quero Ser Voluntário</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-6">Todos têm um talento para servir. Deixe-nos ajudá-lo a encontrar o seu lugar.</p>
          <Link to="/contato" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#E8532D] font-medium rounded-lg hover:bg-white/90 transition-colors">
            Inscreva-se <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
