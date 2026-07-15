import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/layout/Layout'
import MemberLayout from '@/components/layout/MemberLayout'

// Public pages
import Home from '@/pages/public/Home'
import QuemSomos from '@/pages/public/QuemSomos'
import Ministerios from '@/pages/public/Ministerios'
import Celulas from '@/pages/public/Celulas'
import Eventos from '@/pages/public/Eventos'
import Midia from '@/pages/public/Midia'
import Doacoes from '@/pages/public/Doacoes'
import Contato from '@/pages/public/Contato'
import Metodo33 from '@/pages/public/Metodo33'

// Member pages
import Login from '@/pages/member/Login'
import Dashboard from '@/pages/member/Dashboard'
import Perfil from '@/pages/member/Perfil'
import MinhasCelulas from '@/pages/member/MinhasCelulas'
import MeusEventos from '@/pages/member/MeusEventos'
import MidiaMembro from '@/pages/member/MidiaMembro'
import Comunicados from '@/pages/member/Comunicados'
import MinhasDoacoes from '@/pages/member/MinhasDoacoes'
import Admin from '@/pages/member/Admin'
import AreaLider from '@/pages/member/AreaLider'
import Cursos from '@/pages/member/Cursos'
import AdminCursos from '@/pages/member/AdminCursos'
import AdminAlunos from '@/pages/member/AdminAlunos'
import AdminComunicados from '@/pages/member/AdminComunicados'
import AdminEventos from '@/pages/member/AdminEventos'
import AdminCelulas from '@/pages/member/AdminCelulas'
import AreaSupervisor from '@/pages/member/AreaSupervisor'
import Certificado from '@/pages/member/Certificado'

/**
 * ProtectedRoute - redirects to login if not authenticated
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <MemberLayout>{children}</MemberLayout> : <Navigate to="/login" replace />
}

/**
 * AdminRoute - redirects to dashboard if not admin
 * Used for admin-only pages
 */
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return <MemberLayout>{children}</MemberLayout>
}

/**
 * LeaderRoute - redirects to dashboard if not leader or admin
 * Used for leader-only pages
 */
function LeaderRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLeader } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isLeader) {
    return <Navigate to="/dashboard" replace />
  }

  return <MemberLayout>{children}</MemberLayout>
}

/**
 * SupervisorRoute - só supervisor de rede (e admin) acessam a visão da rede.
 */
function SupervisorRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isSupervisor } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isSupervisor) {
    return <Navigate to="/dashboard" replace />
  }

  return <MemberLayout>{children}</MemberLayout>
}

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/ministerios" element={<Ministerios />} />
        <Route path="/celulas" element={<Celulas />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/midia" element={<Midia />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/metodo-33" element={<Metodo33 />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Member routes - any authenticated user */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      <Route path="/minhas-celulas" element={<ProtectedRoute><MinhasCelulas /></ProtectedRoute>} />
      <Route path="/meus-cursos" element={<ProtectedRoute><MeusCursos /></ProtectedRoute>} />
      <Route path="/meus-eventos" element={<ProtectedRoute><MeusEventos /></ProtectedRoute>} />
      <Route path="/midia-membro" element={<ProtectedRoute><MidiaMembro /></ProtectedRoute>} />
      <Route path="/comunicados" element={<ProtectedRoute><Comunicados /></ProtectedRoute>} />
      <Route path="/minhas-doacoes" element={<ProtectedRoute><MinhasDoacoes /></ProtectedRoute>} />

      {/* Courses - any authenticated user */}
      <Route path="/cursos" element={<ProtectedRoute><Cursos /></ProtectedRoute>} />
      <Route path="/certificado/:courseId" element={<ProtectedRoute><Certificado /></ProtectedRoute>} />

      {/* Leader routes - only leaders and admins */}
      <Route path="/area-lider" element={<LeaderRoute><AreaLider /></LeaderRoute>} />

      {/* Supervisão de rede - supervisores e admins */}
      <Route path="/supervisao" element={<SupervisorRoute><AreaSupervisor /></SupervisorRoute>} />

      {/* Admin routes - only admins */}
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="/admin/cursos" element={<AdminRoute><AdminCursos /></AdminRoute>} />
      <Route path="/admin/alunos" element={<AdminRoute><AdminAlunos /></AdminRoute>} />
      <Route path="/admin/comunicados" element={<AdminRoute><AdminComunicados /></AdminRoute>} />
      <Route path="/admin/eventos" element={<AdminRoute><AdminEventos /></AdminRoute>} />
      <Route path="/admin/celulas" element={<AdminRoute><AdminCelulas /></AdminRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
