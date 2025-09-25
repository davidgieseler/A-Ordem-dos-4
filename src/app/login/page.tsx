'use client';

import { useState } from 'react';
import Link from 'next/link';
import OrdemLogo from '@/components/OrdemLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-surface-900 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="mb-12">
        <OrdemLogo />
      </div>

      {/* Formulário de Login */}
      <div className="w-full max-w-sm">
        <div className="bg-surface-800 rounded-lg p-8 shadow-2xl border border-default">
          {/* Título */}
          <h2 className="text-center title-m text-primary mb-8">
            ENTRAR
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-400 body-m focus:outline-none border-focus transition-colors"
                placeholder="EMAIL OU USUÁRIO"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo Senha */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-400 body-m focus:outline-none border-focus transition-colors"
                placeholder="SENHA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="w-full bg-brand-ouro-500 hover-bg-brand-ouro-600 text-inverse py-3 px-4 rounded-md transition-colors duration-200 button-m"
            >
              ENTRAR
            </button>
          </form>

          {/* Link Criar Conta */}
          <div className="mt-6 text-center">
            <Link 
              href="/criar-conta"
              className="brand-ouro-500 hover-brand-ouro-600 transition-colors duration-200 label-s"
            >
              CRIAR CONTA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}