import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap, Plus, Pencil, Trash2, BookOpen, FileText, ChevronLeft,
  ArrowUp, ArrowDown, DownloadCloud, Loader2, ExternalLink, Link as LinkIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import {
  listCourses, createCourse, updateCourse, deleteCourse,
  listLessons, createLesson, updateLesson, deleteLesson, swapLessonOrder,
  migrateSeedCourses,
  type Course, type Lesson, type Material,
} from '@/services/coursesDb'

// -------------------- Editor de Apostilas (materiais/links) -----------------
function MaterialsEditor({ value, onChange }: { value: Material[]; onChange: (m: Material[]) => void }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const add = () => {
    if (!title.trim() || !url.trim()) {
      toast.error('Preencha nome e link da apostila')
      return
    }
    onChange([...(value || []), { title: title.trim(), url: url.trim() }])
    setTitle('')
    setUrl('')
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {(value || []).length === 0 && (
          <p className="text-xs text-[#718096]">Nenhuma apostila anexada ainda.</p>
        )}
        {(value || []).map((m, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
            <FileText className="h-4 w-4 shrink-0 text-[#C0561F]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#1A202C]">{m.title}</p>
              <p className="truncate text-xs text-[#718096]">{m.url}</p>
            </div>
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
        <Input placeholder="Nome (ex.: Apostila Aula 1)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Link do Google Drive" value={url} onChange={(e) => setUrl(e.target.value)} />
        <Button type="button" variant="outline" onClick={add} className="gap-1">
          <LinkIcon className="h-4 w-4" /> Anexar
        </Button>
      </div>
      <p className="text-[11px] text-[#718096]">
        Dica: no Google Drive, clique com o direito no arquivo → Compartilhar → "Qualquer pessoa com o link" → copie o link.
      </p>
    </div>
  )
}

// ------------------------------ Dialog de Curso -----------------------------
function CourseDialog({ open, onOpenChange, course, onSaved }: {
  open: boolean; onOpenChange: (v: boolean) => void; course: Course | null; onSaved: () => void
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [order, setOrder] = useState<number>(1)
  const [materials, setMaterials] = useState<Material[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setTitle(course?.title || '')
      setDescription(course?.description || '')
      setCategory(course?.category || '')
      setOrder(course?.order || 1)
      setMaterials(course?.materials || [])
    }
  }, [open, course])

  const save = async () => {
    if (!title.trim()) { toast.error('Dê um título ao curso'); return }
    setSaving(true)
    try {
      if (course) {
        await updateCourse(course.id, { title, description, category, order, materials })
        toast.success('Curso atualizado')
      } else {
        await createCourse({ title, description, category, order, materials })
        toast.success('Curso criado')
      }
      onOpenChange(false)
      onSaved()
    } catch (e) {
      toast.error('Erro ao salvar o curso')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{course ? 'Editar curso' : 'Novo curso'}</DialogTitle>
          <DialogDescription>Defina os dados do curso e anexe apostilas do curso (opcional).</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Título</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex.: Escola de Líderes" />
          </div>
          <div className="space-y-1.5">
            <Label>Descrição</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Discipulado, Liderança..." />
            </div>
            <div className="space-y-1.5">
              <Label>Ordem</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Apostilas do curso</Label>
            <MaterialsEditor value={materials} onChange={setMaterials} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={save} disabled={saving} className="bg-[#1A365D] hover:bg-[#1A365D]/90">
            {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ------------------------------ Dialog de Aula ------------------------------
function LessonDialog({ open, onOpenChange, courseId, lesson, onSaved }: {
  open: boolean; onOpenChange: (v: boolean) => void; courseId: string; lesson: Lesson | null; onSaved: () => void
}) {
  const [title, setTitle] = useState('')
  const [order, setOrder] = useState<number>(1)
  const [verse, setVerse] = useState('')
  const [verseText, setVerseText] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [content, setContent] = useState('')
  const [questions, setQuestions] = useState('')
  const [practicalActivity, setPracticalActivity] = useState('')
  const [homework, setHomework] = useState('')
  const [memoryVerse, setMemoryVerse] = useState('')
  const [materials, setMaterials] = useState<Material[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setTitle(lesson?.title || '')
      setOrder(lesson?.order || 1)
      setVerse(lesson?.verse || '')
      setVerseText(lesson?.verseText || '')
      setVideoUrl(lesson?.videoUrl || '')
      setContent(lesson?.content || '')
      setQuestions((lesson?.discussionQuestions || []).join('\n'))
      setPracticalActivity(lesson?.practicalActivity || '')
      setHomework(lesson?.homework || '')
      setMemoryVerse(lesson?.memoryVerse || '')
      setMaterials(lesson?.materials || [])
    }
  }, [open, lesson])

  const save = async () => {
    if (!title.trim()) { toast.error('Dê um título à aula'); return }
    setSaving(true)
    const data: Partial<Lesson> = {
      title, order, verse, verseText, videoUrl, content,
      discussionQuestions: questions.split('\n').map((q) => q.trim()).filter(Boolean),
      practicalActivity, homework, memoryVerse, materials,
    }
    try {
      if (lesson) {
        await updateLesson(courseId, lesson.id, data)
        toast.success('Aula atualizada')
      } else {
        await createLesson(courseId, data)
        toast.success('Aula criada')
      }
      onOpenChange(false)
      onSaved()
    } catch (e) {
      toast.error('Erro ao salvar a aula')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{lesson ? 'Editar aula' : 'Nova aula'}</DialogTitle>
          <DialogDescription>Conteúdo da aula e apostilas anexas (links do Google Drive).</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
            <div className="space-y-1.5">
              <Label>Título da aula</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Ordem</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Versículo (referência)</Label>
              <Input value={verse} onChange={(e) => setVerse(e.target.value)} placeholder="Ex.: Mateus 28:19" />
            </div>
            <div className="space-y-1.5">
              <Label>Vídeo (URL, opcional)</Label>
              <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="YouTube / Vimeo" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Texto do versículo</Label>
            <Textarea value={verseText} onChange={(e) => setVerseText(e.target.value)} rows={2} />
          </div>
          <div className="space-y-1.5">
            <Label>Conteúdo da aula (aceita Markdown)</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="font-mono text-xs" />
          </div>
          <div className="space-y-1.5">
            <Label>Perguntas de discussão (uma por linha)</Label>
            <Textarea value={questions} onChange={(e) => setQuestions(e.target.value)} rows={4} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Atividade prática</Label>
              <Textarea value={practicalActivity} onChange={(e) => setPracticalActivity(e.target.value)} rows={2} />
            </div>
            <div className="space-y-1.5">
              <Label>Tarefa de casa</Label>
              <Textarea value={homework} onChange={(e) => setHomework(e.target.value)} rows={2} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Versículo para memorizar</Label>
            <Input value={memoryVerse} onChange={(e) => setMemoryVerse(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Apostilas desta aula</Label>
            <MaterialsEditor value={materials} onChange={setMaterials} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={save} disabled={saving} className="bg-[#1A365D] hover:bg-[#1A365D]/90">
            {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />} Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --------------------------------- Página -----------------------------------
export default function AdminCursos() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [migrating, setMigrating] = useState(false)

  const [selected, setSelected] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loadingLessons, setLoadingLessons] = useState(false)

  const [courseDialog, setCourseDialog] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [lessonDialog, setLessonDialog] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)

  const reloadCourses = async () => {
    setLoading(true)
    try {
      setCourses(await listCourses())
    } catch (e) {
      toast.error('Erro ao carregar cursos')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const reloadLessons = async (courseId: string) => {
    setLoadingLessons(true)
    try {
      setLessons(await listLessons(courseId))
    } catch (e) {
      toast.error('Erro ao carregar aulas')
      console.error(e)
    } finally {
      setLoadingLessons(false)
    }
  }

  useEffect(() => { reloadCourses() }, [])

  const openCourse = async (c: Course) => {
    setSelected(c)
    await reloadLessons(c.id)
  }

  const runMigration = async () => {
    if (!confirm('Importar os cursos já escritos (Método 3/3, Escola de Líderes e Escola de Missões) para o banco? Cursos que já existem não serão duplicados.')) return
    setMigrating(true)
    try {
      const r = await migrateSeedCourses()
      toast.success(`Migração concluída: ${r.created.length} curso(s) criado(s), ${r.lessonsInserted} aula(s). ${r.skipped.length ? 'Já existiam: ' + r.skipped.join(', ') : ''}`)
      await reloadCourses()
    } catch (e) {
      toast.error('Erro na migração')
      console.error(e)
    } finally {
      setMigrating(false)
    }
  }

  const removeCourse = async (c: Course) => {
    if (!confirm(`Excluir o curso "${c.title}" e TODAS as suas aulas? Esta ação não pode ser desfeita.`)) return
    try {
      await deleteCourse(c.id)
      toast.success('Curso excluído')
      if (selected?.id === c.id) { setSelected(null); setLessons([]) }
      await reloadCourses()
    } catch (e) {
      toast.error('Erro ao excluir')
      console.error(e)
    }
  }

  const removeLesson = async (l: Lesson) => {
    if (!selected) return
    if (!confirm(`Excluir a aula "${l.title}"?`)) return
    try {
      await deleteLesson(selected.id, l.id)
      toast.success('Aula excluída')
      await reloadLessons(selected.id)
      await reloadCourses()
    } catch (e) {
      toast.error('Erro ao excluir aula')
      console.error(e)
    }
  }

  const moveLesson = async (idx: number, dir: -1 | 1) => {
    if (!selected) return
    const other = idx + dir
    if (other < 0 || other >= lessons.length) return
    try {
      await swapLessonOrder(selected.id, lessons[idx], lessons[other])
      await reloadLessons(selected.id)
    } catch (e) {
      toast.error('Erro ao reordenar')
      console.error(e)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-[#718096]"><span>Painel Admin</span><span>/</span><span>Gerenciar Cursos</span></div>
          <h1 className="flex items-center gap-2 font-heading text-2xl font-bold text-[#1A202C]">
            <GraduationCap className="h-6 w-6 text-[#1A365D]" /> Gerenciar Cursos
          </h1>
          <p className="text-sm text-[#718096]">Crie e edite cursos, aulas e apostilas. Tudo salvo no banco.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={runMigration} disabled={migrating} className="gap-1">
            {migrating ? <Loader2 className="h-4 w-4 animate-spin" /> : <DownloadCloud className="h-4 w-4" />}
            Importar conteúdo do site
          </Button>
          <Button onClick={() => { setEditingCourse(null); setCourseDialog(true) }} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
            <Plus className="h-4 w-4" /> Novo Curso
          </Button>
        </div>
      </motion.div>

      {!selected ? (
        // -------- Lista de cursos --------
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Cursos ({courses.length})</CardTitle>
            <CardDescription>Clique em um curso para gerenciar as aulas.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12 text-[#718096]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando...</div>
            ) : courses.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-200 py-12 text-center">
                <BookOpen className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                <p className="text-sm text-[#4A5568]">Nenhum curso no banco ainda.</p>
                <p className="mt-1 text-xs text-[#718096]">Clique em "Importar conteúdo do site" para trazer os cursos já escritos, ou crie um novo.</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {courses.map((c) => (
                  <div key={c.id} className="rounded-lg border border-gray-100 p-4 transition-colors hover:bg-[#F7FAFC]">
                    <div className="flex items-start justify-between gap-2">
                      <button className="min-w-0 flex-1 text-left" onClick={() => openCourse(c)}>
                        <p className="truncate font-semibold text-[#1A202C]">{c.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-[#718096]">{c.description}</p>
                      </button>
                      <div className="flex shrink-0 gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingCourse(c); setCourseDialog(true) }}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeCourse(c)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {c.category && <Badge variant="outline" className="text-[10px]">{c.category}</Badge>}
                      <Badge variant="outline" className="text-[10px]"><BookOpen className="mr-1 h-3 w-3" />{c.lessonCount ?? 0} aulas</Badge>
                      {(c.materials?.length ?? 0) > 0 && <Badge variant="outline" className="text-[10px]"><FileText className="mr-1 h-3 w-3" />{c.materials!.length} apostila(s)</Badge>}
                      <Button variant="link" size="sm" className="ml-auto h-7 px-0 text-[#1A365D]" onClick={() => openCourse(c)}>Gerenciar aulas →</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        // -------- Aulas do curso selecionado --------
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelected(null); setLessons([]) }}><ChevronLeft className="h-5 w-5" /></Button>
              <div>
                <CardTitle className="text-base">{selected.title}</CardTitle>
                <CardDescription>{lessons.length} aula(s)</CardDescription>
              </div>
            </div>
            <Button onClick={() => { setEditingLesson(null); setLessonDialog(true) }} className="gap-1 bg-[#1A365D] hover:bg-[#1A365D]/90">
              <Plus className="h-4 w-4" /> Nova Aula
            </Button>
          </CardHeader>
          <CardContent>
            {loadingLessons ? (
              <div className="flex items-center justify-center py-12 text-[#718096]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando aulas...</div>
            ) : lessons.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-[#718096]">Nenhuma aula ainda. Clique em "Nova Aula".</div>
            ) : (
              <div className="space-y-2">
                {lessons.map((l, idx) => (
                  <div key={l.id} className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5 hover:bg-[#F7FAFC]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1A365D]/10 text-xs font-bold text-[#1A365D]">{l.order}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#1A202C]">{l.title}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[#718096]">
                        {l.verse && <span>{l.verse}</span>}
                        {(l.materials?.length ?? 0) > 0 && <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{l.materials!.length} apostila(s)</span>}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5">
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={idx === 0} onClick={() => moveLesson(idx, -1)}><ArrowUp className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={idx === lessons.length - 1} onClick={() => moveLesson(idx, 1)}><ArrowDown className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingLesson(l); setLessonDialog(true) }}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeLesson(l)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(selected.materials?.length ?? 0) > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#718096]">Apostilas do curso</p>
                <div className="space-y-1.5">
                  {selected.materials!.map((m, i) => (
                    <a key={i} href={m.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-md border border-gray-100 px-3 py-2 text-sm hover:bg-[#F7FAFC]">
                      <FileText className="h-4 w-4 text-[#C0561F]" /> <span className="flex-1 truncate">{m.title}</span> <ExternalLink className="h-3.5 w-3.5 text-[#718096]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <CourseDialog open={courseDialog} onOpenChange={setCourseDialog} course={editingCourse} onSaved={reloadCourses} />
      {selected && (
        <LessonDialog open={lessonDialog} onOpenChange={setLessonDialog} courseId={selected.id} lesson={editingLesson}
          onSaved={() => { reloadLessons(selected.id); reloadCourses() }} />
      )}
    </div>
  )
}
