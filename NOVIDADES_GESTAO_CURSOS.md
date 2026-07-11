# Gestão de Cursos, Aulas e Apostilas — o que foi adicionado

Esta versão adiciona as **ferramentas reais de controle** (gravando no Firestore),
que antes não existiam (o painel era só visual).

## Arquivos novos
- `src/services/coursesDb.ts` — CRUD de cursos e aulas + apostilas (links) + migração do conteúdo existente.
- `src/pages/member/AdminCursos.tsx` — painel de administração de cursos (admin).
- `src/pages/member/Cursos.tsx` — tela do aluno lendo do banco, com as apostilas.

## Arquivos alterados
- `src/App.tsx` — novas rotas `/admin/cursos` (admin) e `/cursos` (membro).
- `src/components/layout/MemberLayout.tsx` — novos itens de menu "Gerenciar Cursos" (admin) e "Cursos e Materiais" (membro).

## Como usar
1. `npm install`
2. `npm run dev` (ou `npm run build`)
3. Entre como **admin** → menu lateral **Gerenciar Cursos**.
4. Clique em **"Importar conteúdo do site"** uma vez — isso migra os cursos já escritos
   (Método 3/3, Escola de Líderes e Escola de Missões, com todas as aulas) para o banco.
   É seguro: não duplica o que já existe.
5. A partir daí você pode: criar/editar/excluir **cursos** e **aulas**, reordenar aulas,
   e **anexar apostilas** (cole o link do Google Drive do PDF).
6. O aluno vê tudo no menu **Cursos e Materiais**, com botão para baixar cada apostila.

## Apostilas via Google Drive
No Drive: botão direito no arquivo → **Compartilhar** → "Qualquer pessoa com o link" →
**Copiar link** → cole no campo de apostila. Não precisa de plano pago do Firebase.

## Firestore
As regras de segurança já publicadas permitem que **admin** grave em `courses` e
`courses/{id}/lessons`. As apostilas são salvas como campo `materials` (array de
`{title, url}`) dentro do curso/aula — cobertas pelas mesmas regras. Nenhuma mudança
de regra é necessária.

## Observação de validação
A sintaxe de todos os arquivos foi verificada. O `npm run build` completo (typecheck +
Vite) deve ser rodado na sua máquina para o build de produção — o ambiente onde o código
foi gerado não conseguiu completar o `npm install` pesado.

---
## Adicional: Gestão de Alunos
- `src/services/studentsDb.ts` e `src/pages/member/AdminAlunos.tsx` (novos).
- Rota `/admin/alunos` e menu "Gerenciar Alunos".
- Lista membros, busca/filtra, mostra progresso (aulas concluídas) e permite
  definir o papel (Membro / Líder / Administrador). Trava a alteração do próprio papel.

---
## Adicional: Comunicados e Eventos (gestão real)
- `src/services/adminContentDb.ts` (novo) — CRUD de comunicados e eventos.
- `src/pages/member/AdminComunicados.tsx` e `AdminEventos.tsx` (novos).
- Rotas `/admin/comunicados` e `/admin/eventos`; menu "Gerenciar Comunicados" e "Gerenciar Eventos".
- A tela do membro "Comunicados" agora lê do banco (com fallback para os exemplos).
- Regras do Firestore já cobrem: admin escreve em `announcements` e `events`.
