'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function CriarFichaPage() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [classe, setClasse] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar a ficha
    console.log('Nova personagem:', { nome, raca, classe });
    
    // Limpar formulário após envio
    setNome('');
    setRaca('');
    setClasse('');
    
    alert('Personagem criado com sucesso!');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-surface-900">
      {/* Header */}
      <Header />

      {/* Conteúdo Principal */}
      <div className="flex flex-col items-center py-12 px-4">
        {/* Título */}
        <h1 className="display-l brand-ouro-500 mb-12">
          CRIAR PERSONAGEM
        </h1>

        {/* Formulário */}
        <div className="w-full max-w-lg">
          <div className="bg-surface-800 rounded-lg p-8 shadow-2xl border border-default">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Campo Nome */}
              <div>
                <label htmlFor="nome" className="block text-secondary label-s mb-2">
                  NOME:
                </label>
                <input
                  type="text"
                  id="nome"
                  required
                  className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-500 body-m focus:outline-none border-focus transition-colors"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              {/* Campo Raça */}
              <div>
                <label htmlFor="raca" className="block text-secondary label-s mb-2">
                  RAÇA:
                </label>
                <input
                  type="text"
                  id="raca"
                  required
                  className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-500 body-m focus:outline-none border-focus transition-colors"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                />
              </div>

              {/* Campo Classe */}
              <div>
                <label htmlFor="classe" className="block text-secondary label-s mb-2">
                  CLASSE:
                </label>
                <input
                  type="text"
                  id="classe"
                  required
                  className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-500 body-m focus:outline-none border-focus transition-colors"
                  value={classe}
                  onChange={(e) => setClasse(e.target.value)}
                />
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-brand-ouro-500 text-inverse py-3 px-4 rounded-md hover-bg-brand-ouro-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 button-m transition-colors"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-transparent border-2 border-brand-ouro-500 brand-ouro-500 py-3 px-4 rounded-md hover:bg-brand-ouro-500 hover:text-inverse focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 button-m transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}