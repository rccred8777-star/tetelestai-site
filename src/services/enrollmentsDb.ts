// ============================================================================
// enrollmentsDb.ts — Matricula de alunos em cursos (turmas)
//
// Estrutura no Firestore:
//   enrollments/{courseId__userId}  ->  { courseId, userId, createdAt }
//
// O id do documento e composto de proposito: garante que a mesma pessoa nao
// seja matriculada duas vezes no mesmo curso, e permite matricular/desmatricular
// sem precisar buscar o documento antes.
//
// Regras de seguranca:
//   - Admin escreve (matricula e desmatricula) e le tudo.
//   - Aluno le apenas as proprias matriculas.
// ============================================================================
import { db } from '@/lib/firebase'
import {
  collection, doc, getDocs, setDoc, deleteDoc,
  query, where, serverTimestamp,
} from 'firebase/firestore'

export interface Enrollment {
  id: string
  courseId: string
  userId: string
  createdAt?: unknown
}

/** Monta o id composto do documento de matricula. */
function enrollmentId(courseId: string, userId: string): string {
  return `${courseId}__${userId}`
}

/** Matricula um aluno em um curso (idempotente). */
export async function enrollStudent(courseId: string, userId: string): Promise<void> {
  await setDoc(doc(db, 'enrollments', enrollmentId(courseId, userId)), {
    courseId,
    userId,
    createdAt: serverTimestamp(),
  })
}

/** Remove a matricula de um aluno em um curso. */
export async function unenrollStudent(courseId: string, userId: string): Promise<void> {
  await deleteDoc(doc(db, 'enrollments', enrollmentId(courseId, userId)))
}

/** Ids dos alunos matriculados em um curso (uso do admin). */
export async function listCourseStudentIds(courseId: string): Promise<string[]> {
  const snap = await getDocs(
    query(collection(db, 'enrollments'), where('courseId', '==', courseId))
  )
  return snap.docs.map((d) => (d.data() as Enrollment).userId)
}

/** Ids dos cursos em que um aluno esta matriculado. */
export async function listStudentCourseIds(userId: string): Promise<string[]> {
  const snap = await getDocs(
    query(collection(db, 'enrollments'), where('userId', '==', userId))
  )
  return snap.docs.map((d) => (d.data() as Enrollment).courseId)
}

/**
 * Aplica de uma vez as mudancas de turma de um curso.
 * Recebe a lista final de alunos e a lista que estava antes,
 * e grava apenas a diferenca.
 */
export async function saveCourseRoster(
  courseId: string,
  selectedIds: string[],
  previousIds: string[]
): Promise<{ added: number; removed: number }> {
  const toAdd = selectedIds.filter((id) => !previousIds.includes(id))
  const toRemove = previousIds.filter((id) => !selectedIds.includes(id))

  await Promise.all([
    ...toAdd.map((id) => enrollStudent(courseId, id)),
    ...toRemove.map((id) => unenrollStudent(courseId, id)),
  ])

  return { added: toAdd.length, removed: toRemove.length }
}
