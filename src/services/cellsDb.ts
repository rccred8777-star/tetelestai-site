// ============================================================================
// cellsDb.ts — Módulo de Células
//
// Estrutura no Firestore:
//   cellGroups/{cellId}
//     -> dados da célula + funções (líder, timóteo, secretário, supervisor)
//     -> leaderHistory[]: histórico de quem já liderou (a troca não apaga o passado)
//
//   cellGroups/{cellId}/meetings/{meetingId}
//     -> relatório do encontro: presença, visitantes, decisões, oferta
//
//   cellMemberships/{cellId__userId}
//     -> vínculo do membro com a célula ('pendente' | 'aprovado')
//
// REGRA DO DINHEIRO (decisão do pastor):
//   1. O SECRETÁRIO conta e lança o valor.
//   2. O LÍDER confirma. Ficam registrados os dois nomes e as duas datas.
//   3. Depois de confirmada, a oferta TRAVA. Nem líder nem secretário alteram.
//   4. Só o ADMIN corrige — e a correção guarda o valor antigo, quem mudou,
//      quando e por quê. O passado nunca é apagado, só acrescentado.
// ============================================================================
import { db } from '@/lib/firebase'
import {
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp, arrayUnion,
} from 'firebase/firestore'

// ------------------------------- Tipos --------------------------------------

export type MembershipStatus = 'pendente' | 'aprovado'
export type OfferingStatus = 'pendente' | 'lancada' | 'confirmada'

/** Registro de quem liderou a célula (nunca é apagado). */
export interface LeaderHistoryEntry {
  leaderId: string
  leaderName: string
  from: string   // ISO date
  to?: string    // ISO date — vazio enquanto for o líder atual
}

/** Rastro de correção de oferta feita pelo admin. */
export interface OfferingCorrection {
  oldAmount: number
  newAmount: number
  byUid: string
  byName: string
  at: string     // ISO
  reason: string
}

export interface Cell {
  id: string
  name: string
  day?: string
  time?: string
  location?: string
  region?: string
  profile?: string
  active?: boolean

  leaderId?: string
  leaderName?: string
  timoteoId?: string
  timoteoName?: string
  secretarioId?: string
  secretarioName?: string
  supervisorId?: string
  supervisorName?: string

  leaderHistory?: LeaderHistoryEntry[]
  createdAt?: unknown
  updatedAt?: unknown
}

export interface Membership {
  id: string
  cellId: string
  userId: string
  status: MembershipStatus
  createdAt?: unknown
}

export interface Meeting {
  id: string
  date: string              // 'YYYY-MM-DD'
  attendance: string[]      // uids dos membros presentes
  visitors: number
  decisions: number         // decisões por Cristo no encontro
  notes?: string

  offeringAmount?: number | null
  offeringStatus?: OfferingStatus
  offeringBy?: string       // uid do secretário que lançou
  offeringByName?: string
  confirmedBy?: string      // uid do líder que confirmou
  confirmedByName?: string
  corrections?: OfferingCorrection[]

  reportedBy?: string
  createdAt?: unknown
  updatedAt?: unknown
}

// ------------------------------ Células -------------------------------------

export async function listCells(): Promise<Cell[]> {
  const snap = await getDocs(query(collection(db, 'cellGroups'), orderBy('name')))
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Cell, 'id'>) }))
}

export async function getCell(cellId: string): Promise<Cell | null> {
  const d = await getDoc(doc(db, 'cellGroups', cellId))
  return d.exists() ? ({ id: d.id, ...(d.data() as Omit<Cell, 'id'>) }) : null
}

/** Célula que a pessoa lidera (líder, timóteo ou secretário). */
export async function getCellILead(userId: string): Promise<Cell | null> {
  const all = await listCells()
  return all.find((c) =>
    c.leaderId === userId || c.timoteoId === userId || c.secretarioId === userId
  ) || null
}

/** Células que a pessoa supervisiona. */
export async function listCellsISupervise(userId: string): Promise<Cell[]> {
  const snap = await getDocs(
    query(collection(db, 'cellGroups'), where('supervisorId', '==', userId))
  )
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Cell, 'id'>) }))
}

