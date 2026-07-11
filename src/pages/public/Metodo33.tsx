import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  BookOpen, Users, Target, ChevronRight, Play, Flame,
  Heart, MessageCircle, CheckCircle, ArrowRight, Star,
  Quote, Clock, Globe, Church, TrendingUp,
  Award, Share2, Brain
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                         */
/* ------------------------------------------------------------------ */

const tercos = [
  {
    id: 1,
    nome: 'Comunhão e Adoração',
    subtitulo: 'Looking Back — Volte a Deus',
    cor: 'bg-green-600',
    corLight: 'bg-green-50',
    corText: 'text-green-600',
    corBorder: 'border-green-200',
    icon: Heart,
    tempo: '35 min',
    elementos: [
      'Conexão pessoal (10 min)',
      'Adoração (15 min)',
      'Accountability (10 min)',
    ],
    descricao:
      'O primeiro terço foca em restaurar a intimidade com Deus e uns com os outros. Começamos com conexão pessoal, adoramos juntos e praticamos o accountability — a transparência que nos mantém firmes no caminho.',
  },
  {
    id: 2,
    nome: 'Palavra e Discipulado',
    subtitulo: 'Looking Up — Volte à Palavra',
    cor: 'bg-yellow-500',
    corLight: 'bg-yellow-50',
    corText: 'text-yellow-600',
    corBorder: 'border-yellow-200',
    icon: BookOpen,
    tempo: '30 min',
    elementos: [
      'Estudo bíblico participativo',
      'Uma lição por vez',
      'Ponto de obediência',
    ],
    descricao:
      'O segundo terço mergulha na Palavra de Deus. Cada lição é estudada de forma participativa, onde todos compartilham o que ouviram de Deus. Terminamos com um ponto de obediência — algo concreto para viver na semana.',
  },
  {
    id: 3,
    nome: 'Testemunho e Missão',
    subtitulo: 'Looking Ahead — Vá e Faça',
    cor: 'bg-red-600',
    corLight: 'bg-red-50',
    corText: 'text-red-600',
    corBorder: 'border-red-200',
    icon: Globe,
    tempo: '25 min',
    elementos: [
      'Prática evangelística (15 min)',
      'Metas de evangelismo (5 min)',
      'Oração de envio (5 min)',
    ],
    descricao:
      'O terceiro terço coloca a fé em ação. Praticamos como compartilhar o evangelho, estabelecemos metas de evangelismo para a semana e somos enviados em oração para ser Jesus onde quer que estejamos.',
  },
]

const licoes = [
  { id: 1, titulo: 'Testemunho Pessoal Tetelestai', versiculo: 'Ap 12:11', proposito: 'Evangelismo', valor: 'Missão', icone: Flame },
  { id: 2, titulo: 'Certeza da Salvação', versiculo: '1Jo 5:13', proposito: 'Discipulado', valor: 'Palavra de Deus', icone: CheckCircle },
  { id: 3, titulo: 'Perdão e Restauração', versiculo: 'Ef 4:32', proposito: 'Comunhão', valor: 'Unidade', icone: Heart },
  { id: 4, titulo: 'Vida de Oração', versiculo: 'Mt 6:9-13', proposito: 'Adoração', valor: 'Oração', icone: MessageCircle },
  { id: 5, titulo: 'Palavra de Deus', versiculo: '2Tm 3:16', proposito: 'Discipulado', valor: 'Palavra de Deus', icone: BookOpen },
  { id: 6, titulo: 'Igreja em Comunhão', versiculo: 'At 2:42-47', proposito: 'Comunhão', valor: 'Unidade', icone: Users },
  { id: 7, titulo: 'O Espírito Santo e o Avivamento', versiculo: 'At 1:8', proposito: 'Adoração', valor: 'Missão', icone: Flame },
  { id: 8, titulo: 'Santidade e Excelência', versiculo: '1Pe 1:15-16', proposito: 'Discipulado', valor: 'Santidade', icone: Star },
  { id: 9, titulo: 'Multiplicação — Faça Discípulos', versiculo: 'Mt 28:18-20', proposito: 'Evangelismo', valor: 'Multiplicação', icone: TrendingUp },
]

