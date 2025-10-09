'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { campaignAPI, Campaign, CreateCampaignRequest, isAuthenticated, removeToken } from '@/lib/api';
import axios from 'axios';

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticação
    if (!isAuthenticated()) {
      router.push('/auth');
      return;
    }

    loadCampaigns();
  }, [router]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError('');
      const campaignsData = await campaignAPI.getAll();
      setCampaigns(campaignsData);
    } catch (err: unknown) {
      console.error('Erro ao carregar campanhas:', err);
      if (axios.isAxiosError(err)) {
        setError('Erro ao carregar campanhas. Tente novamente.');
      } else {
        setError('Erro inesperado ao carregar campanhas.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCampaignName.trim()) {
      return;
    }

    try {
      setCreating(true);
      const campaignData: CreateCampaignRequest = {
        name: newCampaignName.trim()
      };
      
      const newCampaign = await campaignAPI.create(campaignData);
      
      // Adicionar à lista local
      setCampaigns(prev => [...prev, newCampaign]);
      
      // Limpar formulário
      setNewCampaignName('');
      setShowCreateForm(false);
      
    } catch (err: unknown) {
      console.error('Erro ao criar campanha:', err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError('Nome da campanha inválido');
        } else {
          setError('Erro ao criar campanha. Tente novamente.');
        }
      } else {
        setError('Erro inesperado ao criar campanha.');
      }
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push('/auth');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-900">
        <Header showUserInfo={true} />
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-ouro-500 mx-auto mb-4"></div>
            <p className="body-m text-secondary">Carregando campanhas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-900">
      <Header showUserInfo={true} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Cabeçalho do Dashboard */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h1 className="display-l brand-ouro-500 mb-2">
              Dashboard do Mestre
            </h1>
            <p className="body-m text-secondary">
              Gerencie suas campanhas e aventuras
            </p>
          </div>
          
          <div className="mt-6 sm:mt-0 flex gap-4">
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-brand-ouro-500 text-inverse py-3 px-6 rounded-md hover-bg-brand-ouro-600 transition-colors button-m"
            >
              + NOVA CAMPANHA
            </button>
            <button
              onClick={handleLogout}
              className="bg-transparent border border-default text-secondary py-3 px-6 rounded-md hover:bg-surface-700 hover:text-primary transition-colors button-m"
            >
              SAIR
            </button>
          </div>
        </div>

        {/* Formulário de Nova Campanha */}
        {showCreateForm && (
          <div className="bg-surface-800 rounded-lg p-6 border border-default mb-8">
            <h3 className="title-m text-primary mb-4">Criar Nova Campanha</h3>
            <form onSubmit={handleCreateCampaign} className="flex gap-4">
              <input
                type="text"
                placeholder="Nome da campanha"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
                disabled={creating}
                className="flex-1 px-4 py-3 bg-surface-700 border border-default rounded-md text-primary placeholder-gray-500 body-m focus:outline-none border-focus transition-colors disabled:opacity-50"
                required
              />
              <button
                type="submit"
                disabled={creating || !newCampaignName.trim()}
                className="bg-brand-ouro-500 text-inverse py-3 px-6 rounded-md hover-bg-brand-ouro-600 transition-colors button-m disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? 'CRIANDO...' : 'CRIAR'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewCampaignName('');
                }}
                disabled={creating}
                className="bg-transparent border border-default text-secondary py-3 px-6 rounded-md hover:bg-surface-700 hover:text-primary transition-colors button-m disabled:opacity-50"
              >
                CANCELAR
              </button>
            </form>
          </div>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md body-s mb-8">
            {error}
            <button
              onClick={loadCampaigns}
              className="ml-4 underline hover:no-underline"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Lista de Campanhas */}
        {campaigns.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="title-m text-secondary mb-2">
              Nenhuma campanha criada ainda
            </h3>
            <p className="body-m text-muted mb-6">
              Comece criando sua primeira campanha para gerenciar aventuras épicas
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-brand-ouro-500 text-inverse py-3 px-6 rounded-md hover-bg-brand-ouro-600 transition-colors button-m"
            >
              CRIAR PRIMEIRA CAMPANHA
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/campaign/${campaign.id}`}
                className="block bg-surface-800 rounded-lg p-6 border border-default hover:border-brand-ouro-500 transition-colors group"
              >
                <div className="mb-4">
                  <h3 className="body-m text-primary group-hover:brand-ouro-500 transition-colors mb-2">
                    {campaign.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="label-s text-muted">
                      Código: {campaign.code}
                    </span>
                    <span className={`label-s px-2 py-1 rounded ${
                      campaign.status === 'ACTIVE'
                        ? 'bg-green-900/50 text-green-300'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {campaign.status === 'ACTIVE' ? 'ATIVA' : 'INATIVA'}
                    </span>
                  </div>
                </div>
                <div className="text-muted body-s">
                  Criada em: {formatDate(campaign.createdAt)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}