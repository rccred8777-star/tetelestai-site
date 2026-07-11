import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, MapPin, Calendar, Clock, Users, Flame, Sun, ChevronDown, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { testimonials, events } from '@/data/mock'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
}

const worshipTimes = [
  { icon: Sun, title: 'Culto da Família', time: 'Domingo, 10h e 19h', desc: 'Culto de celebração para toda a família com louvor e palavra' },
  { icon: Flame, title: 'Culto de Oração', time: 'Quarta-feira, 20h', desc: 'Noite de oração, intercessão e busca pela presença de Deus' },
  { icon: Users, title: 'Culto dos Jovens', time: 'Sábado, 18h', desc: 'Encontro dinâmico para jovens com louvor e comunhão' },
]

export default function Home() {
  const featuredEvent = events[0]

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-home.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F2744]/80 via-[#0F2744]/70 to-[#0F2744]/85" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.p custom={0} variants={fadeInUp} initial="hidden" animate="visible" className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#D4A843] font-medium mb-4">
            Bem-vindo ao Ministério
          </motion.p>
          <motion.h1 custom={1} variants={fadeInUp} initial="hidden" animate="visible" className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Tetelestai Missões
          </motion.h1>
          <motion.p custom={2} variants={fadeInUp} initial="hidden" animate="visible" className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Uma comunidade de fé, esperança e amor. Venha fazer parte da nossa família.
          </motion.p>
          <motion.div custom={3} variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-[#1A365D] hover:bg-white/90 gap-2 rounded-lg px-8">
              <Play className="w-4 h-4" />
              Assistir ao Culto
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 gap-2 rounded-lg px-8 bg-transparent">
              <MapPin className="w-4 h-4" />
              Visite-nos
            </Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Worship Times */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-3">Nossos Cultos</h2>
            <p className="text-[#4A5568]">Venha adorar conosco</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {worshipTimes.map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="text-center p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-0 pt-4">
                    <item.icon className="w-12 h-12 text-[#1A365D] mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-semibold text-[#1A202C] mb-1">{item.title}</h3>
                    <p className="text-sm font-medium text-[#E8532D] mb-2">{item.time}</p>
                    <p className="text-sm text-[#4A5568]">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-xl">
              <img src={featuredEvent.image} alt={featuredEvent.title} className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-xs uppercase tracking-wider text-[#E8532D] font-semibold">Próximo Evento</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mt-2 mb-4">{featuredEvent.title}</h2>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[#4A5568]">
                  <Calendar className="w-4 h-4 text-[#1A365D]" />
                  <span className="text-sm">{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[#4A5568]">
                  <Clock className="w-4 h-4 text-[#1A365D]" />
                  <span className="text-sm">{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[#4A5568]">
                  <MapPin className="w-4 h-4 text-[#1A365D]" />
                  <span className="text-sm">{featuredEvent.location}</span>
                </div>
              </div>
              <p className="text-[#4A5568] mb-6 leading-relaxed">{featuredEvent.description}</p>
              <Link to="/eventos">
                <Button className="bg-[#E8532D] hover:bg-[#d14820] text-white rounded-lg px-6">Inscreva-se Agora</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pastor Message */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
              <span className="text-xs uppercase tracking-wider text-[#D4A843] font-semibold">Palavra do Pastor</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mt-2 mb-6">Uma Mensagem Para Você</h2>
              <blockquote className="font-serif italic text-lg text-[#4A5568] leading-relaxed border-l-4 border-[#D4A843] pl-6 mb-4">
                "Bem-vindo à nossa família! Aqui você encontrará um lugar para crescer na fé, desenvolver relacionamentos genuínos e descobrir o propósito que Deus tem para sua vida."
              </blockquote>
              <p className="text-sm font-medium text-[#1A202C] mb-6">— Pr. Ricardo Silva</p>
              <Link to="/quem-somos">
                <Button variant="outline" className="border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white rounded-lg">
                  Conheça Nossa História
                </Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video group cursor-pointer">
                <img src="/placeholder-sermon.jpg" alt="Mensagem do Pastor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-[#1A365D] ml-1" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-[#718096] mt-3">Assista à mensagem de boas-vindas</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Series */}
      <section className="py-20 bg-[#0F2744] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs uppercase tracking-wider text-[#D4A843] font-semibold">Série Atual</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2 mb-3">Raízes Profundas</h2>
          <p className="text-white/70 mb-2">Uma jornada pelos fundamentos da fé cristã</p>
          <p className="text-white/60 max-w-xl mx-auto mb-8">Descubra como construir uma fé inabalável através do conhecimento profundo da Palavra de Deus.</p>
          <Link to="/midia">
            <Button className="bg-[#D4A843] hover:bg-[#B08A2F] text-[#0F2744] font-semibold rounded-lg px-8">
              Assistir à Série
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-3">Histórias de Transformação</h2>
            <p className="text-[#4A5568]">Veja como Deus tem transformado vidas em nossa comunidade</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} custom={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-0">
                    <span className="text-4xl text-[#D4A843] font-heading leading-none">"</span>
                    <p className="text-[#4A5568] italic leading-relaxed mb-6 -mt-2">{t.text}</p>
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-[#1A202C] text-sm">{t.name}</p>
                        <p className="text-xs text-[#718096]">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A365D]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} className="w-16 h-0.5 bg-[#D4A843] mx-auto mb-6" />
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">Você é Bem-vindo Aqui</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">Seja qual for sua história, há um lugar para você em nossa comunidade.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/quem-somos">
              <Button size="lg" className="bg-white text-[#1A365D] hover:bg-white/90 rounded-lg px-8">Quero Conhecer Mais</Button>
            </Link>
            <Link to="/contato">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-lg px-8 bg-transparent">Falar com um Pastor</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Floating Donation Button */}
      <Link to="/doacoes" className="fixed bottom-6 right-6 z-40">
        <motion.div whileHover={{ scale: 1.1 }} className="relative">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} className="absolute inset-0 bg-[#38A169] rounded-full opacity-40" />
          <Button size="icon" className="w-14 h-14 rounded-full bg-[#38A169] hover:bg-[#2F855A] text-white shadow-lg relative">
            <Heart className="w-6 h-6" />
          </Button>
        </motion.div>
      </Link>
    </div>
  )
}
