'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { campaignAPI, Campaign, isAuthenticated } from '@/lib/api';
import axios from 'axios';

export default function CampaignDetailsPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;

  const loadCampaign = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const campaignData = await campaignAPI.getById(campaignId);
      setCampaign(campaignData);
    } catch (err: unknown) {
      console.error('Erro ao carregar campanha:', err);
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          setError('Campanha não encontrada');
        } else if (status === 403) {
          setError('Você não tem permissão para acessar esta campanha');
        } else {
          setError('Erro ao carregar campanha. Tente novamente.');
        }
      } else {
        setError('Erro inesperado ao carregar campanha.');
      }
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    // Verificar autenticação
    if (!isAuthenticated()) {
      router.push('/auth');
      return;
    }

    if (campaignId) {
      loadCampaign();
    }
  }, [campaignId, router, loadCampaign]);

  const handleCopyCode = async () => {
    if (!campaign) return;
    
    try {
      await navigator.clipboard.writeText(campaign.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = campaign.code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
            <p className="body-m text-secondary">Carregando detalhes da campanha...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-900">
        <Header showUserInfo={true} />
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="title-m text-primary mb-4">Erro</h3>
            <p className="body-m text-secondary mb-6">{error}</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={loadCampaign}
                className="bg-brand-ouro-500 text-inverse py-2 px-4 rounded-md hover-bg-brand-ouro-600 transition-colors button-m"
              >
                TENTAR NOVAMENTE
              </button>
              <Link
                href="/dashboard"
                className="bg-transparent border border-default text-secondary py-2 px-4 rounded-md hover:bg-surface-700 hover:text-primary transition-colors button-m"
              >
                VOLTAR
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface-900">
      <Header showUserInfo={true} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="brand-ouro-500 hover-brand-ouro-600 transition-colors body-s"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>

        {/* Cabeçalho da Campanha */}
        <div className="bg-surface-800 rounded-lg p-8 border border-default mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="mb-6 lg:mb-0">
              <h1 className="display-l text-primary mb-2">
                {campaign.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className={`label-s px-3 py-1 rounded ${
                  campaign.status === 'ACTIVE'
                    ? 'bg-green-900/50 text-green-300'
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {campaign.status === 'ACTIVE' ? 'CAMPANHA ATIVA' : 'CAMPANHA INATIVA'}
                </span>
                <span className="body-s text-muted">
                  Criada em: {formatDate(campaign.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Código da Campanha */}
        <div className="bg-surface-800 rounded-lg p-8 border border-default mb-8">
          <h2 className="title-m text-primary mb-6">
            Código de Acesso dos Jogadores
          </h2>
          
          <div className="bg-surface-700 rounded-lg p-6 border border-default">
            <div className="text-center">
              <p className="body-s text-secondary mb-4">
                Compartilhe este código com seus jogadores para que eles possam entrar na campanha:
              </p>
              
              <div className="bg-surface-900 rounded-lg p-6 mb-6 border-2 border-brand-ouro-500">
                <div className="font-mono text-4xl font-bold brand-ouro-500 tracking-widest">
                  {campaign.code}
                </div>
              </div>
              
              <button
                onClick={handleCopyCode}
                className="bg-brand-ouro-500 text-inverse py-3 px-6 rounded-md hover-bg-brand-ouro-600 transition-colors button-m"
              >
                {copied ? '✓ COPIADO!' : 'COPIAR CÓDIGO'}
              </button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
            <p className="body-s text-blue-300">
              💡 <strong>Dica:</strong> Os jogadores devem usar este código para entrar na sua campanha. 
              Mantenha-o seguro e compartilhe apenas com jogadores autorizados.
            </p>
          </div>
        </div>

        {/* Informações da Campanha */}
        <div className="bg-surface-800 rounded-lg p-8 border border-default">
          <h2 className="title-m text-primary mb-6">
            Informações da Campanha
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="label-s text-secondary mb-2">ID DA CAMPANHA</h3>
              <p className="body-m text-primary font-mono">{campaign.id}</p>
            </div>
            
            <div>
              <h3 className="label-s text-secondary mb-2">STATUS</h3>
              <p className="body-m text-primary">{campaign.status}</p>
            </div>
            
            <div>
              <h3 className="label-s text-secondary mb-2">DATA DE CRIAÇÃO</h3>
              <p className="body-m text-primary">{formatDate(campaign.createdAt)}</p>
            </div>
            
            <div>
              <h3 className="label-s text-secondary mb-2">CÓDIGO DE ACESSO</h3>
              <p className="body-m text-primary font-mono">{campaign.code}</p>
            </div>
          </div>
        </div>

        {/* Seção de Jogadores (placeholder para futura implementação) */}
        <div className="bg-surface-800 rounded-lg p-8 border border-default mt-8">
          <h2 className="title-m text-primary mb-6">
            Jogadores na Campanha
          </h2>
          
          <div className="text-center py-8">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <p className="body-m text-muted">
              Esta funcionalidade será implementada em breve.<br />
              Aqui você verá a lista de jogadores que entraram na campanha.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}