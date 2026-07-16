// ============================================================================
// muralDb.ts — Mural de Oração da Igreja (visível para toda a igreja)
//
// Estrutura no Firestore:
//   churchPrayers/{prayerId}
//     -> text, authorName, authorUid, anonymous, answered, prayedBy[], createdAt
//
// Regras:
//   - Qualquer membro autenticado vê o mural e publica um pedido.
//   - Qualquer membro toca em "Vou orar" (entra no prayedBy — conta 1 por pessoa).
//   - O autor marca o próprio pedido como respondido / remove.
//   - Líder, supervisor e admin podem moderar (marcar respondido / remover qualquer).
// ============================================================================
import { db } from '@/lib/firebase'
import {
  collection, doc, addDoc, getDocs, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp, arrayUnion, arrayRemove,
} from 'firebase/firestore'

export interface ChurchPrayer {
  id: string
  text: string
  authorName: string     // nome exibido ('Anônimo' quando marcado)
  authorUid: string      // quem publicou (para permitir editar/remover)
  anonymous: boolean
  answered: boolean
  prayedBy: string[]     // uids de quem está orando
  createdAt?: unknown
  answeredAt?: unknown
}

const COL = 'churchPrayers'

export async function listChurchPrayers(): Promise<ChurchPrayer[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('createdAt', 'desc')))
  return snap.docs.map((d) => {
    const data = d.data() as Omit<ChurchPrayer, 'id'>
    return { id: d.id, prayedBy: [], ...data }
  })
}

export async function addChurchPrayer(
  text: string,
  authorUid: string,
  authorName: string,
  anonymous: boolean,
): Promise<void> {
  await addDoc(collection(db, COL), {
    text: text.trim(),
    authorUid,
    authorName: anonymous ? 'Anônimo' : (authorName || 'Membro'),
    anonymous,
    answered: false,
    prayedBy: [],
    createdAt: serverTimestamp(),
  })
}

/** Entra ou sai da lista de quem está orando (1 por pessoa). */
export async function togglePray(id: string, uid: string, praying: boolean): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    prayedBy: praying ? arrayUnion(uid) : arrayRemove(uid),
  })
}

export async function setChurchPrayerAnswered(id: string, answered: boolean): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    answered,
    answeredAt: answered ? serverTimestamp() : null,
  })
}

export async function deleteChurchPrayer(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id))
}
