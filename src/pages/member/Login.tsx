import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Mail, Lock, Eye, EyeOff, User, Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

type Mode = 'login' | 'register' | 'reset'

/** Traduz os erros do Firebase para mensagens que o usuario entende. */
function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code || ''
  switch (code) {
    case 'auth/invalid-email':
      return 'E-mail invalido. Confira o endereco digitado.'
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'E-mail ou senha incorretos.'
    case 'auth/email-already-in-use':
      return 'Ja existe uma conta com esse e-mail. Tente entrar.'
    case 'auth/weak-password':
      return 'A senha precisa ter pelo menos 6 caracteres.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.'
    case 'auth/popup-closed-by-user':
      return 'A janela do Google foi fechada antes de concluir.'
    case 'auth/network-request-failed':
      return 'Sem conexao. Verifique sua internet.'
    default:
      return 'Nao foi possivel concluir. Tente novamente.'
  }
}

export default function Login() {
  const [mode, setMode] = useState<Mode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  const { login, register, loginWithGoogle, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      if (mode === 'login') {
        await login(email, password)
        toast.success('Bem-vindo de volta!')
        navigate('/dashboard')
      } else if (mode === 'register') {
        if (!name.trim()) {
          toast.error('Digite seu nome completo.')
          return
        }
        await register(email, password, name.trim())
        toast.success('Conta criada! Bem-vindo ao Tetelestai.')
        navigate('/dashboard')
      } else {
        await resetPassword(email)
        toast.success('Enviamos um link de recuperacao para o seu e-mail.')
        setMode('login')
      }
    } catch (err) {
      console.error(err)
      toast.error(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setBusy(true)
    try {
      await loginWithGoogle()
      toast.success('Bem-vindo!')
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      toast.error(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  const title =
    mode === 'login' ? 'Area de Membros' : mode === 'register' ? 'Criar conta' : 'Recuperar senha'
  const subtitle =
    mode === 'login'
      ? 'Entre com sua conta para acessar'
      : mode === 'register'
        ? 'Preencha seus dados para se cadastrar'
        : 'Enviaremos um link para redefinir sua senha'

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
          <p className="font-serif italic text-xl text-white/80 mb-2">"Esta consumado."</p>
          <p className="text-white/50 text-sm">Joao 19:30</p>
          <p className="text-white/60 mt-6">Ministerio Tetelestai Missoes</p>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[420px]">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <span className="font-heading text-3xl font-bold text-[#1A365D]">T</span>
            </Link>
            <h1 className="font-heading text-2xl font-bold text-[#1A202C] mt-4 mb-1">{title}</h1>
            <p className="text-sm text-[#718096]">{subtitle}</p>
          </div>

          {mode !== 'reset' && (
            <>
              <Button
                variant="outline"
                className="w-full gap-3 h-11"
                onClick={handleGoogle}
                disabled={busy}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.14 6.16-4.14z" />
                </svg>
                <span className="text-sm font-medium">Entrar com Google</span>
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-[#718096]">ou acesse com e-mail</span></div>
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <Label>Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                  <Input placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} className="pl-10" required />
                </div>
              </div>
            )}

            <div>
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                <Input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <Label>Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718096]" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={mode === 'register' ? 'Minimo 6 caracteres' : 'Sua senha'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#1A202C]">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-end text-sm">
                <button type="button" onClick={() => setMode('reset')} className="text-[#1A365D] hover:underline">
                  Esqueci minha senha
                </button>
              </div>
            )}

            <Button type="submit" disabled={busy} className="w-full h-11 bg-[#1A365D] hover:bg-[#2C5282] gap-2">
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar minha conta' : 'Enviar link de recuperacao'}
            </Button>
          </form>

          {mode === 'login' && (
            <p className="text-center text-sm text-[#718096] mt-6">
              Nao tem uma conta?{' '}
              <button onClick={() => setMode('register')} className="text-[#1A365D] font-medium hover:underline">
                Cadastre-se
              </button>
            </p>
          )}

          {mode !== 'login' && (
            <p className="text-center text-sm text-[#718096] mt-6">
              <button onClick={() => setMode('login')} className="inline-flex items-center gap-1 text-[#1A365D] font-medium hover:underline">
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar para o login
              </button>
            </p>
          )}

          <p className="text-center text-xs text-[#718096] mt-3">
            <Link to="/" className="hover:text-[#1A365D]">Voltar ao site</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
