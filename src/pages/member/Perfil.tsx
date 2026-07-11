import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'

const gifts = ['Música', 'Ensino', 'Pastoreio', 'Evangelismo', 'Serviço', 'Exortação', 'Liderança']
const ministriesList = ['Louvor', 'Infantil', 'Jovens', 'Mulheres', 'Homens', 'Casais', 'Missões', 'Células']

export default function Perfil() {
  const { user, profile } = useAuth()
  const displayName = profile?.displayName || user?.displayName || 'Usuario'
  const photoURL = profile?.photoURL || user?.photoURL || ''
  const [activeTab, setActiveTab] = useState('pessoal')
  const [directoryVisible, setDirectoryVisible] = useState(true)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="relative inline-block mb-4 group cursor-pointer">
          <Avatar className="w-28 h-28 border-4 border-[#D4A843]/30">
            <AvatarImage src={photoURL} />
            <AvatarFallback className="bg-[#1A365D] text-white text-3xl font-bold">{displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="font-heading text-2xl font-bold text-[#1A202C]">{displayName}</h1>
        <Badge className="mt-2 bg-[#1A365D] text-white hover:bg-[#1A365D]">Membro</Badge>
        <p className="text-sm text-[#718096] mt-1">Membro desde Março 2022</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6"><TabsTrigger value="pessoal">Dados Pessoais</TabsTrigger><TabsTrigger value="ministeriais">Dados Ministeriais</TabsTrigger><TabsTrigger value="config">Configurações</TabsTrigger></TabsList>

          <TabsContent value="pessoal">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <form className="grid sm:grid-cols-2 gap-5" onSubmit={e => { e.preventDefault(); alert('Salvo com sucesso!') }}>
                {[{ label: 'Nome Completo', val: displayName, type: 'text' }, { label: 'Email', val: user?.email, type: 'email' }, { label: 'Telefone/WhatsApp', val: '(11) 98765-4321', type: 'tel' }, { label: 'Data de Nascimento', val: '1990-03-15', type: 'date' }, { label: 'Estado Civil', val: 'Casada', type: 'text' }, { label: 'Nome do Cônjuge', val: 'Pedro Silva', type: 'text' }, { label: 'Profissão', val: 'Professora', type: 'text' }, { label: 'CEP', val: '01000-000', type: 'text' }, { label: 'Endereço', val: 'Rua das Flores', type: 'text' }, { label: 'Número', val: '123', type: 'text' }, { label: 'Bairro', val: 'Centro', type: 'text' }, { label: 'Cidade', val: 'São Paulo', type: 'text' }].map((f, i) => (
                  <div key={i}><Label className="mb-1.5 block">{f.label}</Label><Input type={f.type} defaultValue={f.val || ''} /></div>
                ))}
                <div className="sm:col-span-2">
                  <Button type="submit" className="bg-[#1A365D] hover:bg-[#2C5282] gap-2"><Save className="w-4 h-4" />Salvar Alterações</Button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="ministeriais">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('Salvo com sucesso!') }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[{ label: 'Data de Conversão', val: '2015-12-20', type: 'date' }, { label: 'Data de Batismo', val: '2016-04-15', type: 'date' }, { label: 'Igreja Anterior', val: 'Igreja Batista Central', type: 'text' }].map((f, i) => (
                    <div key={i}><Label className="mb-1.5 block">{f.label}</Label><Input type={f.type} defaultValue={f.val} /></div>
                  ))}
                </div>
                <div>
                  <Label className="mb-3 block">Dons Ministeriais</Label>
                  <div className="flex flex-wrap gap-2">
                    {gifts.map(g => (
                      <label key={g} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7FAFC] rounded-full text-sm cursor-pointer hover:bg-[#EDF2F7] transition-colors">
                        <input type="checkbox" defaultChecked={g === 'Ensino' || g === 'Serviço'} className="rounded" />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block">Ministérios que Participa</Label>
                  <div className="flex flex-wrap gap-2">
                    {ministriesList.map(m => (
                      <label key={m} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7FAFC] rounded-full text-sm cursor-pointer hover:bg-[#EDF2F7] transition-colors">
                        <input type="checkbox" defaultChecked={m === 'Louvor'} className="rounded" />
                        {m}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-1.5 block">Treinamentos Realizados</Label>
                  <textarea className="w-full min-h-[100px] rounded-lg border border-gray-200 p-3 text-sm" defaultValue="Escola de Líderes 2023&#10;Curso de Aconselhamento 2024" />
                </div>
                <Button type="submit" className="bg-[#1A365D] hover:bg-[#2C5282] gap-2"><Save className="w-4 h-4" />Salvar</Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="config">
            <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div><Label className="text-base">Visibilidade no Diretório</Label><p className="text-sm text-[#718096]">Permitir que outros membros vejam seu perfil</p></div>
                <Switch checked={directoryVisible} onCheckedChange={setDirectoryVisible} />
              </div>
              <div className="border-t pt-6">
                <h4 className="font-medium text-[#1A202C] mb-4">Notificações por Email</h4>
                <div className="space-y-3">
                  {['Avisos da igreja', 'Novos eventos', 'Lembretes de célula', 'Atualizações de cursos'].map(item => (
                    <div key={item} className="flex items-center justify-between"><span className="text-sm text-[#4A5568]">{item}</span><Switch defaultChecked /></div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-6">
                <h4 className="font-medium text-[#1A202C] mb-4">Alterar Senha</h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Input type="password" placeholder="Senha atual" />
                  <Input type="password" placeholder="Nova senha" />
                  <Input type="password" placeholder="Confirmar nova senha" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
