// ============================================================================
// coursesDb.ts — Gestão real de Cursos, Aulas e Apostilas no Firestore
// Estrutura:  courses/{courseId}
//             courses/{courseId}/lessons/{lessonId}
// Apostilas (materiais) ficam como array `materials` no curso e/ou na aula.
// Cada material é um link (ex.: Google Drive): { title, url }.
// ============================================================================
import { db } from '@/lib/firebase'
import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { metodo33Lessons, lideresLessons, missoesLessons } from '@/data/mock'
import { batismoLessons } from '@/data/batismo'

// ----------------------------- Tipos ---------------------------------------
export interface Material {
  title: string
  url: string
}

export interface Course {
  id: string
  title: string
  description?: string
  category?: string
  order: number
  coverColor?: string
  materials?: Material[]
  lessonCount?: number
  createdAt?: unknown
  updatedAt?: unknown
}

export interface Lesson {
  id: string
  order: number
  title: string
  verse?: string
  verseText?: string
  videoUrl?: string
  content?: string
  discussionQuestions?: string[]
  practicalActivity?: string
  homework?: string
  memoryVerse?: string
  materials?: Material[]
  createdAt?: unknown
  updatedAt?: unknown
}

// --------------------------- Cursos (CRUD) ---------------------------------
export async function listCourses(): Promise<Course[]> {
  const snap = await getDocs(query(collection(db, 'courses'), orderBy('order')))
  const courses = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Course, 'id'>) }))
  // conta aulas de cada curso
  await Promise.all(
    courses.map(async (c) => {
      const ls = await getDocs(collection(db, 'courses', c.id, 'lessons'))
      c.lessonCount = ls.size
    })
  )
  return courses
}

export async function getCourse(courseId: string): Promise<Course | null> {
  const d = await getDoc(doc(db, 'courses', courseId))
  return d.exists() ? ({ id: d.id, ...(d.data() as Omit<Course, 'id'>) }) : null
}

export async function createCourse(data: Partial<Course>): Promise<string> {
  const existing = await listCourses()
  const nextOrder = data.order ?? (existing.length ? Math.max(...existing.map((c) => c.order || 0)) + 1 : 1)
  const ref = await addDoc(collection(db, 'courses'), {
    title: data.title || 'Novo Curso',
    description: data.description || '',
    category: data.category || 'Geral',
    coverColor: data.coverColor || '#1A365D',
    order: nextOrder,
    materials: data.materials || [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateCourse(courseId: string, data: Partial<Course>): Promise<void> {
  await updateDoc(doc(db, 'courses', courseId), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteCourse(courseId: string): Promise<void> {
  // apaga as aulas primeiro
  const ls = await getDocs(collection(db, 'courses', courseId, 'lessons'))
  await Promise.all(ls.docs.map((l) => deleteDoc(doc(db, 'courses', courseId, 'lessons', l.id))))
  await deleteDoc(doc(db, 'courses', courseId))
}

// --------------------------- Aulas (CRUD) ----------------------------------
export async function listLessons(courseId: string): Promise<Lesson[]> {
  const snap = await getDocs(query(collection(db, 'courses', courseId, 'lessons'), orderBy('order')))
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lesson, 'id'>) }))
}

export async function createLesson(courseId: string, data: Partial<Lesson>): Promise<string> {
  const existing = await listLessons(courseId)
  const nextOrder = data.order ?? (existing.length ? Math.max(...existing.map((l) => l.order || 0)) + 1 : 1)
  const ref = await addDoc(collection(db, 'courses', courseId, 'lessons'), {
    order: nextOrder,
    title: data.title || 'Nova Aula',
    verse: data.verse || '',
    verseText: data.verseText || '',
    videoUrl: data.videoUrl || '',
    content: data.content || '',
    discussionQuestions: data.discussionQuestions || [],
    practicalActivity: data.practicalActivity || '',
    homework: data.homework || '',
    memoryVerse: data.memoryVerse || '',
    materials: data.materials || [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateLesson(courseId: string, lessonId: string, data: Partial<Lesson>): Promise<void> {
  await updateDoc(doc(db, 'courses', courseId, 'lessons', lessonId), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteLesson(courseId: string, lessonId: string): Promise<void> {
  await deleteDoc(doc(db, 'courses', courseId, 'lessons', lessonId))
}

// Troca a ordem entre duas aulas (mover para cima/baixo)
export async function swapLessonOrder(courseId: string, a: Lesson, b: Lesson): Promise<void> {
  await Promise.all([
    updateLesson(courseId, a.id, { order: b.order }),
    updateLesson(courseId, b.id, { order: a.order }),
  ])
}

// --------------------------- Migração do conteúdo --------------------------
// Importa os 3 cursos já escritos (Método 3/3, Escola de Líderes, Escola de
// Missões) do arquivo mock para o banco. É idempotente: cursos já existentes
// não são duplicados.
const SEED_COURSES: { id: string; title: string; description: string; category: string; order: number; color: string; lessons: any[] }[] = [
  {
    id: 'metodo-33',
    title: 'Método 3/3 — Discipulado Multiplicativo',
    description: 'Treinamento completo para fazer discípulos que fazem discípulos.',
    category: 'Discipulado',
    order: 1,
    color: '#1A365D',
    lessons: metodo33Lessons as any[],
  },
  {
    id: 'escola-lideres',
    title: 'Escola de Líderes de Célula',
    description: 'Formação completa para líderes: visão, caráter, condução e multiplicação de células.',
    category: 'Liderança',
    order: 2,
    color: '#7C2D12',
    lessons: lideresLessons as any[],
  },
  {
    id: 'escola-missoes',
    title: 'Escola de Missões',
    description: 'Do mandato missionário ao campo: teologia, estratégia e prática de missões.',
    category: 'Missões',
    order: 3,
    color: '#166534',
    lessons: missoesLessons as any[],
  },
  {
    id: 'batismo-aguas',
    title: 'Curso de Batismo nas Águas',
    description: 'Preparação para o batismo em 4 encontros: salvação, o significado do batismo, o batismo no Espírito Santo e a vida de discípulo.',
    category: 'Batismo',
    order: 4,
    color: '#0E7490',
    lessons: batismoLessons as any[],
  },
]

export interface MigrationReport {
  created: string[]
  skipped: string[]
  lessonsInserted: number
}

export async function migrateSeedCourses(): Promise<MigrationReport> {
  const report: MigrationReport = { created: [], skipped: [], lessonsInserted: 0 }

  for (const seed of SEED_COURSES) {
    const courseRef = doc(db, 'courses', seed.id)
    const existing = await getDoc(courseRef)
    if (existing.exists()) {
      report.skipped.push(seed.title)
      continue
    }

    await setDoc(courseRef, {
      title: seed.title,
      description: seed.description,
      category: seed.category,
      coverColor: seed.color,
      order: seed.order,
      materials: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    let order = 1
    for (const l of seed.lessons) {
      const lessonId = `licao-${order}`
      await setDoc(doc(db, 'courses', seed.id, 'lessons', lessonId), {
        order,
        title: l.title || `Aula ${order}`,
        verse: l.verse || '',
        verseText: l.verseText || '',
        videoUrl: l.videoUrl || '',
        content: l.content || '',
        discussionQuestions: l.discussionQuestions || [],
        practicalActivity: l.practicalActivity || '',
        homework: l.homework || '',
        memoryVerse: l.memoryVerse || '',
        materials: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      order++
      report.lessonsInserted++
    }
    report.created.push(seed.title)
  }

  return report
}
