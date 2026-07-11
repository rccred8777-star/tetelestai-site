import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, FileText, ChevronLeft, ExternalLink, Loader2, CheckCircle,
  PlayCircle, GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { listCourses, listLessons, type Course, type Lesson } from '@/services/coursesDb'
import { listStudentCourseIds } from '@/services/enrollmentsDb'
import { getUserProgress, markLessonComplete } from '@/services/firestore'

// Renderizador simples de Markdown (títulos, negrito, listas) — sem libs extras.
function renderMarkdown(md: string) {
  const lines = (md || '').split('\n')
  return lines.map((raw, i) => {
    const line = raw.trimEnd()
    if (!line.trim()) return <div key={i} className="h-2" />
    const bold = (t: string) =>
      t.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={j} className="font-semibold text-[#1A202C]">{p.slice(2, -2)}</strong>
          : <span key={j}>{p}</span>)
    if (line.startsWith('### ')) return <h4 key={i} className="mt-4 mb-1 font-heading text-base font-bold text-[#1A365D]">{bold(line.slice(4))}</h4>
    if (line.startsWith('## ')) return <h3 key={i} className="mt-5 mb-2 font-heading text-lg font-bold text-[#1A365D]">{bold(line.slice(3))}</h3>
    if (line.startsWith('# ')) return <h2 key={i} className="mt-5 mb-2 font-heading text-xl font-bold text-[#1A365D]">{bold(line.slice(2))}</h2>
    if (/^[-*] /.test(line)) return <li key={i} className="ml-5 list-disc text-[#4A5568]">{bold(line.slice(2))}</li>
    return <p key={i} className="mb-2 text-[#4A5568]">{bold(line)}</p>
  })
}