export async function createCell(data: Partial<Cell>): Promise<string> {
  const ref = await addDoc(collection(db, 'cellGroups'), {
    ...data,
    active: data.active ?? true,
    leaderHistory: data.leaderId
      ? [{
          leaderId: data.leaderId,
          leaderName: data.leaderName || '',
          from: new Date().toISOString().slice(0, 10),
        }]
      : [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateCell(cellId: string, data: Partial<Cell>): Promise<void> {
  await updateDoc(doc(db, 'cellGroups', cellId), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteCell(cellId: string): Promise<void> {
  await deleteDoc(doc(db, 'cellGroups', cellId))
}

/**
 * Troca o líder da célula SEM apagar o histórico.
 * Fecha o período do líder anterior e abre o do novo.
 */
export async function transferLeadership(
  cellId: string,
  newLeaderId: string,
  newLeaderName: string
): Promise<void> {
  const cell = await getCell(cellId)
  if (!cell) throw new Error('Célula não encontrada')

  const hoje = new Date().toISOString().slice(0, 10)
  const history = [...(cell.leaderHistory || [])]

  // fecha o período de quem estava liderando
  const atual = history.find((h) => h.leaderId === cell.leaderId && !h.to)
  if (atual) atual.to = hoje

  history.push({ leaderId: newLeaderId, leaderName: newLeaderName, from: hoje })

  await updateDoc(doc(db, 'cellGroups', cellId), {
    leaderId: newLeaderId,
    leaderName: newLeaderName,
    leaderHistory: history,
    updatedAt: serverTimestamp(),
  })
}

/** Nomeia (ou remove) o timóteo da casa. Passe null para remover. */
export async function setTimoteo(cellId: string, userId: string | null, name: string): Promise<void> {
  await updateDoc(doc(db, 'cellGroups', cellId), {
    timoteoId: userId || '',
    timoteoName: userId ? name : '',
    updatedAt: serverTimestamp(),
  })
}

/** Nomeia (ou remove) o secretário — quem conta e lança a oferta. */
export async function setSecretario(cellId: string, userId: string | null, name: string): Promise<void> {
  await updateDoc(doc(db, 'cellGroups', cellId), {
    secretarioId: userId || '',
    secretarioName: userId ? name : '',
    updatedAt: serverTimestamp(),
  })
}

// --------------------------- Membros da célula ------------------------------

function membershipId(cellId: string, userId: string): string {
  return `${cellId}__${userId}`
}

/** O líder adiciona o membro direto — já entra aprovado. */
export async function addMember(cellId: string, userId: string): Promise<void> {
  await setDoc(doc(db, 'cellMemberships', membershipId(cellId, userId)), {
    cellId,
    userId,
    status: 'aprovado' as MembershipStatus,
    createdAt: serverTimestamp(),
  })
}

/** O membro pede para entrar — entra como pendente. */
export async function requestToJoin(cellId: string, userId: string): Promise<void> {
  await setDoc(doc(db, 'cellMemberships', membershipId(cellId, userId)), {
    cellId,
    userId,
    status: 'pendente' as MembershipStatus,
    createdAt: serverTimestamp(),
  })
}

/** O líder aprova o pedido. */
export async function approveMember(cellId: string, userId: string): Promise<void> {
  await updateDoc(doc(db, 'cellMemberships', membershipId(cellId, userId)), {
    status: 'aprovado' as MembershipStatus,
  })
}

/** Remove o membro (ou recusa o pedido). */
export async function removeMember(cellId: string, userId: string): Promise<void> {
  await deleteDoc(doc(db, 'cellMemberships', membershipId(cellId, userId)))
}

export async function listCellMemberships(cellId: string): Promise<Membership[]> {
  const snap = await getDocs(
    query(collection(db, 'cellMemberships'), where('cellId', '==', cellId))
  )
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Membership, 'id'>) }))
}

export async function listMyMemberships(userId: string): Promise<Membership[]> {
  const snap = await getDocs(
    query(collection(db, 'cellMemberships'), where('userId', '==', userId))
  )
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Membership, 'id'>) }))
}

// ---------------------------- Encontros (relatório) -------------------------

