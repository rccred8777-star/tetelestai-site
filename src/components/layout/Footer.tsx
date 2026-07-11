import { Link } from 'react-router-dom'
import { Heart, Instagram, Youtube, Facebook, Music } from 'lucide-react'

const footerLinks = {
  about: [
    { label: 'Quem Somos', href: '/quem-somos' },
    { label: 'Nossa História', href: '/quem-somos' },
    { label: 'Liderança', href: '/quem-somos' },
    { label: 'Declaração de Fé', href: '/quem-somos' },
  ],
  quick: [
    { label: 'Ministérios', href: '/ministerios' },
    { label: 'Células', href: '/celulas' },
    { label: 'Eventos', href: '/eventos' },
    { label: 'Mídia', href: '/midia' },
  ],
  ministries: [
    { label: 'Louvor', href: '/ministerios' },
    { label: 'Jovens', href: '/ministerios' },
    { label: 'Casais', href: '/ministerios' },
    { label: 'Missões', href: '/ministerios' },
  ],
  connect: [
    { label: 'Contato', href: '/contato' },
    { label: 'Pedido de Oração', href: '/contato' },
    { label: 'Doações', href: '/doacoes' },
    { label: 'Área de Membros', href: '/login' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0F2744] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="font-heading text-2xl font-bold text-[#D4A843]">Tetelestai</h3>
            </Link>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Uma comunidade de fé, esperança e amor.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[Instagram, Youtube, Facebook, Music].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A843] transition-colors"
                  onClick={(e) => { e.preventDefault(); alert('Em breve!') }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A843] mb-4">Sobre</h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A843] mb-4">Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A843] mb-4">Ministérios</h4>
            <ul className="space-y-2.5">
              {footerLinks.ministries.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#D4A843] mb-4">Conecte-se</h4>
            <ul className="space-y-2.5">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giving CTA */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © 2026 Ministério Tetelestai Missões. Todos os direitos reservados.
          </p>
          <Link to="/doacoes">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#38A169] hover:bg-[#2F855A] text-white text-sm font-medium rounded-lg transition-colors">
              <Heart className="w-4 h-4" />
              Faça sua Doação
            </button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
