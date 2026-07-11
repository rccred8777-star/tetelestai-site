// ============================================================================
// adminContentDb.ts — Comunicados (announcements) e Eventos (events) no Firestore
// Admin cria/edita/exclui; membros leem. Regras já publicadas cobrem isso.
// ============================================================================
import { db } from '@/lib/firebase'
import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore'

function fmtDate(ts: unknown): string {
  const anyTs = ts as { toDate?: () => Date } | undefined
  const d = anyTs?.toDate ? anyTs.toDate() : null
  return d ? d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : ''
}

// ------------------------------ Comunicados --------------------------------
export interface Announcement {
  id: string
  title: string
  content: string
  category: string // igreja | pastoral | celula | cursos | eventos
  urgent?: boolean
  date?: string
  createdAt?: unknown
}

export async function listAnnouncements(): Promise<Announcement[]> {
  const snap = await getDocs(collection(db, 'announcements'))
  const items = snap.docs.map((d) => {
    const data = d.data() as Omit<Announcement, 'id'>
    return { id: d.id, ...data, date: fmtDate(data.createdAt) }
  })
  items.sort((a, b) => {
    const ta = (a.createdAt as { seconds?: number } | undefined)?.seconds ?? 0
    const tb = (b.createdAt as { seconds?: number } | undefined)?.seconds ?? 0
    return tb - ta
  })
  return items
}

export async function createAnnouncement(data: Partial<Announcement>): Promise<string> {
  const ref = await addDoc(collection(db, 'announcements'), {
    title: data.title || '',
    content: data.content || '',
    category: data.category || 'igreja',
    urgent: data.urgent || false,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateAnnouncement(id: string, data: Partial<Announcement>): Promise<void> {
  const { title, content, category, urgent } = data
  await updateDoc(doc(db, 'announcements', id), { title, content, category, urgent })
}

export async function deleteAnnouncement(id: string): Promise<void> {
  await deleteDoc(doc(db, 'announcements', id))
}

// --------------------------------- Eventos ---------------------------------
export interface ChurchEvent {
  id: string
  title: string
  datetime?: string // AAAA-MM-DD (input date)
  time?: string
  location?: string
  description?: string
  category?: string
  status?: string
  createdAt?: unknown
}

export async function listEvents(): Promise<ChurchEvent[]> {
  const snap = await getDocs(collection(db, 'events'))
  const items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ChurchEvent, 'id'>) }))
  items.sort((a, b) => (a.datetime || '').localeCompare(b.datetime || ''))
  return items
}

export async function createEvent(data: Partial<ChurchEvent>): Promise<string> {
  const ref = await addDoc(collection(db, 'events'), {
    title: data.title || '',
    datetime: data.datetime || '',
    time: data.time || '',
    location: data.location || '',
    description: data.description || '',
    category: data.category || 'geral',
    status: data.status || 'Inscrições Abertas',
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateEvent(id: string, data: Partial<ChurchEvent>): Promise<void> {
  const { title, datetime, time, location, description, category, status } = data
  await updateDoc(doc(db, 'events', id), { title, datetime, time, location, description, category, status })
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'events', id))
}
