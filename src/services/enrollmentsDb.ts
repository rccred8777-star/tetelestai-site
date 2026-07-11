// ============================================================================
// enrollmentsDb.ts — Matrícula de alunos em cursos (turmas)
//
// Estrutura no Firestore:
//   enrollments/{courseId__userId} -> { courseId, userId, status, createdAt }
//
// status:
//   'pendente'  — o membro pediu inscrição e aguarda a liderança aprovar
//   'aprovado'  — tem acesso ao conteúdo do curso
//
// O id do documento é composto de propósito: impede que a mesma pessoa seja
// matriculada (ou peça inscrição) duas vezes no mesmo curso.
//
// Regras de segurança:
//   - O membro só cria o PRÓPRIO pedido, e sempre como 'pendente'.
//   - Só o admin aprova, matricula direto e remove.
//   - O membro só lê as próprias matrículas.
// ============================================================================
import { db } from '@/lib/firebase'
import {
  collection, doc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, serverTimestamp,
} from 'firebase/firestore'

export type EnrollmentStatus = 'pendente' | 'aprovado'

export interface Enrollment {
  id: string
  courseId: string
  userId: string
  status: EnrollmentStatus
  createdAt?: unknown
}

/** Id composto do documento de matrícula. */
function enrollmentId(courseId: string, userId: string): string {
  return `${courseId}__${userId}`
}

// --------------------------- Ações do MEMBRO --------------------------------

/** O membro pede inscrição. Entra sempre como 'pendente'. */
export async function requestEnrollment(courseId: string, userId: string): Promise<void> {
  await setDoc(doc(db, 'enrollments', enrollmentId(courseId, userId)), {
    courseId,
    userId,
    status: 'pendente' as EnrollmentStatus,
    createdAt: serverTimestamp(),
  })
}

/** O membro desiste do próprio pedido ainda pendente. */
export async function cancelRequest(courseId: string, userId: string): Promise<void> {
  await deleteDoc(doc(db, 'enrollments', enrollmentId(courseId, userId)))
}

/** Todas as matrículas do aluno (pendentes e aprovadas). */
export async function listStudentEnrollments(userId: string): Promise<Enrollment[]> {
  const snap = await getDocs(
    query(collection(db, 'enrollments'), where('userId', '==', userId))
  )
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Enrollment, 'id'>) }))
}

// --------------------------- Ações do ADMIN ---------------------------------

/** Admin matricula direto (já aprovado, sem passar por pedido). */
export async function enrollStudent(courseId: string, userId: string): Promise<void> {
  await setDoc(doc(db, 'enrollments', enrollmentId(courseId, userId)), {
    courseId,
    userId,
    status: 'aprovado' as EnrollmentStatus,
    createdAt: serverTimestamp(),
  })
}

/** Admin aprova um pedido pendente. */
export async function approveEnrollment(courseId: string, userId: string): Promise<void> {
  await updateDoc(doc(db, 'enrollments', enrollmentId(courseId, userId)), {
    status: 'aprovado' as EnrollmentStatus,
    approvedAt: serverTimestamp(),
  })
}

/** Admin remove a matrícula (ou recusa o pedido). */
export async function unenrollStudent(courseId: string, userId: string): Promise<void> {
  await deleteDoc(doc(db, 'enrollments', enrollmentId(courseId, userId)))
}

/** Todas as matrículas de um curso (para a tela de turma). */
export async function listCourseEnrollments(courseId: string): Promise<Enrollment[]> {
  const snap = await getDocs(
    query(collection(db, 'enrollments'), where('courseId', '==', courseId))
  )
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Enrollment, 'id'>) }))
}

/** Todos os pedidos pendentes, de todos os cursos (para o painel do admin). */
export async function listPendingEnrollments(): Promise<Enrollment[]> {
  const snap = await getDocs(
    query(collection(db, 'enrollments'), where('status', '==', 'pendente'))
  )
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Enrollment, 'id'>) }))
}

/**
 * Aplica de uma vez as mudanças de turma de um curso.
 * Recebe a lista final de alunos aprovados e a que estava antes,
 * gravando apenas a diferença.
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
