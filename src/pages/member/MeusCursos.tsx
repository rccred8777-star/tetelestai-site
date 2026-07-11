import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Play, CheckCircle, ChevronDown, ChevronUp, Trophy, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { courses } from '@/data/mock'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const levels = ['Fundamentos', 'Crescimento', 'Liderança', 'Ministério', 'Multiplicação']

export default function MeusCursos() {
  const [openModule, setOpenModule] = useState<number | null>(2)
  const activeCourse = courses[0]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-sm text-[#718096] mb-2"><span>Dashboard</span><span>/</span><span>Meus Cursos</span></div>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Meus Cursos</h1>
        <p className="text-sm text-[#718096]">Sua jornada de discipulado</p>
      </motion.div>

      {/* Level Progress */}
      <motion.div custom={0} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-[#D4A843] text-[#0F2744] hover:bg-[#D4A843]">Nível Atual: Crescimento</Badge>
            </div>
            <p className="text-sm text-[#4A5568] mb-4">3 de 5 cursos concluídos neste nível</p>
            <div className="flex items-center gap-2 sm:gap-4">
              {levels.map((level, i) => (
                <div key={level} className="flex-1 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${i < 2 ? 'bg-[#1A365D] text-white' : i === 2 ? 'bg-[#D4A843] text-[#0F2744] ring-4 ring-[#D4A843]/20' : 'bg-[#EDF2F7] text-[#718096]'}`}>
                    {i < 2 ? <CheckCircle className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs text-center leading-tight ${i <= 2 ? 'text-[#1A202C] font-medium' : 'text-[#718096]'}`}>{level}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Course */}
      <motion.div custom={1} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-[#1A365D] to-[#2C5282] flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white/20" />
          </div>
          <CardContent className="p-6">
            <h2 className="font-heading text-2xl font-bold text-[#1A202C] mb-2">{activeCourse.title}</h2>
            <p className="text-[#4A5568] mb-4">{activeCourse.description}</p>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#1A365D] font-medium">{activeCourse.progress}% concluído</span>
              <span className="text-[#718096]">{activeCourse.completedModules} de {activeCourse.totalModules} módulos</span>
            </div>
            <Progress value={activeCourse.progress} className="h-2.5 mb-6" />

            {/* Modules */}
            <div className="space-y-2">
              {activeCourse.modules.map((mod) => (
                <div key={mod.id} className="border border-gray-100 rounded-lg overflow-hidden">
                  <button onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)} className="w-full flex items-center justify-between p-4 hover:bg-[#F7FAFC] transition-colors">
                    <div className="flex items-center gap-3">
                      {mod.completed ? <CheckCircle className="w-5 h-5 text-[#38A169]" /> : <div className="w-5 h-5 rounded-full border-2 border-[#D4A843]" />}
                      <span className="font-medium text-[#1A202C]">{mod.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {mod.completed && <Badge variant="outline" className="text-[10px] text-[#38A169] border-[#38A169]">Concluído</Badge>}
                      {openModule === mod.id ? <ChevronUp className="w-4 h-4 text-[#718096]" /> : <ChevronDown className="w-4 h-4 text-[#718096]" />}
                    </div>
                  </button>
                  {openModule === mod.id && (
                    <div className="border-t border-gray-50">
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id} className={`flex items-center gap-3 px-4 py-3 hover:bg-[#F7FAFC] transition-colors ${!lesson.completed ? 'bg-[#D4A843]/5' : ''}`}>
                          {lesson.completed ? <CheckCircle className="w-4 h-4 text-[#38A169] shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-[#D4A843] shrink-0" />}
                          <span className="flex-1 text-sm text-[#1A202C]">{lesson.title}</span>
                          <span className="text-xs text-[#718096]">{lesson.duration}</span>
                          <Button size="icon" variant="ghost" className="w-7 h-7 text-[#1A365D]"><Play className="w-4 h-4" /></Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Completed Courses */}
      <motion.div custom={2} variants={fadeInUp} initial="hidden" animate="visible">
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Trophy className="w-5 h-5 text-[#D4A843]" />Cursos Concluídos</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="grid sm:grid-cols-2 gap-4">
              {courses.slice(1, 2).map(c => (
                <div key={c.id} className="flex items-center gap-4 p-4 bg-[#F7FAFC] rounded-lg">
                  <div className="w-14 h-14 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0"><BookOpen className="w-6 h-6 text-[#1A365D]" /></div>
                  <div className="flex-1"><p className="font-medium text-[#1A202C]">{c.title}</p><p className="text-xs text-[#718096]">{c.totalModules * 3} aulas • Concluído Dez 2025</p></div>
                  <Button size="sm" variant="outline" className="shrink-0"><Download className="w-3 h-3 mr-1" />Certificado</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