const resultados = [
  { numero: '1.7M', label: 'Pessoas batizadas', icone: DropletsIcon, descricao: 'Vidas transformadas pelo evangelho em todo o mundo' },
  { numero: '150.000', label: 'Igrejas plantadas', icone: Church, descricao: 'Novas comunidades de fé estabelecidas globalmente' },
  { numero: '200+', label: 'Países alcançados', icone: Globe, descricao: 'O método é praticado em todos os continentes' },
  { numero: '100%', label: 'Reprodutível', icone: Share2, descricao: 'Qualquer pessoa pode liderar e multiplicar' },
]

const depoimentos = [
  {
    nome: 'Pr. Ricardo Oliveira',
    papel: 'Plantador de Igrejas — Brasil',
    texto: 'O Método 3/3 transformou nossa igreja. Em 18 meses, passamos de 30 pessoas para 12 grupos multiplicando discípulos ativamente.',
  },
  {
    nome: 'Maria Fernanda',
    papel: 'Líder de Célula — Portugal',
    texto: 'Pela primeira vez, todos na nossa célula estão compartilhando o evangelho. O accountability nos mantém verdadeiramente comprometidos.',
  },
  {
    nome: 'Pr. James Chen',
    papel: 'Coordenador de Missões — Ásia',
    texto: 'Treinamos mais de 500 líderes usando o 3/3. O resultado é uma rede de igrejas saudáveis que se auto-reproduzem.',
  },
]

const perguntasFrequentes = [
  {
    pergunta: 'Quanto tempo dura cada encontro 3/3?',
    resposta: 'Cada encontro dura aproximadamente 90 minutos, divididos em três terços de 30-35 minutos cada. A estrutura é flexível e pode ser adaptada ao contexto.',
  },
  {
    pergunta: 'Preciso ser líder para facilitar?',
    resposta: 'Não! O Método 3/3 foi projetado para ser 100% reprodutível. Qualquer pessoa que tenha completado as 9 lições pode facilitar um grupo e treinar outros.',
  },
  {
    pergunta: 'Quantas pessoas precisam para começar?',
    resposta: 'Você pode começar com apenas 2-3 pessoas. O ideal é um grupo de 4-12 participantes para manter a intimidade e a participação de todos.',
  },
  {
    pergunta: 'Onde posso fazer o curso?',
    resposta: 'Você pode acessar o curso completo online pela Área de Membros do Tetelestai ou participar de um grupo presencial em uma de nossas células.',
  },
]

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function DropletsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 10.89 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  )
}

