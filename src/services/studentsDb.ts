// ============================================================================
// studentsDb.ts — Gestão de Alunos/Membros (coleção `users`)
// Admin pode listar todos os usuários e alterar o papel (member/leader/admin),
// conforme as regras de segurança já publicadas no Firestore.
// ============================================================================
import { db } from '@/lib/firebase'
import { collection, doc, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore'
import type { UserRole } from '@/contexts/AuthContext'

export interface Student {
  id: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  phoneNumber?: string | null
  role: UserRole
  cellGroup?: string
  completedLessons?: string[]
  spiritualLevel?: number
  joinedAt?: unknown
}

export async function listStudents(): Promise<Student[]> {
  const snap = await getDocs(collection(db, 'users'))
  const students = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Student, 'id'>) }))
  // ordena por nome (ou email) no cliente, evitando índices no banco
  students.sort((a, b) => {
    const na = (a.displayName || a.email || '').toLowerCase()
    const nb = (b.displayName || b.email || '').toLowerCase()
    return na.localeCompare(nb)
  })
  return students
}

export async function updateStudentRole(userId: string, role: UserRole): Promise<void> {
  await updateDoc(doc(db, 'users', userId), { role, updatedAt: serverTimestamp() })
}

export function completedCount(s: Student): number {
  return s.completedLessons?.length ?? 0
}
