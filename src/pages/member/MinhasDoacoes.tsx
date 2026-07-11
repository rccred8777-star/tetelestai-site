import { motion } from 'framer-motion'
import { TrendingUp, Repeat, Heart, Download, Edit, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { givingHistory, campaigns } from '@/data/mock'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.5 } }) }

export default function MinhasDoacoes() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-sm text-[#718096] mb-2"><span>Dashboard</span><span>/</span><span>Minhas Doações</span></div>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Minhas Doações</h1>
        <p className="text-sm text-[#718096]">Acompanhe suas contribuições</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[{ icon: TrendingUp, title: 'Total 2026', value: 'R$ 3.240,00', change: '+15% vs 2025', color: 'text-[#38A169]' }, { icon: Repeat, title: 'Dízimos', value: 'R$ 2.400,00', change: '12 de 12 contribuições', color: 'text-[#1A365D]' }, { icon: Heart, title: 'Ofertas Especiais', value: 'R$ 840,00', change: '3 campanhas apoiadas', color: 'text-[#E8532D]' }].map((card, i) => (
          <motion.div key={card.title} custom={i} variants={fadeInUp} initial="hidden" animate="visible">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#38A169]/10 flex items-center justify-center"><card.icon className="w-5 h-5 text-[#38A169]" /></div>
                </div>
                <p className="text-2xl font-bold text-[#1A202C]">{card.value}</p>
                <p className="text-sm font-medium text-[#1A202C]">{card.title}</p>
                <p className={`text-xs mt-1 ${card.color}`}>{card.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Giving History */}
      <motion.div custom={3} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Histórico de Doações</CardTitle><Badge variant="outline">2026</Badge></CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100"><th className="text-left py-2 px-3 text-[#718096] font-medium">Data</th><th className="text-left py-2 px-3 text-[#718096] font-medium">Tipo</th><th className="text-left py-2 px-3 text-[#718096] font-medium">Valor</th><th className="text-left py-2 px-3 text-[#718096] font-medium">Destino</th><th className="text-right py-2 px-3 text-[#718096] font-medium"></th></tr></thead>
                <tbody>
                  {givingHistory.map((g) => (
                    <tr key={g.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F7FAFC]">
                      <td className="py-3 px-3 text-[#1A202C]">{g.date}</td>
                      <td className="py-3 px-3"><Badge variant="outline" className={g.type === 'Dízimo' ? 'text-[#1A365D]' : 'text-[#E8532D]'}>{g.type}</Badge></td>
                      <td className="py-3 px-3 font-medium text-[#1A202C]">{g.amount}</td>
                      <td className="py-3 px-3 text-[#4A5568]">{g.destination}</td>
                      <td className="py-3 px-3 text-right"><Button size="icon" variant="ghost" className="w-7 h-7 text-[#718096] hover:text-[#1A365D]" onClick={() => alert('Baixando comprovante...')}><Download className="w-4 h-4" /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#718096] mt-3">Mostrando 5 de 47 doações</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recurring Giving */}
      <motion.div custom={4} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Repeat className="w-5 h-5 text-[#1A365D]" />Doações Recorrentes</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#F7FAFC] rounded-lg">
              <div>
                <p className="font-medium text-[#1A202C]">Dízimo Mensal</p>
                <p className="text-sm text-[#4A5568]">R$ 200,00/mês • Próxima: 10 Fev 2026</p>
                <div className="flex items-center gap-2 mt-1"><Badge className="bg-[#38A169] text-white hover:bg-[#38A169] text-[10px]">Ativo</Badge><span className="text-xs text-[#718096]">Cartão ****4242</span></div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Edit className="w-3 h-3" />Editar</Button>
                <Button size="sm" variant="outline" className="gap-1"><Pause className="w-3 h-3" />Pausar</Button>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full gap-2 border-dashed">+ Nova Doação Recorrente</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Campaigns */}
      <motion.div custom={5} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-md">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Heart className="w-5 h-5 text-[#E8532D]" />Campanhas que Apoio</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="grid sm:grid-cols-2 gap-6">
              {campaigns.map((c) => (
                <div key={c.id} className="border border-gray-100 rounded-xl p-5">
                  <h3 className="font-heading text-lg font-semibold text-[#1A202C] mb-2">{c.name}</h3>
                  <p className="text-sm text-[#4A5568] mb-4">{c.description}</p>
                  <Progress value={(c.current / c.goal) * 100} className="h-2 mb-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#1A365D] font-medium">{Math.round((c.current / c.goal) * 100)}%</span>
                    <span className="text-[#718096]">R$ {c.current.toLocaleString()} / R$ {c.goal.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
