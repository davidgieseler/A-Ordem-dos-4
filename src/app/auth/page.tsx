'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrdemLogo from '@/components/OrdemLogo';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { isAuthenticated } from '@/lib/api';
import Header from '@/components/Header';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const router = useRouter();

  // Verificar se já está logado
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLoginSuccess = () => {
    router.push('/dashboard');
  };

  const handleRegisterSuccess = () => {
    // Mudar para aba de login após registro bem-sucedido
    setTimeout(() => {
      setActiveTab('login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface-900">
      {/* Header fixo no topo, largura total */}
      <Header showUserInfo={false} />

      {/* Conteúdo centralizado abaixo do header */}
      <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Logo */}
          <div className="mb-12">
            <OrdemLogo />
          </div>

          {/* Container do Formulário */}
          <div className="w-full">
            <div className="bg-surface-800 rounded-lg shadow-2xl border border-default overflow-hidden">
              {/* Tabs */}
              <div className="flex">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-3 px-4 text-center transition-colors button-m ${
                    activeTab === 'login'
                      ? 'bg-brand-ouro-500 text-inverse'
                      : 'bg-surface-700 text-secondary hover:text-primary hover:bg-surface-600'
                  }`}
                >
                  ENTRAR
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-3 px-4 text-center transition-colors button-m ${
                    activeTab === 'register'
                      ? 'bg-brand-ouro-500 text-inverse'
                      : 'bg-surface-700 text-secondary hover:text-primary hover:bg-surface-600'
                  }`}
                >
                  CADASTRAR
                </button>
              </div>

              {/* Conteúdo das Tabs */}
              <div className="p-8">
                {activeTab === 'login' ? (
                  <div>
                    <h2 className="text-center title-m text-primary mb-6">
                      Faça Login
                    </h2>
                    <LoginForm onSuccess={handleLoginSuccess} />

                    <div className="mt-6 text-center">
                      <p className="body-s text-secondary">
                        Novo por aqui?{' '}
                        <button
                          onClick={() => setActiveTab('register')}
                          className="brand-ouro-500 hover-brand-ouro-600 transition-colors"
                        >
                          Crie sua conta
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-center title-m text-primary mb-6">
                      Criar Conta de Mestre
                    </h2>
                    <RegisterForm
                      onSuccess={handleRegisterSuccess}
                      onSwitchToLogin={() => setActiveTab('login')}
                    />

                    <div className="mt-6 text-center">
                      <p className="body-s text-secondary">
                        Já tem uma conta?{' '}
                        <button
                          onClick={() => setActiveTab('login')}
                          className="brand-ouro-500 hover-brand-ouro-600 transition-colors"
                        >
                          Faça login
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="mt-8 text-center">
              <p className="body-s text-muted">
                Crie campanhas épicas e gerencie seus jogadores com facilidade
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}