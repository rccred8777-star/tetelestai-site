import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, User, Users, BookOpen, Calendar, Bell,
  Heart, LogOut, Menu, X, ChevronLeft, ChevronRight,
  PlayCircle, Shield, TrendingUp, Church, GraduationCap, Megaphone, Network
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

// Navigation items for all members
const memberNav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Meu Perfil', href: '/perfil', icon: User },
  { label: 'Minhas Celulas', href: '/minhas-celulas', icon: Users },
  { label: 'Cursos e Materiais', href: '/cursos', icon: GraduationCap },
  { label: 'Meus Eventos', href: '/meus-eventos', icon: Calendar },
  { label: 'Comunicados', href: '/comunicados', icon: Bell },
  { label: 'Minhas Doacoes', href: '/minhas-doacoes', icon: Heart },
]

// Navigation items for leaders (visible to leader and admin)
const leaderNav = [
  { label: 'Area do Lider', href: '/area-lider', icon: Church },
]

// Navigation items for network supervisors (visible to supervisor and admin)
const supervisorNav = [
  { label: 'Minha Rede', href: '/supervisao', icon: Network },
]

// Navigation items for admins (visible only to admin)
const adminNav = [
  { label: 'Painel Admin', href: '/admin', icon: Shield },
  { label: 'Gerenciar Celulas', href: '/admin/celulas', icon: Church },
  { label: 'Gerenciar Cursos', href: '/admin/cursos', icon: GraduationCap },
  { label: 'Gerenciar Alunos', href: '/admin/alunos', icon: Users },
  { label: 'Gerenciar Comunicados', href: '/admin/comunicados', icon: Megaphone },
  { label: 'Gerenciar Eventos', href: '/admin/eventos', icon: Calendar },
]

interface MemberLayoutProps {
  children: ReactNode
}

export default function MemberLayout({ children }: MemberLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, logout, isLeader, isSupervisor, isAdmin } = useAuth()
  
  // Get display info from profile or user
  const displayName = profile?.displayName || user?.displayName || 'Usuario'
  const photoURL = profile?.photoURL || user?.photoURL || ''
  const userRole = profile?.role || 'member'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderNav = (items: typeof memberNav) => (
    <nav className="flex flex-col gap-1 px-3">
      {items.map((item) => {
        const isActive = location.pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive
                ? 'bg-white/10 text-white border-l-[3px] border-[#D4A843]'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            {item.label === 'Comunicados' && !collapsed && (
              <Badge className="ml-auto bg-[#E8532D] text-white text-[10px] px-1.5 py-0">3</Badge>
            )}
          </Link>
        )
      })}
    </nav>
  )

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 h-[72px] border-b border-white/10">
        <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <span className="font-heading text-xl font-bold text-[#D4A843] shrink-0">T</span>
          {!collapsed && <span className="font-heading text-lg font-bold text-white whitespace-nowrap">Tetelestai</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-7 h-7 items-center justify-center rounded-md bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="p-3 border-b border-white/10">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <Avatar className="w-9 h-9 shrink-0 border-2 border-[#D4A843]/50">
            <AvatarImage src={photoURL} />
            <AvatarFallback className="bg-[#D4A843] text-[#0F2744] text-sm font-bold">
              {displayName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{displayName}</p>
              <p className="text-xs text-white/50 capitalize">
                {userRole === 'admin' ? 'Administrador' : userRole === 'leader' ? 'Lider' : 'Membro'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        {/* Regular member navigation */}
        {renderNav(memberNav)}

        {/* Leader section - visible to leaders and admins */}
        {isLeader && (
          <>
            {!collapsed && (
              <div className="px-6 py-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Lideranca
              </div>
            )}
            {collapsed && <div className="mx-auto w-6 h-px bg-white/20 my-3" />}
            {renderNav(leaderNav)}
            {/* Supervisor de rede - visível a supervisores e admins */}
            {isSupervisor && renderNav(supervisorNav)}
          </>
        )}

        {/* Admin section - visible only to admins */}
        {isAdmin && (
          <>
            {!collapsed && (
              <div className="px-6 py-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                Administracao
              </div>
            )}
            {collapsed && <div className="mx-auto w-6 h-px bg-white/20 my-3" />}
            {renderNav(adminNav)}
          </>
        )}
      </div>

      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-[100dvh] flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-[#0F2744] z-40 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-[260px] bg-[#0F2744] h-full"
          >
            <div className="flex items-center justify-end p-4">
              <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            {sidebarContent}
          </motion.div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-[100dvh] transition-all duration-300 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 h-[56px] bg-[#0F2744] sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="text-white/80 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-heading text-lg font-bold text-[#D4A843]">Tetelestai</span>
          <Avatar className="w-8 h-8 border-2 border-[#D4A843]/50">
            <AvatarImage src={photoURL} />
            <AvatarFallback className="bg-[#D4A843] text-[#0F2744] text-xs font-bold">{displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </div>

        {/* Top Bar (Desktop) */}
        <div className="hidden lg:flex items-center justify-end px-6 h-[56px] bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-[#4A5568] hover:text-[#1A365D]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E8532D] rounded-full" />
            </Button>
            <div className="w-px h-6 bg-gray-200" />
            <Link to="/perfil" className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
              <Avatar className="w-8 h-8 border-2 border-[#1A365D]/20">
                <AvatarImage src={photoURL} />
                <AvatarFallback className="bg-[#1A365D] text-white text-xs font-bold">{displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-[#1A202C]">{displayName?.split(' ')[0]}</span>
            </Link>
          </div>
        </div>

        <main className="flex-1 bg-[#F7FAFC] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
