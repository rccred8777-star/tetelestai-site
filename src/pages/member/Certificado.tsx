import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader2, Printer, ChevronLeft, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { getCourse, listLessons, type Course } from '@/services/coursesDb'
import { getCourseCompletion } from '@/services/firestore'

export default function Certificado() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const nome = profile?.displayName || user?.displayName || 'Membro'

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    (async () => {
      if (!user || !courseId) return
      try {
        const [c, ls, done] = await Promise.all([
          getCourse(courseId), listLessons(courseId), getCourseCompletion(user.uid, courseId),
        ])
        setCourse(c)
        setOk(ls.length > 0 && ls.every((l) => done.includes(l.id)))
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    })()
  }, [user, courseId])

  const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  if (loading) {
    return <div className="flex items-center justify-center py-24 text-[#718096]"><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando...</div>
  }

  if (!course || !ok) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <Award className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <p className="text-[#4A5568]">Você ainda não concluiu este curso, então o certificado não está disponível.</p>
        <Button variant="outline" className="mt-4 gap-1" onClick={() => navigate('/cursos')}>
          <ChevronLeft className="h-4 w-4" /> Voltar aos cursos
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {/* Barra de ações — some na impressão */}
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" size="sm" className="gap-1 text-[#1A365D]" onClick={() => navigate('/cursos')}>
          <ChevronLeft className="h-4 w-4" /> Voltar
        </Button>
        <Button onClick={() => window.print()} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
          <Printer className="h-4 w-4" /> Imprimir / Salvar PDF
        </Button>
      </div>

      {/* Certificado */}
      <div className="certificado mx-auto bg-white p-2">
        <div className="relative border-[3px] border-[#1A365D] p-10 text-center" style={{ background: 'linear-gradient(180deg,#ffffff,#F7FAFC)' }}>
          <div className="pointer-events-none absolute inset-2 border border-[#D4A843]/60" />

          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D4A843]">Ministério Tetelestai Missões</p>
          <h1 className="mt-6 font-heading text-4xl font-bold text-[#1A365D]">Certificado de Conclusão</h1>
          <div className="mx-auto my-5 h-0.5 w-20 bg-[#D4A843]" />

          <p className="text-sm text-[#4A5568]">Certificamos que</p>
          <p className="mt-2 font-heading text-3xl font-bold text-[#1A202C]">{nome}</p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#4A5568]">
            concluiu com aproveitamento todas as lições e provas do curso
          </p>
          <p className="mt-2 font-heading text-xl font-semibold text-[#1A365D]">{course.title}</p>

          <p className="mt-8 text-xs text-[#718096]">Emitido em {hoje}</p>

          <div className="mt-10 flex items-end justify-center gap-16">
            <div className="text-center">
              <div className="mx-auto w-48 border-t border-[#1A202C] pt-1 text-[11px] text-[#4A5568]">Pastor Responsável</div>
            </div>
            <div className="text-center">
              <div className="mx-auto w-48 border-t border-[#1A202C] pt-1 text-[11px] text-[#4A5568]">Coordenação de Ensino</div>
            </div>
          </div>

          <p className="mt-8 font-serif text-sm italic text-[#D4A843]">"Tetelestai — Está consumado." (João 19:30)</p>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body * { visibility: hidden; }
          .certificado, .certificado * { visibility: visible; }
          .certificado { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  )
}
