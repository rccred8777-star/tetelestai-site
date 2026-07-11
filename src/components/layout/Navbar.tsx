import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Heart, LogIn, LogOut, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Quem Somos', href: '/quem-somos' },
  { label: 'Ministérios', href: '/ministerios' },
  { label: 'Método 3/3', href: '/metodo-33' },
  { label: 'Células', href: '/celulas' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Mídia', href: '/midia' },
  { label: 'Contato', href: '/contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, user, profile, logout } = useAuth()
  const displayName = profile?.displayName || user?.displayName || 'Usuario'
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = isHome && !scrolled

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.1)]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className={`font-heading text-2xl font-bold tracking-tight ${isTransparent ? 'text-white' : 'text-[#1A365D]'}`}>
            Tetelestai
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 text-[15px] font-medium rounded-lg transition-colors ${
                isTransparent
                  ? 'text-white/90 hover:text-white hover:bg-white/10'
                  : 'text-[#1A202C] hover:text-[#1A365D] hover:bg-[#EDF2F7]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/doacoes">
            <Button
              size="sm"
              className="bg-[#38A169] hover:bg-[#2F855A] text-white gap-2 rounded-lg"
            >
              <Heart className="w-4 h-4" />
              Doar
            </Button>
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className={`gap-2 ${isTransparent ? 'text-white hover:bg-white/10' : ''}`}>
                  <User className="w-4 h-4" />
                  {displayName?.split(' ')[0]}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout} className={isTransparent ? 'text-white hover:bg-white/10' : ''}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 rounded-lg ${
                  isTransparent
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                Área de Membros
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-2">
          <Link to="/doacoes" className="sm:block hidden">
            <Button size="sm" className="bg-[#38A169] hover:bg-[#2F855A] text-white gap-1 rounded-lg">
              <Heart className="w-4 h-4" />
              <span className="text-xs">Doar</span>
            </Button>
          </Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isTransparent ? 'text-white hover:bg-white/10' : ''}>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="font-heading text-xl font-bold text-[#1A365D]">Tetelestai</span>
                  <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <nav className="flex flex-col p-4 gap-1 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-[15px] font-medium text-[#1A202C] hover:bg-[#EDF2F7] rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/doacoes"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-[15px] font-medium text-[#1A202C] hover:bg-[#EDF2F7] rounded-lg transition-colors sm:hidden"
                  >
                    Doações
                  </Link>
                  {isAuthenticated && (
                    <>
                      <div className="border-t my-2" />
                      <span className="px-4 py-2 text-xs font-medium text-[#718096] uppercase tracking-wider">Área de Membros</span>
                      {[
                        { label: 'Dashboard', href: '/dashboard' },
                        { label: 'Meu Perfil', href: '/perfil' },
                        { label: 'Minhas Células', href: '/minhas-celulas' },
                        { label: 'Meus Cursos', href: '/meus-cursos' },
                        { label: 'Comunicados', href: '/comunicados' },
                      ].map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-4 py-3 text-[15px] font-medium text-[#1A202C] hover:bg-[#EDF2F7] rounded-lg transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </>
                  )}
                </nav>
                <div className="p-4 border-t">
                  {isAuthenticated ? (
                    <Button variant="outline" className="w-full gap-2" onClick={() => { logout(); setMobileOpen(false); }}>
                      <LogOut className="w-4 h-4" />
                      Sair
                    </Button>
                  ) : (
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full">
                      <Button className="w-full bg-[#1A365D] hover:bg-[#2C5282] gap-2">
                        <LogIn className="w-4 h-4" />
                        Área de Membros
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
