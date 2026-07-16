// ============================================================================
// versiculosDb.ts — Memorização de Versículos (para toda a igreja)
//
// Estrutura no Firestore:
//   memoryVerses/{verseId}
//     -> theme, reference, text, order, createdAt
//
// Regras:
//   - Qualquer membro autenticado LÊ (memoriza).
//   - Só o ADMIN cria/edita/remove.
//   - Tradução: João Ferreira de Almeida (domínio público).
// ============================================================================
import { db } from '@/lib/firebase'
import {
  collection, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore'

export interface MemoryVerse {
  id: string
  theme: string        // ex.: 'Graça', 'Salvação'
  reference: string    // ex.: 'Efésios 2.8-9'
  text: string         // texto do versículo (Almeida)
  order: number
  createdAt?: unknown
}

// Ordem fixa dos temas (para agrupar bonito na tela)
export const THEMES = [
  'Graça',
  'Salvação',
  'O Sangue de Jesus',
  'A Cruz',
  'Vida Eterna',
  'Guerra Espiritual',
] as const

const COL = 'memoryVerses'

export async function listMemoryVerses(): Promise<MemoryVerse[]> {
  const snap = await getDocs(query(collection(db, COL), orderBy('order')))
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MemoryVerse, 'id'>) }))
}

export async function addMemoryVerse(v: Omit<MemoryVerse, 'id' | 'createdAt'>): Promise<void> {
  await addDoc(collection(db, COL), { ...v, createdAt: serverTimestamp() })
}

export async function updateMemoryVerse(id: string, v: Partial<MemoryVerse>): Promise<void> {
  await updateDoc(doc(db, COL, id), { ...v })
}

export async function deleteMemoryVerse(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id))
}

