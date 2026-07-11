import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      alert('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="min-h-[100dvh] flex">
      {/* Left panel - visual */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center">
        <div className="absolute inset-0">
          <img src="/hero-home.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0F2744]/80" />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="relative z-10 text-center text-white px-8">
          <h1 className="font-heading text-5xl font-bold text-[#D4A843] mb-4">Tetelestai</h1>
          <p className="font-serif italic text-xl text-white/80 mb-2">"Está consumado."</p>
          <p className="text-white/50 text-sm">João 19:30</p>
          <p className="text-white/60 mt-6">Ministério Tetelestai Missões</p>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[420px]">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <span className="font-heading text-3xl font-bold text-[#1A365D]">T</span>
            </Link>
            <h1 className="font-heading text-2xl font-bold text-[#1A202C] mt-4 mb-1">Área de Membros</h1>
            <p className="text-sm text-[#718096]">Entre com sua conta para acessar</p>
          </div>

          <div className="space-y-3 mb-6">
            {['Google', 'Apple', 'Facebook'].map((provider) => (
              <Button key={provider} variant="outline" className="w-full gap-3 h-11" onClick={() => alert('Em breve!')}>
                <span className="text-sm font-medium">Entrar com {provider}</span>
              </Button>
            ))}
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-[#718096]">ou acesse com e-mail</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div>
              <Label>Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                <Input type={showPassword ? 'text' : 'password'} placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#1A202C]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#4A5568] cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                Lembrar-me
              </label>
              <button type="button" onClick={() => alert('Em breve!')} className="text-[#1A365D] hover:underline">Esqueci minha senha</button>
            </div>
            <Button type="submit" className="w-full h-11 bg-[#1A365D] hover:bg-[#2C5282] gap-2">
              <LogIn className="w-4 h-4" />
              Entrar
            </Button>
          </form>

          <p className="text-center text-sm text-[#718096] mt-6">
            Não tem uma conta?{' '}
            <button onClick={() => alert('Em breve!')} className="text-[#1A365D] font-medium hover:underline">Cadastre-se</button>
          </p>
          <p className="text-center text-xs text-[#718096] mt-3">
            <Link to="/" className="hover:text-[#1A365D]">Voltar ao site</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