export async function listMeetings(cellId: string): Promise<Meeting[]> {
  const snap = await getDocs(
    query(collection(db, 'cellGroups', cellId, 'meetings'), orderBy('date', 'desc'))
  )
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Meeting, 'id'>) }))
}

/**
 * Registra o encontro. A oferta NÃO entra aqui — ela tem fluxo próprio,
 * porque envolve dinheiro e exige duas pessoas.
 */
export async function saveMeeting(
  cellId: string,
  data: Partial<Meeting>,
  reportedBy: string
): Promise<string> {
  const ref = await addDoc(collection(db, 'cellGroups', cellId, 'meetings'), {
    date: data.date || new Date().toISOString().slice(0, 10),
    attendance: data.attendance || [],
    visitors: data.visitors ?? 0,
    decisions: data.decisions ?? 0,
    notes: data.notes || '',
    offeringAmount: null,
    offeringStatus: 'pendente' as OfferingStatus,
    corrections: [],
    reportedBy,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

/** PASSO 1 — o secretário conta e lança o valor. */
export async function launchOffering(
  cellId: string,
  meetingId: string,
  amount: number,
  byUid: string,
  byName: string
): Promise<void> {
  if (amount < 0) throw new Error('Valor inválido')
  await updateDoc(doc(db, 'cellGroups', cellId, 'meetings', meetingId), {
    offeringAmount: amount,
    offeringStatus: 'lancada' as OfferingStatus,
    offeringBy: byUid,
    offeringByName: byName,
    offeringAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

/** PASSO 2 — o líder confere e confirma. A partir daqui, trava. */
export async function confirmOffering(
  cellId: string,
  meetingId: string,
  byUid: string,
  byName: string
): Promise<void> {
  await updateDoc(doc(db, 'cellGroups', cellId, 'meetings', meetingId), {
    offeringStatus: 'confirmada' as OfferingStatus,
    confirmedBy: byUid,
    confirmedByName: byName,
    confirmedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

/**
 * Correção pelo ADMIN, depois de confirmada.
 * Não sobrescreve o passado: empilha o registro da correção.
 */
export async function correctOffering(
  cellId: string,
  meetingId: string,
  newAmount: number,
  byUid: string,
  byName: string,
  reason: string
): Promise<void> {
  if (!reason.trim()) throw new Error('A correção exige um motivo')

  const ref = doc(db, 'cellGroups', cellId, 'meetings', meetingId)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Encontro não encontrado')

  const oldAmount = (snap.data() as Meeting).offeringAmount ?? 0

  await updateDoc(ref, {
    offeringAmount: newAmount,
    corrections: arrayUnion({
      oldAmount,
      newAmount,
      byUid,
      byName,
      at: new Date().toISOString(),
      reason: reason.trim(),
    }),
    updatedAt: serverTimestamp(),
  })
}

// ------------------------------ Estatísticas --------------------------------

export interface CellStats {
  encontros: number
  presencaMedia: number
  totalVisitantes: number
  totalDecisoes: number
  totalOfertas: number       // só o que foi CONFIRMADO
  ofertasPendentes: number   // lançadas e ainda não confirmadas
}

export function computeStats(meetings: Meeting[]): CellStats {
  if (meetings.length === 0) {
    return { encontros: 0, presencaMedia: 0, totalVisitantes: 0, totalDecisoes: 0, totalOfertas: 0, ofertasPendentes: 0 }
  }
  const presencas = meetings.reduce((s, m) => s + (m.attendance?.length || 0), 0)
  return {
    encontros: meetings.length,
    presencaMedia: Math.round((presencas / meetings.length) * 10) / 10,
    totalVisitantes: meetings.reduce((s, m) => s + (m.visitors || 0), 0),
    totalDecisoes: meetings.reduce((s, m) => s + (m.decisions || 0), 0),
    // dinheiro só conta depois de confirmado por duas pessoas
    totalOfertas: meetings
      .filter((m) => m.offeringStatus === 'confirmada')
      .reduce((s, m) => s + (m.offeringAmount || 0), 0),
    ofertasPendentes: meetings.filter((m) => m.offeringStatus === 'lancada').length,
  }
}

/** Formata em Real. */
export function brl(v: number): string {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