function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CountUp({ target, duration = 2000 }: { target: string; duration?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState('0')

  useEffect(() => {
    if (!isInView) return

    const numericPart = target.replace(/[^0-9.]/g, '')
    const suffix = target.replace(/[0-9.]/g, '')
    const targetNum = parseFloat(numericPart)
    if (isNaN(targetNum)) {
      setCount(target)
      return
    }

    const startTime = Date.now()
    const decimals = numericPart.includes('.') ? numericPart.split('.')[1].length : 0

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = (targetNum * eased).toFixed(decimals)

      const formatted = current.includes('.')
        ? current.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : Math.round(Number(current)).toLocaleString()

      setCount(formatted + suffix)

      if (progress >= 1) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}</span>
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function Metodo33() {
  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(null)
  const [tercoAtivo, setTercoAtivo] = useState(1)

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="relative min-h-[92dvh] flex items-center justify-center overflow-hidden bg-[#0F2744]">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,168,67,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-32 -top-32 w-[500px] h-[500px] border border-[#D4A843]/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute -left-24 -bottom-24 w-[400px] h-[400px] border border-[#D4A843]/10 rounded-full"
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#D4A843]/20 text-[#D4A843] border-[#D4A843]/30 hover:bg-[#D4A843]/30 mb-6 text-sm px-4 py-1.5">
              <Target className="w-3.5 h-3.5 mr-1.5" />
              Discipulado Multiplicativo
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Método{' '}
            <span className="text-[#D4A843]">3/3</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            Um método simples, reprodutível e bíblico para fazer discípulos
            que fazem discípulos — transformando o mundo, um grupo de três de cada vez.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link to="/login">
              <Button size="lg" className="bg-[#D4A843] hover:bg-[#B8922E] text-[#0F2744] font-semibold gap-2 rounded-lg px-8 text-base">
                <BookOpen className="w-5 h-5" />
                Começar o Curso
              </Button>
            </Link>
            <a href="#tercos">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 rounded-lg px-8 text-base bg-transparent">
                <Play className="w-5 h-5" />
                Conheça o Método
              </Button>
            </a>
          </motion.div>

          {/* Stats hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
          >
            {[
              { num: '1.7M', label: 'Batizados' },
              { num: '150K', label: 'Igrejas' },
              { num: '200+', label: 'Países' },
              { num: '9', label: 'Lições' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[#D4A843]">{s.num}</div>
                <div className="text-xs sm:text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronRight className="w-6 h-6 text-white/40 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ O QUE É O MÉTODO 3/3 ═══════════════════ */}
      <section className="py-20 lg:py-28 bg-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="outline" className="text-[#1A365D] border-[#1A365D]/30 mb-4">
                <Brain className="w-3.5 h-3.5 mr-1.5" />
                Fundamento
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-4">
                O que é o Método 3/3?
              </h2>
              <p className="text-[#4A5568] max-w-2xl mx-auto text-lg leading-relaxed">
                O Método 3/3 é uma ferramenta de discipulado que divide o encontro em três partes iguais,
                baseada no modelo de Jesus com seus discípulos.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A202C] text-lg mb-1">Comunhão e Adoração</h3>
                    <p className="text-[#4A5568]">Conexão pessoal, adoração e accountability mantêm o grupo unido e focado em Deus.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A202C] text-lg mb-1">Palavra e Discipulado</h3>
                    <p className="text-[#4A5568]">Estudo bíblico participativo onde cada pessoa descobre o que Deus está dizendo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A202C] text-lg mb-1">Testemunho e Missão</h3>
                    <p className="text-[#4A5568]">Prática evangelística e metas de evangelismo para levar o gospel a todos.</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-[#1A365D]/5 rounded-xl border-l-4 border-[#D4A843]">
                  <p className="text-[#1A365D] font-medium text-sm italic">
                    "O Método 3/3 não é apenas um estudo — é um estilo de vida de discipulado
                    que transforma consumidores em multiplicadores."
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-[#1A202C] mb-6 text-center">
                  Estrutura do Encontro
                </h3>
                <div className="space-y-4">
                  {[
                    { label: '1º Terço — Comunhão', cor: 'bg-green-500', width: 'w-full', tempo: '35 min' },
                    { label: '2º Terço — Palavra', cor: 'bg-yellow-500', width: 'w-full', tempo: '30 min' },
                    { label: '3º Terço — Missão', cor: 'bg-red-500', width: 'w--[85%]', tempo: '25 min' },
                  ].map((barra) => (
                    <div key={barra.label} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-[#1A202C]">{barra.label}</span>
                        <span className="text-[#4A5568]">{barra.tempo}</span>
                      </div>
                      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full ${barra.cor} rounded-lg`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t text-center">
                  <span className="text-sm text-[#4A5568]">Tempo total: </span>
                  <span className="font-bold text-[#1A365D]">90 minutos</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ OS 3 TERÇOS ═══════════════════════════ */}
      <section id="tercos" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="outline" className="text-[#D4A843] border-[#D4A843]/40 mb-4">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                Estrutura
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-4">
                Os 3 Terços
              </h2>
              <p className="text-[#4A5568] max-w-2xl mx-auto text-lg">
                Cada encontro é dividido em três partes — uma jornada de olhar para trás,
                olhar para cima e olhar para frente.
              </p>
            </div>
          </FadeIn>

          {/* Tabs for desktop */}
          <div className="hidden md:block">
            <div className="flex justify-center gap-2 mb-10">
              {tercos.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTercoAtivo(t.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                    tercoAtivo === t.id
                      ? `${t.cor} text-white shadow-lg`
                      : 'bg-gray-100 text-[#4A5568] hover:bg-gray-200'
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.nome}
                </button>
              ))}
            </div>

            <FadeIn key={tercoAtivo} delay={0} direction="up">
              {tercos.map((t) => t.id === tercoAtivo && (
                <Card key={t.id} className={`${t.corLight} border-0 shadow-lg overflow-hidden`}>
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2">
                      <div className="p-8 lg:p-10">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${t.cor} text-white text-xs font-medium mb-4`}>
                          <Clock className="w-3 h-3" />
                          {t.tempo}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-[#1A202C] mb-2">{t.nome}</h3>
                        <p className={`text-sm font-medium ${t.corText} mb-4`}>{t.subtitulo}</p>
                        <p className="text-[#4A5568] mb-6 leading-relaxed">{t.descricao}</p>
                        <div className="space-y-3">
                          {t.elementos.map((el, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <CheckCircle className={`w-5 h-5 ${t.corText}`} />
                              <span className="text-[#1A202C] font-medium">{el}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={`${t.cor} p-8 lg:p-10 flex flex-col items-center justify-center text-white`}>
                        <t.icon className="w-20 h-20 mb-6 opacity-80" />
                        <h4 className="font-heading text-xl font-bold mb-2 text-center">{t.subtitulo}</h4>
                        <div className="flex gap-2 mt-4">
                          {t.elementos.map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full bg-white/40" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </FadeIn>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-6">
            {tercos.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.1}>
                <Card className={`${t.corLight} border-0 shadow-lg overflow-hidden`}>
                  <CardContent className="p-0">
                    <div className={`${t.cor} p-6 text-white`}>
                      <div className="flex items-center gap-3 mb-2">
                        <t.icon className="w-8 h-8" />
                        <div>
                          <h3 className="font-heading text-xl font-bold">{t.nome}</h3>
                          <p className="text-white/80 text-sm">{t.subtitulo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-white/70 mt-2">
                        <Clock className="w-3.5 h-3.5" />
                        {t.tempo}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-[#4A5568] mb-4 text-sm leading-relaxed">{t.descricao}</p>
                      <div className="space-y-2.5">
                        {t.elementos.map((el, j) => (
                          <div key={j} className="flex items-center gap-2.5">
                            <CheckCircle className={`w-4 h-4 ${t.corText}`} />
                            <span className="text-sm text-[#1A202C]">{el}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ 9 LIÇÕES ═══════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="outline" className="text-[#1A365D] border-[#1A365D]/30 mb-4">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                Conteúdo do Curso
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-4">
                9 Lições para Transformar
              </h2>
              <p className="text-[#4A5568] max-w-2xl mx-auto text-lg">
                Cada lição é projetada para ser simples, aplicável e reprodutível.
                Complete todas para se tornar um multiplicador.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {licoes.map((licao, i) => {
              const propositoCores: Record<string, string> = {
                Evangelismo: 'bg-orange-100 text-orange-700',
                Discipulado: 'bg-blue-100 text-blue-700',
                Comunhão: 'bg-purple-100 text-purple-700',
                Adoração: 'bg-pink-100 text-pink-700',
              }

              return (
                <FadeIn key={licao.id} delay={i * 0.07}>
                  <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                      <CardContent className="p-0">
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#1A365D]/10 flex items-center justify-center group-hover:bg-[#1A365D] transition-colors">
                              <licao.icone className="w-6 h-6 text-[#1A365D] group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-3xl font-bold text-gray-200 font-heading">
                              {String(licao.id).padStart(2, '0')}
                            </span>
                          </div>
                          <h3 className="font-heading text-lg font-bold text-[#1A202C] mb-2">
                            {licao.titulo}
                          </h3>
                          <p className="text-sm text-[#D4A843] font-medium mb-3">
                            {licao.versiculo}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={`text-xs ${propositoCores[licao.proposito] || 'bg-gray-100 text-gray-700'}`}>
                              {licao.proposito}
                            </Badge>
                            <Badge variant="outline" className="text-xs text-[#718096] border-gray-200">
                              {licao.valor}
                            </Badge>
                          </div>
                        </div>
                        <div className="px-5 py-3 bg-gray-50 border-t flex items-center justify-between">
                          <span className="text-xs text-[#718096]">Lição {licao.id} de 9</span>
                          <ArrowRight className="w-4 h-4 text-[#D4A843] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ RESULTADOS ═══════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0F2744] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4A843 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="bg-[#D4A843]/20 text-[#D4A843] border-[#D4A843]/30 mb-4">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                Impacto Global
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                Resultados que Falam
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                O Método 3/3 está transformando igrejas e comunidades em todo o mundo.
                Estes são números reais do movimento.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resultados.map((r, i) => (
              <FadeIn key={r.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="text-center"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#D4A843]/30 transition-colors">
                    <r.icone className="w-10 h-10 text-[#D4A843] mx-auto mb-4" />
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2 font-heading">
                      <CountUp target={r.numero} />
                    </div>
                    <div className="text-white font-medium mb-1">{r.label}</div>
                    <div className="text-white/40 text-sm">{r.descricao}</div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ DEPOIMENTOS ═══════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="outline" className="text-[#D4A843] border-[#D4A843]/40 mb-4">
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                Testemunhos
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-4">
                Vidas Transformadas
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {depoimentos.map((d, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <Card className="h-full border-0 shadow-lg">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-8 h-8 text-[#D4A843]/30 mb-4" />
                    <p className="text-[#4A5568] leading-relaxed flex-1 mb-6">
                      "{d.texto}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full bg-[#1A365D] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {d.nome.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-[#1A202C] text-sm">{d.nome}</div>
                        <div className="text-xs text-[#718096]">{d.papel}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ FAQ ═══════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#F7FAFC]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-[#1A365D] border-[#1A365D]/30 mb-4">
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                Perguntas Frequentes
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A202C] mb-4">
                Dúvidas Comuns
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {perguntasFrequentes.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <button
                    onClick={() => setPerguntaAberta(perguntaAberta === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="font-medium text-[#1A202C] pr-4">{faq.pergunta}</span>
                    <motion.div
                      animate={{ rotate: perguntaAberta === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronRight className="w-5 h-5 text-[#D4A843]" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: perguntaAberta === i ? 'auto' : 0,
                      opacity: perguntaAberta === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-[#4A5568] leading-relaxed">
                      {faq.resposta}
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ COMECE AGORA ═══════════════════════════ */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#1A365D] via-[#0F2744] to-[#1A365D] relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A843]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#38A169]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <FadeIn>
            <Badge className="bg-white/10 text-white border-white/20 mb-6">
              <Award className="w-3.5 h-3.5 mr-1.5" />
              Comece sua Jornada
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto para Fazer
              <span className="text-[#D4A843]"> Discípulos</span>?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Acesse o curso completo do Método 3/3 na nossa Área de Membros.
              Aprenda, pratique e multiplique — tudo gratuitamente.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-[#D4A843] hover:bg-[#B8922E] text-[#0F2744] font-semibold gap-2 rounded-lg px-10 text-base">
                  <BookOpen className="w-5 h-5" />
                  Acessar Curso 3/3
                </Button>
              </Link>
              <Link to="/celulas">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 rounded-lg px-8 text-base bg-transparent">
                  <Users className="w-5 h-5" />
                  Encontrar uma Célula
                </Button>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4A843]" />
                100% Gratuito
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4A843]" />
                Online ou Presencial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4A843]" />
                Certificado de Conclusão
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
