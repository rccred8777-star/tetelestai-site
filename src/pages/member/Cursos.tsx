import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen, FileText, ChevronLeft, ExternalLink, Loader2, CheckCircle,
  PlayCircle, GraduationCap, Lock, Clock, UserPlus, Award, XCircle, RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { listCourses, listLessons, type Course, type Lesson } from '@/services/coursesDb'
import {
  listStudentEnrollments, requestEnrollment, cancelRequest,
  type EnrollmentStatus,
} from '@/services/enrollmentsDb'
import { getUserProgress, markLessonComplete, recordQuizResult, QUIZ_PASS_PCT } from '@/services/firestore'

// ============================ Prova / Quiz ============================
function LessonQuiz({ lesson, onPass }: { lesson: Lesson; onPass: (score: number) => void }) {
  const quiz = lesson.quiz || []
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null)

  const responder = (qi: number, oi: number) => {
    if (result) return
    setAnswers((a) => ({ ...a, [qi]: oi }))
  }

  const corrigir = () => {
    if (Object.keys(answers).length < quiz.length) {
      toast.error('Responda todas as perguntas antes de corrigir.')
      return
    }
    const acertos = quiz.filter((q, i) => answers[i] === q.correctIndex).length
    const score = Math.round((acertos / quiz.length) * 100)
    const passed = score >= QUIZ_PASS_PCT
    setResult({ score, passed })
    if (passed) onPass(score)
  }

  const refazer = () => { setAnswers({}); setResult(null) }

  return (
    <div className="rounded-lg border border-[#1A365D]/15 bg-white p-4">
      <p className="mb-1 flex items-center gap-1.5 font-semibold text-[#1A365D]">
        <Award className="h-4 w-4" /> Prova da lição
      </p>
      <p className="mb-4 text-xs text-[#718096]">
        {quiz.length} pergunta(s). Você precisa de {QUIZ_PASS_PCT}% para concluir a lição.
      </p>

      <div className="space-y-4">
        {quiz.map((q, qi) => (
          <div key={qi}>
            <p className="mb-2 text-sm font-medium text-[#1A202C]">{qi + 1}. {q.question}</p>
            <div className="space-y-1.5">
              {q.options.map((op, oi) => {
                const escolhida = answers[qi] === oi
                const correta = result && oi === q.correctIndex
                const erradaEscolhida = result && escolhida && oi !== q.correctIndex
                return (
                  <button
                    key={oi}
                    onClick={() => responder(qi, oi)}
                    disabled={!!result}
                    className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                      correta ? 'border-[#38A169] bg-[#38A169]/10 text-[#276749]'
                      : erradaEscolhida ? 'border-red-300 bg-red-50 text-red-700'
                      : escolhida ? 'border-[#1A365D] bg-[#1A365D]/5'
                      : 'border-gray-200 hover:bg-[#F7FAFC]'}`}
                  >
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${escolhida || correta ? 'border-current' : 'border-gray-300'}`}>
                      {correta && <CheckCircle className="h-4 w-4" />}
                      {erradaEscolhida && <XCircle className="h-4 w-4" />}
                    </span>
                    {op}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {result ? (
        <div className="mt-4 space-y-3">
          <div className={`rounded-lg px-4 py-3 text-sm font-medium ${result.passed ? 'bg-[#38A169]/10 text-[#276749]' : 'bg-red-50 text-red-700'}`}>
            {result.passed
              ? `Aprovado! Você acertou ${result.score}%. Lição concluída.`
              : `Você fez ${result.score}%. Precisa de ${QUIZ_PASS_PCT}%. Reveja o conteúdo e tente de novo.`}
          </div>
          {!result.passed && (
            <Button variant="outline" onClick={refazer} className="gap-1">
              <RotateCcw className="h-4 w-4" /> Refazer a prova
            </Button>
          )}
        </div>
      ) : (
        <Button onClick={corrigir} className="mt-4 bg-[#1A365D] hover:bg-[#1A365D]/90">
          Corrigir prova
        </Button>
      )}
    </div>
  )
}

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

  // Situação do aluno em cada curso: courseId -> 'pendente' | 'aprovado'
  const [status, setStatus] = useState<Record<string, EnrollmentStatus>>({})
  const [busyId, setBusyId] = useState<string | null>(null)

  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loadingLessons, setLoadingLessons] = useState(false)

  const loadEnrollments = async (uid: string) => {
    const mine = await listStudentEnrollments(uid)
    const map: Record<string, EnrollmentStatus> = {}
    mine.forEach((e) => { map[e.courseId] = e.status })
    setStatus(map)
  }

  useEffect(() => {
    (async () => {
      try {
        setCourses(await listCourses())
        if (user) {
          await loadEnrollments(user.uid)
          const p = await getUserProgress(user.uid)
          setCompleted(p.completedLessons || [])
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  // O admin acessa qualquer curso. O membro, só os aprovados.
  const canAccess = (c: Course) => isAdmin || status[c.id] === 'aprovado'

  const meusCursos = courses.filter(canAccess)
  const disponiveis = isAdmin ? [] : courses.filter((c) => status[c.id] !== 'aprovado')

  const inscrever = async (c: Course) => {
    if (!user) return
    setBusyId(c.id)
    try {
      await requestEnrollment(c.id, user.uid)
      await loadEnrollments(user.uid)
      toast.success('Pedido enviado! A liderança vai avaliar sua inscrição.')
    } catch (e) {
      toast.error('Não foi possível enviar o pedido.')
      console.error(e)
    } finally {
      setBusyId(null)
    }
  }

  const cancelar = async (c: Course) => {
    if (!user) return
    setBusyId(c.id)
    try {
      await cancelRequest(c.id, user.uid)
      await loadEnrollments(user.uid)
      toast.info('Pedido cancelado.')
    } catch (e) {
      toast.error('Não foi possível cancelar.')
      console.error(e)
    } finally {
      setBusyId(null)
    }
  }

  const openCourse = async (c: Course) => {
    if (!canAccess(c)) return
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

  // Chamado quando o aluno é APROVADO na prova da lição.
  const onQuizPass = async (l: Lesson, score: number) => {
    if (!user || !course) return
    try {
      await recordQuizResult(user.uid, course.id, l.id, score, true)
      setCompleted((prev) => (prev.includes(l.id) ? prev : [...prev, l.id]))
      toast.success('Prova aprovada! Lição concluída.')
    } catch (e) {
      toast.error('Erro ao salvar o resultado da prova')
      console.error(e)
    }
  }

  // Todas as lições concluídas? (libera o certificado)
  const cursoConcluido = (ls: Lesson[]) =>
    ls.length > 0 && ls.every((l) => completed.includes(l.id))

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

              {(lesson.quiz?.length ?? 0) > 0 ? (
                isDone ? (
                  <div className="flex items-center gap-2 rounded-lg bg-[#38A169]/10 px-4 py-3 text-sm font-medium text-[#276749]">
                    <CheckCircle className="h-4 w-4" /> Você já foi aprovado nesta lição.
                  </div>
                ) : (
                  <LessonQuiz lesson={lesson} onPass={(score) => onQuizPass(lesson, score)} />
                )
              ) : (
                <Button onClick={() => complete(lesson)} disabled={isDone} className={isDone ? 'bg-[#38A169] hover:bg-[#38A169]' : 'bg-[#1A365D] hover:bg-[#1A365D]/90'}>
                  <CheckCircle className="mr-1 h-4 w-4" /> {isDone ? 'Aula concluída' : 'Marcar como concluída'}
                </Button>
              )}
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

            {!loadingLessons && cursoConcluido(lessons) && (
              <div className="mt-6 rounded-lg border border-[#D4A843] bg-[#FFFCF3] p-4 text-center">
                <Award className="mx-auto mb-2 h-8 w-8 text-[#B8860B]" />
                <p className="font-semibold text-[#1A202C]">Parabéns! Você concluiu o curso.</p>
                <p className="mb-3 text-xs text-[#718096]">Emita seu certificado de conclusão.</p>
                <Button asChild className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
                  <Link to={`/certificado/${course.id}`}><Award className="h-4 w-4" /> Emitir certificado</Link>
                </Button>
              </div>
            )}
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
      ) : (
        <>
          {/* ---------------- Meus cursos (acesso liberado) ---------------- */}
          <section className="space-y-3">
            <h2 className="font-heading text-lg font-bold text-[#1A202C]">
              {isAdmin ? 'Todos os cursos' : 'Meus cursos'}
            </h2>

            {meusCursos.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="py-10 text-center">
                  <BookOpen className="mx-auto mb-3 h-9 w-9 text-gray-300" />
                  <p className="text-sm text-[#4A5568]">Você ainda não tem acesso a nenhum curso.</p>
                  <p className="mt-1 text-xs text-[#718096]">
                    Escolha um curso abaixo e clique em "Quero me inscrever".
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {meusCursos.map((c) => (
                  <button key={c.id} onClick={() => openCourse(c)} className="group overflow-hidden rounded-xl border-0 bg-white text-left shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex h-28 items-center justify-center" style={{ background: `linear-gradient(135deg, ${c.coverColor || '#1A365D'}, #2C5282)` }}>
                      <GraduationCap className="h-12 w-12 text-white/25" />
                    </div>
                    <div className="p-4">
                      <p className="font-heading font-bold text-[#1A202C]">{c.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-[#718096]">{c.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {c.category && <Badge variant="outline" className="text-[10px]">{c.category}</Badge>}
                        <Badge variant="outline" className="text-[10px]"><BookOpen className="mr-1 h-3 w-3" />{c.lessonCount ?? 0} aulas</Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* ---------------- Catálogo: cursos disponíveis ---------------- */}
          {disponiveis.length > 0 && (
            <section className="space-y-3 pt-2">
              <div>
                <h2 className="font-heading text-lg font-bold text-[#1A202C]">Cursos disponíveis</h2>
                <p className="text-xs text-[#718096]">
                  Peça sua inscrição. A liderança avalia e libera o acesso ao conteúdo.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {disponiveis.map((c) => {
                  const pendente = status[c.id] === 'pendente'
                  const busy = busyId === c.id
                  return (
                    <div key={c.id} className="overflow-hidden rounded-xl border-0 bg-white shadow-sm">
                      <div className="flex h-28 items-center justify-center opacity-60" style={{ background: `linear-gradient(135deg, ${c.coverColor || '#1A365D'}, #2C5282)` }}>
                        <Lock className="h-10 w-10 text-white/40" />
                      </div>
                      <div className="p-4">
                        <p className="font-heading font-bold text-[#1A202C]">{c.title}</p>
                        <p className="mt-0.5 line-clamp-3 text-xs text-[#718096]">{c.description}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {c.category && <Badge variant="outline" className="text-[10px]">{c.category}</Badge>}
                          <Badge variant="outline" className="text-[10px]"><BookOpen className="mr-1 h-3 w-3" />{c.lessonCount ?? 0} aulas</Badge>
                        </div>

                        {pendente ? (
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 rounded-lg bg-[#FFFBEB] px-3 py-2 text-xs text-[#92400E]">
                              <Clock className="h-3.5 w-3.5 shrink-0" />
                              Pedido enviado. Aguardando aprovação da liderança.
                            </div>
                            <Button variant="ghost" size="sm" disabled={busy} onClick={() => cancelar(c)} className="h-8 w-full text-xs text-[#718096]">
                              {busy && <Loader2 className="mr-1 h-3 w-3 animate-spin" />} Cancelar pedido
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" disabled={busy} onClick={() => inscrever(c)} className="mt-4 w-full gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
                            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                            Quero me inscrever
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