// ---------------------------------------------------------------------------
// Versículos principais já prontos (o admin pode adicionar/editar depois).
// Tradução João Ferreira de Almeida — domínio público.
// ---------------------------------------------------------------------------
export const SEED_VERSES: Omit<MemoryVerse, 'id' | 'createdAt'>[] = [
  // ---------------- Graça ----------------
  { theme: 'Graça', order: 1, reference: 'Efésios 2.8-9',
    text: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' },
  { theme: 'Graça', order: 2, reference: '2 Coríntios 12.9',
    text: 'A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.' },
  { theme: 'Graça', order: 3, reference: 'Romanos 3.23-24',
    text: 'Porque todos pecaram e destituídos estão da glória de Deus; sendo justificados gratuitamente pela sua graça, pela redenção que há em Cristo Jesus.' },
  { theme: 'Graça', order: 4, reference: 'Tito 2.11',
    text: 'Porque a graça de Deus se há manifestado, trazendo salvação a todos os homens.' },

  // ---------------- Salvação ----------------
  { theme: 'Salvação', order: 5, reference: 'João 3.16',
    text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { theme: 'Salvação', order: 6, reference: 'Romanos 10.9',
    text: 'Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dos mortos, serás salvo.' },
  { theme: 'Salvação', order: 7, reference: 'Atos 4.12',
    text: 'E em nenhum outro há salvação, porque também debaixo do céu nenhum outro nome há, dado entre os homens, pelo qual devamos ser salvos.' },
  { theme: 'Salvação', order: 8, reference: 'Romanos 10.13',
    text: 'Porque todo aquele que invocar o nome do Senhor será salvo.' },

  // ---------------- O Sangue de Jesus ----------------
  { theme: 'O Sangue de Jesus', order: 9, reference: '1 João 1.7',
    text: 'E o sangue de Jesus Cristo, seu Filho, nos purifica de todo o pecado.' },
  { theme: 'O Sangue de Jesus', order: 10, reference: 'Apocalipse 12.11',
    text: 'E eles o venceram pelo sangue do Cordeiro e pela palavra do seu testemunho; e não amaram as suas vidas até à morte.' },
  { theme: 'O Sangue de Jesus', order: 11, reference: 'Efésios 1.7',
    text: 'Em quem temos a redenção pelo seu sangue, a remissão das ofensas, segundo as riquezas da sua graça.' },
  { theme: 'O Sangue de Jesus', order: 12, reference: 'Hebreus 9.22',
    text: 'E sem derramamento de sangue não há remissão.' },

  // ---------------- A Cruz ----------------
  { theme: 'A Cruz', order: 13, reference: 'Gálatas 2.20',
    text: 'Já estou crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim; e a vida que agora vivo na carne, vivo-a na fé do Filho de Deus, o qual me amou, e se entregou a si mesmo por mim.' },
  { theme: 'A Cruz', order: 14, reference: '1 Coríntios 1.18',
    text: 'Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus.' },
  { theme: 'A Cruz', order: 15, reference: 'Colossenses 2.14',
    text: 'Havendo riscado a cédula que era contra nós nas suas ordenanças, a qual de alguma maneira nos era contrária, e a tirou do meio de nós, cravando-a na cruz.' },
  { theme: 'A Cruz', order: 16, reference: 'Gálatas 6.14',
    text: 'Mas longe esteja de mim gloriar-me, a não ser na cruz de nosso Senhor Jesus Cristo, pela qual o mundo está crucificado para mim e eu para o mundo.' },

  // ---------------- Vida Eterna ----------------
  { theme: 'Vida Eterna', order: 17, reference: 'João 5.24',
    text: 'Na verdade, na verdade vos digo que quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna, e não entrará em condenação, mas passou da morte para a vida.' },
  { theme: 'Vida Eterna', order: 18, reference: 'João 10.28',
    text: 'E dou-lhes a vida eterna, e nunca hão de perecer, e ninguém as arrebatará da minha mão.' },
  { theme: 'Vida Eterna', order: 19, reference: 'Romanos 6.23',
    text: 'Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna, por Cristo Jesus nosso Senhor.' },
  { theme: 'Vida Eterna', order: 20, reference: '1 João 5.11-12',
    text: 'E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está em seu Filho. Quem tem o Filho tem a vida; quem não tem o Filho de Deus não tem a vida.' },

  // ---------------- Guerra Espiritual ----------------
  { theme: 'Guerra Espiritual', order: 21, reference: 'Efésios 6.11',
    text: 'Revesti-vos de toda a armadura de Deus, para que possais estar firmes contra as astutas ciladas do diabo.' },
  { theme: 'Guerra Espiritual', order: 22, reference: 'Efésios 6.12',
    text: 'Porque não temos que lutar contra a carne e o sangue, mas sim contra os principados, contra as potestades, contra os príncipes das trevas deste século, contra as hostes espirituais da maldade, nos lugares celestiais.' },
  { theme: 'Guerra Espiritual', order: 23, reference: 'Tiago 4.7',
    text: 'Sujeitai-vos, pois, a Deus; resisti ao diabo, e ele fugirá de vós.' },
  { theme: 'Guerra Espiritual', order: 24, reference: '2 Coríntios 10.4',
    text: 'Porque as armas da nossa milícia não são carnais, mas sim poderosas em Deus para destruição das fortalezas.' },
  { theme: 'Guerra Espiritual', order: 25, reference: '1 Pedro 5.8-9',
    text: 'Sede sóbrios; vigiai; porque o diabo, vosso adversário, anda em derredor, bramando como leão, buscando a quem possa tragar. Resisti-lhe firmes na fé.' },
]

/**
 * Popula os versículos principais se a coleção estiver vazia.
 * Só roda com sucesso para o ADMIN (as regras bloqueiam escrita de outros).
 * Retorna quantos foram inseridos.
 */
export async function seedMemoryVerses(): Promise<number> {
  const existing = await getDocs(collection(db, COL))
  if (!existing.empty) return 0
  let n = 0
  for (const v of SEED_VERSES) {
    const id = `v-${String(v.order).padStart(2, '0')}`
    await setDoc(doc(db, COL, id), { ...v, createdAt: serverTimestamp() })
    n++
  }
  return n
}