export default function Cursos() {
  const { user, isAdmin } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState<string[]>([])

  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loadingLessons, setLoadingLessons] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const all = await listCourses()

        if (user) {
          // Admin enxerga todos os cursos. O membro ve apenas
          // aqueles em que foi matriculado.
          if (isAdmin) {
            setCourses(all)
          } else {
            const myIds = await listStudentCourseIds(user.uid)
            setCourses(all.filter((c) => myIds.includes(c.id)))
          }

          const p = await getUserProgress(user.uid)
          setCompleted(p.completedLessons || [])
        } else {
          setCourses([])
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [user, isAdmin])

  const openCourse = async (c: Course) => {
    setCourse(c); setLesson(null); setLoadingLessons(true)
    try { setLessons(await listLessons(c.id)) } finally { setLoadingLessons(false) }
  }

  const complete = async (l: Lesson) => {
    if (!user || !course) return
    try {
      await markLessonComplete(user.uid, course.id, l.id)
      setCompleted((prev) => (prev.includes(l.id) ? prev : [...prev, l.id]))
      toast.success('Aula concluída!')
    } catch (e) {
      toast.error('Erro ao marcar como concluída')
      console.error(e)
    }
  }

  const courseProgress = (c: Course, ls?: Lesson[]) => {
    const total = ls ? ls.length : (c.lessonCount ?? 0)
    if (!total) return 0
    const done = (ls || lessons).filter((l) => completed.includes(l.id)).length
    return Math.round((done / total) * 100)
  }

  // ------------------------- Detalhe de uma aula -------------------------
  if (lesson && course) {
    const isDone = completed.includes(lesson.id)
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <Button variant="ghost" size="sm" className="gap-1 text-[#1A365D]" onClick={() => setLesson(null)}>
          <ChevronLeft className="h-4 w-4" /> Voltar às aulas
        </Button>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="mb-1 text-xs text-[#718096]">{course.title} • Aula {lesson.order}</div>
              <CardTitle className="font-heading text-2xl">{lesson.title}</CardTitle>
              {lesson.verse && (
                <CardDescription className="mt-2 border-l-2 border-[#D4A843] pl-3 italic">
                  "{lesson.verseText}" — <span className="font-medium">{lesson.verse}</span>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-5">
              {lesson.videoUrl && (
                <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg bg-[#1A365D]/5 px-4 py-3 text-sm font-medium text-[#1A365D] hover:bg-[#1A365D]/10">
                  <PlayCircle className="h-5 w-5" /> Assistir vídeo da aula
                </a>
              )}

              <div className="text-sm leading-relaxed">{renderMarkdown(lesson.content || '')}</div>

              {(lesson.discussionQuestions?.length ?? 0) > 0 && (
                <div className="rounded-lg bg-[#F7FAFC] p-4">
                  <p className="mb-2 font-semibold text-[#1A202C]">Perguntas de discussão</p>
                  <ol className="ml-5 list-decimal space-y-1 text-sm text-[#4A5568]">
                    {lesson.discussionQuestions!.map((q, i) => <li key={i}>{q}</li>)}
                  </ol>
                </div>
              )}

              {lesson.practicalActivity && (
                <p className="text-sm text-[#4A5568]"><strong className="text-[#1A202C]">Atividade prática:</strong> {lesson.practicalActivity}</p>
              )}
              {lesson.homework && (
                <p className="text-sm text-[#4A5568]"><strong className="text-[#1A202C]">Tarefa de casa:</strong> {lesson.homework}</p>
              )}
              {lesson.memoryVerse && (
                <p className="rounded-lg border border-[#D4A843]/40 bg-[#D4A843]/5 p-3 text-sm italic text-[#4A5568]">{lesson.memoryVerse}</p>
              )}

              {(lesson.materials?.length ?? 0) > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 font-semibold text-[#1A202C]"><FileText className="h-4 w-4 text-[#C0561F]" /> Apostilas desta aula</p>
                  <div className="space-y-1.5">
                    {lesson.materials!.map((m, i) => (
                      <a key={i} href={m.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md border border-gray-100 px-3 py-2 text-sm hover:bg-[#F7FAFC]">
                        <FileText className="h-4 w-4 text-[#C0561F]" /> <span className="flex-1 truncate">{m.title}</span> <ExternalLink className="h-3.5 w-3.5 text-[#718096]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={() => complete(lesson)} disabled={isDone} className={isDone ? 'bg-[#38A169] hover:bg-[#38A169]' : 'bg-[#1A365D] hover:bg-[#1A365D]/90'}>
                <CheckCircle className="mr-1 h-4 w-4" /> {isDone ? 'Aula concluída' : 'Marcar como concluída'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // ------------------------- Detalhe de um curso -------------------------
  if (course) {
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <Button variant="ghost" size="sm" className="gap-1 text-[#1A365D]" onClick={() => { setCourse(null); setLessons([]) }}>
          <ChevronLeft className="h-4 w-4" /> Voltar aos cursos
        </Button>
        <Card className="overflow-hidden border-0 shadow-md">
          <div className="flex h-32 items-center justify-center" style={{ background: `linear-gradient(135deg, ${course.coverColor || '#1A365D'}, #2C5282)` }}>
            <GraduationCap className="h-14 w-14 text-white/25" />
          </div>
          <CardContent className="p-6">
            <h1 className="font-heading text-2xl font-bold text-[#1A202C]">{course.title}</h1>
            <p className="mt-1 text-sm text-[#4A5568]">{course.description}</p>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-[#718096]">
                <span>{courseProgress(course, lessons)}% concluído</span>
                <span>{lessons.filter((l) => completed.includes(l.id)).length}/{lessons.length} aulas</span>
              </div>
              <Progress value={courseProgress(course, lessons)} className="h-2" />
            </div>

            {(course.materials?.length ?? 0) > 0 && (
              <div className="mt-5">
                <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#1A202C]"><FileText className="h-4 w-4 text-[#C0561F]" /> Apostilas do curso</p>
                <div className="space-y-1.5">
                  {course.materials!.map((m, i) => (
                    <a key={i} href={m.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md border border-gray-100 px-3 py-2 text-sm hover:bg-[#F7FAFC]">
                      <FileText className="h-4 w-4 text-[#C0561F]" /> <span className="flex-1 truncate">{m.title}</span> <ExternalLink className="h-3.5 w-3.5 text-[#718096]" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 space-y-2">
              {loadingLessons ? (
                <div className="flex items-center justify-center py-8 text-[#718096]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando aulas...</div>
              ) : lessons.length === 0 ? (
                <p className="py-6 text-center text-sm text-[#718096]">Este curso ainda não tem aulas.</p>
              ) : lessons.map((l) => {
                const done = completed.includes(l.id)
                return (
                  <button key={l.id} onClick={() => setLesson(l)} className="flex w-full items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 text-left hover:bg-[#F7FAFC]">
                    {done ? <CheckCircle className="h-5 w-5 shrink-0 text-[#38A169]" /> : <div className="h-5 w-5 shrink-0 rounded-full border-2 border-[#D4A843]" />}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A365D]/10 text-[11px] font-bold text-[#1A365D]">{l.order}</span>
                    <span className="flex-1 truncate text-sm font-medium text-[#1A202C]">{l.title}</span>
                    {(l.materials?.length ?? 0) > 0 && <FileText className="h-4 w-4 shrink-0 text-[#C0561F]" />}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ------------------------- Lista de cursos -------------------------
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-1 flex items-center gap-2 text-sm text-[#718096]"><span>Dashboard</span><span>/</span><span>Cursos</span></div>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">Cursos e Materiais</h1>
        <p className="text-sm text-[#718096]">Sua jornada de discipulado e as apostilas de cada curso.</p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-[#718096]"><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Carregando cursos...</div>
      ) : courses.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="py-14 text-center">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-[#4A5568]">Você ainda não está matriculado em nenhum curso.</p>
            <p className="mt-1 text-xs text-[#718096]">
              Fale com a liderança da igreja para ser incluído em uma turma.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <button key={c.id} onClick={() => openCourse(c)} className="group overflow-hidden rounded-xl border-0 bg-white text-left shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-28 items-center justify-center" style={{ background: `linear-gradient(135deg, ${c.coverColor || '#1A365D'}, #2C5282)` }}>
                <GraduationCap className="h-12 w-12 text-white/25" />
              </div>
              <div className="p-4">
                <p className="font-heading font-bold text-[#1A202C]">{c.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-[#718096]">{c.description}</p>
                <div className="mt-3 flex items-center gap-2">
                  {c.category && <Badge variant="outline" className="text-[10px]">{c.category}</Badge>}
                  <Badge variant="outline" className="text-[10px]"><BookOpen className="mr-1 h-3 w-3" />{c.lessonCount ?? 0} aulas</Badge>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
